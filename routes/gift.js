var connection = require('./../config');
var config = require('../configsecret'); // get secret config file
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens



exports.listgift=function(req,res){
  const token = req.session.token;
    // if the cookie is not set, return an unauthorized error
    if (!token) {
        return res.status(401).end();
    }
  var id = req.session.uid;
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
  connection.query("SELECT * FROM tbl_uers_giftcards INNER JOIN tbl_giftcards ON  tbl_uers_giftcards.giftcardid= tbl_giftcards.id WHERE userid = "+id, function (error, results) {
    connection.query("SELECT id,name,amount FROM tbl_giftcards where id not in (select giftcardid from tbl_uers_giftcards where userid="+id+")", function (error, resultspurchase) {
    //console.log("To purchase"+JSON.stringify(resultspurchase));

    res.render('listgift',{gift:results,giftnotpurchased:resultspurchase});
    });
    //res.render('story',{story:story,session:req.session});
  });
}
