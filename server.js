import 'dotenv/config.js';
import app from './app.js';
import mongoose from 'mongoose';

const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL;

app.listen(port, async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log('connected with mongodb');
    console.log(`server is running at http://127.0.0.1:${port}`);
  } catch (error) {
    console.log(error);
  }
});
