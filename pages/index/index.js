const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../../images/banner/1.jpg'
    }, {
      id: 1,
      type: 'image',
      url: '../../images/banner/2.jpg',
    }, {
      id: 2,
      type: 'image',
      url: '../../images/banner/3.jpg'
    }, {
      id: 3,
      type: 'image',
      url: '../../images/banner/4.jpg'
    }],

    activityList: [{
      activityId: 1,
      activityName: "第二届小米黑客马拉松",
      activityImg: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      activityDesc: "折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
      activityStartTime: "2021-09-10",
      activityEndTime: "2021-09-12"
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.loadData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 加载数据
   */
  loadData: function() {
    let ip = app.globalData.ip
    var that = this
    tt.request({
          url: `${ip}/activity/getActivityByType`,
          data: {
            activityType: 1
          },
          header: {
            'content-type': 'application/json'
          },
          method: "POST",
          success(res) {
            let content = res.data.data;
            let list = JSON.stringify(content);
            that.setData({
              activityList: list
            })
            console.log(`getList 调用成功 ${list}`);
          },
          fail() {
            console.log(`getList 调用失败`);
          }
        });
  },

  // 点击活动
  activity: function () {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  // 点击抱团
  team: function() {
    wx.redirectTo({
      url: '/pages/team/team',
    })
  },
  //点击我的
  me: function () {
    wx.redirectTo({
      url: '/pages/me/me',
    })
  },
  // 详情
  viewDetail: function(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  }
})