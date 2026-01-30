import UserData from "../models/auth.model.js";
import QuestionModel from "../models/questions.model.js";

// Post Question
export const postQuestion = async (req, res) => {
    const { question, qsType, category } = req.body;
    const adminId = req.userId;
    try {
        if (!question || !qsType || !category) {
            return res.status(400).json({
                message: "Fill all the fields",
                success: false
            })
        }
        let Question = await QuestionModel.findOne({ question });
        if (Question) {
            return res.status(400).json({
                message: "Question already exists",
                success: false
            })
        }
        Question = await QuestionModel.create({
            question,
            qsType,
            category,
            createdBy: adminId
        });
        return res.status(201).json({
            message: "Question Posted successfully",
            Question,
            success: true
        })
    } catch (error) {
        console.log('Error in PostQuestion Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// Get all questions for admin 
export const getAllQuestions = async (req, res) => {
    try {
        const questions = await QuestionModel.find().sort({ createdAt: -1 });
        const count = await QuestionModel.countDocuments();
        if (!questions) {
            return res.status(200).json({
                success: false,
                message: "No Question Listed"
            })
        }
        res.status(201).json({
            success: true,
            count,
            questions
        })
    } catch (error) {
        console.log("Error in Get All questions controller " + error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

// delete question by admin
export const deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;
        const response = await QuestionModel.findOneAndDelete({ _id: questionId });
        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            })
        }
        res.status(201).json({
            success: true,
            message: "Question deleted successfully"
        })
    } catch (error) {
        console.log("Error in deleteQuesion Controller : " + error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })

    }

}

// get questions for students
export const getQuestionforStudent = async (req, res) => {
    try {
        const userId = req.userId;
        let user = await UserData.findOne({ _id: userId._id });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not authenticated",
            })
        }
        if (!user.haveQuestions) {
            for (var i = 0; i <= 3; i++) {
                if (i = 1) {
                    await QuestionModel.aggregate([{ $match: { qsType: "easy" } }, { $project: { _id: 1, question: 1, qsType: 1, category: 1 } }, { $sample: { size: 3 } }]).then((randomDoc) => {
                        user.questions.push(randomDoc);
                    });
                }
                if (i = 2) {
                    await QuestionModel.aggregate([{ $match: { qsType: "intermediate" } }, { $project: { _id: 1, question: 1, qsType: 1, category: 1 } }, { $sample: { size: 3 } }]).then((randomDoc) => {
                        user.questions.push(randomDoc);
                    });
                }
                if (i = 3) {
                    await QuestionModel.aggregate([{ $match: { qsType: "hard" } }, { $project: { _id: 1, question: 1, qsType: 1, category: 1 } }, { $sample: { size: 4 } }]).then((randomDoc) => {
                        user.questions.push(randomDoc);
                    });
                }
            }
            user.haveQuestions = true;
            await user.save();
        }
        else {
            return res.status(201).json({
                message: "You have your questions already there",
                user,
                success: true
            })
        }

        res.status(201).json({
            message: "Your Interview questions are there",
            user,
            success: true
        })

    } catch (error) {
        console.log("Error in getQuestionforStudent controller : " + error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}