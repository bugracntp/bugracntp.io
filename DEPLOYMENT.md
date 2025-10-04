# GitHub Pages Deployment Rehberi

Bu proje GitHub Pages'te otomatik olarak deploy edilecek şekilde konfigüre edilmiştir.

## Otomatik Deployment (Önerilen)

### 1. GitHub Repository Ayarları
1. GitHub repository'nizde **Settings** sekmesine gidin
2. Sol menüden **Pages** seçin
3. **Source** olarak **GitHub Actions** seçin

### 2. Deployment
- `main` branch'e her push yaptığınızda otomatik olarak deploy edilecektir
- GitHub Actions sekmesinden deployment durumunu takip edebilirsiniz

## Manuel Deployment

### 1. Dependencies Yükleme
```bash
npm install
```

### 2. Build ve Deploy
```bash
npm run deploy
```

## Site URL'i
Siteniz şu adreste yayınlanacak:
`https://[github-username].github.io/bugracntp.io/`

## Önemli Notlar

- Vite config'te `base: '/bugracntp.io/'` ayarı yapılmıştır
- Bu ayar repository adınızla eşleşmelidir
- Eğer repository adınızı değiştirirseniz, `packages/portfolio/vite.config.js` dosyasındaki base path'i güncelleyin

## Sorun Giderme

### Build Hatası
- `npm run build:portfolio` komutuyla build'i test edin
- Console'da hata mesajlarını kontrol edin

### Deployment Hatası
- GitHub Actions sekmesinden workflow loglarını kontrol edin
- Repository ayarlarında Pages konfigürasyonunu kontrol edin

### Site Açılmıyor
- URL'in doğru olduğundan emin olun
- GitHub Pages'in aktif olduğunu kontrol edin
- Birkaç dakika bekleyin (deployment zaman alabilir)
