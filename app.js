//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  reqGetApi:function(url,callback){
    wx.request({
      url,
      data:{},
      success:function(res){
        console.log("1",res);
        callback(null,res.data)
      },
      fail:function(e){
        callback(e)
        
      }

    })
    

  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    apiKey:'d53b4fbef2e9578ecd4d92d37bd0d436'
  }
})