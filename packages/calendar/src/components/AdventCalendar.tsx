import { useState, useEffect } from 'react'
import CalendarDay from './CalendarDay'
import './AdventCalendar.css'

interface DayData {
  day: number
  isOpen: boolean
  content: string
}

const AdventCalendar = () => {
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth() + 1 // 1-12 arası
  const isDecember = currentMonth === 12

  const [days, setDays] = useState<DayData[]>([])
  const [openedDays, setOpenedDays] = useState<Set<number>>(new Set())
  const [modalContent, setModalContent] = useState<string | null>(null)
  const [modalDay, setModalDay] = useState<number | null>(null)
  const [mediaType, setMediaType] = useState<'video' | 'image' | null>(null)

  // LocalStorage'dan açılan günleri yükle
  useEffect(() => {
    const saved = localStorage.getItem('advent-calendar-opened')
    if (saved) {
      const opened = JSON.parse(saved) as number[]
      setOpenedDays(new Set(opened))
    }
  }, [])

  // Advent calendar içerikleri
  const adventContents = [
    "🎄 İlk gün! Bu özel Noel sezonu boyunca seninle olmak çok güzel. Her gün seni daha çok seviyorum! ❤️",
    "⭐ Gözlerin yıldızlar kadar parlak. Seninle her an büyülü! ✨",
    "☕ Bugün birlikte sıcak bir kahve içelim mi? Sen yanımdayken her şey daha güzel! 💕",
    "🎁 En güzel hediye sensin. Hayatıma kattığın renk için teşekkürler! 🌈",
    "❄️ Kar taneleri kadar benzersizsin. Seninle her kış özel! ⛄",
    "🎵 Gülüşün benim en sevdiğim melodi. Her gün onu duymak istiyorum! 🎶",
    "🌟 Bir hafta oldu! Her gün seninle yeni bir macera. Seni seviyorum! 💖",
    "🕯️ Sen benim ışığımsın. Karanlık günlerde bile her şeyi aydınlatıyorsun! ✨",
    "🎨 Hayatım seninle renkli bir tablo oldu. Her fırça darbesi bir anı! 🖼️",
    "🍪 Seninle kurabiye yapma zamanı! Ama sen tatlılardan daha tatlısın! 🧁",
    "💝 On bir gün geçti, seni sevmem hiç değişmedi. Her gün daha da büyüyor! 💗",
    "🌙 İyi geceler demek istemiyorum çünkü her an seninle olmak istiyorum! 🌠",
    "📚 Sen benim en sevdiğim hikaye. Sonu hiç gelmesin istiyorum! 📖",
    "🎀 İki hafta! Seninle geçen her an bir hediye. Paketini açmayı dört gözle bekliyorum! 🎁",
    "🔥 Şömine başında seninle olmak... İşte gerçek sıcaklık! ❤️‍🔥",
    "🎪 Hayat seninle bir şenlik. Her gün yeni bir eğlence! 🎠",
    "🌺 Bir çiçek bahçesinde yürüyor gibi hissediyorum seninle. Her adımda güzellik! 🌸",
    "🎬 Seninle yaşadığım anlar en güzel film sahneleri! Başrol sensin! ⭐",
    "🧸 Sarılmak için bir sebep daha! Sıcak kucakların huzur veriyor! 🤗",
    "🌈 Yirmi gün! Her renk seninle daha canlı görünüyor. Hayatımın gökkuşağısın! 💕",
    "🎹 Kalbim senin için bir melodi çalıyor. Duydun mu? 💓",
    "🏔️ En yüksek dağlara tırmanırım senin için. Çünkü sen buna değersin! ⛰️",
    "✉️ Yarın Noel! Bu yıl en güzel hediye zaten yanımda - sensin! 💌",
    "🎅 Noel günü! Tüm dileklerim gerçek oldu çünkü sen varsın. Seni çok seviyorum! 🎄❤️🎁"
  ]

  // Bir günün açılabilir olup olmadığını kontrol et
  const isDayAvailable = (day: number): boolean => {
    // 1. gün her zaman açılabilir
    if (day === 1) return true
    // Diğer günler için: Sadece Aralık ayındaysa kontrol et
    if (!isDecember) return false
    // Gün geçmişse veya bugünse açılabilir
    return day <= currentDay
  }

  // 24 günlük takvim oluştur
  useEffect(() => {
    const calendarDays: DayData[] = []
    for (let i = 1; i <= 24; i++) {
      const isOpen = openedDays.has(i)
      calendarDays.push({
        day: i,
        isOpen,
        content: adventContents[i - 1]
      })
    }
    setDays(calendarDays)
  }, [openedDays, currentDay, isDecember])

  const handleDayClick = (day: number) => {
    const isAlreadyOpen = openedDays.has(day)

    // Eğer gün henüz açılmamışsa, aç ve kaydet
    if (!isAlreadyOpen) {
      // Tarih kontrolü: Sadece Aralık ayındaysa ve gün geçmişse veya bugünse açılabilir
      if (!isDayAvailable(day)) {
        return // Henüz açılamaz
      }

      const newOpenedDays = new Set(openedDays)
      newOpenedDays.add(day)
      setOpenedDays(newOpenedDays)
      localStorage.setItem('advent-calendar-opened', JSON.stringify(Array.from(newOpenedDays)))

      // Günleri güncelle
      setDays(prevDays =>
        prevDays.map(d =>
          d.day === day ? { ...d, isOpen: true } : d
        )
      )
    }

    // Açık olsun ya da olmasın, modalı göster
    setModalDay(day)
    setModalContent(adventContents[day - 1])
    // Medya tipini sıfırla, video önce denenecek
    setMediaType('video')
  }

  const closeModal = () => {
    setModalContent(null)
    setModalDay(null)
    setMediaType(null)
  }

  // Gün numarasına göre medya dosyası yolunu oluştur
  const getMediaPath = (day: number | null): { videoPath: string; imagePath: string } => {
    if (!day) return { videoPath: '', imagePath: '' }
    
    const videoPath = `${import.meta.env.BASE_URL}pictures/${day}.mp4`
    const imagePath = `${import.meta.env.BASE_URL}pictures/${day}.jpg`
    
    return { videoPath, imagePath }
  }

  // Aktif olan en son günü hesapla (pulse animasyonu için)
  const getLastActiveDay = (): number | null => {
    if (!isDecember) return null
    // Aralık ayındaysa, bugün veya en son açılabilir gün
    // Eğer bugün 24'ten büyükse, 24'ü döndür
    return currentDay <= 24 ? currentDay : 24
  }

  const lastActiveDay = getLastActiveDay()
  const mediaPaths = getMediaPath(modalDay)

  return (
    <div className="advent-calendar">
      <div className="calendar-grid">
        {/* Küçük kardan adamlar */}
        <div className="snowman-top">
          <div className="snowman-hat"></div>
        </div>
        <div className="snowman-top">
          <div className="snowman-hat"></div>
        </div>
        <div className="snowman-top">
          <div className="snowman-hat"></div>
        </div>
        
        {days.map((dayData) => (
          <CalendarDay
            key={dayData.day}
            day={dayData.day}
            isOpen={dayData.isOpen}
            content={dayData.content}
            isAvailable={isDayAvailable(dayData.day)}
            isLastActiveDay={lastActiveDay !== null && dayData.day === lastActiveDay && !dayData.isOpen}
            onClick={() => handleDayClick(dayData.day)}
          />
        ))}
      </div>

      {/* Popup Modal */}
      {modalContent && modalDay && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2 className="modal-title">Gün {modalDay}</h2>
            
            {/* Medya içeriği */}
            <div className="modal-media">
              {mediaType === 'video' ? (
                <video
                  className="modal-video"
                  src={mediaPaths.videoPath}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => {
                    // Video yüklenemezse resim dene
                    setMediaType('image')
                  }}
                >
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
              ) : mediaType === 'image' ? (
                <img
                  className="modal-image"
                  src={mediaPaths.imagePath}
                  alt={`Gün ${modalDay} görseli`}
                  onError={(e) => {
                    // Resim de yüklenemezse gizle
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              ) : null}
            </div>
            
            <div className="modal-message">{modalContent}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdventCalendar

