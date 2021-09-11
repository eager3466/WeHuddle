const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        teamlist: [],
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
        var that=this 
        tt.request({
            url: `${app.globalData.ip}/team/getAllTeam?code=${app.globalData.user_id}`,
            data: {
                'teamTitle': '',
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
        });
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
    // 点击活动
    activity: function () {
        wx.redirectTo({
            url: '/pages/index/index',
        })
    },
    // 点击抱团
    team: function () {
        wx.redirectTo({
            url: '/pages/team/team',
        })
    },
    // 点击发布
    publish: function() {
        wx.navigateTo({
            url: '/pages/submit/team/team'
        })
    },
    //点击我的
    me: function () {
        wx.redirectTo({
            url: '/pages/me/me',
        })
    },
    // 跳转到详情页
    showteam:function(e){
        let team_id=e.currentTarget.dataset.id
        console.log(team_id)
        wx.navigateTo({
            url: `../team_detail/team_detail?team_id=${team_id}`
        })
    }
})