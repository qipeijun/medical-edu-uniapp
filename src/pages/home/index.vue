<template>
	<view class="page">
		<!-- 状态栏 -->
		<StatusBar />

		<view class="header" :style="{ paddingRight: headerPaddingRight + 'rpx' }">
			<view class="greeting-section">
				<view>
					<text class="greeting">{{ greeting }},</text>
					<text class="username">{{ displayName }}</text>
				</view>
				<image class="avatar" :src="avatar" mode="aspectFill" @click="goToProfile"></image>
			</view>
			<text class="subtitle">开始今天的学习吧!</text>
		</view>

		<!-- 滚动内容 -->
		<scroll-view class="content" scroll-y>
			<!-- 轮播图 -->
			<view class="banner-section">
				<swiper class="banner-swiper" indicator-dots autoplay circular>
					<swiper-item>
						<view class="banner-item">
							<text class="banner-title">2026临床执业医师考试大纲发布</text>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<!-- 今日复习卡片 -->
			<view class="review-card" @click="goToReview">
				<view class="review-header-bg">
					<view class="flex items-center">
						<text class="review-icon">📅</text>
						<text class="review-title">今日需复习: {{ todayReviewCount }}题</text>
					</view>
					<text class="review-more">全部 ></text>
				</view>
				
				<view class="review-body">
					<view class="progress-bar">
						<view class="progress-fill" :style="{ width: reviewProgress + '%' }"></view>
					</view>
					
					<view class="subject-row">
						<view class="flex items-center">
							<view class="subject-icon-box">
								<text class="icon">🦴</text>
							</view>
							<view class="flex-column ml-2">
								<text class="subject-name">系统解剖学</text>
								<text class="subject-info">12题待复习</text>
							</view>
						</view>
						<button class="btn-start">开始</button>
					</view>
				</view>
			</view>

			<!-- 功能网格 -->
			<view class="function-grid">
				<view
					v-for="item in functionList"
					:key="item.id"
					class="function-item"
					:class="{ disabled: item.disabled }"
					@click="handleFunction(item)"
				>
					<view class="function-icon-box" :style="{ backgroundColor: item.bgColor, color: item.color }">
                        <text class="icon">{{ item.icon }}</text>
                    </view>
					<text class="function-name">{{ item.name }}</text>
				</view>
			</view>

			<!-- 科普文章 -->
			<view class="article-section">
				<view class="section-header">
					<view class="mark"></view>
					<text class="section-title">大众科普</text>
				</view>

				<!-- 分类筛选 -->
				<scroll-view class="category-tabs" scroll-x>
					<view
						v-for="cat in categories"
						:key="cat.code"
						class="category-tab"
						:class="{ active: currentCategory === cat.code }"
						@click="switchCategory(cat.code)"
					>
						{{ cat.name }}
					</view>
				</scroll-view>

				<!-- 文章列表 -->
				<view class="article-list">
					<view
						v-for="article in filteredArticles"
						:key="article.id"
						class="article-item"
						@click="goToArticle(article.id)"
					>
						<view class="article-img-placeholder"></view>
						<view class="article-content">
							<text class="article-title">{{ article.title }}</text>
							<text class="article-date">{{ formatDate(article.publishDate) }}发布</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 底部占位 -->
			<!-- Native TabBar handles spacing automatically -->
		</scroll-view>
	</view>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { useReviewStore } from '@/stores/review'
import { mockArticles } from '@/mock/articles'
import { ARTICLE_CATEGORIES } from '@/utils/constants'
import { getGreeting, formatDate as formatDateUtil } from '@/utils/date'
import StatusBar from '@/components/common/StatusBar.vue'

export default {
	components: {
		StatusBar
	},
	data() {
		return {
			greeting: getGreeting(),
			currentCategory: 'all',
			categories: ARTICLE_CATEGORIES,
			articles: mockArticles,
            headerPaddingRight: 32, // Default padding in rpx
			functionList: [
				{ id: 1, name: '课程', icon: '📖', color: '#03A9F4', bgColor: '#E1F5FE', route: '/pages/courses/index', disabled: false },
				{ id: 2, name: '习题', icon: '✏️', color: '#03A9F4', bgColor: '#E1F5FE', route: '/pages/study/index', disabled: false },
				{ id: 3, name: '考试', icon: '📋', color: '#03A9F4', bgColor: '#E1F5FE', route: '/pages/exam/index', disabled: false },
				{ id: 4, name: '收藏', icon: '⭐', color: '#03A9F4', bgColor: '#E1F5FE', route: '/pages/favorites/index', disabled: false },
				{ id: 5, name: '笔记本', icon: '📒', color: '#03A9F4', bgColor: '#E1F5FE', route: '/pages/notebook/index', disabled: false },
				{ id: 6, name: '商城', icon: '🛒', color: '#9E9E9E', bgColor: '#F5F5F5', route: '', disabled: true }
			]
		}
	},
	computed: {
		userStore() {
			return useUserStore()
		},
		reviewStore() {
			return useReviewStore()
		},
		displayName() {
			return this.userStore.displayName
		},
		avatar() {
			return this.userStore.userInfo.avatar || '/static/images/default-avatar.png'
		},
		todayReviewCount() {
			return this.reviewStore.totalToday
		},
		reviewProgress() {
			return this.reviewStore.progress
		},
		filteredArticles() {
			if (this.currentCategory === 'all') {
				return this.articles
			}
			return this.articles.filter(a => a.category === this.currentCategory)
		}
	},
	onLoad() {
		// 初始化用户状态
		this.userStore.init()

		// 加载今日复习
		this.reviewStore.loadTodayReviews()

        // #ifdef MP-WEIXIN
        // Calculate safe padding for capsule button (convert px to rpx)
        try {
            const menuButton = uni.getMenuButtonBoundingClientRect()
            const systemInfo = uni.getSystemInfoSync()
            if (menuButton && systemInfo) {
                // Width from right edge to menu button left edge + margin, convert px to rpx
                const pxValue = (systemInfo.windowWidth - menuButton.left) + 10
                this.headerPaddingRight = pxValue * 2 // px to rpx conversion
            }
        } catch (e) {
            console.error('Failed to get menu button info', e)
        }
        // #endif
	},
	methods: {
		formatDate(date) {
			return formatDateUtil(date, 'YYYY-MM-DD')
		},
		goToProfile() {
			uni.switchTab({
				url: '/pages/profile/index'
			})
		},
		goToReview() {
			uni.switchTab({
				url: '/pages/review/index'
			})
		},
		handleFunction(item) {
			if (item.disabled) {
				uni.showToast({
					title: '功能开发中',
					icon: 'none'
				})
				return
			}

			// 检查游客权限
			if (!this.userStore.checkGuestAccess(item.name)) {
				return
			}

			if (item.route) {
				if (item.route.includes('/home/') || item.route.includes('/study/') ||
				    item.route.includes('/review/') || item.route.includes('/profile/')) {
					uni.switchTab({ url: item.route })
				} else {
					uni.navigateTo({ url: item.route })
				}
			}
		},
		switchCategory(code) {
			this.currentCategory = code
		},
		goToArticle(id) {
			uni.navigateTo({
				url: `/pages/article/detail?id=${id}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.page {
	height: 100vh;
	background: $bg-base;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.header {
	padding: 32rpx;
	padding-bottom: 24rpx;
    flex-shrink: 0;

	.greeting-section {
		@include flex-between;
		margin-bottom: 16rpx;

		.greeting {
			font-size: $font-size-xs;
			color: $text-secondary;
		}

		.username {
			font-size: $font-size-lg;
			font-weight: bold;
			color: $text-primary;
			display: block;
		}

		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: $radius-full;
			background: $gray-200;
		}
	}

	.subtitle {
		font-size: $font-size-lg;
		font-weight: bold;
		color: $text-primary;
	}
}

.content {
	flex: 1;
    height: 0;
	padding: 0;
}

.banner-section {
	margin: 0 32rpx 32rpx 32rpx;
	max-width: 100%;
	box-sizing: border-box;

	.banner-swiper {
		height: 280rpx;
		border-radius: $radius-xl;
		overflow: hidden;
		box-shadow: $shadow-md;

		.banner-item {
			position: relative;
			height: 100%;
			
			// Use a placeholder gradient instead of image
			background: linear-gradient(135deg, $tech-blue 0%, #0288D1 100%);
			
			.banner-title {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				padding: 24rpx;
				background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
				color: $text-white;
				font-size: $font-size-lg;
				font-weight: bold;
			}
		}
	}
}

.review-card {
	background-color: $bg-white;
	border-radius: $radius-xl;
	overflow: hidden;
	box-shadow: $shadow-sm;
	margin: 0 32rpx 32rpx 32rpx;
	max-width: 100%;
	box-sizing: border-box;

	.review-header-bg {
		background-color: $tech-blue;
		padding: 24rpx;
		@include flex-between;
		color: $text-white;
		
		.review-icon {
			margin-right: 16rpx;
		}
		
		.review-title {
			font-weight: bold;
			font-size: $font-size-base;
		}
		
		.review-more {
			font-size: $font-size-xs;
			opacity: 0.8;
		}
	}
	
	.review-body {
		padding: 24rpx;
		
		.progress-bar {
			height: 16rpx;
			background-color: $gray-100;
			border-radius: $radius-full;
			margin-bottom: 24rpx;
			overflow: hidden;
			
			.progress-fill {
				height: 100%;
				background-color: $grass-green;
				border-radius: $radius-full;
			}
		}
		
		.subject-row {
			@include flex-between;
			background-color: $bg-white;
			border: 2rpx solid $border-light;
			border-radius: $radius-lg;
			padding: 16rpx;
			box-shadow: $shadow-xs;
			
			.subject-icon-box {
				width: 80rpx;
				height: 80rpx;
				background-color: $light-cyan;
				border-radius: $radius-md;
				@include flex-center;
				
				.icon {
					font-size: 40rpx;
					color: $tech-blue;
				}
			}
			
			.ml-2 { margin-left: 24rpx; }
			
			.subject-name {
				font-size: $font-size-sm;
				font-weight: bold;
				color: $text-primary;
			}
			
			.subject-info {
				font-size: $font-size-xs;
				color: $text-secondary;
			}
			
			.btn-start {
				@include btn-primary;
				height: 88rpx;
				padding: 0 32rpx;
				font-size: $font-size-xs;
				border-radius: $radius-full;
			}
		}
	}
}

.function-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 24rpx;
	margin: 0 32rpx 48rpx 32rpx;

	.function-item {
		@include flex-column-center;
		transition: all $transition-base;

		&:active:not(.disabled) {
			transform: scale(0.95);
		}

		&.disabled {
			opacity: 0.5;
		}

		.function-icon-box {
			width: 96rpx;
			height: 96rpx;
			border-radius: $radius-xl;
			@include flex-center;
			margin-bottom: 12rpx;
            box-shadow: $shadow-sm;
            
            .icon {
                font-size: 40rpx;
            }
		}

		.function-name {
			font-size: $font-size-xs;
			color: $text-secondary;
		}
	}
}

.article-section {
    margin: 0 32rpx;
    
	.section-header {
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
		
		.mark {
			width: 8rpx;
			height: 32rpx;
			background-color: $tech-blue;
			border-radius: $radius-full;
			margin-right: 16rpx;
		}

		.section-title {
			font-size: $font-size-lg;
			font-weight: bold;
			color: $text-primary;
		}
	}

	.category-tabs {
		white-space: nowrap;
		margin-bottom: 24rpx;
		
		.category-tab {
			display: inline-block;
			padding: 12rpx 32rpx;
			background: $bg-white;
			border: 2rpx solid $border-light;
			border-radius: $radius-full;
			font-size: $font-size-xs;
			color: $text-secondary;
			margin-right: 16rpx;
			transition: all $transition-base;

			&.active {
				background: $tech-blue;
				color: $text-white;
				border-color: $tech-blue;
			}
		}
	}

	.article-list {
		.article-item {
			background-color: $bg-white;
			border-radius: $radius-lg;
			padding: 24rpx;
			margin-bottom: 24rpx;
			display: flex;
			box-shadow: $shadow-sm;

			&:active {
				transform: scale(0.98);
			}
			
			.article-img-placeholder {
				width: 200rpx;
				height: 140rpx;
				background-color: $gray-200;
				border-radius: $radius-md;
				margin-right: 24rpx;
				flex-shrink: 0;
			}

			.article-content {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				.article-title {
					@include line-clamp(2);
					font-size: $font-size-base;
					font-weight: bold;
					color: $text-primary;
					line-height: 1.4;
				}

				.article-date {
					font-size: $font-size-xs;
					color: $text-tertiary;
				}
			}
		}
	}
}
</style>