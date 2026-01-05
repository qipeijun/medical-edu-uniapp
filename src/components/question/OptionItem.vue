<template>
	<view 
		class="option-item" 
		:class="statusClass"
		@click="handleClick"
	>
		<view class="opt-label" :class="labelClass">
			{{ option.label }}
		</view>
		<text class="opt-text">{{ option.text }}</text>
		
        <text v-if="statusClass === 'correct'" class="result-icon correct">✓</text>
        <text v-if="statusClass === 'wrong'" class="result-icon wrong">✕</text>
	</view>
</template>

<script>
export default {
    name: 'OptionItem',
    props: {
        option: {
            type: Object,
            required: true
        },
        isSelected: {
            type: Boolean,
            default: false
        },
        isAnswered: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        statusClass() {
            if (!this.isAnswered) {
                return this.isSelected ? 'selected' : 'normal'
            }
            
            if (this.option.isCorrect) return 'correct'
            if (this.isSelected && !this.option.isCorrect) return 'wrong'
            return 'normal'
        },
        labelClass() {
            if (!this.isAnswered) {
                return this.isSelected ? 'selected-label' : 'normal'
            }
            if (this.option.isCorrect) return 'correct-label'
            if (this.isSelected && !this.option.isCorrect) return 'wrong-label'
            return 'normal'
        }
    },
    methods: {
        handleClick() {
            this.$emit('click', this.option)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.option-item {
    background-color: $bg-white;
    border: 2rpx solid $border-light;
    border-radius: $radius-lg;
    padding: 32rpx;
    margin-bottom: 24rpx;
    display: flex;
    align-items: center;
    transition: all $transition-base;
    position: relative;
    
    &:active {
        background-color: $gray-50;
    }
    
    &.selected {
        background-color: $light-cyan;
        border-color: $tech-blue;
        
        .opt-text {
            color: $tech-blue;
            font-weight: bold;
        }
    }
    
    &.correct {
        background-color: lighten($grass-green, 40%);
        border-color: $grass-green;
        
        .opt-text { color: darken($grass-green, 20%); font-weight: bold; }
    }
    
    &.wrong {
        background-color: lighten($error, 40%);
        border-color: $error;
         .opt-text { color: darken($error, 20%); }
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
        
        &.selected-label {
            background-color: $tech-blue;
            border-color: $tech-blue;
            color: $text-white;
        }
        
        &.correct-label {
            background-color: $grass-green;
            border-color: $grass-green;
            color: $text-white;
        }
        
        &.wrong-label {
             background-color: $error;
             border-color: $error;
             color: $text-white;
        }
    }
    
    .opt-text {
        font-size: $font-size-base;
        color: $text-secondary;
        flex: 1;
    }
    
    .result-icon {
        font-size: $font-size-lg;
        margin-left: 16rpx;
        
        &.correct { color: $grass-green; }
        &.wrong { color: $error; }
    }
}
</style>