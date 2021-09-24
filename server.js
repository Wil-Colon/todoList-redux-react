const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const PORT = 7000 || process.env.PORT;

//Body Parser middleware
app.use(express.json({ extended: false }));

connectDB();

app.use(cors());

app.use('/', require('./routes/api/todos'));

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
