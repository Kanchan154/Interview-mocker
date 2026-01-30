import mongoose from "mongoose";

const userSchama = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    Application_No: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profile: {
        ProfilePic: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'Pending',
            enum: ['Selected', 'Rejected', "Pending"],
        },
        marks: {
            type: Number
        }
    },
    questions: [],
    haveQuestions: {
        type:Boolean,
        default: false
    }
})

const UserData = mongoose.model('User', userSchama);

export default UserData;