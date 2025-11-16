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
    const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

    // URL del backend
    const BACKEND_URL = 'http://localhost:3001/api'

    // Funcion para llamar al backend
    const callChatAPI = async (userMessage) => {
        try {
            const response = await fetch(`${BACKEND_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    sessionId: sessionId.current
                })
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || `Error: ${response.status}`)
            }
                
            const data = await response.json()
            return data.response

        } catch (error) {
            console.error('Error calling chat API:', error)

            // Mensaje de error contextual
            if (error.message.includes('orientacion vocacional')) {
                throw error // Mantener el mensaje personalizado del backend
            }

            throw new Error('Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.')
        }
    }

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

            // llamamos al backend para la respuesta
            setIsTyping(true)
            callChatAPI(initialMessage)
                .then(aiResponse => {
                    setIsTyping(false)
                    const botMessage = {
                        id: Date.now() + 1,
                        text: aiResponse,
                        isUser: false,
                        timestamp: new Date()
                    }
                    setMessages(prev => [...prev, botMessage])
                })
                .catch(error => {
                    setIsTyping(false)
                    const errorMessage = {
                        id: Date.now() + 1,
                        text: error.message || "Estoy reorganizando mis recursos de orientación vocacional. Mientras tanto, ¿podrías contarme más sobre tus áreas de interés académico o profesional?",
                        isUser: false,
                        timestamp: new Date()
                    }
                    setMessages(prev => [...prev, errorMessage])
                })

            setInitialMessage('')
        }
    }, [initialMessage, setInitialMessage])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    const handleSendMessage = async (e) => {
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
            
            // llamamos al backend para responder
            // nuevamente agregamos delay con animacion de "typing" ...
            setIsTyping(true)
            try {
                const aiResponse = await callChatAPI(inputValue)
                setIsTyping(false)
                const botMessage = {
                    id: Date.now() + 1,
                    text: aiResponse,
                    isUser: false,
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, botMessage])
            } catch (error) {
                setIsTyping(false)
                const errorMessage = {
                    id: Date.now() + 1,
                    text: error.message || "Estoy teniendo dificultades para acceder a mis recursos de orientación. ¿Podrías reformular tu pregunta relacionada con tu desarrollo vocacional o profesional?",
                    isUser: false,
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, errorMessage])
            }
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