import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('menu')

  useEffect(() => {
    const sections = ['menu', 'info', 'chatbot']

    const observers = sections.map(sectionId => {
      const section = document.getElementById(sectionId)
      if (!section) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId)
            }
          })
        },
        {
          threshold: 0.5, // significa que estara 50% visible
          rootMargin: '-20% 0px -20% 0px' // Asignamos un margen ajustado
        }
      )

      observer.observe(section)
      return observer
    })

    return () => {
      observers.forEach(observer => observer && observer.disconnect())
    }
  }, [])

  return (
    <div className="app">
      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <section id='menu'>
        <Hero />
      </section>   
    </div>
  )
}

export default App
