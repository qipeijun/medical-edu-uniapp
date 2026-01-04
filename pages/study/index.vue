<template>
	<view class="page">
		<view class="main-layout">
			<!-- Sidebar -->
			<scroll-view class="sidebar" scroll-y>
				<view 
					class="sidebar-item" 
					v-for="subject in subjects" 
					:key="subject.id"
					:class="{ active: currentSubjectId === subject.id }"
					@click="selectSubject(subject.id)"
				>
					<text class="sidebar-text">{{ subject.name }}</text>
				</view>
                <!-- Padding for bottom -->
                <view style="height: 120rpx;"></view>
			</scroll-view>

			<!-- Content -->
			<scroll-view class="content" scroll-y>
				<view class="content-header">
					<text class="subject-title">{{ currentSubjectName }} - 题库</text>
				</view>
				
				<view class="category-grid" v-if="currentCategories.length > 0">
					<view 
						class="category-card" 
						v-for="cat in currentCategories" 
						:key="cat.id"
						@click="selectCategory(cat.id)"
					>
						<view class="card-img-box">
                             <view class="placeholder-img" :style="{ backgroundColor: currentSubjectColor + '20' }">
                                 <text class="cat-icon" :style="{ color: currentSubjectColor }">📚</text>
                             </view>
						</view>
						<text class="cat-name">{{ cat.name }}</text>
						<text class="cat-count">共 {{ cat.questionCount }} 题</text>
					</view>
				</view>
                
                <view v-else class="empty-state">
                    <text class="empty-text">该学科暂无题库数据</text>
                </view>
				
				<view class="footer-spacer"></view>
			</scroll-view>
		</view>

		<TabBar />
	</view>
</template>

<script>
import { useQuestionStore } from '@/stores/question'
import TabBar from '@/components/common/TabBar.vue'

export default {
	components: { TabBar },
	data() {
		return {
			currentSubjectId: 1
		}
	},
	computed: {
		questionStore() {
			return useQuestionStore()
		},
		subjects() {
			return this.questionStore.subjects
		},
		currentSubject() {
			return this.subjects.find(s => s.id === this.currentSubjectId) || {}
		},
		currentSubjectName() {
			return this.currentSubject.name || ''
		},
		currentSubjectColor() {
			return this.currentSubject.color || '#03A9F4'
		},
		currentCategories() {
			return this.currentSubject.categories || []
		}
	},
	methods: {
		selectSubject(id) {
			this.currentSubjectId = id
		},
		selectCategory(catId) {
            // Set store state
            this.questionStore.setCurrentCategory(this.currentSubjectId, catId)
            // Navigate to question detail (or list if we had one, but MVP goes straight to detail/first question)
			uni.navigateTo({ url: '/pages/study/question-detail' })
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
	z-index: 10;
	border-bottom: 1px solid $border-light;
	
	.title {
		font-size: $font-size-lg;
		font-weight: bold;
		color: $text-primary;
	}
}

.main-layout {
	flex: 1;
	display: flex;
	overflow: hidden;
}

.sidebar {
	width: 180rpx;
	height: 100%;
	background-color: #F8F9FA;
	border-right: 1px solid $border-light;
	
	.sidebar-item {
		height: 100rpx;
		@include flex-center;
		color: $text-secondary;
		font-size: $font-size-sm;
		position: relative;
        transition: all $transition-base;
		
		&.active {
			background-color: $bg-white;
			color: $tech-blue;
			font-weight: bold;
			
			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				width: 8rpx;
				background-color: $tech-blue;
			}
		}

        &:active {
            background-color: darken(#F8F9FA, 5%);
        }
	}
}

.content {
	flex: 1;
	padding: 32rpx;
	background-color: $bg-white;
	
	.content-header {
		margin-bottom: 32rpx;
		
		.subject-title {
			font-size: $font-size-base;
			font-weight: bold;
			color: $text-primary;
		}
	}
	
	.category-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24rpx;
		
		.category-card {
			background-color: $bg-white;
			border: 1px solid $border-light;
			border-radius: $radius-lg;
			padding: 24rpx;
			transition: all $transition-base;
			
			&:active {
				border-color: $tech-blue;
				background-color: $gray-50;
			}
			
			.card-img-box {
				width: 100%;
				height: 160rpx;
				border-radius: $radius-md;
				overflow: hidden;
				margin-bottom: 16rpx;
                
                .placeholder-img {
                    width: 100%;
                    height: 100%;
                    @include flex-center;
                    
                    .cat-icon {
                        font-size: 64rpx;
                    }
                }
			}
			
			.cat-name {
				display: block;
				font-size: $font-size-sm;
				font-weight: bold;
				color: $text-primary;
				margin-bottom: 8rpx;
				@include text-ellipsis;
			}
			
			.cat-count {
				display: block;
				font-size: 20rpx;
				color: $text-tertiary;
			}
		}
	}
    
    .empty-state {
        padding: 64rpx 0;
        text-align: center;
        
        .empty-text {
            color: $text-tertiary;
            font-size: $font-size-sm;
        }
    }
}

.footer-spacer {
	height: 160rpx;
}
</style>