import productRepository from '../repositories/productRepository.js';
import Product from '../models/Product.js';

jest.mock('../models/Product.js'); // Mocking Product model

describe('ProductRepository', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  it('should create a product', async () => {
    const productData = { name: 'Product 1', price: 100 };
    const mockProduct = { _id: '12345', ...productData };

    Product.prototype.save = jest.fn().mockResolvedValue(mockProduct);

    const result = await productRepository.createProduct(productData);
    expect(result).toEqual(mockProduct);
    expect(Product.prototype.save).toHaveBeenCalledWith();
  });

  it('should find a product by name', async () => {
    const productData = { name: 'Product 1' };
    const mockProduct = { _id: '12345', name: 'Product 1', price: 100 };

    Product.findOne = jest.fn().mockResolvedValue(mockProduct);

    const result = await productRepository.findProductByName(productData.name);
    expect(result).toEqual(mockProduct);
    expect(Product.findOne).toHaveBeenCalledWith({ name: 'Product 1' });
  });

  it('should get all products', async () => {
    const mockProducts = [
      { _id: '12345', name: 'Product 1', price: 100 },
      { _id: '67890', name: 'Product 2', price: 200 },
    ];

    Product.find = jest.fn().mockResolvedValue(mockProducts);

    const result = await productRepository.getAllProducts();
    expect(result).toEqual(mockProducts);
    expect(Product.find).toHaveBeenCalled();
  });

  it('should get a product by id', async () => {
    const mockProduct = { _id: '12345', name: 'Product 1', price: 100 };

    Product.findById = jest.fn().mockResolvedValue(mockProduct);

    const result = await productRepository.getProductById('12345');
    expect(result).toEqual(mockProduct);
    expect(Product.findById).toHaveBeenCalledWith('12345');
  });

  it('should update a product', async () => {
    const updatedData = { name: 'Updated Product', price: 150 };
    const mockUpdatedProduct = { _id: '12345', ...updatedData };

    Product.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedProduct);

    const result = await productRepository.updateProduct('12345', updatedData);
    expect(result).toEqual(mockUpdatedProduct);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('12345', updatedData, { new: true });
  });

  it('should delete a product', async () => {
    const mockProduct = { _id: '12345', name: 'Product 1', price: 100 };

    Product.findByIdAndDelete = jest.fn().mockResolvedValue(mockProduct);

    const result = await productRepository.deleteProduct('12345');
    expect(result).toEqual(mockProduct);
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith('12345');
  });
});
