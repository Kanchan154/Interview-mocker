import Admindata from "../models/admin.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Signup controller
export const signup = async (req, res) => {
    const { id, password } = req.body;
    try {

        if (!id || !password) {
            return res.status(400).json({
                message: "Fill all fields",
                success: false
            })
        }
        let admin = await Admindata.findOne({ id });
        if (admin) {
            return res.status(400).json({
                message: "Admin id already exist",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        admin = await Admindata.create({
            id,
            password: hashedPassword,
            type: "admin"
        })
        return res.status(201).json({
            message: "Admin created successfully",
            success: true
        })


    } catch (error) {
        console.log("Error in admin signup controller", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

// Login controller
export const login = async (req, res) => {
    const { id, password } = req.body;
    try {
        if (!id || !password) {
            return res.status(400).json({
                message: "Fill all fields",
                success: false
            })
        }
        let admin = await Admindata.findOne({ id });
        if (!admin) {
            return res.status(400).json({
                message: "Admin not found",
                success: false
            })
        }
        // checking password
        const isPasswordMatch = await bcrypt.compare(password, admin.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Password doesn't match",
                success: false
            });
        }

        const TokenData = {
            adminId: admin._id
        }
        const token = await jwt.sign(TokenData, process.env.SECRET_KEY, { expiresIn: '10d' });

        admin = {
            _id: admin._id,
            id: admin.id,
            type:admin.type
        }

        return res.status(200).cookie("token", token, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back`,
            admin,
            success: true
        })

    } catch (error) {
        console.log("Error in admin login controller", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }

}

// logout controller
export const Logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", '', { maxAge: 0 }).json({
            message: "Logout Successfully",
            success: true
        })
    } catch (error) {
        console.log('Error in admin Logout Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// check admin auth
export const checkAdminAuth = async (req, res) => {
    try {
        const admin = await Admindata.findById(req.userId).select("-password");
        if (!admin) {
            return res.status(400).json({ success: false, message: "Admin not found" });
        }
        res.status(201).json({ success: true, admin })

    } catch (error) {
        console.log('Error in check-Auth Controller : ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }

}