const mysql = require('mysql')
const {db} = require('./config.json')

var connection = mysql.createConnection({
    host     : db.ip,
    user     : db.user,
    password : db.pass,
    database : db.db
  });
   
  connection.connect(function (err) {
      if(err) console.log(`[DB] Error:\n${err}`)
  });
  
  module.exports = connection