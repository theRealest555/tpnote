const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config(); 

const port = process.env.PORT;
const host = process.env.HOST;
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


const teacher = require('./routes/Teacher'); 
app.use("/teacher",teacher) 
    

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});