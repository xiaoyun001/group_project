/**
 * 登录模态框
 */
function Login() {
	this.addListener();
	this.genCaptchaHandler();
}



/**
 * 原型
 */
$.extend(Login.prototype, {
	// 注册事件监听
	addListener:function(){
		$("#loginCode").on("blur",this.verifyHandler);
		$(".btn-login").on("click",this.loginHandler);
	},
	// 生成验证码
   genCaptchaHandler:function(){
   	  $.get("/captcha/gencode",(data)=>{
   	  	// console.log(data);
           $(".code-img").html(data);
   	  },"text");
   },
	// 校验验证码
	verifyHandler:function(){
	// 获取文本框中输入的验证码
	 var code=$("#loginCode").val();
	 $.getJSON("/captcha/verify",{code},(data)=>{
	 	// console.log(data);
	 	if(data.res_code===1){

	 		$("#login-info").hide();
	 	}else{
	 		$("#login-info").show();
	 	}
	 })
	},
	// 登录业务处理
	loginHandler:function(){
		// 待传递到服务器的用户数据登录
		var data=$(".login-form").serialize();
		console.log(data);
        
		// ajax提交登录处理
		$.post("/users/login",data,function(resdata){
            console.log(resdata);
            if (resdata.res_code === 1) {
            // 将登录成功的用户信息保存起来，保存到 sessionStorage 中
               sessionStorage.loginUser = JSON.stringify(resdata.res_body);
            	location = "/html/inbound.html";
            }else{
            	$("#loginErr-info").show();
            }
		  });

        
	}


});


new Login();
