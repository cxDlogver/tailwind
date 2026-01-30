# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

## ESLint + 保存自动修复（含 Prettier / Tailwind）配置笔记

这份笔记记录本项目当前的代码规范工具链：

- ESLint：使用 Nuxt 官方 `@nuxt/eslint`（ESLint Flat Config），并支持 `--fix`
- 保存自动修复：VS Code 保存时触发 ESLint `fixAll`
- Prettier：用于格式化；并启用 `prettier-plugin-tailwindcss` 自动排序 Tailwind class

### 1) 安装依赖

本项目的相关依赖在 `devDependencies`：

- `@nuxt/eslint`：Nuxt 官方 ESLint 集成
- `eslint`：ESLint 9（Flat Config）
- `eslint-config-prettier`：关闭与 Prettier 冲突的 ESLint 格式类规则
- `prettier` + `prettier-plugin-tailwindcss`：格式化与 Tailwind class 排序

如需从零安装，可执行：

```bash
pnpm add -D @nuxt/eslint eslint eslint-config-prettier
pnpm add -D prettier prettier-plugin-tailwindcss
```

### 2) 在 Nuxt 中启用 `@nuxt/eslint`

在 [nuxt.config.ts](nuxt.config.ts) 启用模块并让它生成符合项目结构的 ESLint 配置：

```ts
export default defineNuxtConfig({
	modules: ['@nuxt/eslint'],
	eslint: {
		config: {
			stylistic: true,
			typescript: true,
		},
	},
})
```

关键点：

- `@nuxt/eslint` 会在 `.nuxt/` 下生成一份可复用的 Flat Config（供根配置引用）
- `stylistic/typescript` 会开启 Nuxt ESLint Config 的相关能力

生成/刷新 `.nuxt` 产物：

```bash
pnpm exec nuxt prepare
```

### 3) 根目录 ESLint Flat Config：`eslint.config.mjs`

根配置位于 [eslint.config.mjs](eslint.config.mjs)，做了两件事：

1. 引用 Nuxt 生成的配置（`.nuxt/eslint.config.mjs`）
2. 追加 `eslint-config-prettier`，避免 ESLint 与 Prettier “抢格式化规则”

当前内容：

```js
import eslintConfigPrettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(eslintConfigPrettier)
```

### 4) 命令行脚本：lint / 自动修复

在 [package.json](package.json) 已添加：

```json
{
	"scripts": {
		"lint": "eslint .",
		"lint:fix": "eslint . --fix"
	}
}
```

常用：

```bash
pnpm run lint
pnpm run lint:fix
```

### 5) VS Code：保存自动矫正（ESLint Fix All）

在 [.vscode/settings.json](.vscode/settings.json) 配置保存时自动修复：

```jsonc
{
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "always"
	},
	"eslint.useFlatConfig": true,
	"eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"]
}
```

说明：

- `source.fixAll.eslint`：保存触发 ESLint 的 `--fix`（等价于“自动修复可修复规则”）
- `eslint.useFlatConfig: true`：确保 VS Code ESLint 扩展按 Flat Config 模式工作

建议安装 VS Code 扩展（见 [.vscode/extensions.json](.vscode/extensions.json)）：

- `dbaeumer.vscode-eslint`
- `esbenp.prettier-vscode`

### 6) Prettier + Tailwind class 排序

Prettier 配置在 [.prettierrc.json](.prettierrc.json)：

```json
{
	"plugins": ["prettier-plugin-tailwindcss"],
	"singleQuote": true,
	"semi": false
}
```

这会让 Prettier 在格式化时自动排序 Tailwind class（可读性更好、diff 更稳定）。

### 7) 常见问题排查

1) 保存没自动修复？

- 确认装了 `dbaeumer.vscode-eslint`
- VS Code 命令面板执行 `Developer: Reload Window`
- 确认工作区 settings 生效（不是被用户级 settings 覆盖）

2) ESLint 找不到 `.nuxt/eslint.config.mjs`？

- 先运行 `pnpm exec nuxt prepare`
- 如果你刚切分支/删除 `.nuxt`，需要重新 prepare

3) ESLint 与 Prettier 打架（格式来回变化）？

- 确认根配置已追加 `eslint-config-prettier`
- 如果你更希望“只用 ESLint 负责格式化”，需要改成安装并启用 `eslint-plugin-format`（本项目当前未启用）
