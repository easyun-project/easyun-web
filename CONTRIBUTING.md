# Contributing to Easyun Web

Thank you for your interest in contributing! This guide covers the development conventions and workflow.

## Getting Started

```bash
npm install
cp envs/.env.example envs/.env.local
npm run dev
```

## Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Make your changes
4. Verify: `npx tsc --noEmit` (zero errors) and `npm run build` (success)
5. Commit following [Conventional Commits](https://www.conventionalcommits.org/)
6. Push and open a Pull Request

### Commit Convention

Use prefixes: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `build:`

```
feat: add volume snapshot management
fix: server list pagination not working
refactor: migrate Dashboard to DataTable
docs: update README tech stack
chore: bump version to 0.4.1
```

## Code Conventions

### API Layer

- **Never edit `src/api-client/`** — run `npm run gen:api` to regenerate
- Use SDK functions from `@/api-client` for all API calls
- Do not write manual fetch/axios requests

### Components

- Add new shadcn components via CLI: `npx shadcn@latest add <component>`
- Component source lives in `src/components/ui/` — you own it, customize freely
- Use shared layouts (`ResourceCard`, `ResourceListPage`, `TabLayout`) for consistent patterns
- Prefer composition over duplication — if 3+ pages share a pattern, extract a shared component

### Styling

- **Layout & spacing**: Tailwind CSS classes
- **Interactive components**: shadcn/ui components
- **Custom utilities**: define in `src/assets/styles/index.css` using `@utility`
- **Custom colors**: define in `@theme` block in `index.css`
- Use `cn()` from `@/lib/utils` for conditional class merging

### State Management

- **Cross-component shared data**: Redux Toolkit (one slice per business module)
- **Component-local state**: `useState` / `useReducer`
- **Only `user` and `app` slices are persisted** — other data is fetched fresh from API
- Use typed dispatch: `useDispatch<AppDispatch>()`

### TypeScript

- API response types: use generated types from `@/api-client/types.gen.ts`
- Frontend-only types: define in `src/constant/`
- Path aliases: `@/` = `src/`, `@@/` = project root
- `as any` is acceptable during migration, but should be reduced over time

### Internationalization

- Translation files: `src/assets/i18n/` (en-us.json, zh-cn.json, ja-jp.json)
- Usage: `const { t } = useTranslation(); t('key.subkey')`
- New text must be added to all three language files

## Pre-commit Checklist

- [ ] `npx tsc --noEmit` — zero TypeScript errors
- [ ] `npm run build` — build succeeds
- [ ] No `from 'antd'` imports (antd has been fully removed)
- [ ] New shared patterns extracted as reusable components
- [ ] Version bumped in `package.json` if applicable

## Project Architecture

See [architecture documentation](.dev/architecture.md) for detailed design decisions (internal, not committed to repo).
