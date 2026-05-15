import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.products.metaTitle,
    description: dict.products.metaDescription,
  };
}

type ProductStatus = "Building" | "Planned" | "Beta" | "Released";

interface Product {
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  status: ProductStatus;
  techStack: string[];
  features: string[];
  featuresZh: string[];
  slug: string;
}

interface Stage {
  id: number;
  products: Product[];
}

const stages: Stage[] = [
  {
    id: 1,
    products: [
      {
        name: "Docker Compose Production Stack",
        nameZh: "Docker Compose 生产环境套件",
        description:
          "A battle-tested Docker Compose setup for production workloads on a single VPS. Traefik SSL, monitoring, backups, Telegram alerts.",
        descriptionZh:
          "在单台 VPS 上运行生产工作负载的 Docker Compose 配置。包含 Traefik SSL、监控、备份和 Telegram 告警。",
        status: "Building",
        techStack: ["Docker", "Traefik", "Prometheus", "Grafana", "Telegram"],
        features: [
          "Traefik + Let's Encrypt SSL",
          "Prometheus + Grafana monitoring",
          "Automated database backups",
          "Telegram deployment alerts",
          "Health checks + auto-restart",
          "install.sh bootstrap",
        ],
        featuresZh: [
          "Traefik + Let's Encrypt SSL",
          "Prometheus + Grafana 监控",
          "自动化数据库备份",
          "Telegram 部署告警",
          "健康检查 + 自动重启",
          "install.sh 引导脚本",
        ],
        slug: "docker-compose-stack",
      },
      {
        name: "SaaS Starter Kit",
        nameZh: "SaaS 启动套件",
        description:
          "Full-stack SaaS template with auth, billing, and team management. Skip the boilerplate.",
        descriptionZh:
          "包含认证、计费和团队管理的全栈 SaaS 模板，跳过重复造轮子。",
        status: "Planned",
        techStack: ["Next.js", "PostgreSQL", "Stripe"],
        features: [
          "Authentication (email + OAuth)",
          "Subscription billing via Stripe",
          "Team & workspace management",
          "Admin dashboard",
        ],
        featuresZh: [
          "认证（邮箱 + OAuth）",
          "通过 Stripe 订阅计费",
          "团队与工作空间管理",
          "管理后台",
        ],
        slug: "saas-starter-kit",
      },
      {
        name: "AI Agent Starter Kit",
        nameZh: "AI Agent 启动套件",
        description:
          "Production foundation for building and shipping AI agents. Tool use, memory, and observability included.",
        descriptionZh:
          "构建和发布 AI Agent 的生产就绪基础，包含工具调用、记忆和可观测性。",
        status: "Planned",
        techStack: ["Python", "FastAPI", "OpenAI", "MCP"],
        features: [
          "Tool/function calling framework",
          "Persistent agent memory",
          "Rate limiting + cost tracking",
          "Observability and tracing",
        ],
        featuresZh: [
          "工具/函数调用框架",
          "持久化 Agent 记忆",
          "速率限制 + 成本追踪",
          "可观测性与链路追踪",
        ],
        slug: "ai-agent-starter",
      },
    ],
  },
  {
    id: 2,
    products: [
      {
        name: "Telegram DevOps Bot Kit",
        nameZh: "Telegram DevOps Bot Kit",
        description:
          "Manage containers and get deployment alerts without SSH. Control servers directly from Telegram.",
        descriptionZh:
          "无需 SSH 即可管理容器并接收部署告警，直接通过 Telegram 控制服务器。",
        status: "Planned",
        techStack: ["Go", "Telegram Bot API", "Docker API"],
        features: [
          "Container start/stop/restart",
          "Real-time deployment alerts",
          "Log streaming to Telegram",
          "Multi-server support",
        ],
        featuresZh: [
          "容器启动/停止/重启",
          "实时部署告警",
          "日志流式推送到 Telegram",
          "多服务器支持",
        ],
        slug: "telegram-devops-bot",
      },
      {
        name: "Production Monitoring Bundle",
        nameZh: "生产监控套件",
        description:
          "Prometheus + Grafana + Alertmanager preconfigured in under 10 minutes. Dashboards and alert rules included.",
        descriptionZh:
          "预配置的 Prometheus + Grafana + Alertmanager，10 分钟内启动，包含仪表板和告警规则。",
        status: "Planned",
        techStack: ["Prometheus", "Grafana", "Alertmanager"],
        features: [
          "Pre-built Grafana dashboards",
          "Alertmanager + Telegram",
          "Docker + DB metrics",
          "One-command install",
        ],
        featuresZh: [
          "预置 Grafana 仪表板",
          "Alertmanager + Telegram",
          "Docker + 数据库指标",
          "一键安装",
        ],
        slug: "monitoring-bundle",
      },
      {
        name: "Founder Infra Bundle",
        nameZh: "创始人基础设施套件",
        description:
          "Everything you need to run production on a single VPS. Deploy, monitor, alert, and scale.",
        descriptionZh:
          "在单台 VPS 上运行生产系统所需的一切：部署、监控、告警和扩展。",
        status: "Planned",
        techStack: ["Docker", "Prometheus", "Traefik", "Telegram"],
        features: [
          "All infra tools bundled",
          "Unified configuration",
          "Terraform provisioning",
          "Runbook documentation",
        ],
        featuresZh: [
          "所有基础设施工具打包",
          "统一配置",
          "Terraform 资源供应",
          "运维手册文档",
        ],
        slug: "founder-infra-bundle",
      },
    ],
  },
];

const statusColors: Record<string, string> = {
  Building: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Planned: "bg-muted/50 text-muted-foreground border-border/60",
  Beta: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Released: "bg-green-500/10 text-green-400 border-green-500/20",
};

const stageAccent: Record<number, string> = {
  1: "text-green-400",
  2: "text-blue-400",
  3: "text-purple-400",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const t = dict.products;
  const isZh = locale === "zh-CN";
  const statusLabels: Record<string, string> = {
    Building: t.statusBuilding,
    Planned: t.statusPlanned,
    Beta: t.statusBeta,
    Released: t.statusReleased,
  };

  const stageLabels = [
    { label: t.stage1_label, title: t.stage1_title, subtitle: t.stage1_subtitle },
    { label: t.stage2_label, title: t.stage2_title, subtitle: t.stage2_subtitle },
  ];

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
            {t.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t.headline}
          </h1>
          <p className="text-muted-foreground leading-relaxed">{t.subheadline}</p>
        </div>

        {/* Stages */}
        <div className="space-y-20">
          {stages.map((stage, stageIndex) => (
            <div key={stage.id}>
              {/* Stage header */}
              <div className="flex items-center gap-3 mb-2">
                <span className={`font-mono text-xs ${stageAccent[stage.id]} uppercase tracking-wider`}>
                  {stageLabels[stageIndex].label}
                </span>
                <span className="flex-1 h-px bg-border/40" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">
                {stageLabels[stageIndex].title}
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                {stageLabels[stageIndex].subtitle}
              </p>

              {/* Products grid */}
              <div className="grid md:grid-cols-3 gap-5">
                {stage.products.map((product) => (
                  <div
                    key={product.slug}
                    className="rounded-lg border border-border/40 bg-card/20 p-5 hover:border-border/60 transition-colors flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-sm font-semibold text-foreground leading-snug">
                        {isZh ? product.nameZh : product.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`shrink-0 text-xs ${statusColors[product.status]}`}
                      >
                        {statusLabels[product.status] ?? product.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                      {isZh ? product.descriptionZh : product.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 rounded text-xs font-mono bg-muted/40 text-muted-foreground border border-border/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-1.5 mb-4">
                      {(isZh ? product.featuresZh : product.features)
                        .slice(0, 4)
                        .map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="text-green-400 flex-shrink-0">✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      {product.features.length > 4 && (
                        <p className="text-xs text-muted-foreground/40 pl-4">
                          +{product.features.length - 4}{" "}
                          {t.moreFeatures.replace("{count}", String(product.features.length - 4)).replace(/^\+\d+\s/, "")}
                        </p>
                      )}
                    </div>

                    {product.status === "Building" && (
                      <a
                        href={`/${locale}/products/${product.slug}`}
                        className="text-xs font-medium text-foreground hover:text-foreground/80 transition-colors"
                      >
                        {t.viewDetails}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Stage 3 placeholder */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-purple-400 uppercase tracking-wider">
                {t.stage3_label}
              </span>
              <span className="flex-1 h-px bg-border/40" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">
              {t.stage3_title}
            </h2>
            <p className="text-sm text-muted-foreground mb-8">{t.stage3_subtitle}</p>
            <div className="rounded-lg border border-dashed border-border/40 p-8 text-center">
              <p className="text-sm text-muted-foreground">{t.stage3_coming}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
