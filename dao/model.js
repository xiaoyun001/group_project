// 引入 mongoose
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect('mongodb://localhost/proj_group');

// 用户模型
const User = mongoose.model('admin', { 
    username: String,
    password: String,
 });

// 职位模型
const Inbound = mongoose.model("inbound", {
    name: String,
    sort: String,
    count: Number,
    date: String
});

module.exports = {User,Inbound};
