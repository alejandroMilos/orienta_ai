import { Menu, X } from 'lucide-react'
import './Header.css'

const Header = ({ menuOpen, setMenuOpen, currentView, setCurrentView }) => {
    const handleNavClick = (view) => {
        setCurrentView(view)
        if (window.innerWidth <= 768) {
            setMenuOpen(false)
        }
    }

    const handleLogoClick = () => {
        setCurrentView('menu')
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
                        className={`nav-link ${currentView === 'menu' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick('menu') }}
                    >
                        menu
                    </a>
                    <a 
                        href="chatbot" 
                        className={`nav-link ${currentView === 'chatbot' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick('chatbot') }}
                    >
                        chatbot
                    </a>
                </nav>

                <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
                    <a 
                        href="info" 
                        className={`nav-link ${currentView === 'info' ? 'active' : ''}`}
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