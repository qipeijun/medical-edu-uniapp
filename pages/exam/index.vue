<template>
	<view class="page">
		<scroll-view class="content" scroll-y>
			<view class="exam-list">
				<view 
					class="exam-card" 
					v-for="exam in exams" 
					:key="exam.id"
					@click="goToExam(exam.id)"
				>
					<view class="card-header">
						<text class="exam-title">{{ exam.title }}</text>
						<view class="status-tag" :class="getStatusClass(exam.status)">
							{{ getStatusText(exam.status) }}
						</view>
					</view>
					
					<view class="card-body">
						<view class="info-row">
							<view class="info-item">
								<text class="label">科目</text>
								<text class="value">{{ exam.subject }}</text>
							</view>
							<view class="info-item">
								<text class="label">时长</text>
								<text class="value">{{ exam.duration }}分钟</text>
							</view>
							<view class="info-item">
								<text class="label">题量</text>
								<text class="value">{{ exam.questionCount }}题</text>
							</view>
						</view>
						
						<view class="time-info" v-if="exam.startTime">
							<text class="time-label">考试时间:</text>
							<text class="time-value">{{ formatTime(exam.startTime) }}</text>
						</view>
                        <view class="desc-info" v-else>
                            <text class="desc-text">{{ exam.description }}</text>
                        </view>
					</view>
					
					<view class="card-footer">
						<text class="participants">{{ exam.participantCount }}人已参加</text>
						<button class="btn-start" :disabled="exam.status !== 'in_progress' && exam.status !== 'available'">
                            {{ getBtnText(exam.status) }}
                        </button>
					</view>
				</view>
			</view>
            
            <view class="footer-spacer"></view>
		</scroll-view>
	</view>
</template>

<script>
import { useExamStore } from '@/stores/exam'
import { formatDate } from '@/utils/date'

export default {
	computed: {
		examStore() {
			return useExamStore()
		},
		exams() {
			return this.examStore.exams
		}
	},
    onLoad() {
        this.examStore.loadExams()
    },
	methods: {
		goBack() {
			uni.navigateBack()
		},
		goToExam(id) {
            const exam = this.exams.find(e => e.id === id)
            if (exam.status === 'not_started') {
                 uni.showToast({ title: '考试尚未开始', icon: 'none' })
                 return
            }
            if (exam.status === 'expired') {
                 uni.showToast({ title: '考试已结束', icon: 'none' })
                 return
            }
            
			uni.navigateTo({
				url: `/pages/exam/take?id=${id}`
			})
		},
        getStatusClass(status) {
            const map = {
                'not_started': 'gray',
                'in_progress': 'blue',
                'available': 'green',
                'finished': 'orange',
                'expired': 'red'
            }
            return map[status] || 'gray'
        },
        getStatusText(status) {
             const map = {
                'not_started': '未开始',
                'in_progress': '进行中',
                'available': '可参加',
                'finished': '已完成',
                'expired': '已结束'
            }
            return map[status] || status
        },
        getBtnText(status) {
            if (status === 'not_started') return '等待开始'
            if (status === 'expired') return '查看解析'
            if (status === 'finished') return '查看成绩'
            return '立即参加'
        },
        formatTime(time) {
            return formatDate(time, 'MM-DD HH:mm')
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
	display: flex;
	flex-direction: column;
}

.header {
	height: 88rpx;
	@include flex-center;
	background-color: $bg-white;
	box-shadow: $shadow-sm;
	position: relative;
    z-index: 10;
	
	.back-btn {
		position: absolute;
		left: 32rpx;
		height: 100%;
		@include flex-center;
		
		.back-icon {
			font-size: 40rpx;
			color: $text-secondary;
		}
	}
	
	.title {
		font-size: $font-size-lg;
		font-weight: bold;
		color: $text-primary;
	}
}

.content {
	flex: 1;
	padding: 32rpx;
}

.exam-list {
	.exam-card {
		background-color: $bg-white;
		border-radius: $radius-lg;
		padding: 32rpx;
		margin-bottom: 32rpx;
		box-shadow: $shadow-sm;
		
		&:active {
			transform: scale(0.99);
		}
		
		.card-header {
			@include flex-between;
			margin-bottom: 24rpx;
			
			.exam-title {
				font-size: $font-size-base;
				font-weight: bold;
				color: $text-primary;
				flex: 1;
				margin-right: 16rpx;
			}
			
			.status-tag {
				font-size: $font-size-xs;
				padding: 4rpx 12rpx;
				border-radius: $radius-sm;
				
				&.gray { background-color: $gray-100; color: $text-tertiary; }
				&.blue { background-color: $light-cyan; color: $tech-blue; }
				&.green { background-color: lighten($grass-green, 30%); color: darken($grass-green, 10%); }
				&.orange { background-color: #FFF3E0; color: #FF9800; }
                &.red { background-color: #FFEBEE; color: #F44336; }
			}
		}
		
		.card-body {
			padding-bottom: 24rpx;
			border-bottom: 1px solid $gray-50;
			margin-bottom: 24rpx;
			
			.info-row {
				display: flex;
				margin-bottom: 16rpx;
				
				.info-item {
					margin-right: 32rpx;
					
					.label {
						font-size: $font-size-xs;
						color: $text-tertiary;
						margin-right: 8rpx;
					}
					
					.value {
						font-size: $font-size-sm;
						color: $text-secondary;
                        font-weight: 500;
					}
				}
			}
			
			.time-info {
				font-size: $font-size-xs;
				color: $text-tertiary;
                
                .time-value {
                    margin-left: 8rpx;
                    color: $text-secondary;
                }
			}
            
            .desc-info {
                .desc-text {
                    font-size: $font-size-xs;
                    color: $text-tertiary;
                    @include line-clamp(1);
                }
            }
		}
		
		.card-footer {
			@include flex-between;
			
			.participants {
				font-size: $font-size-xs;
				color: $text-tertiary;
			}
			
			.btn-start {
				@include btn-primary;
				height: 64rpx;
				padding: 0 32rpx;
				font-size: $font-size-sm;
				border-radius: $radius-full;
                margin: 0;
                
                &[disabled] {
                    background: $gray-200;
                    color: $text-tertiary;
                    box-shadow: none;
                }
			}
		}
	}
}

.footer-spacer {
    height: 40rpx;
}
</style>