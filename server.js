// Get express and create an app from it.
import express from 'express';
const app = express();

// It is for the getting values from .env file.
import dotenv from 'dotenv';
dotenv.config();

// Error handler. So we do not need to use try catch block.
import 'express-async-errors';

// Our middlewares.
import notFoundMiddleWare from './middleware/not-found.js';
import errorHandlerMiddleWare from './middleware/error-handler.js';

// Connecting to the MongoDB server.
import connectDB from './db/connect.js';

// Call routes.
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobRoutes.js';

// Allow json usage.
app.use(express.json());

// Main domain.
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome!' });
});

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Welcome!' });
});

// Init routes.
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

// 404 page.
app.use(notFoundMiddleWare);
// Handle error and print json. (new throw Error).
app.use(errorHandlerMiddleWare);

// Get port number from .env file. If empty use 8000 port value.
const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
