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

    tabSelect: 1,
    activityList:[],
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData()
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
    console.log(that.data.tabSelect)
    tt.request({
          url: `${ip}/activity/getActivityByType`,
          data: {
            activityType: that.data.tabSelect
          },
          header: {
            'content-type': 'application/json'
          },
          method: "POST",
          success(res) {
            let content = res.data.data;
            // let list = JSON.stringify(content);
            console.log(content)
            that.setData({
              activityList: content
            })
          },
          fail() {
            console.log(`getList 调用失败`);
          }
        });
  },

  // 点击tab
  tabSelect: function(event) {
    let selected = event.currentTarget.dataset.id
    this.setData({
      tabSelect: selected
    }, function() {
      this.loadData()
    })
  },

  // 点击活动
  activity: function () {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  // 点击发布
  publish: function() {
    wx.navigateTo({
      url: '/pages/submit/activity/activity'
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