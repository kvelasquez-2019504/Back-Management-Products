import { Router } from "express";
import { check } from "express-validator";
import { addProduct,getProducts } from "./product.controller.js";
import { sanitizer } from "../../middlewares/sanitizer.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { validateNameProduct } from "../../helpers/validateProduct.js";
const router = Router();

router.post(
    "/products",
    [
        sanitizer,
        check("name", "No viene el nombre del producto.").not().isEmpty(),
        check("description", "No viene la descripcion del producto.").not().isEmpty(),
        check("category", "No viene la categoria del producto.").not().isEmpty(),
        check("price", "No viene el precio o no es un número.").not().isEmpty().isNumeric(),
        check("name").custom(validateNameProduct),
        validateFields,
    ],
    addProduct
);

router.get("/products",[
    check("currentPage","El numero de pagina actual debe ser un numero").optional().isNumeric(),
    check("itemsPerPage","La cantidad de items por pagina debe ser un numero").optional().isNumeric(),
    validateFields,
], getProducts);

export default router;
