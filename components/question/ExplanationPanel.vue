<template>
	<view class="explanation-panel">
		<view class="exp-header" @click="toggle">
			<text class="exp-title">查看解析</text>
			<text class="exp-arrow">{{ expanded ? '▲' : '▼' }}</text>
		</view>
		<view class="exp-content" v-if="expanded">
			<text class="exp-label">【解析】</text>
			<text class="exp-text">{{ content }}</text>
		</view>
	</view>
</template>

<script>
export default {
    name: 'ExplanationPanel',
    props: {
        content: {
            type: String,
            default: ''
        },
        initExpanded: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            expanded: this.initExpanded
        }
    },
    methods: {
        toggle() {
            this.expanded = !this.expanded
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.explanation-panel {
    background-color: lighten($tech-blue, 45%);
    border-radius: $radius-lg;
    padding: 32rpx;
    
    .exp-header {
        @include flex-between;
        margin-bottom: 16rpx;
        
        .exp-title {
            font-size: $font-size-sm;
            font-weight: bold;
            color: $text-primary;
        }
        
        .exp-arrow {
            font-size: $font-size-xs;
            color: $text-tertiary;
        }
    }
    
    .exp-content {
        font-size: $font-size-sm;
        color: $text-secondary;
        line-height: 1.6;
        
        .exp-label {
            color: $tech-blue;
            font-weight: bold;
        }
    }
}
</style>