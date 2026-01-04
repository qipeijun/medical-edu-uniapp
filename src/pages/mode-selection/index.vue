<template>
	<view class="page">
		<StatusBar />
		
		<view class="content">
			<!-- Logo Area -->
			<view class="logo-area">
				<view class="logo-box">
					<text class="logo-icon">+</text>
				</view>
				<text class="app-name">医教通</text>
				<text class="app-desc">Medical Education</text>
			</view>

			<!-- Buttons -->
			<view class="action-area">
				<button class="btn-primary" @click="goToLogin">立即注册</button>
				
				<view class="divider-box">
					<view class="line"></view>
					<text class="divider-text">游客浏览仅可查看大众科普板块</text>
					<view class="line"></view>
				</view>
				
				<button class="btn-outline" @click="enterGuest">游客浏览</button>
			</view>
		</view>
	</view>
</template>

<script>
import { useUserStore } from '@/stores/user'
import StatusBar from '@/components/common/StatusBar.vue'

export default {
	components: { StatusBar },
	methods: {
		goToLogin() {
			uni.navigateTo({ url: '/pages/auth/login' })
		},
		enterGuest() {
			const userStore = useUserStore()
			userStore.enterGuestMode()
			uni.switchTab({ url: '/pages/home/index' })
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.page {
	min-height: 100vh;
	background-color: $bg-base;
	position: relative;
}

.content {
	@include flex-column-center;
	height: 100vh;
	padding: 64rpx;
	position: relative;
	z-index: 1;
}

.logo-area {
	@include flex-column-center;
	margin-bottom: 128rpx;
	animation: bounce-slow 3s infinite;
	
	.logo-box {
		width: 160rpx;
		height: 160rpx;
		background: linear-gradient(135deg, $light-cyan 0%, $tech-blue 100%);
		border-radius: 48rpx;
		@include flex-center;
		box-shadow: $shadow-lg;
		margin-bottom: 32rpx;
		transform: rotate(3deg);
		
		.logo-icon {
			font-size: 80rpx;
			color: $text-white;
			font-weight: bold;
		}
	}
	
	.app-name {
		font-size: 48rpx;
		font-weight: bold;
		color: $text-primary;
		letter-spacing: 4rpx;
	}
	
	.app-desc {
		font-size: $font-size-xs;
		color: $text-tertiary;
		margin-top: 8rpx;
	}
}

.action-area {
	width: 100%;
	
	.btn-primary {
		@include btn-primary;
		width: 100%;
		margin-bottom: 32rpx;
		border-radius: $radius-lg;
		font-size: $font-size-lg;
	}
	
	.btn-outline {
		@include btn-base;
		width: 100%;
		background: transparent;
		color: $primary;
		border: 2rpx solid $primary;
		font-size: $font-size-lg;
		
		&:active {
			background-color: $light-cyan;
		}
	}
	
	.divider-box {
		@include flex-center;
		margin: 24rpx 0;
		padding: 16rpx 0;
		
		.line {
			flex: 1;
			height: 1px;
			background-color: $border-light;
		}
		
		.divider-text {
			font-size: $font-size-xs;
			color: $text-disabled;
			margin: 0 24rpx;
		}
	}
}

@keyframes bounce-slow {
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10rpx);
	}
}
</style>