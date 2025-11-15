# 🎄 Advent Calendar

Buğra Çantepe'nin 2024 Advent Calendar uygulaması.

## Özellikler

- 📅 24 günlük interaktif advent calendar
- 🎁 Her gün için özel sürpriz içerik
- 💾 LocalStorage ile açılan günlerin kaydı
- 📱 Responsive tasarım
- 🎨 Modern ve renkli UI

## Geliştirme

### Bağımlılıkları Yükle

```bash
npm install
```

### Development Server

```bash
npm run dev
```

veya root dizinden:

```bash
npm run dev:calendar
```

### Build

```bash
npm run build
```

Build çıktısı `../../dist/calendar/` dizinine oluşturulur.

## Deployment

Uygulama GitHub Pages'te `/bugracntp.io/calendar/` path'i altında yayınlanır.

Tüm projeleri build etmek için:

```bash
npm run build:all
```

## Yapı

```
calendar/
├── src/
│   ├── components/
│   │   ├── AdventCalendar.tsx    # Ana calendar component
│   │   ├── CalendarDay.tsx       # Tek bir gün component'i
│   │   ├── AdventCalendar.css
│   │   └── CalendarDay.css
│   ├── styles/
│   │   └── global.css            # Global stiller
│   ├── App.tsx                   # Ana uygulama component'i
│   └── main.tsx                  # Entry point
├── public/                       # Static dosyalar
├── index.html
├── package.json
├── vite.config.js
└── tsconfig.json
```

## Nasıl Çalışır?

1. Uygulama Aralık ayını kontrol eder
2. Sadece geçmiş veya bugün olan günler açılabilir
3. Açılan günler localStorage'da saklanır
4. Her gün için özel içerik gösterilir

