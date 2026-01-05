<template>
	<view class="page">
		<StatusBar />
		
		<!-- Header -->
		<view class="header" :style="{ paddingRight: (headerPaddingRight + 32) + 'rpx' }">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">←</text>
			</view>
			<text class="header-title">{{ currentCategoryName || '答题' }}</text>
			<view class="mode-switch">
				<text class="mode-text">做题模式</text>
				<view class="switch" :class="{ active: mode === 'study' }" @click="toggleMode">
					<view class="switch-handle"></view>
				</view>
			</view>
		</view>

		<!-- Type Tabs -->
		<scroll-view class="type-tabs" scroll-x :scroll-into-view="'tab-' + currentType">
			<view 
				class="tab-item" 
				v-for="type in questionTypes" 
				:key="type.code"
                :id="'tab-' + type.code"
				:class="{ active: currentType === type.code }"
			>
				{{ type.name }}
			</view>
		</scroll-view>

		<!-- Content -->
		<scroll-view class="content" scroll-y v-if="currentQuestion">
			<!-- Progress -->
			<view class="progress-info">
				<view class="count">
					<text class="current">{{ currentIndex + 1 }}</text>
					<text class="total">/{{ totalCount }}</text>
				</view>
				<text class="type-label">{{ currentTypeName }}</text>
			</view>

			<!-- Question -->
			<view class="question-text">
				{{ currentQuestion.content }}
			</view>

			<!-- Options -->
			<view class="options-list">
                <OptionItem 
                    v-for="opt in currentQuestion.options" 
                    :key="opt.label"
                    :option="opt"
                    :isSelected="isSelected(opt)"
                    :isAnswered="isAnswered"
                    @click="handleOptionClick"
                />
			</view>

			<!-- Explanation -->
            <ExplanationPanel 
                v-if="isAnswered || mode === 'study'" 
                :content="currentQuestion.explanation.text" 
            />
            
            <view class="footer-spacer"></view>
		</scroll-view>
        
        <view v-else class="empty-state">
            <text>暂无题目</text>
        </view>

		<!-- Bottom Actions -->
		<view class="footer-actions">
			<view class="action-btn" @click="prevQuestion" :class="{ disabled: !hasPrevious }">
				<text class="icon">⬅️</text>
				<text class="text">上一题</text>
			</view>
			<view class="action-btn" @click="toggleFavorite">
				<text class="icon">⭐</text>
				<text class="text">收藏</text>
			</view>
			<view class="action-btn" @click="reportError">
				<text class="icon">📝</text>
				<text class="text">纠错</text>
			</view>
			<button class="btn-next" @click="nextQuestion">下一题</button>
		</view>
	</view>
</template>

<script>
import { useQuestionStore } from '@/stores/question'
import StatusBar from '@/components/common/StatusBar.vue'
import { QUESTION_TYPES } from '@/utils/constants'
import OptionItem from '@/components/question/OptionItem.vue'
import ExplanationPanel from '@/components/question/ExplanationPanel.vue'

export default {
	components: { StatusBar, OptionItem, ExplanationPanel },
	data() {
		return {
			mode: 'study', // 'study' (show answer immediately) or 'exam'
            questionTypes: Object.values(QUESTION_TYPES),
            headerPaddingRight: 0
		}
	},
	computed: {
		questionStore() {
			return useQuestionStore()
		},
		currentQuestion() {
			return this.questionStore.currentQuestion
		},
        currentIndex() {
            return this.questionStore.currentQuestionIndex
        },
        totalCount() {
            return this.questionStore.totalQuestions
        },
        hasPrevious() {
            return this.questionStore.hasPrevious
        },
        currentCategoryName() {
            return this.questionStore.currentCategory 
                ? this.questionStore.currentSubject.categories.find(c => c.id === this.questionStore.currentCategory)?.name 
                : (this.questionStore.currentSubject ? this.questionStore.currentSubject.name : '')
        },
        currentType() {
            return this.currentQuestion ? this.currentQuestion.type : ''
        },
        currentTypeName() {
            const type = Object.values(QUESTION_TYPES).find(t => t.code === this.currentType)
            return type ? type.name : '未知题型'
        },
        userAnswerRecord() {
            if (!this.currentQuestion) return null
            return this.questionStore.userAnswers[this.currentQuestion.id]
        },
        isAnswered() {
            return !!this.userAnswerRecord
        }
	},
    onLoad() {
        // #ifdef MP-WEIXIN
        this.calculateHeaderPadding()
        // #endif
    },
	methods: {
		goBack() {
			uni.navigateBack()
		},
        // #ifdef MP-WEIXIN
        calculateHeaderPadding() {
            try {
                const menuButton = uni.getMenuButtonBoundingClientRect()
                const systemInfo = uni.getSystemInfoSync()
                if (menuButton) {
                    // Convert px to rpx
                    this.headerPaddingRight = (systemInfo.windowWidth - menuButton.left) * 2
                }
            } catch (e) {}
        },
        // #endif
        toggleMode() {
            this.mode = this.mode === 'study' ? 'exam' : 'study'
        },
        isSelected(opt) {
             if (!this.userAnswerRecord) return false
             const answer = this.userAnswerRecord.answer
             if (Array.isArray(answer)) {
                 return answer.includes(opt.label)
             }
             return answer === opt.label
        },
        handleOptionClick(opt) {
            if (this.isAnswered) return // Prevent changing answer
            
            // For Single Choice (TYPE_A)
            if (this.currentQuestion.type === 'TYPE_A') {
                this.questionStore.submitAnswer(this.currentQuestion.id, opt.label)
            }
            // For Multiple Choice (TYPE_X) - Logic would be different (toggle selection then submit button)
            // But MVP focuses on single choice mostly
        },
        prevQuestion() {
            this.questionStore.previousQuestion()
        },
        nextQuestion() {
            this.questionStore.nextQuestion()
        },
        toggleFavorite() {
            this.questionStore.toggleFavorite(this.currentQuestion.id)
        },
        reportError() {
            uni.showToast({ title: '纠错功能开发中', icon: 'none' })
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
	padding: 0 32rpx;
	@include flex-between;
	background-color: $bg-white;
	border-bottom: 2rpx solid $border-light;
	
	.back-btn {
		width: 64rpx;
		height: 64rpx;
		@include flex-center;
		
		.back-icon {
			font-size: 40rpx;
			color: $text-secondary;
		}
	}
	
	.header-title {
		font-size: $font-size-base;
		font-weight: bold;
		color: $text-primary;
	}
	
	.mode-switch {
		display: flex;
		align-items: center;
		// Increase touch target area
		padding: 16rpx 0;

		.mode-text {
			font-size: $font-size-xs;
			color: $text-secondary;
			margin-right: 8rpx;
		}

		.switch {
			width: 88rpx;
			height: 48rpx;
			background-color: $gray-300;
			border-radius: $radius-full;
			position: relative;
			transition: background-color $transition-base;
			
			.switch-handle {
				width: 40rpx;
				height: 40rpx;
				background-color: $bg-white;
				border-radius: $radius-full;
				position: absolute;
				top: 4rpx;
				left: 4rpx;
				transition: left $transition-base;
				box-shadow: $shadow-sm;
			}

			&.active {
				background-color: $tech-blue;

				.switch-handle {
					left: 44rpx;
				}
			}
		}
	}
}

.type-tabs {
	background-color: $bg-white;
	white-space: nowrap;
	padding: 16rpx 32rpx;
	box-shadow: $shadow-sm;
	
	.tab-item {
		display: inline-block;
		padding: 8rpx 24rpx;
		background-color: $bg-white;
		border: 2rpx solid $border-light;
		border-radius: $radius-full;
		color: $text-secondary;
		font-size: $font-size-xs;
		margin-right: 16rpx;
		transition: all $transition-base;
		
		&.active {
			background-color: $tech-blue;
			color: $text-white;
			border-color: $tech-blue;
		}
	}
}

.content {
	flex: 1;
	padding: 32rpx;
	
	.progress-info {
		@include flex-between;
		margin-bottom: 24rpx;
		align-items: flex-end;
		
		.count {
			.current {
				font-size: 40rpx;
				font-weight: bold;
				color: $tech-blue;
			}
			.total {
				font-size: $font-size-sm;
				color: $text-tertiary;
			}
		}
		
		.type-label {
			font-size: $font-size-xs;
			color: $text-tertiary;
		}
	}
	
	.question-text {
		font-size: 36rpx;
		font-weight: bold;
		color: $text-primary;
		line-height: 1.6;
		margin-bottom: 48rpx;
	}
	
	.options-list {
		margin-bottom: 48rpx;
	}
}

.empty-state {
    flex: 1;
    @include flex-center;
    color: $text-tertiary;
}

.footer-spacer {
    height: 160rpx;
}

.footer-actions {
	@include fixed-bottom;
	background-color: $bg-white;
	border-top: 2rpx solid $border-light;
	padding: 16rpx 32rpx;
	padding-bottom: calc(constant(safe-area-inset-bottom) + 16rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 16rpx);
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	.action-btn {
		@include flex-column-center;
		color: $text-tertiary;
		
		&.disabled {
			opacity: 0.3;
		}
		
		.icon {
			font-size: 40rpx;
			margin-bottom: 4rpx;
		}
		
		.text {
			font-size: 20rpx;
		}
	}
	
	.btn-next {
		@include btn-primary;
		height: 80rpx;
		padding: 0 48rpx;
		border-radius: $radius-full;
		font-size: $font-size-base;
		margin: 0;
	}
}
</style>