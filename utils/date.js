/**
 * 医教通 - 日期处理工具
 * Date Utility
 */

/**
 * 格式化日期
 * @param {Date|string|number} date 日期对象、时间戳或字符串
 * @param {string} format 格式 (YYYY-MM-DD HH:mm:ss)
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
	const d = new Date(date)
	if (isNaN(d.getTime())) {
		return ''
	}

	const year = d.getFullYear()
	const month = String(d.getMonth() + 1).padStart(2, '0')
	const day = String(d.getDate()).padStart(2, '0')
	const hour = String(d.getHours()).padStart(2, '0')
	const minute = String(d.getMinutes()).padStart(2, '0')
	const second = String(d.getSeconds()).padStart(2, '0')

	return format
		.replace('YYYY', year)
		.replace('MM', month)
		.replace('DD', day)
		.replace('HH', hour)
		.replace('mm', minute)
		.replace('ss', second)
}

/**
 * 获取相对时间描述
 * @param {Date|string|number} date 日期
 * @returns {string} 例如: "刚刚", "5分钟前", "昨天", "3天前"
 */
export function getRelativeTime(date) {
	const d = new Date(date)
	const now = new Date()
	const diff = now.getTime() - d.getTime()

	// 小于1分钟
	if (diff < 60 * 1000) {
		return '刚刚'
	}

	// 小于1小时
	if (diff < 60 * 60 * 1000) {
		const minutes = Math.floor(diff / (60 * 1000))
		return `${minutes}分钟前`
	}

	// 小于1天
	if (diff < 24 * 60 * 60 * 1000) {
		const hours = Math.floor(diff / (60 * 60 * 1000))
		return `${hours}小时前`
	}

	// 昨天
	const yesterday = new Date(now)
	yesterday.setDate(yesterday.getDate() - 1)
	if (d.toDateString() === yesterday.toDateString()) {
		return '昨天'
	}

	// 小于7天
	if (diff < 7 * 24 * 60 * 60 * 1000) {
		const days = Math.floor(diff / (24 * 60 * 60 * 1000))
		return `${days}天前`
	}

	// 超过7天,显示日期
	return formatDate(d, 'YYYY-MM-DD')
}

/**
 * 获取问候语
 * @returns {string} 例如: "早上好", "下午好", "晚上好"
 */
export function getGreeting() {
	const hour = new Date().getHours()

	if (hour < 6) {
		return '凌晨好'
	} else if (hour < 9) {
		return '早上好'
	} else if (hour < 12) {
		return '上午好'
	} else if (hour < 14) {
		return '中午好'
	} else if (hour < 18) {
		return '下午好'
	} else if (hour < 22) {
		return '晚上好'
	} else {
		return '夜深了'
	}
}

/**
 * 格式化倒计时
 * @param {number} seconds 秒数
 * @returns {string} 格式化后的时间 (HH:mm:ss)
 */
export function formatCountdown(seconds) {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const secs = seconds % 60

	if (hours > 0) {
		return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
	}
	return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * 判断是否为今天
 * @param {Date|string|number} date 日期
 * @returns {boolean}
 */
export function isToday(date) {
	const d = new Date(date)
	const today = new Date()
	return d.toDateString() === today.toDateString()
}

/**
 * 获取日期的开始时间 (00:00:00)
 * @param {Date|string|number} date 日期
 * @returns {Date}
 */
export function getDateStart(date = new Date()) {
	const d = new Date(date)
	d.setHours(0, 0, 0, 0)
	return d
}

/**
 * 获取日期的结束时间 (23:59:59)
 * @param {Date|string|number} date 日期
 * @returns {Date}
 */
export function getDateEnd(date = new Date()) {
	const d = new Date(date)
	d.setHours(23, 59, 59, 999)
	return d
}

/**
 * 计算两个日期相差天数
 * @param {Date|string|number} date1 日期1
 * @param {Date|string|number} date2 日期2
 * @returns {number} 相差天数
 */
export function getDaysBetween(date1, date2) {
	const d1 = getDateStart(date1)
	const d2 = getDateStart(date2)
	const diff = Math.abs(d2.getTime() - d1.getTime())
	return Math.floor(diff / (24 * 60 * 60 * 1000))
}

export default {
	formatDate,
	getRelativeTime,
	getGreeting,
	formatCountdown,
	isToday,
	getDateStart,
	getDateEnd,
	getDaysBetween
}
