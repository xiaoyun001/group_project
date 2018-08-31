// 引入 mongoose
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect('mongodb://localhost/proj_group');

// 用户模型
const User = mongoose.model('admin', { 
    username: String,
    password: String,
 });

// 入库模型
const Inbound = mongoose.model("inbound", {
    name: String,
    sort: String,
    count: Number,
    date: String,
    remark:String
});

// 客户模型
const Client = mongoose.model("client", {
    username:String,
    name: String,
    sex: String,
    phone: Number,
    place:String,
    email: String,
    remark:String
});

module.exports = {User,Inbound,Client};
