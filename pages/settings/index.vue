<template>
	<view class="page">
		<scroll-view class="content" scroll-y>
            <view class="section-title">通用</view>
			<view class="setting-list">
				<view class="setting-item">
					<text class="label">字体大小</text>
					<view class="right-box">
                        <text class="value">中</text>
                        <text class="arrow">></text>
                    </view>
				</view>
                <view class="setting-item">
					<text class="label">清除缓存</text>
					<view class="right-box">
                        <text class="value">12.5MB</text>
                        <text class="arrow">></text>
                    </view>
				</view>
			</view>
            
            <view class="section-title">通知</view>
			<view class="setting-list">
				<view class="setting-item">
					<text class="label">复习提醒</text>
					<switch color="#03A9F4" checked />
				</view>
                <view class="setting-item">
					<text class="label">系统通知</text>
					<switch color="#03A9F4" checked />
				</view>
			</view>
            
            <view class="section-title">关于</view>
			<view class="setting-list">
				<view class="setting-item">
					<text class="label">用户协议</text>
					<text class="arrow">></text>
				</view>
                <view class="setting-item">
					<text class="label">隐私政策</text>
					<text class="arrow">></text>
				</view>
                <view class="setting-item">
					<text class="label">版本号</text>
					<text class="value">1.0.0</text>
				</view>
			</view>
            
            <button class="btn-logout" @click="handleLogout">退出登录</button>
		</scroll-view>
	</view>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
	methods: {
		goBack() {
			uni.navigateBack()
		},
        handleLogout() {
            uni.showModal({
                title: '提示',
                content: '确定要退出登录吗?',
                success: (res) => {
                    if (res.confirm) {
                        const userStore = useUserStore()
                        userStore.logout()
                    }
                }
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

.setting-list {
    background-color: $bg-white;
    border-radius: $radius-lg;
    overflow: hidden;
    margin-bottom: 48rpx;
    
    .setting-item {
        padding: 32rpx;
        @include flex-between;
        border-bottom: 1px solid $gray-50;
        
        &:last-child {
            border-bottom: none;
        }
        
        .label {
            font-size: $font-size-base;
            color: $text-primary;
        }
        
        .right-box {
            display: flex;
            align-items: center;
            
            .value {
                font-size: $font-size-sm;
                color: $text-secondary;
                margin-right: 16rpx;
            }
            
            .arrow {
                font-size: $font-size-xs;
                color: $gray-300;
            }
        }
    }
}

.btn-logout {
    background-color: $bg-white;
    color: $error;
    font-size: $font-size-base;
    border-radius: $radius-lg;
    margin-top: 64rpx;
}
</style>