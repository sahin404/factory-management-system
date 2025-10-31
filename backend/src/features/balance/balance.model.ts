import mongoose from 'mongoose';


const balanceSchema = new mongoose.Schema({
    balance:{
        type:Number,
        required:true,
        default: 0
    }
})

const Balance = mongoose.model('Balance', balanceSchema);

export default Balance;
