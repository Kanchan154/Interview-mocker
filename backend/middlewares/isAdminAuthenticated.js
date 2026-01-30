import jwt from 'jsonwebtoken';
import Admindata from '../models/admin.model.js';

const isAdminAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized : no token provided ...",
                success: false
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).send({ error: 'Unauthorized : Invalid provided....' });
        }

        const admin = await Admindata.findById(decoded.adminId).select('-Password');
        if (!admin) {
            return res.status(401).json({
                message: "Admin not authorized",
                success: false
            })
        }

        req.userId = admin;
        next();

    } catch (error) {
        console.log("Error in isAdminAuthenticated Route : ", error.message)
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export default isAdminAuthenticated;