const TABLES = {
    users: 'users',
    countries: 'countries',
    departments: 'departments',
    cities: 'cities',
    languages: 'languages',
    translation_services: 'translation_services',
    specialities: 'specialities',
    reviews: 'reviews',
    transactions: 'transactions',
    unavailabilities: 'unavailabilities',
    platforms: 'platforms'
};

const REGEX = {
    EMAIL: /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/,
    PASSWORD: /^(?=.*[0-9])(?=.*[A-zñ!@#$%^&*])([A-z0-9ñ!@#$%^&*]+)$/,
    CELLPHONE: /^(\+)?[0-9]+$/,
    NUMERIC: /^[0-9]+$/
};

const VALIDATION_ERRORS = {
    REQUIRED_FIELD: 'Campo requerido.',
    MIN_LENGTH: (min) => `Ingrese al menos ${min} caracteres en este campo`,
    MAX_LENGTH: (max) => `Ingrese menos de ${max} caracteres en este campo`,
    INVALID_FIELD: (field) => `Por favor ingrese un(a) ${field} válido(a).`,
    NOT_EXIST: (field) => `${field} no existe.`,
    NOT_AVAILABLE: (field) => `${field} ya está siendo usado`,
    BETWEEN: (field, one, two) => `${field} debe estar entre ${one} y ${two}`,
    FILE_NOT_ALLOWED: () => "Archivo no permitido"
};

const SERVICE_STATUSES = ['cancelled'];


module.exports = {
    TABLES,
    VALIDATION_ERRORS,
    REGEX
};
