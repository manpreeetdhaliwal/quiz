const express = require('express');
const fs = require('fs')
const app = express();
const path= require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
app.use(express.static(path.join(__dirname, 'public')));
const logger = require('morgan');
const bodyParser = require('body-parser')

app.set('view engine', 'ejs'); 
app.use(express.urlencoded({extended:true}));

app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  }))
//   app.use((req,res,next)=>{
//     console.log('🍪:',req.cookies );
//     const username= req.cookies.username;
//     res.locals.username='';
//     if(username){
//       res.locals.username=username
//       console.log(`signed in as ${username}`);
//     }
//     next();//next is func that tells express to move on next middleware
//   })
  app.use(cookieParser());
  app.use(logger('dev')); 

//   app.get('/welcome', (request, response) => {
//     // response.send('Hello');
//     // .render() use to render out a template a template at "/views/<template_name>"
//     const ONE_DAY = 1000*60*60*24;
//     response.cookie('hello', 'world',{maxAge:ONE_DAY})
//     response.render('welcome'); // express will look for a view/template at /views/welcome
//   })

//   app.post('/sign_in',(req,res)=> {
//     res.send(req.body);
//     //const COOKIE_EXPIRE= 1000*60*60*24*7;
//     //const username=req.body.username;
//     //res.cookie('username',username,{maxAge :COOKIE_EXPIRE});
//     //res.redirect('/welcome');
//   });


  const clucksRouter = require('./routes/clucks');
  app.use('/clucks', clucksRouter);




const ADDRESS = 'localhost'; // the loopback address this is your home for your machine. The IP is 127.0.0.1
const PORT = 3000;
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on ${ADDRESS}:${PORT}`);
});