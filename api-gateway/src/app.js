import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const PORT = config.PORT;
const app = express();
app.use(express.json());
app.use(cors());
// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

// Get port from environment variables (default to 7000 if not defined)

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

export default app;
