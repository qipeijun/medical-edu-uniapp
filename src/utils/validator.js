/**
 * 医教通 - 表单验证工具
 * Form Validation Utility
 */

import { REGEX } from './constants.js'

/**
 * 验证手机号
 * @param {string} phone 手机号
 * @returns {object} { valid, message }
 */
export function validatePhone(phone) {
	if (!phone) {
		return { valid: false, message: '请输入手机号' }
	}
	if (!REGEX.PHONE.test(phone)) {
		return { valid: false, message: '请输入正确的手机号' }
	}
	return { valid: true, message: '' }
}

/**
 * 验证验证码
 * @param {string} code 验证码
 * @returns {object} { valid, message }
 */
export function validateVerificationCode(code) {
	if (!code) {
		return { valid: false, message: '请输入验证码' }
	}
	if (!REGEX.VERIFICATION_CODE.test(code)) {
		return { valid: false, message: '验证码格式不正确' }
	}
	return { valid: true, message: '' }
}

/**
 * 验证密码
 * @param {string} password 密码
 * @returns {object} { valid, message }
 */
export function validatePassword(password) {
	if (!password) {
		return { valid: false, message: '请输入密码' }
	}
	if (password.length < 6) {
		return { valid: false, message: '密码至少6位' }
	}
	if (!REGEX.PASSWORD.test(password)) {
		return { valid: false, message: '密码必须包含字母和数字' }
	}
	return { valid: true, message: '' }
}

/**
 * 验证学号
 * @param {string} studentId 学号
 * @returns {object} { valid, message }
 */
export function validateStudentId(studentId) {
	if (!studentId) {
		return { valid: false, message: '请输入学号' }
	}
	if (!REGEX.STUDENT_ID.test(studentId)) {
		return { valid: false, message: '学号格式不正确(8-12位数字)' }
	}
	return { valid: true, message: '' }
}

/**
 * 验证必填字段
 * @param {any} value 值
 * @param {string} fieldName 字段名
 * @returns {object} { valid, message }
 */
export function validateRequired(value, fieldName = '此项') {
	if (!value || (typeof value === 'string' && !value.trim())) {
		return { valid: false, message: `${fieldName}不能为空` }
	}
	return { valid: true, message: '' }
}

/**
 * 验证昵称
 * @param {string} nickname 昵称
 * @returns {object} { valid, message }
 */
export function validateNickname(nickname) {
	const required = validateRequired(nickname, '昵称')
	if (!required.valid) return required

	if (nickname.length < 2 || nickname.length > 20) {
		return { valid: false, message: '昵称长度为2-20个字符' }
	}
	return { valid: true, message: '' }
}

/**
 * 验证真实姓名
 * @param {string} realName 真实姓名
 * @returns {object} { valid, message }
 */
export function validateRealName(realName) {
	const required = validateRequired(realName, '真实姓名')
	if (!required.valid) return required

	if (realName.length < 2 || realName.length > 10) {
		return { valid: false, message: '姓名长度为2-10个字符' }
	}
	return { valid: true, message: '' }
}

export default {
	validatePhone,
	validateVerificationCode,
	validatePassword,
	validateStudentId,
	validateRequired,
	validateNickname,
	validateRealName
}
