function Client() {
    this.addListener();
    this.load();
}


Client.listInfoTemplate = `
                 <% for (var i = 0; i < client.length; i++) { %> 
                <tr>
                    <td style="display:none;"><%= client[i]._id %></td>
                    <td><%= i+1 %></td>
                    <td><%= client[i].username %></td>
                    <td><%= client[i].name %></td>
                    <td><%= client[i].sex %></td>
                    <td class="edit"><button><i class="icon-edit bigger-120"></i>编辑</button></td>
                    <td class="delete"><button onclick="btn_delete(1)"><i class="icon-trash bigger-120"></i>删除</button></td>
                </tr>
                <% } %>`;

Client.paginationTemplate = `
    <% for (var i = 1; i <= totalPages; i++)  {%>
        <li class="<%= currentPage == i ? 'active' : '' %>"><a href="#"><%= i %></a></li>
    <% } %>`;


$.extend(Client.prototype, {
    // 注册事件监听 
    addListener() {
        // 添加用户
        $(".add-btn").on("click", this.addClientHandler);
        // 翻页
        $(".pagination").on("click", "li", this.loadByPage);
        // 点击编辑，查询编辑数据填充到表单中
        $("#tbRecord").on("click",".edit", this.findByIdClientHandler);
        // 修改
       $(".update-btn").on("click",this.updateClientHandler);
        // 删除
        $("#tbRecord").on("click",".delete",function(){
            const id = $(this).siblings().first().text();
           console.log(id);
           $.jq_Confirm({
            message: "您确定要删除吗?",
            btnOkClick: function() {

            $.post("/client/delete", {id:id}, (resdata)=>{
            console.log(resdata);
            if (resdata.res_code===1) {
                // alert("删除成功");
                 location = "/html/client.html";
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
        $.getJSON("/client/list?page=" + page, data=>{
            // 显示用户数据
            // 待渲染的数据
            const client = data.res_body.data;
            // EJS渲染模板
            const html = ejs.render(Client.listInfoTemplate, {client});
            // 显示
            $("#tbRecord tbody").html(html);

            // 显示页码数据
            const pagination = ejs.render(Client.paginationTemplate, {totalPages: data.res_body.totalPages, currentPage : page})
            $(".pagination").html(pagination);
        });
    },
    
    // 添加用户
    addClientHandler() {
        const data = $(".add-form").serialize();
        console.log(data);
        $.post("/client/add", data, (resdata)=>{
            console.log(resdata);
            if (resdata.res_code===1) {
                alert("添加成功");
                location = "/html/client.html";
            }else{
                alert("添加出错");
            }

        }, "json");

        
    },
  
   // 获取修改用户数据
    findByIdClientHandler(){
        // console.log(1);
        $("#update").addClass("on").siblings().removeClass("on");
          $("#update").show();
          $("#updateclient").show();
          $(".view").hide();
          $("#addclient").hide();
          
          const id = $(this).siblings().first().text();
           // console.log(id);
         // 读取page页数据
        $.getJSON("/client/find?id=" + id, data=>{
            // console.log(data);
            // 显示用户数据
            $(".updateId").val(data.res_body._id);
            $(".updateUsername").val(data.res_body.username);
            $(".updateName").val(data.res_body.name);
            $(".updateSex").val(data.res_body.sex);
            $(".updatePhone").val(data.res_body.phone);
            $(".updatePlace").val(data.res_body.place);
            $(".updateEmail").val(data.res_body.email);
            $(".updateRemark").val(data.res_body.remark);
        });
    },
    // 修改用户信息
    updateClientHandler(){
        console.log(1);
        const data = $("#update-form").serialize();
        console.log(data);
        $.post("/client/update", data, (resdata)=>{
            console.log(resdata);
            if (resdata.res_code===1) {
                alert("修改成功");
                location = "/html/client.html";
            }else{
                alert("修改出错");
            }

        }, "json"); 
    }


});

new Client();
