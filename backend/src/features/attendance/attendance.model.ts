import mongoose from 'mongoose';

const AttedanceSchema = new mongoose.Schema({
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ['present',  'absent', 'leave'],
        required:true
    }
},{timestamps:true})

const Attendance = mongoose.model('Attendance', AttedanceSchema);
export default Attendance;