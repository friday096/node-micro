import axios from 'axios';
import config from '../config/config.js';

const productBaseUrl = config.PRODUCT_SERVICE_URL;

export const createProduct = async (req, res) => {
  const token = req.headers['authorization'];
  try {
    const response = await axios.post(`${productBaseUrl}`, req.body, {
      headers: {
        'Authorization': `${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });

  }
};

export const getProducts = async (req, res) => {
  const token = req.headers['authorization'];
  try {
    const response = await axios.get(`${productBaseUrl}`, {
      headers: {
        'Authorization': `${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const token = req.headers['authorization'];
  const { id } = req.params;
  try {
    const response = await axios.get(`${productBaseUrl}/${id}`, {
      headers: {
        'Authorization': `${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const token = req.headers['authorization'];
  const { id } = req.params;
  try {
    const response = await axios.put(`${productBaseUrl}/${id}`, req.body, {
      headers: {
        'Authorization': `${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const token = req.headers['authorization'];
  const { id } = req.params;
  try {
    const response = await axios.delete(`${productBaseUrl}/${id}`, {
      headers: {
        'Authorization': `${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};
