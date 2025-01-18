import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  categories: {
    type: Array,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);