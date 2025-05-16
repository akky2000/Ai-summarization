import express from "express";
import { updateProfile } from "../controller/userController.js";
import {  userUpload } from "../middleware/multerSetup.js";


const router = express.Router();

router.put('/update-profile/:id',userUpload ,updateProfile);
// router.post('/login',login);
// router.post('/email-verify',verifyUser);
// router.post('/logout',logout);



export default router