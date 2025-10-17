# admin-by-ai 管理中台

基于最新 Vue 3 + TypeScript + Vite 的企业级管理面板模板。项目已经按设计稿拆分成布局、图表、统计卡等模块，集成了 UnoCSS、Element Plus、D3.js 等能力。

## 技术栈

- Vue 3 `<script setup>` + TypeScript + Vite 7
- Element Plus 组件体系 + 自定义主题（SCSS）
- UnoCSS 原子化样式 & Carbon Icons
- Vue Router + Pinia + Vue I18n
- D3.js 渲染流量折线图
- Axios + Vite Mock Server 提供数据模拟
- ESLint + Prettier + Husky/Lint-Staged 格式化和校验

## 快速开始

```bash
npm install
npm run dev
```

访问 <http://localhost:5173> 查看界面。Mock 接口默认开启，若在生产模式需关闭可在 `vite.config.ts` 中调整。

## 目录结构

- `src/layouts/BaseLayout.vue`：侧边栏 + 顶栏的基础布局，支持国际化与暗黑模式。
- `src/views/dashboard/DashboardView.vue`：仪表盘主体，包括统计卡、折线图、活动时间线、工单表格与任务进度。
- `src/components/charts/TrafficLine.vue`：使用 D3.js 实现的响应式图表组件。
- `src/store/theme.ts`：基于 VueUse 的主题切换逻辑。
- `mock/dashboard.ts`：通过 `vite-plugin-mock` 返回 dashboard 所需的所有数据。
- `uno.config.ts`：UnoCSS 主题色、快捷类、图标预设配置。

## 设计稿映射说明

- 顶部工具栏包含搜索、通知、语言切换、主题切换，与设计稿一致。
- 仪表盘首屏 4 张统计卡使用 Element Plus Card + UnoCSS 快捷类，支持动态数据。
- 流量趋势图使用 `TrafficLine` + D3.js，实现平滑曲线与渐变填充。
- 工单列表使用 Element Plus Table，优先级、状态以标签区分；任务列表展示进度条与截止时间。

## 常用命令

```bash
npm run lint      # ESLint 检查
npm run format    # Prettier 全量格式化
npm run build     # 类型检查 + 生产构建
```

## 后续拓展

- 将 mock 数据替换为真实 API 时，只需在 `src/services/dashboard.ts` 更新接口地址。
- 若需要更多页面，按 `views` 与 `router` 的模式新增路由即可。