# GitHub Pages Deployment Rehberi

Bu proje GitHub Pages'te otomatik olarak deploy edilecek şekilde konfigüre edilmiştir.

## 📦 Projeler

Bu monorepo aşağıdaki projeleri içerir:

- **Portfolio**: Ana portfolio sitesi
- **Calendar**: Advent Calendar uygulaması

## 🚀 Otomatik Deployment (Önerilen)

### 1. GitHub Repository Ayarları
1. GitHub repository'nizde **Settings** sekmesine gidin
2. Sol menüden **Pages** seçin
3. **Source** olarak **GitHub Actions** seçin

### 2. Deployment
- `main` branch'e her push yaptığınızda otomatik olarak deploy edilecektir
- GitHub Actions sekmesinden deployment durumunu takip edebilirsiniz
- Tüm projeler (portfolio + calendar) birlikte deploy edilir

## 📝 Manuel Deployment

### 1. Dependencies Yükleme
```bash
npm install
```

### 2. Build ve Deploy
```bash
npm run deploy
```

Bu komut:
- Tüm projeleri build eder (`build:all`)
- `dist/` klasörüne çıktıları oluşturur
- GitHub Pages'e deploy eder

### Tek Bir Projeyi Build Etme
```bash
npm run build:portfolio  # Sadece portfolio
npm run build:calendar   # Sadece calendar
npm run build:all        # Tüm projeler
```

## 🌐 Site URL'leri

Projeleriniz şu adreslerde yayınlanacak:

- **Portfolio**: `https://[github-username].github.io/bugracntp.io/`
- **Calendar**: `https://[github-username].github.io/bugracntp.io/calendar/`

## ⚙️ Önemli Notlar

### Base Path Ayarları
- Portfolio: `base: '/bugracntp.io/'` (`packages/portfolio/vite.config.js`)
- Calendar: `base: '/bugracntp.io/calendar/'` (`packages/calendar/vite.config.js`)

### Build Çıktıları
- Portfolio: `dist/` (ana dizin)
- Calendar: `dist/calendar/` (alt dizin)

### Repository Adı Değişikliği
Eğer repository adınızı değiştirirseniz:
1. `packages/portfolio/vite.config.js` dosyasındaki `base` path'i güncelleyin
2. `packages/calendar/vite.config.js` dosyasındaki `base` path'i güncelleyin

## 🔧 Sorun Giderme

### Build Hatası
```bash
# Build'i test edin
npm run build:all

# Tek tek test edin
npm run build:portfolio
npm run build:calendar
```
- Console'da hata mesajlarını kontrol edin
- `dist/` klasörünün içeriğini kontrol edin

### Deployment Hatası
- GitHub Actions sekmesinden workflow loglarını kontrol edin
- Repository ayarlarında Pages konfigürasyonunu kontrol edin
- GitHub Pages'in **Source** olarak **GitHub Actions** seçildiğinden emin olun

### Site Açılmıyor
- URL'in doğru olduğundan emin olun:
  - Portfolio: `/bugracntp.io/`
  - Calendar: `/bugracntp.io/calendar/`
- GitHub Pages'in aktif olduğunu kontrol edin
- Birkaç dakika bekleyin (deployment zaman alabilir)
- Browser cache'ini temizleyin (Ctrl+Shift+R veya Cmd+Shift+R)

### Calendar Sayfası 404 Veriyor
- `dist/calendar/` klasörünün oluşturulduğundan emin olun
- `npm run build:all` komutunu çalıştırın
- Base path'in doğru olduğunu kontrol edin (`/bugracntp.io/calendar/`)

## 📋 Deployment Checklist

Deploy etmeden önce:
- [ ] Tüm değişiklikler commit edildi
- [ ] `npm run build:all` başarıyla çalıştı
- [ ] `dist/` klasöründe hem portfolio hem calendar var
- [ ] GitHub Pages ayarları doğru yapılandırıldı
- [ ] GitHub Actions workflow'u aktif
