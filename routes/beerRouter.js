const express = require('express');
const beerRouter = express.Router();
const Beer = require('../models/beer');


beerRouter.delete(`/:beer_id`, (req, res)=>{
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
beerRouter.put(`/:beer_id`,(req,res)=>{
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
beerRouter.post('/beers', (req, res) =>{
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

beerRouter.get('/beers', (req, res)=>{
  Beer.find((err, beer)=>{
    if(err){
      res.status(500).send(err)
    } else{
      res.json(beer)
    }
  })
})

beerRouter.get('/:beer_id', (req, res)=>{
  Beer.findById(req.params.beer_id,(err, beer)=>{
    if(err){
      res.status(500).send(err)
    } else{
      res.json(beer)
    }
  })
})

 

module.exports = beerRouter