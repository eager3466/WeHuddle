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
        maxpeople: '',
        sendtext: '',
        display: ['', 'none'],
        textareaText: '',
        say: [{
            img: 'https://s1-imfile.feishucdn.com/static-resource/v1/a1a21bf2-ae7c-4f5d-895b-f4a69c37e3dg~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp',
            name: '徐明东',
            text: '我也好像加入',
            time: '2021年9月10日'
        }]
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
                console.log(app.globalData.user_id)
                console.log(data.users)
                for (let i = 0; i < data.users.length; i++) {
                    if (app.globalData.user_id == data.users[i].loginName) {
                        that.setData({
                            display: ['none', ''],
                        })
                    }
                }

            },
            fail() {
                console.log(`request 调用失败`);
            }
        })
    },

    showModal(e) {
        var that=this
        tt.showPrompt({
            title: '原因',
            success(res) {
                if (res.confirm) {
                    console.log('confirm and inputValue is: ' + res.inputValue);
                    that.send(res.inputValue);
                } else if (res.cancel) {
                    console.log('cancel')
                }
            },
            fail(res) {
                console.log(`showPrompt调用失败`);
            }
        });
        // this.setData({
        //     modalName: e.currentTarget.dataset.target
        // })
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
    textareaBInput: function (e) {
        console.log(e.detail.value)
        this.setData({
            sendtext: e.detail.value,
        })
        console.log(this.data.sendtext)
    },
    send: function (e) {
        var that = this
        console.log("申请内容：" + e)
        tt.request({
            url: `${app.globalData.ip}/registration/addRegistration?code=${app.globalData.user_id}`,
            data: {
                'teamId': that.team_id,
                'userName': app.globalData.user_id,
                'applyReason': e,
            },
            header: {
                'content-type': 'application/json'
            },
            method: "POST",
            success(res) {
                console.log(res)
                that.hideModal()
                wx.showToast({
                    title: res.data.errmsg,
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                })
                that.setData({
                    textareaText: '',
                })
            },
            fail(res) {
                console.log(`request 调用失败${res}`);
            }
        })
    }
})