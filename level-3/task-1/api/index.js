import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';
import helmet from 'helmet';
import productRouter from "./routes/products.js";

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to mongoDB');
});

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/products', productRouter);

app.listen(8800, () => {
  console.log('api server is running...');
});