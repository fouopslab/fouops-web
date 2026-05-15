# FouOpsLab Web

[English](./README.md) | 简体中文

FouOpsLab 的官网项目，基于 Next.js App Router、React 19、Tailwind CSS 4 和 MDX 构建。

当前仓库包含一个双语营销官网，以及两个由 Resend 驱动的交互流程：

- 联系表单邮件发送
- 候补名单确认邮件发送

## 项目内容

- 英文与简体中文的多语言路由：`/en` 和 `/zh-CN`
- 由 `components/home` 组合而成的营销首页
- 基于 `lib/products.ts` 的产品详情页
- 基于 `content/blog` 本地 MDX 文件的博客系统
- 带有简单内存冷却限制的 contact / waitlist API
- 基于站点配置生成的 SEO metadata、`robots.txt` 和 `sitemap.xml`
- 适合容器或 VPS 部署的 Next.js standalone 输出

## 技术栈

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- MDX
- Resend

## 目录结构

```text
app/                 App Router 页面、API 路由、metadata、语言布局
components/          UI 组件、布局组件、联系表单、首页模块
content/blog/        MDX 博客文章
dictionaries/        英文与简体中文文案字典
lib/                 博客读取、i18n、产品数据、站点配置
public/              静态资源
types/               共享 TypeScript 类型
```

## 本地运行

### 前置要求

- Node.js 20+
- pnpm

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

复制示例文件后再填写你自己的配置：

```bash
cp .env.example .env
```

必要变量如下：

| 变量名 | 是否必填 | 作用 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_NAME` | 是 | 站点名称，用于 metadata 和邮件文案 |
| `NEXT_PUBLIC_SITE_URL` | 是 | 站点 canonical URL，用于 metadata、sitemap 和 robots |
| `CONTACT_EMAIL` | 是 | 联系页展示的邮箱，同时作为联系表单收件邮箱 |
| `CONTACT_EMAIL_FROM` | 是 | 联系表单邮件的发件人身份 |
| `WAITLIST_EMAIL_FROM` | 是 | 候补名单确认邮件的发件人身份 |
| `WAITLIST_REPLY_TO` | 是 | 候补名单邮件的 reply-to 地址 |
| `RESEND_API_KEY` | 是 | Resend 集成所需 API Key |

如果没有配置 `RESEND_API_KEY`，`/api/contact` 和 `/api/waitlist` 都会返回服务未配置错误。

### 启动开发服务器

```bash
pnpm dev
```

默认访问地址是 [http://localhost:3000](http://localhost:3000)。

## 可用脚本

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## 内容维护

### 博客

在 `content/blog/*.mdx` 下新增文章，frontmatter 结构需要与 `types/blog.ts` 保持一致。

### 产品内容

产品详情内容维护在 `lib/products.ts`。

### 多语言文案

界面文案维护在：

- `dictionaries/en.json`
- `dictionaries/zh-CN.json`

## 邮件流程

### 联系表单

- 前端表单：`components/contact/ContactForm.tsx`
- API 路由：`app/api/contact/route.ts`
- 行为：校验输入，对同一邮箱做 60 秒冷却限制，然后通过 Resend 转发到联系邮箱

### 候补名单

- 前端表单：`components/home/WaitlistSection.tsx`
- API 路由：`app/api/waitlist/route.ts`
- 行为：校验输入，对同一邮箱做 60 秒冷却限制，然后通过 Resend 发送确认邮件

