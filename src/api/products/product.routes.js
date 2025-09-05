import { Router } from "express";
import { check } from "express-validator";
import { addProduct } from "./product.controller.js";
import { sanitizer } from "../../middlewares/sanitizer.js";
import { validateFields } from "../../middlewares/validateFields.js";
const router = Router();

router.post(
    "/products",
    [
        check("name", "No viene el nombre del producto.").not().isEmpty(),
        check("description", "No viene la descripcion del producto.").not().isEmpty(),
        check("category", "No viene la categoria del producto.").not().isEmpty(),
        check("price", "No viene el precio o no es un número.").not().isEmpty().isNumeric(),
        validateFields,
        sanitizer,
    ],
    addProduct
);

export default router;
