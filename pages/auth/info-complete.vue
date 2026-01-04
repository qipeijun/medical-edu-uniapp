<template>
	<view class="page">
		<!-- Content -->
		<scroll-view class="content" scroll-y>
			<!-- Avatar -->
			<view class="avatar-section" @click="uploadAvatar">
				<view class="avatar-box" :class="{ 'has-avatar': form.avatar }">
					<image v-if="form.avatar" :src="form.avatar" mode="aspectFill" class="avatar-img"></image>
					<view v-else class="camera-icon">📷</view>
				</view>
				<text class="avatar-tip">点击上传头像 <text class="required">*</text></text>
			</view>

			<!-- Basic Info -->
			<view class="section">
				<view class="section-header">
					<view class="section-mark"></view>
					<text class="section-title">基础信息</text>
				</view>
				<view class="card">
					<view class="form-item">
						<text class="label">姓名 <text class="required">*</text></text>
						<input class="input" type="text" v-model="form.realName" placeholder="请输入真实姓名" />
					</view>
					<view class="form-item">
						<text class="label">昵称 <text class="required">*</text></text>
						<input class="input" type="text" v-model="form.nickname" placeholder="请输入昵称" />
					</view>
				</view>
			</view>

			<!-- Academic Info -->
			<view class="section">
				<view class="section-header">
					<view class="section-mark"></view>
					<text class="section-title">学籍信息</text>
				</view>
				<view class="card">
					<!-- School -->
					<picker mode="selector" :range="schools" @change="onSchoolChange">
						<view class="form-item">
							<text class="label">学校 <text class="required">*</text></text>
							<view class="picker-value" :class="{ placeholder: !form.school }">
								{{ form.school || '请选择学校' }}
								<text class="arrow">▼</text>
							</view>
						</view>
					</picker>

					<!-- Major -->
					<picker mode="selector" :range="majors" range-key="name" @change="onMajorChange">
						<view class="form-item">
							<text class="label">专业 <text class="required">*</text></text>
							<view class="picker-value" :class="{ placeholder: !form.major }">
								{{ form.major || '请选择专业' }}
								<text class="arrow">▼</text>
							</view>
						</view>
					</picker>

					<!-- Grade -->
					<picker mode="selector" :range="grades" range-key="name" @change="onGradeChange">
						<view class="form-item">
							<text class="label">年级 <text class="required">*</text></text>
							<view class="picker-value" :class="{ placeholder: !form.grade }">
								{{ form.grade || '请选择年级' }}
								<text class="arrow">▼</text>
							</view>
						</view>
					</picker>

					<!-- Student ID -->
					<view class="form-item">
						<text class="label">学号 <text class="required">*</text></text>
						<input class="input" type="text" v-model="form.studentId" placeholder="请输入学号" />
					</view>
				</view>
			</view>
			
			<view class="footer-spacer"></view>
		</scroll-view>

		<!-- Footer Button -->
		<view class="footer">
			<button class="btn-submit" @click="handleSubmit" :loading="submitting">提交信息</button>
		</view>
	</view>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { MEDICAL_SCHOOLS, MEDICAL_MAJORS, GRADES } from '@/utils/constants'
import { validateRequired, validateRealName, validateNickname, validateStudentId } from '@/utils/validator'

export default {
	data() {
		return {
			form: {
				avatar: '',
				realName: '',
				nickname: '',
				school: '',
				major: '',
				grade: '',
				studentId: ''
			},
			schools: MEDICAL_SCHOOLS,
			majors: MEDICAL_MAJORS,
			grades: GRADES,
			submitting: false
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		uploadAvatar() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					this.form.avatar = res.tempFilePaths[0]
				}
			})
		},
		onSchoolChange(e) {
			this.form.school = this.schools[e.detail.value]
		},
		onMajorChange(e) {
			this.form.major = this.majors[e.detail.value].name
		},
		onGradeChange(e) {
			this.form.grade = this.grades[e.detail.value].name
		},
		async handleSubmit() {
			// Validation
			if (!this.form.avatar) return uni.showToast({ title: '请上传头像', icon: 'none' })
			
			const nameCheck = validateRealName(this.form.realName)
			if (!nameCheck.valid) return uni.showToast({ title: nameCheck.message, icon: 'none' })
			
			const nickCheck = validateNickname(this.form.nickname)
			if (!nickCheck.valid) return uni.showToast({ title: nickCheck.message, icon: 'none' })
			
			if (!this.form.school) return uni.showToast({ title: '请选择学校', icon: 'none' })
			if (!this.form.major) return uni.showToast({ title: '请选择专业', icon: 'none' })
			if (!this.form.grade) return uni.showToast({ title: '请选择年级', icon: 'none' })
			
			const idCheck = validateStudentId(this.form.studentId)
			if (!idCheck.valid) return uni.showToast({ title: idCheck.message, icon: 'none' })

			this.submitting = true
			const userStore = useUserStore()
			const res = await userStore.updateProfile(this.form)
			this.submitting = false
			
			if (res.success) {
				uni.showToast({ title: '完善成功' })
				setTimeout(() => {
					uni.switchTab({ url: '/pages/home/index' })
				}, 1500)
			} else {
				uni.showToast({ title: '提交失败', icon: 'none' })
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

.header {
	height: 88rpx;
	padding: 0 32rpx;
	display: flex;
	align-items: center;
	background-color: $bg-white;
	border-bottom: 1px solid $border-light;
	
	.back-btn {
		width: 64rpx;
		height: 64rpx;
		@include flex-center;
		margin-right: 16rpx;
		
		.back-icon {
			font-size: 40rpx;
			color: $text-secondary;
		}
	}
	
	.header-title {
		font-size: $font-size-lg;
		font-weight: bold;
		color: $text-primary;
	}
}

.content {
	flex: 1;
	padding: 32rpx;
}

.avatar-section {
	@include flex-column-center;
	margin-bottom: 48rpx;
	
	.avatar-box {
		width: 160rpx;
		height: 160rpx;
		border-radius: $radius-full;
		background: linear-gradient(135deg, $light-cyan, $tech-blue);
		@include flex-center;
		margin-bottom: 16rpx;
		box-shadow: inset 0 0 20rpx rgba(0,0,0,0.1);
		overflow: hidden;
		position: relative;
		
		.camera-icon {
			font-size: 64rpx;
			color: $text-white;
			opacity: 0.8;
		}
		
		.avatar-img {
			width: 100%;
			height: 100%;
		}
		
		&:active {
			transform: scale(0.95);
		}
	}
	
	.avatar-tip {
		font-size: $font-size-sm;
		color: $text-secondary;
		
		.required {
			color: $error;
			margin-left: 4rpx;
		}
	}
}

.section {
	margin-bottom: 48rpx;
	
	.section-header {
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
		padding-left: 8rpx;
		
		.section-mark {
			width: 8rpx;
			height: 32rpx;
			background-color: $tech-blue;
			border-radius: $radius-sm;
			margin-right: 16rpx;
		}
		
		.section-title {
			font-size: $font-size-base;
			font-weight: bold;
			color: $tech-blue;
		}
	}
	
	.card {
		@include card;
		padding: 0 32rpx;
		
		.form-item {
			padding: 32rpx 0;
			border-bottom: 1px solid $border-light;
			
			&:last-child {
				border-bottom: none;
			}
			
			.label {
				display: block;
				font-size: $font-size-xs;
				color: $text-secondary;
				font-weight: $font-weight-medium;
				margin-bottom: 16rpx;
				
				.required {
					color: $error;
				}
			}
			
			.input, .picker-value {
				width: 100%;
				font-size: $font-size-sm;
				color: $text-primary;
				height: 48rpx;
				line-height: 48rpx;
			}
			
			.picker-value {
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				&.placeholder {
					color: $text-tertiary;
				}
				
				.arrow {
					font-size: 20rpx;
					color: $gray-300;
				}
			}
		}
	}
}

.footer-spacer {
	height: 160rpx;
}

.footer {
	@include fixed-bottom;
	background-color: $bg-base;
	padding: 24rpx 32rpx;
	z-index: 10;
	
	.btn-submit {
		@include btn-primary;
		width: 100%;
		height: 96rpx;
		border-radius: $radius-lg;
		font-size: $font-size-lg;
		font-weight: bold;
		background: linear-gradient(90deg, $tech-blue, #4FC3F7);
		box-shadow: $shadow-md;
	}
}
</style>