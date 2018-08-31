const express = require('express');
const router = express.Router();
const path = require("path");
const InboundService = require("../services/inbound_service.js");


/* 添加商品 */
// http://localhost:3000/inbound/add
router.post("/add",InboundService.add);

/* 按页查询 */
// http://localhost:3000/inbound/list?page=2
router.get("/list", InboundService.listByPage);

/* 删除商品 */
// http://localhost:3000/inbound/delete
router.post("/delete",InboundService.delete);

/* 查询修改商品 */
// http://localhost:3000/inbound/find?id=
router.get("/find",InboundService.findById);

/* 修改用户 */
// http://localhost:3000/inbound/update
router.post("/update",InboundService.update);

module.exports = router;
