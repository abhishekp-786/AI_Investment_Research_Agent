# Setup & Environment Guide

Complete step-by-step guide for setting up the AI Investment Research Agent.

## 📦 System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.14+, Linux (Ubuntu 18.04+)
- **CPU**: 2 cores minimum
- **RAM**: 4GB minimum (8GB recommended)
- **Disk**: 2GB free space
- **Node.js**: 18.17.0 or higher
- **npm**: 9.0.0 or higher

### Verify Installation
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

---

## 🔧 Local Development Setup

### Step 1: Clone Repository

```bash
# Using Git
git clone https://github.com/username/investment-agent.git
cd investment-agent

# Or extract ZIP file
unzip investment-agent.zip
cd investment-agent
```

### Step 2: Install Dependencies

```bash
# Install all packages
npm install

# Verify installation
npm list

# Should show 766+ packages installed
```

### Step 3: Create Environment File

```bash
# Create .env.local (Windows PowerShell)
New-Item .env.local -Type File

# Or create .env.local (macOS/Linux)
touch .env.local
```

### Step 4: Add API Keys (Optional for Development)

Edit `.env.local`:

```env
# Google Gemini API
GOOGLE_API_KEY=AIzaSyD...your_key_here

# Tavily Search API
TAVILY_API_KEY=tvly-...your_key_here

# News API
NEWS_API_KEY=your_newsapi_key_here

# Next.js Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 5: Run Development Server

```bash
# Start development server
npm run dev

# Output should show:
# ▲ Next.js 14.2.35
# - Local:        http://localhost:3000
# - Environments: .env.local
# ✓ Ready in 1846ms
```

### Step 6: Open in Browser

Visit [http://localhost:3000](http://localhost:3000)

You should see the professional landing page with the search form.

---

## 🚀 Quick Test

### Test 1: Homepage Loads

- [ ] Navigate to http://localhost:3000
- [ ] See hero section with gradient text
- [ ] See "AI-Powered Investment Research" title
- [ ] Search form visible at bottom
- [ ] Features section visible
- [ ] Footer visible

### Test 2: Company Search

```bash
# In browser:
1. Type "Apple" in search box
2. Click "Search" or press Enter
3. Should redirect to http://localhost:3000/dashboard?company=Apple
4. Should show loading skeleton initially
5. Should show investment recommendation with:
   - INVEST/PASS badge
   - Confidence score (0-100)
   - Risk level badge
   - Financial metrics grid
   - SWOT analysis
   - News feed
```

### Test 3: API Endpoint

```bash
# macOS/Linux
curl -X POST http://localhost:3000/api/research \
  -H "Content-Type: application/json" \
  -d '{"company":"Apple"}'

# Windows PowerShell
$body = @{ company = "Apple" } | ConvertTo-Json
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/research" \
  -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

Expected response: JSON with investment recommendation

### Test 4: Type Checking

```bash
npm run type-check

# Should output:
# tsc --noEmit
# (no errors)
```

### Test 5: Production Build

```bash
npm run build

# Should output success:
# ✓ Compiled successfully
# ✓ Linting and checking validity of types
# ✓ Collecting page data
# ✓ Generating static pages (6/6)
```

---

## 🐛 Troubleshooting Setup

### Issue: "Port 3000 already in use"

**Windows:**
```powershell
# Find process using port 3000
Get-NetTCPConnection -LocalPort 3000

# Kill the process
Stop-Process -Id <PID> -Force

# Or use different port
$env:PORT=3001
npm run dev
```

**macOS/Linux:**
```bash
# Find process
lsof -ti:3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Issue: "npm ERR! code EACCES"

```bash
# Fix npm permissions (macOS/Linux only)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Add to ~/.bashrc or ~/.zshrc
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Issue: "ENOENT: no such file or directory"

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or on Windows
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Issue: "Module not found: Can't resolve '@/components/...'"

```bash
# Verify tsconfig.json paths are correct
npm run type-check

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: "API returns mock data instead of real"

Missing environment variables. Ensure `.env.local` has:
- GOOGLE_API_KEY (for LLM)
- TAVILY_API_KEY (for search)
- NEWS_API_KEY (for news)

Without these, mock data is used automatically (perfect for development).

---

## 📚 Development Commands

```bash
# Development
npm run dev              # Start dev server on port 3000
npm run dev -- -p 3001  # Use different port

# Production
npm run build            # Build for production
npm start                # Start production server
npm run build && npm start

# Type Checking
npm run type-check      # Check TypeScript errors

# Linting
npm run lint            # Run ESLint
npm run lint -- --fix   # Auto-fix issues

# All Together
npm run type-check && npm run lint -- --fix && npm run build
```

---

## 🎯 Environment Variables Reference

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `GOOGLE_API_KEY` | No (dev) | `AIza...` | Google Gemini API key |
| `TAVILY_API_KEY` | No (dev) | `tvly-...` | Tavily Search API key |
| `NEWS_API_KEY` | No (dev) | `abc123...` | NewsAPI key |
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:3000` | API base URL |
| `NODE_ENV` | No | `development` | Auto-set by Next.js |

### Getting API Keys

**Google Gemini API:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project or select existing
3. Enable "Google Generative AI API"
4. Go to Credentials → Create API Key
5. Copy and paste into GOOGLE_API_KEY

**Tavily API:**
1. Visit [tavily.com](https://tavily.com/)
2. Sign up for free account
3. Get API key from dashboard
4. Copy and paste into TAVILY_API_KEY

**News API:**
1. Visit [newsapi.org](https://newsapi.org/)
2. Create free account
3. Get API key from profile settings
4. Copy and paste into NEWS_API_KEY

---

## 📁 Project Structure Overview

```
investment-agent/
├── app/                    # Next.js pages and API
├── components/             # React components
├── hooks/                  # Custom React hooks
├── services/               # External API services
├── langchain/              # AI agent code
├── lib/                    # Utilities (cache, validation)
├── types/                  # TypeScript interfaces
├── utils/                  # Helper functions
├── public/                 # Static assets
├── docs/                   # Documentation
├── .env.local              # Local env vars (create this)
├── .eslintrc.json          # Linting rules
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
├── package.json            # Dependencies
└── README.md               # This file
```

---

## 🔍 File Structure Details

### Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page landing |
| `app/dashboard/page.tsx` | Results dashboard |
| `app/api/research/route.ts` | Investment analysis API |
| `components/home/CompanyInput.tsx` | Search form |
| `langchain/agents/investment.ts` | LLM orchestration |
| `services/financial.ts` | Financial metrics |
| `lib/cache/index.ts` | Caching system |
| `.env.local` | Your local secrets |

---

## ✅ Post-Installation Checklist

- [ ] Node.js v18+ installed
- [ ] npm v9+ installed
- [ ] Repository cloned/extracted
- [ ] `npm install` completed (766 packages)
- [ ] `.env.local` file created
- [ ] Dev server starts (`npm run dev`)
- [ ] Homepage loads at localhost:3000
- [ ] Can search for companies
- [ ] API returns JSON response
- [ ] TypeScript checks pass
- [ ] Production build succeeds
- [ ] README.md reviewed

---

## 🎓 Next Steps

1. **Explore Codebase**: Look at `components/`, `services/`, `langchain/` directories
2. **Read Architecture**: See `README.md` - Architecture section
3. **Setup APIs**: Add your API keys to `.env.local`
4. **Test Features**: Try different company searches
5. **Deploy**: Follow `docs/DEPLOYMENT.md` for production
6. **Customize**: Modify prompts, add new metrics, integrate additional APIs

---

## 💻 IDE Setup (Recommended)

### VS Code Extensions

```bash
# Install these extensions for best experience:
# - TypeScript Vue Plugin
# - Prettier
# - ESLint
# - Tailwind CSS IntelliSense
# - Thunder Client (for API testing)
# - REST Client
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 🚀 Performance Tips

1. **Clear cache before rebuilding**
   ```bash
   rm -rf .next node_modules
   npm install && npm run build
   ```

2. **Use TypeScript strict mode during development**
   ```bash
   npm run type-check # Catch errors early
   ```

3. **Enable Next.js experimental features**
   - Already configured in `next.config.js`

4. **Monitor bundle size**
   ```bash
   npm run build # Check "Route" sizes in output
   ```

---

## 📞 Getting Help

1. **Check README.md** for comprehensive documentation
2. **See DEPLOYMENT.md** for production setup
3. **Check error messages** carefully - they're descriptive
4. **Review .env.local** setup - most issues are config-related
5. **Clear cache**: `rm -rf .next && npm run dev`
6. **Restart terminal** after changing env vars

---

**Last Updated:** June 27, 2026
**Version:** 1.0.0
