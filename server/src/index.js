// Require
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const middleware = require('./middlewares');
const logs = require('./api/logs');

require('dotenv').config();

// Express app setup
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

// Get routes
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/api/logs', logs);

// Not Found error
app.use(middleware.notFound);

// Error handling middleware
app.use(middleware.errorHandler);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server up and running at port ${port}`);
});
