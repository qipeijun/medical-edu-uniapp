/**
 * 考试状态管理
 */

import { defineStore } from 'pinia'
import { mockExams, getExamById } from '@/mock/exams'

export const useExamStore = defineStore('exam', {
	state: () => ({
		exams: mockExams,
		currentExam: null,
		examHistory: [] // { examId, score, date, details }
	}),

	getters: {
		availableExams: (state) => state.exams.filter(e => e.status !== 'expired')
	},

	actions: {
		loadExams() {
			this.exams = mockExams
		},

		setCurrentExam(id) {
			const exam = getExamById(id)
			if (exam) {
				this.currentExam = exam
			}
		},

		submitExam(result) {
			// result: { examId, score, answers, timeSpent }
			this.examHistory.push({
				...result,
				date: new Date().toISOString()
			})
			// In real app, post to API
		}
	}
})
