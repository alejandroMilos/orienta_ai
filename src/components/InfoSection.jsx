import { useState, useEffect, useRef } from "react";
import { Chart, CategoryScale, LinearScale, BarController, BarElement, DoughnutController, ArcElement, Legend, Tooltip } from "chart.js";
import './InfoSection.css';

Chart.register(
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    DoughnutController,
    ArcElement,
    Legend,
    Tooltip
);

const InfoSection = () => {
    const [teamMembers] = useState([
        {
            name: "MARCO MILOSLAVICH AIROLA",
            linkedin: "https://www.linkedin.com/in/marco-miloslavich/" 
        },
        {
            name: "ALEJANDRO MILOSLAVICH AIROLA",
            linkedin: "https://www.linkedin.com/in/alejandromilos/"
        },
        {
            name: "SAMUEL LÓPEZ ARAIZA CADENA",
            linkedin: "https://www.linkedin.com/in/samuel-lópez-araiza-cadena/"
        },
        {
            name: "LUIS NAVARRO VIVAS",
            linkedin: "https://www.linkedin.com/in/luis-navarro-vivas/"
        },
        {
            name: "ANDRÉS PI GONZÁLEZ",
            linkedin: "https://www.linkedin.com/in/andrés-pi-gonzález-5782b4219"
        },
        {
            name: "BRUNO MANUEL ZAMORA GARCÍA",
            linkedin: "https://www.linkedin.com/in/brunozg/"
        },
        {
            name: "ANDREW STEVEN WILLIAMS PONCE"
        }
    ]);

    const [benefits] = useState([
        {
            id: 1,
            title: "AHORRO DE TIEMPO",
            description: "Evita la búsqueda manual y abrumadora de información",
            image: '/tiempo.png'
        },
        {
            id: 2,
            title: "CLARIDAD",
            description: "Pasa de la confusión a una lista de opciones enfocadas",
            image: '/claridad.png'
        },
        {
            id: 3,
            title: "DESCUBRIMIENTO",
            description: "Sugiere carreras que el usuario no había considerado pero que son afines a su perfil",
            image: '/descubrimiento.png'
        },
        {
            id: 4,
            title: "CONFIANZA",
            description: "Toma una decisión vocacional más informada y segura",
            image: '/confianza.png'
        },
        {
            id: 5,
            title: "INTERACTIVO",
            description: "Cuenta con funcionamiento indetenido y amplia capacidad de respuesta",
            image: '/interactivo.png'
        }
    ]);

    const unamChartRef = useRef(null);
    const tecChartRef = useRef(null);
    const unamChartInstance = useRef(null);
    const tecChartInstance = useRef(null);
    const chartsInitialized = useRef(false);

    useEffect(() => {
        if (unamChartRef.current && tecChartRef.current && !chartsInitialized.current) {
            initializeCharts();
            chartsInitialized.current = true;
        }

        return () => {
            if (unamChartInstance.current) {
                unamChartInstance.current.destroy();
                unamChartInstance.current = null;
            }
            if (tecChartInstance.current) {
                tecChartInstance.current.destroy();
                tecChartInstance.current = null;
            }
            chartsInitialized.current = false;
        };
    }, []);

    const initializeCharts = () => {
        if (unamChartInstance.current) {
            unamChartInstance.current.destroy();
        }        
        if (tecChartInstance.current) {
            tecChartInstance.current.destroy();
        }
        
        // Grafica de UNAM
        if (unamChartRef.current) {
            const ctx = unamChartRef.current.getContext('2d');
            unamChartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Medicina', 'Derecho', 'Psicología', 'Economía', 'Contaduría', 'Administración', 'Comunicación', 'Arquitectura', 'Ing. Civil', 'Informática'],
                    datasets: [{
                        label: 'Miles de estudiantes',
                        data: [25, 22, 18, 15, 14, 13, 12, 10, 9, 8],
                        backgroundColor: 'rgba(52, 152, 219, 0.7)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'category',
                            beginAtZero: true
                        },
                        y: {
                            type: 'linear',
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Miles de estudiantes"
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.parsed.y} mil estudiantes`;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Grafica de Tec de Monterrey
        if (tecChartRef.current) {
            const ctx = tecChartRef.current.getContext('2d');
            tecChartInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Ing. Industrial y de Sistemas', 'Lic. en Administración Financiera', 'Asociación', 'Ing. Mecánica', 'Ing. en Biotecnología', 'Lic. en Mercadotecnia y Comunicación', 'Ing. Civil', 'Ing. en Tecnologías Computacionales', 'Diseño Industrial', 'Ing. en Desarrollo Sustentable'],
                    datasets: [{
                        data: [18, 16, 14, 12, 11, 10, 9, 8, 7, 6],
                        backgroundColor: [
                            'rgba(52, 152, 219, 0.7)',
                            'rgba(46, 204, 113, 0.7)',
                            'rgba(155, 89, 182, 0.7)',
                            'rgba(241, 196, 15, 0.7)',
                            'rgba(230, 126, 34, 0.7)',
                            'rgba(231, 76, 60, 0.7)',
                            'rgba(52, 73, 94, 0.7)',
                            'rgba(26, 188, 156, 0.7)',
                            'rgba(149, 165, 166, 0.7)',
                            'rgba(41, 128, 185, 0.7)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 12,
                                font: {
                                    size: 10
                                }
                            }
                        }
                    }
                }
            });
        }
    };

    const handleLinkedInClick = (url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="info-section">
            <section className="main-hero">
                <div className="container">
                    <div className="hero-tag">ASISTENTE IA</div>
                    <h1 className="hero-main-title">Descubre la Carrera<br /><span>Que Mejor se Ajusta Contigo</span></h1>
                    <div className="knowledge-section">
                        <h3>¿Sabías que...?</h3>
                        <p>de acuerdo con estas universidades</p>
                    </div>
                    <section className="popular-careers">
                        <div className="container">
                            <div className="charts-container-main">
                                <div className="chart-card-main">
                                    <h3>UNAM - Top 10 carreras con mayor población (Licenciatura)</h3>
                                    <div className="chart-container">
                                        <canvas
                                            ref={unamChartRef}
                                            id="unamChart"
                                            key="unam-chart"
                                        ></canvas>
                                    </div>
                                </div>
                                <div className="stats-note">
                                    <p><strong>Miles de estudiantes</strong><br />eligen estas carreras cada año...</p>
                                    <p className="reminder">Pero recuerda: lo importante no es seguir a la mayoría, sino encontrar lo que te apasiona.</p>
                                </div>
                                <div className="future-message">
                                    <p>El futuro se diseña con ideas, tecnología y propósito.</p>
                                    <p className="caminos"><br />Mira qué caminos están marcando tendencia y piensa: <br /><strong className="question">¿cuál podría ser el tuyo?</strong></p>
                                </div>
                                <div className="chart-card-main">
                                    <h3>Tec de Monterrey - Top 10 de carreras más populares</h3>
                                    <div className="chart-container">
                                        <canvas
                                            ref={tecChartRef}    
                                            id="tecChart"
                                            key="tec-chart"
                                        ></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <section className="science-section">
                <div className="container">
                    <div className="inspirational-quote">
                        <p>"No se trata sólo de elegir una carrera, sino de descubrir el camino que te hace sentir vivo."</p>
                    </div>

                    <div className="science-header">
                        <h2>La Ciencia Detrás de la</h2>
                            <div className="science-features-grid">
                                <div className="science-feature">
                                    <div className="feature-icon">
                                        <img src="/idea.png" alt="Análisis del Usuario" 
                                             onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                             }} />
                                        <div className="feature-fallback" style={{display: 'none'}}>💡</div>
                                    </div>
                                    <h3>ANÁLISIS DEL USUARIO</h3>
                                    <p>
                                        Nuestro Asistente IA no solo recopila datos; analiza tus intereses, habilidades,
                                        aptitudes y preferencias para construir un perfil vocacional tridimensional. Cruzamos
                                        esta información con miles de planes de estudio y tendencias del mercado laboral para
                                        asegurar que cada recomendación sea tan única como tú.
                                    </p>
                                </div>
                                
                                <div className="science-feature">
                                    <div className="feature-icon">
                                        <img src="/coding.png" alt="Procesamiento Inteligente" 
                                             onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                             }} />
                                        <div className="feature-fallback" style={{display: 'none'}}>💻</div>
                                    </div>
                                    <h3>PROCESAMIENTO INTELIGENTE</h3>
                                    <p>
                                        Utilizamos la tecnología de embeddings para convertir tu perfil y las opciones de carrera
                                        en vectores de datos. Esto permite que el agente mida la similitud conceptual para encontrar
                                        la opción más cercana y apropiada, logrando un matching que es profundo y altamente 
                                        predictivo.
                                    </p>
                                </div>
                                
                                <div className="science-feature">
                                    <div className="feature-icon">
                                        <img src="/tools.png" alt="Resultados Personalizados"
                                             onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                             }} />
                                        <div className="feature-fallback" style={{display: 'none'}}>🛠️</div>
                                    </div>
                                    <h3>RESULTADOS PERSONALIZADOS</h3>
                                    <p>
                                        Los resultados no son sugerencias; son una guía altamente relevante generada a partir del
                                        análisis de tus embeddings. Recibirás un Reporte de Afinidad con opciones de carrera 
                                        priorizadas, planes de estudio y proyecciones laborales para que tomes una decisión vocacional
                                        100% informada.
                                    </p>
                                </div>

                                <div className="science-feature">
                                    <div className="feature-icon">
                                        <img src="/brain.png" alt="Aprendizaje Constante"
                                             onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                             }} />
                                        <div className="feature-fallback" style={{display: 'none'}}>🧠</div>
                                    </div>
                                    <h3>APRENDIZAJE CONSTANTE</h3>
                                    <p>
                                        Nuestro motor de IA se encuentra en un ciclo constante de mejora, actualizando la base de datos
                                        con información de universidades y el mercado laboral global. Este aprendizaje continuo garantiza
                                        que las recomendaciones que obtienes sean relevantes hoy y válidas en el futuro, adaptándose a la
                                        evolución de las carreras.
                                    </p>
                                </div>
                            </div>
                        <h2 className="recommendation-title">Recomendación Perfecta</h2>
                    </div>
                </div>
            </section>

            <section className="benefits-section">
                <div className="container">
                    <h2 className="section-title">¿QUÉ GANAS AL USAR EL AGENTE?</h2>
                    <div className="benefits-grid">
                        {benefits.map((benefit) => (
                            <div key={benefit.id} className="benefit-card">
                                <div className="benefit-image">
                                    <img 
                                        src={benefit.image} 
                                        alt={benefit.title} 
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <div className="benefit-fallback" style={{display: 'none'}}>
                                        {benefit.title.charAt(0)}
                                    </div>
                                </div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="team-section">
                <div className="container">
                    <h2 className="section-title">NOSOTROS</h2>
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-member">
                                <div className="member-photo">
                                    <span>👤</span>
                                </div>
                                <div className="member-info">
                                    <h3>{member.name}</h3>
                                    <p>{member.role}</p>
                                    <button
                                        className={`linkedin-btn ${!member.linkedin ? 'disabled' : ''}`}
                                        onClick={() => handleLinkedInClick(member.linkedin)}
                                        disabled={!member.linkedin}
                                    >
                                        <span>LinkedIn</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InfoSection
