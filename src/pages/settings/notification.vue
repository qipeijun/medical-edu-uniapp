<template>
	<view class="page">
		<scroll-view class="content" scroll-y>
            <view class="section-title">推送通知</view>
			<view class="setting-group">
				<view class="setting-item">
					<view class="item-left">
                        <text class="label">新消息通知</text>
                        <text class="desc">接收系统消息和公告</text>
                    </view>
					<switch color="#03A9F4" :checked="settings.systemNotification" @change="toggle('systemNotification')" />
				</view>
                <view class="setting-item">
					<view class="item-left">
                        <text class="label">复习提醒</text>
                        <text class="desc">每日定时提醒复习任务</text>
                    </view>
					<switch color="#03A9F4" :checked="settings.reviewReminder" @change="toggle('reviewReminder')" />
				</view>
                <view class="setting-item">
					<view class="item-left">
                        <text class="label">考试提醒</text>
                        <text class="desc">考试开始前15分钟提醒</text>
                    </view>
					<switch color="#03A9F4" :checked="settings.examAlert" @change="toggle('examAlert')" />
				</view>
			</view>
            
            <view class="section-title">免打扰</view>
			<view class="setting-group">
				<view class="setting-item">
					<view class="item-left">
                        <text class="label">夜间免打扰</text>
                        <text class="desc">22:00 - 08:00 期间不接收通知</text>
                    </view>
					<switch color="#03A9F4" :checked="settings.dnd" @change="toggle('dnd')" />
				</view>
			</view>
            
            <view class="tips">
                <text>请在系统设置中确保已开启应用的通知权限，否则上述设置可能无法生效。</text>
            </view>
		</scroll-view>
	</view>
</template>

<script>
export default {
    data() {
        return {
            settings: {
                systemNotification: true,
                reviewReminder: true,
                examAlert: true,
                dnd: false
            }
        }
    },
	methods: {
		goBack() {
			uni.navigateBack()
		},
        toggle(key) {
            this.settings[key] = !this.settings[key]
            // In real app, save to storage or API
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
	padding: 0 32rpx;
	background-color: $bg-white;
	box-shadow: $shadow-sm;
    position: relative;
	
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

.section-title {
    font-size: $font-size-sm;
    color: $text-tertiary;
    margin-bottom: 16rpx;
    margin-left: 16rpx;
}

.setting-group {
    background-color: $bg-white;
    border-radius: $radius-lg;
    overflow: hidden;
    margin-bottom: 48rpx;
    
    .setting-item {
        padding: 32rpx;
        @include flex-between;
        border-bottom: 2rpx solid $gray-50;
        
        &:last-child {
            border-bottom: none;
        }
        
        .item-left {
            display: flex;
            flex-direction: column;
            
            .label {
                font-size: $font-size-base;
                color: $text-primary;
                margin-bottom: 8rpx;
            }
            
            .desc {
                font-size: $font-size-xs;
                color: $text-tertiary;
            }
        }
    }
}

.tips {
    padding: 0 16rpx;
    font-size: $font-size-xs;
    color: $text-tertiary;
    line-height: 1.5;
}
</style>