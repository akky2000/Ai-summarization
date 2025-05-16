import express from "express";
import { getAllDocuments, getDocumentsByType, uploadDocument } from "../controller/documentController.js";
import {  documentUpload } from "../middleware/multerSetup.js";



const router = express.Router();

router.post('/upload-document/:id', documentUpload,uploadDocument);
router.get('/type/:type', getDocumentsByType);
router.get('/all-documents/:id', getAllDocuments);


// router.post('/login',login);
// router.post('/email-verify',verifyUser);
// router.post('/logout',logout);



export default router