import ProductSchema from '../api/products/product.model.js';

export const validateNameProduct=async (method="",length=0)=>{
    switch (method) {
        case "POST":
        case "PUT":
            if(length>0) return true;
    }
}

export const validateProductById=async (id="")=>{
    const productFind = await ProductSchema.findById(id);
    if(!productFind){
        throw new Error(`El producto con id: "${id}" no existe en la base de datos.`);
    }
}