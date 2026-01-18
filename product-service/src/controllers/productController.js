import productService from "../services/ProductService.js";

class ProductController {
  async createProduct(req, res) {
    try {
      // Pass req.user (user info) to the service function
      const product = await productService.createProduct(req.user, req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      // Pass req.user to service (even though it's not necessary here for just reading)
      const products = await productService.getAllProducts(req.user);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      // Pass req.user to service (in case authorization check is needed)
      const product = await productService.getProductById(req.user, req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      // Pass req.user to service for updating
      const product = await productService.updateProduct(req.user, req.params.id, req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      // Pass req.user to service for deleting
      const product = await productService.deleteProduct(req.user, req.params.id);
      res.status(200).json({ message: 'Product deleted', product });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new ProductController();
