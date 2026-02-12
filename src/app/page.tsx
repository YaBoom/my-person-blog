"use client";

import { useEffect, useState, useRef } from "react";

// GitHub 项目数据 - 按最近推送排序
const projects = [
  {
    title: "PocketFlow 探索",
    desc: "折腾100行代码的AI框架，从质疑到真香的真实踩坑记录。",
    tags: ["Python", "AI", "实验"],
    link: "https://github.com/YaBoom/pocketflow-zyt",
    date: "2026-02-12",
    highlight: true,
  },
  {
    title: "MCP Enterprise Server",
    desc: "企业级MCP数据服务，让AI Agent安全访问多数据源的实战方案。",
    tags: ["TypeScript", "MCP", "企业级"],
    link: "https://github.com/YaBoom/mcp-enterprise-server-zyt",
    date: "2026-02-12",
    highlight: true,
  },
  {
    title: "MCP 数据服务",
    desc: "基于MCP协议的企业级数据查询服务 - 让AI Agent安全访问MySQL/Redis/API",
    tags: ["TypeScript", "MCP", "Database"],
    link: "https://github.com/YaBoom/mcp-enterprise-data-server",
    date: "2026-02-11",
  },
  {
    title: "SVG Generator",
    desc: "强大的SVG图形生成器，支持自定义样式与动态效果",
    tags: ["TypeScript", "SVG", "Graphics"],
    link: "https://github.com/YaBoom/SVG-Generator",
    date: "2026-02-10",
  },
  {
    title: "SpringBoot Dify 集成",
    desc: "SpringBoot与Dify AI平台的集成方案",
    tags: ["Java", "SpringBoot", "AI"],
    link: "https://github.com/YaBoom/springboot-dify-integration",
    date: "2026-02-10",
  },
  {
    title: "Netty 实战 Demo",
    desc: "Netty网络编程学习与实践",
    tags: ["Java", "Netty", "Network"],
    link: "https://github.com/YaBoom/netty-demo",
    date: "2026-02-10",
  },
];

// 技术栈数据 - 按熟练度/使用频率
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

// 打字机效果组件
function TypewriterText({ text, delay = 100 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-emerald-400">|</span>
    </span>
  );
}

// 粒子背景组件
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // 创建粒子
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`;
        ctx.fill();

        // 连线
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ opacity: 0.6 }}
    />
  );
}

// 技术栈进度条组件
function TechBar({ name, level, color, icon }: { name: string; level: number; color: string; icon: string }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setWidth(level), 500);
    return () => clearTimeout(timeout);
  }, [level]);

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
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// 项目卡片组件
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {project.highlight && (
        <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-pink-500 to-rose-500 px-12 py-1 text-xs font-bold text-white shadow-lg">
          NEW
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-slate-500">{project.date}</span>
      </div>

      <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-emerald-400">
        {project.title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-slate-400">
        {project.desc}
      </p>

      <div className="flex items-center text-sm text-emerald-400 transition-all group-hover:translate-x-2">
        查看项目 →
      </div>

      {/* Hover glow effect */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:from-emerald-500/10 group-hover:via-emerald-500/5 group-hover:to-emerald-500/0 group-hover:opacity-100" />
    </a>
  );
}

// 统计数据展示
function StatCard({ number, label, icon }: { number: string; label: string; icon: string }) {
  const [count, setCount] = useState(0);
  const targetNum = parseInt(number.replace(/\D/g, ""));

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetNum / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetNum]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
      <div className="mb-2 text-3xl">{icon}</div>
      <div className="text-3xl font-bold text-white">
        {count}{number.replace(/\d/g, "")}
      </div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f] text-slate-200">
      {/* 粒子背景 */}
      <ParticleBackground />

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

            {/* 统计卡片 */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard number="20+" label="开源项目" icon="🚀" />
              <StatCard number="5+" label="技术领域" icon="💡" />
              <StatCard number="4" label="编程语言" icon="🛠️" />
              <StatCard number="∞" label="踩坑记录" icon="🐛" />
            </div>
          </div>
        </section>

        {/* 项目展示 */}
        <section id="projects" className="mb-32">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-emerald-400">
                Featured Projects
              </p>
              <h2 className="text-4xl font-bold text-white">精选项目</h2>
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
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
            {/* 编程语言 */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">编程语言</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {techStack.languages.map((tech) => (
                  <TechBar key={tech.name} {...tech} />
                ))}
              </div>
            </div>

            {/* 框架 */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">框架与库</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {techStack.frameworks.map((tech) => (
                  <TechBar key={tech.name} {...tech} />
                ))}
              </div>
            </div>

            {/* 工具 */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">工具与实践</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {techStack.tools.map((tech) => (
                  <TechBar key={tech.name} {...tech} />
                ))}
              </div>
            </div>
          </div>

          {/* 工作流特点 */}
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
          <p className="mt-1">最近更新：2026年2月 · 同步 GitHub 最新项目</p>
        </footer>
      </main>
    </div>
  );
}
