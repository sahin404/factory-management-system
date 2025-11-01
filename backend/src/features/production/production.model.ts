import mongoose from "mongoose";

const productionSchema = new mongoose.Schema({
    products:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:1000
    }
}, {
    timestamps:true
})

const Production = mongoose.model('Production', productionSchema);

export default Production;