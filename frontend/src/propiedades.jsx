// src/components/DetallePropiedad.jsx
import { Link } from "react-router-dom";

// 👇 Importamos las imágenes desde la carpeta assets
import logoInmobiliaria from "./assets/PNKINMOBILIARIA-removebg-preview.png";
import ejemploPropiedad from "./assets/ejemplo_propiedad.webp";

function DetallePropiedad() {
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
            <main className="container-fluid mt-5 flex-grow-1" style={{ flex: 1 }}>
                <div className="row mx-auto container">
                    {/* COLUMNA IZQUIERDA: IMAGEN */}
                    <div className="col-12 col-md-6 mb-4 mb-md-0">
                        <img
                            src={ejemploPropiedad}
                            className="img-fluid rounded w-100"
                            style={{ border: "1px solid var(--pnk-dark)", objectFit: "cover", maxHeight: "400px" }}
                            alt="Propiedad Departamento"
                        />
                    </div>

                    {/* COLUMNA DERECHA: DETALLES */}
                    <div
                        className="col-12 col-md-6 rounded p-4"
                        style={{ border: "1px solid var(--pnk-gray-2)", backgroundColor: "var(--pnk-white)" }}
                    >
                        <h1 className="form-title fs-2 mb-2">Propiedad Casa</h1>
                        <h3 className="text-muted fs-5 mb-4">Casa en La Serena</h3>

                        <div className="mb-4">
                            <p className="card-text mb-2">
                                <strong>Tipo:</strong> Casa
                            </p>
                            <p className="card-text mb-2">
                                <strong>Dimensiones:</strong> 250 m² terreno · 120 m² construidos
                            </p>
                            <p className="card-text mb-2">
                                <strong>Precio:</strong> 3.500 – 3.800 UF
                            </p>
                        </div>

                        {/* BOTONES DE ACCIÓN */}
                        <div
                            className="d-flex justify-content-end gap-2 pt-3 border-top"
                            style={{ borderColor: "var(--pnk-gray-2) !important" }}
                        >
                            <Link to="/" className="btn-cancelar">
                                Volver al menú
                            </Link>
                            <button type="button" className="btn-registrar">
                                Comprar propiedad
                            </button>
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

export default DetallePropiedad;
