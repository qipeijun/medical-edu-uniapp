<template>
	<view class="page" v-if="course">
		<!-- Header Image -->
		<view class="header-image">
			<image :src="course.cover" mode="aspectFill" class="cover-img"></image>
			<view class="header-overlay">
				<view class="back-btn" @click="goBack">
					<text class="back-icon">←</text>
				</view>
			</view>
		</view>

		<!-- Content -->
		<scroll-view class="content" scroll-y>
			<!-- Info Card -->
			<view class="info-card">
				<text class="title">{{ course.title }}</text>
				<text class="subtitle">{{ course.subtitle }}</text>
				<view class="meta-row">
					<view class="meta-item">
						<text class="label">讲师</text>
						<text class="value">{{ course.instructor }}</text>
					</view>
					<view class="divider"></view>
					<view class="meta-item">
						<text class="label">时长</text>
						<text class="value">{{ course.duration }}</text>
					</view>
					<view class="divider"></view>
					<view class="meta-item">
						<text class="label">评分</text>
						<text class="value star">⭐ {{ course.rating }}</text>
					</view>
				</view>
			</view>

			<!-- Tabs -->
			<view class="tabs">
				<view class="tab-item" :class="{ active: currentTab === 0 }" @click="currentTab = 0">课程目录</view>
				<view class="tab-item" :class="{ active: currentTab === 1 }" @click="currentTab = 1">课程详情</view>
			</view>

			<!-- Chapters -->
			<view class="tab-content" v-if="currentTab === 0">
				<view class="chapter" v-for="(chapter, index) in course.chapters" :key="index">
					<text class="chapter-title">{{ chapter.title }}</text>
					<view class="lesson-list">
						<view 
							class="lesson-item" 
							v-for="lesson in chapter.lessons" 
							:key="lesson.id"
                            @click="playLesson(lesson)"
						>
							<view class="play-icon">▶</view>
							<view class="lesson-info">
								<text class="lesson-title">{{ lesson.title }}</text>
								<text class="lesson-duration">{{ lesson.duration }}</text>
							</view>
							<view v-if="lesson.isFree" class="free-tag">试看</view>
                            <view v-else class="lock-icon">🔒</view>
						</view>
					</view>
				</view>
			</view>

			<!-- Description -->
			<view class="tab-content" v-if="currentTab === 1">
				<view class="desc-box">
					<text class="desc-title">课程简介</text>
					<text class="desc-text">{{ course.description }}</text>
				</view>
                
                <view class="desc-box">
					<text class="desc-title">讲师介绍</text>
					<text class="desc-text">{{ course.instructor }} - {{ course.instructorTitle }}</text>
				</view>
			</view>
            
            <view class="footer-spacer"></view>
		</scroll-view>

		<!-- Footer -->
		<view class="footer">
			<button class="btn-enroll" @click="handleEnroll">{{ isEnrolled ? '继续学习' : '立即加入' }}</button>
		</view>
	</view>
</template>

<script>
import { useCourseStore } from '@/stores/course'

export default {
	data() {
		return {
			courseId: null,
			currentTab: 0,
            course: null
		}
	},
    computed: {
        courseStore() {
            return useCourseStore()
        },
        isEnrolled() {
            return this.courseStore.myCourses.includes(this.courseId)
        }
    },
	onLoad(options) {
		this.courseId = options.id
        this.courseStore.setCurrentCourse(this.courseId)
        this.course = this.courseStore.currentCourse
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
        handleEnroll() {
            if (this.isEnrolled) {
                 uni.showToast({ title: '开始播放', icon: 'none' })
            } else {
                this.courseStore.enrollCourse(this.courseId)
                uni.showToast({ title: '加入成功' })
            }
        },
        playLesson(lesson) {
            if (lesson.isFree || this.isEnrolled) {
                uni.showToast({ title: '播放: ' + lesson.title, icon: 'none' })
            } else {
                uni.showToast({ title: '请先加入课程', icon: 'none' })
            }
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

.header-image {
	width: 100%;
	height: 420rpx;
	position: relative;
    
    .cover-img {
        width: 100%;
        height: 100%;
    }
	
	.header-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		padding-top: var(--status-bar-height);
		height: 88rpx;
		display: flex;
		align-items: center;
		padding-left: 32rpx;
		background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
		
		.back-btn {
			width: 64rpx;
			height: 64rpx;
			border-radius: $radius-full;
			background-color: rgba(0,0,0,0.3);
			@include flex-center;
            
            .back-icon {
                color: white;
                font-size: 40rpx;
            }
		}
	}
}

.content {
	flex: 1;
	margin-top: -40rpx;
	border-radius: $radius-xl $radius-xl 0 0;
	background-color: $bg-base;
	position: relative;
	z-index: 10;
	padding: 32rpx;
}

.info-card {
	background-color: $bg-white;
	border-radius: $radius-lg;
	padding: 32rpx;
	box-shadow: $shadow-sm;
	margin-bottom: 32rpx;
	
	.title {
		font-size: $font-size-lg;
		font-weight: bold;
		color: $text-primary;
		margin-bottom: 8rpx;
		display: block;
	}
	
	.subtitle {
		font-size: $font-size-sm;
		color: $text-secondary;
		margin-bottom: 24rpx;
		display: block;
	}
	
	.meta-row {
		display: flex;
		align-items: center;
		
		.meta-item {
			@include flex-column-center;
			flex: 1;
			
			.label {
				font-size: $font-size-xs;
				color: $text-tertiary;
				margin-bottom: 4rpx;
			}
			
			.value {
				font-size: $font-size-sm;
				font-weight: bold;
				color: $text-primary;
                
                &.star {
                    color: $warning;
                }
			}
		}
		
		.divider {
			width: 1px;
			height: 40rpx;
			background-color: $border-light;
		}
	}
}

.tabs {
	display: flex;
	border-bottom: 2rpx solid $border-light;
	margin-bottom: 24rpx;
	
	.tab-item {
		flex: 1;
		text-align: center;
		padding: 24rpx 0;
		font-size: $font-size-base;
		color: $text-secondary;
		position: relative;
		
		&.active {
			color: $tech-blue;
			font-weight: bold;
			
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 48rpx;
				height: 4rpx;
				background-color: $tech-blue;
				border-radius: $radius-full;
			}
		}
	}
}

.tab-content {
	.chapter {
		margin-bottom: 32rpx;
		
		.chapter-title {
			font-size: $font-size-base;
			font-weight: bold;
			color: $text-primary;
			margin-bottom: 16rpx;
			display: block;
            padding-left: 16rpx;
            border-left: 8rpx solid $tech-blue;
		}
		
		.lesson-list {
			background-color: $bg-white;
			border-radius: $radius-lg;
			overflow: hidden;
			
			.lesson-item {
				padding: 24rpx;
				border-bottom: 2rpx solid $gray-50;
				display: flex;
				align-items: center;
				
				&:last-child {
					border-bottom: none;
				}
                
                &:active {
                    background-color: $gray-50;
                }
				
				.play-icon {
					width: 48rpx;
					height: 48rpx;
					border-radius: $radius-full;
					background-color: $light-cyan;
					color: $tech-blue;
					@include flex-center;
					font-size: 24rpx;
					margin-right: 24rpx;
                    flex-shrink: 0;
				}
				
				.lesson-info {
					flex: 1;
					
					.lesson-title {
						font-size: $font-size-sm;
						color: $text-primary;
						margin-bottom: 4rpx;
						display: block;
					}
					
					.lesson-duration {
						font-size: $font-size-xs;
						color: $text-tertiary;
					}
				}
				
				.free-tag {
					font-size: 20rpx;
					color: $success;
					border: 2rpx solid $success;
					padding: 2rpx 8rpx;
					border-radius: $radius-sm;
				}
                
                .lock-icon {
                    font-size: 24rpx;
                    color: $text-disabled;
                }
			}
		}
	}
    
    .desc-box {
        background-color: $bg-white;
        border-radius: $radius-lg;
        padding: 32rpx;
        margin-bottom: 24rpx;
        
        .desc-title {
            font-size: $font-size-base;
            font-weight: bold;
            color: $text-primary;
            margin-bottom: 16rpx;
            display: block;
        }
        
        .desc-text {
            font-size: $font-size-sm;
            color: $text-secondary;
            line-height: 1.6;
        }
    }
}

.footer-spacer {
    height: 120rpx;
}

.footer {
	@include fixed-bottom;
	background-color: $bg-white;
	padding: 16rpx 32rpx;
	box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
	
	.btn-enroll {
		@include btn-primary;
		width: 100%;
		border-radius: $radius-full;
	}
}
</style>