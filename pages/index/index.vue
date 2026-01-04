<template>
	<view class="page">
		<StatusBar />
		
		<view class="content">
			<view class="logo-box">
				<view class="logo-icon">+</view>
			</view>
			<text class="app-name">医教通</text>
			<text class="app-slogan">医学教育 · 终身学习</text>
            
            <view class="loading-box">
                <view class="spinner"></view>
                <text class="loading-text">正在加载资源...</text>
            </view>
		</view>
        
        <view class="footer">
            <text class="copyright">© 2026 Medical Education Platform</text>
        </view>
	</view>
</template>

<script>
import StatusBar from '@/components/common/StatusBar.vue'

export default {
	components: { StatusBar },
	onLoad() {
		// Simulate resource loading or check login status
		setTimeout(() => {
			this.checkState()
		}, 2000)
	},
	methods: {
		checkState() {
            // Logic to determine where to go:
            // 1. If first launch -> Guide Page (skip for MVP)
            // 2. If logged in -> Home
            // 3. Else -> Mode Selection
            
            // For MVP, always go to Mode Selection
			uni.redirectTo({
				url: '/pages/mode-selection/index'
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
    position: relative;
    overflow: hidden;
}

.content {
	flex: 1;
	@include flex-column-center;
    padding-bottom: 100rpx;
    
    .logo-box {
        width: 160rpx;
        height: 160rpx;
        background: linear-gradient(135deg, $light-cyan, $tech-blue);
        border-radius: 40rpx;
        @include flex-center;
        box-shadow: $shadow-lg;
        margin-bottom: 32rpx;
        animation: pulse 2s infinite;
        
        .logo-icon {
            font-size: 80rpx;
            color: white;
            font-weight: bold;
        }
    }
    
    .app-name {
        font-size: 48rpx;
        font-weight: bold;
        color: $text-primary;
        letter-spacing: 4rpx;
        margin-bottom: 16rpx;
    }
    
    .app-slogan {
        font-size: $font-size-sm;
        color: $text-tertiary;
        letter-spacing: 2rpx;
    }
    
    .loading-box {
        margin-top: 120rpx;
        @include flex-column-center;
        
        .spinner {
            width: 40rpx;
            height: 40rpx;
            border: 4rpx solid $gray-200;
            border-top-color: $tech-blue;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 16rpx;
        }
        
        .loading-text {
            font-size: $font-size-xs;
            color: $text-tertiary;
        }
    }
}

.footer {
    padding: 32rpx;
    @include flex-center;
    
    .copyright {
        font-size: 20rpx;
        color: $gray-400;
    }
}

@keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba($tech-blue, 0.4); }
    70% { transform: scale(1.05); box-shadow: 0 0 0 20rpx rgba($tech-blue, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba($tech-blue, 0); }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
</style>