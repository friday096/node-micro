import AuthService from '../services/authService.js';
import userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../repositories/userRepository'); // Mock the userRepository
jest.mock('bcryptjs'); // Mock bcrypt
jest.mock('jsonwebtoken'); // Mock jwt

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('registerUser', () => {
    it('should register a new user and return a token', async () => {
      const userData = { email: 'test@example.com', password: '123456', fname: 'Test', lname: 'User', role: 2 };
      const hashedPassword = 'hashedPassword123';
      const token = 'jwtToken';

      userRepository.findUserByEmail.mockResolvedValue(null); // No existing user
      bcrypt.hash.mockResolvedValue(hashedPassword); // Mock hashing
      userRepository.createUser.mockResolvedValue({ _id: 'user123', ...userData, password: hashedPassword });
      jwt.sign.mockReturnValue(token); // Mock token generation

      const result = await AuthService.registerUser(userData);
      expect(result).toBe(token);
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, expect.any(Number));
      expect(userRepository.createUser).toHaveBeenCalledWith({ ...userData, password: hashedPassword });
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: 'user123', email: userData.email, role: userData.role },
        expect.any(String),
        { expiresIn: '1h' }
      );
    });

    it('should throw an error if email is already in use', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };

      userRepository.findUserByEmail.mockResolvedValue(userData); // Mock existing user

      await expect(AuthService.registerUser(userData)).rejects.toThrow('Email already in use');
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(userRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    it('should return tokens for valid credentials', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = { _id: 'user123', email, password: 'hashedPassword', role: 'user' };
      const accessToken = 'accessToken';
      const refreshToken = 'refreshToken';

      userRepository.findUserByEmail.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true); // Passwords match
      jwt.sign
        .mockReturnValueOnce(accessToken) // Access token
        .mockReturnValueOnce(refreshToken); // Refresh token

      const result = await AuthService.loginUser(email, password);
      expect(result).toEqual({ accessToken, refreshToken });
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(jwt.sign).toHaveBeenCalledTimes(2);
    });

    it('should throw an error for invalid credentials', async () => {
      const email = 'test@example.com';
      const password = 'wrongPassword';

      userRepository.findUserByEmail.mockResolvedValue(null); // No user found

      await expect(AuthService.loginUser(email, password)).rejects.toThrow('Invalid credentials');
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });
  });

  describe('getUserProfile', () => {
    it('should return user profile for a valid user ID', async () => {
      const userId = 'user123';
      const user = { _id: userId, email: 'test@example.com', fname: 'Test', lname: 'User', role: 'user' };

      userRepository.findUserById.mockResolvedValue(user);

      const result = await AuthService.getUserProfile(userId);
      expect(result).toEqual(user);
      expect(userRepository.findUserById).toHaveBeenCalledWith(userId);
    });

    it('should throw an error if user is not found', async () => {
      const userId = 'invalidUser';

      userRepository.findUserById.mockResolvedValue(null);

      await expect(AuthService.getUserProfile(userId)).rejects.toThrow('User not found');
      expect(userRepository.findUserById).toHaveBeenCalledWith(userId);
    });
  });
});
