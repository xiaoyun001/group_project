const {Client} = require("./model.js");

const ClientDao = {
    // 保存客户信息
    save(clientInfo) {
        return new Client(clientInfo).save();
    },
    // 总记录条数
    count() {
        return Client.find().count();
    },
    // 按页查找客户信息
    findByPage(page) {
        // 假定每页显示12条数据
        const pageSize = 12;
        // 查询
        return Client.find().skip((page-1)*pageSize).limit(pageSize);

    },

    //修改指定id商品
    update(clientInfo){
        return Client.findByIdAndUpdate(clientInfo.id,{$set:clientInfo},{new: true});
    },
    // 查找客户信息
    findById(clientInfo) {
        // 查询
        return Client.findById(clientInfo);
    },
    delete(clientInfo) {
        return Client.findByIdAndRemove(clientInfo);

    }
}

module.exports = ClientDao;
