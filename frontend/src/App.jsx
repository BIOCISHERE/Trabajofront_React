// src/App.jsx
// 👇 Importamos las imágenes desde la carpeta assets
import logoInmobiliaria from "./assets/PNKINMOBILIARIA-removebg-preview.png";
import carrouselCasa from "./assets/carrousel_casa.jpeg";
import carrouselDept from "./assets/carrousel_dept.jpeg";
import carrouselPiscina from "./assets/carrousel_piscina.jpeg";
import ejemploPropiedad from "./assets/ejemplo_propiedad.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { API_URL } from "./config";

function App() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [remember, setRemember] = useState(false);
    const [cargando, setCargando] = useState(false);

    // Si el usuario marcó "recordar credenciales" antes, precargamos el email
    useEffect(() => {
        const emailGuardado = localStorage.getItem("pnk_remember_email");
        if (emailGuardado) {
            setEmail(emailGuardado);
            setRemember(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validaciones básicas antes de llamar al backend
        if (!email.trim() || !pwd.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Debes ingresar tu email y tu contraseña.",
                confirmButtonColor: "#0d6efd",
            });
            return;
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        if (!emailValido) {
            Swal.fire({
                icon: "warning",
                title: "Email inválido",
                text: "Ingresa un correo electrónico con un formato válido.",
                confirmButtonColor: "#0d6efd",
            });
            return;
        }

        setCargando(true);
        try {
            const body = new URLSearchParams({ email: email.trim(), clave: pwd });
            const res = await fetch(`${API_URL}/login.php`, {
                method: "POST",
                body,
            });

            const data = await res.json();

            if (data.status === "ok") {
                // Guardamos la sesión del usuario en el navegador
                localStorage.setItem("pnk_usuario", JSON.stringify(data.usuario));

                if (remember) {
                    localStorage.setItem("pnk_remember_email", email.trim());
                } else {
                    localStorage.removeItem("pnk_remember_email");
                }

                await Swal.fire({
                    icon: "success",
                    title: "¡Bienvenido!",
                    text: `Hola, ${data.usuario.nombre_completo}`,
                    timer: 1500,
                    showConfirmButton: false,
                });

                // Por ahora todos los perfiles van al panel; cuando existan
                // vistas propias para Propietario / Gestor, se puede
                // condicionar por data.usuario.tipo_usuario aquí.
                navigate("/paneladmin");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No se pudo iniciar sesión",
                    text: data.message || "Correo o contraseña incorrectos",
                    confirmButtonColor: "#0d6efd",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo contactar al servidor. Verifica que el backend esté corriendo.",
                confirmButtonColor: "#0d6efd",
            });
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <div className="container-fluid p-0">
                {/* NAVBAR */}
                <nav className="navbar navbar-expand-lg navbar-dark navbar-pnk px-3 py-2">
                    <div className="container-fluid px-0">
                        <Link className="navbar-brand fs-5 d-flex align-items-center gap-2" to="/">
                            <img src={logoInmobiliaria} alt="Logo" width="36" height="36" className="d-inline-block" />
                            PNK Inmobiliaria
                        </Link>

                        <button
                            className="navbar-toggler border-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarPNK"
                            aria-controls="navbarPNK"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-end" id="navbarPNK">
                            <div className="navbar-nav align-items-center gap-2">
                                <Link className="nav-link btn-nav-pnk" to="/registrarpropietario">
                                    Registrar Propietario
                                </Link>
                                <Link className="nav-link btn-nav-pnk" to="/registrarfreelance">
                                    Registrar Gestor Freelance
                                </Link>
                                <a className="nav-link btn-nav-pnk" href="#contacto">
                                    Contacto
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* HERO SECTION (Carrusel + Formulario de Login) */}
                <div className="hero-section">
                    <div className="row g-0">
                        <div className="col-12 col-lg-6">
                            <div id="carouselMenu" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={carrouselCasa} className="img-fluid w-100" alt="Propiedad Casa" />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src={carrouselDept}
                                            className="img-fluid w-100"
                                            alt="Propiedad Departamento"
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src={carrouselPiscina}
                                            className="img-fluid w-100"
                                            alt="Propiedad Departamento Con Piscina"
                                        />
                                    </div>
                                </div>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselMenu"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselMenu"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 login-panel">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-10 col-md-8 mx-auto">
                                        <legend className="text-center mb-4">Autenticación</legend>
                                        <form onSubmit={handleLogin} autoComplete="on">
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">
                                                    Email:
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Ingresa tu email"
                                                    name="email"
                                                    autoComplete="on"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="pwd" className="form-label">
                                                    Contraseña:
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control mb-2"
                                                    id="pwd"
                                                    placeholder="Ingresa tu contraseña"
                                                    name="pswd"
                                                    value={pwd}
                                                    onChange={(e) => setPwd(e.target.value)}
                                                />
                                                <p style={{ fontSize: "0.85rem" }}>
                                                    ¿Olvidaste tu contraseña? -{" "}
                                                    <Link to="/recuperarcontrasena">Recuperar contraseña</Link>
                                                </p>
                                            </div>
                                            <div className="form-check mb-3">
                                                <label className="form-check-label">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="remember"
                                                        checked={remember}
                                                        onChange={(e) => setRemember(e.target.checked)}
                                                    />{" "}
                                                    Recordar credenciales
                                                </label>
                                            </div>
                                            <div className="mb-1 text-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-ingresar w-100 text-decoration-none"
                                                    disabled={cargando}
                                                >
                                                    {cargando ? "Ingresando..." : "Ingresar"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BUSCADOR SECTION */}
                <div className="buscador-section py-4">
                    <div className="col-12 col-lg-8 mx-auto">
                        <legend className="mb-3">Buscador</legend>
                        <div className="row g-2 align-items-center">
                            <div className="col-12 col-md-6 col-lg-3">
                                <select
                                    className="form-select form-select-sm"
                                    defaultValue="Tipo de propiedad"
                                    name="propiedad"
                                >
                                    <option disabled>Tipo de propiedad</option>
                                    <option value="1">Casa</option>
                                    <option value="2">Departamento</option>
                                    <option value="3">Terreno</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <select className="form-select form-select-sm" defaultValue="Región" name="region">
                                    <option disabled>Región</option>
                                    <option value="1">La Serena</option>
                                    <option value="2">Santiago</option>
                                    <option value="3">Valparaíso</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <select className="form-select form-select-sm" defaultValue="Precio (UF)" name="precio">
                                    <option disabled>Precio (UF)</option>
                                    <option value="1">0 – 2.000</option>
                                    <option value="2">2.000 – 5.000</option>
                                    <option value="3">5.000+</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 text-center">
                                <a className="btn-buscar w-100 d-block" href="#buscar">
                                    Buscar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PROPIEDADES SECTION */}
                <div className="propiedades-section my-5">
                    <div className="container-fluid px-4">
                        <div className="row g-4">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div className="col-md-4" key={item}>
                                    <div className="card-propiedad shadow-sm border rounded">
                                        <img
                                            src={ejemploPropiedad}
                                            className="card-img-top rounded-top"
                                            alt="Imagen de la propiedad"
                                        />
                                        <div className="card-body p-3">
                                            <h5 className="card-title">Casa en La Serena</h5>
                                            <p className="card-text">
                                                <strong>Tipo:</strong> Casa <br />
                                                <strong>Dimensiones:</strong> 250 m² terreno · 120 m² construidos <br />
                                                <strong>Precio:</strong> 3.500 – 3.800 UF
                                            </p>
                                            <a href="#detalles" className="btn-detalles">
                                                Ver detalles
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <footer className="footer-pnk py-3 mt-auto">
                    <div className="row align-items-center px-4 w-100 g-0">
                        <div className="col-3">
                            <span className="footer-logo-text">PNK © 2026</span>
                        </div>
                        <div className="col-6 text-center">
                            <a href="#registrarpro" className="mx-2">
                                Registro Propietario
                            </a>
                            <span className="separador">—</span>
                            <a href="#registrofreelance" className="mx-2">
                                Registro Gestor
                            </a>
                        </div>
                        <div className="col-3 text-end">
                            <span className="footer-logo-text">Inmobiliaria Digital</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default App;
