const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const mongoDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

//config dotenv
dotenv.config();

//database config
mongoDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);


//rest api
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Ecommerce Website using MERN.</h1>');
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`.bgCyan.white);
});