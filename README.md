# Easyun Web

[中文文档](docs/README_zh.md)

Multi-cloud IaaS resource management platform — web frontend.

- React 18 + TypeScript 5, built with Vite 6
- UI powered by shadcn/ui (Radix UI + Tailwind CSS 4), fully customizable local components
- Data tables via TanStack Table (headless) + shadcn Table (UI)
- Auto-generated type-safe API client from OpenAPI spec
- i18n support: English, Chinese, Japanese

## Tech Stack

| Component | Version |
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

## Quick Start

```bash
git clone https://github.com/aleck31/Easyun.git
cd Easyun/web

# Install dependencies
npm install

# Configure environment
cp envs/.env.example envs/.env.local
# Edit envs/.env.local — set VITE_APP_BASE_API to your backend URL

# Start dev server
npm run dev

# Build for production
npm run build
```

### Environment Configuration

Config files are in `envs/`. Vite loads the matching file by mode:

| Command | Config File |
|---|---|
| `npm run dev` | `envs/.env.local` |
| `npm run dev:stg` | `envs/.env.stg` |
| `npm run build:prod` | `envs/.env.prod` |

> All env files except `.env.example` are gitignored.

### API Client Generation

When backend API changes, regenerate the client:

```bash
npm run gen:api
```

This reads `../easyun-server/openapi.json` and outputs to `src/api-client/`. Do not edit generated files manually.

## Project Structure

```
easyun-web/
├── envs/                           Environment config files
├── src/
│   ├── api-client/                 Auto-generated API client (do not edit)
│   ├── assets/
│   │   ├── i18n/                   Translation files (en-us, zh-cn, ja-jp)
│   │   ├── images/                 Image assets
│   │   └── styles/                 Global CSS (Tailwind entry)
│   ├── components/
│   │   ├── ui/                     shadcn components + shared business components
│   │   │   ├── data-table          DataTable (TanStack + shadcn Table)
│   │   │   ├── resource-card       Unified resource card layout
│   │   │   ├── resource-list-page  Unified list page layout
│   │   │   ├── tab-layout          Module-level tab navigation
│   │   │   ├── simple-select       Select wrapper component
│   │   │   └── button, input, ...  shadcn base components
│   │   ├── Datacenter/             Datacenter business components
│   │   ├── DashboardCommon/        Dashboard components
│   │   ├── Logic/                  Business logic components (Header, Footer, Tags)
│   │   └── resource/               Resource card components
│   ├── constant/                   Frontend type definitions & constants
│   ├── i18n/                       i18next configuration
│   ├── lib/                        Utility library (cn function)
│   ├── redux/                      State management (slices + store)
│   ├── routes/                     Route configuration
│   ├── utils/                      Utility functions
│   └── views/                      Pages
│       ├── Home/                   Home (datacenter list)
│       ├── Login/                  Login
│       ├── Dashboard/              Dashboard
│       ├── DataCenter/             Datacenter management
│       ├── Resource/               Resource management
│       ├── Account/                Account management
│       └── Event/                  Event log
├── components.json                 shadcn/ui configuration
├── openapi-ts.config.ts            API client generation config
├── tsconfig.json                   TypeScript configuration
├── vite.config.ts                  Vite configuration
└── package.json                    Project dependencies
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and conventions.

## License

This project is licensed under the [Apache License 2.0](LICENSE).
