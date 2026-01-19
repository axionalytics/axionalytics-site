# Axionalytics Website

Enterprise-grade data analytics and AI integration consulting website.

## 🚀 Quick Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files from this folder (maintaining structure)
3. Go to **Settings** → **Pages** → **Source**: Deploy from branch `main`
4. Your site will be live at `https://yourusername.github.io/repository-name/`

## 📁 File Structure

```
axionalytics/
├── index.html              # Homepage
├── datatransformation.html # Data services page
├── aitransformation.html   # AI services page
├── training.html           # Training courses page
├── about.html              # About/company page
├── contact.html            # Contact form page
├── css/
│   └── styles.css          # Unified stylesheet (edit once, updates all pages)
├── js/
│   └── main.js             # Unified JavaScript (edit once, updates all pages)
└── README.md               # This file
```

## ✏️ Before Going Live - Update These Placeholders

### 1. Booking Links
Search and replace `#BOOKING_LINK` with your Google Calendar appointment link:
```
https://calendar.google.com/calendar/appointments/YOUR_SCHEDULING_LINK
```

### 2. Social Media Links
Replace these placeholders with your actual URLs:
- `#LINKEDIN` → Your LinkedIn company page
- `#WHATSAPP` → Your WhatsApp business link (e.g., `https://wa.me/19562079368`)
- `#INSTAGRAM` → Your Instagram profile

### 3. Contact Form Integration
The contact form on `contact.html` needs a backend. Options:
- **Formspree**: Replace form action with `https://formspree.io/f/YOUR_FORM_ID`
- **Netlify Forms**: Add `netlify` attribute to form tag
- **Custom API**: Update the JavaScript in `main.js`

### 4. Images
Replace Unsplash placeholder URLs with your actual images.

## 🌐 Bilingual System (EN/ES)

The site supports English and Spanish. Language preference is saved in browser localStorage.

**How it works:**
- All text has `data-lang-en` and `data-lang-es` attributes
- CSS controls visibility based on `html.lang-es` class
- User preference persists across sessions

**To add/edit translations:**
```html
<span data-lang-en>English text</span>
<span data-lang-es>Spanish text</span>
```

## 🎨 Design System

**Colors** (defined in `css/styles.css` and Tailwind config):
- Primary Navy: `#1E3A5F`
- Secondary Blue: `#2563EB`
- Accent Orange: `#F97316`
- Success Green: `#10B981`
- Purple: `#8B5CF6`

**Fonts** (via Google Fonts):
- Headings: Plus Jakarta Sans
- Body: Inter

## 🔧 Making Changes

| To change... | Edit this file |
|--------------|----------------|
| Global styles | `css/styles.css` |
| Interactive features | `js/main.js` |
| Navigation/footer | All `.html` files (they share identical header/footer) |
| Page content | Individual `.html` file |
| Colors/fonts | Tailwind config in `<head>` + `css/styles.css` |

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Bilingual (EN/ES) with persistent toggle
- ✅ Accessible (ARIA labels, keyboard navigation, skip links)
- ✅ SEO optimized (meta tags, semantic HTML)
- ✅ Fast loading (external CSS/JS cached by browser)
- ✅ Smooth animations (scroll reveals, hover effects)
- ✅ Dark header with scroll effect

## 📄 License

© 2026 Axionalytics. All rights reserved.
