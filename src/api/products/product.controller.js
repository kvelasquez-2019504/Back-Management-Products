import ProductSchema  from "./product.model.js";

export const addProduct=async (req,res)=>{
    try {
        const{ name, description,price,category }=req.body;

        res.status(200).json({
            message:"Ok status"
        })
    } catch (error) {
        res.status(500).json({
            message:"Hubo un error interno en el servidor.",
            error
        })
    }
}