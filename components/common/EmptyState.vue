<template>
	<view class="empty-state">
		<view class="icon-box">
			<text class="icon">{{ icon || '📭' }}</text>
		</view>
		<text class="text">{{ text || '暂无数据' }}</text>
		<view v-if="$slots.action" class="action-box">
			<slot name="action"></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: 'EmptyState',
	props: {
		text: {
			type: String,
			default: ''
		},
		icon: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.empty-state {
	@include flex-column-center;
	padding: 120rpx 32rpx;
	
	.icon-box {
		width: 160rpx;
		height: 160rpx;
		background-color: $gray-50;
		border-radius: $radius-full;
		@include flex-center;
		margin-bottom: 32rpx;
		
		.icon {
			font-size: 80rpx;
			opacity: 0.5;
		}
	}
	
	.text {
		font-size: $font-size-base;
		color: $text-tertiary;
		margin-bottom: 32rpx;
	}
	
	.action-box {
		width: 100%;
		@include flex-center;
	}
}
</style>