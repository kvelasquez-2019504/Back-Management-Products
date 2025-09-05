import ProductSchema from '../api/products/product.model.js';

export const validateNameProduct=async (req,res,next)=>{
    const {name}=req.body;
    
    const productFind = await ProductSchema.find({name:name});
    if(productFind){
        return res.status(400).json({
            msg:"El nombre de este producto ya existe"
        });
    }
    next();
}