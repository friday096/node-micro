import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL
};
