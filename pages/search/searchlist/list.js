// pages/search/searchlist/list.js
var httpConfig=require("../../../common/config.js")
var http=require("../../../common/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:"",
    goods:[],//商品
    currentIndex:1,
    cp:0,
    ci:"",
    cf:"",
    host:httpConfig.host,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ci: options.ci,
      cf: options.cf,
    })
    this.getData();
  },
  getData:function(){
    // if(this.data.cf||this.data.cf==""){
    //   this.data.cf="''";
    // }
    http.httpGet(httpConfig.host.clientSearch + "/mobile/clientSearch" + "?ch=100040&ps=10&v=10.0" + "&keyword=" + this.data.keyword + "&iv=0" + "&st=0" + "&cp=" + this.data.cp + "&cf=" + this.data.cf + "&ci=" + this.data.ci + "&ct=0" + "&cityId=021", {}, (res) => {
     var newData= this.data.goods.concat(res.goods);
     this.data.cp++;
      this.setData({
        goods: newData,
      })
      wx.stopPullDownRefresh();
    }, true)
  },
  bindCondition:function(e){
      console.log(e);
      var index= e.currentTarget.dataset.index;
      this.setData({
        currentIndex:index,
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
    this.setData({
      cp:0,
      goods: []
    })
    this.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})