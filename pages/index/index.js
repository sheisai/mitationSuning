//index.js
//获取应用实例
const app = getApp()
var httpManager = require('../../common/http.js');
var hostConfig = require('../../common/config.js');
Page({
  data: {
    cmsdata: [],
    palamLists:[],//掌上抢数据
    host: hostConfig.host
  },
  bindToSearch: function(e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //获取首页数据
  cmsData: function(e) {
    httpManager.httpGet(this.data.host.cms + "/api/json/wx_index_0730.json?v=201807309", {},
      (res) => {
        console.log(res);
        this.setData({
          cmsdata: res
        })
      }, true)
  },
  getServerTime: function() {
    httpManager.httpGet(this.data.host.ju + "/ajax/getSystemTime_.html", {},
      (res) => {

        var time = res.currentTime;

        console.log(time);
        console.log(res);
        var timenew = time.replace(/-/g, '/');
        var datenew = new Date(timenew).getTime();
        this.getTimes(datenew);
        console.log(timenew);
        console.log(datenew);
      }, true)
  },
  //获取所有时间
  getTimes: function(timenew) {
    httpManager.httpGet(this.data.host.jum + "/wap/approb/ajax/queryPalamRobTime_1_1_161000000000.htm", {},
      (res) => {
        console.log(res);
        var arrTimes = res.data.times;
        var newTimes = [];
        arrTimes.filter((time) => {
          return "01:00" != time.name;
        }).forEach((time, index) => {
          var timeLong = time.timeLong,
            timeComp = timeLong - timenew,
            title = "",
            titleEs = "";
            if (time.name = time.name.substring(0, 5),
              timeComp > 0 ? (title = "即将开抢", titleEs = "next") : timeComp < 0 && (title = "已开抢", titleEs = "pre"), newTimes.push({
                name: time.name,
                text: title,
                type: titleEs,
                timeLong: timeLong,
                isNowTime: time.isNowTime
              }), time.isNowTime) {
              this.queryCommodityList(timeLong);

            }
        });

      }, true)
  },
  /**
   * 获取掌上抢数据
   */
  queryCommodityList: function(timeComp) {
    httpManager.httpGet(this.data.host.jua + "/appRob/ajax/queryCommodityList_1" + "_1_" + timeComp + "_0___" + "021" + ".htm", {},
      (res) => {
        console.log(res);
        this.setData({
          palamLists: res.data.commList,
        })
      }, true)
  },
  onLoad: function() {
    this.cmsData();
    this.getServerTime();
  }

})