import ProductSchema from '../api/products/product.model.js';

/**
 * Valida si ya existe un producto con el mismo nombre en la base de datos.
 * Lanza un error si el nombre ya está registrado.
 * @param {string} name - Nombre del producto a validar.
 * @throws {Error} Si el producto ya existe.
 */
export const validateNameProduct = async (name = "") => {
    const productFind = await ProductSchema.findOne({ name });
    if (productFind) {
        throw new Error(`El producto '${name}' ya existe en la base de datos.`);
    }
}


/**
 * Valida si ya existe un producto con el mismo nombre, excluyendo el producto actual por id.
 * Útil para evitar duplicados al modificar un producto.
 * @param {string} name - Nombre del producto a validar.
 * @param {string} id - ID del producto actual (a excluir de la búsqueda).
 * @throws {Error} Si existe otro producto con el mismo nombre.
 */
export const validateNameProductModify = async (name = "", id = "") => {
    if (!id) {
        throw new Error("ID de producto no proporcionado para la validación.");
    }
    const productFind = await ProductSchema.find({ name, _id: { $ne: id } });
    if (productFind.length > 0) {
        throw new Error(`El producto '${name}' ya existe en la base de datos.`);
    }
}



/**
 * Valida si existe un producto con el id proporcionado en la base de datos.
 * Lanza un error si el producto no existe.
 * @param {string} id - ID del producto a validar.
 * @throws {Error} Si el producto no existe.
 */
export const validateProductById = async (id = "") => {
    const productFind = await ProductSchema.findById(id);
    if (!productFind) {
        throw new Error(`El producto con id: "${id}" no existe en la base de datos.`);
    }
}
