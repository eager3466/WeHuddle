const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    picker: ['','喵喵喵', '汪汪汪', '哼唧哼唧'],
    teamTitle: '团队标题',
    teamDesc: '团队描述',
    teamStartTime: '2021-09-12',
    teamEndTime: '2021-09-17',
    teamImg: '',
    teamMaxPeople: '5',
    teamActivityId: '1',
    teamActivityName: '黑客马拉松',
    activityIdList:[],
    activityNameList:[],
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2018-12-25',
    region: ['广东省', '广州市', '海珠区'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value,
    })
    this.setData({
      teamActivityId: this.data.activityNameList[this.data.index],
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    var that = this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log(res.tempFilePaths[0])
        console.log(app.globalData.ip + '/uploadImg')
          tt.uploadFile({
            url: app.globalData.ip + '/uploadImg',
            filePath: res.tempFilePaths[0],
            name: 'file',
            fileName: res.tempFilePaths[0],
            success (res) {
                if (res.statusCode === 200) {
                    console.log(JSON.parse(res.data).data)
                    that.setData({
                      teamImg: JSON.parse(res.data).data
                    })
                    console.log(`uploadFile 调用成功 ${res.data}`);
                }
            },
            fail (res) {
                console.log(res)
            }
          });
        this.setData({
          imgList: res.tempFilePaths
        })
      },
      fail: (res) => {
        console.log("choose failed")
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      content: '确定要删除该照片？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },

  formSubmit: function () {
     console.log(this.data.teamTitle);
     console.log(this.data.teamDesc);
     console.log(app.globalData.user_id);
     console.log(this.data.teamStartTime);
     console.log(this.data.teamEndTime);
     console.log(this.data.teamMaxPeople);
     console.log(this.data.teamActivityId);
     console.log(this.data.teamActivityName);
    tt.request({
    url: app.globalData.ip + '/team/addTeam',
    data: {
      'teamTitle':this.data.teamTitle,
      'teamDesc':this.data.teamDesc,
      'teamCaptain':app.globalData.user_id,
      'teamStartTime':this.data.teamStartTime,
      'teamEndTime':this.data.teamEndTime,
      'teamMaxPeople':this.data.teamMaxPeople,
      'teamImg':this.data.teamImg,
      'teamActivityName':this.data.teamActivityName,
    },
    method: 'POST',
    header: {
        'content-type': 'application/json'
    },
    success (res) {
        console.log(JSON.stringify(res));
    },
    fail (res) {
        console.log(`request33 调用失败`);
    }
    });
  },

  setTeamTitle:function(e){
    this.setData({teamTitle:e.detail.value});
  },
  setTeamDesc:function(e){
    this.setData({teamDesc:e.detail.value});
  },
  teamStartTimeChange:function(e){
    this.setData({teamStartTime:e.detail.value});
  },
  teamEndTimeChange:function(e){
    this.setData({teamEndTime:e.detail.value});
  },
  setTeamMaxPeople:function(e){
    this.setData({teamMaxPeople:e.detail.value});
  },
  setTeamActivityId:function(e){
    this.setData({teamActivityId:e.detail.value});
  },
  setTeamActivityName:function(e){
    this.setData({teamActivityName:e.detail.value});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loadData()
  },

  /**
   * 加载数据
   */
  loadData: function() {
    let ip = app.globalData.ip
    var that = this
    tt.request({
          url: app.globalData.ip + '/activity/getAllTeamActivity',
          method: "POST",
          success(res) {
            console.log(res.data);
            let activityList = res.data.data;
            console.log(activityList)
          
            var tempName = [];
            for(var x=0;x< activityList.length;x++){
            
              tempName[x] = activityList[x].activityName
            }
            
            console.log(tempName)
            that.setData({
              activityNameList: tempName
            })
            console.log(that.data.activityNameList)
          },
          fail() {
            console.log(`getList 调用失败`);
          }
        });
  },

})