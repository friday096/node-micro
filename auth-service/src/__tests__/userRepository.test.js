import UserRepository from '../repositories/userRepository.js';
import User from '../models/User.js';

jest.mock('../models/User.js'); // Mocking the User model

describe('UserRepository', () => {
  describe('createUser', () => {
    it('should create a new user and return it', async () => {
      const userData = { fname: 'John', lname: 'Doe', email: 'john@example.com', password: 'hashedPassword' };
      const mockUser = { _id: '123', ...userData };

      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockUser),
      }));

      const result = await UserRepository.createUser(userData);

      expect(User).toHaveBeenCalledWith(userData);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user when found by email', async () => {
      const email = 'john@example.com';
      const mockUser = { _id: '123', email };

      User.findOne.mockResolvedValue(mockUser);

      const result = await UserRepository.findUserByEmail(email);

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(mockUser);
    });

    it('should return null if no user found by email', async () => {
      User.findOne.mockResolvedValue(null);

      const result = await UserRepository.findUserByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findUserById', () => {
    it('should return a user when found by ID', async () => {
      const id = '123';
      const mockUser = { _id: id };

      User.findById.mockResolvedValue(mockUser);

      const result = await UserRepository.findUserById(id);

      expect(User.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUser);
    });

    it('should return null if no user found by ID', async () => {
      User.findById.mockResolvedValue(null);

      const result = await UserRepository.findUserById('nonexistentId');

      expect(result).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should update the user and return updated data', async () => {
      const id = '123';
      const data = { fname: 'UpdatedName' };
      const mockUpdatedUser = { _id: id, ...data };

      User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

      const result = await UserRepository.updateUser(id, data);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(id, data, { new: true });
      expect(result).toEqual(mockUpdatedUser);
    });
  });
});
