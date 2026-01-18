import User from '../models/User.js'; // Use import for ES Modules

class UserRepository {
  async createUser(data) {
    const user = new User(data);
    return await user.save();
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async findUserById(id) {
    return await User.findById(id);
  }

  async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }
}

export default new UserRepository(); // Use export for ES Modules
