import productService from '../services/ProductService.js';
import productRepository from '../repositories/productRepository.js';
import config from '../config/config.js';

jest.mock('../repositories/productRepository.js'); // Mocking the productRepository

describe('ProductService', () => {
  let mockUser;

  beforeEach(() => {
    mockUser = { role: config.ADMIN }; // Mock an admin user
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  it('should create a product', async () => {
    const productData = { name: 'Product 1', price: 100 };
    const mockCreatedProduct = { _id: '12345', ...productData };

    productRepository.findProductByName.mockResolvedValue(null); // No product found
    productRepository.createProduct.mockResolvedValue(mockCreatedProduct);

    const result = await productService.createProduct(mockUser, productData);
    expect(productRepository.createProduct).toHaveBeenCalledWith(productData);
    expect(result).toEqual(mockCreatedProduct);
  });

  it('should throw error if product already exists', async () => {
    const productData = { name: 'Product 1', price: 100 };
    productRepository.findProductByName.mockResolvedValue({ name: 'Product 1' }); // Product already exists

    await expect(productService.createProduct(mockUser, productData)).rejects.toThrow('Product already exists');
  });

  it('should get all products', async () => {
    const mockProducts = [
      { _id: '12345', name: 'Product 1', price: 100 },
      { _id: '67890', name: 'Product 2', price: 200 },
    ];
    productRepository.getAllProducts.mockResolvedValue(mockProducts);

    const result = await productService.getAllProducts(mockUser);
    expect(productRepository.getAllProducts).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });

  it('should throw error if user is not authorized to view products', async () => {
    mockUser = { role: 'user' }; // Non-admin user

    await expect(productService.getAllProducts(mockUser)).rejects.toThrow('Not authorized');
  });

  it('should get product by id', async () => {
    const mockProduct = { _id: '12345', name: 'Product 1', price: 100 };
    productRepository.getProductById.mockResolvedValue(mockProduct);

    const result = await productService.getProductById(mockUser, '12345');
    expect(productRepository.getProductById).toHaveBeenCalledWith('12345');
    expect(result).toEqual(mockProduct);
  });

  it('should update a product', async () => {
    const updateData = { name: 'Updated Product', price: 150 };
    const mockUpdatedProduct = { _id: '12345', ...updateData };

    productRepository.updateProduct.mockResolvedValue(mockUpdatedProduct);

    const result = await productService.updateProduct(mockUser, '12345', updateData);
    expect(productRepository.updateProduct).toHaveBeenCalledWith('12345', updateData);
    expect(result).toEqual(mockUpdatedProduct);
  });

  it('should delete a product', async () => {
    const mockProduct = { _id: '12345', name: 'Product 1', price: 100 };
    productRepository.deleteProduct.mockResolvedValue(mockProduct);

    const result = await productService.deleteProduct(mockUser, '12345');
    expect(productRepository.deleteProduct).toHaveBeenCalledWith('12345');
    expect(result).toEqual(mockProduct);
  });
});
