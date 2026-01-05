<template>
	<view class="page">
		<StatusBar />
		
		<!-- Header -->
		<view class="header" :style="{ paddingRight: (headerPaddingRight + 32) + 'rpx' }">
			<view class="back-btn" @click="confirmExit">
				<text class="back-icon">←</text>
			</view>
			<text class="title">考试中</text>
			<view class="timer" :class="{ warning: timeLeft < 300 }">
				<text>⏰ {{ formatTime(timeLeft) }}</text>
			</view>
		</view>

		<!-- Question Area -->
		<scroll-view class="content" scroll-y v-if="currentQuestion">
			<view class="progress-bar">
				<view class="fill" :style="{ width: progress + '%' }"></view>
			</view>
            
            <view class="question-header">
                <text class="q-type">{{ questionTypeName }}</text>
                <text class="q-index">第 {{ currentIndex + 1 }} / {{ totalCount }} 题</text>
            </view>

			<view class="question-text">
				{{ currentQuestion.content }}
			</view>

			<view class="options-list">
				<view 
					class="option-item" 
					v-for="opt in currentQuestion.options" 
					:key="opt.label"
					:class="{ selected: isSelected(opt) }"
					@click="selectOption(opt)"
				>
					<view class="opt-label">{{ opt.label }}</view>
					<text class="opt-text">{{ opt.text }}</text>
				</view>
			</view>
            
            <view class="footer-spacer"></view>
		</scroll-view>

		<!-- Footer -->
		<view class="footer">
            <view class="sheet-btn" @click="showSheet = true">
                <text>📄 答题卡</text>
            </view>
			<view class="actions">
				<button class="btn-prev" @click="prevQuestion" :disabled="currentIndex === 0">上一题</button>
				<button class="btn-next" @click="handleNext">{{ isLast ? '交卷' : '下一题' }}</button>
			</view>
		</view>
        
        <!-- Answer Sheet Modal -->
        <view class="modal-mask" v-if="showSheet" @click="showSheet = false">
            <view class="modal-content" @click.stop>
                <view class="sheet-header">
                    <text>答题卡</text>
                    <text class="close" @click="showSheet = false">✕</text>
                </view>
                <scroll-view class="sheet-grid" scroll-y>
                    <view 
                        class="sheet-item" 
                        v-for="(q, index) in questions" 
                        :key="q.id"
                        :class="{ answered: answers[q.id], current: index === currentIndex }"
                        @click="jumpTo(index)"
                    >
                        {{ index + 1 }}
                    </view>
                </scroll-view>
            </view>
        </view>
	</view>
</template>

<script>
import { useExamStore } from '@/stores/exam'
import { mockQuestions } from '@/mock/questions'
import StatusBar from '@/components/common/StatusBar.vue'
import { formatCountdown } from '@/utils/date'
import { QUESTION_TYPES } from '@/utils/constants'

export default {
	components: { StatusBar },
	data() {
		return {
			examId: null,
			questions: [], // Exam questions
            currentIndex: 0,
            answers: {}, // { questionId: answer }
            timeLeft: 0,
            timer: null,
            showSheet: false,
            headerPaddingRight: 0
		}
	},
    computed: {
        examStore() {
            return useExamStore()
        },
        currentQuestion() {
            return this.questions[this.currentIndex]
        },
        totalCount() {
            return this.questions.length
        },
        progress() {
            return ((this.currentIndex + 1) / this.totalCount) * 100
        },
        isLast() {
            return this.currentIndex === this.totalCount - 1
        },
        questionTypeName() {
            if (!this.currentQuestion) return ''
            const type = Object.values(QUESTION_TYPES).find(t => t.code === this.currentQuestion.type)
            return type ? type.name : ''
        }
    },
	onLoad(options) {
		this.examId = options.id
        this.examStore.setCurrentExam(this.examId)
        
        // Mock loading exam questions
        // In real app, fetch questions for this exam
        this.questions = mockQuestions.slice(0, 5) // Use first 5 mock questions
        
        if (this.examStore.currentExam) {
            this.timeLeft = this.examStore.currentExam.duration * 60
            this.startTimer()
        }

        // #ifdef MP-WEIXIN
        try {
            const menuButton = uni.getMenuButtonBoundingClientRect()
            const systemInfo = uni.getSystemInfoSync()
            if (menuButton) {
                // Convert px to rpx
                this.headerPaddingRight = (systemInfo.windowWidth - menuButton.left) * 2
            }
        } catch (e) {}
        // #endif
	},
	methods: {
        startTimer() {
            this.timer = setInterval(() => {
                this.timeLeft--
                if (this.timeLeft <= 0) {
                    this.submitExam(true)
                }
            }, 1000)
        },
        formatTime(s) {
            return formatCountdown(s)
        },
		confirmExit() {
            uni.showModal({
                title: '提示',
                content: '退出后考试将结束，确定要退出吗?',
                success: (res) => {
                    if (res.confirm) {
                        this.submitExam()
                    }
                }
            })
		},
        isSelected(opt) {
            const answer = this.answers[this.currentQuestion.id]
            if (Array.isArray(answer)) {
                return answer.includes(opt.label)
            }
            return answer === opt.label
        },
        selectOption(opt) {
            // Simple logic for single choice
            // For multiple choice, toggle logic needed
            this.answers[this.currentQuestion.id] = opt.label
        },
        prevQuestion() {
            if (this.currentIndex > 0) {
                this.currentIndex--
            }
        },
        handleNext() {
            if (this.isLast) {
                uni.showModal({
                    title: '提示',
                    content: '确定要交卷吗?',
                    success: (res) => {
                        if (res.confirm) {
                            this.submitExam()
                        }
                    }
                })
            } else {
                this.currentIndex++
            }
        },
        jumpTo(index) {
            this.currentIndex = index
            this.showSheet = false
        },
        submitExam(force = false) {
            clearInterval(this.timer)
            // Calculate score (Mock)
            let correct = 0
            this.questions.forEach(q => {
                if (this.answers[q.id] === q.correctAnswer) {
                    correct++
                }
            })
            const score = Math.round((correct / this.totalCount) * 100)
            
            // Save history
            this.examStore.submitExam({
                examId: this.examId,
                score,
                answers: this.answers,
                timeSpent: (this.examStore.currentExam.duration * 60) - this.timeLeft
            })
            
            uni.redirectTo({
                url: `/pages/exam/result?score=${score}&total=${this.totalCount}&correct=${correct}`
            })
        }
	},
    onUnload() {
        if (this.timer) clearInterval(this.timer)
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
	
	.title {
		font-size: $font-size-base;
		font-weight: bold;
		color: $text-primary;
	}
    
    .timer {
        font-family: $font-family-mono;
        font-size: $font-size-base;
        color: $text-primary;
        
        &.warning {
            color: $error;
            animation: pulse 1s infinite;
        }
    }
}

.content {
    flex: 1;
    padding: 32rpx;
    
    .progress-bar {
        height: 8rpx;
        background-color: $gray-200;
        border-radius: $radius-full;
        margin-bottom: 32rpx;
        
        .fill {
            height: 100%;
            background-color: $tech-blue;
            border-radius: $radius-full;
            transition: width 0.3s;
        }
    }
    
    .question-header {
        @include flex-between;
        margin-bottom: 24rpx;
        
        .q-type {
            font-size: $font-size-sm;
            color: $tech-blue;
            font-weight: bold;
            background-color: $light-cyan;
            padding: 4rpx 12rpx;
            border-radius: $radius-sm;
        }
        
        .q-index {
            font-size: $font-size-sm;
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
        .option-item {
            background-color: $bg-white;
            border: 2rpx solid $border-light;
            border-radius: $radius-lg;
            padding: 32rpx;
            margin-bottom: 24rpx;
            display: flex;
            align-items: center;
            transition: all $transition-base;
            
            &.selected {
                background-color: $light-cyan;
                border-color: $tech-blue;
                
                .opt-label {
                    background-color: $tech-blue;
                    border-color: $tech-blue;
                    color: $text-white;
                }
                
                .opt-text {
                    color: $tech-blue;
                    font-weight: bold;
                }
            }
            
            .opt-label {
                width: 48rpx;
                height: 48rpx;
                border-radius: $radius-full;
                border: 2rpx solid $gray-400;
                @include flex-center;
                font-size: $font-size-xs;
                color: $text-secondary;
                font-weight: bold;
                margin-right: 24rpx;
                flex-shrink: 0;
            }
            
            .opt-text {
                font-size: $font-size-base;
                color: $text-secondary;
            }
        }
    }
}

.footer-spacer {
    height: 120rpx;
}

.footer {
    @include fixed-bottom;
    background-color: $bg-white;
    border-top: 2rpx solid $border-light;
    padding: 16rpx 32rpx;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 16rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 16rpx);
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .sheet-btn {
        @include flex-center;
        font-size: $font-size-sm;
        color: $text-secondary;
        
        &:active {
            opacity: 0.7;
        }
    }
    
    .actions {
        display: flex;
        gap: 24rpx;
        
        button {
            height: 80rpx;
            padding: 0 40rpx;
            font-size: $font-size-base;
            border-radius: $radius-full;
            margin: 0;
            
            &.btn-prev {
                background-color: $gray-100;
                color: $text-secondary;
            }
            
            &.btn-next {
                @include btn-primary;
            }
            
            &[disabled] {
                opacity: 0.5;
            }
        }
    }
}

.modal-mask {
    @include overlay;
    display: flex;
    align-items: flex-end;
    
    .modal-content {
        width: 100%;
        background-color: $bg-white;
        border-radius: $radius-xl $radius-xl 0 0;
        padding: 32rpx;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        
        .sheet-header {
            @include flex-between;
            margin-bottom: 32rpx;
            font-weight: bold;
            
            .close {
                padding: 16rpx;
                color: $text-tertiary;
            }
        }
        
        .sheet-grid {
            height: 500rpx;
            
            .sheet-item {
                display: inline-flex;
                width: 80rpx;
                height: 80rpx;
                @include flex-center;
                border-radius: $radius-full;
                background-color: $gray-100;
                color: $text-secondary;
                margin: 16rpx;
                font-size: $font-size-sm;
                
                &.answered {
                    background-color: $light-cyan;
                    color: $tech-blue;
                    border: 2rpx solid $tech-blue;
                }
                
                &.current {
                    border: 2px solid $tech-blue;
                }
            }
        }
    }
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}
</style>