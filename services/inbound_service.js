const InboundDao = require("../dao/inbound_dao.js");

const InboundService = {
    // 添加商品
    add(req, res, next) {
        // 从请求主体中解构文本数据
        const {name, sort, count, date,remark} = req.body;
        // 保存到数据库
        InboundDao
            .save({name, sort, count, date,remark})
            .then(data=>{
                res.json({res_code:1, res_error:"", res_body: data})
            })
            .catch(err=>{
                res.json({res_code:-1, res_error:err, res_body: {}})
            });
    },
    // 删除商品
    delete(req, res, next) {
        // 从请求主体中解构文本数据
        const {id} = req.body;
        // 保存到数据库
        InboundDao
            .delete(id)
            .then(data=>{
                res.json({res_code:1, res_error:"", res_body: data})
            })
            .catch(err=>{
                res.json({res_code:-1, res_error:err, res_body: {}})
            });
    },
    // 查询修改商品
    findById(req, res, next) {
        // 从请求主体中解构文本数据
        const {id} = req.query;
        console.log(id);
        // 保存到数据库
        InboundDao
            .findById(id)
            .then(data=>{
                res.json({res_code:1, res_error:"", res_body: data});
            }).catch(err=>{
                res.json({res_code:-1, res_error:err, res_body: {}});
            });
    },
    //根据id修改
    update(req,res,next){

        const info = {name, sort, count, date,remark} = req.body;
        //保存到数据库
        console.log(info)
         InboundDao.update(info)
        .then(data=>{
            res.json({res_code:1, res_error:"", res_body: data})
        })
        .catch(err=>{
            res.json({res_code:-1, res_error:err, res_body: {}})
        });
    },

    // 分页查询商品
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
                        const totalPages = Math.ceil(data / 10);
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
