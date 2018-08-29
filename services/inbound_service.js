const InboundDao = require("../dao/inbound_dao.js");

const InboundService = {
    // 添加职位
    add(req, res, next) {
        // 从请求主体中解构文本数据
        const {name, sort, count, date} = req.body;
        // 保存到数据库
        InboundDao
            .save({name, sort, count, date})
            .then(data=>{
                res.json({res_code:1, res_error:"", res_body: data})
            })
            .catch(err=>{
                res.json({res_code:-1, res_error:err, res_body: {}})
            });
    },
    // 分页查询职位
    listByPage(req, res, next) {
        // 获取待查询的页码
        let {page} = req.query;
        page = page || 1;
        // 调用数据库查询方法
        InboundDao
            .count()
            .then((data)=>{
                InboundDao
                    .findByPage(page)
                    .then(pageData=>{
                        // 总页数
                        const totalPages = Math.ceil(data / 5);
                        res.json({res_code:1, res_error:"", res_body: {data: pageData, count: data, totalPages}});
                    }).catch(err=>{
                        res.json({res_code:-1, res_error:err, res_body: {}});
                    });
            }).catch(err=>{
                res.json({res_code:-1, res_error:err, res_body: {}});
            });

    }
}

module.exports = InboundService;
