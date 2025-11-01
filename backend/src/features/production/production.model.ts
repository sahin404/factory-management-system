import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product:{
        type:Number,
        required:true,
        default:0
    }
}, {
    timestamps:true
})

const Product = mongoose.model('Product', productSchema);

export default Product;