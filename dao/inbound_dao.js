const {Inbound} = require("./model.js");

const InboundDao = {
    // 保存职位信息
    save(inboundInfo) {
        return new Inbound(inboundInfo).save();
    },
    // 总记录条数
    count() {
        return Inbound.find().count();
    },
    // 按页查找职位信息
    findByPage(page) {
        // 假定每页显示10条数据
        const pageSize = 10;
        // 查询
        return Inbound.find().skip((page-1)*pageSize).limit(pageSize);
    },
     // 查找商品信息
    findById(inboundInfo) {
        // 查询
        return Inbound.findById(inboundInfo);
    },
    //修改指定id商品
    update(inboundInfo){
        return Inbound.findByIdAndUpdate(inboundInfo.id,{$set:inboundInfo},{new: true});
    },
    find() {

    },
    delete(inboundInfo) {
        return Inbound.findByIdAndRemove(inboundInfo);

    }
}

module.exports = InboundDao;
