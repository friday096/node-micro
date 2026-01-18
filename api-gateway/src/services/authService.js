import axios from 'axios';
import config from '../config/config.js';

const authBaseUrl = config.AUTH_SERVICE_URL;

export const loginUser = async (req, res) => {
  try {
    const response = await axios.post(`${authBaseUrl}/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.response.data.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const response = await axios.post(`${authBaseUrl}/register`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.response.data.message });
  }
};

export const getProfile = async (req, res) => {
  const token = req.headers['authorization'];
  try {
    const response = await axios.get(`${authBaseUrl}/profile`, {
      headers: {
        'Authorization': `${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.response.data.message });
  }
};

export const getTokenData = async (req, res) => {
  const token = req.headers['authorization'];
  try {
    const response = await axios.get(`${authBaseUrl}/getTokenData`, {
      headers: {
        'Authorization': `${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.response.data.message });
  }
};
