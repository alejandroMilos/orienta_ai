import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Upload, X, Paperclip } from 'lucide-react'
import MarkdownRenderer from './MarkdownRenderer'
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
    const [isUploading, setIsUploading] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [showUploadOptions, setShowUploadOptions] = useState(false)
    const messagesEndRef = useRef(null)
    const fileInputRef = useRef(null)
    const hasInitialMessage = useRef(false)
    const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

    // URL del backend
    const BACKEND_URL = 'http://localhost:3001/api'

    // Funcion para llamar al backend
    const callChatAPI = async (userMessage, files = []) => {
        try {
            const formData = new FormData()
            formData.append('message', userMessage)
            formData.append('sessionId', sessionId.current)

            files.forEach((file, index) => {
                formData.append(`file${index}`, file)
            })

            const response = await fetch(`${BACKEND_URL}/chat`, {
                method: 'POST',
                body: formData
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

    const uploadFiles = async (files) => {
        if (files.length === 0) return

        setIsUploading(true)
        const fileArray = Array.from(files)

        const uploadMessage = {
            id: Date.now(),
            text: `Subiendo ${fileArray.length} archivo(s)...`,
            isUser: false,
            timestamp: new Date(),
            isSystem: true
        }
        setMessages(prev => [...prev, uploadMessage])

        const newFiles = fileArray.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
        }))

        setUploadedFiles(prev => [...prev, ...newFiles])

        try {
            const response = await callChatAPI(`He subido ${fileArray.length} archivo(s): ${fileArray.map(f => f.name).join(', ')}`, fileArray)
            setIsUploading(false)
            const botMessage = {
                id: Date.now() + 1,
                text: response,
                isUser: false,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, botMessage])

        } catch (error) {
            setIsUploading(false)
            const errorMessage = {
                id: Date.now() + 1,
                text: "He recibido tus documentos. Puedes preguntarme sobre su contenido o continuar con nuestra conversación sobre orientación vocacional.",
                isUser: false,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
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
                text: inputValue || `Adjunto ${uploadedFiles.length} archivo(s)`,
                isUser: true,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, userMessage])

            const filesToSend = uploadedFiles.map(f => f.file)

            setInputValue('')
            setUploadedFiles([])
            
            // llamamos al backend para responder
            // nuevamente agregamos delay con animacion de "typing" ...
            setIsTyping(true)
            try {
                const aiResponse = await callChatAPI(inputValue, filesToSend)
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

    const handleFileSelect = (e) => {
        const files = e.target.files
        if (files.length > 0) {
            uploadFiles(files)
        }
        e.target.value = null
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const files = e.dataTransfer.files
        if (files.length > 0) {
            uploadFiles(files)
        }
    }

    const removeFile = (fileId) => {
        setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
    }

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString('es-MX', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getFileIcon = (type) => {
        if (type.includes('pdf')) return '📄'
        if (type.includes('word') || type.includes('document')) return '📝'
        if (type.includes('image')) return '🖼️'
        if (type.includes('text')) return '📋'
        return '📎'
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
                                className={`message ${message.isUser ? 'user-message' : 'bot-message'} ${message.isSystem ? 'system-message' : ''}`}
                            >
                                <div className="message-bubble">
                                    <div className="message-text">
                                        {message.isUser || message.isSystem ? (
                                            <span>{message.text}</span>
                                        ) :  (
                                            <MarkdownRenderer content={message.text} />
                                        )}
                                    </div>
                                    <div className="message-time">
                                        {formatTime(message.timestamp)}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {uploadedFiles.length > 0 && (
                            <div className="message user-message">
                                <div className="message-bubble">
                                    <div className="uploaded-files">
                                        <p>Archivos listos para enviar:</p>
                                        {uploadedFiles.map(file => (
                                            <div key={file.id} className="file-item">
                                                <span className="file-icon">
                                                    {getFileIcon(file.type)}
                                                </span>
                                                <span className="file-name">{file.name}</span>
                                                <span className="file-size">{formatFileSize(file.size)}</span>
                                                <button 
                                                    className="remove-file"
                                                    onClick={() => removeFile(file.id)}
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {isTyping && (
                            <div className='message bot-message'>
                                <div className='message-bubble'>
                                    <div className='typing-indicator'>
                                        <span className='dot'></span>
                                        <span className='dot'></span>
                                        <span className='dot'></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isUploading && (
                            <div className="message bot-message">
                                <div className="message-bubble">
                                    <div className="uploading-indicator">
                                        <Upload size={16} className="spinning" />
                                        <span>Procesando archivos...</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div
                        className={`drop-zone ${showUploadOptions ? 'active' : ''}`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => setShowUploadOptions(!showUploadOptions)}
                    >
                        <Paperclip size={20} />
                        <span>Subir archivos</span>
                    </div>

                    {showUploadOptions && (
                        <div className="upload-options">
                            <div className="upload-buttons">
                                <button 
                                    className="upload-btn"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload size={18} />
                                    <span>Seleccionar archivos</span>
                                </button>
                                <div className="upload-info">
                                    <p>Arrastra y suelta archivos aquí o haz clic para seleccionar</p>
                                    <p className="file-types">Soportado: PDF, DOC, DOCX, TXT, imágenes</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSendMessage} className="chat-input-container">
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            multiple
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                            accept=".pdf, .doc, .docx, .txt, .jpg, .jpeg, .png"
                        />
                        
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Escribe tu mensaje o sube documentos..."
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
