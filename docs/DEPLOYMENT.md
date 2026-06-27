# Deployment Guide

Complete guide for deploying the AI Investment Research Agent to production.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - 5 minutes)

**Why Vercel?**
- Optimized for Next.js applications
- Automatic deployments from GitHub
- Built-in serverless functions
- Edge network for global performance
- Free tier available for hobbyists

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/investment-agent.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Set Environment Variables**
   - Project Settings → Environment Variables
   - Add:
     - `GOOGLE_API_KEY`: Your Google Gemini API key
     - `TAVILY_API_KEY`: Your Tavily API key
     - `NEWS_API_KEY`: Your News API key
   - Click "Deploy"

4. **Custom Domain** (Optional)
   - Settings → Domains
   - Add your domain
   - Update DNS records as instructed

**Estimated Cost:**
- Free tier: Up to 100 GB bandwidth/month
- Pro tier: $20/month + usage

---

### Option 2: Docker + Railway

**Why Railway?**
- Simple Docker deployment
- GitHub integration
- Affordable pricing
- PostgreSQL/Redis support

**Steps:**

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production && npm cache clean --force
   
   COPY . .
   RUN npm run build
   
   ENV NODE_ENV=production
   EXPOSE 3000
   
   CMD ["npm", "start"]
   ```

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - New Project → GitHub Repo
   - Connect your repository
   - Add environment variables
   - Deploy

3. **Monitor & Scale**
   - View logs in Railway dashboard
   - Increase memory/CPU as needed
   - Set up domain

**Estimated Cost:**
- $5-20/month depending on usage

---

### Option 3: AWS EC2 + PM2

**Why AWS?**
- Full control
- Scalable infrastructure
- Global data centers
- Pay-as-you-go pricing

**Steps:**

1. **Launch EC2 Instance**
   ```bash
   # Ubuntu 22.04 LTS recommended
   # t3.micro (eligible for free tier)
   ```

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install Nginx
   sudo apt install -y nginx
   
   # Install PM2
   sudo npm install -g pm2
   ```

4. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/username/investment-agent.git
   cd investment-agent
   
   # Install dependencies
   npm ci --production
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "investment-agent" -- start
   pm2 save
   sudo pm2 startup
   ```

5. **Configure Nginx**
   ```nginx
   upstream investment_agent {
     server 127.0.0.1:3000;
   }
   
   server {
     listen 80;
     server_name your-domain.com;
   
     location / {
       proxy_pass http://investment_agent;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

6. **SSL Certificate (Let's Encrypt)**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot certonly --nginx -d your-domain.com
   ```

7. **Monitor & Update**
   ```bash
   pm2 logs                    # View logs
   pm2 restart investment-agent # Restart
   pm2 monit                   # Monitor resources
   ```

**Estimated Cost:**
- EC2 t3.micro: ~$5-10/month
- Data transfer: Pay per GB used
- Optional RDS for database

---

### Option 4: Google Cloud Run

**Why Cloud Run?**
- Serverless containers
- Auto-scaling
- Pay-only-for-use pricing
- GitHub integration

**Steps:**

1. **Setup gcloud CLI**
   ```bash
   curl https://sdk.cloud.google.com | bash
   exec -l $SHELL
   gcloud init
   ```

2. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   ENV NODE_ENV=production PORT=8080
   EXPOSE 8080
   CMD ["npm", "start"]
   ```

3. **Deploy**
   ```bash
   gcloud run deploy investment-agent \
     --source . \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GOOGLE_API_KEY=xxx,TAVILY_API_KEY=yyy
   ```

**Estimated Cost:**
- First 2M requests/month free
- Then $0.40 per 1M requests

---

## 📋 Pre-Deployment Checklist

- [ ] All TypeScript errors fixed (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables configured
- [ ] API keys are valid and not exposed in code
- [ ] `.env.local` added to `.gitignore`
- [ ] No console.logs in production code
- [ ] Error handling implemented
- [ ] Cache system tested
- [ ] Mock fallbacks working
- [ ] README updated with setup instructions
- [ ] License file included
- [ ] Git history cleaned (no secrets exposed)

---

## 🔐 Environment Variables Setup

### Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable "Google Generative AI API"
4. Go to Credentials → Create API Key
5. Copy the key to your deployment platform

### Tavily API Key

1. Go to [Tavily](https://tavily.com/)
2. Sign up for free account
3. Get API key from dashboard
4. Add to deployment environment

### News API Key

1. Go to [NewsAPI](https://newsapi.org/)
2. Register free account
3. Get API key from profile
4. Add to deployment environment

---

## 🚨 Post-Deployment

### Health Checks

```bash
# Test homepage
curl https://your-domain.com/

# Test API
curl -X POST https://your-domain.com/api/research \
  -H "Content-Type: application/json" \
  -d '{"company":"Apple"}'
```

### Monitoring

**Set up alerts for:**
- 5xx errors (API failures)
- High response times (>5s)
- Deployment failures
- Database connection errors

### Logging

```bash
# Vercel: View logs
vercel logs investment-agent

# Railway: View logs
# Use Railway dashboard

# AWS EC2: View PM2 logs
pm2 logs investment-agent

# Google Cloud Run: View logs
gcloud run logs read investment-agent
```

### Performance Optimization

```javascript
// next.config.js - Add caching headers
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120'
          }
        ]
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm ci
      - run: npm run type-check
      - run: npm run build
      
      - name: Deploy to Vercel
        run: npx vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📊 Scaling Considerations

| Metric | Current | Medium Scale | Large Scale |
|--------|---------|--------------|------------|
| **Users/month** | 100 | 10,000 | 100,000+ |
| **API calls/month** | 500 | 50,000 | 500,000+ |
| **Server tier** | Shared | Pro | Dedicated |
| **Database** | In-memory | PostgreSQL | PostgreSQL + Redis |
| **Cache** | In-process | Redis | Distributed Redis |
| **CDN** | Built-in | Cloudflare | Cloudflare Enterprise |

---

## 🆘 Troubleshooting Deployments

### Build Fails
```bash
# Clear cache and rebuild
npm ci
npm run build

# Check Node version
node --version  # Should be 18+

# Check TypeScript errors
npm run type-check
```

### API Timeout
- Increase timeout in `constants.ts`
- Reduce LLM temperature for faster responses
- Enable caching
- Consider request queuing

### Out of Memory
- Reduce batch size
- Increase server memory
- Use streaming responses
- Implement pagination

### High Latency
- Enable CDN (Cloudflare)
- Use regional deployment
- Increase cache TTL
- Profile slow endpoints

---

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [AWS EC2 Guide](https://docs.aws.amazon.com/ec2/)
- [Google Cloud Run](https://cloud.google.com/run/docs)

---

**Last Updated:** June 27, 2026
