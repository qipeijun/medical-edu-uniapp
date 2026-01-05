# 医教通 (Medical Edu) - 开发者指南

## 项目概览

**医教通 (Medical Edu)** 是一个基于 **uni-app** 和 **Vue 3** 构建的综合医学教育平台。它旨在通过科学的学习方法（特别是间隔重复系统 SRS），帮助医学生和从业者掌握复杂的医学知识。

**核心技术栈：**
-   **框架：** [uni-app](https://uniapp.dcloud.io/) (基于 Vue 3)
-   **状态管理：** [Pinia](https://pinia.vuejs.org/)
-   **构建工具：** Vite
-   **样式：** SCSS/SASS 配合自定义的 "Tech Fresh" (科技清新) 设计系统。
-   **平台：** H5、微信小程序及其他小程序平台。

## 核心功能

1.  **智能题库：** 支持多种题型（A型题、X型题、名词解释），覆盖 8 大核心医学学科。
2.  **间隔复习 (SRS)：** 实现改进版的 **SM-2 算法**，优化记忆保持效果。
3.  **模拟考试：** 全真模拟考试环境，支持自动阅卷。
4.  **视频课程：** 结构化的视频学习模块。
5.  **个性化中心：** 笔记本、收藏夹和学习统计。

## 构建与运行

项目使用 `package.json` 中定义的标准 `npm` 脚本。

### 环境要求
-   Node.js (推荐 LTS 版本)
-   HBuilderX (推荐用于 uni-app 开发) 或配备 Volar 插件的 VS Code。

### 常用命令

*   **安装依赖：**
    ```bash
    npm install
    ```

*   **启动开发服务器 (H5)：**
    ```bash
    npm run dev:h5
    ```

*   **启动开发服务器 (微信小程序)：**
    ```bash
    npm run dev:mp-weixin
    ```

*   **构建 H5：**
    ```bash
    npm run build:h5
    ```

*   **构建微信小程序：**
    ```bash
    npm run build:mp-weixin
    ```

## 项目架构

### 目录结构

*   **`components/`**: 可复用的 Vue 组件 (例如 `TabBar`, `LoadingSpinner`, `OptionItem`)。
*   **`mock/`**: 开发用的模拟数据 (题目, 课程, 考试)。
*   **`pages/`**: 应用视图/路由。
    *   `auth/`: 登录和注册。
    *   `home/`: 首页/仪表盘。
    *   `study/`: 题库和详细练习页面。
    *   `review/`: 间隔重复复习中心。
    *   `exam/`: 模拟考试界面。
*   **`static/`**: 静态资源 (图片, 图标)。
*   **`stores/`**: Pinia 全局状态存储 (User, Exam, Review 等)。
*   **`styles/`**: 全局 SCSS 文件。
    *   `variables.scss`: 设计变量 (颜色, 字体)。
    *   `mixins.scss`: 可复用的样式模式。
*   **`utils/`**: 工具函数。
    *   `spaced-repetition.js`: **核心算法**。SM-2 算法的实现。

### 核心逻辑：间隔重复 (SM-2)

位于 `src/utils/spaced-repetition.js`。

*   **算法：** 改进版 SuperMemo-2。
*   **输入：** `easeFactor` (难度系数), `interval` (间隔天数), `performance` (表现评分 0-5)。
*   **逻辑：**
    *   回答正确会增加复习间隔。
    *   回答错误会将间隔重置为 1 天。
    *   `easeFactor` 根据用户表现动态调整。
*   **函数：**
    *   `calculateNextReview`: 计算下次复习日期和新参数。
    *   `getTodayReviews`: 筛选今日需复习的题目。

## 开发规范

*   **样式：** 使用 `styles/variables.scss` 中的 SCSS 变量（如 `$color-primary`, `$color-tech-blue`）以保持 "Tech Fresh" 设计风格。
*   **状态：** 使用 Pinia 存储需要持久化或共享的数据（例如用户会话、考试进度）。
*   **模拟数据：** 在没有后端的情况下开发新功能时，请在 `mock/` 中添加数据并导入。
*   **路由：** 定义在 `pages.json` 中。确保在此处注册新页面。
*   **图标：** 项目混合使用静态图片 (`static/`) 和 CSS 绘制的图标。

## 设计系统 ("Tech Fresh")

*   **主色调：**
    *   科技蓝 (Tech Blue): `#03A9F4`
    *   浅青蓝 (Light Cyan): `#E0F7FA`
*   **辅助色：**
    *   浅草绿 (Grass Green): `#81C784`
    *   暖白 (Warm White): `#FAFAFA`
*   **UI 原则：** 轻量描边、圆角卡片、柔和阴影和清晰的排版。