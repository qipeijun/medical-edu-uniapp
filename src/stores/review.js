/**
 * 复习状态管理
 */

import { defineStore } from 'pinia'
import { mockQuestions } from '@/mock/questions'
import { getTodayReviews, getReviewStatistics } from '@/utils/spaced-repetition'

export const useReviewStore = defineStore('review', {
	state: () => ({
		// 今日待复习题目
		todayReviews: [],
		// 已完成的复习
		completedToday: [],
		// 复习统计
		statistics: null
	}),

	getters: {
		// 今日总数
		totalToday: (state) => state.todayReviews.length,

		// 已完成数量
		completedCount: (state) => state.completedToday.length,

		// 剩余数量
		remainingCount: (state) => state.totalToday - state.completedCount,

		// 复习进度
		progress: (state) => {
			if (state.totalToday === 0) return 0
			return Math.round((state.completedCount / state.totalToday) * 100)
		},

		// 按学科分组的复习列表
		reviewsBySubject: (state) => {
			const grouped = {}
			state.todayReviews.forEach(item => {
				const subjectId = item.subjectId
				if (!grouped[subjectId]) {
					grouped[subjectId] = {
						subjectId,
						subjectName: item.subjectName,
						items: [],
						total: 0,
						completed: 0
					}
				}
				grouped[subjectId].items.push(item)
				grouped[subjectId].total++

				if (state.completedToday.includes(item.id)) {
					grouped[subjectId].completed++
				}
			})

			// 计算进度
			Object.values(grouped).forEach(group => {
				group.progress = group.total > 0
					? Math.round((group.completed / group.total) * 100)
					: 0
			})

			return grouped
		}
	},

	actions: {
		/**
		 * 加载今日复习列表
		 */
		loadTodayReviews() {
			// 获取所有有复习计划的题目
			const questionsWithSchedule = mockQuestions.filter(q => q.reviewSchedule)

			// 获取今日需要复习的题目
			this.todayReviews = getTodayReviews(questionsWithSchedule)

			// 生成统计信息
			this.updateStatistics()
		},

		/**
		 * 完成一道复习题
		 */
		completeReview(questionId) {
			if (!this.completedToday.includes(questionId)) {
				this.completedToday.push(questionId)
				this.updateStatistics()
			}
		},

		/**
		 * 更新统计信息
		 */
		updateStatistics() {
			const reviewListWithStatus = this.todayReviews.map(item => ({
				...item,
				isCompleted: this.completedToday.includes(item.id)
			}))

			this.statistics = getReviewStatistics(reviewListWithStatus)
		},

		/**
		 * 重置今日复习
		 */
		resetToday() {
			this.completedToday = []
			this.updateStatistics()
		}
	}
})
