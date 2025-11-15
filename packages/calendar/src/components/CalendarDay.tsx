import './CalendarDay.css'

interface CalendarDayProps {
  day: number
  isOpen: boolean
  content: string
  isAvailable: boolean
  isLastActiveDay?: boolean
  onClick: () => void
}

const CalendarDay = ({ day, isOpen, content, isAvailable, isLastActiveDay, onClick }: CalendarDayProps) => {
  const canOpen = isAvailable && !isOpen
  const isClickable = isAvailable || isOpen // Açık olanlar da tıklanabilir

  return (
    <div
      className={`calendar-day-wrapper ${isOpen ? 'open' : ''} ${isLastActiveDay ? 'last-active-day' : ''} ${isClickable ? 'clickable' : ''}`}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={isOpen ? `Gün ${day} açıldı - içeriği görmek için tıklayın` : canOpen ? `Gün ${day}'i aç` : `Gün ${day} henüz açılamaz`}
    >
      <div className={`calendar-day ${canOpen ? 'available' : ''} ${!isAvailable ? 'locked' : ''}`}>
        {/* Kar birikintileri - üst */}
        <div className="snow-on-top">
          <div className="snow-pile" style={{ left: '15%', width: '35px', height: '12px' }}></div>
          <div className="snow-pile" style={{ left: '50%', width: '45px', height: '14px' }}></div>
          <div className="snow-pile" style={{ left: '75%', width: '32px', height: '11px' }}></div>
          <div className="icicle" style={{ left: '25%', borderTopWidth: '18px' }}></div>
          <div className="icicle" style={{ left: '60%', borderTopWidth: '15px' }}></div>
          <div className="icicle" style={{ left: '85%', borderTopWidth: '20px' }}></div>
        </div>

        {/* Üst kenar Noel ışıkları */}
        <div className="christmas-lights-top">
          <div className="light" style={{ left: '15%', '--light-color': '#ff0000' } as React.CSSProperties}></div>
          <div className="light" style={{ left: '35%', '--light-color': '#00ff00' } as React.CSSProperties}></div>
          <div className="light" style={{ left: '55%', '--light-color': '#ffff00' } as React.CSSProperties}></div>
          <div className="light" style={{ left: '75%', '--light-color': '#0000ff' } as React.CSSProperties}></div>
        </div>

        {/* Pencere eşiği */}
        <div className="window-sill">
          {/* Eşik üstü kar */}
          <div className="sill-snow-pile" style={{ left: '20%', width: '25px', height: '8px' }}></div>
          <div className="sill-snow-pile" style={{ left: '55%', width: '28px', height: '9px' }}></div>
          <div className="sill-icicle" style={{ left: '35%', borderTopWidth: '12px' }}></div>
          <div className="sill-icicle" style={{ left: '70%', borderTopWidth: '10px' }}></div>
        </div>

        {/* Eşik altı ışıklar */}
        <div className="sill-lights-bottom">
          <div className="sill-bulb" style={{ left: '20%', '--bulb-color': '#ff0000' } as React.CSSProperties}></div>
          <div className="sill-bulb" style={{ left: '45%', '--bulb-color': '#00ff00' } as React.CSSProperties}></div>
          <div className="sill-bulb" style={{ left: '70%', '--bulb-color': '#ffff00' } as React.CSSProperties}></div>
        </div>

        {/* Kapı çerçevesi */}
        <div className="door-frame"></div>

        {/* Pencere camı - 4 bölmeli */}
        <div className="window-glass-panes">
          <div className="glass-pane"></div>
          <div className="glass-pane"></div>
          <div className="glass-pane"></div>
          <div className="glass-pane"></div>
        </div>

        {/* Pencere içi ışıklar */}
        <div className="indoor-string-lights">
          <div className="indoor-bulb" style={{ left: '25%', top: '30%', '--bulb-color': '#ff00ff' } as React.CSSProperties}></div>
          <div className="indoor-bulb" style={{ left: '65%', top: '50%', '--bulb-color': '#00ffff' } as React.CSSProperties}></div>
        </div>

        {/* Sol kapı */}
        <div className="door door-left">
          <div className="door-panel">
            <div className="day-number">{day}</div>
          </div>
        </div>

        {/* Sağ kapı */}
        <div className="door door-right">
          <div className="door-panel">
            <div className="day-number">{day}</div>
          </div>
        </div>

        {/* Gün görseli - window-scenery dışında */}
        <img 
          src={`${import.meta.env.BASE_URL}images/${day}.jpg`}
          alt={`Gün ${day} görseli`}
          className="day-image"
          onError={(e) => {
            console.error(`Görsel yüklenemedi: ${import.meta.env.BASE_URL}images/${day}.jpg`);
            (e.target as HTMLImageElement).style.display = 'none';
          }}
          onLoad={(e) => {
            console.log(`Görsel yüklendi: ${import.meta.env.BASE_URL}images/${day}.jpg`);
            // Görsel yüklendiğinde opacity'yi ayarla
            const img = e.target as HTMLImageElement;
            if (isOpen) {
              img.style.opacity = '1';
              img.style.visibility = 'visible';
              img.style.zIndex = '300';
            }
          }}
        />
      </div>
    </div>
  )
}

export default CalendarDay

