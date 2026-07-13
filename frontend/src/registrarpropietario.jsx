// src/components/RegistroPropietario.jsx
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

function RegistroPropietario() {
    const navigate = useNavigate();
    const [form, setForm] = useState(FORM_INICIAL);
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const avisar = (icon, title, text) =>
        Swal.fire({ icon, title, text, confirmButtonColor: "#0d6efd" });

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

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        setCargando(true);
        try {
            const body = new URLSearchParams({
                rut: form.rut,
                nombre_completo: form.nombre_completo,
                fecha_nacimiento: form.fecha_nacimiento,
                email: form.email,
                clave: form.clave,
                sexo: form.sexo,
                telefono: form.telefono,
            });

            const res = await fetch(`${API_URL}/registrar_propietario.php`, { method: "POST", body });
            const data = await res.json();

            if (data.status === "ok") {
                await Swal.fire({
                    icon: "success",
                    title: "¡Cuenta creada!",
                    text: "Ya puedes iniciar sesión con tu correo y contraseña.",
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
                                <h1 className="form-title">Registro de Propietario</h1>
                                <p className="form-subtitle">Completa los datos para crear tu cuenta</p>

                                <form onSubmit={handleSubmit}>
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
                                    <div className="mb-4">
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

export default RegistroPropietario;
