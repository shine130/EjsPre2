var express = require('express');
var router = express.Router();
var User = require("../models/user.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.islogin){
    console.log('cookie:' + req.cookies.islogin);
    req.session.username = req.cookies.islogin;
  }

  if(req.session.username){
    console.log('session:' + req.session.username);
    res.locals.username = req.session.username;
  }else{
    res.redirect('/login');
  }

  User.getNewsLists(function (err, results) {
    console.log(results);
    res.render("index", { title: "主页",newslists:results});
  });

 
});

module.exports = router;
