require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => console.log('Server running'));
});
