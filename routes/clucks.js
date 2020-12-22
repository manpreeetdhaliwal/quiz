const express = require('express');
const knex = require('../db/client');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('clucks/signin', { cluck: false });
  });

  router.post('/sign_in',(req,res)=> {
    //res.send(req.body);
    const COOKIE_EXPIRE= 1000*60*60*24*7;
    const username=req.body.username;
    res.cookie('username',username,{maxAge :COOKIE_EXPIRE});
    //res.redirect('/clucks/details');
    res.redirect('/clucks/details')
  });
  router.post('/sign_out',(req,res)=> {
    res.clearCookie('username');
    res.redirect('/clucks')
  });

  router.post('/',(request,response)=>{
    knex('clucks')
    .insert({
     username: request.cookies.username,
      content: request.body.content,
      image_url: request.body.image_url
      
    })
    .returning('*')
    .then(clucks=> {
       
        const cluck = clucks[0];
       //response.send(cluck);
        response.redirect(`/clucks/index`)
    });
});

router.get('/details', (req, res) => {
    knex
    .select('username')
    .from('clucks')
      .orderBy('created_at', 'desc')
      .then(clucks => {
          const cluck=clucks[0]
        res.render('clucks/details', { clucks: clucks });
      });
  });
  router.get('/index', (req, res) => {
    knex
    .select('*')
    .from('clucks')
      .orderBy('created_at', 'desc')
      .then(clucks=> {
        res.render('clucks/index', { clucks: clucks });
      });
  });











module.exports = router;