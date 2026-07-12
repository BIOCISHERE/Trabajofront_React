import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import RecuperarContrasena from "./recuperarcontrasena.jsx";
import PanelAdmin from "./paneladm.jsx";
import DetallePropiedad from "./propiedades.jsx";
import RegistroPropietario from "./registrarpropietario.jsx";
import RegistroGestor from "./registrarfreelance.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/recuperarcontrasena" element={<RecuperarContrasena />} />
                <Route path="/paneladmin" element={<PanelAdmin />} />
                <Route path="/propiedades" element={<DetallePropiedad />} />
                <Route path="/registrarpropietario" element={<RegistroPropietario />} />
                <Route path="/registrarfreelance" element={<RegistroGestor />} />
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;
