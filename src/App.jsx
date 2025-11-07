import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ChatbotSection from './components/ChatbotSection'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState('menu')
  const [initialMessage, setInitialMessage] = useState('')

  const handleViewChange = (view) => {
    setCurrentView(view)
    // Reiniciamos mensaje inicial al cambiar de vista
    if (view === 'menu') {
      setInitialMessage('')
    }
  }

  return (
    <div className="app">
      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      {currentView === 'menu' && <Hero setCurrentView={handleViewChange} setInitialMessage={setInitialMessage} /> }
      {currentView === 'chatbot' && <ChatbotSection initialMessage={initialMessage} setInitialMessage={setInitialMessage} /> }
    </div>
  )
}

export default App
