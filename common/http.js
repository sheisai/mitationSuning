var host = "";
var header = {

}
var httpG = function(url, par, callback, isloading) {
  if (isloading) {
    wx.showLoading({
      title: '正在加载...',
    })
  }
  wx.request({
      url: url,
      data: par,
      header: header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        callback(res.data);
      },
      fail: function(res) {},
      complete: function(res) {
        if (isloading) {
        wx.hideLoading()
        }
      
    },
  })
}


module.exports={
  httpGet: httpG
}