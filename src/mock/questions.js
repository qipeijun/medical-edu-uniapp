/**
 * Mock 数据 - 题目数据
 */

export const mockQuestions = [
	{
		id: 'q001',
		subjectId: 1,
		subjectName: '系统解剖学',
		categoryId: 'c1_1',
		categoryName: '骨学总论',
		type: 'TYPE_A',
		content: '下列关于骨膜的描述,正确的是?',
		options: [
			{ label: 'A', text: '由纤维结缔组织构成', isCorrect: true },
			{ label: 'B', text: '包裹骨的所有表面', isCorrect: false },
			{ label: 'C', text: '内层富有血管、神经', isCorrect: false },
			{ label: 'D', text: '外层含有成骨细胞', isCorrect: false },
			{ label: 'E', text: '不参与骨的修复', isCorrect: false }
		],
		correctAnswer: 'A',
		explanation: {
			text: '骨膜由致密结缔组织构成,分为内外两层。外层为纤维层,富含血管和神经;内层为成骨层,含有成骨细胞。骨膜除关节面外,包裹骨的所有表面,参与骨的生长、修复和营养。',
			images: [],
			videos: []
		},
		difficulty: 'medium',
		createdAt: '2026-01-01',
		tags: ['骨膜', '骨学'],
		reviewSchedule: null,
		wrongCount: 0,
		correctCount: 0,
		hasViewedExplanation: false
	},
	{
		id: 'q002',
		subjectId: 1,
		subjectName: '系统解剖学',
		categoryId: 'c1_1',
		categoryName: '骨学总论',
		type: 'TYPE_A',
		content: '长骨的骨干主要由什么构成?',
		options: [
			{ label: 'A', text: '密质骨', isCorrect: true },
			{ label: 'B', text: '松质骨', isCorrect: false },
			{ label: 'C', text: '骨膜', isCorrect: false },
			{ label: 'D', text: '骨髓', isCorrect: false },
			{ label: 'E', text: '软骨', isCorrect: false }
		],
		correctAnswer: 'A',
		explanation: {
			text: '长骨的骨干主要由密质骨构成,骨干中央有骨髓腔。密质骨质地致密坚硬,具有支持和保护作用。',
			images: [],
			videos: []
		},
		difficulty: 'easy',
		createdAt: '2026-01-01',
		tags: ['长骨', '骨学'],
		reviewSchedule: null,
		wrongCount: 0,
		correctCount: 0,
		hasViewedExplanation: false
	},
	{
		id: 'q003',
		subjectId: 1,
		subjectName: '系统解剖学',
		categoryId: 'c1_2',
		categoryName: '关节学',
		type: 'TYPE_X',
		content: '关节的基本结构包括(多选)',
		options: [
			{ label: 'A', text: '关节面', isCorrect: true },
			{ label: 'B', text: '关节囊', isCorrect: true },
			{ label: 'C', text: '关节腔', isCorrect: true },
			{ label: 'D', text: '韧带', isCorrect: false },
			{ label: 'E', text: '滑膜', isCorrect: false }
		],
		correctAnswer: ['A', 'B', 'C'],
		explanation: {
			text: '关节的基本结构包括:关节面、关节囊和关节腔。韧带和滑膜是关节的辅助结构,不是基本结构。',
			images: [],
			videos: []
		},
		difficulty: 'medium',
		createdAt: '2026-01-01',
		tags: ['关节', '关节学'],
		reviewSchedule: null,
		wrongCount: 0,
		correctCount: 0,
		hasViewedExplanation: false
	},
	{
		id: 'q004',
		subjectId: 2,
		subjectName: '生理学',
		categoryId: 'c2_1',
		categoryName: '细胞生理',
		type: 'TYPE_A',
		content: '细胞膜的基本结构是?',
		options: [
			{ label: 'A', text: '磷脂双分子层', isCorrect: true },
			{ label: 'B', text: '蛋白质单层', isCorrect: false },
			{ label: 'C', text: '糖类双层', isCorrect: false },
			{ label: 'D', text: '脂质单层', isCorrect: false },
			{ label: 'E', text: '核酸双螺旋', isCorrect: false }
		],
		correctAnswer: 'A',
		explanation: {
			text: '细胞膜的基本结构是磷脂双分子层,其中镶嵌或贯穿着各种蛋白质分子,形成液态镶嵌模型。',
			images: [],
			videos: []
		},
		difficulty: 'easy',
		createdAt: '2026-01-01',
		tags: ['细胞膜', '细胞生理'],
		reviewSchedule: null,
		wrongCount: 0,
		correctCount: 0,
		hasViewedExplanation: false
	},
	{
		id: 'q005',
		subjectId: 1,
		subjectName: '系统解剖学',
		categoryId: 'c1_1',
		categoryName: '骨学总论',
		type: 'DEFINITION',
		content: '请解释"骨髓腔"的概念',
		options: [],
		correctAnswer: '',
		explanation: {
			text: '骨髓腔是长骨骨干内部的空腔,呈管状,容纳骨髓。成年人的骨髓腔内主要含有黄骨髓(脂肪组织),在失血过多时可转化为红骨髓以补充造血功能。',
			images: [],
			videos: []
		},
		difficulty: 'medium',
		createdAt: '2026-01-01',
		tags: ['骨髓腔', '骨学'],
		reviewSchedule: null,
		wrongCount: 0,
		correctCount: 0,
		hasViewedExplanation: false
	}
]

/**
 * 根据学科ID和分类ID获取题目列表
 */
export function getQuestionsByCategory(subjectId, categoryId) {
	return mockQuestions.filter(q => {
		if (categoryId) {
			return q.subjectId === subjectId && q.categoryId === categoryId
		}
		return q.subjectId === subjectId
	})
}

/**
 * 根据ID获取题目
 */
export function getQuestionById(questionId) {
	return mockQuestions.find(q => q.id === questionId)
}

export default {
	mockQuestions,
	getQuestionsByCategory,
	getQuestionById
}
