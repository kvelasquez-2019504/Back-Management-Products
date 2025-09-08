import ProductSchema from '../api/products/product.model.js';

export const validateNameProduct=async (name="")=>{
    const productFind = await ProductSchema.findOne({name});
    if(productFind){
        throw new Error(`El producto '${name}' ya existe en la base de datos.`);
    }0
}

export const validateNameProductModify = async (name = "", id = "") => {
    if (!id) {
        throw new Error("ID de producto no proporcionado para la validación.");
    }
    const productFind = await ProductSchema.find({ name, _id: { $ne: id } });
    if (productFind.length > 0) {
        throw new Error(`El producto '${name}' ya existe en la base de datos.`);
    }
}


export const validateProductById=async (id="")=>{
    const productFind = await ProductSchema.findById(id);
    if(!productFind){
        throw new Error(`El producto con id: "${id}" no existe en la base de datos.`);
    }
}
