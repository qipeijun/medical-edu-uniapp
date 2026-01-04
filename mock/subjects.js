/**
 * Mock 数据 - 学科数据
 */

export const mockSubjects = [
	{
		id: 1,
		name: '系统解剖学',
		nameEn: 'Systemic Anatomy',
		icon: 'bone',
		color: '#03A9F4',
		description: '研究正常人体各器官系统的形态结构',
		categories: [
			{
				id: 'c1_1',
				name: '骨学总论',
				questionCount: 120,
				completedCount: 45,
				thumbnail: ''
			},
			{
				id: 'c1_2',
				name: '关节学',
				questionCount: 85,
				completedCount: 20,
				thumbnail: ''
			},
			{
				id: 'c1_3',
				name: '消化系统',
				questionCount: 200,
				completedCount: 100,
				thumbnail: ''
			},
			{
				id: 'c1_4',
				name: '呼吸系统',
				questionCount: 150,
				completedCount: 80,
				thumbnail: ''
			}
		]
	},
	{
		id: 2,
		name: '生理学',
		nameEn: 'Physiology',
		icon: 'activity',
		color: '#F44336',
		description: '研究生物体及其组成部分的正常功能',
		categories: [
			{
				id: 'c2_1',
				name: '细胞生理',
				questionCount: 95,
				completedCount: 30,
				thumbnail: ''
			},
			{
				id: 'c2_2',
				name: '血液循环',
				questionCount: 180,
				completedCount: 60,
				thumbnail: ''
			}
		]
	},
	{
		id: 3,
		name: '病理学',
		nameEn: 'Pathology',
		icon: 'microscope',
		color: '#E91E63',
		description: '研究疾病的发生发展规律及机制',
		categories: [
			{
				id: 'c3_1',
				name: '病理学总论',
				questionCount: 150,
				completedCount: 40,
				thumbnail: ''
			}
		]
	},
	{
		id: 4,
		name: '药理学',
		nameEn: 'Pharmacology',
		icon: 'flask',
		color: '#FFC107',
		description: '研究药物与机体相互作用规律',
		categories: []
	},
	{
		id: 5,
		name: '内科学',
		nameEn: 'Internal Medicine',
		icon: 'stethoscope',
		color: '#4CAF50',
		description: '研究内脏器官疾病的诊断治疗',
		categories: []
	},
	{
		id: 6,
		name: '外科学',
		nameEn: 'Surgery',
		icon: 'scalpel',
		color: '#2196F3',
		description: '研究手术治疗疾病的临床学科',
		categories: []
	},
	{
		id: 7,
		name: '妇产科学',
		nameEn: 'Obstetrics & Gynecology',
		icon: 'female',
		color: '#FF4081',
		description: '研究女性生殖系统疾病及妊娠分娩',
		categories: []
	},
	{
		id: 8,
		name: '儿科学',
		nameEn: 'Pediatrics',
		icon: 'baby',
		color: '#00BCD4',
		description: '研究儿童生长发育及疾病防治',
		categories: []
	}
]

export default {
	mockSubjects
}
