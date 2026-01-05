<template>
	<view v-if="isTabBarPage" class="custom-tabbar">
		<view
			v-for="(item, index) in tabList"
			:key="index"
			class="tab-item"
			@click="switchTab(index)"
		>
			<image 
				class="tab-icon" 
				:src="current === index ? item.selectedIconPath : item.iconPath"
				mode="aspectFit"
			></image>
			<text class="tab-text" :style="{ color: current === index ? selectedColor : color }">
				{{ item.text }}
			</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CustomTabBar',
	data() {
		return {
			color: '#9CA3AF',
			selectedColor: '#03A9F4',
			current: 0,
			tabList: [
				{
					pagePath: '/pages/home/index',
					text: '首页',
					iconPath: '/static/tabbar/home.png',
					selectedIconPath: '/static/tabbar/home-active.png'
				},
				{
					pagePath: '/pages/study/index',
					text: '学习',
					iconPath: '/static/tabbar/study.png',
					selectedIconPath: '/static/tabbar/study-active.png'
				},
				{
					pagePath: '/pages/review/index',
					text: '复习',
					iconPath: '/static/tabbar/review.png',
					selectedIconPath: '/static/tabbar/review-active.png'
				},
				{
					pagePath: '/pages/profile/index',
					text: '我的',
					iconPath: '/static/tabbar/profile.png',
					selectedIconPath: '/static/tabbar/profile-active.png'
				}
			],
			tabBarPages: [
				'/pages/home/index',
				'/pages/study/index',
				'/pages/review/index',
				'/pages/profile/index'
			]
		}
	},
	computed: {
		isTabBarPage() {
			const pages = getCurrentPages()
			if (pages.length === 0) return false
			const currentPage = pages[pages.length - 1]
			const route = '/' + currentPage.route
			return this.tabBarPages.includes(route)
		}
	},
	mounted() {
		this.updateCurrent()
	},
	methods: {
		updateCurrent() {
			const pages = getCurrentPages()
			if (pages.length === 0) return
			const currentPage = pages[pages.length - 1]
			const route = '/' + currentPage.route
			const index = this.tabBarPages.indexOf(route)
			if (index !== -1) {
				this.current = index
			}
		},
		switchTab(index) {
			const url = this.tabList[index].pagePath
			uni.switchTab({ url })
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.custom-tabbar {
	@include fixed-bottom;
	@include flex-between;
	height: 100rpx;
	background: $bg-white;
	border-top: 2rpx solid $border-light;
	box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.04);
	z-index: $z-tabbar;

	.tab-item {
		@include flex-column-center;
		flex: 1;
		padding: 16rpx 0; // Increased for better touch target
		transition: all $transition-base;

		&:active {
			opacity: 0.7;
		}

		.tab-icon {
			width: 48rpx;
			height: 48rpx;
			margin-bottom: 4rpx;
		}

		.tab-text {
			font-size: $font-size-xs;
			font-weight: $font-weight-medium;
		}
	}
}
</style>
