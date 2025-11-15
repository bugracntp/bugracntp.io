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

  // LocalStorage'dan açılan günleri yükle
  useEffect(() => {
    const saved = localStorage.getItem('advent-calendar-opened')
    if (saved) {
      const opened = JSON.parse(saved) as number[]
      setOpenedDays(new Set(opened))
    }
  }, [])

  // 24 günlük takvim oluştur
  useEffect(() => {
    const calendarDays: DayData[] = []
    for (let i = 1; i <= 24; i++) {
      const isOpen = openedDays.has(i) && (isDecember ? i <= currentDay : false)
      calendarDays.push({
        day: i,
        isOpen,
        content: `Gün ${i} sürprizi! 🎁`
      })
    }
    setDays(calendarDays)
  }, [openedDays, currentDay, isDecember])

  const handleDayClick = (day: number) => {
    // Sadece Aralık ayındaysa ve gün geçmişse veya bugünse açılabilir
    if (!isDecember) return
    if (day > currentDay) return

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

  return (
    <div className="advent-calendar">
      <div className="calendar-grid">
        {days.map((dayData) => (
          <CalendarDay
            key={dayData.day}
            day={dayData.day}
            isOpen={dayData.isOpen}
            content={dayData.content}
            isAvailable={isDecember && dayData.day <= currentDay}
            onClick={() => handleDayClick(dayData.day)}
          />
        ))}
      </div>
    </div>
  )
}

export default AdventCalendar

