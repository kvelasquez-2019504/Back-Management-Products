const exceptions=["price"];


/**
 * Limpia los datos de entrada, eliminando etiquetas <script> y caracteres especiales.
 * Para los campos definidos en exceptions (como 'price'), solo permite números y punto decimal.
 * @param {Object} data - Objeto con los datos a limpiar (por ejemplo, req.body).
 * @returns {Object} Objeto con los datos sanitizados.
 */
const cleanData = (data) => {
    Object.entries(data).map(([key, value]) => {
        data[key] = String(value).trim().replace(/<script.*?>.*?<\/script>/gi, '');
        if (exceptions.includes(key)) {
            switch (exceptions[key]) {
                case "price":
                    if (isNaN(value)) {
                        data[key] = 0;
                    }
                    data[key] = data[key].replace(/[^0-9.]/g, '');
                    break;
            }
            return;
        };
        data[key] = data[key].replace(/[^a-zA-Z0-9áéíóúüñÑ\s]/g, '');
    })
    return data;
}


/**
 * Middleware de Express que sanitiza los datos de entrada en req.body.
 * Elimina scripts y caracteres especiales para prevenir inyecciones y datos maliciosos.
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
export const sanitizer = async (req, res, next) => {
    if (req.body) {
        req.body = cleanData(req.body);
    }
    next();
}