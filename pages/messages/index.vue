<template>
	<view class="page">
		<scroll-view class="content" scroll-y>
            <view class="actions-row">
                <view class="read-all-btn" @click="markAllRead">全部已读</view>
            </view>
			<view class="msg-list" v-if="messages.length > 0">
				<view 
					class="msg-item" 
					v-for="msg in messages" 
					:key="msg.id"
                    :class="{ unread: !msg.isRead }"
				>
                    <view class="msg-icon-box" :class="getIconClass(msg.type)">
                        <text class="icon">{{ getIcon(msg.type) }}</text>
                    </view>
                    <view class="msg-content">
                        <view class="msg-header">
                            <text class="msg-title">{{ msg.title }}</text>
                            <text class="msg-time">{{ formatTime(msg.time) }}</text>
                        </view>
                        <text class="msg-text">{{ msg.content }}</text>
                    </view>
				</view>
			</view>
            
            <view v-else class="empty-state">
                <text class="empty-text">暂无消息</text>
            </view>
		</scroll-view>
	</view>
</template>

<script>
import { mockMessages } from '@/mock/messages'
import { getRelativeTime } from '@/utils/date'

export default {
	data() {
		return {
			messages: mockMessages
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
        formatTime(time) {
            return getRelativeTime(time)
        },
        getIcon(type) {
            const map = {
                'system': '🔔',
                'review': '⏰',
                'update': '📢'
            }
            return map[type] || '📩'
        },
        getIconClass(type) {
            return type
        },
        markAllRead() {
            this.messages.forEach(m => m.isRead = true)
            uni.showToast({ title: '已全部标记为已读', icon: 'none' })
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
	@include flex-between;
	padding: 0 32rpx;
	background-color: $bg-white;
	box-shadow: $shadow-sm;
    z-index: 10;
	
	.back-btn {
		width: 64rpx;
		height: 64rpx;
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
    
    .read-all {
        font-size: $font-size-sm;
        color: $text-secondary;
    }
}

.content {
	flex: 1;
	padding: 32rpx;
}

.actions-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24rpx;
    
    .read-all-btn {
        font-size: $font-size-sm;
        color: $primary;
        padding: 8rpx 16rpx;
    }
}

.msg-list {
    .msg-item {
        background-color: $bg-white;
        border-radius: $radius-lg;
        padding: 24rpx;
        margin-bottom: 24rpx;
        display: flex;
        box-shadow: $shadow-sm;
        
        &.unread {
            background-color: #F0F9FF;
            
            .msg-title {
                font-weight: bold;
                color: $tech-blue;
            }
        }
        
        .msg-icon-box {
            width: 80rpx;
            height: 80rpx;
            border-radius: $radius-full;
            @include flex-center;
            margin-right: 24rpx;
            flex-shrink: 0;
            
            &.system { background-color: #E3F2FD; }
            &.review { background-color: #FFF3E0; }
            &.update { background-color: #E8F5E9; }
            
            .icon {
                font-size: 40rpx;
            }
        }
        
        .msg-content {
            flex: 1;
            
            .msg-header {
                @include flex-between;
                margin-bottom: 8rpx;
                
                .msg-title {
                    font-size: $font-size-base;
                    font-weight: 500;
                    color: $text-primary;
                }
                
                .msg-time {
                    font-size: $font-size-xs;
                    color: $text-tertiary;
                }
            }
            
            .msg-text {
                font-size: $font-size-sm;
                color: $text-secondary;
                line-height: 1.4;
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