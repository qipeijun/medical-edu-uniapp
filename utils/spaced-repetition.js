/**
 * 医教通 - 间隔重复算法 (Spaced Repetition Algorithm)
 * 基于 SM-2 (SuperMemo 2) 算法改进版
 *
 * 核心原理:
 * - 根据答题表现动态调整复习间隔
 * - 正确答案: 间隔递增
 * - 错误答案: 重置间隔
 * - 使用难度系数 (Ease Factor) 个性化调整
 */

import { PERFORMANCE_MAP } from './constants.js'

/**
 * 计算下次复习时间
 * @param {object} questionRecord 题目记录
 * @param {string} questionRecord.questionId 题目ID
 * @param {Date} questionRecord.lastReview 上次复习时间
 * @param {number} questionRecord.reviewCount 复习次数
 * @param {number} questionRecord.easeFactor 难度系数 (1.3-2.5)
 * @param {number} questionRecord.interval 当前间隔(天)
 * @param {number} performance 本次答题表现 (0-5)
 * @returns {object} { nextReviewDate, newInterval, newEaseFactor, newReviewCount }
 */
export function calculateNextReview(questionRecord, performance) {
	const {
		reviewCount = 0,
		easeFactor = 2.5,  // 默认难度系数
		interval = 1        // 默认间隔1天
	} = questionRecord

	let newEaseFactor = easeFactor
	let newInterval = interval
	let newReviewCount = reviewCount

	// 1. 更新难度系数 (Ease Factor)
	// 公式: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
	// q = performance (0-5)
	// EF 最小值为 1.3,确保不会过于频繁复习
	newEaseFactor = Math.max(
		1.3,
		easeFactor + (0.1 - (5 - performance) * (0.08 + (5 - performance) * 0.02))
	)

	// 2. 计算新间隔
	if (performance < 3) {
		// 答题表现差 (错误) - 重置间隔
		newInterval = 1
		newReviewCount = 0  // 重置复习计数
	} else {
		// 答题表现好 (正确) - 递增间隔
		if (reviewCount === 0) {
			// 第一次复习: 1天后
			newInterval = 1
		} else if (reviewCount === 1) {
			// 第二次复习: 6天后
			newInterval = 6
		} else {
			// 之后的复习: 上次间隔 × 难度系数
			newInterval = Math.round(interval * newEaseFactor)
		}
		newReviewCount = reviewCount + 1
	}

	// 3. 间隔上限限制 (最长不超过180天)
	newInterval = Math.min(newInterval, 180)

	// 4. 计算下次复习日期
	const nextReviewDate = new Date()
	nextReviewDate.setDate(nextReviewDate.getDate() + newInterval)
	// 设置为当天开始时间
	nextReviewDate.setHours(0, 0, 0, 0)

	return {
		nextReviewDate: nextReviewDate.toISOString(),
		newInterval,
		newEaseFactor: Number(newEaseFactor.toFixed(2)),
		newReviewCount
	}
}

/**
 * 判断题目是否需要复习
 * @param {string|Date} nextReviewDate 下次复习日期
 * @returns {boolean} true表示需要复习
 */
export function needsReview(nextReviewDate) {
	if (!nextReviewDate) return false

	const today = new Date()
	today.setHours(0, 0, 0, 0)

	const reviewDate = new Date(nextReviewDate)
	reviewDate.setHours(0, 0, 0, 0)

	return reviewDate <= today
}

/**
 * 获取今日待复习题目列表
 * @param {Array} allQuestions 所有题目列表
 * @returns {Array} 今日需要复习的题目
 */
export function getTodayReviews(allQuestions) {
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	return allQuestions
		.filter(q => {
			// 必须有复习计划
			if (!q.reviewSchedule || !q.reviewSchedule.nextReviewDate) {
				return false
			}
			// 检查是否到复习日期
			return needsReview(q.reviewSchedule.nextReviewDate)
		})
		.sort((a, b) => {
			// 优先级排序:
			// 1. 错误次数多的优先
			const wrongCountA = a.wrongCount || 0
			const wrongCountB = b.wrongCount || 0
			if (wrongCountA !== wrongCountB) {
				return wrongCountB - wrongCountA
			}

			// 2. 复习日期早的优先
			const dateA = new Date(a.reviewSchedule.nextReviewDate)
			const dateB = new Date(b.reviewSchedule.nextReviewDate)
			return dateA - dateB
		})
}

/**
 * 根据用户答题情况自动计算表现分数
 * (用于客观题 A型题、X型题)
 * @param {boolean} isCorrect 是否正确
 * @param {number} timeSpent 答题耗时(秒)
 * @param {boolean} hasViewedExplanation 是否查看过解析
 * @returns {number} 表现分数 (0-5)
 */
export function calculatePerformance(isCorrect, timeSpent, hasViewedExplanation = false) {
	if (!isCorrect) {
		// 错误
		return PERFORMANCE_MAP.WRONG_COMPLETELY
	}

	// 正确的情况,根据耗时和是否查看解析判断
	if (hasViewedExplanation) {
		return PERFORMANCE_MAP.CORRECT_AFTER_HINT
	}

	// 根据答题速度判断
	if (timeSpent < 10) {
		// 10秒内完成 - 立即正确
		return PERFORMANCE_MAP.CORRECT_FIRST_TRY
	} else if (timeSpent < 30) {
		// 10-30秒 - 犹豫但正确
		return PERFORMANCE_MAP.CORRECT_WITH_HESITATION
	} else {
		// 超过30秒 - 需要思考
		return PERFORMANCE_MAP.CORRECT_AFTER_HINT
	}
}

/**
 * 获取复习统计信息
 * @param {Array} reviewList 复习列表
 * @returns {object} 统计信息
 */
export function getReviewStatistics(reviewList) {
	const total = reviewList.length
	const completed = reviewList.filter(r => r.isCompleted).length
	const progress = total > 0 ? Math.round((completed / total) * 100) : 0

	// 按学科分组统计
	const bySubject = {}
	reviewList.forEach(item => {
		const subjectId = item.subjectId || item.subject
		if (!bySubject[subjectId]) {
			bySubject[subjectId] = {
				subjectId,
				subjectName: item.subjectName || '',
				total: 0,
				completed: 0
			}
		}
		bySubject[subjectId].total++
		if (item.isCompleted) {
			bySubject[subjectId].completed++
		}
	})

	// 转换为数组
	const subjectStats = Object.values(bySubject).map(s => ({
		...s,
		progress: s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0
	}))

	return {
		total,
		completed,
		remaining: total - completed,
		progress,
		bySubject: subjectStats
	}
}

/**
 * 生成学习报告
 * @param {Array} answerHistory 答题历史
 * @param {number} days 统计天数
 * @returns {object} 学习报告
 */
export function generateStudyReport(answerHistory, days = 7) {
	const now = new Date()
	const startDate = new Date(now)
	startDate.setDate(startDate.getDate() - days)

	// 筛选时间范围内的记录
	const recentRecords = answerHistory.filter(record => {
		const recordDate = new Date(record.answeredAt)
		return recordDate >= startDate && recordDate <= now
	})

	// 总体统计
	const totalQuestions = recentRecords.length
	const correctCount = recentRecords.filter(r => r.isCorrect).length
	const wrongCount = totalQuestions - correctCount
	const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0

	// 按学科统计
	const bySubject = {}
	recentRecords.forEach(record => {
		const subjectId = record.subjectId
		if (!bySubject[subjectId]) {
			bySubject[subjectId] = {
				subjectId,
				subjectName: record.subjectName || '',
				total: 0,
				correct: 0,
				wrong: 0
			}
		}
		bySubject[subjectId].total++
		if (record.isCorrect) {
			bySubject[subjectId].correct++
		} else {
			bySubject[subjectId].wrong++
		}
	})

	// 计算每个学科的正确率
	const subjectStats = Object.values(bySubject).map(s => ({
		...s,
		accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
	}))

	// 每日答题数量统计
	const dailyStats = {}
	recentRecords.forEach(record => {
		const dateKey = new Date(record.answeredAt).toISOString().split('T')[0]
		if (!dailyStats[dateKey]) {
			dailyStats[dateKey] = { date: dateKey, count: 0 }
		}
		dailyStats[dateKey].count++
	})

	return {
		period: { startDate, endDate: now, days },
		overall: {
			totalQuestions,
			correctCount,
			wrongCount,
			accuracy
		},
		bySubject: subjectStats,
		dailyStats: Object.values(dailyStats).sort((a, b) => a.date.localeCompare(b.date))
	}
}

export default {
	calculateNextReview,
	needsReview,
	getTodayReviews,
	calculatePerformance,
	getReviewStatistics,
	generateStudyReport
}
