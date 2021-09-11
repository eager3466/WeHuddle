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
    activityOfficialWebsite: '5',
    activityPlace: '6',
    activityIsPersonal: '7',

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
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
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
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
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
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
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
     console.log(this.data.activityOfficialWebsite);
     console.log(this.data.activityPlace);
     console.log(this.data.activityIsPersonal);
    tt.request({
    url: 'http://10.220.46.153:8081/activity/addActivity',
    data: {
      'activityName':this.data.activityName,
      'activityHost':this.data.activityHost,
      'activityDesc':this.data.activityDesc,
      'activityStartTime':this.data.activityStartTime,
      'activityEndTime':this.data.activityEndTime,
      'activityMaxPeopleNum':this.data.activityMaxPeopleNum,
      'activityOfficialWebsite':this.data.activityOfficialWebsite,
      'activityPlace':this.data.activityPlace,
      'activityIsPersonal':this.data.activityIsPersonal,
    },
    header: {
        'content-type': 'application/json'
    },
    method: 'POST',
    success (res) {
        console.log(JSON.stringify(res));
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
  setActvityPlace:function(e){
    this.setData({activityPlace:e.detail.value});
  },
  setActvityIsPersonal:function(e){
    this.setData({activityIsPersonal:e.detail.value});
  },
  activityIndividualChange:function(e){
    this.setData({activityEndTime:e.detail.value});
  },
})