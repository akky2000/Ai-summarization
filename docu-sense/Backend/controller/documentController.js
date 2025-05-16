// controllers/documentController.js

import cloudinary from "../database/cloudinary.js";
import Document from "../model/documentModel.js";

export const uploadDocument = async (req, res) => {
  try {
    const id = req.params.id;
    const { authorName, title, description } = req.body;
    const files = req.files || {};
    const fileList = files.document || []; // ← array of docs
    const file = fileList[0];

    if (!file) {
      return res.status(400).json({ message: "No document uploaded." });
    }

    // 1) upload to Cloudinary
    const uploaded = await cloudinary.uploader.upload(file.path, {
      folder: "docsense/uploads",
      resource_type: "auto",
    });

    // 2) save to Mongo
    const newDoc = await Document.create({
      user: id,
      authorName,
      title,
      description,
      document: uploaded.secure_url,
      fileType: file.mimetype,
      originalFileName: file.originalname,
    });

    return res.status(201).json({
      status: true,
      message: "Document uploaded successfully",
      data: newDoc,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Failed to upload document",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// controllers/documentController.js

// Supported document types mapping
const DOCUMENT_TYPES = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  txt: "text/plain",
  // Add more types as needed
};

// controllers/documentController.js
import { buildQueryOptions, applyQueryFeatures } from "../utils/queryHelper.js";

// GET /api/documents/type/:type?page=&limit=&sort=
export const getDocumentsByType = async (req, res) => {
  try {
    const typeKey = req.params.type.toLowerCase();
    const mimeType = DOCUMENT_TYPES[typeKey];
    if (!mimeType) {
      const valid = Object.keys(DOCUMENT_TYPES).join(", ");
      return res.status(400).json({
        status: false,
        message: `Invalid document type. Supported: ${valid}`,
      });
    }

    // Build filters & features
    const filters = buildQueryOptions(req.query, { fileType: mimeType });
    let mongoQuery = Document.find(filters);
    const { query, page, limit } = applyQueryFeatures(mongoQuery, req.query);

    // Execute both count and data
    const [documents, total] = await Promise.all([
      query.exec(),
      Document.countDocuments({ fileType: mimeType }),
    ]);

    return res.status(200).json({
      status: true,
      data: {
        total,
        page,
        pages: Math.ceil(total / limit),
        count: documents.length,
        documents,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch documents by type",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};


export const getAllDocuments = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch all documents created by this user, newest first
    const documents = await Document.find({ user: userId }).sort("-createdAt");

    return res.status(200).json({
      status: true,
      data: {
        count: documents.length,
        documents,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch documents",
      error: process.env.NODE_ENV === "development"
        ? err.message
        : undefined,
    });
  }
};

