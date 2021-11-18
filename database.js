var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "talenthunter",
});

con.connect(function (err) {
  if (err) throw err;
  con.query("SELECT * FROM talento", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
