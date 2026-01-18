import mongoose from 'mongoose';
const { Schema } = mongoose;

const Status = {
  ACTIVE: 1,
  INACTIVE: 2,
};

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },

    status: {
      type: Number,
      enum: [Status.ACTIVE, Status.INACTIVE],
      default: Status.ACTIVE,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default ProductModel;