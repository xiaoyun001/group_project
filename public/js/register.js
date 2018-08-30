function Register() {
    this.addListener();
    this.genCaptchaHandler();
}



$.extend(Register.prototype, {
    // 注册事件监听
  addListener:function(){
  // 验证码输入框失去焦点时校验验证码
    $("#registerCode").on("blur",this.verifyHandler);
  // 点击注册按钮
    $(".btn-register").on("click", this.registerHandler)

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
   var code=$("#registerCode").val();
   $.getJSON("/captcha/verify",{code},(data)=>{
    // console.log(data);
    if(data.res_code===1){

      $("#register-info").hide();
    }else{
      $("#register-info").show();
    }
   })
  },

  // 注册业务处理
  registerHandler() {
    // 待传递到服务器的用户注册数据
    var data = $(".register-form").serialize();
    console.log(data);
    // ajax提交登录处理
    $.post("/users/register", data, (resData)=>{
      console.log(resData);
      if (resData.res_code === 1) {
        location = "/html/login.html";
      }else{
        $("#registerErr-info").show();
      }
    }, "json");
  }


  
});


new Register();
