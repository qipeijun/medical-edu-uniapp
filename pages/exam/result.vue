<template>
	<view class="page">
		<view class="content">
            <view class="result-card">
                <text class="title">考试成绩</text>
                <view class="score-circle">
                    <text class="score">{{ score }}</text>
                    <text class="label">分</text>
                </view>
                <view class="stats-row">
                    <view class="stat-item">
                        <text class="count correct">{{ correct }}</text>
                        <text class="desc">答对</text>
                    </view>
                    <view class="stat-item">
                        <text class="count wrong">{{ total - correct }}</text>
                        <text class="desc">答错</text>
                    </view>
                    <view class="stat-item">
                        <text class="count">{{ total }}</text>
                        <text class="desc">总题数</text>
                    </view>
                </view>
            </view>
            
            <view class="action-buttons">
                <button class="btn-primary" @click="reviewExam">查看解析</button>
                <button class="btn-secondary" @click="backToList">返回列表</button>
            </view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			score: 0,
            total: 0,
            correct: 0
		}
	},
	onLoad(options) {
		this.score = parseInt(options.score || 0)
        this.total = parseInt(options.total || 0)
        this.correct = parseInt(options.correct || 0)
	},
	methods: {
		reviewExam() {
            uni.showToast({ title: '解析功能开发中', icon: 'none' })
		},
		backToList() {
			uni.navigateBack()
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
}

.content {
	padding: 64rpx 32rpx;
    @include flex-column-center;
    height: 100%;
}

.result-card {
    background-color: $bg-white;
    border-radius: $radius-xl;
    padding: 64rpx 48rpx;
    width: 100%;
    @include flex-column-center;
    box-shadow: $shadow-lg;
    margin-bottom: 64rpx;
    
    .title {
        font-size: $font-size-lg;
        font-weight: bold;
        color: $text-primary;
        margin-bottom: 48rpx;
    }
    
    .score-circle {
        width: 240rpx;
        height: 240rpx;
        border-radius: $radius-full;
        border: 16rpx solid $tech-blue;
        @include flex-center;
        margin-bottom: 48rpx;
        
        .score {
            font-size: 80rpx;
            font-weight: bold;
            color: $tech-blue;
        }
        
        .label {
            font-size: $font-size-sm;
            color: $text-secondary;
            margin-top: 24rpx;
            margin-left: 8rpx;
        }
    }
    
    .stats-row {
        width: 100%;
        display: flex;
        justify-content: space-around;
        
        .stat-item {
            @include flex-column-center;
            
            .count {
                font-size: 40rpx;
                font-weight: bold;
                color: $text-primary;
                margin-bottom: 8rpx;
                
                &.correct { color: $success; }
                &.wrong { color: $error; }
            }
            
            .desc {
                font-size: $font-size-xs;
                color: $text-tertiary;
            }
        }
    }
}

.action-buttons {
    width: 100%;
    
    button {
        width: 100%;
        margin-bottom: 32rpx;
        border-radius: $radius-full;
        
        &.btn-primary {
            @include btn-primary;
        }
        
        &.btn-secondary {
            @include btn-secondary;
        }
    }
}
</style>