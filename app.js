App({
  globalData: {
    name: "",
    user_img: "",
    user_id: "",
    email: "",
    phone: '',
    ip: "http://10.220.46.153:8081",
  },
  onLaunch: function () {
    // 可以通过 tt.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    // console.log(ip)
    let ip = this.globalData.ip
    tt.login({
      success(res) {
        console.log(`login 调用成功  code值： ${res.code} `);
        tt.request({
          url: `${ip}/login/getUserInfo/?code=${res.code}`,
          data: {
            code: `${res.code}`
          },
          header: {
            'content-type': 'application/json'
          },
          method: "POST",
          success(res) {
            let content = res.data.data;
            console.log(`获取user_id = ${ content.loginName}`);
            getApp().globalData.name = content.loginUserName;
            getApp().globalData.user_img = content.loginUserImg;
            getApp().globalData.user_id = content.loginName;
            getApp().globalData.email = content.loginUserEmail;
            getApp().globalData.phone = content.loginUserPhone;
          },
          fail() {
            console.log(`获取user_id  调用失败`);
          }
        });
      },
      fail() {
        console.log(`login 调用失败`);
      }
    })
  },
})
