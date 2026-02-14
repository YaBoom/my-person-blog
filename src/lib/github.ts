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
