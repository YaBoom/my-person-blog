// src/app/page.tsx
// SSR 模式 - 每次刷新获取 GitHub 最新数据
// 定位：AI Agent 开发工程师 —— 编排 / Tool Calling / MCP / 评测

import { Suspense } from 'react';
import {
  getUserRepos,
  getGitHubUser,
  formatDate,
  getLanguageColor,
  getCurated,
  getProjectTags,
  PROJECT_GROUP_META,
  CURATED_ORDER,
  type GitHubRepo,
  type ProjectGroup,
  type CuratedProject,
} from '@/lib/github';
import { ImageModal } from '@/components/ImageModal';

// 强制动态渲染，每次请求都重新获取数据
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Agent 技术栈配置
const techStack = {
  orchestration: [
    { name: "LangGraph", level: 85, color: "#10B981", icon: "LG" },
    { name: "LangChain4j", level: 88, color: "#0EA5E9", icon: "L4" },
    { name: "Spring AI", level: 82, color: "#6DB33F", icon: "SA" },
    { name: "Dify", level: 80, color: "#8B5CF6", icon: "DF" },
  ],
  protocol: [
    { name: "MCP 协议", level: 90, color: "#10B981", icon: "MC" },
    { name: "Tool Calling", level: 90, color: "#F59E0B", icon: "TC" },
    { name: "Function Calling", level: 88, color: "#3B82F6", icon: "FC" },
    { name: "Prompt 工程", level: 85, color: "#EC4899", icon: "PE" },
  ],
  foundation: [
    { name: "Python / FastAPI", level: 85, color: "#3776AB", icon: "PY" },
    { name: "Java / Spring Boot", level: 92, color: "#007396", icon: "JV" },
    { name: "模型接入", level: 88, color: "#8B5CF6", icon: "ML" },
    { name: "Docker / K8s", level: 80, color: "#2496ED", icon: "Dk" },
  ],
};

// Agent 能力矩阵：逐条对齐 Agent 开发岗的核心职责
const agentCapabilities = [
  {
    icon: "🧭",
    title: "Multi-Agent 编排",
    desc: "LangGraph StateGraph 双角色流水线、共享状态传递、LangSmith 全链路 tracing；生产端落地 LangChain4j Function Calling Agent 与 Dify Chatflow 编排。",
    repo: "mulit-agent-study-zhuyt",
  },
  {
    icon: "🛡️",
    title: "Tool Calling 可靠性",
    desc: "自研 Agent Guardrails：救援解析器修复畸形工具调用 JSON、带引导的智能重试、步骤执行器防死循环、上下文预算防 OOM。8B 模型准确率 53% → 99%。",
    repo: "agent-guardrails-zhuyt",
  },
  {
    icon: "🔌",
    title: "MCP 生态与权限边界",
    desc: "MCP Gateway Lite 统一网关：JWT/API Key 双认证 + RBAC 权限沙箱 + 限流配额 + Prometheus 指标 + 全链路审计；另有多个自写 Tool Schema 的 MCP Server 实践。",
    repo: "mcp-gateway-lite-zhuyt",
  },
  {
    icon: "🧪",
    title: "评测集与回归",
    desc: "26 场景 Agent 基准套件自动跑分；Skills Lab 对照实验（无技能/人工技能/自生成技能）；AI 编程模型横评。用数据说话，不是只接第三方 SDK。",
    repo: "agent-skills-zyt",
  },
  {
    icon: "🧠",
    title: "上下文工程",
    desc: "ContextRoller：以 MCP 工具管理 Claude Code / Cursor 会话上下文；生产 Agent 的语义缓存 + 前缀缓存治理，单次 Input Token 降低 55%。",
    repo: "ContextRoller-zyt",
  },
  {
    icon: "🏭",
    title: "生产级 Agent 落地",
    desc: "豆包大模型商标选标 Agent（意图解析→分类推断→关键词召回→超时降级）、Qwen3-VL 多模态智能填报、Ollama 私有化部署 Function Calling Agent。",
    repo: null,
  },
];

// 统计数据卡片
function StatCard({ number, label, icon }: { number: string; label: string; icon: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
      <div className="mb-2 text-3xl">{icon}</div>
      <div className="text-3xl font-bold text-white">{number}</div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}

// 技术栈进度条
function TechBar({ name, level, color, icon }: { name: string; level: number; color: string; icon: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          <span className="font-medium text-white">{name}</span>
        </div>
        <span className="text-sm text-slate-400">{level}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${level}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// 精选项目卡片（策展数据 + GitHub 实时数据）
function ProjectCard({ name, repo, curated, index }: { name: string; repo?: GitHubRepo; curated: CuratedProject; index: number }) {
  const url = repo?.html_url ?? `https://github.com/YaBoom/${name}`;
  const tags = curated.jdTags;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-emerald-400">
        {name}
      </h3>
      <p className="mb-3 text-sm font-medium text-slate-300">{curated.role}</p>

      <ul className="mb-4 flex-1 space-y-1.5">
        {curated.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-xs leading-relaxed text-slate-400">
            <span className="mt-0.5 text-emerald-500">▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between text-sm text-slate-500">
        <div className="flex items-center gap-4">
          {repo?.language && (
            <span className="flex items-center gap-1">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              {repo.language}
            </span>
          )}
          {repo && <span className="text-xs">持续迭代 · {formatDate(repo.pushed_at)}</span>}
        </div>
        <span className="text-emerald-400 transition-all group-hover:translate-x-2">
          查看项目 →
        </span>
      </div>

      {/* Hover glow effect */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:from-emerald-500/10 group-hover:via-emerald-500/5 group-hover:to-emerald-500/0 group-hover:opacity-100" />
    </a>
  );
}

// 精选项目列表：策展白名单 × GitHub 实时数据，按 JD 相关度分组展示
async function CuratedProjectList() {
  let repos: GitHubRepo[] = [];
  try {
    repos = await getUserRepos();
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
  }
  const repoMap = new Map(repos.map((r) => [r.name, r]));

  const groups: ProjectGroup[] = ['runtime', 'mcp', 'eval'];
  return (
    <div className="space-y-14">
      {groups.map((group) => {
        const items = CURATED_ORDER
          .map((name) => ({ name, curated: getCurated(name)! }))
          .filter(({ curated }) => curated.group === group)
          .map(({ name, curated }) => ({ name, curated, repo: repoMap.get(name) }));

        return (
          <div key={group}>
            <div className="mb-6 flex items-baseline gap-4">
              <h3 className="text-xl font-bold text-white">{PROJECT_GROUP_META[group].title}</h3>
              <p className="text-sm text-slate-500">{PROJECT_GROUP_META[group].desc}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map(({ name, curated, repo }, index) => (
                <ProjectCard
                  key={name}
                  name={name}
                  repo={repo}
                  curated={curated}
                  index={index}
                />
              ))}
            </div>
          </div>
        );
      })}
      <p className="text-center text-xs text-slate-500">
        更新时间实时同步 GitHub · 数据更新时间: {new Date().toLocaleString('zh-CN', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  );
}

// 统计信息组件（异步获取）——只展示有价值信号，不暴露 Star 短板
async function StatsSection() {
  try {
    const [user, repos] = await Promise.all([getGitHubUser(), getUserRepos()]);
    const mcpAgentRepos = repos.filter((r) =>
      /mcp|agent|langgraph|rag|guardrail|skill|loglens|harness|context/i.test(r.name)
    ).length;

    return (
      <div className="grid grid-cols-2 gap-4">
        <StatCard number={`${user.public_repos}`} label="开源仓库" icon="📦" />
        <StatCard number={`${mcpAgentRepos}+`} label="Agent/MCP 实战仓库" icon="🤖" />
        <StatCard number="53→99%" label="护栏实测准确率" icon="🛡️" />
        <StatCard number="7×24" label="Harness 自动回路" icon="🔁" />
      </div>
    );
  } catch (error) {
    // 失败时显示默认数据
    return (
      <div className="grid grid-cols-2 gap-4">
        <StatCard number="30+" label="开源仓库" icon="📦" />
        <StatCard number="10+" label="Agent/MCP 实战仓库" icon="🤖" />
        <StatCard number="53→99%" label="护栏实测准确率" icon="🛡️" />
        <StatCard number="7×24" label="Harness 自动回路" icon="🔁" />
      </div>
    );
  }
}

// 加载骨架屏
function ProjectsSkeleton() {
  return (
    <div className="space-y-14">
      {['runtime', 'mcp', 'eval'].map((g) => (
        <div key={g}>
          <div className="mb-6 h-7 w-64 animate-pulse rounded-lg bg-white/5" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 主页面组件
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f] text-slate-200">
      {/* 渐变光晕背景 */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[150px]" />
        <div className="absolute right-1/4 top-[20%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      {/* 导航栏 */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 text-lg font-bold text-white">
              J
            </div>
            <span className="font-semibold text-white">Jack</span>
          </div>
          <div className="hidden gap-8 text-sm sm:flex">
            <a href="#about" className="transition hover:text-emerald-400">关于</a>
            <a href="#capabilities" className="transition hover:text-emerald-400">Agent 能力</a>
            <a href="#projects" className="transition hover:text-emerald-400">项目</a>
            <a href="#harness" className="transition hover:text-emerald-400">Harness 实战</a>
            <a href="#stack" className="transition hover:text-emerald-400">技术栈</a>
          </div>
          <a
            href="https://github.com/YaBoom"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm transition hover:border-emerald-500/50 hover:bg-emerald-500/10"
          >
            GitHub
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 pt-32">
        {/* Hero Section */}
        <section id="about" className="relative mb-32">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                AI Agent 开发 · Multi-Agent 编排 / Tool Calling / MCP / 评测
              </div>

              <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl">
                构建可靠的
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                  Agent Runtime
                </span>
              </h1>

              <p className="text-lg leading-relaxed text-slate-400">
                你好，我是 <span className="text-emerald-400">Jack</span>，9 年后端工程师，深耕 AI Agent 工程化。
                <br />
                从 LangGraph 多 Agent 编排、自研 Tool Calling 护栏（8B 模型准确率 53%→99%），
                到 MCP 网关与评测回归——不止调 API，把 Agent 做得<b className="text-slate-200">可编排、可护栏、可评测</b>。
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:shadow-xl hover:shadow-emerald-500/40"
                >
                  浏览项目
                </a>
                <a
                  href="https://github.com/YaBoom"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 bg-white/5 px-8 py-3 font-semibold text-white transition hover:border-white/40"
                >
                  GitHub →
                </a>
              </div>
            </div>

            {/* 统计卡片 - SSR 获取 */}
            <Suspense fallback={
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/5" />
                ))}
              </div>
            }>
              <StatsSection />
            </Suspense>
          </div>
        </section>

        {/* Agent 能力矩阵 */}
        <section id="capabilities" className="mb-32">
          <div className="mb-12">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-emerald-400">
              Agent Capability Matrix
            </p>
            <h2 className="text-4xl font-bold text-white">Agent 能力矩阵</h2>
            <p className="mt-2 text-sm text-slate-500">
              编排 · 护栏 · 协议 · 评测 · 上下文 · 生产落地
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agentCapabilities.map((cap) => (
              <div
                key={cap.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/40 hover:bg-white/10"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-2xl">
                  {cap.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-emerald-400">
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">{cap.desc}</p>
                {cap.repo && (
                  <a
                    href={`https://github.com/YaBoom/${cap.repo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs text-emerald-400/80 transition hover:text-emerald-300"
                  >
                    {cap.repo} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 精选项目 - 策展白名单 × GitHub 实时数据 */}
        <section id="projects" className="mb-32">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-emerald-400">
                Featured Projects
              </p>
              <h2 className="text-4xl font-bold text-white">精选项目</h2>
              <p className="mt-2 text-sm text-slate-500">
                按 Agent 工程能力分组策展 · Star 与更新时间实时同步 GitHub
              </p>
            </div>
            <a
              href="https://github.com/YaBoom?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm text-slate-400 transition hover:text-white sm:block"
            >
              查看全部 →
            </a>
          </div>

          <Suspense fallback={<ProjectsSkeleton />}>
            <CuratedProjectList />
          </Suspense>
        </section>

        {/* Agent Harness 实战拆解 */}
        <section id="harness" className="mb-32">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-emerald-400">
              Agent Harness in Practice
            </p>
            <h2 className="text-4xl font-bold text-white">Agent Harness 实战拆解</h2>
            <p className="mt-4 text-slate-400">
              为我的开源项目 LogLens（AI 日志根因分析）搭建的上下文基础设施：
              <br className="hidden sm:block" />
              5 条 Axioms 决策原则 + 4 个 Skills 标准作业手册 + 采集→蒸馏→发布的周期回路
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/YaBoom/loglens-newsletter"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-400 transition hover:bg-emerald-500/20"
              >
                📗 loglens-newsletter（Harness 本体）
              </a>
              <a
                href="https://github.com/YaBoom/loglens-zyt"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm text-slate-300 transition hover:border-white/40"
              >
                🔍 loglens-zyt（AI 日志根因分析）
              </a>
            </div>
          </div>

          {/* 架构分层 */}
          <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-2xl">📏</div>
              <h4 className="mb-2 font-semibold text-white">Axioms 原则库</h4>
              <p className="text-sm text-slate-400">5 条反复验证的判断原则，AI 决策前先查表</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-2xl">📘</div>
              <h4 className="mb-2 font-semibold text-white">Skills 作业手册</h4>
              <p className="text-sm text-slate-400">axiom 管「要不要做」，skill 管「具体怎么做」</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-2xl">🔁</div>
              <h4 className="mb-2 font-semibold text-white">周期回路</h4>
              <p className="text-sm text-slate-400">collect → distill → publish，周级 Loop Engineering</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-rose-500/10 to-transparent p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/20 text-2xl">🧠</div>
              <h4 className="mb-2 font-semibold text-white">L1/L2 分层记忆</h4>
              <p className="text-sm text-slate-400">L1 滚动 7 天观察 + L2 按周完整归档</p>
            </div>
          </div>

          {/* 核心代码细节截图 */}
          <div className="space-y-10">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">① 蒸馏回路核心：采集 → 压缩 → L1/L2 落盘</h3>
              <p className="mb-4 text-sm text-slate-500">
                过去 7 天 daily 数据自动收集，单文件 8K / 全量 50K 字符截断防 token 爆炸，蒸馏结果双写滚动记忆与周报归档
              </p>
              <ImageModal src="/harness-shots/loop-core.png" alt="蒸馏回路核心代码" />
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">② Prompt 即契约：结构化输出约束</h3>
              <p className="mb-4 text-sm text-slate-500">
                每个输出段都有数量与格式约束（≤30 字、必须带 commit hash、找不到不许硬凑），把 Bad Case 挡在 Prompt 层
              </p>
              <ImageModal src="/harness-shots/prompt-contract.png" alt="结构化 Prompt 契约" />
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">③ 模型路由与成本治理</h3>
              <p className="mb-4 text-sm text-slate-500">
                axiom a03-deepseek-first：默认低成本模型，temperature 0.3 保证蒸馏输出稳定——模型是路由决策，不是默认选项
              </p>
              <ImageModal src="/harness-shots/model-route.png" alt="模型路由代码" />
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">④ Skill 蒸馏：经验沉淀的晋升机制</h3>
              <p className="mb-4 text-sm text-slate-500">
                反复出现的判断自动收集证据，出现 ≥ 3 次才晋升为 axiom 候选——用数据驱动，不拍脑袋
              </p>
              <ImageModal src="/harness-shots/skill-distill.png" alt="Skill 蒸馏晋升机制" />
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <p className="text-sm leading-relaxed text-slate-300">
              💡 这套 Harness 的价值不在单点代码，而在<b className="text-white">「回路」</b>：
              每周自动蒸馏出「做了什么 / 学到什么 / 哪里栽了」，再反哺下一轮开发决策——
              这正是 Agent 开发里 Harness / Loop Engineering 的落地方式。
            </p>
          </div>
        </section>

        {/* 技术栈展示 */}
        <section id="stack" className="mb-32">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-emerald-400">
              Tech Stack
            </p>
            <h2 className="text-4xl font-bold text-white">Agent 技术栈</h2>
            <p className="mt-4 text-slate-400">
              编排框架 × 协议与工具 × 工程底座，9 年后端功底托底
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">编排框架</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {techStack.orchestration.map((tech) => (
                  <TechBar key={tech.name} {...tech} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">协议与工具</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {techStack.protocol.map((tech) => (
                  <TechBar key={tech.name} {...tech} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">工程底座</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {techStack.foundation.map((tech) => (
                  <TechBar key={tech.name} {...tech} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
              <div className="mb-3 text-2xl">🔬</div>
              <h4 className="mb-2 font-semibold text-white">Demo 先行</h4>
              <p className="text-sm text-slate-400">每个概念都落到可运行的仓库：可单测、可复现、可跑分</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent p-6">
              <div className="mb-3 text-2xl">📏</div>
              <h4 className="mb-2 font-semibold text-white">用数据说话</h4>
              <p className="text-sm text-slate-400">53%→99% 的护栏准确率、-55% 的 Token 成本，评测驱动迭代</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent p-6">
              <div className="mb-3 text-2xl">⚡</div>
              <h4 className="mb-2 font-semibold text-white">Vibe Coding 深度用户</h4>
              <p className="text-sm text-slate-400">Cursor / Claude Code 重度实践，AI 辅助研发工作流工具化</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-32">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-600/20 via-blue-600/20 to-purple-600/20 p-12 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold text-white">一起构建可靠的 Agent</h2>
              <p className="mb-8 text-slate-400">
                对 Multi-Agent 编排、MCP 生态或 Agent 评测感兴趣？欢迎交流
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/YaBoom"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-8 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  GitHub 主页
                </a>
                <a
                  href="https://www.zylab.asia"
                  className="rounded-full border border-white/20 bg-white/5 px-8 py-3 font-semibold text-white transition hover:border-white/40"
                >
                  技术博客 →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
          <p>© 2026 Jack · 构建可靠的 Agent Runtime</p>
          <p className="mt-1">实时同步 GitHub 数据 · SSR 渲染</p>
        </footer>
      </main>
    </div>
  );
}
