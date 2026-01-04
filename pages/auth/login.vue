<template>
	<view class="page">
		<!-- Content -->
		<view class="content">
			<text class="title">账号登录</text>
			
			<view class="form">
				<!-- Phone -->
				<view class="input-group">
					<text class="input-icon">📱</text>
					<input class="input" type="number" v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
				</view>
				
				<!-- Code -->
				<view class="code-row">
					<view class="input-group flex-1">
						<text class="input-icon">🛡️</text>
						<input class="input" type="number" v-model="form.code" placeholder="验证码" maxlength="6" />
					</view>
					<button class="btn-code" :disabled="countdown > 0" @click="sendCode">
						{{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
					</button>
				</view>
				
				<!-- Password -->
				<view class="input-group">
					<text class="input-icon">🔒</text>
					<input class="input" type="password" v-model="form.password" placeholder="请输入密码" />
				</view>
				
				<button class="btn-login" @click="handleLogin" :loading="loading">登录</button>
			</view>
			
			<view class="flex-spacer"></view>
			
			<!-- WeChat Login -->
			<view class="wechat-login" @click="handleWechatLogin">
				<view class="wechat-icon-circle">
                    <text class="wechat-icon">💬</text>
                </view>
				<text class="wechat-text">微信快捷登录</text>
			</view>
		</view>
	</view>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { validatePhone, validateVerificationCode, validatePassword } from '@/utils/validator'

export default {
	data() {
		return {
			form: {
				phone: '',
				code: '',
				password: ''
			},
			loading: false,
			countdown: 0,
			timer: null
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		sendCode() {
			const { valid, message } = validatePhone(this.form.phone)
			if (!valid) {
				uni.showToast({ title: message, icon: 'none' })
				return
			}
			
			// Mock sending code
			uni.showLoading({ title: '发送中' })
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({ title: '验证码已发送' })
				this.countdown = 60
				this.timer = setInterval(() => {
					this.countdown--
					if (this.countdown <= 0) {
						clearInterval(this.timer)
					}
				}, 1000)
			}, 1000)
		},
		async handleLogin() {
			const phoneCheck = validatePhone(this.form.phone)
			if (!phoneCheck.valid) return uni.showToast({ title: phoneCheck.message, icon: 'none' })
			
			// For simplified MVP, we skip strict validation of code/password if just exploring
			// But sticking to requirements:
			if (!this.form.code && !this.form.password) {
				return uni.showToast({ title: '请输入验证码或密码', icon: 'none' })
			}

			this.loading = true
			const userStore = useUserStore()
			const res = await userStore.login(this.form)
			this.loading = false
			
			if (res.success) {
				uni.showToast({ title: '登录成功' })
				setTimeout(() => {
					// Go to info complete if needed, or home
					// For MVP flow: Login -> Info Complete -> Home
					// But if info is already there, go Home.
					// Mock logic: Always go to Info Complete for first time
					uni.navigateTo({ url: '/pages/auth/info-complete' })
				}, 1500)
			} else {
				uni.showToast({ title: res.message || '登录失败', icon: 'none' })
			}
		},
		handleWechatLogin() {
			uni.showToast({ title: '微信登录开发中', icon: 'none' })
		}
	},
	beforeDestroy() {
		if (this.timer) clearInterval(this.timer)
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.page {
	min-height: 100vh;
	background-color: $bg-base;
	display: flex;
	flex-direction: column;
}

.header {
	height: 88rpx;
	padding: 0 32rpx;
	display: flex;
	align-items: center;
	margin-top: 20rpx;
	
	.back-btn {
		width: 80rpx;
		height: 80rpx;
		@include flex-center;
		border-radius: $radius-full;
		
		&:active {
			background-color: $gray-100;
		}
		
		.back-icon {
			font-size: 40rpx;
			color: $text-secondary;
		}
	}
}

.content {
	flex: 1;
	padding: 32rpx 64rpx;
	display: flex;
	flex-direction: column;
}

.title {
	font-size: 48rpx;
	font-weight: bold;
	color: $text-primary;
	margin-bottom: 64rpx;
}

.form {
	.input-group {
		position: relative;
		margin-bottom: 32rpx;
		
		.input-icon {
			position: absolute;
			left: 24rpx;
			top: 50%;
			transform: translateY(-50%);
			font-size: 32rpx;
			z-index: 1;
		}
		
		.input {
			height: 96rpx;
			background-color: $bg-white;
			border: 2rpx solid $light-cyan;
			border-radius: $radius-lg;
			padding-left: 88rpx;
			padding-right: 24rpx;
			font-size: $font-size-base;
			transition: all $transition-base;
			
			&:focus {
				border-color: $primary;
				box-shadow: 0 0 0 2rpx rgba($primary, 0.1);
			}
		}
	}
	
	.code-row {
		display: flex;
		gap: 24rpx;
		margin-bottom: 32rpx;
		
		.flex-1 {
			flex: 1;
			margin-bottom: 0;
		}
		
		.btn-code {
			width: 200rpx;
			height: 96rpx;
			@include flex-center;
			background-color: $tech-blue;
			color: $text-white;
			font-size: $font-size-sm;
			border-radius: $radius-lg;
			
			&[disabled] {
				opacity: 0.6;
				background-color: $gray-400;
			}
			
			&:active:not([disabled]) {
				opacity: 0.9;
			}
		}
	}
	
	.btn-login {
		@include btn-primary;
		width: 100%;
		height: 96rpx;
		margin-top: 48rpx;
		border-radius: $radius-lg;
		font-size: $font-size-lg;
		font-weight: bold;
		background: linear-gradient(90deg, $tech-blue, #4FC3F7);
		box-shadow: $shadow-md;
		
		&:active {
			transform: scale(0.98);
		}
	}
}

.flex-spacer {
	flex: 1;
}

.wechat-login {
	@include flex-column-center;
	margin-bottom: 80rpx;
	
	.wechat-icon-circle {
		width: 80rpx;
		height: 80rpx;
		background-color: #07C160;
		border-radius: $radius-full;
		@include flex-center;
		margin-bottom: 16rpx;
		box-shadow: $shadow-md;
        
        .wechat-icon {
            color: white;
            font-size: 40rpx;
        }
		
		&:active {
			transform: scale(0.95);
		}
	}
	
	.wechat-text {
		font-size: $font-size-sm;
		color: $text-secondary;
		font-weight: $font-weight-medium;
	}
}
</style>