const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a new schema for our db called BeerSchema
const BeerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type:Number,
    min: [0,'Rating must be a number greater than or equl to 0'],
    max: [10, 'Rating cannot be greater than 10'],
    required: true
  }
})


const model = mongoose.model('Beer', BeerSchema)

module.exports = model 