import ProductSchema  from "./product.model.js";

export const addProduct=async (req,res)=>{
    try {
        const{ name, description, price, category }=req.body;
        const newProduct = new ProductSchema({name,description,price,category});
        await newProduct.save();
        res.status(200).json({
            message:"Producto agregado correctamente.",
            product:newProduct
        })
    } catch (error) {
        res.status(500).json({
            message:"Hubo un error interno en el servidor.",
            error
        })
    }
}
