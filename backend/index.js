const User = require('./Models/User');
const connectToMongo = require('./config/db');
const express = require('express');
require('dotenv').config();

const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
connectToMongo();

app.use(cors())
app.use(express.json());




app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'));

app.listen(port , () => {
    console.log(`App connected on port ${port}`);
})



