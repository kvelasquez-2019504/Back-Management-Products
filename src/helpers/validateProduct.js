import ProductSchema from '../api/products/product.model.js';

export const validateNameProduct=async (name="")=>{
    const productFind = await ProductSchema.findOne({name});
    if(productFind){
        throw new Error(`El producto "${name}" ya existe en la base de datos.`);
    }
}