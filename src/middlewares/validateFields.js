import { validationResult } from "express-validator";

/**
 * Middleware de Express que valida los campos de entrada usando express-validator.
 * Si hay errores de validación, responde con un estado 400 y los detalles del error.
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
export const validateFields = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json(error);
  }

  next();
};
