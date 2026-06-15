import streamlit as st

def aplicar_estilos_globales():
    st.markdown("""
    <style>
        /* ============ RESET COMPLETO PARA ELIMINAR ESPACIOS ============ */
        /* Esto debe ir PRIMERO para sobrescribir los estilos por defecto */
        .main .block-container {
            padding: 0rem !important;
            max-width: 100% !important;
        }
        
        section.main > div {
            padding: 0rem !important;
        }
        
        .stApp {
            margin: 0 !important;
            padding: 0 !important;
        }
        
        /* Eliminar padding del header y footer de Streamlit */
        .stApp > header {
            background: transparent !important;
            padding: 0 !important;
        }
        
        /* Eliminar el espacio superior por defecto */
        .st-emotion-cache-1r6slb0 {
            padding-top: 0rem !important;
        }
        
        /* CONTINÚA CON TUS ESTILOS EXISTENTES... */
    """, unsafe_allow_html=True)

    st.markdown("""
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
            font-family: 'Inter', sans-serif;
        }
        
        :root {
            --primary: #5B2A86;
            --primary-dark: #3B1A56;
            --primary-light: #8B5EB0;
            --secondary: #F5C518;
            --secondary-dark: #E0B010;
            --dark: #1A1A2E;
            --gray: #6B7280;
            --light-gray: #F9FAFB;
            --white: #FFFFFF;
            --gradient-primary: linear-gradient(135deg, #5B2A86 0%, #8B5EB0 50%, #F5C518 100%);
            --gradient-dark: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
            --shadow-sm: 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
            --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
            --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
            --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .stApp {
            background: linear-gradient(135deg, #F8F9FF 0%, #FFFFFF 100%);
        }
        
        .main .block-container {
            max-width: 1400px;
            padding-top: 0rem;
            padding-bottom: 2rem;
        }
        
        /* NAVBAR SUPERIOR MEJORADO */
        .navbar-premium {
            background: rgba(300, 300, 300, 0.98);
            backdrop-filter: blur(20px);
            border-radius: 0px;
            padding: 0.75rem 2rem;
            margin-bottom: 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid rgba(91, 42, 134, 0.1);
        }
        
        .logo-container {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .logo-image {
            height: 48px;
            width: auto;
            object-fit: contain;
        }
        
        .logo-text {
            display: flex;
            flex-direction: column;
        }
        
        .logo-main {
            font-size: 24px;
            font-weight: 800;
            background: linear-gradient(135deg, #5B2A86 0%, #F5C518 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.5px;
        }
        
        .logo-sub {
            font-size: 12px;
            color: #6B7280;
            font-weight: 500;
            letter-spacing: 0.3px;
        }
        
        /* HERO MODERNO - MUCHO MÁS IMPACTANTE */
        .hero-modern {
            background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, #5B2A86 100%);
            border-radius: 32px;
            padding: 4rem 3rem;
            margin: 1.5rem 0 2rem 0;
            position: relative;
            overflow: hidden;
            box-shadow: var(--shadow-xl);
        }
        
        .hero-modern::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 80%;
            height: 200%;
            background: radial-gradient(circle, rgba(245,197,24,0.1) 0%, transparent 70%);
            pointer-events: none;
        }
        
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(10px);
            padding: 0.5rem 1rem;
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 600;
            color: #F5C518;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255,255,255,0.2);
            width: fit-content;
        }
        
        .hero-title {
            font-size: 4rem;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #FFFFFF 0%, #F5C518 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero-description {
            font-size: 1.125rem;
            line-height: 1.6;
            color: rgba(255,255,255,0.9);
            margin-bottom: 2rem;
            max-width: 600px;
        }
        
        .hero-stats {
            display: flex;
            gap: 3rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }
        
        .stat-item {
            text-align: left;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: 800;
            color: #F5C518;
            line-height: 1;
        }
        
        .stat-label {
            font-size: 0.875rem;
            color: rgba(255,255,255,0.7);
            margin-top: 0.25rem;
        }
        
        .hero-image-container {
            position: relative;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: var(--shadow-xl);
            height: 100%;
            min-height: 400px;
        }
        
        /* CARDS MEJORADAS */
        .card-premium {
            background: var(--white);
            border-radius: 24px;
            padding: 2rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(91, 42, 134, 0.1);
            box-shadow: var(--shadow-sm);
            height: 100%;
            position: relative;
            overflow: hidden;
        }
        
        .card-premium:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-lg);
            border-color: rgba(91, 42, 134, 0.2);
        }
        
        .card-premium::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #5B2A86, #F5C518);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }
        
        .card-premium:hover::before {
            transform: scaleX(1);
        }
        
        .card-icon {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, rgba(91,42,134,0.1) 0%, rgba(245,197,24,0.1) 100%);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            margin-bottom: 1.5rem;
        }
        
        .card-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        /* SECCIÓN DE MÉTRICAS MEJORADA */
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            margin: 2rem 0;
        }
        
        .metric-card {
            background: var(--white);
            border-radius: 24px;
            padding: 1.75rem;
            text-align: center;
            border: 1px solid rgba(91, 42, 134, 0.1);
            transition: all 0.3s ease;
            box-shadow: var(--shadow-sm);
        }
        
        .metric-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-md);
            border-color: rgba(245,197,24,0.3);
        }
        
        .metric-number-large {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #5B2A86 0%, #F5C518 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
            margin-bottom: 0.5rem;
        }
        
        /* SECCIÓN DE PRODUCTOS CON TARJETAS MEJORADAS */
        .product-highlight {
            background: linear-gradient(135deg, #5B2A86 0%, #3B1A56 100%);
            color: white;
        }
        
        .product-highlight * {
            color: white;
        }
        
        .product-badge {
            display: inline-block;
            background: rgba(245,197,24,0.2);
            padding: 0.25rem 0.75rem;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        /* SIMULADOR MEJORADO */
        .simulator-card {
            background: var(--white);
            border-radius: 32px;
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            border: 1px solid rgba(91, 42, 134, 0.1);
        }
        
        /* BOTONES MEJORADOS */
    .stButton > button {
        background: linear-gradient(135deg, #5B2A86 0%, #8B5EB0 100%);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 0.75rem 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        width: 100%;
        font-size: 0.95rem;
        min-height: 54px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .stButton > button:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
        background: linear-gradient(135deg, #6B3A96 0%, #9B6EC0 100%);
    }
        
        /* TÍTULOS DE SECCIÓN */
        .section-header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .section-title-premium {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #5B2A86 0%, #F5C518 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
        }
        
        .section-subtitle-premium {
            font-size: 1.125rem;
            color: var(--gray);
            max-width: 600px;
            margin: 0 auto;
        }
        
        /* FOOTER MEJORADO */
        .footer-proeza {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #1F082F 0%, #34104F 42%, #5B2A86 100%);
    color: white;

    border-radius: 0px;   /* 🔥 RECTÁNGULO LIMPIO */

    overflow: hidden;
    box-shadow: 0 -18px 45px rgba(31, 8, 47, 0.22);
    border-top: 1px solid rgba(255,255,255,0.10);
}
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
            .hero-title {
                font-size: 2.5rem;
            }
            .metrics-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .hero-stats {
                gap: 1.5rem;
            }
        }
    </style>
    """, unsafe_allow_html=True)
    
    # ---------------------------------------------------
