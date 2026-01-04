/**
 * Mock 数据 - 消息通知
 */

export const mockMessages = [
	{
		id: 'm001',
		type: 'system',
		title: '欢迎注册医教通',
		content: '恭喜您成功注册医教通账号！开启您的医学学习之旅吧。',
		time: '2026-01-04 09:00:00',
		isRead: false
	},
	{
		id: 'm002',
		type: 'review',
		title: '今日复习提醒',
		content: '您今天还有 45 道题目需要复习，请及时完成。',
		time: '2026-01-04 08:30:00',
		isRead: false
	},
	{
		id: 'm003',
		type: 'update',
		title: '题库更新通知',
		content: '系统解剖学题库新增了 50 道练习题，快去看看吧。',
		time: '2026-01-03 14:00:00',
		isRead: true
	}
]

export default {
	mockMessages
}
