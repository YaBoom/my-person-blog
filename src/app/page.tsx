// src/app/page.tsx
// SSR 模式 - 每次刷新获取 GitHub 最新数据

import { Suspense } from 'react';
import {
  getUserRepos,
  getGitHubUser,
  formatDate,
  getLanguageColor,
  getProjectTags,
  getProjectDescription,
  isNewProject,
  isHighlightedProject,
  GitHubRepo,
} from '@/lib/github';

// 强制动态渲染，每次请求都重新获取数据
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// 技术栈配置（保持不变）
const techStack = {
  languages: [
    { name: "TypeScript", level: 90, color: "#3178C6", icon: "TS" },
    { name: "Python", level: 85, color: "#3776AB", icon: "PY" },
    { name: "Java", level: 80, color: "#007396", icon: "JV" },
    { name: "Go", level: 60, color: "#00ADD8", icon: "GO" },
  ],
  frameworks: [
    { name: "Next.js", level: 88, color: "#000000", icon: "Nx" },
    { name: "React", level: 85, color: "#61DAFB", icon: "Re" },
    { name: "SpringBoot", level: 82, color: "#6DB33F", icon: "SB" },
    { name: "MCP", level: 75, color: "#10B981", icon: "MC" },
  ],
  tools: [
    { name: "AI 工具探索", level: 90, color: "#8B5CF6", icon: "AI" },
    { name: "Node.js", level: 85, color: "#339933", icon: "Nd" },
    { name: "Tailwind", level: 88, color: "#06B6D4", icon: "Tw" },
    { name: "Docker", level: 70, color: "#2496ED", icon: "Dk" },
  ],
};

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

// 项目卡片
function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const tags = getProjectTags(repo);
  const description = getProjectDescription(repo);
  const isNew = isNewProject(repo);
  const isHighlight = isHighlightedProject(repo);
  const languageColor = getLanguageColor(repo.language);
  
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* NEW 标签 */}
      {(isNew || isHighlight) && (
        <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-pink-500 to-rose-500 px-12 py-1 text-xs font-bold text-white shadow-lg">
          {isHighlight ? 'HOT' : 'NEW'}
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-slate-500">{formatDate(repo.pushed_at)}</span>
      </div>

      <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-emerald-400">
        {repo.name}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-slate-400">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-slate-500">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: languageColor }}
              />
              {repo.language}
            </span>
          )}
          <span>⭐ {repo.stargazers_count}</span>
        </div>
        <span className="text-sm text-emerald-400 transition-all group-hover:translate-x-2">
          查看项目 →
        </span>
      </div>

      {/* Hover glow effect */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:from-emerald-500/10 group-hover:via-emerald-500/5 group-hover:to-emerald-500/0 group-hover:opacity-100" />
    </a>
  );
}

// 项目列表组件（异步获取数据）
async function ProjectList() {
  try {
    const repos = await getUserRepos();
    const featuredRepos = repos.slice(0, 6); // 取前6个最新项目

    return (
      <>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredRepos.map((repo, index) => (
            <ProjectCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">
          数据更新时间: {new Date().toLocaleString('zh-CN', { 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          })}
        </p>
      </>
    );
  } catch (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <div className="mb-4 text-4xl">⚠️</div>
        <h3 className="mb-2 text-lg font-semibold text-red-400">获取 GitHub 数据失败</h3>
        <p className="text-slate-400">请检查网络连接或稍后重试</p>
      </div>
    );
  }
}

// 统计信息组件（异步获取）
async function StatsSection() {
  try {
    const [user, repos] = await Promise.all([getGitHubUser(), getUserRepos()]);
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    
    return (
      <div className="grid grid-cols-2 gap-4">
        <StatCard number={`${user.public_repos}`} label="公开仓库" icon="📦" />
        <StatCard number={`${totalStars}`} label="总 Stars" icon="⭐" />
        <StatCard number={`${repos.filter(r => r.language).length}`} label="使用语言" icon="🔤" />
        <StatCard number="∞" label="踩坑记录" icon="🐛" />
      </div>
    );
  } catch (error) {
    // 失败时显示默认数据
    return (
      <div className="grid grid-cols-2 gap-4">
        <StatCard number="20+" label="开源项目" icon="🚀" />
        <StatCard number="5+" label="技术领域" icon="💡" />
        <StatCard number="4" label="编程语言" icon="🛠️" />
        <StatCard number="∞" label="踩坑记录" icon="🐛" />
      </div>
    );
  }
}

// 加载骨架屏
function ProjectsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
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
            <a href="#projects" className="transition hover:text-emerald-400">项目</a>
            <a href="#lobster" className="transition hover:text-emerald-400">小龙虾</a>
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
                还在摸索中的技术爱好者
              </div>

              <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl">
                探索技术边界
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                  记录真实踩坑
                </span>
              </h1>

              <p className="text-lg leading-relaxed text-slate-400">
                你好，我是 <span className="text-emerald-400">Jack</span>。
                专注于现代化 Web 开发、MCP 服务架构和 AI 工具探索。
                <br />
                这里记录从 0 到 1 的真实折腾过程，常有 bug，欢迎指点。
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

        {/* 项目展示 - SSR 获取 GitHub 数据 */}
        <section id="projects" className="mb-32">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-emerald-400">
                Featured Projects
              </p>
              <h2 className="text-4xl font-bold text-white">精选项目</h2>
              <p className="mt-2 text-sm text-slate-500">
                实时同步 GitHub 最新数据 · 刷新即可更新
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
            <ProjectList />
          </Suspense>
        </section>

        {/* 小龙虾部署展示 */}
        <section id="lobster" className="mb-32">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-emerald-400">
              OpenClaw
            </p>
            <h2 className="text-4xl font-bold text-white">小龙虾 AI 部署实录</h2>
            <p className="mt-4 text-slate-400">
              从零搭建个人 AI 助手，全流程记录
            </p>
          </div>

          {/* 部署步骤 */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-2xl">🖥️</div>
              <h4 className="mb-2 font-semibold text-white">1. 服务器准备</h4>
              <p className="text-sm text-slate-400">云服务器环境配置</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-2xl">⚙️</div>
              <h4 className="mb-2 font-semibold text-white">2. 核心配置</h4>
              <p className="text-sm text-slate-400">Docker + OpenClaw 部署</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-2xl">🔗</div>
              <h4 className="mb-2 font-semibold text-white">3. 技能集成</h4>
              <p className="text-sm text-slate-400">小红书 + GitHub + AI 工具</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-rose-500/10 to-transparent p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/20 text-2xl">🤖</div>
              <h4 className="mb-2 font-semibold text-white">4. 自动化运行</h4>
              <p className="text-sm text-slate-400">定时任务 + 持续优化</p>
            </div>
          </div>

          {/* 截图展示 - 网格布局 */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">🐚 部署过程</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-500">
                    <span>截图 1</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <span className="text-white">服务器配置</span>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-500">
                    <span>截图 2</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <span className="text-white">Docker 部署</span>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-500">
                    <span>截图 3</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <span className="text-white">技能配置</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">💬 使用效果</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-500">
                    <span>个人助理截图 1</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <span className="text-white">对话演示</span>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-500">
                    <span>个人助理截图 2</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <span className="text-white">任务执行</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              📍 截图将陆续更新...
            </p>
          </div>
        </section>

        {/* 技术栈展示 */}
        <section id="stack" className="mb-32">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-emerald-400">
              Tech Stack
            </p>
            <h2 className="text-4xl font-bold text-white">技术栈</h2>
            <p className="mt-4 text-slate-400">
              把复杂的东西讲简单，把简单的东西折腾复杂
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">编程语言</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {techStack.languages.map((tech) => (
                  <TechBar key={tech.name} {...tech} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">框架与库</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {techStack.frameworks.map((tech) => (
                  <TechBar key={tech.name} {...tech} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">工具与实践</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {techStack.tools.map((tech) => (
                  <TechBar key={tech.name} {...tech} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
              <div className="mb-3 text-2xl">📝</div>
              <h4 className="mb-2 font-semibold text-white">项目先行</h4>
              <p className="text-sm text-slate-400">代码先跑通，文章后跟进，GitHub 同步</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent p-6">
              <div className="mb-3 text-2xl">🎯</div>
              <h4 className="mb-2 font-semibold text-white">真实踩坑</h4>
              <p className="text-sm text-slate-400">有人味写作，记录真实探索过程</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent p-6">
              <div className="mb-3 text-2xl">🚀</div>
              <h4 className="mb-2 font-semibold text-white">持续探索</h4>
              <p className="text-sm text-slate-400">AI 工具、MCP 服务、全栈开发</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-32">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-600/20 via-blue-600/20 to-purple-600/20 p-12 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold text-white">一起探索技术</h2>
              <p className="mb-8 text-slate-400">
                对 Web 开发、MCP 服务或 AI 工具感兴趣？欢迎交流
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
                <span className="flex items-center text-sm text-slate-500">
                  常有 bug，欢迎指点
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
          <p>© 2026 Jack · 探索技术，记录真实</p>
          <p className="mt-1">实时同步 GitHub 数据 · SSR 渲染</p>
        </footer>
      </main>
    </div>
  );
}
