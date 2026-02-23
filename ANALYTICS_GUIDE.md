# Analytics Integration Guide

## **Рекомендуемые решения:**

### **1. Plausible Analytics** ⭐ (Рекомендуется)

**Почему Plausible:**
- ✅ Privacy-friendly (GDPR compliant без cookie consent)
- ✅ Легкий скрипт (~1KB)
- ✅ Простая настройка
- ✅ Красивый dashboard
- ✅ Event tracking встроен
- ✅ €9/месяц за 10K pageviews

**Установка:**

1. Зарегистрируйтесь на https://plausible.io
2. Добавьте в `Layout.astro` перед `</head>`:

```html
<script defer data-domain="smspm.com" src="https://plausible.io/js/script.js"></script>
```

3. События уже настроены в компоненте:
```javascript
window.plausible('SMS Calculated', { 
  props: { encoding: 'GSM-7', messages: 2 } 
})
window.plausible('SMS Optimized')
window.plausible('CTA Clicked', { 
  props: { source: 'sms-calculator' } 
})
```

**Custom Events в Plausible:**
- Включите "Enhanced measurements" в настройках
- Все события появятся автоматически

---

### **2. Umami** (Бесплатная альтернатива)

**Почему Umami:**
- ✅ Open-source
- ✅ Self-hosted (полный контроль)
- ✅ Privacy-friendly
- ✅ Бесплатно

**Установка:**

1. Deploy на Vercel/Railway: https://umami.is/docs/install
2. Добавьте скрипт:

```html
<script defer src="https://your-umami.vercel.app/script.js" data-website-id="your-id"></script>
```

3. Включите event tracking в `SMSCharacterCounter.astro`:

```javascript
if (window.umami) {
  window.umami.track('SMS Calculated', { 
    encoding: analysis.encoding, 
    messages: analysis.msgCount 
  });
}
```

---

### **3. Google Analytics 4**

**Установка:**

1. Создайте GA4 property
2. Добавьте в `Layout.astro`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

3. Обновите события в `SMSCharacterCounter.astro`:

```javascript
// Замените window.plausible на gtag
if (typeof gtag !== 'undefined') {
  gtag('event', 'sms_calculated', {
    encoding: analysis.encoding,
    message_count: analysis.msgCount,
    event_category: 'tools',
    event_label: 'sms-calculator'
  });
}
```

**Для Cookie Consent (GDPR):**
Добавьте CookieYes или Osano для управления согласием.

---

## **Что отслеживать:**

### **Pageviews (автоматически):**
- `/en/tools/sms-character-counter`
- `/ru/tools/sms-character-counter`
- и т.д. для всех 8 языков

### **Custom Events (уже настроены):**

1. **SMS Calculated**
   - Когда: При каждом вводе текста
   - Props: `encoding`, `messages`
   - Цель: Понять, какой тип сообщений чаще используется

2. **SMS Optimized**
   - Когда: При клике на кнопку "Optimize for GSM"
   - Цель: Оценить полезность функции оптимизации

3. **CTA Clicked**
   - Когда: При клике на "Send this SMS via SMSPM"
   - Props: `source: 'sms-calculator'`
   - Цель: Отследить конверсию в регистрацию

### **Conversion Goals:**

Создайте в аналитике:
1. **Tool Usage** = SMS Calculated event (минимум 1 раз)
2. **Registration Started** = CTA Clicked → переход на /app/register
3. **Registration Completed** = форма регистрации отправлена

---

## **Метрики для мониторинга:**

### **Трафик:**
- Pageviews по языкам
- Unique visitors
- Traffic sources (organic, direct, referral)
- Top landing pages

### **Engagement:**
- Average calculations per session
- Bounce rate
- Time on page
- Optimization usage rate (SMS Optimized / SMS Calculated)

### **Conversions:**
- CTA click rate
- Calculator → Registration conversion
- Registration → First SMS sent

---

## **SEO Мониторинг:**

### **Google Search Console:**
1. Добавьте сайт: https://search.google.com/search-console
2. Отслеживайте:
   - Impressions для ключевых слов
   - Click-through rate (CTR)
   - Average position
   - Index coverage

### **Целевые Keywords:**
- sms character counter
- sms length calculator
- gsm unicode checker
- sms cost calculator
- message segment calculator

### **Ожидаемые результаты:**
- Месяц 1-2: Индексация страниц
- Месяц 3-4: Начало органического трафика
- Месяц 6+: 100-500 посетителей/месяц на инструмент

---

## **Quick Install (Plausible):**

```bash
# 1. Зарегистрируйтесь
https://plausible.io/register

# 2. Добавьте домен smspm.com

# 3. Добавьте в Layout.astro:
```

```html
<!-- src/layouts/Layout.astro -->
<head>
  <!-- ... existing meta tags ... -->
  
  <!-- Plausible Analytics -->
  <script defer data-domain="smspm.com" src="https://plausible.io/js/script.js"></script>
</head>
```

```bash
# 4. Rebuild и deploy
npm run build
```

**Готово!** 🎉

Все события уже настроены в компоненте калькулятора. 
Plausible автоматически подхватит их и покажет в dashboard.

---

## **Проверка работы:**

1. Откройте DevTools → Network
2. Загрузите страницу инструмента
3. Проверьте запрос к `plausible.io` или `google-analytics.com`
4. Введите текст в калькулятор
5. В Network должны появиться POST запросы с событиями

**Plausible Test:**
```javascript
// В консоли браузера:
window.plausible('test-event')
// Проверьте в dashboard через 5 минут
```

---

**Выбирайте решение и внедряйте!** 🚀
