import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import './ChatbotSection.css'

const ChatbotSection = ({ initialMessage, setInitialMessage }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "¡Hola! Soy Joaquín, tu asistente de ORIENTA.AI para elegir tu futura vocación. ¿Cómo puedo ayudarte hoy?",
            isUser: false,
            timestamp: new Date()
        }
    ])

    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)
    const hasInitialMessage = useRef(false)

    // Trasladamos el mensaje de pantalla 'menu' a pantalla 'chatbot'
    useEffect(() => {
        if (initialMessage && !hasInitialMessage.current) {
            hasInitialMessage.current = true
            
            const userMessage = {
                id: Date.now(),
                text: initialMessage,
                isUser: true,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, userMessage])

            // agregamos delay con animación "typing" ...
            setIsTyping(true)
            setTimeout(() => {
                setIsTyping(false)
                const botMessage = {
                    id: Date.now() + 1,
                    text: `Recibí tu petición sobre "${initialMessage}". Exploremos juntos las opciones relacionadas a lo que te interesa.`,
                    isUser: false,
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, botMessage])
            }, 2000) // delay de 2 segundos

            // Limpiamos el mensaje inicial para evitar bucles
            setInitialMessage('')
        }
    }, [initialMessage, setInitialMessage])

    // Colocamos un scroll automatico al mensaje mas reciente
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (inputValue.trim()) {
            // Agregamos los mensajes del usuario
            const userMessage = {
                id: Date.now(),
                text: inputValue,
                isUser: true,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, userMessage])
            setInputValue('')

            // nuevamente agregamos delay con animacion de "typing" ...
            setIsTyping(true)
            // Mensaje para los casos de delay en respuesta
            setTimeout(() => {
                setIsTyping(false)
                const botMessage = {
                    id: Date.now() + 1,
                    text: "Estoy procesando tu petición. Por favor se paciente, estoy organizando una respuesta personalizada para lo que buscas.",
                    isUser: false,
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, botMessage])
            }, 2000) // delay de 2 segundos
        }
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString('es-MX', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <section className="chatbot-section">
            <div className="chatbot-container">
                <div className="chat-watermark">ChatBox</div>
                <div className="chat-status">
                    <div className="status-indicator"></div>
                    <span>Joaquín - En línea</span>
                </div>

                <div className="chat-window">
                    <div className="chat-messages">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
                            >
                                <div className="message-bubble">
                                    <div className="message-text">
                                        {message.text}
                                    </div>
                                    <div className="message-time">
                                        {formatTime(message.timestamp)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className='message bot-message'>
                                <div className='message-bubble'>
                                    <div className='message-text typing-indicator'>
                                        <span className='dot'>.</span>
                                        <span className='dot'>.</span>
                                        <span className='dot'>.</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="chat-input-container">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            className="chat-input"
                        />
                        <button type="submit" className="send-button">
                            <ChevronDown size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ChatbotSection