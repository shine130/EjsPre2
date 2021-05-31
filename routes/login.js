var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var crypto = require("crypto");
var TITLE_LOGIN = "登录";

router.get("/",function(re,res){
  res.render("login",{title:TITLE_LOGIN});
})

router.post("/",function(req,res){
  //接受数据
  var userName = req.body["txtUserName"],
      userPwd = req.body["txtUserPwd"],
      isRem = req.body['chbRem'],
      md5 = crypto.createHash('md5');

  User.getUserByUserName(userName,function(err,results){
    if(results == ''){
      res.locals.error = "用户不存在";
      res.render('login',{title:TITLE_LOGIN});
      return;
    }

    //加密
    userPwd = md5.update(userPwd).digest('hex');
    if(results[0].UserName != userName || results[0].UserPass != userPwd){
      res.locals.error = "用户名或密码错误";
      res.render("login",{title:TITLE_LOGIN});
      return;
    }else{
      //是否用户选择记住
      if(isRem){
        //cookie
        res.cookie('islogin',userName,{maxAge:60000});
      }

      res.locals.username = userName;
      req.session.username = res.locals.username;
      console.log(req.session.username);
      //重定向到页
      res.redirect("/");
      return;

    }

  })
})

module.exports = router;