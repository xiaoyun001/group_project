const express = require('express');
const router = express.Router();
const path = require("path");
const ClientService = require("../services/client_service.js");


/* 添加用户 */
// http://localhost:3000/client/add
router.post("/add",ClientService.add);

/* 按页查询 */
// http://localhost:3000/client/list?page=2
router.get("/list", ClientService.listByPage);

/* 删除用户 */
// http://localhost:3000/client/delete
router.post("/delete",ClientService.delete);

/* 查询修改用户 */
// http://localhost:3000/client/find?id=
router.get("/find",ClientService.findById);

/* 修改用户 */
// http://localhost:3000/client/update
router.post("/update",ClientService.update);

module.exports = router;
