import express from 'express'
import { checkAuth, Login, Logout, Signup } from '../controllers/auth.controller.js';
import { singleUpload } from '../middlewares/multer.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/signup',singleUpload, Signup);      //calling signup controller
router.post('/login',Login);        //calling Login controller
router.get('/logout',Logout);      //calling Logout controller
router.get('/check-auth',isAuthenticated, checkAuth);    // check auth controller

export default router;
