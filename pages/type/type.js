// pages/type/type.js
var hostConfig = require('../../common/config.js');
var http = require('../../common/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:[],
    leftData:{
    },
    scrolltop:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // http.httpGet(hostConfig.host.ds +"/ds/terminal/newestCiVersion/"+ hostConfig.listChnId +"-callback.json",{},(res)=>{
    //   // console.log(res);
    // })
    //获取分类数据
    http.httpGet(hostConfig.host.ds + "/ds/terminal/categoryInfo/" + hostConfig.listChnId + "-callback.json", {}, (res) => {
      console.log(res);
      this.setData({
        types:res.rs,
        leftData:res.rs[0],
      })
    },true)
      
  },
  bindType:function (e){
    console.log(e);
    var id= e.currentTarget.dataset.id;
    this.data.types.forEach((typedata,index)=>{
      if (typedata.id == id && typedata.id != this.data.leftData.id){
        console.log(typedata);
          this.setData({
            leftData:typedata,
            scrolltop: 0
          })
          return;
        }
    })
  },
  bindTypeClick:function(e){
    console.log(e);
    var ci=e.currentTarget.dataset.ci;
    var cf = e.currentTarget.dataset.cf;
    
    wx.navigateTo({
      url: '/pages/search/searchlist/list?ci=' + ci+"&cf="+cf,
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
  
  }
})