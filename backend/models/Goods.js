import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true },
);

// userSchema.pre("save", async function () {
//     res.json({
//       message: "Report added"
//     });
// });

const Goods = mongoose.model("Goods", userSchema);
export default Goods;
