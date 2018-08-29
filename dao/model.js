// 引入 mongoose
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect('mongodb://localhost/proj_group');

// 职位模型
const Inbound = mongoose.model("inbound", {
    name: String,
    sort: String,
    count: Number,
    date: String
});

module.exports = {Inbound};
