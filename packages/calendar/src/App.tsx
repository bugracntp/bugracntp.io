import AdventCalendar from './components/AdventCalendar'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎄 Advent Calendar 2024</h1>
        <p>Her gün yeni bir sürpriz keşfet!</p>
      </header>
      <main>
        <AdventCalendar />
      </main>
    </div>
  )
}

export default App

