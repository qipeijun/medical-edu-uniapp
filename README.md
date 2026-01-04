# 🏥 医教通 (Medical Edu)

> 基于 uni-app + Vue 3 的现代化医学教育学习平台，专为医学生和执业医师打造。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/vue-3.x-42b883.svg)
![Uni-app](https://img.shields.io/badge/uniapp-3.0-green.svg)
![Platform](https://img.shields.io/badge/platform-H5%20%7C%20WeChat-07c160.svg)

## 📖 项目介绍

**医教通** 是一款功能完备的医学教育辅助应用，旨在通过科学的学习方法帮助医学生掌握繁杂的医学知识。项目采用 **uni-app** 跨平台框架开发，支持微信小程序和 H5 端。

核心特色包含基于 **SM-2 间隔重复算法** (Spaced Repetition) 的智能复习系统、全真模拟考试、多维度的题库练习以及富文本医学科普文章。

## ✨ 核心功能

*   **📚 智能题库**
    *   覆盖系统解剖学、生理学、病理学等8大核心医学学科。
    *   支持 A型题、X型题、名词解释等多种题型。
    *   包含题目解析、错题收藏、纠错反馈功能。

*   **🧠 间隔重复复习**
    *   内置改进版 SM-2 记忆算法，自动计算最佳复习时间点。
    *   可视化复习进度环，按学科统计待复习任务。

*   **📝 全真考试系统**
    *   模拟真实考试环境，支持倒计时、答题卡跳转。
    *   自动阅卷评分，生成详细的成绩分析报告。

*   **🎥 课程学习**
    *   结构化的视频课程目录。
    *   支持试看、课程介绍及讲师信息展示。

*   **👤 个性化中心**
    *   **我的笔记本**：随时记录学习心得，支持增删改查。
    *   **消息通知**：系统消息、复习提醒、考试通知。
    *   **设置**：自定义通知开关、夜间模式（预留）。

## 🛠️ 技术栈

*   **核心框架**: [uni-app](https://uniapp.dcloud.io/) + [Vue 3](https://v3.vuejs.org/)
*   **状态管理**: [Pinia](https://pinia.vuejs.org/)
*   **样式预处理**: SASS/SCSS (自定义设计系统)
*   **图标库**: CSS 绘图 + 静态资源
*   **核心算法**: 自研间隔重复算法 (`utils/spaced-repetition.js`)

## 📂 目录结构

```bash
medical-edu-uniapp/
├── components/      # 通用组件 (TabBar, NavBar, EmptyState...)
├── mock/            # 模拟数据 (题目, 课程, 考试...)
├── pages/           # 页面文件
│   ├── auth/        # 登录注册
│   ├── home/        # 首页
│   ├── study/       # 题库与答题
│   ├── review/      # 复习中心
│   ├── exam/        # 考试模块
│   └── ...
├── static/          # 静态资源 (图标, 图片)
├── stores/          # Pinia 状态管理
├── styles/          # 全局样式与变量 (variables.scss, mixins.scss)
└── utils/           # 工具函数 (日期, 验证, 核心算法)
```

## 🚀 快速开始

### 环境要求
*   [HBuilderX](https://www.dcloud.io/hbuilderx.html) (推荐) 或 Node.js 环境

### 方式一：使用 HBuilderX (推荐)

1.  克隆本项目：
    ```bash
    git clone https://github.com/your-username/medical-edu-uniapp.git
    ```
2.  打开 HBuilderX，选择 `文件` -> `导入` -> `从本地目录导入`，选择项目文件夹。
3.  点击菜单栏 `运行` -> `运行到浏览器` -> `Chrome`，或 `运行到小程序模拟器`。

### 方式二：CLI 命令行

*(注：本项目结构针对 HBuilderX 优化，如需 CLI 运行可能需要额外配置 `vite.config.js`)*

1.  安装依赖：
    ```bash
    npm install
    ```
2.  运行服务：
    ```bash
    npm run dev:h5
    # 或
    npm run dev:mp-weixin
    ```

## 🎨 设计规范

本项目包含一套完整的设计系统，位于 `styles/` 目录下：
*   **Colors**: 定义了主色调 `Tech Blue` (#03A9F4) 及辅助色体系。
*   **Mixins**: 包含 Flex 布局、卡片样式、字体截断等常用 SCSS 混合宏。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。
