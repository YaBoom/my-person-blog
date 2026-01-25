const projects = [
  {
    title: "MCP Weather Seniverse Demo",
    desc: "基于 Python SDK 的 MCP 天气服务，专注稳定的 API 交付。",
    tags: ["Python", "MCP", "API"],
    link: "https://github.com/YaBoom/mcp-weather-seniverse-demo",
  },
  {
    title: "Paper Research",
    desc: "学术论文研究与分析工具，提供高效的文献管理方案。",
    tags: ["TypeScript", "Research", "Tools"],
    link: "https://github.com/YaBoom/paper-research",
  },
  {
    title: "Lumina Festival",
    desc: "现代化的节日主题应用，打造沉浸式用户体验。",
    tags: ["TypeScript", "Web", "UI"],
    link: "https://github.com/YaBoom/Lumina-Festival",
  },
  {
    title: "SVG Generator",
    desc: "强大的 SVG 图形生成器，支持自定义样式与动态效果。",
    tags: ["TypeScript", "SVG", "Graphics"],
    link: "https://github.com/YaBoom/SVG-Generator",
  },
  {
    title: "个人技术博客",
    desc: "基于 Next.js 构建的现代化个人博客，展示技术实践与思考。",
    tags: ["TypeScript", "Next.js", "Blog"],
    link: "https://github.com/YaBoom/my-person-blog",
  },
  {
    title: "Game Refer",
    desc: "C++ 编写的游戏参考实现，探索游戏逻辑与算法设计。",
    tags: ["C++", "Game", "Algorithm"],
    link: "https://github.com/YaBoom/Game_refer",
  },
];



const highlights = [
  {
    title: "全栈开发",
    detail: "TypeScript、Next.js、现代化 Web 应用",
  },
  {
    title: "MCP 服务",
    detail: "Python SDK、API 设计、服务治理",
  },
  {
    title: "多语言实践",
    detail: "TypeScript / Python / C++",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/25 blur-[120px]" />
        <div className="absolute left-[10%] top-1/3 h-60 w-60 rounded-full bg-indigo-500/20 blur-[110px]" />
        <div className="absolute right-[12%] top-[45%] h-72 w-72 rounded-full bg-pink-500/16 blur-[120px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-16 space-y-14">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-6 py-4 shadow-lg shadow-emerald-500/10 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 text-lg font-semibold text-white">
              YB
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">YaBoom</p>
              <p className="font-medium text-slate-50">开源开发者 · 技术探索</p>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-200 sm:flex">
            <a className="transition hover:text-white" href="#projects">
              项目
            </a>

            <a className="transition hover:text-white" href="#stack">
              技术栈
            </a>
          </nav>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:translate-y-[-1px] hover:shadow-xl"
            href="https://github.com/YaBoom"
            target="_blank"
            rel="noreferrer"
          >
            GitHub · 即刻关注
          </a>
        </header>

        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950 to-black px-8 py-12 shadow-2xl shadow-black/40 sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.2),transparent_30%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/90">开源驱动的全栈开发者</p>
              <h1 className="font-[var(--font-display)] text-4xl leading-tight text-white sm:text-5xl">
                探索技术边界，构建优雅解决方案
              </h1>
              <p className="max-w-2xl text-lg text-slate-200">
                你好，我是 YaBoom。专注于现代化 Web 开发、MCP 服务架构和跨语言技术实践，持续在 GitHub 分享开源项目与技术探索。
              </p>
              <div className="flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 shadow-md shadow-emerald-500/10 transition hover:border-emerald-300/60 hover:shadow-lg hover:shadow-emerald-500/30"
                  >
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-200">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  21 个开源仓库
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  活跃的 GitHub 贡献者
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-pink-400" />
                  多语言技术栈
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-sky-500/20">
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    快速档案
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">作品快照</h3>
                </div>
                <dl className="grid grid-cols-2 gap-4 text-sm text-slate-200">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <dt className="text-xs text-slate-400">核心方向</dt>
                    <dd className="mt-1 font-semibold text-white">全栈开发 / MCP 服务</dd>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <dt className="text-xs text-slate-400">昵称</dt>
                    <dd className="mt-1 font-semibold text-white">YaBoom</dd>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <dt className="text-xs text-slate-400">常用语言</dt>
                    <dd className="mt-1 font-semibold text-white">TypeScript · Python · C++</dd>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <dt className="text-xs text-slate-400">平台</dt>
                    <dd className="mt-1 font-semibold text-white">GitHub / 开源社区</dd>
                  </div>
                </dl>
                <a
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:translate-y-[-1px]"
                  href="https://github.com/YaBoom"
                  target="_blank"
                  rel="noreferrer"
                >
                  前往 GitHub 看代码
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/90">
                Projects
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">精选项目</h2>
            </div>
            <a
              href="https://github.com/YaBoom?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-emerald-200 transition hover:text-white"
            >
              查看全部 →
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-900/40 transition duration-300 hover:-translate-y-1 hover:border-emerald-200/60 hover:shadow-emerald-500/30"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    {project.tags.slice(0, 2).join(" · ")}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-200">
                    {project.desc}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>



        <section id="stack" className="grid gap-6 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/50 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/90">Stack</p>
            <h2 className="text-3xl font-semibold text-white">技术栈与习惯</h2>
            <p className="text-slate-200">
              追求简洁优雅的代码设计，注重用户体验与性能优化，善于将复杂问题转化为可维护的解决方案。
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              {["TypeScript", "Python", "C++", "Next.js", "React", "MCP", "Node.js", "Tailwind CSS", "SVG", "Web APIs"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="grid gap-4 text-sm text-slate-100 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-inner shadow-slate-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">工作流</p>
              <ul className="mt-3 space-y-2">
                <li>· 组件化设计，注重代码复用性</li>
                <li>· 类型安全优先，TypeScript 全栈</li>
                <li>· 持续集成，自动化测试与部署</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-inner shadow-slate-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">侧重场景</p>
              <ul className="mt-3 space-y-2">
                <li>· 现代化 Web 应用开发</li>
                <li>· MCP 服务架构与 API 设计</li>
                <li>· 数据可视化与图形生成</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-gradient-to-r from-emerald-600/70 via-emerald-500/70 to-sky-500/70 p-8 text-white shadow-2xl shadow-emerald-500/30 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/90">Connect</p>
            <h3 className="mt-2 text-2xl font-semibold">一起打造下一个灵感</h3>
            <p className="text-sm text-white/90">
              对 Web 开发、MCP 服务或开源项目感兴趣？欢迎在 GitHub 上交流合作。
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <a
              className="rounded-full border border-white/70 px-4 py-2 text-white transition hover:-translate-y-0.5"
              href="https://github.com/YaBoom?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              浏览仓库
            </a>
          </div>
        </section>

        <footer className="flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 YaBoom · 探索技术，构建未来</span>
          <span>最近更新：根据 GitHub 资料整理</span>
        </footer>
      </main>
    </div>
  );
}
