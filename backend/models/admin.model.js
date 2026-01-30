import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
}, { timestamps: true })

const Admindata = mongoose.model('admin', adminSchema);

export default Admindata;