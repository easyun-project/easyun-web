# Easyun Web

AWS 云资源管理平台前端项目。

## 技术栈

- **构建工具**: Vite 6，开发启动极快，支持 HMR 热更新
- **前端框架**: React 18 + TypeScript 5
- **UI 组件库**: Ant Design 5（CSS-in-JS，无需额外引入样式文件）
- **状态管理**: Redux Toolkit 2 + redux-persist
- **路由**: React Router DOM 6
- **CSS 框架**: Tailwind CSS 3，tailwindcss-classnames 提供类型约束
- **国际化**: i18next，默认支持中文、英文、日语
- **HTTP 请求**: @hey-api/openapi-ts 自动生成类型安全的 API Client
- **日期处理**: Day.js

## 特性

- 以 TypeScript 为开发语言，有类型约束不会写出难以查找的 bug
- 支持别名 `@` 指向 `src` 目录，`@@` 指向项目根目录
- 支持国际化，默认写了中文、英文、日语 3 种语言
- 配置了 ESLint，使用 `npm run lint` 可以检查代码格式问题
- 配置了多环境，默认为 local、stg、prod 3 个环境，如果有特殊需求可根据需要扩展
- 状态管理采用 Redux Toolkit，一个 slice 文件就是一个业务模块

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境变量（根据 .env.example 创建本地配置）
cp envs/.env.example envs/.env.local
# 编辑 envs/.env.local，填入实际的后端 API 地址等信息

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run serve
```

### 多环境配置

环境配置文件位于 `envs/` 目录下，Vite 会根据运行模式自动加载对应文件：

| 命令 | 加载文件 |
|---|---|
| `npm run dev` | `envs/.env.local` |
| `npm run dev:stg` | `envs/.env.stg` |
| `npm run build:prod` | `envs/.env.prod` |

新增环境只需在 `envs/` 下创建对应的 `.env.<mode>` 文件即可。模板参考 `envs/.env.example`。

> 注意：除 `.env.example` 外，所有 env 文件已被 `.gitignore` 忽略，不会提交到仓库。

## 目录结构

```
├── envs                          多环境配置文件（.env.local / .env.stg / .env.prod）
└── src                           工程核心代码
    ├── assets                    资源文件
    │   ├── i18n                     国际化翻译文件
    │   ├── images                   图片资源
    │   └── styles                   全局样式
    ├── components                 组件
    │   ├── Common                   通用组件（CButton, CTable, CInput 等）
    │   ├── Datacenter               数据中心相关组件
    │   ├── DashboardCommon          仪表盘通用组件
    │   ├── Logic                    业务逻辑组件（CHeader, CFooter, CTags 等）
    │   └── resource                 资源卡片组件
    ├── constant                     常量与类型定义
    ├── i18n                         国际化代码实现
    ├── redux                        状态管理（slice 和 store）
    ├── routes                       路由配置
    ├── api-client                 自动生成的 API Client（勿手动修改，npm run gen:api 生成）
    ├── utils                        通用方法
    └── views                        页面
        ├── Dashboard                  仪表盘
        ├── DataCenter                 数据中心管理
        ├── Home                       首页
        ├── Login                      登录
        ├── Resource                   资源管理（Server, Storage, Database, LoadBalancer）
        └── Account                    账户管理
├── tsconfig.json                     TypeScript 配置
├── vite.config.ts                    Vite 配置
├── tailwind.config.js                Tailwind CSS 配置
├── .eslintrc.js                      ESLint 配置
├── index.html                        项目入口文件
└── package.json                      项目依赖声明文件
```
