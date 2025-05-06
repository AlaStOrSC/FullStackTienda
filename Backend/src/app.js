const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const notFoundHandler = require('./middlewares/notFoundHandler');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5501"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// Protección en cabeceras
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

// Protección contra consultas maliciosas
app.use(mongoSanitize());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones desde esta IP',
});

app.use('/api', apiLimiter);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use('/api', notFoundHandler);

app.use(errorHandler);

module.exports = app;

