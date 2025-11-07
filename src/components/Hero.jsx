import { useState, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import './Hero.css'

const Hero = ({ setCurrentView, setInitialMessage }) => {
    const [currentWord, setCurrentWord] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const words = ["Tus Opciones?"]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [words.length])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchValue.trim()) {
            setInitialMessage(searchValue)
            setCurrentView('chatbot')
            console.log("Búsqueda realizada:", searchValue)
        }
    }

    return (
        <section className="hero">
            <div className="hero-content">
                <div className="question-section fade-in-up">
                    <h2 className="question-line">
                        ¿Elegirías Igual Si
                    </h2>
                    <h2 className="question-line">
                        Conocieras <span className="highlight-todas">TODAS</span>
                    </h2>
                    <h2 className="question-line options-text">
                        {words[currentWord]}
                    </h2>
                </div>

                <div className="main-message fade-in-up">
                    <h3>
                        Explora Tu Futuro Con <b>ORIENTA.AI</b> Y Encuentra La Carrera Que Realmente Te Apasiona.
                    </h3>
                </div>

                <form onSubmit={handleSearch} className="search-container fade-in-up">
                    <div className="search-input-wrapper">
                        <Search size={20} className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="¿Buscas más información?"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="search-input"
                        />
                        <button type='submit' className="search-button">
                            <ChevronDown size={20} />
                        </button>
                    </div>
                </form>
            </div>

            <div className="floating-images">
                <img 
                    src="/img_izq.png" 
                    alt="Decoracion1" 
                    className="floating-image imagen-1"
                />
                <img 
                    src="/img_der.png" 
                    alt="Decoracion2" 
                    className="floating-image imagen-2"
                />
            </div>
        </section>
    )
}

export default Hero