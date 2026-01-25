# 🚀 项目云端部署指南

本文档详细介绍如何将此 Next.js 项目部署到云端，并获得可访问的域名。

---

## 📋 目录

1. [推荐部署平台](#推荐部署平台)
2. [方案一：Vercel 部署（推荐）](#方案一vercel-部署推荐)
3. [方案二：Netlify 部署](#方案二netlify-部署)
4. [方案三：云服务器部署](#方案三云服务器部署)
5. [自定义域名配置](#自定义域名配置)
6. [常见问题](#常见问题)

---

## 推荐部署平台

| 平台 | 免费额度 | 自动 HTTPS | 全球 CDN | 自定义域名 | 推荐度 |
|------|----------|------------|----------|------------|--------|
| **Vercel** | ✅ 100GB/月 | ✅ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Netlify** | ✅ 100GB/月 | ✅ | ✅ | ✅ | ⭐⭐⭐⭐ |
| **阿里云/腾讯云** | 付费 | 需配置 | 需配置 | ✅ | ⭐⭐⭐ |

---

## 方案一：Vercel 部署（推荐）

Vercel 是 Next.js 官方推荐的部署平台，提供最佳的 Next.js 支持。

### 步骤 1：准备代码仓库

首先将项目推送到 Git 仓库（GitHub、GitLab 或 Gitee）：

```bash
# 初始化 Git（如果还没有的话）
git init

# 添加远程仓库（示例使用 GitHub）
git remote add origin https://github.com/yourusername/your-repo.git

# 提交代码
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 步骤 2：注册 Vercel 账号

1. 访问 [https://vercel.com](https://vercel.com)
2. 点击 "Sign Up"
3. 使用 GitHub/GitLab/Bitbucket 账号登录（推荐使用 GitHub）

### 步骤 3：导入项目

1. 登录后点击 **"Add New..."** → **"Project"**
2. 选择 **"Import Git Repository"**
3. 找到并选择你的仓库
4. 点击 **"Import"**

### 步骤 4：配置项目

Vercel 会自动检测这是 Next.js 项目，通常不需要修改配置：

- **Framework Preset**: Next.js（自动检测）
- **Build Command**: `npm run build`（默认）
- **Output Directory**: `.next`（自动）
- **Install Command**: `npm install`（默认）

### 步骤 5：部署

1. 点击 **"Deploy"** 按钮
2. 等待 2-3 分钟部署完成
3. 🎉 **获得免费域名**：`your-project-name.vercel.app`

### 部署成功后

你将获得类似这样的域名：
```
https://pro-opencode-1.vercel.app
```

---

## 方案二：Netlify 部署

### 步骤 1：注册 Netlify

1. 访问 [https://netlify.com](https://netlify.com)
2. 使用 GitHub 账号登录

### 步骤 2：新建站点

1. 点击 **"Add new site"** → **"Import an existing project"**
2. 选择 **"Deploy with GitHub"**
3. 授权并选择仓库

### 步骤 3：配置构建

```yaml
Build command: npm run build
Publish directory: .next
```

**注意**：Netlify 部署 Next.js 需要安装 `@netlify/plugin-nextjs` 插件：

```bash
npm install -D @netlify/plugin-nextjs
```

创建 `netlify.toml` 配置文件：

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 步骤 4：部署

点击 **"Deploy site"**，获得类似这样的域名：
```
https://your-site-name.netlify.app
```

---

## 方案三：云服务器部署

适用于阿里云、腾讯云、华为云等国内云服务商。

### 步骤 1：购买服务器

推荐配置：
- **CPU**: 2核
- **内存**: 4GB
- **系统**: Ubuntu 22.04 LTS
- **带宽**: 3Mbps+

### 步骤 2：安装 Node.js

```bash
# 连接服务器
ssh root@your-server-ip

# 安装 Node.js (推荐使用 nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

### 步骤 3：安装 Nginx

```bash
apt update
apt install nginx -y
```

### 步骤 4：部署项目

```bash
# 创建项目目录
mkdir -p /var/www/portfolio
cd /var/www/portfolio

# 克隆项目
git clone https://gitee.com/yourusername/your-repo.git .

# 安装依赖并构建
npm install
npm run build

# 安装 PM2 进程管理器
npm install -g pm2

# 启动项目
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

### 步骤 5：配置 Nginx

创建 Nginx 配置文件：

```bash
nano /etc/nginx/sites-available/portfolio
```

添加以下内容：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：

```bash
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 步骤 6：配置 SSL（可选但推荐）

使用 Let's Encrypt 免费证书：

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 自定义域名配置

### 购买域名

推荐平台：
- **国内**：阿里云万网、腾讯云 DNSPod、华为云
- **国际**：Namecheap、GoDaddy、Cloudflare

### Vercel 自定义域名

1. 进入项目设置 → **Domains**
2. 输入你的域名，点击 **Add**
3. 按照提示配置 DNS 记录：

```
类型: CNAME
名称: www (或 @)
值: cname.vercel-dns.com
```

或使用 A 记录：
```
类型: A
名称: @
值: 76.76.19.19
```

### Netlify 自定义域名

1. 进入 **Site settings** → **Domain management**
2. 点击 **Add custom domain**
3. 配置 DNS 记录：

```
类型: CNAME
名称: www
值: your-site-name.netlify.app
```

### DNS 配置完成后

等待 DNS 生效（通常 5-30 分钟），即可通过自定义域名访问。

---

## 🔄 自动部署配置

### Vercel/Netlify 自动部署

连接 Git 仓库后，默认启用自动部署：
- 每次 `git push` 到主分支，自动触发部署
- Pull Request 会生成预览链接

### 云服务器自动部署

使用 GitHub Actions 或 Webhook 实现自动部署：

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Server

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/portfolio
            git pull origin main
            npm install
            npm run build
            pm2 restart portfolio
```

---

## 📊 部署检查清单

部署前确认：

- [ ] 本地 `npm run build` 成功
- [ ] 环境变量已配置（如有）
- [ ] 代码已提交到 Git 仓库
- [ ] 确认分支名称正确

部署后验证：

- [ ] 网站可正常访问
- [ ] 所有页面加载正常
- [ ] 移动端显示正常
- [ ] SSL 证书有效（HTTPS）

---

## 常见问题

### Q: 部署失败怎么办？

1. 检查构建日志中的错误信息
2. 确保本地 `npm run build` 能成功
3. 查看是否有环境变量未配置

### Q: 域名无法访问？

1. 确认 DNS 记录配置正确
2. 等待 DNS 生效（最长 48 小时）
3. 使用 `nslookup your-domain.com` 检查解析

### Q: 如何更新网站内容？

```bash
# 修改代码后
git add .
git commit -m "Update content"
git push

# Vercel/Netlify 会自动重新部署
```

---

## 📞 技术支持

遇到问题可以参考：
- [Vercel 官方文档](https://vercel.com/docs)
- [Netlify 官方文档](https://docs.netlify.com)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)

---

**祝你部署顺利！🎉**
