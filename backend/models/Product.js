import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 12 },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    isBestSeller: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    description: { type: String },
    metal: { type: String, default: '22K Gold' },
    weight: { type: String },
    purity: { type: String, default: '916 Hallmark' }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
