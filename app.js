const port = 3000

var cors = require('cors');
const Pattern = require("./models/pattern.model.js");
const express = require("express");
const fileUpload = require('express-fileupload');
const fs = require('fs');
const { type } = require('os');

const patternRoutes = require('./routes/Pattern')
const searchRoutes = require('./routes/Search')

// API
var app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/pattern", patternRoutes)
app.use("/search", searchRoutes)


app.listen(port, () => {
 console.log("Server running on port 3000. System is active?");
 
});   
