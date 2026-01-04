/**
 * 题目状态管理
 */

import { defineStore } from 'pinia'
import { mockSubjects } from '@/mock/subjects'
import { mockQuestions, getQuestionsByCategory, getQuestionById } from '@/mock/questions'
import { STORAGE_KEYS } from '@/utils/constants'
import { getStorage, setStorage } from '@/utils/storage'
import { calculatePerformance, calculateNextReview } from '@/utils/spaced-repetition'

export const useQuestionStore = defineStore('question', {
	state: () => ({
		// 所有学科
		subjects: mockSubjects,
		// 当前选中的学科
		currentSubject: null,
		// 当前选中的分类
		currentCategory: null,
		// 当前题目列表
		questions: [],
		// 当前题目
		currentQuestion: null,
		// 当前题目索引
		currentQuestionIndex: 0,
		// 用户答案记录 { questionId: { answer, isCorrect, timeSpent, answeredAt } }
		userAnswers: {},
		// 答题模式: practice(练习) | sequential(顺序)
		mode: 'practice',
		// 答题开始时间
		answerStartTime: null
	}),

	getters: {
		// 总题目数
		totalQuestions: (state) => state.questions.length,

		// 已答题数
		answeredCount: (state) => {
			if (!state.questions.length) return 0
			const currentQuestions = state.questions.map(q => q.id)
			return currentQuestions.filter(qid => state.userAnswers[qid]).length
		},

		// 答题进度
		progress: (state) => {
			if (state.totalQuestions === 0) return 0
			return Math.round((state.answeredCount / state.totalQuestions) * 100)
		},

		// 正确率
		accuracy: (state) => {
			const answered = Object.values(state.userAnswers)
			if (answered.length === 0) return 0
			const correct = answered.filter(a => a.isCorrect).length
			return Math.round((correct / answered.length) * 100)
		},

		// 是否还有下一题
		hasNext: (state) => {
			return state.currentQuestionIndex < state.questions.length - 1
		},

		// 是否还有上一题
		hasPrevious: (state) => {
			return state.currentQuestionIndex > 0
		}
	},

	actions: {
		/**
		 * 设置当前学科和分类
		 */
		setCurrentCategory(subjectId, categoryId = null) {
			this.currentSubject = this.subjects.find(s => s.id === subjectId)
			this.currentCategory = categoryId

			// 加载题目列表
			this.loadQuestions(subjectId, categoryId)
		},

		/**
		 * 加载题目列表
		 */
		loadQuestions(subjectId, categoryId = null) {
			this.questions = getQuestionsByCategory(subjectId, categoryId)
			this.currentQuestionIndex = 0
			if (this.questions.length > 0) {
				this.currentQuestion = this.questions[0]
				this.startAnswerTimer()
			}
		},

		/**
		 * 加载单个题目
		 */
		loadQuestion(questionId) {
			const question = getQuestionById(questionId)
			if (question) {
				this.currentQuestion = question
				this.questions = [question]
				this.currentQuestionIndex = 0
				this.startAnswerTimer()
			}
		},

		/**
		 * 下一题
		 */
		nextQuestion() {
			if (this.hasNext) {
				this.currentQuestionIndex++
				this.currentQuestion = this.questions[this.currentQuestionIndex]
				this.startAnswerTimer()
			}
		},

		/**
		 * 上一题
		 */
		previousQuestion() {
			if (this.hasPrevious) {
				this.currentQuestionIndex--
				this.currentQuestion = this.questions[this.currentQuestionIndex]
				this.startAnswerTimer()
			}
		},

		/**
		 * 跳转到指定题目
		 */
		goToQuestion(index) {
			if (index >= 0 && index < this.questions.length) {
				this.currentQuestionIndex = index
				this.currentQuestion = this.questions[index]
				this.startAnswerTimer()
			}
		},

		/**
		 * 开始答题计时
		 */
		startAnswerTimer() {
			this.answerStartTime = Date.now()
		},

		/**
		 * 提交答案
		 */
		submitAnswer(questionId, userAnswer) {
			const question = this.currentQuestion || getQuestionById(questionId)
			if (!question) return

			// 计算答题时间
			const timeSpent = this.answerStartTime
				? Math.round((Date.now() - this.answerStartTime) / 1000)
				: 0

			// 判断是否正确
			let isCorrect = false
			if (question.type === 'TYPE_A') {
				// 单选题
				isCorrect = userAnswer === question.correctAnswer
			} else if (question.type === 'TYPE_X') {
				// 多选题
				const correctSet = new Set(question.correctAnswer)
				const userSet = new Set(Array.isArray(userAnswer) ? userAnswer : [userAnswer])
				isCorrect = correctSet.size === userSet.size &&
					[...correctSet].every(a => userSet.has(a))
			}

			// 保存答题记录
			this.userAnswers[questionId] = {
				answer: userAnswer,
				isCorrect,
				timeSpent,
				answeredAt: new Date().toISOString()
			}

			// 更新题目统计
			if (isCorrect) {
				question.correctCount = (question.correctCount || 0) + 1
			} else {
				question.wrongCount = (question.wrongCount || 0) + 1
			}

			// 计算表现分数(用于间隔重复算法)
			const performance = calculatePerformance(
				isCorrect,
				timeSpent,
				question.hasViewedExplanation
			)

			// 如果已有复习计划,更新下次复习时间
			if (question.reviewSchedule) {
				const { nextReviewDate, newInterval, newEaseFactor, newReviewCount } =
					calculateNextReview(
						{
							questionId,
							lastReview: new Date(),
							reviewCount: question.reviewSchedule.reviewCount || 0,
							easeFactor: question.reviewSchedule.easeFactor || 2.5,
							interval: question.reviewSchedule.interval || 1
						},
						performance
					)

				question.reviewSchedule = {
					nextReviewDate,
					interval: newInterval,
					easeFactor: newEaseFactor,
					reviewCount: newReviewCount
				}
			} else {
				// 首次答题,创建复习计划
				const { nextReviewDate, newInterval, newEaseFactor } =
					calculateNextReview(
						{
							questionId,
							lastReview: new Date(),
							reviewCount: 0,
							easeFactor: 2.5,
							interval: 1
						},
						performance
					)

				question.reviewSchedule = {
					nextReviewDate,
					interval: newInterval,
					easeFactor: newEaseFactor,
					reviewCount: 1
				}
			}

			// 保存到本地
			this.saveToStorage()

			return {
				isCorrect,
				correctAnswer: question.correctAnswer,
				explanation: question.explanation
			}
		},

		/**
		 * 查看解析
		 */
		viewExplanation(questionId) {
			const question = this.currentQuestion || getQuestionById(questionId)
			if (question) {
				question.hasViewedExplanation = true
			}
		},

		/**
		 * 收藏/取消收藏
		 */
		toggleFavorite(questionId) {
			// TODO: 实现收藏功能(在 favorites store 中)
			uni.showToast({
				title: '收藏功能开发中',
				icon: 'none'
			})
		},

		/**
		 * 保存到本地存储
		 */
		saveToStorage() {
			setStorage(STORAGE_KEYS.ANSWER_HISTORY, this.userAnswers)
			// 保存复习计划
			const reviewSchedules = {}
			mockQuestions.forEach(q => {
				if (q.reviewSchedule) {
					reviewSchedules[q.id] = q.reviewSchedule
				}
			})
			setStorage(STORAGE_KEYS.REVIEW_SCHEDULE, reviewSchedules)
		},

		/**
		 * 从本地存储加载
		 */
		loadFromStorage() {
			const answers = getStorage(STORAGE_KEYS.ANSWER_HISTORY, {})
			this.userAnswers = answers

			// 加载复习计划
			const reviewSchedules = getStorage(STORAGE_KEYS.REVIEW_SCHEDULE, {})
			Object.keys(reviewSchedules).forEach(qid => {
				const question = mockQuestions.find(q => q.id === qid)
				if (question) {
					question.reviewSchedule = reviewSchedules[qid]
				}
			})
		},

		/**
		 * 初始化
		 */
		init() {
			this.loadFromStorage()
		}
	}
})
