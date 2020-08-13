
var { Client }      = require('pg');
var connectionString = 'postgres://postgres:1ZconTutorial@db-tutorial.czzhnetlsjdw.us-east-1.rds.amazonaws.com:5432/testZcon';
const connection = new Client({
	    connectionString: connectionString

})
connection.connect();
module.exports = connection; 





//postgres://postgres:1ZconTutorial@db-tutorial.czzhnetlsjdw.us-east-1.rds.amazonaws.com:5432/testZcon