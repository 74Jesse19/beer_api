const express = require('express');
const mongoose = require('mongoose');
const beerRouter = require('./routes/beerRouter')

const app= express(); 

app.use(express.urlencoded({extended: true}))

app.use(`/api/v1/beers`, beerRouter)

console.log('see this once on start up');



/*can use this to create your own middleware. 
use is method agnostic can be used for get, post, put, etc 
if you change 'use' to get then it will only handle get request
app.use('/hello',(req, res)=>{
  console.log('got a request');
  res.send('<h1>Hello!!!</h1>');
})*/

// beers is going to be the name of our database
mongoose.connect('mongodb://localhost:27017/beers', {
  useNewUrlParser: true
})

mongoose.connection.on('connected', () =>{
  console.log('connected to beers db');
  //after connection successful it sends message that its listening on the port
  app.listen(4444, () => {
    console.log('Listening on port 4444...');
  })
})
mongoose.connection.on('error', () =>{
  console.log('error connecting to beers db');
})
