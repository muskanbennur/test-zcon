var express=require("express");
var bodyParser=require('body-parser');
var session = require('express-session');
var routes=require('./routes/route.js');
var giftroute=require('./routes/gift.js');

var router = require('express').Router();

var connection = require('./config');
var app = express();
const port = process.env.PORT||8080;
 
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var purchaseController=require('./controllers/purchasegift-controller');

app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

  
 
/* route to handle login and registration */
//app.post('/api/register',registerController.register);
//app.post('/api/authenticate',authenticateController.authenticate);
  
app.get('/',routes.index);
app.get('/login',routes.login);
app.get('/listgift',giftroute.listgift);
app.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
});




// app.get('/login.html', function (req, res) {  
//    res.sendFile( __dirname + "/" + "login.html" );  
// })  

var server=app.listen(port,function(req,res){
    console.log("Catch the action at http://localhost:"+port);
});
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
app.post('/controllers/purchasegift-controller', purchaseController.purchasegift);