require('express-async-errors')
require('dotenv').config()
const express = require('express');
const app = express();



// routes
require('./startup/db')()   // connection to database
require('./startup/routes')(app)  // middleware




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));