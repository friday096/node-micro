import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js'; // Make sure the path is correct
import authRoutes from './routes/authRoutes.js'; // Add .js if using ES modules
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Start the server after the DB connection is established
connectDB()
  .then(() => {
    // Use app.listen to start the Express server
    app.listen(PORT, () => {
      console.log(`Auth Service running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if DB connection fails
  });
