<template>
	<view class="page">
		<scroll-view class="content" scroll-y>
			<!-- Overall Card -->
			<view class="overall-card">
				<view class="bg-decoration"></view>
				<view class="card-content">
					<view class="left">
						<text class="label">今日待复习总题数</text>
						<view class="count-box">
							<text class="count">{{ totalToday }}</text>
							<text class="unit">题</text>
						</view>
					</view>
					<view class="right">
                        <ProgressRing 
                            :percent="progress" 
                            :size="120" 
                            :strokeWidth="8"
                            color="#FFFFFF"
                            trackColor="rgba(255,255,255,0.3)"
                        >
                            <text class="percent">{{ progress }}%</text>
                        </ProgressRing>
					</view>
				</view>
				<view class="status-badge">
					已复习 {{ completedCount }} 题
				</view>
			</view>

			<!-- Subject List -->
			<view class="section-title">待复习学科</view>
			<view class="subject-list">
				<view class="subject-card" v-for="(group, subjectId) in reviewsBySubject" :key="subjectId">
					<view class="card-left">
						<view class="icon-ring">
                             <!-- Mini Progress Ring for each subject -->
                             <ProgressRing 
                                :percent="group.progress" 
                                :size="96" 
                                :strokeWidth="6"
                                :color="getSubjectColor(group.subjectName)"
                                :trackColor="getSubjectColor(group.subjectName) + '33'" 
                            >
                                <text class="icon" :style="{ color: getSubjectColor(group.subjectName) }">
                                    {{ getSubjectIcon(group.subjectName) }}
                                </text>
                            </ProgressRing>
						</view>
						<view class="info">
							<text class="name">{{ group.subjectName }}</text>
							<text class="desc">待复习 {{ group.total - group.completed }} 题</text>
						</view>
					</view>
					<view class="card-right">
                        <view v-if="isRecommended(group)" class="tag">速刷推荐</view>
						<button class="btn-start" @click="startReview(group.subjectId)">开始</button>
					</view>
				</view>
                
                <view v-if="totalToday === 0" class="empty-state">
                    <text class="empty-text">今日暂无复习任务 🎉</text>
                </view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
import { useReviewStore } from '@/stores/review'
import { useQuestionStore } from '@/stores/question'
import ProgressRing from '@/components/review/ProgressRing.vue'
import { SUBJECTS } from '@/utils/constants'

export default {
	components: { ProgressRing },
	computed: {
		reviewStore() {
			return useReviewStore()
		},
		totalToday() {
			return this.reviewStore.totalToday
		},
		completedCount() {
			return this.reviewStore.completedCount
		},
		progress() {
			return this.reviewStore.progress
		},
		reviewsBySubject() {
			return this.reviewStore.reviewsBySubject
		}
	},
	onShow() {
		this.reviewStore.loadTodayReviews()
	},
	methods: {
        getSubjectColor(name) {
            const subject = SUBJECTS.find(s => s.name === name)
            return subject ? subject.color : '#03A9F4'
        },
        getSubjectIcon(name) {
             const map = {
                '系统解剖学': '🦴',
                '生理学': '💓',
                '病理学': '🔬',
                '药理学': '💊',
                '内科学': '🩺',
                '外科学': '🔪',
                '妇产科学': '👩',
                '儿科学': '👶'
            }
            return map[name] || '📚'
        },
        isRecommended(group) {
            return (group.total - group.completed) > 10
        },
		startReview(subjectId) {
            const questionStore = useQuestionStore()
            uni.showToast({ title: '开始复习 ' + subjectId, icon: 'none' })
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

.content {
	flex: 1;
	padding: 32rpx;
	width: 100%;
	box-sizing: border-box;
}

.overall-card {
	background: linear-gradient(135deg, $tech-blue, #4FC3F7);
	border-radius: $radius-xl;
	padding: 48rpx;
	color: $text-white;
	position: relative;
	overflow: hidden;
	margin-bottom: 48rpx;
	box-shadow: $shadow-lg;
	max-width: 100%;
	box-sizing: border-box;
	
	.bg-decoration {
		position: absolute;
		top: -40rpx;
		right: -40rpx;
		width: 200rpx;
		height: 200rpx;
		background-color: rgba(255,255,255,0.1);
		border-radius: $radius-full;
	}
	
	.card-content {
		@include flex-between;
		margin-bottom: 32rpx;
		position: relative;
		z-index: 1;
		
		.left {
			flex: 1;
			overflow: hidden;
			margin-right: 24rpx;
			
			.label {
				font-size: $font-size-sm;
				opacity: 0.9;
				margin-bottom: 8rpx;
				display: block;
			}
			
			.count-box {
				display: flex;
				align-items: baseline;
				
				.count {
					font-size: 80rpx;
					font-weight: bold;
					line-height: 1;
				}
				
				.unit {
					font-size: $font-size-base;
					margin-left: 8rpx;
					opacity: 0.9;
				}
			}
		}
        
        .right {
            flex-shrink: 0;
            
            .percent {
                font-size: $font-size-sm;
                font-weight: bold;
                color: $text-white;
            }
        }
	}
	
	.status-badge {
		display: inline-block;
		padding: 8rpx 24rpx;
		background-color: rgba(255,255,255,0.2);
		border-radius: $radius-full;
		font-size: $font-size-xs;
	}
}

.section-title {
	font-size: $font-size-base;
	font-weight: bold;
	color: $text-primary;
	margin-bottom: 24rpx;
}

.subject-list {
	.subject-card {
		background-color: $bg-white;
		border-radius: $radius-lg;
		padding: 32rpx;
		margin-bottom: 24rpx;
		box-shadow: $shadow-sm;
		border: 2rpx solid $border-light;
		max-width: 100%;
		box-sizing: border-box;
		@include flex-between;
		
		.card-left {
			display: flex;
			align-items: center;
			flex: 1;
			overflow: hidden;
			margin-right: 24rpx;
			
			.icon-ring {
				margin-right: 24rpx;
				flex-shrink: 0;
				
				.icon {
					font-size: 40rpx;
				}
			}
			
			.info {
				.name {
					font-size: $font-size-base;
					font-weight: bold;
					color: $text-primary;
					display: block;
					margin-bottom: 8rpx;
				}
				
				.desc {
					font-size: $font-size-xs;
					color: $text-tertiary;
				}
			}
		}
		
		.card-right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			flex-shrink: 0;
			
			.tag {
				font-size: 20rpx;
				color: darken($grass-green, 10%);
				background-color: lighten($grass-green, 30%);
				padding: 4rpx 12rpx;
				border-radius: $radius-sm;
				margin-bottom: 12rpx;
			}
			
			.btn-start {
				@include btn-primary;
				padding: 12rpx 32rpx;
				height: auto;
				font-size: $font-size-xs;
				border-radius: $radius-full;
			}
		}
	}
    
    .empty-state {
        padding: 64rpx;
        text-align: center;
        .empty-text {
            color: $text-tertiary;
            font-size: $font-size-base;
        }
    }
}

.footer-spacer {
	height: 160rpx;
}
</style>