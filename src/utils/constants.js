/**
 * 医教通 - 常量定义
 * Constants for Medical Education Platform
 */

// ==================== 学科定义 ====================
// Medical Subjects (8个医学学科)
export const SUBJECTS = [
	{
		id: 1,
		name: '系统解剖学',
		nameEn: 'Systemic Anatomy',
		icon: 'bone',
		color: '#03A9F4',
		description: '研究正常人体各器官系统的形态结构'
	},
	{
		id: 2,
		name: '生理学',
		nameEn: 'Physiology',
		icon: 'activity',
		color: '#F44336',
		description: '研究生物体及其组成部分的正常功能'
	},
	{
		id: 3,
		name: '病理学',
		nameEn: 'Pathology',
		icon: 'microscope',
		color: '#E91E63',
		description: '研究疾病的发生发展规律及机制'
	},
	{
		id: 4,
		name: '药理学',
		nameEn: 'Pharmacology',
		icon: 'flask',
		color: '#FFC107',
		description: '研究药物与机体相互作用规律'
	},
	{
		id: 5,
		name: '内科学',
		nameEn: 'Internal Medicine',
		icon: 'stethoscope',
		color: '#4CAF50',
		description: '研究内脏器官疾病的诊断治疗'
	},
	{
		id: 6,
		name: '外科学',
		nameEn: 'Surgery',
		icon: 'scalpel',
		color: '#2196F3',
		description: '研究手术治疗疾病的临床学科'
	},
	{
		id: 7,
		name: '妇产科学',
		nameEn: 'Obstetrics & Gynecology',
		icon: 'female',
		color: '#FF4081',
		description: '研究女性生殖系统疾病及妊娠分娩'
	},
	{
		id: 8,
		name: '儿科学',
		nameEn: 'Pediatrics',
		icon: 'baby',
		color: '#00BCD4',
		description: '研究儿童生长发育及疾病防治'
	}
]

// ==================== 题型定义 ====================
// Question Types
export const QUESTION_TYPES = {
	TYPE_A: {
		code: 'TYPE_A',
		name: 'A型题',
		nameEn: 'Type A',
		description: '单项选择题,从5个选项中选择1个最佳答案'
	},
	TYPE_X: {
		code: 'TYPE_X',
		name: 'X型题',
		nameEn: 'Type X',
		description: '多项选择题,从5个选项中选择2-4个正确答案'
	},
	DEFINITION: {
		code: 'DEFINITION',
		name: '名词解释',
		nameEn: 'Definition',
		description: '解释医学术语的含义'
	},
	SHORT_ANSWER: {
		code: 'SHORT_ANSWER',
		name: '简答题',
		nameEn: 'Short Answer',
		description: '简要回答问题'
	}
}

// 题型代码数组
export const QUESTION_TYPE_CODES = ['TYPE_A', 'TYPE_X', 'DEFINITION', 'SHORT_ANSWER']

// ==================== 学校列表 ====================
// Medical Schools
export const MEDICAL_SCHOOLS = [
	'北京大学医学部',
	'复旦大学上海医学院',
	'上海交通大学医学院',
	'浙江大学医学院',
	'中山大学中山医学院',
	'华中科技大学同济医学院',
	'四川大学华西医学中心',
	'中南大学湘雅医学院',
	'首都医科大学',
	'南京医科大学',
	'中国医科大学',
	'哈尔滨医科大学',
	'南方医科大学',
	'天津医科大学',
	'山东大学齐鲁医学院',
	'武汉大学医学部',
	'西安交通大学医学部',
	'重庆医科大学',
	'郑州大学医学院',
	'其他医学院校'
]

// ==================== 专业列表 ====================
// Medical Majors
export const MEDICAL_MAJORS = [
	{
		code: 'clinical',
		name: '临床医学',
		nameEn: 'Clinical Medicine'
	},
	{
		code: 'stomatology',
		name: '口腔医学',
		nameEn: 'Stomatology'
	},
	{
		code: 'preventive',
		name: '预防医学',
		nameEn: 'Preventive Medicine'
	},
	{
		code: 'tcm',
		name: '中医学',
		nameEn: 'Traditional Chinese Medicine'
	},
	{
		code: 'pharmacy',
		name: '药学',
		nameEn: 'Pharmacy'
	},
	{
		code: 'nursing',
		name: '护理学',
		nameEn: 'Nursing'
	}
]

// ==================== 年级列表 ====================
// Grade/Year Options
export const GRADES = [
	{ code: '2024', name: '2024级', year: 2024 },
	{ code: '2023', name: '2023级', year: 2023 },
	{ code: '2022', name: '2022级', year: 2022 },
	{ code: '2021', name: '2021级', year: 2021 },
	{ code: '2020', name: '2020级', year: 2020 }
]

// ==================== 难度级别 ====================
// Difficulty Levels
export const DIFFICULTY_LEVELS = {
	EASY: {
		code: 'easy',
		name: '简单',
		color: '#81C784',
		score: 1
	},
	MEDIUM: {
		code: 'medium',
		name: '中等',
		color: '#FFC107',
		score: 2
	},
	HARD: {
		code: 'hard',
		name: '困难',
		color: '#F44336',
		score: 3
	}
}

// ==================== 考试类型 ====================
// Exam Types
export const EXAM_TYPES = {
	PRACTICE: {
		code: 'practice',
		name: '练习模式',
		description: '可随时查看答案和解析'
	},
	MOCK: {
		code: 'mock',
		name: '模拟考试',
		description: '模拟真实考试环境,计时答题'
	},
	OFFICIAL: {
		code: 'official',
		name: '正式考试',
		description: '严格按照考试规则进行'
	}
}

// ==================== 考试状态 ====================
// Exam Status
export const EXAM_STATUS = {
	NOT_STARTED: {
		code: 'not_started',
		name: '未开始',
		color: '#9E9E9E'
	},
	IN_PROGRESS: {
		code: 'in_progress',
		name: '进行中',
		color: '#03A9F4'
	},
	COMPLETED: {
		code: 'completed',
		name: '已完成',
		color: '#81C784'
	},
	EXPIRED: {
		code: 'expired',
		name: '已过期',
		color: '#F44336'
	}
}

// ==================== 科普文章分类 ====================
// Article Categories
export const ARTICLE_CATEGORIES = [
	{ code: 'all', name: '全部' },
	{ code: 'emergency', name: '急救常识', icon: 'first-aid' },
	{ code: 'prevention', name: '疾病预防', icon: 'shield' },
	{ code: 'health', name: '健康生活', icon: 'heart' }
]

// ==================== 消息类型 ====================
// Message Types
export const MESSAGE_TYPES = {
	SYSTEM: {
		code: 'system',
		name: '系统消息',
		icon: 'bell',
		color: '#03A9F4'
	},
	REVIEW: {
		code: 'review',
		name: '复习提醒',
		icon: 'clock',
		color: '#FFC107'
	},
	UPDATE: {
		code: 'update',
		name: '更新通知',
		icon: 'info-circle',
		color: '#81C784'
	}
}

// ==================== 性能评分映射 ====================
// Performance Score Mapping (用于间隔重复算法)
export const PERFORMANCE_MAP = {
	CORRECT_FIRST_TRY: 5,      // 立即正确
	CORRECT_WITH_HESITATION: 4, // 犹豫但正确
	CORRECT_AFTER_HINT: 3,      // 看解析后正确
	WRONG_BUT_CLOSE: 2,         // 错误但接近
	WRONG_COMPLETELY: 1,        // 完全错误
	BLACKOUT: 0                 // 完全不会
}

// 自评选项(用于主观题)
export const SELF_GRADE_OPTIONS = [
	{ label: '完全掌握', value: 5, color: '#81C784' },
	{ label: '基本掌握', value: 4, color: '#AED581' },
	{ label: '需要巩固', value: 3, color: '#FFC107' },
	{ label: '不太理解', value: 2, color: '#FF9800' },
	{ label: '完全不会', value: 1, color: '#F44336' }
]

// ==================== 本地存储键名 ====================
// Storage Keys
export const STORAGE_KEYS = {
	USER_TOKEN: 'user_token',
	USER_INFO: 'user_info',
	REVIEW_SCHEDULE: 'review_schedule',
	ANSWER_HISTORY: 'answer_history',
	FAVORITES: 'favorites',
	EXAM_DRAFT: 'exam_draft_',  // + examId
	SETTINGS: 'app_settings',
	LAST_STUDY_SUBJECT: 'last_study_subject',
	STUDY_MODE: 'study_mode'
}

// ==================== 默认设置 ====================
// Default Settings
export const DEFAULT_SETTINGS = {
	reviewReminder: true,        // 复习提醒
	systemNotification: true,    // 系统通知
	updateNotification: true,    // 更新通知
	dndStart: '22:00',          // 免打扰开始时间
	dndEnd: '08:00',            // 免打扰结束时间
	fontSize: 'medium',         // 字体大小: small/medium/large
	nightMode: false            // 夜间模式
}

// ==================== 时间常量 ====================
// Time Constants
export const TIME_CONSTANTS = {
	ONE_DAY: 24 * 60 * 60 * 1000,      // 1天(毫秒)
	ONE_HOUR: 60 * 60 * 1000,          // 1小时
	ONE_MINUTE: 60 * 1000              // 1分钟
}

// ==================== 正则表达式 ====================
// Regular Expressions
export const REGEX = {
	PHONE: /^1[3-9]\d{9}$/,                          // 手机号
	STUDENT_ID: /^[0-9]{8,12}$/,                     // 学号
	VERIFICATION_CODE: /^\d{4,6}$/,                  // 验证码
	PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/     // 密码(6-20位,包含字母和数字)
}

// ==================== 配置常量 ====================
// Configuration Constants
export const CONFIG = {
	MAX_UPLOAD_SIZE: 5 * 1024 * 1024,  // 最大上传文件大小 5MB
	AVATAR_SIZE: 200,                   // 头像尺寸 200x200
	PAGE_SIZE: 20,                      // 分页大小
	MAX_FAVORITE_COUNT: 1000,           // 最大收藏数
	MAX_NOTE_LENGTH: 500,               // 笔记最大字数
	EXAM_WARNING_TIME: 5 * 60,          // 考试剩余提醒时间(秒)
	AUTO_SAVE_INTERVAL: 30              // 考试自动保存间隔(秒)
}

// ==================== API 错误码 ====================
// API Error Codes
export const ERROR_CODES = {
	SUCCESS: 0,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	SERVER_ERROR: 500,
	NETWORK_ERROR: -1
}

// ==================== 获取辅助函数 ====================
// Helper Functions

/**
 * 根据ID获取学科信息
 * @param {number} subjectId 学科ID
 * @returns {object} 学科对象
 */
export function getSubjectById(subjectId) {
	return SUBJECTS.find(s => s.id === subjectId)
}

/**
 * 根据code获取学科信息
 * @param {string} code 题型代码
 * @returns {object} 题型对象
 */
export function getQuestionType(code) {
	return QUESTION_TYPES[code]
}

/**
 * 根据code获取难度信息
 * @param {string} code 难度代码
 * @returns {object} 难度对象
 */
export function getDifficulty(code) {
	return DIFFICULTY_LEVELS[code.toUpperCase()]
}

/**
 * 格式化学校名称
 * @param {string} school 学校全称
 * @returns {string} 简称
 */
export function formatSchoolName(school) {
	// 去掉"医学院"、"医学部"等后缀
	return school.replace(/(医学院|医学部|中山医学院|同济医学院|湘雅医学院|华西医学中心|齐鲁医学院)$/, '')
}

export default {
	SUBJECTS,
	QUESTION_TYPES,
	QUESTION_TYPE_CODES,
	MEDICAL_SCHOOLS,
	MEDICAL_MAJORS,
	GRADES,
	DIFFICULTY_LEVELS,
	EXAM_TYPES,
	EXAM_STATUS,
	ARTICLE_CATEGORIES,
	MESSAGE_TYPES,
	PERFORMANCE_MAP,
	SELF_GRADE_OPTIONS,
	STORAGE_KEYS,
	DEFAULT_SETTINGS,
	TIME_CONSTANTS,
	REGEX,
	CONFIG,
	ERROR_CODES,
	getSubjectById,
	getQuestionType,
	getDifficulty,
	formatSchoolName
}
