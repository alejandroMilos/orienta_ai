import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import './Hero.css'

const Hero = () => {
    const [currentWord, setCurrentWord] = useState(0)
    const words = ["Tus Opciones?"]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [words.length])

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

                <button className="cta-button pulse">
                    Descubre más información
                    <ChevronDown size={20} />
                </button>
            </div>

            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
            </div>
        </section>
    )
}

export default Hero