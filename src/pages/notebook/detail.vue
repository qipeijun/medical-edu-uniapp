<template>
	<view class="page">
		<StatusBar />
		
		<view class="header">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">←</text>
			</view>
			<text class="title">{{ isNew ? '新建笔记' : '编辑笔记' }}</text>
            <view class="save-btn" @click="saveNote">
                <text class="save-text">保存</text>
            </view>
		</view>

		<view class="content">
            <input class="title-input" v-model="note.title" placeholder="请输入标题" />
            <textarea class="content-input" v-model="note.content" placeholder="开始记录..." maxlength="-1" />
		</view>
        
        <view class="footer" v-if="!isNew">
            <button class="btn-delete" @click="deleteNote">删除笔记</button>
        </view>
	</view>
</template>

<script>
import { useNotebookStore } from '@/stores/notebook'
import StatusBar from '@/components/common/StatusBar.vue'

export default {
	components: { StatusBar },
	data() {
		return {
			noteId: null,
            note: {
                title: '',
                content: ''
            }
		}
	},
    computed: {
        notebookStore() {
            return useNotebookStore()
        },
        isNew() {
            return !this.noteId
        }
    },
	onLoad(options) {
		if (options.id) {
            this.noteId = options.id
            const existing = this.notebookStore.getNoteById(this.noteId)
            if (existing) {
                this.note = { ...existing }
            }
        }
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
        saveNote() {
            if (!this.note.content.trim()) {
                return uni.showToast({ title: '内容不能为空', icon: 'none' })
            }
            
            if (this.isNew) {
                this.notebookStore.addNote(this.note)
            } else {
                this.notebookStore.updateNote(this.noteId, this.note)
            }
            
            uni.showToast({ title: '已保存' })
            setTimeout(() => {
                uni.navigateBack()
            }, 500)
        },
        deleteNote() {
            uni.showModal({
                title: '提示',
                content: '确定要删除这条笔记吗?',
                success: (res) => {
                    if (res.confirm) {
                        this.notebookStore.deleteNote(this.noteId)
                        uni.navigateBack()
                    }
                }
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
	background-color: $bg-white;
	display: flex;
	flex-direction: column;
}

.header {
	height: 88rpx;
	@include flex-between;
	padding: 0 32rpx;
	border-bottom: 1px solid $border-light;
	
	.back-btn {
		width: 64rpx;
		height: 64rpx;
		@include flex-center;
        
        .back-icon {
            font-size: 40rpx;
            color: $text-primary;
        }
	}
	
	.title {
		font-size: $font-size-lg;
		font-weight: bold;
		color: $text-primary;
	}
    
    .save-btn {
        padding: 12rpx 24rpx;
        
        .save-text {
            color: $tech-blue;
            font-size: $font-size-base;
            font-weight: bold;
        }
    }
}

.content {
	flex: 1;
	padding: 32rpx;
    display: flex;
    flex-direction: column;
    
    .title-input {
        font-size: 36rpx;
        font-weight: bold;
        padding: 24rpx 0;
        border-bottom: 1px solid $border-light;
        margin-bottom: 24rpx;
    }
    
    .content-input {
        flex: 1;
        width: 100%;
        font-size: $font-size-base;
        line-height: 1.6;
        color: $text-primary;
    }
}

.footer {
    padding: 32rpx;
    
    .btn-delete {
        background-color: $bg-white;
        color: $error;
        border: 1px solid $error;
        border-radius: $radius-full;
        font-size: $font-size-base;
    }
}
</style>