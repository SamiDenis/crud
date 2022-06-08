//////////////////////////
//IMPORT OUR DEPENDENCIES
//////////////////////////
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
// const mongoose = require('mongoose')
const path = require('path')
// const mongoose = require("./models/connection")
// const Fruit = require('./models/fruit')
const FruitRouter = require('./controllers/fruits')
/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), { root: [path.resolve(__dirname, 'views/')] })


//### Register our Middleware


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically


// ROUTES
//////////////////////////////////////////////
app.use('/fruits', FruitRouter) //sends all /fruits routes to fruit route

app.get('/', (req, res) => {
    res.send("your server is running...better catch it!")
})

  
/////////////////////////////////////////////////////
// Server Listener
/////////////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));