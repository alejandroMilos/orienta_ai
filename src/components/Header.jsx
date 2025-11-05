import { Menu, X, User } from 'lucide-react'
import './Header.css'

const Header = ({ menuOpen, setMenuOpen, activeSection, setActiveSection }) => {
    const handleNavClick = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
            setActiveSection(sectionId)
        }
        // Cerrar menú solo en móviles
        if (window.innerWidth <= 768) {
            setMenuOpen(false)
        }
    }

    const handleLogoClick = () => {
        const menuSection = document.getElementById('menu')
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' })
            setActiveSection('menu')
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        // Cerrar menú solo en móviles
        if (window.innerWidth <= 768) {
            setMenuOpen(false)
        }
    }

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen)
    }
    
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <h1 onClick={handleLogoClick}>ORIENTA.AI</h1>
                </div>

                <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
                    <a 
                        href="menu" 
                        className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick('menu') }}
                    >
                        menu
                    </a>
                    <a 
                        href="chatbot" 
                        className={`nav-link ${activeSection === 'chatbot' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick('chatbot') }}
                    >
                        chatbot
                    </a>
                </nav>

                <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
                    <a 
                        href="info" 
                        className={`nav-link ${activeSection === 'info' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick('info') }}
                    >
                        info
                    </a>
                </nav>

                <button
                    className="menu-toggle"
                    onClick={handleMenuToggle}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </header>
    )
}

export default Header