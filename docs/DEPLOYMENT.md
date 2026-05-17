# DEPLOYMENT

## Tin12 Pro Cánh Diều - Deployment Guide

---

## 1. Prerequisites

| Requirement | Version | Notes |
|------------|---------|-------|
| Node.js | 18+ | LTS recommended |
| npm | 9+ | Comes with Node |
| Git | Any recent | Optional |

---

## 2. Local Development Setup

### 2.1 Clone & Install

```bash
# Clone the repository
git clone <repo-url>
cd tin12-pro

# Install dependencies
npm install
```

### 2.3 Seed Data

All content is bundled in the app — no database setup required for MVP.

```
src/content/
├── courses.ts    # 5 courses
├── lessons.ts    # 20+ lessons
├── questions.ts  # 200+ MCQ + T/F
├── labs.ts       # 8 labs
├── exams.ts      # 3 exam blueprints
├── flashcards.ts # 100+ cards
└── badges.ts    # 20 badges
```

To add new content, edit the corresponding TypeScript file. Rebuild to see changes.

### 2.2 Environment Variables

Create `.env.local` in the project root (copy from `.env.example`):

```bash
cp .env.example .env.local
```

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | No | — | External API (future) |
| `NEXT_PUBLIC_ANALYTICS_ID` | No | — | GA4 or Vercel Analytics |
| `OPENAI_API_KEY` | No | — | Real AI Tutor (future) |

### 2.3 Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

### 2.4 Build & Type Check

```bash
# Production build (includes type check)
npm run build

# Type check only
npm run typecheck

# Lint check
npm run lint
```

### 2.5 Test

```bash
npm test        # Watch mode
npm run test:run  # Single run
```

### 2.4 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 3. Production Build

### 3.1 Build Process

```bash
npm run build
```

This produces:
- Optimized JavaScript bundles
- Static HTML pre-rendering
- CSS extraction and minification
- Image optimization

### 3.2 Build Output

```
Route (app)
┌ ○ /
└ ○ /_not-found

○  (Static)  prerendered as static content
```

### 3.3 Type Checking

The build runs TypeScript type checking:
```bash
npm run build  # Runs type check as part of build
```

To run type check separately:
```bash
npx tsc --noEmit
```

---

## 4. Deployment Platforms

### 4.1 Vercel (Recommended)

**One-click deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Or via CLI:**
```bash
npm install -g vercel
vercel
```

**Environment Variables in Vercel:**
1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_API_URL` if using external API
3. Redeploy

**Vercel Configuration (`vercel.json`):**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### 4.2 Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = ".next"
```

### 4.3 Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

**Build and run:**
```bash
docker build -t tin12-pro .
docker run -p 3000:3000 tin12-pro
```

### 4.4 Traditional VPS (Nginx)

**Build:**
```bash
npm run build
```

**Serve with PM2:**
```bash
npm install -g pm2
pm2 start npm --name "tin12-pro" -- start
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name tin12-pro.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 5. Performance Optimization

### 5.1 Bundle Analysis

```bash
npm install @next/bundle-analyzer
```

**next.config.ts:**
```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
```

### 5.2 Image Optimization

- Use `next/image` for all images
- Specify width/height to prevent layout shift
- Use WebP format where supported

### 5.3 Font Optimization

- Use `next/font` for Google Fonts (already configured)
- Subset fonts to reduce load time

---

## 6. Security Considerations

### 6.1 MVP Security (localStorage)

Current security model:
- No sensitive data stored (no passwords, no PII)
- All data in localStorage is non-sensitive
- User role stored as simple string

### 6.2 Production Recommendations

For production with real user data:

1. **Authentication**
   - Implement Firebase Auth, Auth0, or NextAuth.js
   - Never store passwords in localStorage

2. **Data Backend**
   - Move from localStorage to PostgreSQL/MongoDB
   - Implement proper session management
   - Add rate limiting

3. **API Security**
   - Use environment variables for API keys
   - Implement CORS properly
   - Add CSRF protection

### 6.3 Lab Sandbox

- Lab previews run in sandboxed iframe
- `sandbox="allow-same-origin"` allows styling only
- No script execution in sandbox

---

## 7. Monitoring

### 7.1 Error Tracking (Future)

Recommended:
- Sentry.io for error tracking
- LogRocket for session replay

### 7.2 Analytics (Future)

- Google Analytics 4
- Vercel Analytics
- Custom event tracking for learning metrics

---

## 8. Troubleshooting

### 8.1 Build Failures

| Error | Solution |
|-------|----------|
| TypeScript errors | Run `npx tsc --noEmit` to see specific errors |
| Module not found | Delete `node_modules` and run `npm install` |
| Out of memory | Increase Node.js memory: `node --max-old-space-size=4096` |

### 8.2 Runtime Issues

| Issue | Solution |
|-------|---------|
| White screen | Check browser console for errors |
| localStorage full | Clear old data, quota is 5–10MB |
| Slow page load | Check network tab, optimize images |

---

_Last updated: May 2026_