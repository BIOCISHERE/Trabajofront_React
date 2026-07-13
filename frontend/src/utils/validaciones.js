// src/utils/validaciones.js
// Utilidades de validación reutilizables para los formularios del sitio.

// Valida un RUT chileno (con o sin puntos/guión) usando el dígito verificador módulo 11.
export function validarRut(rutInput) {
    if (!rutInput) return false;

    const rutLimpio = rutInput.replace(/\./g, "").replace(/-/g, "").toUpperCase().trim();

    if (!/^[0-9]+[0-9K]$/.test(rutLimpio)) return false;

    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(cuerpo.charAt(i), 10);
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const resto = 11 - (suma % 11);
    let dvEsperado;
    if (resto === 11) dvEsperado = "0";
    else if (resto === 10) dvEsperado = "K";
    else dvEsperado = String(resto);

    return dvEsperado === dv;
}

// Formatea a XX.XXX.XXX-X para mostrarlo bonito (opcional, no se usa para validar)
export function formatearRut(rutInput) {
    const rutLimpio = rutInput.replace(/\./g, "").replace(/-/g, "").toUpperCase().trim();
    if (rutLimpio.length < 2) return rutInput;

    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${cuerpoFormateado}-${dv}`;
}

export function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Calcula la edad exacta a partir de una fecha "YYYY-MM-DD"
export function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

export function telefonoValido(telefono) {
    // Solo dígitos, 9 números después del +56 (ej: 9 1234 5678 -> 912345678)
    const soloDigitos = telefono.replace(/\s/g, "");
    return /^[0-9]{9}$/.test(soloDigitos);
}