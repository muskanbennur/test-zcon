var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../config');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('../configsecret'); // get secret config file

cryptr = new Cryptr('secretHere123');
 
module.exports.purchasegift=function(req,res){
     //console.log("body"+JSON.stringify(req.body.giftid));
   var id = req.session.uid;
   const token = req.session.token;
  
    // if the cookie is not set, return an unauthorized error
    if (!token) {
        return res.status(401).end();
    }
    var payload
    try {
        payload = jwt.verify(token, config.secret)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            return res.status(401).end()
        }
        // otherwise, return a bad request error
        return res.status(400).end()
    }

     //console.log("INSERT INTO tbl_uers_giftcards (userid, giftcardid) VALUES ( "+id+", "+req.body.giftid+")");
    connection.query("INSERT INTO tbl_uers_giftcards (userid, giftcardid) VALUES ( "+id+", "+req.body.giftid+")",
    function (error, results) {
      if (error) {
            res.json({
            status:false,
            message:'error in insertion'
        })
      }else{
          return res.redirect('/listgift');
      }
    });


}
