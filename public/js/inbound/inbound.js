function Inbound() {
    this.addListener();
    this.load();
}


Inbound.listInfoTemplate = `
                 <% for (var i = 0; i < inbound.length; i++) { %> 
                <tr>
                <td style="display:none;"><%= inbound[i]._id %></td>
                <td><%= i+1 %></td>
                <td><%= inbound[i].name %></td>
                <td><%= inbound[i].sort %></td>
                <td><%= inbound[i].count %></td>
                <td><%= inbound[i].date %></td>
                <td class="edit"><button onclick="btn_edit(1)"><i class="icon-edit bigger-120"></i>编辑</button></td>
                <td class="delete"><button onclick="btn_delete(1)"><i class="icon-trash bigger-120"></i>删除</button></td>
                </tr>
                <% } %>`;

Inbound.paginationTemplate = `
    <% for (var i = 1; i <= totalPages; i++)  {%>
        <li class="<%= currentPage == i ? 'active' : '' %>"><a href="#"><%= i %></a></li>
    <% } %>`;


$.extend(Inbound.prototype, {
    // 注册事件监听 
    addListener() {
        // 添加分类
        $(".add-btn").on("click", this.addInboundHandler);
        // 翻页
        $(".pagination").on("click", "li", this.loadByPage);
        // 点击编辑获取当前数据
        $("#tbRecord").on("click",".edit",this.findByIdInboundHandler);
        // 点击确认修改对商品入库信息进行编辑
        $(".update-btn").on("click",this.updateInboundHandler);
        // 删除
        $("#tbRecord").on("click",".delete",function(){
            const id = $(this).siblings().first().text();
           console.log(id);
           $.jq_Confirm({
            message: "您确定要删除吗?",
            btnOkClick: function() {

            $.post("/inbound/delete", {id:id}, (resdata)=>{
            console.log(resdata);
            if (resdata.res_code===1) {
                // alert("删除成功");
                 location = "/html/inbound.html";
            }else{
                alert("删除出错");
            }

        }, "json");
}
                    }); 
           
           
            


        });
    },

    // 页面加载
    load() {
        // 加载第一页数据
        this.loadByPage(1);
    },
    // 按页加载数据
    loadByPage(event){
        let page;
        if (typeof event === "number") // 直接传递页码
            page = event;
        else { // 获取待加载页码           
            console.log(event.target)
            page = $(event.target).text();
        }

        // 读取page页数据
        $.getJSON("/inbound/list?page=" + page, data=>{
            // 显示职位数据
            // 待渲染的数据
            const inbound = data.res_body.data;
            // EJS渲染模板
            const html = ejs.render(Inbound.listInfoTemplate, {inbound});
            // 显示
            $("#tbRecord tbody").html(html);

            // 显示页码数据
            const pagination = ejs.render(Inbound.paginationTemplate, {totalPages: data.res_body.totalPages, currentPage : page})
            $(".pagination").html(pagination);
        });
    },
    
    // 添加入库商品
    addInboundHandler() {
        const data = $(".add-form").serialize();
        console.log(data);
        $.post("/inbound/add", data, (resdata)=>{
            console.log(resdata);
            if (resdata.res_code===1) {
                alert("添加成功");
                location = "/html/inbound.html";
            }else{
                alert("添加出错");
            }

        }, "json");

        
    },
    // 获取修改商品数据
    findByIdInboundHandler(){
        console.log(1);
        $(".updateBar").addClass("on").siblings().removeClass("on");
          $(".updateBar").show();
          $("#inboundOut").show();
          $("#inboundIn").hide();
          $("#inboundIndex").hide();
          
          const id = $(this).siblings().first().text();
           console.log(id);
         // 读取数据
        $.getJSON("/inbound/find?id=" + id, data=>{
            console.log(data);
            // 显示用户数据
           
            // 将响应数据显示到表单中
            $(".updateId").val(data.res_body._id);
            $(".updateName").val(data.res_body.name);
            $(".updateSort").val(data.res_body.sort);
            $(".updateCount").val(data.res_body.count);
            $(".updateDate").val(data.res_body.date);
            $(".updateRemark").val(data.res_body.remark);
        });
    },

    // 修改商品入库信息
    updateInboundHandler(){
        console.log(1);
        const data = $(".update-form").serialize();
        console.log(data);
        $.post("/inbound/update", data, (resdata)=>{
            console.log(resdata);
            if (resdata.res_code===1) {
                alert("修改成功");
                location = "/html/inbound.html";
            }else{
                alert("修改出错");
            }

        }, "json"); 
    }
});

new Inbound();
