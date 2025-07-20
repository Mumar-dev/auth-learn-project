const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         enum: ["buyer", "seller", "admin"],
         default: "buyer",
      },
   },
   {
      timestamps: true, // ✅ Correct Placement Here
   }
);

module.exports = mongoose.model("User", UserSchema);
