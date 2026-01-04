/**
 * 收藏状态管理
 */

import { defineStore } from 'pinia'
import { setStorage, getStorage } from '@/utils/storage'
import { mockQuestions } from '@/mock/questions'

const STORAGE_KEY_FAVORITES = 'user_favorites'

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		favorites: [] // Array of question IDs
	}),

	getters: {
		favoriteCount: (state) => state.favorites.length,
        
        // Return full question objects for favorites
        favoriteQuestions: (state) => {
            return state.favorites.map(id => {
                return mockQuestions.find(q => q.id === id) || { id, content: '题目已失效' }
            })
        }
	},

	actions: {
		loadFavorites() {
			this.favorites = getStorage(STORAGE_KEY_FAVORITES, [])
		},

		addFavorite(questionId) {
			if (!this.favorites.includes(questionId)) {
				this.favorites.unshift(questionId)
				this.saveFavorites()
			}
		},

		removeFavorite(questionId) {
			this.favorites = this.favorites.filter(id => id !== questionId)
			this.saveFavorites()
		},

		toggleFavorite(questionId) {
			if (this.favorites.includes(questionId)) {
				this.removeFavorite(questionId)
                return false
			} else {
				this.addFavorite(questionId)
                return true
			}
		},

		isFavorite(questionId) {
			return this.favorites.includes(questionId)
		},

		saveFavorites() {
			setStorage(STORAGE_KEY_FAVORITES, this.favorites)
		}
	}
})
