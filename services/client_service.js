const ClientDao = require("../dao/client_dao.js");

const ClientService = {
    // 添加客户
    add(req, res, next) {
        // 从请求主体中解构文本数据
        const {username,name,sex,phone,place,email,remark} = req.body;
        // 保存到数据库
        ClientDao
            .save({username,name,sex,phone,place,email,remark})
            .then(data=>{
                res.json({res_code:1, res_error:"", res_body: data})
            })
            .catch(err=>{
                res.json({res_code:-1, res_error:err, res_body: {}})
            });
    },
    // 删除客户
    delete(req, res, next) {
        // 从请求主体中解构文本数据
        const {id} = req.body;
        // 保存到数据库
        ClientDao
            .delete(id)
            .then(data=>{
                res.json({res_code:1, res_error:"", res_body: data})
            })
            .catch(err=>{
                res.json({res_code:-1, res_error:err, res_body: {}})
            });
    },
    // 查询修改客户
    findById(req, res, next) {
        // 从请求主体中解构文本数据
        const {id} = req.query;
        console.log(id);
        // 保存到数据库
        ClientDao
            .findById(id)
            .then(data=>{
                res.json({res_code:1, res_error:"", res_body: data});
            }).catch(err=>{
                res.json({res_code:-1, res_error:err, res_body: {}});
            });
    },

    //根据id修改
    update(req,res,next){

        const info = {id,username,name,sex,phone,place,email,remark} = req.body;
        //保存到数据库
        console.log(info)
        ClientDao.update(info)
        .then(data=>{
            res.json({res_code:1, res_error:"", res_body: data})
        })
        .catch(err=>{
            res.json({res_code:-1, res_error:err, res_body: {}})
        });
    },

    // 分页查询客户信息
    listByPage(req, res, next) {
        // 获取待查询的页码
        let {page} = req.query;
        page = page || 1;
        // 调用数据库查询方法
        ClientDao
            .count()
            .then((data)=>{
                ClientDao
                    .findByPage(page)
                    .then(pageData=>{
                        // 总页数
                        const totalPages = Math.ceil(data / 12);
                        res.json({res_code:1, res_error:"", res_body: {data: pageData, count: data, totalPages}});
                    }).catch(err=>{
                        res.json({res_code:-1, res_error:err, res_body: {}});
                    });
            }).catch(err=>{
                res.json({res_code:-1, res_error:err, res_body: {}});
            });

    }
}

module.exports = ClientService;
