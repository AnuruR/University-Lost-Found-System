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
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Lost: {
      type: Boolean,
      default: true,
    },
    Found: {
      type: Boolean,
      default: false,
    },
    Claimed: {
      type: Boolean,
      default: false,
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
