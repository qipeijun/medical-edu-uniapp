<template>
	<view class="page">
		<scroll-view class="content" scroll-y>
			<view class="fav-list" v-if="questions.length > 0">
				<view 
					class="fav-item" 
					v-for="q in questions" 
					:key="q.id"
					@click="goToQuestion(q.id)"
				>
                    <view class="q-header">
                        <text class="q-type">{{ getTypeName(q.type) }}</text>
                    </view>
					<text class="q-content">{{ q.content }}</text>
                    <view class="q-footer">
                        <text class="q-date">收藏于 2026-01-04</text>
                        <view class="remove-btn" @click.stop="removeFav(q.id)">取消收藏</view>
                    </view>
				</view>
			</view>
            
            <view v-else class="empty-state">
                <text class="empty-text">暂无收藏题目</text>
            </view>
		</scroll-view>
	</view>
</template>

<script>
import { useFavoritesStore } from '@/stores/favorites'
import { QUESTION_TYPES } from '@/utils/constants'

export default {
	computed: {
		favStore() {
			return useFavoritesStore()
		},
		questions() {
			return this.favStore.favoriteQuestions
		}
	},
    onShow() {
        this.favStore.loadFavorites()
    },
	methods: {
		goBack() {
			uni.navigateBack()
		},
        getTypeName(code) {
            const type = Object.values(QUESTION_TYPES).find(t => t.code === code)
            return type ? type.name : '题目'
        },
		goToQuestion(id) {
            // In a real app, maybe navigate to a "Review Favorites" mode
            // For MVP, just go to question detail
			uni.navigateTo({
				url: `/pages/study/question-detail` // Note: simplified, ideally pass ID or mode
			})
		},
        removeFav(id) {
            this.favStore.removeFavorite(id)
        }
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.page {
	height: 100vh;
	background-color: $bg-base;
	display: flex;
	flex-direction: column;
}

.header {
	height: 88rpx;
	@include flex-center;
	background-color: $bg-white;
	box-shadow: $shadow-sm;
	position: relative;
    z-index: 10;
	
	.back-btn {
		position: absolute;
		left: 32rpx;
		height: 100%;
		@include flex-center;
		
		.back-icon {
			font-size: 40rpx;
			color: $text-secondary;
		}
	}
	
	.title {
		font-size: $font-size-lg;
		font-weight: bold;
		color: $text-primary;
	}
}

.content {
	flex: 1;
	padding: 32rpx;
}

.fav-list {
    .fav-item {
        background-color: $bg-white;
        border-radius: $radius-lg;
        padding: 32rpx;
        margin-bottom: 24rpx;
        box-shadow: $shadow-sm;
        
        .q-header {
            margin-bottom: 16rpx;
            
            .q-type {
                font-size: $font-size-xs;
                color: $tech-blue;
                background-color: $light-cyan;
                padding: 4rpx 12rpx;
                border-radius: $radius-sm;
            }
        }
        
        .q-content {
            font-size: $font-size-base;
            color: $text-primary;
            margin-bottom: 24rpx;
            @include line-clamp(2);
            display: block;
        }
        
        .q-footer {
            @include flex-between;
            
            .q-date {
                font-size: $font-size-xs;
                color: $text-tertiary;
            }
            
            .remove-btn {
                font-size: $font-size-xs;
                color: $error;
                padding: 8rpx 16rpx;
                border: 2rpx solid $error;
                border-radius: $radius-full;
            }
        }
    }
}

.empty-state {
    padding-top: 200rpx;
    text-align: center;
    .empty-text {
        color: $text-tertiary;
    }
}
</style>