import './CalendarDay.css'

interface CalendarDayProps {
  day: number
  isOpen: boolean
  content: string
  isAvailable: boolean
  onClick: () => void
}

const CalendarDay = ({ day, isOpen, content, isAvailable, onClick }: CalendarDayProps) => {
  const canOpen = isAvailable && !isOpen

  return (
    <div
      className={`calendar-day ${isOpen ? 'open' : ''} ${canOpen ? 'available' : ''} ${!isAvailable ? 'locked' : ''}`}
      onClick={canOpen ? onClick : undefined}
      role={canOpen ? 'button' : undefined}
      tabIndex={canOpen ? 0 : undefined}
      onKeyDown={(e) => {
        if (canOpen && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={isOpen ? `Gün ${day} açıldı` : canOpen ? `Gün ${day}'i aç` : `Gün ${day} henüz açılamaz`}
    >
      <div className="day-number">{day}</div>
      {isOpen && (
        <div className="day-content">
          <div className="day-content-inner">{content}</div>
        </div>
      )}
      {!isOpen && canOpen && (
        <div className="day-hint">🎁</div>
      )}
    </div>
  )
}

export default CalendarDay

