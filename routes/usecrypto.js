var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("usecrypto", { title: "提交usecrypto示例" });
});

module.exports = router;
