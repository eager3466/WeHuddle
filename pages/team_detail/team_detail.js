const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        team_id: '',
        img: "",
        name: "",
        time: "",
        content: "",
        teamImg: "",
        imglist: "",
        nums: '',
        maxpeople: ''
    },
    isCard(e) {
        this.setData({
            isCard: 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.load(options.team_id);
        this.team_id = options.team_id;
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
        this.load(this.team_id);
        setTimeout(function () {
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1000);
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
    //加载
    load: function (e) {
        var that = this;
        console.log(e)
        tt.request({
            url: `${app.globalData.ip}/team/getTeamById?code=${app.globalData.user_id}`,
            data: {
                'teamId': e,
            },
            header: {
                'content-type': 'application/json'
            },
            method: "POST",
            success(res) {
                console.log(res.data.data)
                let data = res.data.data
                that.setData({
                    img: data.cap.loginUserImg,
                    name: data.cap.loginUserName,
                    time: data.team.teamCreateTime,
                    content: data.team.teamDesc,
                    teamImg: data.team.teamImg,
                    nums: data.nums,
                    maxpeople: data.team.teamMaxPeople,
                    imglist: data.users,
                })
            },
            fail() {
                console.log(`request 调用失败`);
            }
        })
    },
    
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    ChooseCheckbox(e) {
        let items = this.data.checkbox;
        let values = e.currentTarget.dataset.value;
        for (let i = 0, lenI = items.length; i < lenI; ++i) {
            if (items[i].value == values) {
                items[i].checked = !items[i].checked;
                break
            }
        }
        this.setData({
            checkbox: items
        })
    },
    textareaBInput:function(e){
        console.log(e)
    }
})