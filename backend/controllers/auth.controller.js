import UserData from "../models/auth.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";


// Signup Controller
export const Signup = async (req, res) => {
    try {
        const { Application_No, mobile, email, password, dob, name } = req.body;

        // checking all fields
        if (!Application_No || !mobile || !email || !password || !name || !dob) {
            return res.status(400).json({
                message: 'Fill all the fields',
                success: false
            });
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudresponse = await cloudinary.uploader.upload(fileUri.content)

        // checking whether user is already registered
        let user = await UserData.findOne({ Application_No })
        if (user) {
            return res.status(400).json({
                message: 'Application number already exists',
                success: false
            });
        }
        user = await UserData.findOne({ mobile })
        if (user) {
            return res.status(400).json({
                message: 'Mobile number already exists',
                success: false
            });
        }
        user = await UserData.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'email already exists',
                success: false
            });
        }

        // creating user to the database with hashed password
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await UserData.create({
            Application_No,
            mobile,
            email,
            password: hashedPassword,
            name,
            dob,
            type: "student",
            profile: {
                ProfilePic: cloudresponse.secure_url
            },
        })
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.log("Error in SignUp Controller : ", error.message)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

// Login Controller
export const Login = async (req, res) => {
    try {
        const { loginCredential, password } = req.body;

        if (!loginCredential || !password) {
            return res.status(400).json({
                message: 'Fill all the fields',
                success: false
            });
        }
        // check whether the user is in the database or not
        let user = await UserData.findOne({ Application_No: loginCredential });
        if (!user) {
            user = await UserData.findOne({ email: loginCredential });
            if (!user) {
                user = await UserData.findOne({ mobile: loginCredential });
                if (!user) {
                    return res.status(400).json({
                        message: 'User not registered.',
                        success: false
                    })
                }
            }
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Password doesn't match",
                success: false
            });
        }

        const TokenData = {
            userId: user._id
        }
        const token = await jwt.sign(TokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            email: user.email,
            Application_No: user.Application_No,
            mobile: user.mobile,
            profile: user.profile,
            name: user.name,
            type: user.type,
            dob: user.dob,
            status: user.status,
            questions: user.questions,
            haveQuestions: user.haveQuestions
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    }
    catch (error) {
        console.log('Error in Login Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// Logout Controller
export const Logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", '', { maxAge: 0 }).json({
            message: "Logout Successfully",
            success: true
        })
    } catch (error) {
        console.log('Error in user Logout Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// checking authentication
export const checkAuth = async (req, res) => {
    try {
        const user = await UserData.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log('Error in check-Auth Controller : ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// update or add questions

// give marks and select status
