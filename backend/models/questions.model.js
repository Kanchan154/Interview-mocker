import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        unique:true
    },
    qsType:{
        type:String,
        enum:   ['easy', 'moderate', 'hard'],
        required:true,
    },
    category:{
        type:String,
        enum:   ['Psychological', 'Current Affairs' , 'History', 'Technology', 'General Ability', 'Apptitude'],
        required:true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    }
},{timestamps: true})

const QuestionModel = mongoose.model('Question',questionSchema);

export default QuestionModel;