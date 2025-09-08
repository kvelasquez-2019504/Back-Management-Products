
import ProductSchema  from "./product.model.js";

/**
 * Crea un nuevo producto en la base de datos.
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const newProduct = new ProductSchema({ name, description, price, category });
        await newProduct.save();
        res.status(200).json({
            message: "Producto agregado correctamente.",
            products: newProduct
        })
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error interno en el servidor.",
            error
        })
    }
}


/**
 * Obtiene una lista paginada de productos.
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
export const getProducts = async (req, res) => {
    try {
        const { currentPage = 1, itemsPerPage = 5 } = req.query;
        const skip = (currentPage - 1) * itemsPerPage;
        const total = await ProductSchema.countDocuments();
        const products = await ProductSchema.find().skip(skip).limit(Number(itemsPerPage));
        res.status(200).json({
            products,
            total,
            currentPage: Number(currentPage),
            totalPages: Math.ceil(total / itemsPerPage),
            msg: "Productos obtenidos correctamente."
        })
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error interno en el servidor.",
        })
    }
}


/**
 * Actualiza un producto existente por su ID.
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;
        await ProductSchema.findByIdAndUpdate(id, { name, description, price, category });
        const updatedProduct = await ProductSchema.findById(id);
        res.status(200).json({
            message: "Producto actualizado correctamente.",
            products: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error interno en el servidor.",
        })
    }
}


/**
 * Elimina un producto por su ID.
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductSchema.findByIdAndDelete(id);
        res.status(200).json({
            message: "Producto eliminado correctamente.",
        });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error interno en el servidor.",
        })
    }
}