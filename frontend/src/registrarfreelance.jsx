// src/components/RegistroGestor.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "./config";
import { validarRut, emailValido, calcularEdad, telefonoValido } from "./utils/validaciones";

// 👇 Importamos el logo corporativo desde assets
import logoInmobiliaria from "./assets/PNKINMOBILIARIA-removebg-preview.png";

const FORM_INICIAL = {
    rut: "",
    nombre_completo: "",
    fecha_nacimiento: "",
    email: "",
    clave: "",
    confirmarClave: "",
    sexo: "",
    telefono: "",
};

const EXTENSIONES_PERMITIDAS = ["pdf", "jpg", "jpeg", "png"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function RegistroGestor() {
    const navigate = useNavigate();

    const [form, setForm] = useState(FORM_INICIAL);
    const [certificado, setCertificado] = useState(null);
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const avisar = (icon, title, text) =>
        Swal.fire({ icon, title, text, confirmButtonColor: "#0d6efd" });

    const handleArchivoChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setCertificado(null);
            setNombreArchivo("");
            return;
        }

        const extension = file.name.split(".").pop().toLowerCase();
        if (!EXTENSIONES_PERMITIDAS.includes(extension)) {
            avisar("warning", "Formato no permitido", "Sube un archivo PDF, JPG o PNG.");
            e.target.value = "";
            setCertificado(null);
            setNombreArchivo("");
            return;
        }

        if (file.size > MAX_BYTES) {
            avisar("warning", "Archivo muy pesado", "El certificado no puede superar los 5 MB.");
            e.target.value = "";
            setCertificado(null);
            setNombreArchivo("");
            return;
        }

        setCertificado(file);
        setNombreArchivo(file.name);
    };

    const validarFormulario = () => {
        const { rut, nombre_completo, fecha_nacimiento, email, clave, confirmarClave, sexo, telefono } = form;

        if (!rut || !nombre_completo || !fecha_nacimiento || !email || !clave || !sexo || !telefono) {
            avisar("warning", "Campos incompletos", "Completa todos los campos del formulario.");
            return false;
        }

        if (!validarRut(rut)) {
            avisar("warning", "RUT inválido", "Revisa el RUT ingresado, el dígito verificador no coincide.");
            return false;
        }

        if (!emailValido(email)) {
            avisar("warning", "Correo inválido", "Ingresa un correo electrónico con un formato válido.");
            return false;
        }

        if (calcularEdad(fecha_nacimiento) < 18) {
            avisar("warning", "Edad no permitida", "Debes ser mayor de 18 años para registrarte.");
            return false;
        }

        if (!telefonoValido(telefono)) {
            avisar("warning", "Teléfono inválido", "Ingresa un número de 9 dígitos, ej: 912345678.");
            return false;
        }

        if (clave.length < 6) {
            avisar("warning", "Contraseña muy corta", "Debe tener al menos 6 caracteres.");
            return false;
        }

        if (clave !== confirmarClave) {
            avisar("warning", "Las contraseñas no coinciden", "Verifica que ambos campos sean iguales.");
            return false;
        }

        if (!certificado) {
            avisar("warning", "Falta el certificado", "Debes adjuntar tu certificado de antecedentes.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        setCargando(true);
        try {
            // Como hay un archivo, usamos FormData en vez de URLSearchParams.
            // OJO: no se debe fijar el header Content-Type a mano, el navegador
            // arma el boundary del multipart automáticamente.
            const formData = new FormData();
            formData.append("rut", form.rut);
            formData.append("nombre_completo", form.nombre_completo);
            formData.append("fecha_nacimiento", form.fecha_nacimiento);
            formData.append("email", form.email);
            formData.append("clave", form.clave);
            formData.append("sexo", form.sexo);
            formData.append("telefono", form.telefono);
            formData.append("certificado", certificado);

            const res = await fetch(`${API_URL}/registrar_freelance.php`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.status === "ok") {
                await Swal.fire({
                    icon: "success",
                    title: "Solicitud enviada",
                    text: data.message,
                    confirmButtonColor: "#0d6efd",
                });
                navigate("/");
            } else {
                avisar("error", "No se pudo completar el registro", data.message || "Intenta nuevamente");
            }
        } catch {
            avisar("error", "Error de conexión", "No se pudo contactar al servidor. Verifica que el backend esté corriendo.");
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
                                <h1 className="form-title">Registro de Gestor inmobiliario FreeLance</h1>
                                <p className="form-subtitle">Completa los datos para crear tu cuenta</p>

                                <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                            placeholder="Ej: 12345678-9"
                                            value={form.rut}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* NOMBRE COMPLETO */}
                                    <div className="mb-3">
                                        <label htmlFor="nombre_completo" className="form-label">
                                            Nombre Completo
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre_completo"
                                            name="nombre_completo"
                                            placeholder="Ej: Juan Pérez González"
                                            value={form.nombre_completo}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* FECHA DE NACIMIENTO */}
                                    <div className="mb-3">
                                        <label htmlFor="fecha_nacimiento" className="form-label">
                                            Fecha de Nacimiento
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="fecha_nacimiento"
                                            name="fecha_nacimiento"
                                            value={form.fecha_nacimiento}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* CORREO ELECTRÓNICO */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Ej: juan@correo.com"
                                            value={form.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* CONTRASEÑA */}
                                    <div className="mb-3">
                                        <label htmlFor="clave" className="form-label">
                                            Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="clave"
                                            name="clave"
                                            placeholder="Mínimo 6 caracteres"
                                            value={form.clave}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* CONFIRMAR CONTRASEÑA */}
                                    <div className="mb-3">
                                        <label htmlFor="confirmarClave" className="form-label">
                                            Confirmar Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmarClave"
                                            name="confirmarClave"
                                            placeholder="Repite la contraseña"
                                            value={form.confirmarClave}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* SEXO */}
                                    <div className="mb-3">
                                        <label htmlFor="sexo" className="form-label">
                                            Sexo
                                        </label>
                                        <select
                                            className="form-select"
                                            id="sexo"
                                            name="sexo"
                                            value={form.sexo}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                Selecciona una opción
                                            </option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Otro">Prefiero no indicar</option>
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
                                                placeholder="912345678"
                                                value={form.telefono}
                                                onChange={handleChange}
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
                                                onChange={handleArchivoChange}
                                            />
                                            <div className="file-upload-icon">
                                                <svg viewBox="0 0 24 24">
                                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                    <polyline points="17 8 12 3 7 8" />
                                                    <line x1="12" y1="3" x2="12" y2="15" />
                                                </svg>
                                            </div>
                                            <p className="file-upload-text">
                                                {nombreArchivo || "Haz clic para subir tu certificado"}
                                            </p>
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
                                        <button type="submit" className="btn-registrar" disabled={cargando}>
                                            {cargando ? "Registrando..." : "Registrarse"}
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
