# Easyun Web

多云 IaaS 资源管理平台 — Web 前端

- 基于 React 18 + TypeScript 5，采用 Vite 6 构建
- UI 组件采用 shadcn/ui（Radix UI + Tailwind CSS 4），组件源码在本地，完全可控
- 数据表格采用 TanStack Table（headless）+ shadcn Table（UI）
- 基于 OpenAPI spec 自动生成类型安全的 API Client
- 国际化支持：中文、英文、日语

## 技术栈

| 组件 | 版本 |
|---|---|
| React | 18.3 |
| TypeScript | 5.7 |
| Vite | 6.4 |
| Tailwind CSS | 4.2 |
| shadcn/ui | v4 (base-nova) |
| TanStack Table | 8.x |
| Redux Toolkit | 2.5 |
| React Router | 6.x |
| i18next | 23.x |
| @hey-api/openapi-ts | 0.95 |

## 快速开始

```bash
git clone https://github.com/aleck31/Easyun.git
cd Easyun/web

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env，设置 VITE_APP_BASE_API 为后端 API 地址

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 多环境配置

环境配置文件位于 `` 目录，Vite 根据运行模式自动加载：

| 命令 | 配置文件 |
|---|---|
| `npm run dev` | `.env` |
| `npm run dev:stg` | `.env.stg` |
| `npm run build:prod` | `.env.prod` |

> 除 `.env.example` 外，所有 env 文件已被 `.gitignore` 忽略。

### 常用命令

```bash
npm run dev              # 本地开发（HMR，端口 8080）
npm run dev:stg          # 测试环境
npm run build            # 生产构建
npm run serve            # 预览构建结果
npm run gen:api          # 重新生成 API Client（后端接口变更后执行）
npm run lint             # ESLint 代码检查
```

### API Client 生成

后端接口变更后，执行以下命令重新生成：

```bash
npm run gen:api
```

输入源：`../easyun-server/openapi.json`，输出到 `src/api-client/`。**不要手动修改生成的文件**。

## 项目结构

```
easyun-web/
├──                            多环境配置文件
├── src/
│   ├── api-client/                 自动生成的 API Client（勿手动修改）
│   ├── assets/
│   │   ├── i18n/                   国际化翻译文件（en-us / zh-cn / ja-jp）
│   │   ├── images/                 图片资源
│   │   └── styles/                 全局样式（Tailwind 入口）
│   ├── components/
│   │   ├── ui/                     shadcn 组件 + 公共业务组件
│   │   │   ├── data-table          数据表格（TanStack + shadcn Table）
│   │   │   ├── resource-card       统一资源卡片布局
│   │   │   ├── resource-list-page  统一列表页布局
│   │   │   ├── tab-layout          模块级导航
│   │   │   ├── simple-select       Select 包装组件
│   │   │   └── button, input, ...  shadcn 基础组件
│   │   ├── Datacenter/             数据中心业务组件
│   │   ├── DashboardCommon/        仪表盘组件
│   │   ├── Logic/                  业务逻辑组件（Header, Footer, Tags）
│   │   └── resource/               资源卡片组件
│   ├── constant/                   前端类型定义与常量
│   ├── i18n/                       国际化配置
│   ├── lib/                        工具库（cn 函数）
│   ├── redux/                      状态管理（slice + store）
│   ├── routes/                     路由配置
│   ├── utils/                      通用工具函数
│   └── views/                      页面
│       ├── Home/                   首页（数据中心列表）
│       ├── Login/                  登录
│       ├── Dashboard/              仪表盘
│       ├── DataCenter/             数据中心管理
│       ├── Resource/               资源管理
│       ├── Account/                账户管理
│       └── Event/                  事件日志
├── components.json                 shadcn/ui 配置
├── openapi-ts.config.ts            API Client 生成配置
├── tsconfig.json                   TypeScript 配置
├── vite.config.ts                  Vite 配置
└── package.json                    项目依赖
```

## 公共组件

| 组件 | 路径 | 用途 |
|---|---|---|
| `ResourceCard` | `components/ui/resource-card` | 统一资源卡片布局（图标 + 标题 + 操作菜单 + 底部信息） |
| `ResourceListPage` | `components/ui/resource-list-page` | 统一列表页布局（加载态 + 空状态 + 排序 + 网格） |
| `TabLayout` | `components/ui/tab-layout` | 模块级水平导航（DataCenter / Resource / Account） |
| `DataTable` | `components/ui/data-table` | 数据表格（排序、分页、行选择） |
| `SimpleSelect` | `components/ui/simple-select` | Select 包装（兼容 onChange + children 用法） |

## 参与贡献

请参阅 [CONTRIBUTING.md](../CONTRIBUTING.md) 了解开发规范和约定。

## 许可证

本项目采用 [Apache License 2.0](../LICENSE) 许可。
