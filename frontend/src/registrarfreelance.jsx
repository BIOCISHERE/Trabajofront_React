// src/components/RegistroGestor.jsx
import { Link } from "react-router-dom";

// 👇 Importamos el logo corporativo desde assets
import logoInmobiliaria from "./assets/PNKINMOBILIARIA-removebg-preview.png";

function RegistroGestor() {
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
                                <h1 className="form-title">Registro de Gestor inmobiliario FreeLance</h1>
                                <p className="form-subtitle">Completa los datos para crear tu cuenta</p>

                                <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
                                    {/* RUT */}
                                    <div className="mb-3">
                                        <label htmlFor="rut" className="form-label">
                                            RUT
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="rut"
                                            name="rut"
                                            placeholder="Ej: 12.345.678-9"
                                            required
                                        />
                                    </div>

                                    {/* NOMBRE COMPLETO */}
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">
                                            Nombre Completo
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Ej: Juan Pérez González"
                                            required
                                        />
                                    </div>

                                    {/* FECHA DE NACIMIENTO */}
                                    <div className="mb-3">
                                        <label htmlFor="fechaNacimiento" className="form-label">
                                            Fecha de Nacimiento
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="fechaNacimiento"
                                            name="fecha_nacimiento"
                                            required
                                        />
                                    </div>

                                    {/* CORREO ELECTRÓNICO */}
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

                                    {/* CONTRASEÑA */}
                                    <div className="mb-3">
                                        <label htmlFor="contrasena" className="form-label">
                                            Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="contrasena"
                                            name="contrasena"
                                            placeholder="Mínimo 8 caracteres"
                                            required
                                        />
                                    </div>

                                    {/* SEXO */}
                                    <div className="mb-3">
                                        <label htmlFor="sexo" className="form-label">
                                            Sexo
                                        </label>
                                        <select className="form-select" id="sexo" name="sexo" defaultValue="" required>
                                            <option value="" disabled>
                                                Selecciona una opción
                                            </option>
                                            <option value="M">Masculino</option>
                                            <option value="F">Femenino</option>
                                            <option value="O">Prefiero no indicar</option>
                                        </select>
                                    </div>

                                    {/* TELÉFONO MÓVIL */}
                                    <div className="mb-3">
                                        <label htmlFor="telefono" className="form-label">
                                            Teléfono Móvil
                                        </label>
                                        <div className="input-group">
                                            <span
                                                className="input-group-text"
                                                style={{
                                                    backgroundColor: "var(--pnk-gray-2)",
                                                    borderColor: "var(--pnk-gray-1)",
                                                    color: "var(--pnk-text-muted)",
                                                    fontSize: "0.85rem",
                                                }}
                                            >
                                                +56
                                            </span>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="telefono"
                                                name="telefono"
                                                placeholder="9 1234 5678"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* CERTIFICADO DE ANTECEDENTES (FILE UPLOAD) */}
                                    <div className="mb-4">
                                        <label className="form-label">Certificado de Antecedentes</label>
                                        <div className="file-upload-wrapper">
                                            <input
                                                type="file"
                                                id="certificado"
                                                name="certificado"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                required
                                            />
                                            <div className="file-upload-icon">
                                                <svg viewBox="0 0 24 24">
                                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                    <polyline points="17 8 12 3 7 8" />
                                                    <line x1="12" y1="3" x2="12" y2="15" />
                                                </svg>
                                            </div>
                                            <p className="file-upload-text">Haz clic para subir tu certificado</p>
                                            <p className="file-upload-hint">PDF, JPG o PNG — máximo 5 MB</p>
                                        </div>
                                    </div>

                                    {/* BOTONES DE ACCIÓN */}
                                    <div
                                        className="d-flex justify-content-end gap-2 pt-3 border-top"
                                        style={{ borderColor: "var(--pnk-gray-2) !important" }}
                                    >
                                        <Link to="/" className="btn-cancelar">
                                            Cancelar
                                        </Link>
                                        <button type="submit" className="btn-registrar">
                                            Registrarse
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

export default RegistroGestor;
