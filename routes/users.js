var express = require('express');
var router = express.Router();
const UserService = require("../services/user_service.js");

// 用户注册
router.post('/register',UserService.register);

// 用户登录
router.post('/login',UserService.login);

module.exports = router;

