# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**医教通 (Medical Edu)** is a modern medical education learning platform built with uni-app + Vue 3, designed for medical students and practicing physicians. The platform supports both H5 and WeChat Mini Program deployments.

**Core Feature**: Intelligent review system based on the **SM-2 spaced repetition algorithm** (see `src/utils/spaced-repetition.js`), which automatically calculates optimal review intervals based on user performance.

## Development Commands

### Running the Application
```bash
# H5 development (default)
npm run dev:h5

# WeChat Mini Program
npm run dev:mp-weixin

# Other platforms available via npm run dev:<platform>
```

### Building for Production
```bash
# Build for H5
npm run build:h5

# Build for WeChat Mini Program
npm run build:mp-weixin
```

### Testing
This project does not currently have automated tests configured.

## Architecture Overview

### State Management (Pinia)
The application uses Pinia for centralized state management. All stores are located in `src/stores/`:

- **review.js**: Manages review schedules, implements SM-2 algorithm integration
- **question.js**: Handles question bank, answer history, and wrong question tracking
- **user.js**: User authentication, profile info, and student information
- **exam.js**: Exam management, mock exam sessions, and scoring
- **course.js**: Course catalog and video learning progress
- **notebook.js**: User notes associated with questions
- **favorites.js**: Bookmarked questions and articles
- **article.js**: Popular science articles and categories

### Core Algorithm: Spaced Repetition (`src/utils/spaced-repetition.js`)

This is the **most critical** file in the codebase. Key functions:

- **`calculateNextReview(questionRecord, performance)`**: Core SM-2 implementation
  - Takes performance score (0-5) and previous review data
  - Returns next review date, new interval, new ease factor, and review count
  - Performance < 3 resets the interval to day 1
  - Maximum interval capped at 180 days

- **`needsReview(nextReviewDate)`**: Checks if a question is due for review today

- **`getTodayReviews(allQuestions)`**: Filters and prioritizes today's review queue
  - Prioritizes questions with higher wrong counts
  - Secondary sort by earliest review date

- **`calculatePerformance(isCorrect, timeSpent, hasViewedExplanation)`**: Auto-calculates performance score for objective questions based on correctness, time, and whether hints were used

When implementing new review-related features, always:
1. Preserve the SM-2 algorithm logic
2. Use `PERFORMANCE_MAP` constants from `src/utils/constants.js`
3. Maintain review schedule integrity in local storage

### Question Types and Subject System

Defined in `src/utils/constants.js`:

**8 Medical Subjects** (`SUBJECTS`):
- 系统解剖学 (Systemic Anatomy)
- 生理学 (Physiology)
- 病理学 (Pathology)
- 药理学 (Pharmacology)
- 内科学 (Internal Medicine)
- 外科学 (Surgery)
- 妇产科学 (Obstetrics & Gynecology)
- 儿科学 (Pediatrics)

**Question Types** (`QUESTION_TYPES`):
- **TYPE_A**: Single choice (5 options, 1 correct answer)
- **TYPE_X**: Multiple choice (5 options, 2-4 correct answers)
- **DEFINITION**: Medical term definitions (subjective)
- **SHORT_ANSWER**: Short answer questions (subjective)

For objective questions (TYPE_A, TYPE_X), the system auto-calculates performance scores. For subjective questions, users self-grade using `SELF_GRADE_OPTIONS` (5-point scale).

### Page Structure

The application follows uni-app's page-based routing defined in `src/pages.json`:

**Main Tab Pages** (custom tab bar):
- `pages/home/index`: Home with daily review summary, course entry, popular science
- `pages/study/index`: Question bank browsing and practice
- `pages/review/index`: Daily review queue grouped by subject
- `pages/profile/index`: User profile, notes, favorites, settings

**Secondary Pages**:
- `pages/auth/*`: Login, registration, and info completion flow
- `pages/study/question-detail`: Answer interface with explanation panel
- `pages/exam/*`: Exam list, taking exam, and result analysis
- `pages/courses/*`: Course catalog and video player
- `pages/notebook/*`: Note management with question association
- `pages/article/detail`: Popular science article reader

### Component Organization

Components are organized by feature domain in `src/components/`:

- **common/**: Shared UI components
  - `TabBar.vue`: Custom tab bar (required because `tabBar.custom: true`)
  - `EmptyState.vue`: Empty state placeholder
  - `LoadingSpinner.vue`: Loading indicator
  - `StatusBar.vue`: Status bar spacer for custom navigation

- **question/**: Question-specific components
  - `OptionItem.vue`: Single/multiple choice option renderer
  - `ExplanationPanel.vue`: Collapsible explanation with rich media support

- **review/**: Review-specific components
  - `ProgressRing.vue`: Circular progress indicator for review completion

### Mock Data System

All mock data is in `src/mock/`:
- `questions.js`: Sample question bank with answers and explanations
- `exams.js`: Mock exam templates
- `courses.js`: Course catalog with video metadata
- `articles.js`: Popular science articles
- `messages.js`: System notifications and review reminders
- `subjects.js`: Subject hierarchies and categories

**Important**: This is currently a **frontend-only** application. All data is mocked and stored in local storage. When integrating with a backend API, replace mock imports with API calls while preserving the data structure contracts.

### Design System

Located in `src/styles/`:

- **variables.scss**: Color palette and spacing system
  - Primary: Tech Blue `#03A9F4`
  - Background: Warm White `#FAFAFA`
  - Light accent: Cyan Blue `#E0F7FA`
  - Success: Light Green `#81C784`

- **mixins.scss**: Reusable SCSS mixins for layouts
  - Flex layouts, card styles, text truncation, etc.

- **common.scss**: Global styles and reset

When adding new UI components, use existing mixins and color variables to maintain visual consistency with the "Tech Fresh" design language described in `prd.md`.

### Local Storage Keys

Defined in `STORAGE_KEYS` constant (`src/utils/constants.js`):
- `user_token`, `user_info`: Authentication
- `review_schedule`: Review queue with next review dates
- `answer_history`: Complete answer log for analytics
- `favorites`: Bookmarked questions
- `exam_draft_<examId>`: Auto-saved exam progress
- `app_settings`: User preferences

Always use these constants instead of hardcoded strings to avoid storage key mismatches.

## Important Implementation Notes

### Custom Navigation Bar

Many pages use `navigationStyle: "custom"` in `pages.json`. When working on these pages:
- Include `<StatusBar />` component at the top to handle safe area
- Implement custom back button or navigation UI
- Test on devices with notches/dynamic islands

### uni-app Multi-Platform Considerations

When adding features:
- Use uni-app API (`uni.xxx`) instead of platform-specific APIs
- Test conditional compilation if needed: `// #ifdef H5` or `// #ifdef MP-WEIXIN`
- Be aware that some Vue 3 features may have limited support in Mini Program environments

### Performance Score Calculation

When implementing answer submission logic:
1. For **objective questions**: Use `calculatePerformance(isCorrect, timeSpent, hasViewedExplanation)`
2. For **subjective questions**: Present `SELF_GRADE_OPTIONS` for user self-evaluation
3. Always call `calculateNextReview(questionRecord, performanceScore)` to update review schedule
4. Store updated review schedule in local storage immediately

### HBuilderX Primary IDE

While the project can run via CLI (`npm run dev:h5`), it's optimized for **HBuilderX**:
- Run via HBuilderX: `运行` → `运行到浏览器` → `Chrome`
- Mini Program: `运行` → `运行到小程序模拟器` → `微信开发者工具`

The `vite.config.js` is minimal; additional build configuration may be managed through HBuilderX project settings.

## UI/Design Files Reference

The `ui-gemini/` directory contains static HTML mockups of key pages (created during design phase). These are **reference only** and not part of the runtime application. Refer to them for design intent when implementing new features.

The comprehensive product requirements and UI specifications are documented in `prd.md` (in Chinese), which details:
- User flows for all features
- Design system specifications
- Interaction patterns
- Backend admin platform architecture (not yet implemented)

## Online Demo

H5 version is deployed via GitHub Pages: https://qipeijun.github.io/medical-edu-uniapp/
