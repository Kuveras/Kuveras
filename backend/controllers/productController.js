import Product from '../models/Product.js';
import { fetchGoogleSheetData } from '../services/sheetsService.js';

// Helper to merge Google Sheet images into product objects
function mergeSheetImages(product, sheetData) {
  if (!sheetData || !sheetData.imagesByProductId) return product;
  const pObj = typeof product.toObject === 'function' ? product.toObject() : { ...product };
  const pId = pObj.id || (pObj._id ? pObj._id.toString() : '');
  const pName = (pObj.name || '').trim().toLowerCase();

  const newImages =
    sheetData.imagesByProductId[pId] ||
    sheetData.imagesByProductName[pName] ||
    null;

  if (newImages && newImages.length > 0) {
    pObj.images = newImages;
    pObj.image = newImages[0];
    pObj.gallery = newImages;
  }
  return pObj;
}

// @desc    Fetch all products with optional category filtering
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    let products = await Product.find(filter);

    // Merge latest dynamic images from Google Sheets
    try {
      const sheetData = await fetchGoogleSheetData();
      products = products.map((p) => mergeSheetImages(p, sheetData));
    } catch (sheetErr) {
      console.warn('[ProductController] Could not merge sheet images:', sheetErr.message);
    }

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    try {
      const sheetData = await fetchGoogleSheetData();
      product = mergeSheetImages(product, sheetData);
    } catch (sheetErr) {
      console.warn('[ProductController] Could not merge sheet images for item:', sheetErr.message);
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Public (or Admin)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
