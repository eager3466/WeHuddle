const app = getApp();
Page({
  data: {
    item: {
      imageUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      description: "折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
      sponsor: "小米技术委员会",
      startDate: "2021-09-10",
      endDate: "2021-09-12",
      requirement: "五人成团",
      website: "i.mi.com"
    },
    activity: {}
  },
  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.setData({
      activityId: options.id
    }, function() {
      this.loadData()
    })
  },

  /**
   * 加载数据
   */
  loadData: function() {
    let ip = app.globalData.ip
    var that = this
    tt.request({
          url: `${ip}/activity/getActivityById`,
          data: {
            activityId: that.data.activityId
          },
          header: {
            'content-type': 'application/json'
          },
          method: "POST",
          success(res) {
            let content = res.data.data;
            that.setData({
              activity: content
            })
            console.log(content)
          },
          fail() {
            console.log(`getById 调用失败`);
          }
        });
  },

  signup: function() {
  },
  group: function() {
  }
})