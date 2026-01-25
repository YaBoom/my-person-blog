const projects = [
  {
    title: "MCP Weather Server",
    desc: "基于 Python SDK 的 MCP 天气服务，专注稳定的 API 交付。",
    tags: ["Python", "MCP", "API"],
    link: "https://gitee.com/zhu_yateng/mcp-weather-python-demo",
  },
  {
    title: "Caffeine Cache Demo",
    desc: "Java 落地 Caffeine 本地缓存的性能实践，延迟可见可控。",
    tags: ["Java", "Caffeine", "Cache"],
    link: "https://gitee.com/zhu_yateng/caffine-demo",
  },
  {
    title: "Netty 高性能通信",
    desc: "用 Netty 构建自定义协议服务，强调吞吐与可维护性。",
    tags: ["Java", "Netty", "Networking"],
    link: "https://gitee.com/zhu_yateng/netty-demo",
  },
  {
    title: "Streamlit 数据面板",
    desc: "Streamlit 快速搭建数据可视化的实验型产品，强调体验。",
    tags: ["Python", "Streamlit", "UI"],
    link: "https://gitee.com/zhu_yateng/streamlit_demo",
  },
  {
    title: "Qt 音乐播放器",
    desc: "Qt + C++ 构建的多媒体播放器，重视体验与性能平衡。",
    tags: ["C++", "Qt", "Media"],
    link: "https://gitee.com/zhu_yateng/video_server",
  },
  {
    title: "五子棋 AI 对战",
    desc: "C++ 编写的五子棋博弈，探索棋盘逻辑与策略实现。",
    tags: ["C++", "Game", "AI"],
    link: "https://gitee.com/zhu_yateng/Game_refer",
  },
];



const highlights = [
  {
    title: "后端性能",
    detail: "Netty、Caffeine、MCP 服务治理",
  },
  {
    title: "数据产品",
    detail: "Streamlit、可视化、用户体验",
  },
  {
    title: "多语言落地",
    detail: "Python / Java / C++ / Qt",
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
              JZ
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Jack.zhu</p>
              <p className="font-medium text-slate-50">朱亚腾 · 创意技术</p>
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
            href="https://gitee.com/zhu_yateng"
            target="_blank"
            rel="noreferrer"
          >
            Gitee · 即刻关注
          </a>
        </header>

        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950 to-black px-8 py-12 shadow-2xl shadow-black/40 sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.2),transparent_30%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/90">创造力驱动的全栈工程师</p>
              <h1 className="font-[var(--font-display)] text-4xl leading-tight text-white sm:text-5xl">
                打造质感体验，记录可复用的工程方法
              </h1>
              <p className="max-w-2xl text-lg text-slate-200">
                你好，我是 Jack.zhu（朱亚腾）。从高性能后端、数据可视化到桌面多媒体，我把技术当作创意工具，持续在 Gitee 输出实践与思考。
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
                  最近一年贡献 221 次
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  14 个仓库持续维护
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-pink-400" />
                  多语言落地经验
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
                    <dd className="mt-1 font-semibold text-white">后端性能 / 数据产品</dd>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <dt className="text-xs text-slate-400">昵称</dt>
                    <dd className="mt-1 font-semibold text-white">Jack.zhu</dd>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <dt className="text-xs text-slate-400">常用语言</dt>
                    <dd className="mt-1 font-semibold text-white">Python · Java · C++</dd>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <dt className="text-xs text-slate-400">平台</dt>
                    <dd className="mt-1 font-semibold text-white">Gitee / 自建实验室</dd>
                  </div>
                </dl>
                <a
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:translate-y-[-1px]"
                  href="https://gitee.com/zhu_yateng"
                  target="_blank"
                  rel="noreferrer"
                >
                  前往 Gitee 看代码
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
              href="https://gitee.com/zhu_yateng/projects"
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
              偏好可观测、可迭代的工程方案：以监控和日志驱动调优，优先清晰的接口语义，再用自动化把效率做高。
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              {["Python", "Java", "C++", "Qt", "Netty", "Caffeine", "Streamlit", "MCP", "Next.js", "Tailwind CSS"].map(
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
                <li>· TDD + 快速原型，优先可验证假设</li>
                <li>· API 设计前置：幂等、监控、熔断</li>
                <li>· 自动化 + 观察性，收敛性能迭代</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-inner shadow-slate-950/60">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">侧重场景</p>
              <ul className="mt-3 space-y-2">
                <li>· 高性能通信与缓存治理</li>
                <li>· 数据产品体验（可视化 / 交互）</li>
                <li>· 桌面与多媒体的极致细节</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-gradient-to-r from-emerald-600/70 via-emerald-500/70 to-sky-500/70 p-8 text-white shadow-2xl shadow-emerald-500/30 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/90">Connect</p>
            <h3 className="mt-2 text-2xl font-semibold">一起打造下一个灵感</h3>
            <p className="text-sm text-white/90">
              需要后端性能优化、数据产品设计，或想一起折腾创意项目？随时联系我。
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <a
              className="rounded-full border border-white/70 px-4 py-2 text-white transition hover:-translate-y-0.5"
              href="https://gitee.com/zhu_yateng/projects"
              target="_blank"
              rel="noreferrer"
            >
              浏览仓库
            </a>
          </div>
        </section>

        <footer className="flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Jack.zhu · 用代码雕刻质感体验</span>
          <span>最近更新：根据 Gitee 资料整理</span>
        </footer>
      </main>
    </div>
  );
}
