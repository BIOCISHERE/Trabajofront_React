// src/recuperarcontrasena.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "./config";

// 👇 Importamos el logo desde assets para mantener la consistencia
import logoInmobiliaria from "./assets/PNKINMOBILIARIA-removebg-preview.png";

function RecuperarContrasena() {
    const navigate = useNavigate();

    // paso 1: pedir correo | paso 2: validar código | paso 3: nueva contraseña
    const [paso, setPaso] = useState(1);
    const [cargando, setCargando] = useState(false);

    const [correo, setCorreo] = useState("");
    const [codigo, setCodigo] = useState("");
    const [nuevaClave, setNuevaClave] = useState("");
    const [confirmarClave, setConfirmarClave] = useState("");

    const avisoError = (mensaje) =>
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: mensaje,
            confirmButtonColor: "#0d6efd",
        });

    // PASO 1: solicitar código al correo
    const handleEnviarCodigo = async (e) => {
        e.preventDefault();

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
        if (!emailValido) {
            Swal.fire({
                icon: "warning",
                title: "Correo inválido",
                text: "Ingresa un correo electrónico con un formato válido.",
                confirmButtonColor: "#0d6efd",
            });
            return;
        }

        setCargando(true);
        try {
            const body = new URLSearchParams({ email: correo.trim() });
            const res = await fetch(`${API_URL}/recuperar.php`, { method: "POST", body });
            const data = await res.json();

            if (data.status === "ok") {
                Swal.fire({
                    icon: "success",
                    title: "Código enviado",
                    text: "Revisa tu correo, el código expira en 15 minutos.",
                    confirmButtonColor: "#0d6efd",
                });
                setPaso(2);
            } else {
                avisoError(data.message || "No se pudo enviar el código");
            }
        } catch {
            avisoError("No se pudo contactar al servidor. Verifica que el backend esté corriendo.");
        } finally {
            setCargando(false);
        }
    };

    // PASO 2: validar el código recibido
    const handleValidarCodigo = async (e) => {
        e.preventDefault();

        if (!codigo.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Falta el código",
                text: "Ingresa el código que recibiste por correo.",
                confirmButtonColor: "#0d6efd",
            });
            return;
        }

        setCargando(true);
        try {
            const body = new URLSearchParams({ email: correo.trim(), codigo: codigo.trim() });
            const res = await fetch(`${API_URL}/verificarcodigo.php`, { method: "POST", body });
            const data = await res.json();

            if (data.status === "ok") {
                setPaso(3);
            } else {
                avisoError(data.message || "Código incorrecto o vencido");
            }
        } catch {
            avisoError("No se pudo contactar al servidor. Verifica que el backend esté corriendo.");
        } finally {
            setCargando(false);
        }
    };

    // PASO 3: definir la nueva contraseña
    const handleCambiarClave = async (e) => {
        e.preventDefault();

        if (nuevaClave.length < 6) {
            Swal.fire({
                icon: "warning",
                title: "Contraseña muy corta",
                text: "Debe tener al menos 6 caracteres.",
                confirmButtonColor: "#0d6efd",
            });
            return;
        }

        if (nuevaClave !== confirmarClave) {
            Swal.fire({
                icon: "warning",
                title: "Las contraseñas no coinciden",
                text: "Verifica que ambos campos sean iguales.",
                confirmButtonColor: "#0d6efd",
            });
            return;
        }

        setCargando(true);
        try {
            const body = new URLSearchParams({
                email: correo.trim(),
                codigo: codigo.trim(),
                nuevaClave,
            });
            const res = await fetch(`${API_URL}/cambiarclave.php`, { method: "POST", body });
            const data = await res.json();

            if (data.status === "ok") {
                await Swal.fire({
                    icon: "success",
                    title: "Contraseña actualizada",
                    text: "Ya puedes iniciar sesión con tu nueva contraseña.",
                    confirmButtonColor: "#0d6efd",
                });
                navigate("/");
            } else {
                avisoError(data.message || "No se pudo actualizar la contraseña");
            }
        } catch {
            avisoError("No se pudo contactar al servidor. Verifica que el backend esté corriendo.");
        } finally {
            setCargando(false);
        }
    };

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
                                {paso === 1 && (
                                    <>
                                        <h1 className="form-title">Recuperar Contraseña</h1>
                                        <p className="form-subtitle">
                                            Ingresa tu correo para recibir un código de recuperación
                                        </p>
                                        <form onSubmit={handleEnviarCodigo}>
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
                                                    value={correo}
                                                    onChange={(e) => setCorreo(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div
                                                className="d-flex justify-content-end gap-2 pt-3 border-top"
                                                style={{ borderColor: "var(--pnk-gray-2) !important" }}
                                            >
                                                <Link to="/" className="btn-cancelar">
                                                    Cancelar
                                                </Link>
                                                <button type="submit" className="btn-registrar" disabled={cargando}>
                                                    {cargando ? "Enviando..." : "Enviar código"}
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                )}

                                {paso === 2 && (
                                    <>
                                        <h1 className="form-title">Verifica tu código</h1>
                                        <p className="form-subtitle">
                                            Ingresa el código de 12 caracteres que enviamos a <strong>{correo}</strong>
                                        </p>
                                        <form onSubmit={handleValidarCodigo}>
                                            <div className="mb-3">
                                                <label htmlFor="codigo" className="form-label">
                                                    Código de recuperación
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="codigo"
                                                    name="codigo"
                                                    placeholder="Ej: aB3$dEf9gH1k"
                                                    value={codigo}
                                                    onChange={(e) => setCodigo(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div
                                                className="d-flex justify-content-end gap-2 pt-3 border-top"
                                                style={{ borderColor: "var(--pnk-gray-2) !important" }}
                                            >
                                                <button
                                                    type="button"
                                                    className="btn-cancelar"
                                                    onClick={() => setPaso(1)}
                                                >
                                                    Volver
                                                </button>
                                                <button type="submit" className="btn-registrar" disabled={cargando}>
                                                    {cargando ? "Verificando..." : "Verificar código"}
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                )}

                                {paso === 3 && (
                                    <>
                                        <h1 className="form-title">Nueva Contraseña</h1>
                                        <p className="form-subtitle">Define tu nueva contraseña de acceso</p>
                                        <form onSubmit={handleCambiarClave}>
                                            <div className="mb-3">
                                                <label htmlFor="nuevaClave" className="form-label">
                                                    Nueva contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="nuevaClave"
                                                    name="nuevaClave"
                                                    placeholder="Mínimo 6 caracteres"
                                                    value={nuevaClave}
                                                    onChange={(e) => setNuevaClave(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="confirmarClave" className="form-label">
                                                    Confirmar contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="confirmarClave"
                                                    name="confirmarClave"
                                                    placeholder="Repite la contraseña"
                                                    value={confirmarClave}
                                                    onChange={(e) => setConfirmarClave(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div
                                                className="d-flex justify-content-end gap-2 pt-3 border-top"
                                                style={{ borderColor: "var(--pnk-gray-2) !important" }}
                                            >
                                                <Link to="/" className="btn-cancelar">
                                                    Cancelar
                                                </Link>
                                                <button type="submit" className="btn-registrar" disabled={cargando}>
                                                    {cargando ? "Guardando..." : "Cambiar contraseña"}
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                )}
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
