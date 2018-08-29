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

module.exports = router;
