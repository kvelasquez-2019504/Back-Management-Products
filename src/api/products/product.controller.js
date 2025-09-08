import ProductSchema  from "./product.model.js";
import { validateNameProduct } from "../../helpers/validateProduct.js";

export const addProduct=async (req,res)=>{
    try {
        const{ name, description, price, category }=req.body;

        const newProduct = new ProductSchema({name,description,price,category});
        await newProduct.save();
        res.status(200).json({
            message:"Producto agregado correctamente.",
            products:newProduct
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
        const {currentPage = 1, itemsPerPage = 5} = req.query;
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
            message:"Hubo un error interno en el servidor.",
        })
    }
}

export const updateProduct=async (req,res)=>{
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;

        await ProductSchema.findByIdAndUpdate(id, 
            { name, description, price, category }
        );
        const updatedProduct = await ProductSchema.findById(id);
        res.status(200).json({
            message:"Producto actualizado correctamente.",
            products: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            message:"Hubo un error interno en el servidor.",
        })
    }
}

export const deleteProduct=async (req,res)=>{
    try {
        const { id } = req.params;
        await ProductSchema.findByIdAndDelete(id);
        res.status(200).json({
            message:"Producto eliminado correctamente.",
        });
    } catch (error) {
        res.status(500).json({
            message:"Hubo un error interno en el servidor.",
        })
    }
}