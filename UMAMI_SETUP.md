# Umami Analytics - Интеграция Завершена ✅

## ✅ **Что Сделано:**

### **1. Добавлен Umami скрипт**
Файл: `/src/layouts/Layout.astro`

```html
<!-- Umami Analytics -->
<script defer src="https://cloud.umami.is/script.js" data-website-id="561a8e15-bb1a-4134-af7a-36fafe7e4a8f"></script>
```

### **2. Настроены события в калькуляторе**
Файл: `/src/components/tools/SMSCharacterCounter.astro`

**События:**

#### **Event 1: SMS Calculated**
Триггер: При каждом вводе текста (с задержкой)

```javascript
umami.track('SMS Calculated', {
  encoding: 'GSM-7' | 'Unicode',
  messages: 1,              // количество SMS частей
  characters: 145           // количество символов
});
```

**Используй для:**
- Понимания популярности инструмента
- Анализа типов сообщений (GSM vs Unicode)
- Средней длины сообщений

---

#### **Event 2: SMS Optimized**
Триггер: При клике на кнопку "Optimize for GSM"

```javascript
umami.track('SMS Optimized', {
  originalLength: 150,
  optimizedLength: 148,
  charactersSaved: 2
});
```

**Используй для:**
- Оценки полезности функции оптимизации
- Определения среднего количества сэкономленных символов
- A/B тестов текста кнопки

---

#### **Event 3: CTA Clicked**
Триггер: При клике на "Send this SMS via SMSPM"

```javascript
umami.track('CTA Clicked', {
  source: 'sms-calculator',
  encoding: 'Unicode',
  messages: 2,
  hasText: true            // есть ли текст в калькуляторе
});
```

**Используй для:**
- Отслеживания конверсии инструмент → регистрация
- Понимания качества трафика
- A/B тестов CTA кнопки

---

## 📊 **Dashboard в Umami:**

### **Как посмотреть данные:**

1. Войди в https://cloud.umami.is
2. Выбери сайт "smspm.com"
3. Основные метрики:
   - **Pageviews** - просмотры страниц
   - **Visitors** - уникальные посетители
   - **Bounce rate** - показатель отказов
   - **Visit duration** - время на сайте

4. **Events** (нажми вкладку Events):
   - `SMS Calculated` - использование калькулятора
   - `SMS Optimized` - оптимизация текста
   - `CTA Clicked` - клики на регистрацию

### **Custom Properties:**

Для каждого события можешь посмотреть:
- `encoding` - тип кодировки (GSM-7 vs Unicode)
- `messages` - количество SMS частей
- `charactersSaved` - сколько символов сэкономлено
- `hasText` - был ли текст при клике на CTA

---

## 📈 **Ключевые Метрики для Мониторинга:**

### **1. Engagement Rate**
```
Engagement = (SMS Calculated events) / (Unique visitors)
```
**Цель:** > 50% (каждый второй посетитель использует калькулятор)

### **2. Optimization Rate**
```
Optimization Rate = (SMS Optimized) / (SMS Calculated)
```
**Цель:** > 5% (показывает полезность функции)

### **3. Conversion Rate**
```
Conversion = (CTA Clicked) / (Unique visitors)
```
**Цель:** > 2% (2 из 100 посетителей кликают на регистрацию)

### **4. Message Distribution**
- % GSM-7 сообщений
- % Unicode сообщений
- Средняя длина сообщения
- Среднее количество частей

---

## 🎯 **Goals (Цели):**

### **Настрой в Umami:**

1. **Tool Engagement** (Использование инструмента)
   - Event: `SMS Calculated`
   - Condition: Минимум 1 событие за сессию

2. **Registration Intent** (Намерение регистрации)
   - Event: `CTA Clicked`
   - Condition: Переход на `/app/register`

3. **Power User** (Активный пользователь)
   - Event: `SMS Calculated`
   - Condition: Больше 3 событий за сессию

---

## 🧪 **A/B Тесты (Ideas):**

### **1. CTA Button Text**
- Вариант A: "Send this SMS via SMSPM"
- Вариант B: "Try SMSPM for Free"
- Метрика: `CTA Clicked` conversion rate

### **2. Optimization Button Position**
- Вариант A: В warning box (текущий)
- Вариант B: Отдельная кнопка под текстом
- Метрика: `SMS Optimized` usage rate

### **3. Price Display**
- Вариант A: Показывать всегда
- Вариант B: Показывать только для >1 SMS
- Метрика: `CTA Clicked` с разными messages values

---

## 🔍 **Debugging Events:**

### **Проверка в браузере:**

1. Открой DevTools → Console
2. Введи текст в калькулятор
3. Выполни в консоли:
```javascript
// Проверить наличие Umami
typeof umami

// Ручная отправка test event
umami.track('test-event', { test: true })
```

4. Проверь Network → XHR → должны быть запросы к `cloud.umami.is`

### **Проверка в Dashboard:**

1. Открой Umami dashboard
2. Перейди в **Realtime** view
3. Используй калькулятор на сайте
4. События должны появиться в реалтайме (задержка ~5 сек)

---

## 📱 **Mobile Tracking:**

События работают на всех устройствах:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Chrome Android)
- ✅ Tablet

**Проверь мобильную версию:**
1. Открой сайт на телефоне
2. Используй калькулятор
3. Проверь в Dashboard → Devices

---

## 🚨 **Troubleshooting:**

### **События не приходят?**

1. **Проверь блокировщики:**
   - Ad blockers могут блокировать Umami
   - Попробуй в incognito mode

2. **Проверь консоль:**
```javascript
// Должен вернуть function
typeof umami
```

3. **Проверь Network:**
   - Должны быть POST запросы к `/api/send`
   - Status code: 200

4. **Проверь website ID:**
   - Убедись что ID правильный: `561a8e15-bb1a-4134-af7a-36fafe7e4a8f`

### **Много дубликатов событий?**

- Это нормально для `SMS Calculated` (каждый ввод текста)
- Umami автоматически группирует события в dashboard

---

## 🎓 **Best Practices:**

### **DO:**
- ✅ Отслеживай ключевые действия пользователей
- ✅ Используй descriptive properties
- ✅ Группируй связанные события
- ✅ Регулярно проверяй dashboard
- ✅ Настраивай alerts для важных метрик

### **DON'T:**
- ❌ Не трекай каждое движение мыши
- ❌ Не отправляй личные данные в events
- ❌ Не дублируй события
- ❌ Не игнорируй данные

---

## 📊 **Weekly Review Template:**

### **Каждую неделю проверяй:**

1. **Traffic:**
   - [ ] Pageviews по языкам
   - [ ] Unique visitors trend
   - [ ] Top traffic sources

2. **Engagement:**
   - [ ] SMS Calculated rate
   - [ ] Average messages per session
   - [ ] Optimization usage rate

3. **Conversions:**
   - [ ] CTA click rate
   - [ ] GSM vs Unicode distribution
   - [ ] Mobile vs Desktop usage

4. **Insights:**
   - [ ] Что работает хорошо?
   - [ ] Что нужно улучшить?
   - [ ] Какие A/B тесты запустить?

---

## 🎉 **Ready to Go!**

Umami Analytics полностью интегрирован и готов к использованию!

**Next Steps:**
1. ✅ Deploy обновленный код
2. ✅ Проверь работу событий в Realtime
3. ✅ Настрой goals в Umami dashboard
4. ✅ Подожди 7 дней для первых инсайтов
5. ✅ Начни оптимизацию на основе данных

**Dashboard:** https://cloud.umami.is

---

**Теперь ты видишь всё, что делают пользователи с калькулятором!** 📊✨
