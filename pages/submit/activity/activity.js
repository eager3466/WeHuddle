const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: ['','喵喵喵', '汪汪汪', '哼唧哼唧'],
    
    multiIndex: [0, 0, 0],
    time: '12:01',
    activityName: '1',
    activityHost: '2',
    activityDesc: '3',
    activityStartTime: '2021-09-12',
    activityEndTime: '2021-09-17',
    activityMaxPeopleNum: '4',
    activityImg:'',
    activityOfficialWebsite: '5',
    activityRegistrationAddress: 'http://i.mi.com',
    activityPlace: '6',
    activityIsPersonal: '0',

    region: ['广东省', '广州市', '海珠区'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
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
      count: 4, //默认9
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
                      activityImg: JSON.parse(res.data).data
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
     console.log(this.data.activityName);
     console.log(this.data.activityHost);
     console.log(this.data.activityDesc);
     console.log(this.data.activityStartTime);
     console.log(this.data.activityEndTime);
     console.log(this.data.activityMaxPeopleNum);
     console.log(this.data.activityImg);
     console.log(this.data.activityOfficialWebsite);
     console.log(this.data.activityPlace);
     console.log(this.data.activityIsPersonal);
    tt.request({
    url: app.globalData.ip + '/activity/addActivity',
    data: {
      'activityName':this.data.activityName,
      'activityHost':this.data.activityHost,
      'activityDesc':this.data.activityDesc,
      'activityStartTime':this.data.activityStartTime,
      'activityEndTime':this.data.activityEndTime,
      'activityMaxPeopleNum':this.data.activityMaxPeopleNum,
      'activityImg':this.data.activityImg,
      'activityType':1,
      'activityOfficialWebsite':this.data.activityOfficialWebsite,
      'activityRegistrationAddress':this.data.activityRegistrationAddress,
      'activityPlace':this.data.activityPlace,
      'activityIsPersonal':this.data.activityIsPersonal,
    },
    header: {
        'content-type': 'application/json'
    },
    method: 'POST',
    success (res) {
        console.log(JSON.stringify(res));
        tt.showToast({
          title: '添加成功',
          duration: 2000,
          success (res) {
              console.log(`${res}`);
          },
          fail (res) {
              console.log(`showToast 调用失败`);
          }
        });
        tt.navigateBack({
            delta: 1,
            success (res) {
                console.log(`${res}`);
            },
            fail (res) {
                console.log(`navigateBack 调用失败`);
            }
        });
    },
    fail (res) {
        console.log(`request22 调用失败`);
    }
    });
  },

  setActvityName:function(e){
    this.setData({activityName:e.detail.value});
  },

  setActvityHost:function(e){
    this.setData({activityHost:e.detail.value});
  },

  setActvityDesc:function(e){
    this.setData({activityDesc:e.detail.value});
  },
  actvityStartTimeChange:function(e){
    this.setData({activityStartTime:e.detail.value});
  },
  actvityEndTimeChange:function(e){
    this.setData({activityEndTime:e.detail.value});
  },
  setActvityMaxPeopleNum:function(e){
    this.setData({activityMaxPeopleNum:e.detail.value});
  },
  setActvityOfficialWebsite:function(e){
    this.setData({activityOfficialWebsite:e.detail.value});
  },
  setActvityRegistrationAddress:function(e){
    this.setData({activityRegistrationAddress:e.detail.value});
  },
  setActvityPlace:function(e){
    this.setData({activityPlace:e.detail.value});
  },
  setActvityIsPersonal:function(e){
    this.setData({activityIsPersonal:e.detail.value});
  },
  activityIndividualChange:function(e){
    this.setData({activityIsPersonal:e.detail.value});
  },
})