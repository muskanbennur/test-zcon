var Cryptr = require('cryptr');
cryptr = new Cryptr('testkey');
var connection = require('./../config');
var config = require('../configsecret'); // get secret config file
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports.authenticate=function(req,res){
    var name=req.body.name;
    var password=req.body.password;
   //console.log("SELECT * FROM tbl_user WHERE name = '"+name+"'");
    connection.query("SELECT * FROM tbl_user WHERE name = '"+name+"'", function (error, results) {
      if (error) {

          res.json({
            status:false,
            message:'Authentication failed'
            })
      }else{
        //console.log("val"+results.rows[0].password);
       //console.table(JSON.stringify(results.rows));
        if(results.rowCount >0){
          decryptedString = cryptr.decrypt(results.rows[0].password);
            if(password==decryptedString){
              req.session.uid=results.rows[0].id;
              // if user is found and password is valid
              // create a token
              var token = jwt.sign({ id: req.session.uid }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });

               //res.status(200).send({ auth: true, token: token });
               req.session.token= token;
               return res.redirect('/listgift'); // redirecting user to interface
                

            }else{
                res.json({
                  status:false,
                  message:"Username and password does not match"
                 });
            }
          
        }
        else{
          res.json({
            status:false,    
            message:"Username does not exist"
          });
        }
      }
    });


}

