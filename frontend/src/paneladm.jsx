// src/components/AdminPanel.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// 👇 Importamos el logo desde la carpeta assets
import logoInmobiliaria from "./assets/PNKINMOBILIARIA-removebg-preview.png";

function AdminPanel() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

    // Protegemos la ruta: si no hay sesión guardada, mandamos al home
    useEffect(() => {
        const guardado = localStorage.getItem("pnk_usuario");
        if (!guardado) {
            navigate("/");
            return;
        }
        setUsuario(JSON.parse(guardado));
    }, [navigate]);

    const handleCerrarSesion = () => {
        localStorage.removeItem("pnk_usuario");
        navigate("/");
    };

    // Mientras se valida la sesión no mostramos el contenido
    if (!usuario) return null;

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* NAVBAR */}
            <nav className="navbar-pnk px-3 py-2 d-flex justify-content-between align-items-center">
                <Link className="navbar-brand fs-5 d-flex align-items-center gap-2" to="/">
                    <img src={logoInmobiliaria} alt="Logo" width="36" height="36" className="d-inline-block" />
                    PNK Inmobiliaria
                </Link>
                <span style={{ fontSize: "0.8rem", color: "var(--pnk-text-muted)" }}>Panel de Administración</span>
            </nav>

            {/* CONTENIDO PRINCIPAL */}
            <main className="admin-main flex-grow-1">
                <div className="welcome-card">
                    <div className="welcome-left">
                        <div className="avatar-circle">
                            <svg viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <div className="welcome-info">
                            <p className="welcome-label m-0">Bienvenido:</p>
                            <p className="welcome-name m-0">{usuario.nombre_completo}</p>
                            <p className="welcome-label m-0" style={{ fontSize: "0.75rem" }}>
                                {usuario.tipo_usuario}
                            </p>
                        </div>
                    </div>
                    {/* Cierra sesión y redirige al Home */}
                    <button
                        onClick={handleCerrarSesion}
                        className="btn-cerrar-sesion"
                        style={{ border: "none", background: "transparent" }}
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Cerrar Sesión
                    </button>
                </div>

                <p className="section-title">Módulos</p>

                {/* CUADRÍCULA DE MÓDULOS */}
                <div className="modules-grid">
                    {/* Cambia el "to" por la ruta real de tu mantenedor de usuarios */}
                    <Link to="/admin/usuarios" className="module-card">
                        <div className="module-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                                <path d="M16 3.13a4 4 0 010 7.75" />
                            </svg>
                        </div>
                        <span className="module-label">Mantenedor de Usuarios</span>
                    </Link>

                    {/* Cambia el "to" por la ruta real de tu mantenedor de propiedades */}
                    <Link to="/admin/propiedades" className="module-card">
                        <div className="module-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <span className="module-label">Mantenedor de Propiedades</span>
                    </Link>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="footer-pnk text-center py-3 mt-auto">
                <span className="footer-logo-text">PNK Inmobiliaria © 2026 — Todos los derechos reservados</span>
            </footer>
        </div>
    );
}

export default AdminPanel;
