import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || process.env.MONGODB_URL;
    if (!connStr) {
      console.warn('⚠️ MONGODB_URI / MONGODB_URL is not defined in environment variables. Database connection skipped for initial startup.');
      return;
    }
    const conn = await mongoose.connect(connStr);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
  }
};
