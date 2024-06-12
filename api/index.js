import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/error.js';

dotenv.config();
const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
mongoose.connect(process.env.MONGO)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// Define routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Custom error handling middleware
app.use(errorHandler);

// General error handler for unhandled errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    statuscode: err.status || 500,
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

