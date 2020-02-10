const express = require('express');
const mongoose = require('mongoose');
const Beer = require('./models/beer');

const app= express(); 
app.use(express.urlencoded({extended: true}))

console.log('see this once on start up');


app.delete(`/beers/:beer_id`, (req, res)=>{
  Beer.deleteOne({
    _id: req.params.beer_id
  }, err=>{
    if(err){
      res.status(400).send(err)
    } else {
      res.send(`Successfully deleted beer with id:${req.params.beer_id}`)
    }
  })
})
app.put(`/beers/:beer_id`,(req,res)=>{
  Beer.findById(req.params.beer_id, (err, beer) => {
    if(err) {
      res.status(500).send(err)
    }else {
      beer.name = req.body.name
      beer.rating = req.body.rating

      beer.save((err,beer)=>{
        if(err) {
          res.status(500).send(err)
        } else {
          res.send(`Beer posted!\n${beer}`)
        }
      })
    }
  })
})
app.post('/beers', (req, res) =>{
  let beer = new Beer();
  beer.name = req.body.name
  beer.rating = req.body.rating
  beer.save((err, beer)=>{
    if(err){
      res.status(500)
      res.send(err)
    } else {
      res.send(`Saved your ${beer}`)
    }
  })
})

app.get('/beers', (req, res)=>{
  Beer.find((err, beer)=>{
    if(err){
      res.status(500).send(err)
    } else{
      res.json(beer)
    }
  })
})

app.get('/beers/:beer_id', (req, res)=>{
  Beer.findById(req.params.beer_id,(err, beer)=>{
    if(err){
      res.status(500).send(err)
    } else{
      res.json(beer)
    }
  })
})

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
