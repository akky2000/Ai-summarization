import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    authorName: {
      type: String,
    },
    title: {
      type: String,
    },

    description: {
      type: String,
    },
    document: {
      type: String,
    },
    originalFileName:{
        type: String
    },
    fileType:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

// Hash password before save

const Document = mongoose.model("Document ", documentSchema);

export default Document;
