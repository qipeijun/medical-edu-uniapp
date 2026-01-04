/**
 * 医教通 - 本地存储工具
 * Local Storage Utility
 */

/**
 * 设置存储
 * @param {string} key 键名
 * @param {any} value 值
 * @returns {boolean} 是否成功
 */
export function setStorage(key, value) {
	try {
		const data = JSON.stringify(value)
		uni.setStorageSync(key, data)
		return true
	} catch (error) {
		console.error('setStorage error:', error)
		return false
	}
}

/**
 * 获取存储
 * @param {string} key 键名
 * @param {any} defaultValue 默认值
 * @returns {any} 存储的值
 */
export function getStorage(key, defaultValue = null) {
	try {
		const data = uni.getStorageSync(key)
		if (data) {
			return JSON.parse(data)
		}
		return defaultValue
	} catch (error) {
		console.error('getStorage error:', error)
		return defaultValue
	}
}

/**
 * 移除存储
 * @param {string} key 键名
 */
export function removeStorage(key) {
	try {
		uni.removeStorageSync(key)
		return true
	} catch (error) {
		console.error('removeStorage error:', error)
		return false
	}
}

/**
 * 清空所有存储
 */
export function clearStorage() {
	try {
		uni.clearStorageSync()
		return true
	} catch (error) {
		console.error('clearStorage error:', error)
		return false
	}
}

/**
 * 获取存储信息
 * @returns {object} 存储信息
 */
export function getStorageInfo() {
	try {
		const info = uni.getStorageInfoSync()
		return {
			keys: info.keys,
			currentSize: info.currentSize,
			limitSize: info.limitSize
		}
	} catch (error) {
		console.error('getStorageInfo error:', error)
		return null
	}
}

export default {
	setStorage,
	getStorage,
	removeStorage,
	clearStorage,
	getStorageInfo
}
