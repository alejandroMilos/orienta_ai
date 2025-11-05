import { Menu, X } from 'lucide-react'
import './Header.css'

const Header = ({ menuOpen, setMenuOpen }) => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <h1>ORIENTA.AI</h1>
                </div>

                <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
                    <a href="menu" className="nav-link">menu</a>
                    <a href="info" className="nav-link">info</a>
                    <a href="chatbot" className="nav-link">chatbot</a>
                </nav>

                <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
                    <a href="perfil" className="nav-link">perfil</a>
                </nav>

                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </header>
    )
}

export default Header