<template>
	<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
</template>

<script>
export default {
	name: 'StatusBar',
	data() {
		return {
			statusBarHeight: 0
		}
	},
	mounted() {
		// 获取状态栏高度
		const systemInfo = uni.getSystemInfoSync()
		this.statusBarHeight = systemInfo.statusBarHeight || 20
	}
}
</script>

<style lang="scss" scoped>
.status-bar {
	width: 100%;
}
</style>
