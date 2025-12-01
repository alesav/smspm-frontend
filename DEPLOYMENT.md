# SMSPM Frontend Deployment Guide

## 🚀 Cloudflare Pages Deployment

### Quick Deploy

1. **Connect Repository**:
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your Git repository

2. **Build Settings**:
   ```
   Framework preset: Astro
   Build command: yarn build
   Build output directory: dist
   Root directory: (leave empty)
   ```

3. **Environment Variables**:
   ```
   NODE_VERSION=18
   YARN_VERSION=1.22.22
   ```

4. **Deploy**:
   - Click "Save and Deploy"
   - Wait for build completion
   - Your site will be available at `https://your-project.pages.dev`

### Custom Domain Setup

1. **Add Custom Domain**:
   - In Cloudflare Pages project settings
   - Go to "Custom domains"
   - Add `smspm.com` and `www.smspm.com`

2. **DNS Configuration**:
   ```
   Type: CNAME
   Name: www
   Target: your-project.pages.dev

   Type: CNAME  
   Name: @
   Target: your-project.pages.dev
   ```

### Production Optimizations

1. **Security Headers** (add to `_headers` file):
   ```
   /*
     X-Frame-Options: DENY
     X-Content-Type-Options: nosniff
     X-XSS-Protection: 1; mode=block
     Referrer-Policy: strict-origin-when-cross-origin
     Permissions-Policy: camera=(), microphone=(), geolocation=()
   ```

2. **Cache Control** (add to `_headers` file):
   ```
   /assets/*
     Cache-Control: public, max-age=31536000, immutable
   
   /*.js
     Cache-Control: public, max-age=31536000, immutable
   
   /*.css  
     Cache-Control: public, max-age=31536000, immutable
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'yarn'
    
    - name: Install dependencies
      run: yarn install --frozen-lockfile
    
    - name: Build
      run: yarn build
    
    - name: Deploy to Cloudflare Pages
      uses: cloudflare/pages-action@v1
      with:
        apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        projectName: smspm-frontend
        directory: dist
```

### Manual Deployment

```bash
# Install Wrangler CLI
npm install -g wrangler

# Authenticate
wrangler login

# Deploy
wrangler pages publish dist --project-name=smspm-frontend
```

## 📊 Performance Monitoring

### Core Web Vitals

Monitor these metrics in Cloudflare Analytics:
- **LCP** (Largest Contentful Paint) < 2.5s
- **FID** (First Input Delay) < 100ms  
- **CLS** (Cumulative Layout Shift) < 0.1

### Lighthouse Score Targets

- **Performance**: > 95
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 95

### Optimization Checklist

- ✅ Static site generation (Astro)
- ✅ Image optimization configured
- ✅ CSS/JS minification  
- ✅ Gzip compression (Cloudflare)
- ✅ CDN delivery (Cloudflare)
- ✅ Critical CSS inlined
- ✅ Font optimization (preconnect)

## 🔧 Troubleshooting

### Common Build Issues

1. **Yarn Installation Failures**:
   ```bash
   # Clear cache
   yarn cache clean
   rm -rf node_modules yarn.lock
   yarn install
   ```

2. **TailwindCSS Build Errors**:
   - Ensure `@tailwindcss/postcss` is installed
   - Check `postcss.config.mjs` configuration
   - Verify Tailwind classes are valid

3. **TypeScript Errors**:
   ```bash
   # Type check without build
   yarn check
   
   # Fix common issues
   yarn astro sync
   ```

### Runtime Issues

1. **Dark Mode Not Working**:
   - Check localStorage is accessible
   - Verify theme toggle script loads
   - Check CSS custom properties

2. **Images Not Loading**:
   - Verify image paths are correct
   - Check Cloudflare image settings
   - Ensure images are in `public/` folder

### Performance Issues

1. **Slow Load Times**:
   - Enable Cloudflare caching
   - Optimize images
   - Check for render-blocking resources

2. **Large Bundle Sizes**:
   - Review unused dependencies
   - Check for duplicate code
   - Use dynamic imports where possible

## 📝 Deployment Checklist

### Pre-Deployment

- [ ] Build succeeds locally (`yarn build`)
- [ ] All pages render correctly
- [ ] Dark/light themes work
- [ ] Mobile responsiveness tested
- [ ] SEO meta tags configured
- [ ] Performance optimized

### Post-Deployment

- [ ] Site loads at custom domain
- [ ] SSL certificate active
- [ ] All navigation works
- [ ] Form submissions functional
- [ ] Analytics tracking setup
- [ ] Error monitoring configured

### Monitoring Setup

1. **Cloudflare Analytics**:
   - Enable Web Analytics
   - Set up custom events
   - Monitor Core Web Vitals

2. **Error Tracking**:
   - Optional: Sentry integration
   - Monitor JavaScript errors
   - Track failed requests

## 🔗 Resources

- [Astro Documentation](https://docs.astro.build/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [TailwindCSS v4 Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Need help with deployment? Check the main README.md or contact the development team.
