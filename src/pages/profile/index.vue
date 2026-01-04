<template>
	<view class="page">
		<StatusBar />
		
		<!-- Top Background -->
		<view class="top-bg"></view>
		
		<scroll-view class="content" scroll-y>
			<!-- Profile Card -->
			<view class="profile-card" @click="goToInfoComplete">
				<view class="avatar-box">
					<image v-if="userInfo.avatar" :src="userInfo.avatar" mode="aspectFill" class="avatar-img"></image>
					<view v-else class="avatar-placeholder">
                        <!-- Default avatar logic in case image is missing -->
                        <image src="/static/logo.png" mode="aspectFill" class="avatar-img" v-if="false"></image> 
                        <!-- Fallback to emoji if no image -->
                        <text style="font-size: 60rpx;">👤</text>
                    </view>
				</view>
				<view class="info-box">
					<view class="name-row">
						<text class="name">{{ displayName }}</text>
						<text class="arrow">></text>
					</view>
					<text class="detail">{{ userInfo.school || '未设置学校' }} · {{ userInfo.grade || '未设置年级' }}</text>
					<text class="detail">{{ userInfo.major || '未设置专业' }}</text>
				</view>
			</view>
			
			<!-- Menu List -->
			<view class="menu-group">
				<view class="menu-item" @click="navigateTo('/pages/notebook/index')">
					<view class="icon-box orange">📒</view>
					<text class="menu-text">我的笔记本</text>
					<text class="arrow">></text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/favorites/index')">
					<view class="icon-box yellow">⭐</view>
					<text class="menu-text">我的收藏</text>
					<text class="arrow">></text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/exam/index')">
					<view class="icon-box purple">📝</view>
					<text class="menu-text">我的考试</text>
					<text class="arrow">></text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/messages/index')">
					<view class="icon-box blue">🔔</view>
					<text class="menu-text">消息通知</text>
					<view class="right-box">
						<view class="badge"></view>
						<text class="arrow">></text>
					</view>
				</view>
			</view>
			
			<!-- Settings Group -->
			<view class="menu-group">
				<view class="menu-item" @click="navigateTo('/pages/settings/index')">
					<view class="icon-box gray">⚙️</view>
					<text class="menu-text">基础设置</text>
					<text class="arrow">></text>
				</view>
				<view class="menu-item" @click="showAbout">
					<view class="icon-box gray">ℹ️</view>
					<text class="menu-text">关于我们</text>
					<text class="arrow">></text>
				</view>
                <view class="menu-item" @click="handleLogout">
					<view class="icon-box red">🚪</view>
					<text class="menu-text">退出登录</text>
					<text class="arrow">></text>
				</view>
			</view>
			
			<view class="footer-spacer"></view>
		</scroll-view>
		
		<TabBar />
	</view>
</template>

<script>
import { useUserStore } from '@/stores/user'
import StatusBar from '@/components/common/StatusBar.vue'
import TabBar from '@/components/common/TabBar.vue'

export default {
	components: { StatusBar, TabBar },
	computed: {
		userStore() {
			return useUserStore()
		},
		userInfo() {
			return this.userStore.userInfo
		},
		displayName() {
			return this.userStore.displayName
		}
	},
	methods: {
		goToInfoComplete() {
			uni.navigateTo({ url: '/pages/auth/info-complete' })
		},
		navigateTo(url) {
			uni.navigateTo({ url })
		},
		showAbout() {
			uni.showModal({
				title: '关于医教通',
				content: '版本 1.0.0\n致力于打造最好的医学教育平台',
				showCancel: false
			})
		},
        handleLogout() {
            uni.showModal({
                title: '提示',
                content: '确定要退出登录吗?',
                success: (res) => {
                    if (res.confirm) {
                        this.userStore.logout()
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
	position: relative;
    overflow: hidden;
}

.top-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 500rpx;
	background: linear-gradient(180deg, $tech-blue 0%, $light-cyan 100%);
	border-radius: 0 0 60rpx 60rpx;
	z-index: 0;
}

.content {
	height: 100vh;
	position: relative;
	z-index: 1;
	padding: 0 32rpx;
    padding-top: 200rpx; // Adjust based on Status Bar + some space
}

.profile-card {
	background-color: $bg-white;
	border-radius: $radius-xl;
	padding: 32rpx;
	display: flex;
	align-items: center;
	box-shadow: $shadow-lg;
	margin-bottom: 32rpx;
	
	.avatar-box {
		width: 128rpx;
		height: 128rpx;
		border-radius: $radius-full;
		background-color: $gray-200;
		border: 4rpx solid $bg-white;
		box-shadow: $shadow-sm;
		overflow: hidden;
		margin-right: 32rpx;
        @include flex-center;
		
		.avatar-img {
			width: 100%;
			height: 100%;
		}

        .avatar-placeholder {
            @include flex-center;
            width: 100%;
            height: 100%;
            background: $gray-100;
        }
	}
	
	.info-box {
		flex: 1;
		
		.name-row {
			@include flex-between;
			margin-bottom: 12rpx;
			
			.name {
				font-size: $font-size-lg;
				font-weight: bold;
				color: $text-primary;
			}
			
			.arrow {
				color: $gray-400;
				font-size: $font-size-sm;
			}
		}
		
		.detail {
			display: block;
			font-size: $font-size-xs;
			color: $text-secondary;
			margin-bottom: 4rpx;
		}
	}
}

.menu-group {
	background-color: $bg-white;
	border-radius: $radius-xl;
	box-shadow: $shadow-sm;
	margin-bottom: 32rpx;
	overflow: hidden;
	
	.menu-item {
		display: flex;
		align-items: center;
		padding: 32rpx;
		border-bottom: 1px solid $gray-50;
		transition: background-color $transition-base;
		
		&:last-child {
			border-bottom: none;
		}
		
		&:active {
			background-color: $gray-50;
		}
		
		.icon-box {
			width: 64rpx;
			height: 64rpx;
			border-radius: $radius-md;
			@include flex-center;
			margin-right: 24rpx;
			font-size: 32rpx;
			
			&.orange { background-color: #FFF3E0; color: #FF9800; }
			&.yellow { background-color: #FFF8E1; color: #FFC107; }
			&.purple { background-color: #F3E5F5; color: #9C27B0; }
			&.blue { background-color: #E3F2FD; color: #2196F3; }
			&.gray { background-color: #F5F5F5; color: #9E9E9E; }
            &.red { background-color: #FFEBEE; color: #F44336; }
		}
		
		.menu-text {
			flex: 1;
			font-size: $font-size-sm;
			font-weight: $font-weight-medium;
			color: $text-primary;
		}
		
		.arrow {
			color: $gray-300;
			font-size: $font-size-xs;
		}
		
		.right-box {
			display: flex;
			align-items: center;
			
			.badge {
				width: 16rpx;
				height: 16rpx;
				background-color: $error;
				border-radius: $radius-full;
				margin-right: 16rpx;
			}
		}
	}
}

.footer-spacer {
	height: 160rpx;
}
</style>