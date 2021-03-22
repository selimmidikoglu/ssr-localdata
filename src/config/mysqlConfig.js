import mysql from 'mysql';

var con = mysql.createConnection({
  host: "",
  user: "velbase",
  password: "",
  database: ''
});

export default con;
