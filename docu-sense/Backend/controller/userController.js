import cloudinary from "../database/cloudinary.js";
import User from "../model/authModel.js";

export const updateProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const { name, phone, description } = req.body;
    const files = req.files || {};

    // Find existing user
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const updateData = {
      name: name || existingUser.name,
      phone: phone || existingUser.phone,
      description: description || existingUser.description,
    };

    // Handle profile picture
    if (files.profilePic && files.profilePic[0]) {
      const newProfile = files.profilePic[0];

      // Delete old image from cloudinary
      if (existingUser.profilePic) {
        const publicId = existingUser.profilePic.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`user/${publicId}`);
      }

      // Upload new image
      const uploaded = await cloudinary.uploader.upload(newProfile.path, {
        folder: "user",
      });

      updateData.profilePic = uploaded.secure_url;
    }

    // Perform update
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        description: updatedUser.description,
        profilePic: updatedUser.profilePic,
      },
    });
  } catch (error) {
    console.log(error)
    return res.status(error.statusCode || 500).json({
      status: false,
      message: "Something went wrong",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
