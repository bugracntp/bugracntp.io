import { useEffect, useRef, useState } from 'react'
import AdventCalendar from './components/AdventCalendar'
import './App.css'

function App() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Ses ayarları
    audio.volume = 0.3
    audio.loop = true

    // Kullanıcı etkileşimi sonrası müziği çal
    const playMusic = async () => {
      if (isMuted) return // Eğer kapatılmışsa çalma
      try {
        await audio.play()
        setIsPlaying(true)
        console.log('Müzik çalıyor')
      } catch (error) {
        console.log('Müzik çalınamadı, kullanıcı etkileşimi bekleniyor:', error)
        setIsPlaying(false)
      }
    }

    // İlk yüklemede dene (sadece bir kez)
    if (!isMuted && !isPlaying) {
      playMusic()
    }

    // Kullanıcı etkileşimi için event listener ekle
    const handleUserInteraction = () => {
      if (!isPlaying && !isMuted) {
        playMusic()
      }
    }

    window.addEventListener('click', handleUserInteraction, { once: true })
    window.addEventListener('touchstart', handleUserInteraction, { once: true })
    window.addEventListener('keydown', handleUserInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleUserInteraction)
      window.removeEventListener('touchstart', handleUserInteraction)
      window.removeEventListener('keydown', handleUserInteraction)
    }
  }, []) // Sadece component mount olduğunda çalış

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    // Müzik çalıyorsa kapat
    if (!audio.paused && isPlaying) {
      audio.pause()
      setIsMuted(true)
      setIsPlaying(false)
      console.log('Müzik kapatıldı')
    } else {
      // Müziği aç
      try {
        await audio.play()
        setIsMuted(false)
        setIsPlaying(true)
        console.log('Müzik açıldı')
      } catch (error) {
        console.log('Müzik çalınamadı:', error)
        setIsMuted(true)
        setIsPlaying(false)
      }
    }
  }

  return (
    <div className="app">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music/IndianJingleBells.mp3`}
        preload="auto"
        onError={(e) => {
          console.error('Müzik dosyası yüklenemedi:', e)
        }}
        onLoadedData={() => {
          console.log('Müzik dosyası yüklendi')
        }}
      />
      <button 
        className="music-toggle-btn"
        onClick={toggleMusic}
        aria-label={isMuted ? 'Müziği aç' : 'Müziği kapat'}
        title={isMuted ? 'Müziği aç' : 'Müziği kapat'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      <header className="app-header">
        <span className="star-left">✨</span>
        <span className="star-right">⭐</span>
        <h1>🎄 Advent Calendar 2026 🎄</h1>
        <p>✨ Her gün yeni bir sürpriz keşfet! ✨</p>
      </header>
      <main>
        <AdventCalendar />
      </main>
    </div>
  )
}

export default App

