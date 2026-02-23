# 🚀 Deployment Checklist - SMS Calculator + Umami

## ✅ **Pre-Deployment:**

- [x] Umami скрипт добавлен в Layout.astro
- [x] События настроены в SMSCharacterCounter.astro
- [x] 8 страниц инструмента созданы на всех языках
- [x] SEO метаданные настроены
- [x] Hreflang теги добавлены
- [x] Analytics события протестированы локально

## 📦 **Build & Test:**

```bash
# 1. Установи зависимости (если еще не установлены)
cd /Users/alesav/Dev/smspm/smspm-frontend
npm install

# 2. Build проекта
npm run build
# или
astro build

# 3. Проверь build output
ls -la dist/

# 4. Preview локально
npm run preview
# или
astro preview
```

## 🧪 **Testing Checklist:**

### **Local Testing:**
- [ ] Открой http://localhost:4321/en/tools/sms-character-counter
- [ ] Введи текст в калькулятор
- [ ] Проверь подсчет символов
- [ ] Проверь сегментацию (попробуй 160+, 320+ символов)
- [ ] Тест Unicode (добавь эмодзи 😊)
- [ ] Тест extended chars (€, [, ], {, }, |)
- [ ] Клик на "Optimize" button
- [ ] Клик на "Send this SMS via SMSPM" CTA
- [ ] Проверь другие языки (/ru, /et, /es, /de, /fr, /lv, /lt)

### **Umami Events Testing:**
```javascript
// Открой DevTools → Console
// Проверь наличие Umami
typeof umami  // должно вернуть "function"

// Ручная отправка test event
umami.track('test-event', { deployed: true })
```

- [ ] Проверь Network → XHR → запросы к cloud.umami.is
- [ ] Статус: 200 OK
- [ ] Payload содержит event name и properties

## 🌐 **Deploy:**

### **Option 1: Vercel** (рекомендуется для Astro)
```bash
# Установи Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Option 2: Netlify**
```bash
# Установи Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### **Option 3: Cloudflare Pages**
```bash
# Build уже готов в dist/
# Загрузи dist/ через Cloudflare Dashboard
```

### **Option 4: Manual Deploy**
```bash
# Upload dist/ folder to your server
# Configure web server (nginx/apache) to serve from dist/
```

## 🔍 **Post-Deployment Verification:**

### **1. Check Pages Load:**
- [ ] https://smspm.com/en/tools/sms-character-counter
- [ ] https://smspm.com/ru/tools/sms-character-counter
- [ ] https://smspm.com/et/tools/sms-character-counter
- [ ] Все 8 языков доступны

### **2. Check Analytics:**
- [ ] Открой https://cloud.umami.is
- [ ] Выбери "smspm.com" website
- [ ] Перейди в **Realtime** view
- [ ] Используй калькулятор на production сайте
- [ ] События появляются в realtime (задержка ~5-10 сек)

### **3. Check Events in Dashboard:**
```
Events tab должен показывать:
- SMS Calculated
- SMS Optimized (после клика на optimize)
- CTA Clicked (после клика на CTA)
```

### **4. Check Mobile:**
- [ ] Открой на мобильном устройстве
- [ ] Калькулятор работает
- [ ] CTA кнопка кликабельна
- [ ] События отправляются

### **5. Check SEO:**
```bash
# Проверь meta tags
curl -I https://smspm.com/en/tools/sms-character-counter

# Должны быть:
# - Title
# - Description
# - Canonical URL
# - Hreflang tags
```

## 📊 **Monitoring (First Week):**

### **Day 1:**
- [ ] Проверь работу в production
- [ ] Убедись что события приходят
- [ ] Нет JavaScript errors в консоли

### **Day 3:**
- [ ] Проверь основные метрики:
  - Pageviews
  - Unique visitors
  - Bounce rate
  - Event counts

### **Day 7:**
- [ ] Первый анализ данных:
  - Engagement rate (SMS Calculated / Visitors)
  - Optimization rate (SMS Optimized / SMS Calculated)
  - Conversion rate (CTA Clicked / Visitors)
  - GSM vs Unicode distribution

## 🐛 **Common Issues & Solutions:**

### **Issue 1: Events не приходят**
```
Solution:
1. Проверь Console на ошибки
2. Убедись что typeof umami !== 'undefined'
3. Проверь Network → должны быть POST к /api/send
4. Попробуй в incognito (может быть ad blocker)
```

### **Issue 2: Калькулятор не считает**
```
Solution:
1. Проверь Console на JS errors
2. Убедись что pricelist.json доступен
3. Проверь что все утилиты импортированы
```

### **Issue 3: CTA не работает**
```
Solution:
1. Проверь что ссылка ведет на правильный URL
2. Убедись что event отправляется перед redirect
3. Проверь что кнопка не заблокирована CSS
```

### **Issue 4: 404 на /tools/sms-character-counter**
```
Solution:
1. Проверь что build содержит все страницы:
   ls -la dist/en/tools/
2. Убедись что routes настроены в web server
3. Перезапусти deployment
```

## 🎯 **Success Metrics (Week 1):**

**Minimum Viable Success:**
- [ ] 50+ unique visitors
- [ ] 30+ SMS Calculated events
- [ ] 2+ CTA Clicked events
- [ ] 0 JavaScript errors
- [ ] < 3s page load time

**Good Success:**
- [ ] 200+ unique visitors
- [ ] 100+ SMS Calculated events
- [ ] 10+ CTA Clicked events
- [ ] 50%+ engagement rate

**Excellent Success:**
- [ ] 500+ unique visitors
- [ ] 300+ SMS Calculated events
- [ ] 25+ CTA Clicked events
- [ ] 60%+ engagement rate
- [ ] 5%+ conversion rate

## 📈 **Next Steps After Launch:**

### **Week 1:**
- [ ] Monitor analytics daily
- [ ] Fix any reported bugs
- [ ] Gather user feedback

### **Week 2:**
- [ ] Analyze first week data
- [ ] Identify improvement opportunities
- [ ] Plan A/B tests

### **Month 1:**
- [ ] Evaluate tool performance
- [ ] Decide on next tool to build
- [ ] Optimize based on data

## 🛠️ **Quick Commands:**

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check build output
ls -la dist/en/tools/

# Test Umami events
open https://cloud.umami.is

# Regenerate tool pages
node scripts/generate-tool-pages.mjs
```

---

## ✅ **READY TO DEPLOY!**

Все компоненты готовы:
- ✅ Калькулятор
- ✅ 8 локализованных страниц
- ✅ SEO оптимизация
- ✅ Umami аналитика
- ✅ CTA интеграция

**Build и deploy прямо сейчас!** 🚀

После deployment проверь в realtime:
👉 https://cloud.umami.is

---

**Need help?** Все документы готовы:
- `/SMS_CALCULATOR_README.md` - полная документация
- `/UMAMI_SETUP.md` - гайд по Umami
- `/ANALYTICS_GUIDE.md` - общий гайд по аналитике
