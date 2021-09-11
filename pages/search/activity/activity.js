const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchStr: "",
    activityList:[],
  },

  onLoad: function (options) {
      this.setData({
          searchStr: options.word
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData()
  },

  /**
   * 加载数据
   */
  loadData: function() {
    let ip = app.globalData.ip
    var that = this
    tt.request({
          url: `${ip}/activity/getAllActivity`,
          data: {
            activityName: that.data.searchStr
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

  // 详情
  viewDetail: function(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  }
})