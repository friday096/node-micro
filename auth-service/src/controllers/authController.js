import authService from '../services/authService.js';

class AuthController {
  async registerUser(req, res) {
    try {
      const newUser = await authService.registerUser(req.body);
      res.status(201).json({ message: 'User registered successfully', accessToken: newUser, status:'ok' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } 

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await authService.loginUser(email, password);
      res.json({ message: 'Login successful', accessToken, refreshToken, status:'ok' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUserProfile(req, res) {
    try {
      const userProfile = await authService.getUserProfile(req.user.id);
      res.json({ message: 'retrive successfully', profile:userProfile, status:'ok' });

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTokenData(req, res) {

    if(req.user){
      res.status(200).json({
        message:'Token Data Get successfully',
        status: 'ok',
        data: req.user,

      })

    }else{
      res.status(401).json({
        message: 'Something Went Wrong in Token',
        status: 'error'
      });

    }

  } 
}

export default new AuthController();
