import express from "express";
import { login, logout, register, verifyUser } from "../controller/authController.js";


const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/email-verify',verifyUser);
router.post('/logout',logout);



export default router