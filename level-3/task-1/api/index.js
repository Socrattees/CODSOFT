import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';
import helmet from 'helmet';
import path from 'path';
import productRouter from "./routes/products.js";
import { fileURLToPath } from 'url';

const app = express();

// Database connection to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to mongoDB');
});

// Allows server to serve static files in order to access and display images
const __filename = fileURLToPath(import.meta.url); // Arg contains URL of current module and converts to file path
const __dirname = path.dirname(__filename); // Extracts directory from the file path
app.use("/", express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// Routes
app.use('/api/products', productRouter);

// Server
app.listen(8800, () => {
  console.log('api server is running...');
});