import mongoose from "mongoose";

const withdrawSchema = new mongoose.Schema({
  shop: {
    type: Object,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Widthdraw = mongoose.model("Withdraw", withdrawSchema);
export default Widthdraw;
