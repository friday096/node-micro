import userRepository from '../repositories/userRepository.js';  // Ensure file extension is correct
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

class AuthService {
  // Register a new user
  async registerUser(userData) {
    const { email, password, fname, lname, role } = userData;

    // Check if email is already in use
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Hash the user's password before saving it
    const hashedPassword = await bcrypt.hash(password, Number(config.BCRYPT_SALT_ROUNDS));

    // Create a new user in the database
    const newUser = await userRepository.createUser({
      fname, lname, email, password: hashedPassword, role
    });

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,    // Store the user ID in the token
        email: newUser.email,    // Store email for easy access (if needed)
        role: newUser.role       // Store the user's role
      },
      config.JWT_SECRET,       // Secret key to sign the token
      { expiresIn: '1h' }      // Set token expiration (1 hour in this case)
    );

    return token
  }

  // Login a user and generate JWT tokens
  async loginUser(email, password) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Use bcrypt.compare to check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT tokens
    const accessToken = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: '7d' });
    const refreshToken = jwt.sign({ id: user._id, role: user.role }, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  // Get user profile
  async getUserProfile(userId) {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default new AuthService();
