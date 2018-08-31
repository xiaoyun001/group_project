
// 主页对象构造
function Index(){
   this.addListener();
   this.load();
}

/**
 * 原型
 */
$.extend(Index.prototype, {
    // 页面加载处理
    load() {
        // 页面加载时要判断是否有用户登录过，有则显示用户信息及注销链接
        let user = sessionStorage.loginUser;
        if (user) {
            user = JSON.parse(user);
            $(".login-success")
                .removeClass("hide")
                .find("a:first").text(`管理员：${user.username}`);
            $(".not-login").remove();
            $(".indexInfo").hide();
            $(".Menuoptions").toggle();
            $(".iflogin").attr({src:"/html/inbound.html"});
        }
    },
    // 注册事件监听
    addListener() {
        $(".menue").on("click",this.load);
        // 点击注销链接
        $(".link-logout").on("click", this.logoutHandler);
    },
    // 注销
    logoutHandler() {
        $.getJSON("/users/logout", (data)=>{
            if (data.res_body.status) {
                sessionStorage.removeItem("loginUser");
                window.location.href = "/index.html";
            }
        })
    }
});

// 创建头部对象实例
new Index();


