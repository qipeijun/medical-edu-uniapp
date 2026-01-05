<template>
	<view class="page">
		<scroll-view class="content" scroll-y>
            <view class="action-bar">
                <button class="btn-create" @click="addNote">+ 新建笔记</button>
            </view>

			<view class="note-list" v-if="notes.length > 0">
				<view 
					class="note-card" 
					v-for="note in notes" 
					:key="note.id"
					@click="goToDetail(note.id)"
				>
					<text class="note-title">{{ note.title || '无标题笔记' }}</text>
					<text class="note-content">{{ note.content }}</text>
					<text class="note-date">{{ formatDate(note.date) }}</text>
				</view>
			</view>
            
            <view v-else class="empty-state">
                <text class="empty-text">还没有笔记，点击右上角添加</text>
            </view>
		</scroll-view>
	</view>
</template>

<script>
import { useNotebookStore } from '@/stores/notebook'
import { formatDate } from '@/utils/date'

export default {
	computed: {
		notebookStore() {
			return useNotebookStore()
		},
		notes() {
			return this.notebookStore.notes
		}
	},
    onShow() {
        this.notebookStore.loadNotes()
    },
	methods: {
		goBack() {
			uni.navigateBack()
		},
        formatDate(date) {
            return formatDate(date, 'MM-DD HH:mm')
        },
		goToDetail(id) {
			uni.navigateTo({
				url: `/pages/notebook/detail?id=${id}`
			})
		},
        addNote() {
            uni.navigateTo({
                url: '/pages/notebook/detail' // No ID means new note
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
	@include flex-between;
	padding: 0 32rpx;
	background-color: $bg-white;
	box-shadow: $shadow-sm;
	
	.back-btn, .add-btn {
		width: 64rpx;
		height: 64rpx;
		@include flex-center;
        
        .back-icon, .add-icon {
            font-size: 40rpx;
            color: $text-primary;
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

.action-bar {
    margin-bottom: 24rpx;
    
    .btn-create {
        @include btn-primary;
        width: 100%;
        border-radius: $radius-lg;
    }
}

.note-list {
    .note-card {
        background-color: $bg-white;
        border-radius: $radius-lg;
        padding: 32rpx;
        margin-bottom: 24rpx;
        box-shadow: $shadow-sm;
        max-width: 100%;
        box-sizing: border-box;
        
        .note-title {
            font-size: $font-size-base;
            font-weight: bold;
            color: $text-primary;
            margin-bottom: 16rpx;
            display: block;
        }
        
        .note-content {
            font-size: $font-size-sm;
            color: $text-secondary;
            margin-bottom: 16rpx;
            @include line-clamp(2);
            display: block;
        }
        
        .note-date {
            font-size: $font-size-xs;
            color: $text-tertiary;
        }
    }
}

.empty-state {
    padding-top: 200rpx;
    text-align: center;
    .empty-text {
        color: $text-tertiary;
    }
}
</style>