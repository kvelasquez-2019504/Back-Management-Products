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

export const getProducts = async (req,res)=>{
    try {
        const {currentPage = 1, itemsPerPage = 10} = req.query;
        const skip = (currentPage - 1) * itemsPerPage;
        const total = await ProductSchema.countDocuments();
        const products = await ProductSchema.find().skip(skip).limit(Number(itemsPerPage));
        res.status(200).json({
            products,
            total,
            currentPage: Number(currentPage),
            totalPages: Math.ceil(total / itemsPerPage)
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Hubo un error interno en el servidor.",
        })
    }
}