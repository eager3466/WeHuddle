const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        email:'',
        img:'',
        visitTotal: '11',
        starCount: '12',
        forksCount: '10',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            email:app.globalData.email,
            img:app.globalData.user_img
        })
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
});
