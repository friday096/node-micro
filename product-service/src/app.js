import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js'; 
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';


dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 6000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Product Service running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if DB connection fails
  });
