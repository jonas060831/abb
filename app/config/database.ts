import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    // Already connected
    console.log(`Connected to ${mongoose.connection.name}...`)
    return true;
  }

  try {
    await mongoose.connect(process.env.CONNECTION_STRING as string, {
      // Optional: add these options for Mongoose 7+
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
      console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`);
    });

    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  }
};

export default connectDB;
