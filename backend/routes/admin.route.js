import express from "express"
import { checkAdminAuth, login, Logout, signup } from "../controllers/admin.controller.js";
import isAdminAuthenticated from "../middlewares/isAdminAuthenticated.js";

const router = express.Router();

router.post('/signup',signup);          // admin signup
router.post('/login', login);           // admin login
router.get('/logout', Logout);          // admin logout
router.get('/check-admin-auth',isAdminAuthenticated, checkAdminAuth)

export default router;