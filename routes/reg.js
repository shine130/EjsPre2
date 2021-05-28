var express = require("express");
var router = express.Router();
var crypto = require('crypto');
User = require("../models/user.js");

var TITLE_REG = '注册';
/* GET reg page */
router.get("/", function (req, res) {
  res.render("reg", { title: "reg" });
});

router.post('/',function(req,res){
  var userName = req.body['txtUserName'],
      userPwd = req.body['txtUserPwd'],
      userRePwd = req.body['txtUserRePwd'],
      //密码加密
      md5 = crypto.createHash('md5');

      userPwd = md5.update(userPwd).digest('hex');
      //数据库操作

      //创建一个数据库操作对象(User)
      var newUser = new User({
        username: userName,
        userpass: userPwd,
      });

      // 执行查找用户是否已经存在
      User.getUserNumByName(newUser.username,function(err,results){
        if(results != null && results[0]['num'] > 0){
          err = '用户名已经存在';
        }

        if(err){
          res.locals.error = err;
          res.render('reg',{title:TITLE_REG})
        }else{
          //保存
          newUser.save(function (err, result) {
            if (err) {
              res.locals.error = err;
              res.render("reg", { title: TITLE_REG });
              return;
            }

            if (result.insertId > 0) {
              res.locals.success =
                "注册成功,请点击<a class='btn btn-link' href='/login' role='button'>登录</a>";
            } else {
              res.locals.error = err;
            }

            res.render("reg", { title: TITLE_REG });
          });
          
        }



      })

})

module.exports = router;
