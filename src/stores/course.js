/**
 * 课程状态管理
 */

import { defineStore } from 'pinia'
import { mockCourses, getCourseById } from '@/mock/courses'

export const useCourseStore = defineStore('course', {
	state: () => ({
		courses: mockCourses,
		currentCourse: null,
        myCourses: [] // Enrolled courses
	}),

	getters: {
		getCourse: (state) => (id) => {
			return state.courses.find(c => c.id === id)
		}
	},

	actions: {
		loadCourses() {
			// In real app, fetch from API
			this.courses = mockCourses
		},

		setCurrentCourse(id) {
			const course = getCourseById(id)
			if (course) {
				this.currentCourse = course
			}
		},
        
        enrollCourse(id) {
            if (!this.myCourses.includes(id)) {
                this.myCourses.push(id)
                // In real app, call API
                return true
            }
            return false
        }
	}
})
