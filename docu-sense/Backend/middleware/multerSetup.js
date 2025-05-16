import cloudinary from "../database/cloudinary.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary storage with dynamic folder and automatic file type detection
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => ({
    folder: req.uploadFolder || "bikerent/default",
    public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    resource_type: "auto", // Automatically detects file type (image, video, raw, etc.)
  }),
});

// Multer instance allowing all file types and limiting file size
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // Allow up to 20MB (adjust as needed)
  fileFilter: (req, file, cb) => {
    // Accept any file type
    cb(null, true);
  }
});

// Middleware for user-specific uploads (profile pictures, DLs)
export const userUpload = upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "dlimage", maxCount: 1 },
]);

// Middleware for document uploads (single file under "document")
export const documentUpload = upload.fields([
  { name: "document", maxCount: 1 },
]);




// 👇 NEW: For uploading any kind of document/image
export const allFileUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit (adjust if needed)
  fileFilter: (req, file, cb) => {
    // Accept all file types (images, docs, spreadsheets, pdfs, etc.)
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "text/csv",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
      "text/plain"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
}).single("document"); // 👈 field name should be "document" in the form
