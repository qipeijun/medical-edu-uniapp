<script>
export default {
	onLaunch: function() {
		console.log('App Launch')

		// 获取系统信息
		const systemInfo = uni.getSystemInfoSync()
		console.log('系统信息:', systemInfo)

		// 设置状态栏高度
		uni.setStorageSync('statusBarHeight', systemInfo.statusBarHeight)
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
@import '@/styles/common.scss';
</style>
