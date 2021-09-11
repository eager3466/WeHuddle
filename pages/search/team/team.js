const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        teamlist: [],
        searchStr: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
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

    loadData: function() {
        var that=this 
        tt.request({
            url: `${app.globalData.ip}/team/getAllTeam?code=${app.globalData.user_id}`,
            data: {
                'teamTitle': that.data.searchStr,
            },
            header: {
                'content-type': 'application/json'
            },
            method: "POST",
            success(res) {
                console.log(res)
                that.setData({
                    teamlist:res.data.data,
                })
                console.log(res.data.data);
            },
            fail() {
                console.log(`抱团列表API 调用失败`);
            }
        })
  },
    // 跳转到详情页
    showteam:function(e){
        let team_id=e.currentTarget.dataset.id
        console.log(team_id)
        wx.navigateTo({
            url: '/pages/team_detail/team_detail?team_id=' + team_id
        })
    }
})