
<template>
	<view class="page">
		<StatusBar />
		
		<view class="header" :class="{ scrolled: isScrolled }">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">←</text>
			</view>
			<text class="header-title" v-if="isScrolled">{{ article?.title }}</text>
            <view class="action-btn" @click="shareArticle">
                <text class="action-icon">🔗</text>
            </view>
		</view>

		<scroll-view class="content" scroll-y @scroll="onScroll" v-if="article">
			<view class="article-header">
				<text class="title">{{ article.title }}</text>
				<view class="meta">
					<text class="author">{{ article.author }}</text>
					<text class="date">{{ formatDate(article.publishDate) }}</text>
				</view>
			</view>
            
            <!-- Using rich-text for simple markdown-like rendering (assuming content is converted or simple) -->
            <!-- In a real app, a markdown parser would be used -->
			<view class="article-body">
                <rich-text :nodes="formattedContent"></rich-text>
			</view>
            
            <view class="article-footer">
                <view class="read-count">阅读 {{ article.viewCount }}</view>
                <view class="like-btn" :class="{ active: article.isLiked }" @click="toggleLike">
                    <text class="like-icon">👍</text>
                    <text class="like-count">{{ article.likeCount }}</text>
                </view>
            </view>
            
            <view class="related-section" v-if="relatedArticles.length > 0">
                <view class="section-title">相关推荐</view>
                <view 
                    class="related-item" 
                    v-for="item in relatedArticles" 
                    :key="item.id"
                    @click="goToArticle(item.id)"
                >
                    <text class="item-title">{{ item.title }}</text>
                </view>
            </view>
            
            <view class="footer-spacer"></view>
		</scroll-view>
	</view>
</template>

<script>
import { useArticleStore } from '@/stores/article'
import StatusBar from '@/components/common/StatusBar.vue'
import { formatDate } from '@/utils/date'

export default {
	components: { StatusBar },
	data() {
		return {
			articleId: null,
            isScrolled: false
		}
	},
    computed: {
        articleStore() {
            return useArticleStore()
        },
        article() {
            return this.articleStore.currentArticle
        },
        formattedContent() {
            if (!this.article) return ''
            // Simple replacement for demo purposes. 
            // Real app should use a markdown library like marked.js
            let content = this.article.content
                .replace(/^# (.*$)/gim, '<h1 style="font-size: 24px; font-weight: bold; margin: 20px 0;">$1</h1>')
                .replace(/^## (.*$)/gim, '<h2 style="font-size: 20px; font-weight: bold; margin: 16px 0; color: #333;">$1</h2>')
                .replace(/^### (.*$)/gim, '<h3 style="font-size: 18px; font-weight: bold; margin: 12px 0;">$1</h3>')
                .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
                .replace(/\n/gim, '<br/>')
            return content
        },
        relatedArticles() {
            if (!this.article) return []
            return this.articleStore.articles.filter(a => 
                this.article.relatedArticles && this.article.relatedArticles.includes(a.id)
            )
        }
    },
	onLoad(options) {
		this.articleId = options.id
        this.articleStore.loadArticle(this.articleId)
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
        onScroll(e) {
            this.isScrolled = e.detail.scrollTop > 50
        },
        formatDate(date) {
            return formatDate(date, 'YYYY-MM-DD')
        },
        toggleLike() {
            this.articleStore.toggleLike(this.articleId)
        },
        shareArticle() {
            uni.showToast({ title: '链接已复制', icon: 'none' })
        },
        goToArticle(id) {
            uni.redirectTo({
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
	background-color: $bg-white;
	display: flex;
	flex-direction: column;
}

.header {
	height: 88rpx;
	@include flex-between;
	padding: 0 32rpx;
	background-color: transparent;
    position: relative;
    z-index: 10;
    transition: background-color 0.3s;
    
    &.scrolled {
        background-color: $bg-white;
        box-shadow: $shadow-sm;
    }
	
	.back-btn, .action-btn {
		width: 64rpx;
		height: 64rpx;
		@include flex-center;
		border-radius: $radius-full;
        background-color: rgba(255,255,255,0.8);
        border: 1px solid $border-light;
		
		.back-icon, .action-icon {
			font-size: 40rpx;
			color: $text-primary;
		}
	}
	
	.header-title {
		font-size: $font-size-base;
		font-weight: bold;
		color: $text-primary;
        @include text-ellipsis;
        max-width: 400rpx;
	}
}

.content {
	flex: 1;
	padding: 32rpx;
    
    .article-header {
        margin-bottom: 48rpx;
        
        .title {
            font-size: 40rpx;
            font-weight: bold;
            color: $text-primary;
            line-height: 1.4;
            margin-bottom: 24rpx;
            display: block;
        }
        
        .meta {
            display: flex;
            align-items: center;
            font-size: $font-size-sm;
            color: $text-tertiary;
            
            .author {
                margin-right: 24rpx;
                color: $tech-blue;
                font-weight: 500;
            }
        }
    }
    
    .article-body {
        font-size: $font-size-base;
        color: $text-secondary;
        line-height: 1.8;
        margin-bottom: 48rpx;
    }
    
    .article-footer {
        @include flex-between;
        margin-bottom: 64rpx;
        
        .read-count {
            font-size: $font-size-sm;
            color: $text-tertiary;
        }
        
        .like-btn {
            display: flex;
            align-items: center;
            padding: 12rpx 32rpx;
            border-radius: $radius-full;
            background-color: $gray-100;
            transition: all $transition-base;
            
            &.active {
                background-color: $light-cyan;
                color: $tech-blue;
            }
            
            .like-icon {
                font-size: 32rpx;
                margin-right: 8rpx;
            }
            
            .like-count {
                font-size: $font-size-sm;
                font-weight: bold;
            }
        }
    }
    
    .related-section {
        border-top: 1px solid $border-light;
        padding-top: 48rpx;
        
        .section-title {
            font-size: $font-size-lg;
            font-weight: bold;
            margin-bottom: 24rpx;
            border-left: 8rpx solid $tech-blue;
            padding-left: 16rpx;
        }
        
        .related-item {
            padding: 24rpx 0;
            border-bottom: 1px solid $gray-50;
            
            .item-title {
                font-size: $font-size-base;
                color: $text-primary;
            }
        }
    }
}

.footer-spacer {
    height: 40rpx;
}
</style>
