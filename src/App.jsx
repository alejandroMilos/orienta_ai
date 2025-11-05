import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
    </div>
  )
}

export default App
