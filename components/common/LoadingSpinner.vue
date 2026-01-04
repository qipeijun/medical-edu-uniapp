<template>
	<view class="loading-spinner" :class="{ fullscreen: fullscreen }">
		<view class="spinner"></view>
		<text v-if="text" class="text">{{ text }}</text>
	</view>
</template>

<script>
export default {
	name: 'LoadingSpinner',
	props: {
		text: {
			type: String,
			default: ''
		},
		fullscreen: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.loading-spinner {
	@include flex-column-center;
	padding: 32rpx;
	
	&.fullscreen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.8);
		z-index: 9999;
	}
	
	.spinner {
		width: 48rpx;
		height: 48rpx;
		border: 4rpx solid $gray-200;
		border-top-color: $tech-blue;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
		margin-bottom: 16rpx;
	}
	
	.text {
		font-size: $font-size-xs;
		color: $text-tertiary;
	}
}

@keyframes spin {
	to { transform: rotate(360deg); }
}
</style>