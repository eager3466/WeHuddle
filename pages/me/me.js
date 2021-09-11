const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        email: '',
        img: '',
        visitTotal: '11',
        starCount: '12',
        forksCount: '10',
        name: '',
        teamlist: {},
        activityList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            email: app.globalData.email,
            img: app.globalData.user_img,
            name: app.globalData.name
        })
        this.teammessage()
        this.getActivity()
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
    //点击我的
    me: function () {
        wx.redirectTo({
            url: '/pages/me/me',
        })
    },
    teammessage: function () {
        var that = this
        tt.request({
            url: `${app.globalData.ip}/team/getTeamsByCaptain?code=${app.globalData.user_id}`,
            data: {
                userName: `${app.globalData.user_id}`
            },
            header: {
                'content-type': 'application/json'
            },
            method: "POST",
            success(res) {
                console.log(res.data.data)
                that.setData({
                    teamlist: res.data.data,
                })
            },
            fail() {
                console.log(`获取用户创建的团队  调用失败`);
            }
        });
    },
    // 跳转到详情页
    showteam: function (e) {
        let team_id = e.currentTarget.dataset.id
        console.log(team_id)
        wx.navigateTo({
            url: `../team_detail/team_detail?team_id=${team_id}`
        })
    },
    //获取活动
    getActivity: function () {
        let ip = app.globalData.ip
        var that = this
        tt.request({
            url: `${ip}/activity/getAllActivity?code=${app.globalData.user_id}`,
            data: {
                activityName: ""
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
    //跳转到详细
    viewDetail: function (event) {
        let id = event.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + id
        })
    }
});
