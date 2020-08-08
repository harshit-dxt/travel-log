// Require
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');

// Express app setup
const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Get routes
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

// Not Found error
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Error handling middleware
app.use();

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server up and running at port ${port}`);
});
