import productRepository from '../repositories/productRepository.js';
import config from '../config/config.js';

class ProductService {

  async createProduct(user, productData) {
    // Admin role check
    if (!user || user.role !== config.ADMIN) {
      throw new Error('Not authorized');
    }

    // Check if product already exists
    const existingProduct = await productRepository.findProductByName(productData.name);
    if (existingProduct) {
      throw new Error('Product already exists');
    }

    // Create product
    const createdProduct = await productRepository.createProduct(productData);
    return createdProduct;
  }

  async getAllProducts(user) {
    // Admin role check (though you may want to let users view all products)
    if (!user || user.role !== config.ADMIN) {
      throw new Error('Not authorized');
    }

    return await productRepository.getAllProducts();
  }

  async getProductById(user, id) {
    // Admin role check
    if (!user || user.role !== config.ADMIN) {
      throw new Error('Not authorized');
    }

    const product = await productRepository.getProductById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async updateProduct(user, id, productData) {
    // Admin role check
    if (!user || user.role !== config.ADMIN) {
      throw new Error('Not authorized');
    }

    const updatedProduct = await productRepository.updateProduct(id, productData);
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return updatedProduct;
  }

  async deleteProduct(user, id) {
    // Admin role check
    if (!user || user.role !== config.ADMIN) {
      throw new Error('Not authorized');
    }

    const deletedProduct = await productRepository.deleteProduct(id);
    if (!deletedProduct) {
      throw new Error('Product not found');
    }
    return deletedProduct;
  }
}

export default new ProductService();
