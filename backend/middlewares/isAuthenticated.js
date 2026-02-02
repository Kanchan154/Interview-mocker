import jwt from 'jsonwebtoken'
import UserData from '../models/auth.model.js';
const isAuthenticated = async (req, res, next) => {
    try {
        // getting the token from the cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'User not authenticated',
                success: false,
            })
        }
        
        // decoding the JSON web token
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({
                message: 'Invalid Token',
                success: false,
            })
        }
        
        // finding user with the help of the token data
        const user = await UserData.findById(decoded.userId).select('-Password');
        if(!user){
            return res.status(401).json({
                message: "user not authorized",
                success: false
            })
        }
        req.userId = user;
        next();

    } catch (error) {
        console.log("Error is generating the token : " + error.message)
    }
}

export default isAuthenticated;
