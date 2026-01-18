import productController from '../controllers/productController.js';
import productService from '../services/ProductService.js';

jest.mock('../services/productService.js'); // Mocking the productService

describe('ProductController', () => {
  let req, res;

  beforeEach(() => {
    req = { user: { role: 'admin' }, body: { name: 'Product 1', price: 100 }, params: { id: '12345' } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  it('should create a product', async () => {
    const mockProduct = { _id: '12345', name: 'Product 1', price: 100 };
    productService.createProduct.mockResolvedValue(mockProduct);

    await productController.createProduct(req, res);

    expect(productService.createProduct).toHaveBeenCalledWith(req.user, req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should get all products', async () => {
    const mockProducts = [
      { _id: '12345', name: 'Product 1', price: 100 },
      { _id: '67890', name: 'Product 2', price: 200 },
    ];
    productService.getAllProducts.mockResolvedValue(mockProducts);

    await productController.getAllProducts(req, res);

    expect(productService.getAllProducts).toHaveBeenCalledWith(req.user);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });

  it('should get a product by id', async () => {
    const mockProduct = { _id: '12345', name: 'Product 1', price: 100 };
    productService.getProductById.mockResolvedValue(mockProduct);

    await productController.getProductById(req, res);

    expect(productService.getProductById).toHaveBeenCalledWith(req.user, req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should update a product', async () => {
    const mockProduct = { _id: '12345', name: 'Updated Product', price: 150 };
    productService.updateProduct.mockResolvedValue(mockProduct);

    await productController.updateProduct(req, res);

    expect(productService.updateProduct).toHaveBeenCalledWith(req.user, req.params.id, req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should delete a product', async () => {
    const mockProduct = { _id: '12345', name: 'Product 1', price: 100 };
    productService.deleteProduct.mockResolvedValue(mockProduct);

    await productController.deleteProduct(req, res);

    expect(productService.deleteProduct).toHaveBeenCalledWith(req.user, req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted', product: mockProduct });
  });
});
