/**
 * 用户状态管理
 */

import { defineStore } from 'pinia'
import { STORAGE_KEYS } from '@/utils/constants'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'

export const useUserStore = defineStore('user', {
	state: () => ({
		// 是否已登录
		isLoggedIn: false,
		// 是否游客模式
		isGuest: false,
		// 用户令牌
		token: '',
		// 用户信息
		userInfo: {
			id: '',
			phone: '',
			avatar: '',
			nickname: '',
			realName: '',
			school: '',
			major: '',
			grade: '',
			studentId: ''
		}
	}),

	getters: {
		// 信息是否完整
		isInfoComplete: (state) => {
			return Boolean(
				state.userInfo.school &&
				state.userInfo.major &&
				state.userInfo.grade &&
				state.userInfo.studentId
			)
		},

		// 显示名称
		displayName: (state) => {
			return state.userInfo.nickname || state.userInfo.realName || '同学'
		},

		// 学校简称
		shortSchoolName: (state) => {
			if (!state.userInfo.school) return ''
			return state.userInfo.school.replace(/(医学院|医学部|中山医学院|同济医学院|湘雅医学院|华西医学中心|齐鲁医学院)$/, '')
		}
	},

	actions: {
		/**
		 * 登录
		 */
		async login(credentials) {
			try {
				// TODO: 调用登录 API
				// const res = await loginApi(credentials)

				// Mock 登录成功
				this.token = 'mock_token_' + Date.now()
				this.isLoggedIn = true
				this.isGuest = false

				// Mock 用户信息
				this.userInfo = {
					id: 'user_001',
					phone: credentials.phone,
					avatar: '',
					nickname: '',
					realName: '',
					school: '',
					major: '',
					grade: '',
					studentId: ''
				}

				// 保存到本地
				this.saveToStorage()

				return { success: true }
			} catch (error) {
				console.error('登录失败:', error)
				return { success: false, message: error.message }
			}
		},

		/**
		 * 游客模式
		 */
		enterGuestMode() {
			this.isGuest = true
			this.isLoggedIn = false
			this.saveToStorage()
		},

		/**
		 * 退出登录
		 */
		logout() {
			this.isLoggedIn = false
			this.isGuest = false
			this.token = ''
			this.userInfo = {
				id: '',
				phone: '',
				avatar: '',
				nickname: '',
				realName: '',
				school: '',
				major: '',
				grade: '',
				studentId: ''
			}

			// 清除本地存储
			removeStorage(STORAGE_KEYS.USER_TOKEN)
			removeStorage(STORAGE_KEYS.USER_INFO)

			// 跳转到模式选择页
			uni.reLaunch({
				url: '/pages/mode-selection/index'
			})
		},

		/**
		 * 更新用户信息
		 */
		async updateProfile(info) {
			try {
				// TODO: 调用更新 API
				// await updateProfileApi(info)

				// 更新本地状态
				this.userInfo = {
					...this.userInfo,
					...info
				}

				// 保存到本地
				this.saveToStorage()

				return { success: true }
			} catch (error) {
				console.error('更新用户信息失败:', error)
				return { success: false, message: error.message }
			}
		},

		/**
		 * 检查游客权限
		 */
		checkGuestAccess(feature) {
			if (this.isGuest) {
				uni.showModal({
					title: '提示',
					content: '游客模式仅可浏览科普内容,请注册登录后使用完整功能',
					confirmText: '去登录',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/auth/login'
							})
						}
					}
				})
				return false
			}
			return true
		},

		/**
		 * 保存到本地存储
		 */
		saveToStorage() {
			setStorage(STORAGE_KEYS.USER_TOKEN, this.token)
			setStorage(STORAGE_KEYS.USER_INFO, this.userInfo)
		},

		/**
		 * 从本地存储加载
		 */
		loadFromStorage() {
			const token = getStorage(STORAGE_KEYS.USER_TOKEN)
			const userInfo = getStorage(STORAGE_KEYS.USER_INFO)

			if (token) {
				this.token = token
				this.isLoggedIn = true
			}

			if (userInfo) {
				this.userInfo = userInfo
			}
		},

		/**
		 * 初始化
		 */
		init() {
			this.loadFromStorage()
		}
	}
})
