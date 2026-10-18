import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser & CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
connectDB();

// API Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Kuveras Fine Jewellery API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Determine dist directory (check backend/dist first, then ../frontend/dist)
const localDistPath = path.join(__dirname, 'dist');
const parentDistPath = path.join(__dirname, '../frontend/dist');
const distPath = fs.existsSync(localDistPath) ? localDistPath : parentDistPath;

console.log(`📁 Serving static assets from: ${distPath}`);
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Kuveras Fine Jewellery MERN Backend is active.');
  }
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Kuveras MERN Server running on port ${PORT}`);
});
