import {Schema,model} from 'mongoose';

const ProductSchema = new Schema({
    name:{
        type:String,
        required: [true, "El nombre es obligatorio."]
    },
    description:{
        type:String,
        required:[true, "La descripcion es obligatoria."]
    },
    category:{
        type:String,
        required: [true, "La categoria es obligatoria."]
    },
    price:{
        type:Number,
        required: [true, "El precio es obligatorio."]
    }
});

ProductSchema.methods.toJSON = function(){
    const {__v,_id, ...product} = this.toObject();
    product.id = _id;
    return product;
}

export default model("ProductSchema",ProductSchema);