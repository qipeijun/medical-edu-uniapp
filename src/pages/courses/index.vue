<template>
	<view class="page">
		<scroll-view class="content" scroll-y>
			<view class="course-list">
				<view 
					class="course-card" 
					v-for="course in courses" 
					:key="course.id"
					@click="goToDetail(course.id)"
				>
					<view class="cover-box">
						<image :src="course.cover" mode="aspectFill" class="cover-img"></image>
						<view class="duration-badge">{{ course.duration }}</view>
					</view>
					<view class="info-box">
						<text class="course-title">{{ course.title }}</text>
						<text class="course-subtitle">{{ course.subtitle }}</text>
						<view class="meta-row">
							<text class="instructor">{{ course.instructor }}</text>
							<text class="students">{{ course.studentCount }}人学习</text>
						</view>
					</view>
				</view>
			</view>
            
            <view class="footer-spacer"></view>
		</scroll-view>
	</view>
</template>

<script>
import { useCourseStore } from '@/stores/course'

export default {
	computed: {
		courseStore() {
			return useCourseStore()
		},
		courses() {
			return this.courseStore.courses
		}
	},
    onLoad() {
        this.courseStore.loadCourses()
    },
	methods: {
		goBack() {
			uni.navigateBack()
		},
		goToDetail(id) {
			uni.navigateTo({
				url: `/pages/courses/detail?id=${id}`
			})
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

.course-list {
	.course-card {
		background-color: $bg-white;
		border-radius: $radius-lg;
		overflow: hidden;
		box-shadow: $shadow-sm;
		margin-bottom: 32rpx;
		max-width: 100%;
		box-sizing: border-box;
		
		&:active {
			transform: scale(0.99);
		}
		
		.cover-box {
			width: 100%;
			height: 320rpx;
			position: relative;
            background-color: $gray-200;
			
			.cover-img {
				width: 100%;
				height: 100%;
			}
			
			.duration-badge {
				position: absolute;
				right: 16rpx;
				bottom: 16rpx;
				background-color: rgba(0,0,0,0.6);
				color: $text-white;
				font-size: $font-size-xs;
				padding: 4rpx 12rpx;
				border-radius: $radius-sm;
			}
		}
		
		.info-box {
			padding: 24rpx;
			
			.course-title {
				font-size: $font-size-base;
				font-weight: bold;
				color: $text-primary;
				margin-bottom: 8rpx;
				@include text-ellipsis;
                display: block;
			}
			
			.course-subtitle {
				font-size: $font-size-sm;
				color: $text-secondary;
				margin-bottom: 16rpx;
				@include text-ellipsis;
                display: block;
			}
			
			.meta-row {
				@include flex-between;
				font-size: $font-size-xs;
				color: $text-tertiary;
			}
		}
	}
}

.footer-spacer {
    height: 40rpx;
}
</style>