import Product from '../models/Product.js';

class ProductRepository {
  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  async findProductByName(name) {
    return await Product.findOne({ name });
  }

  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductRepository();
