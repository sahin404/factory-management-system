import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Production",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  soldAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
