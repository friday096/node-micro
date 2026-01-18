
import authController from '../controllers/authController.js';
import authService from '../services/authService.js';

jest.mock('../services/authService.js'); // Mocking the authService

describe('AuthController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, user: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('registerUser', () => {
    it('should return 201 status and accessToken on successful registration', async () => {
      const mockAccessToken = 'test-access-token';
      authService.registerUser.mockResolvedValue(mockAccessToken);

      req.body = { email: 'test@example.com', password: '123456' };

      await authController.registerUser(req, res);

      expect(authService.registerUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        accessToken: mockAccessToken,
      });
    });

    it('should return 400 status and error message if registration fails', async () => {
      const errorMessage = 'Email already in use';
      authService.registerUser.mockRejectedValue(new Error(errorMessage));

      await authController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('loginUser', () => {
    it('should return access and refresh tokens on successful login', async () => {
      const mockTokens = { accessToken: 'access-token', refreshToken: 'refresh-token' };
      authService.loginUser.mockResolvedValue(mockTokens);

      req.body = { email: 'test@example.com', password: 'password123' };

      await authController.loginUser(req, res);

      expect(authService.loginUser).toHaveBeenCalledWith(req.body.email, req.body.password);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        accessToken: mockTokens.accessToken,
        refreshToken: mockTokens.refreshToken,
      });
    });

    it('should return 400 status and error message if login fails', async () => {
      const errorMessage = 'Invalid credentials';
      authService.loginUser.mockRejectedValue(new Error(errorMessage));

      await authController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('getUserProfile', () => {
    it('should return user profile on successful retrieval', async () => {
      const mockUserProfile = { id: '123', name: 'Test User' };
      authService.getUserProfile.mockResolvedValue(mockUserProfile);

      req.user.id = '123';

      await authController.getUserProfile(req, res);

      expect(authService.getUserProfile).toHaveBeenCalledWith(req.user.id);
      expect(res.json).toHaveBeenCalledWith(mockUserProfile);
    });

    it('should return 400 status and error message if user not found', async () => {
      const errorMessage = 'User not found';
      authService.getUserProfile.mockRejectedValue(new Error(errorMessage));

      await authController.getUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
