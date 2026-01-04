/**
 * 文章状态管理
 */

import { defineStore } from 'pinia'
import { mockArticles, getArticleById } from '@/mock/articles'

export const useArticleStore = defineStore('article', {
	state: () => ({
		articles: mockArticles,
		currentArticle: null
	}),

	actions: {
		loadArticle(id) {
			const article = getArticleById(id)
			if (article) {
				this.currentArticle = article
			}
		},
        
        toggleLike(id) {
            const article = this.articles.find(a => a.id === id)
            if (article) {
                article.isLiked = !article.isLiked
                article.likeCount += article.isLiked ? 1 : -1
                if (this.currentArticle && this.currentArticle.id === id) {
                    this.currentArticle.isLiked = article.isLiked
                    this.currentArticle.likeCount = article.likeCount
                }
            }
        }
	}
})
