// src/App.jsx
import { Link } from "react-router-dom";

// 👇 Importamos el logo desde assets para mantener la consistencia
import logoInmobiliaria from "./assets/PNKINMOBILIARIA-removebg-preview.png";

function RecuperarContrasena() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* NAVBAR */}
            <nav className="navbar-pnk px-3 py-2 d-flex justify-content-between align-items-center">
                <Link className="navbar-brand fs-5 d-flex align-items-center gap-2" to="/">
                    <img src={logoInmobiliaria} alt="Logo" width="36" height="36" className="d-inline-block" />
                    PNK Inmobiliaria
                </Link>
            </nav>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-grow-1 d-flex align-items-center py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="form-card">
                                <h1 className="form-title">Recuperar Contraseña</h1>
                                <p className="form-subtitle">
                                    Ingresa tu correo para recibir un enlace de recuperación
                                </p>

                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="mb-3">
                                        <label htmlFor="correo" className="form-label">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="correo"
                                            name="correo"
                                            placeholder="Ej: juan@correo.com"
                                            required
                                        />
                                    </div>
                                    <div
                                        className="d-flex justify-content-end gap-2 pt-3 border-top"
                                        style={{ borderColor: "var(--pnk-gray-2) !important" }}
                                    >
                                        {/* Redirige a la página principal usando Link */}
                                        <Link to="/" className="btn-cancelar">
                                            Cancelar
                                        </Link>
                                        <button type="submit" className="btn-registrar">
                                            Enviar código
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="footer-pnk text-center py-3 mt-auto">
                <span className="footer-logo-text">PNK Inmobiliaria © 2026 — Todos los derechos reservados</span>
            </footer>
        </div>
    );
}

export default RecuperarContrasena;
