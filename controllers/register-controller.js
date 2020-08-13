var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../config');
cryptr = new Cryptr('secretHere123');
 
module.exports.register=function(req,res){
    var encryptedString = cryptr.encrypt(req.body.password);
    console.log(req.body.name+"pa"+req.body.password);
    if(!req.body.name || !req.body.password){
        res.json({
            status:false,
            message:'Username and password required'
        });
    }
    connection.query("INSERT INTO tbl_user (name, password) VALUES ( '"+req.body.name+"', '"+encryptedString+"')",
 function (error, results) {
      if (error) {
            res.json({
            status:false,
            message:'error in insertion'
        })
      }else{
          res.json({
            status:true,
            message:'user registered sucessfully'
        })
      }
    });



}
