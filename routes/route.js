exports.index=function(req,res){
   res.sendFile( __dirname + "/" + "index.html" );  
              };

exports.login = function (req, res) {  
   res.sendFile( __dirname + "/" + "login.html" );  
} ;

exports.listgift = function (req, res) {  
   res.render( __dirname + "/" + "list.html" );  
} ;