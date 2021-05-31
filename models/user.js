var mysql = require("mysql");
var DB_NAME = 'nodesample';

var pool = mysql.createPool({
  host:'127.0.0.1',
  user:"root",
  password:''
})

pool.on("connection",function(){
  //数据库的权限
  // connection.query("SET SESSION suto_increment_increment=1");
});

function User(user){
  this.username = user.username;
  this.userpass = user.userpass;
}
module.exports = User;

pool.getConnection(function(err,connection){
  var userDBSql = "USE " + DB_NAME; //获取数据库
  connection.query(userDBSql, function (err) {
    if (err) {
      console.log("USE Error:" + err.message);
      return;
    }
    console.log("USE succeed");
  });

  //设定保存属性
  User.prototype.save = function save(callback) {
    var user = {
      username: this.username,
      userpass: this.userpass,
    };

    var insertUser_Sql =
      "INSERT INTO userinfo(id,UserName,UserPass) VALUES(0,?,?)";

    connection.query(
      insertUser_Sql,
      [user.username, user.userpass],
      function (err, result) {
        if (err) {
          console.log("USE Error:" + err.message);
          return;
        }
        // connection.release();
        console.log("invoked[save]");
        callback(err, result);
      }
    );
  };

  //根据用户名得到用户数量
  User.getUserNumByName = function getUserNumByName(username, callback) {
    var getUserNumByName_sql =
      "SELECT COUNT(1) AS num FROM userinfo WHERE username=?";

    connection.query(getUserNumByName_sql, [username], function (err, result) {
      if (err) {
        console.log("USE Error:" + err.message);
        return;
      }
      // connection.release();
      console.log("invoked[getUserNumByName]");
      callback(err, result);
    });
  };

  //根据用户名得到用户信息
  User.getUserByUserName = function getUserByUserName(username, callback) {
    var getUserByUserName_sql = "SELECT * FROM userinfo WHERE username = ?";
    connection.query(getUserByUserName_sql, [username], function (err, result) {
      if (err) {
        console.log("getUserByUserName Error:" + err.message);
        return;
      }
      // connection.release();
      console.log("invoked[getUserByUserName]");
      callback(err, result);
    });
  };

  //返回获取新闻表的数据
  User.getNewsLists = function getNewsLists(callback) {
    var getNews_sql = "SELECT * FROM news";
    connection.query(getNews_sql, [], function (err, result) {
      if (err) {
        console.log("getNews Error:" + err.message);
        return;
      }
      console.log("invoked[getNewsLists]");
      callback(err, result);
    });
  };

  
})

