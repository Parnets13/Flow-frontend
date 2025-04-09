import Product from '../models/ProductModel.js';

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, shortDescription, mainImage, specifications, fullDescription, price, features, additionalImages } = req.body;
    const product = new Product({
      name,
      shortDescription,
      mainImage,
      specifications,
      fullDescription,
      price,
      features,
      additionalImages,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { name, shortDescription, mainImage, specifications, fullDescription, price, features, additionalImages } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.shortDescription = shortDescription || product.shortDescription;
      product.mainImage = mainImage || product.mainImage;
      product.specifications = specifications || product.specifications;
      product.fullDescription = fullDescription || product.fullDescription;
      product.price = price || product.price;
      product.features = features || product.features;
      product.additionalImages = additionalImages || product.additionalImages;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};