<template>
	<view class="progress-ring" :style="{ width: size + 'rpx', height: size + 'rpx' }">
		<view class="ring-circle" :style="{ borderColor: trackColor, borderWidth: strokeWidth + 'rpx' }"></view>
        <!-- Simple CSS implementation for MVP, ideal solution needs canvas or SVG for arbitrary percentage -->
        <!-- Here we simulate roughly with border and rotation for visual effect -->
		<view class="ring-fill-left" :style="leftStyle"></view>
        <view class="ring-fill-right" :style="rightStyle"></view>
        
        <view class="ring-content">
            <slot></slot>
        </view>
	</view>
</template>

<script>
export default {
    name: 'ProgressRing',
    props: {
        percent: {
            type: Number,
            default: 0
        },
        size: {
            type: Number,
            default: 120
        },
        strokeWidth: {
            type: Number,
            default: 8
        },
        color: {
            type: String,
            default: '#FFFFFF'
        },
        trackColor: {
            type: String,
            default: 'rgba(255,255,255,0.3)'
        }
    },
    computed: {
        leftStyle() {
            // Simplified logic for visual representation
            const deg = this.percent > 50 ? (this.percent - 50) * 3.6 - 135 : -135
            return {
                width: this.size + 'rpx',
                height: this.size + 'rpx',
                borderWidth: this.strokeWidth + 'rpx',
                borderColor: this.color,
                transform: `rotate(${deg}deg)`
            }
        },
        rightStyle() {
            const deg = this.percent <= 50 ? this.percent * 3.6 - 135 : 45
             return {
                width: this.size + 'rpx',
                height: this.size + 'rpx',
                borderWidth: this.strokeWidth + 'rpx',
                borderColor: this.color,
                transform: `rotate(${deg}deg)`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.progress-ring {
    position: relative;
    @include flex-center;
    
    .ring-circle {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-sizing: border-box;
    }
    
    .ring-fill-left, .ring-fill-right {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        border-style: solid;
        border-left-color: transparent !important;
        border-bottom-color: transparent !important;
        box-sizing: border-box;
    }
    
    .ring-content {
        position: relative;
        z-index: 1;
    }
}
</style>