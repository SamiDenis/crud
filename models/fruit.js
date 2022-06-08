const mongoose = require('./connection')

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose

//BELOW IS THE SAME AS OTHER METHOD BELOW
// const Schema = mongoose.Schema
// const model = mongoose.model

//SAME AS ^^^
const { Schema, model } = mongoose;


// make fruits schema
const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
});

// make fruit model
const Fruit = model("Fruit", fruitsSchema);

module.exports = Fruit;