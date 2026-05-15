export interface ProductDetail {
  slug: string;
  name: string;
  nameZh: string;
  tagline: string;
  taglineZh: string;
  status: string;
  githubUrl?: string;
  problem: {
    headline: string;
    headlineZh: string;
    body: string;
    bodyZh: string;
    points: { title: string; titleZh: string; body: string; bodyZh: string }[];
  };
  solution: {
    headline: string;
    headlineZh: string;
    body: string;
    bodyZh: string;
  };
  included: { item: string; itemZh: string }[];
  howItWorks: { step: string; title: string; titleZh: string; body: string; bodyZh: string }[];
  coreFeatures: { feature: string; featureZh: string }[];
  proFeatures: { feature: string; featureZh: string }[];
  comparison: {
    alternatives: string[];
    alternativesZh: string[];
    rows: { feature: string; featureZh: string; thisProduct: boolean; alternatives: boolean[] }[];
  };
  pricing: {
    core: { price: string; label: string; labelZh: string; items: string[]; itemsZh: string[] };
    pro: { price: string; label: string; labelZh: string; items: string[]; itemsZh: string[] };
  };
  faq: { q: string; qZh: string; a: string; aZh: string }[];
}

const dockerComposeStack: ProductDetail = {
  slug: "docker-compose-stack",
  name: "Docker Compose Production Stack",
  nameZh: "Docker Compose 生产环境套件",
  tagline: "Everything you need to run a production workload on a single VPS. SSL, monitoring, backups, and alerts — configured and running in under 30 minutes.",
  taglineZh: "在单台 VPS 上运行生产工作负载所需的一切。SSL、监控、备份和告警——30 分钟内配置就绪。",
  status: "Building",
  githubUrl: "https://github.com/fouopslab/docker-compose-production-stack-core",
  problem: {
    headline: "Production infra from scratch takes days. Every time.",
    headlineZh: "从头搭建生产基础设施每次都要花费数天。",
    body: "You've shipped a product. Now you need it to actually run in production — with SSL, reverse proxy, health checks, monitoring, and backups. None of this is your product. All of it takes time.",
    bodyZh: "你已经发布了产品。现在你需要它在生产环境中真正运行——包括 SSL、反向代理、健康检查、监控和备份。这些都不是你的产品，却都需要时间。",
    points: [
      {
        title: "SSL setup is manual and error-prone",
        titleZh: "SSL 配置手动且容易出错",
        body: "Certbot, renewal crons, Traefik label configuration — it's 2–3 hours of work that needs to be redone every time you start a new project.",
        bodyZh: "Certbot、续签 cron、Traefik 标签配置——每次启动新项目都需要 2-3 小时重复工作。",
      },
      {
        title: "Monitoring is always 'I'll add it later'",
        titleZh: "监控总是'以后再加'",
        body: "Prometheus scraping, Grafana dashboards, Alertmanager rules — standing this up properly from scratch is a 2-day project.",
        bodyZh: "Prometheus 采集、Grafana 仪表板、Alertmanager 规则——从头正确搭建这些需要 2 天时间。",
      },
      {
        title: "Backups are easy to skip and hard to recover from",
        titleZh: "备份容易被跳过，恢复却很困难",
        body: "PostgreSQL dump crons, volume snapshots, offsite storage — this is 4 hours of work that most projects skip until data loss happens.",
        bodyZh: "PostgreSQL dump cron、数据卷快照、异地存储——大多数项目在数据丢失之前会跳过这 4 小时的工作。",
      },
    ],
  },
  solution: {
    headline: "A production-hardened docker-compose.yml you can actually deploy.",
    headlineZh: "一个真正可部署的生产加固版 docker-compose.yml。",
    body: "Run install.sh on a fresh Ubuntu VPS and get SSL, monitoring, backups, and Telegram alerts running in under 30 minutes. The entire stack is standard Docker Compose — no proprietary tooling, no lock-in.",
    bodyZh: "在全新的 Ubuntu VPS 上运行 install.sh，30 分钟内启动 SSL、监控、备份和 Telegram 告警。整个栈都是标准 Docker Compose——无专有工具，无供应商锁定。",
  },
  included: [
    { item: "docker-compose.yml (production-hardened, multi-service)", itemZh: "docker-compose.yml（生产加固版，多服务）" },
    { item: "Traefik reverse proxy config + Let's Encrypt", itemZh: "Traefik 反向代理配置 + Let's Encrypt" },
    { item: "Prometheus + Grafana monitoring stack", itemZh: "Prometheus + Grafana 监控栈" },
    { item: "Alertmanager + Telegram notification setup", itemZh: "Alertmanager + Telegram 通知配置" },
    { item: "PostgreSQL automated backup scripts + S3 upload", itemZh: "PostgreSQL 自动备份脚本 + S3 上传" },
    { item: "install.sh bootstrap (Docker install, firewall, systemd)", itemZh: "install.sh 引导脚本（Docker 安装、防火墙、systemd）" },
    { item: ".env.example with all required variables documented", itemZh: ".env.example 包含所有必需变量说明" },
    { item: "README with deployment walkthrough", itemZh: "README 包含部署详解" },
  ],
  howItWorks: [
    {
      step: "01",
      title: "Provision a VPS",
      titleZh: "准备一台 VPS",
      body: "Ubuntu 22.04, minimum 2 vCPU / 4GB RAM. Any provider works: Hetzner, DigitalOcean, Vultr, Linode.",
      bodyZh: "Ubuntu 22.04，最低 2 vCPU / 4GB RAM。任意服务商均可：Hetzner、DigitalOcean、Vultr、Linode。",
    },
    {
      step: "02",
      title: "Clone and configure",
      titleZh: "克隆并配置",
      body: "git clone the repo, copy .env.example to .env, fill in your domain, DB credentials, and Telegram bot token.",
      bodyZh: "git clone 仓库，将 .env.example 复制为 .env，填入你的域名、数据库凭证和 Telegram bot token。",
    },
    {
      step: "03",
      title: "Run install.sh",
      titleZh: "运行 install.sh",
      body: "The bootstrap script installs Docker, configures UFW firewall rules, sets up systemd for auto-restart, then runs docker compose up.",
      bodyZh: "引导脚本安装 Docker、配置 UFW 防火墙规则、设置 systemd 自动重启，然后运行 docker compose up。",
    },
    {
      step: "04",
      title: "Production ready",
      titleZh: "生产就绪",
      body: "Traefik issues SSL certs automatically. Prometheus starts scraping. Backups are scheduled. Telegram fires a 'stack deployed' notification.",
      bodyZh: "Traefik 自动签发 SSL 证书。Prometheus 开始采集。备份已计划。Telegram 发送'栈已部署'通知。",
    },
  ],
  coreFeatures: [
    { feature: "Traefik reverse proxy with automatic SSL (Let's Encrypt)", featureZh: "Traefik 反向代理，自动 SSL（Let's Encrypt）" },
    { feature: "Health checks and restart policies on all services", featureZh: "所有服务的健康检查和重启策略" },
    { feature: "Prometheus metrics scraping (node, container, DB)", featureZh: "Prometheus 指标采集（节点、容器、数据库）" },
    { feature: "Grafana dashboards for infra overview", featureZh: "基础设施概览的 Grafana 仪表板" },
    { feature: "Alertmanager with Telegram integration", featureZh: "集成 Telegram 的 Alertmanager" },
    { feature: "Daily PostgreSQL dump + local retention", featureZh: "每日 PostgreSQL 备份 + 本地保留" },
    { feature: "Environment variable management", featureZh: "环境变量管理" },
    { feature: "install.sh bootstrap script", featureZh: "install.sh 引导脚本" },
  ],
  proFeatures: [
    { feature: "Hardened security configs (fail2ban, SSH lockdown)", featureZh: "加固安全配置（fail2ban、SSH 锁定）" },
    { feature: "Off-site S3 backup upload + rotation", featureZh: "异地 S3 备份上传 + 轮转" },
    { feature: "Extended Grafana dashboards (per-service metrics)", featureZh: "扩展 Grafana 仪表板（每服务指标）" },
    { feature: "Loki log aggregation + Grafana log viewer", featureZh: "Loki 日志聚合 + Grafana 日志查看器" },
    { feature: "Uptime Kuma service uptime monitoring", featureZh: "Uptime Kuma 服务可用性监控" },
    { feature: "Multi-environment support (staging + prod)", featureZh: "多环境支持（测试 + 生产）" },
    { feature: "Priority updates as the stack evolves", featureZh: "栈演进时的优先更新" },
  ],
  comparison: {
    alternatives: ["Build from scratch", "Coolify/Portainer", "Render/Railway"],
    alternativesZh: ["从零搭建", "Coolify / Portainer", "Render / Railway"],
    rows: [
      { feature: "Production-ready out of the box", featureZh: "开箱即用生产就绪", thisProduct: true, alternatives: [false, false, true] },
      { feature: "Self-hostable, no lock-in", featureZh: "可自托管，无锁定", thisProduct: true, alternatives: [true, true, false] },
      { feature: "Monitoring + alerts included", featureZh: "包含监控和告警", thisProduct: true, alternatives: [false, false, false] },
      { feature: "Automated backups included", featureZh: "包含自动备份", thisProduct: true, alternatives: [false, false, true] },
      { feature: "Full source code ownership", featureZh: "完整源码所有权", thisProduct: true, alternatives: [true, true, false] },
      { feature: "One-time cost", featureZh: "一次性付费", thisProduct: true, alternatives: [true, true, false] },
    ],
  },
  pricing: {
    core: {
      price: "Free",
      label: "Core",
      labelZh: "核心版",
      items: [
        "Full docker-compose.yml stack",
        "Traefik + SSL config",
        "Basic Prometheus + Grafana",
        "Alertmanager + Telegram",
        "PostgreSQL daily backups (local)",
        "install.sh bootstrap",
      ],
      itemsZh: [
        "完整 docker-compose.yml 栈",
        "Traefik + SSL 配置",
        "基础 Prometheus + Grafana",
        "Alertmanager + Telegram",
        "PostgreSQL 每日备份（本地）",
        "install.sh 引导脚本",
      ],
    },
    pro: {
      price: "$49",
      label: "Pro (one-time)",
      labelZh: "Pro 版（一次性）",
      items: [
        "Everything in Core",
        "Hardened security configs",
        "S3 off-site backup + rotation",
        "Extended Grafana dashboards",
        "Loki log aggregation",
        "Uptime monitoring",
        "Multi-env support",
        "Priority updates",
      ],
      itemsZh: [
        "核心版所有功能",
        "加固安全配置",
        "S3 异地备份 + 轮转",
        "扩展 Grafana 仪表板",
        "Loki 日志聚合",
        "可用性监控",
        "多环境支持",
        "优先更新",
      ],
    },
  },
  faq: [
    {
      q: "What VPS providers does this work with?",
      qZh: "支持哪些 VPS 服务商？",
      a: "Any Ubuntu 22.04 VPS. Tested on Hetzner, DigitalOcean, and Vultr. The install.sh script handles provider-specific differences.",
      aZh: "任意 Ubuntu 22.04 VPS，已在 Hetzner、DigitalOcean 和 Vultr 上测试过。install.sh 脚本处理服务商特定差异。",
    },
    {
      q: "Do I need to know Docker to use this?",
      qZh: "使用这个需要了解 Docker 吗？",
      a: "Basic Docker Compose familiarity helps, but the README walks through every step. If you can run a command in a terminal, you can deploy this stack.",
      aZh: "了解基础 Docker Compose 会有帮助，但 README 会详细说明每个步骤。如果你能在终端运行命令，就能部署这个栈。",
    },
    {
      q: "Can I add my own services?",
      qZh: "可以添加自己的服务吗？",
      a: "Yes — the stack is standard Docker Compose. Add new services following the same pattern as the existing ones. Traefik picks them up automatically via labels.",
      aZh: "可以——该栈是标准 Docker Compose。按照现有服务的模式添加新服务，Traefik 会通过标签自动识别。",
    },
    {
      q: "What's the difference between Core (free) and Pro?",
      qZh: "核心版（免费）和 Pro 版有什么区别？",
      a: "Core is everything you need to get a production system running. Pro adds hardened security, off-site backups, extended monitoring, and log aggregation — useful when you need the extra layer.",
      aZh: "核心版包含运行生产系统所需的一切。Pro 版增加了加固安全配置、异地备份、扩展监控和日志聚合——在需要额外保障时非常有用。",
    },
    {
      q: "Is this a subscription?",
      qZh: "这是订阅制吗？",
      a: "No. One-time purchase. You get all current files plus updates while the stack is in active development.",
      aZh: "不是，一次性购买。你可以获得所有当前文件以及栈在积极开发期间的更新。",
    },
  ],
};

export const productDetails: Record<string, ProductDetail> = {
  "docker-compose-stack": dockerComposeStack,
};

export function getProductDetail(slug: string): ProductDetail | null {
  return productDetails[slug] ?? null;
}
