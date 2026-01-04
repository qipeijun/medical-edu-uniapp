/**
 * Mock 数据 - 课程数据
 */

export const mockCourses = [
	{
		id: 'c001',
		title: '系统解剖学精讲',
		subtitle: '医学基础必修课',
		cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		instructor: '张教授',
		instructorTitle: '北京大学医学部教授',
		duration: '48小时',
		studentCount: 2341,
		rating: 4.8,
		description: '本课程系统讲解人体各器官系统的形态结构，配合3D模型演示，帮助学生构建立体解剖知识体系。',
		chapters: [
			{
				title: '第一章 骨学',
				lessons: [
					{ id: 'l1_1', title: '1.1 骨学总论', duration: '45:00', isFree: true },
					{ id: 'l1_2', title: '1.2 躯干骨', duration: '50:00', isFree: false },
					{ id: 'l1_3', title: '1.3 颅骨', duration: '55:00', isFree: false },
					{ id: 'l1_4', title: '1.4 上肢骨', duration: '40:00', isFree: false },
					{ id: 'l1_5', title: '1.5 下肢骨', duration: '42:00', isFree: false }
				]
			},
			{
				title: '第二章 关节学',
				lessons: [
					{ id: 'l2_1', title: '2.1 关节学总论', duration: '35:00', isFree: false },
					{ id: 'l2_2', title: '2.2 躯干骨的连接', duration: '40:00', isFree: false }
				]
			}
		]
	},
	{
		id: 'c002',
		title: '临床执业医师资格考试冲刺',
		subtitle: '考点串讲与解题技巧',
		cover: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		instructor: '李医师',
		instructorTitle: '三甲医院主任医师',
		duration: '32小时',
		studentCount: 5620,
		rating: 4.9,
		description: '针对2026年执业医师考试大纲，精选高频考点，传授解题技巧，助力高分通过。',
		chapters: [
			{
				title: '第一部分 基础医学',
				lessons: [
					{ id: 'l_exam_1', title: '生理学重点回顾', duration: '60:00', isFree: true },
					{ id: 'l_exam_2', title: '生物化学必考点', duration: '55:00', isFree: false }
				]
			},
			{
				title: '第二部分 临床医学',
				lessons: [
					{ id: 'l_exam_3', title: '呼吸系统疾病', duration: '90:00', isFree: false },
					{ id: 'l_exam_4', title: '心血管系统疾病', duration: '85:00', isFree: false }
				]
			}
		]
	},
	{
		id: 'c003',
		title: '心电图快速入门',
		subtitle: '从零基础到临床读图',
		cover: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		instructor: '王医生',
		instructorTitle: '心内科主治医师',
		duration: '12小时',
		studentCount: 1205,
		rating: 4.7,
		description: '通俗易懂的语言讲解心电图原理，大量临床心电图实例分析，快速掌握读图技能。',
		chapters: [
			{
				title: '基础篇',
				lessons: [
					{ id: 'l_ecg_1', title: '心电图产生原理', duration: '30:00', isFree: true },
					{ id: 'l_ecg_2', title: '正常心电图波形', duration: '40:00', isFree: false }
				]
			}
		]
	}
]

export function getCourseById(id) {
	return mockCourses.find(c => c.id === id)
}

export default {
	mockCourses,
	getCourseById
}
