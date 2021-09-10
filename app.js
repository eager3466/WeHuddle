App({
  globalData: {
    "name": "",
    "user_img": "",
    "open_id":"",
    "email":"",
    "ip":"http://192.168.70.18:8081/",
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
            console.log(`request 调用成功 ${JSON.stringify(res)}`);
          },
          fail(res) {
            console.log(`request 调用失败`);
          }
        });
      },
      fail(res) {
        console.log(`login 调用失败`);
      }
    })
  },
})
