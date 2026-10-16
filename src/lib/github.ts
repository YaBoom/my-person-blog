// src/lib/github.ts
// GitHub API 工具函数 - 每次刷新获取最新数据

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  created_at: string;
  fork: boolean;
  homepage: string | null;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  avatar_url: string;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = 'YaBoom';

/**
 * 获取用户的公开仓库列表
 * 每次请求都获取最新数据 (cache: 'no-store')
 */
export async function getUserRepos(): Promise<GitHubRepo[]> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'My-Personal-Blog-SSR',
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=pushed&direction=desc&per_page=100`,
      { 
        headers,
        // 禁用缓存，每次请求都获取最新数据
        cache: 'no-store',
        next: { revalidate: 0 }
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const repos: GitHubRepo[] = await res.json();
    
    // 过滤掉 fork 的仓库，按最近推送排序
    return repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
      
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    throw error;
  }
}

/**
 * 获取用户信息
 */
export async function getGitHubUser(): Promise<GitHubUser> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'My-Personal-Blog-SSR',
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}`,
      { 
        headers,
        cache: 'no-store',
        next: { revalidate: 0 }
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch GitHub user:', error);
    throw error;
  }
}

/**
 * 格式化日期为中文格式
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays}天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
  
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

/**
 * 将 GitHub 语言映射到颜色
 */
export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    'TypeScript': '#3178C6',
    'JavaScript': '#F7DF1E',
    'Python': '#3776AB',
    'Java': '#007396',
    'Go': '#00ADD8',
    'Rust': '#DEA584',
    'C++': '#f34b7d',
    'C': '#555555',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'Vue': '#4FC08D',
    'React': '#61DAFB',
  };
  
  return colors[language || ''] || '#8B5CF6';
}

/**
 * 获取项目标签（从 topics 或语言推断）
 */
export function getProjectTags(repo: GitHubRepo): string[] {
  // 优先使用 topics
  if (repo.topics && repo.topics.length > 0) {
    return repo.topics.slice(0, 3);
  }
  
  // 否则使用语言
  const tags: string[] = [];
  if (repo.language) tags.push(repo.language);
  
  // 根据名称推断
  const name = repo.name.toLowerCase();
  if (name.includes('mcp')) tags.push('MCP');
  if (name.includes('ai') || name.includes('agent')) tags.push('AI');
  if (name.includes('spring') || name.includes('java')) tags.push('Java');
  if (name.includes('next') || name.includes('react')) tags.push('React');
  
  return tags.length > 0 ? tags : ['开源'];
}

/**
 * 生成项目描述
 */
export function getProjectDescription(repo: GitHubRepo): string {
  if (repo.description) {
    return repo.description.length > 80 
      ? repo.description.slice(0, 80) + '...'
      : repo.description;
  }
  
  // 根据名称生成默认描述
  const name = repo.name.toLowerCase();
  if (name.includes('mcp')) return 'MCP 服务相关项目';
  if (name.includes('ai') || name.includes('agent')) return 'AI 工具探索项目';
  if (name.includes('demo') || name.includes('example')) return '技术学习与实践项目';
  
  return '开源项目探索';
}

/**
 * 精选项目白名单：按 AI Agent 岗位相关性分组的策展配置。
 * 只展示与 Agent Runtime / MCP / 评测相关的仓库，并附加 JD 视角的亮点解读。
 */
export type ProjectGroup = 'runtime' | 'mcp' | 'eval';

export interface CuratedProject {
  /** 一句话定位（替代/增强 GitHub description） */
  role: string;
  /** JD 视角亮点（每条对应岗位要求的具体能力） */
  highlights: string[];
  /** 分组 */
  group: ProjectGroup;
  /** 能力标签（对齐 Agent 岗 JD 关键词） */
  jdTags: string[];
}

export const PROJECT_GROUP_META: Record<ProjectGroup, { title: string; desc: string }> = {
  runtime: {
    title: 'Agent Runtime · 编排与可靠性',
    desc: 'Multi-Agent 编排、状态管理、Tool Calling 可靠性、上下文工程',
  },
  mcp: {
    title: 'MCP 生态 · 协议与工具链',
    desc: 'MCP 网关、Server 开发、工具接入与权限边界',
  },
  eval: {
    title: '评测与工程效率',
    desc: 'Agent 评测基准、Bad Case 归因、AI 辅助研发工作流',
  },
};

export const CURATED_REPOS: Record<string, CuratedProject> = {
  'agent-guardrails-zhuyt': {
    role: 'Agent Tool Calling 可靠性护栏（Harness）',
    highlights: [
      '救援解析器：修复畸形 JSON / 工具调用，准确率 +46%',
      '带错误提示引导的智能重试（nudge），失败率 -67%',
      '步骤执行器防死循环 + 上下文预算防 OOM',
      '26 场景基准套件：8B 本地模型工具调用准确率 53% → 99%',
    ],
    group: 'runtime',
    jdTags: ['Tool Calling', '重试/熔断', '评测回归', 'Loop Engineering'],
  },
  'mulit-agent-study-zhuyt': {
    role: 'LangGraph Multi-Agent 编排实践',
    highlights: [
      'StateGraph 双角色节点编排（Researcher → Writer），共享状态传递',
      'LangSmith 全链路 tracing + 图结构可视化导出',
      '依赖注入 LLM，Mock 优先 TDD，Mock/集成测试分层',
    ],
    group: 'runtime',
    jdTags: ['Multi-Agent 编排', 'LangGraph', '可观测性'],
  },
  'ContextRoller-zyt': {
    role: 'AI 会话上下文管理器（MCP 工具）',
    highlights: [
      '解决 Claude Code / Cursor 长会话上下文失忆问题',
      '以 MCP 工具形式管理会话上下文的压缩与恢复',
      '上下文工程（Context Engineering）落地实践',
    ],
    group: 'runtime',
    jdTags: ['上下文管理', 'MCP', 'Context Engineering'],
  },
  'mcp-gateway-lite-zhuyt': {
    role: '企业级 MCP 服务器统一网关',
    highlights: [
      'JWT / API Key 双认证 + RBAC 权限边界（沙箱化管控）',
      '限流与配额治理，防成本失控',
      'Prometheus 指标 + SQLite 全链路审计留痕',
    ],
    group: 'mcp',
    jdTags: ['MCP', '权限沙箱', '限流', '全链路审计'],
  },
  'fastapi-langgraph-mcp-zyt': {
    role: 'FastAPI + LangGraph + MCP 集成实践',
    highlights: [
      'LangGraph 图编排与 MCP 工具接入结合',
      'FastAPI 异步服务承载 Agent 运行时',
    ],
    group: 'mcp',
    jdTags: ['LangGraph', 'MCP', 'FastAPI'],
  },
  'chrome-devtools-mcp-lite-zyt': {
    role: '精简版 Chrome DevTools MCP Server',
    highlights: [
      '自写 Tool Schema，让 AI 直接控制浏览器调试',
      '从零实现 MCP Server 协议细节，非简单封装 SDK',
    ],
    group: 'mcp',
    jdTags: ['MCP Server', '自写 Tool Schema'],
  },
  'agent-skills-zyt': {
    role: 'Agent Skills 范式对照实验（Skills Lab）',
    highlights: [
      '对照验证：无技能 / 人工设计技能 / Agent 自生成技能',
      '技能定义格式 + 任务测试框架，基于 SkillsBench 论文复现',
      '用数据回答「自生成技能到底有没有用」',
    ],
    group: 'eval',
    jdTags: ['Skills 范式', '评测集', 'Prompt 模板库'],
  },
  'loglens-zyt': {
    role: 'AI 智能日志根因分析工具',
    highlights: [
      'LLM 快速定位线上问题根因，Bad Case 归因思路的产品化',
      '配套 Harness（loglens-newsletter）驱动持续迭代',
    ],
    group: 'eval',
    jdTags: ['根因分析', 'AI 应用'],
  },
  'ai-commit-zyt': {
    role: 'AI 驱动的 Git 提交信息生成工具',
    highlights: [
      'Vibe Coding 工作流的日常工具化沉淀',
      '把 AI 嵌入研发流水线的小切口实践',
    ],
    group: 'eval',
    jdTags: ['Vibe Coding', '研发提效'],
  },
};

/** 精选仓库的展示顺序（按 JD 相关度） */
export const CURATED_ORDER = [
  'agent-guardrails-zhuyt',
  'mulit-agent-study-zhuyt',
  'mcp-gateway-lite-zhuyt',
  'agent-skills-zyt',
  'ContextRoller-zyt',
  'fastapi-langgraph-mcp-zyt',
  'chrome-devtools-mcp-lite-zyt',
  'loglens-zyt',
  'ai-commit-zyt',
];

export function getCurated(repoName: string): CuratedProject | undefined {
  return CURATED_REPOS[repoName];
}

/**
 * 判断是否为新项目（30天内更新）
 */
export function isNewProject(repo: GitHubRepo): boolean {
  const pushedDate = new Date(repo.pushed_at);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return pushedDate > thirtyDaysAgo;
}

/**
 * 判断是否是高亮项目（最近7天内更新且有star）
 */
export function isHighlightedProject(repo: GitHubRepo): boolean {
  const pushedDate = new Date(repo.pushed_at);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  return pushedDate > sevenDaysAgo && repo.stargazers_count > 0;
}
