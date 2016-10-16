// 拿到全局应用程序实例
var app = getApp();

const LOTTERYQUERY_URL = 'http://f.apiplus.cn/ssq-30.json';

Page( {
  data: {
    isModalHidden: true,
    lotterData: ""
  },
  getArray: function( openCode ) {
    var Array = openCode.split( "," )
    var openCodes = [];
    for( var i = 0;i < Array.length;i++ ) {
      if( i == ( Array.length - 1 ) ) {
       var Array2 = Array[ i ].split( "+" );
        openCodes = openCodes.concat( Array2 );
      } else {
        openCodes.push( Array[ i ] )
      }
    }
    return openCodes;

  },
  req: function() {
    app.reqGetApi( LOTTERYQUERY_URL,( err, data ) => {
      if( data.rows > 0 ) {
        for( var i = 0;i < data.data.length;i++ ) {
          data.data[ i ].opencode = this.getArray( data.data[ i ].opencode );
        }
        this.setData( { lotterData: data.data,isModalHidden:true })
      } else {
        this.setData( { isModalHidden: false })
      }
    })

  },
  onLoad: function( options ) {
    console.log( "onLoad" )
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
      that.req()
    // wx.request({
    //   url:'http://apis.baidu.com/apistore/lottery/lotteryquery?lotterycode=ssq&recordcnt=1',
    //   method:'GET',
    //   header:{'apikey':app.globalData.apiKey},
    //   success:function(data){
    //     console.log(data)
    //     that.setData({
    //           res:JSON.stringify(data)
    //     })
    //   },
    //   fail:function(a){
    //     console.log(a)

    //   }

    // })
  },

  onReady: function() {
    // 页面渲染完成
    console.log( "onReady" );
  },
  onShow: function() {
    // 页面显示
    console.log( "onshow" );
  },
  onHide: function() {
    // 页面隐藏
    console.log( "onHide" );
  },
  onUnload: function() {
    // 页面关闭
    console.log( "onUnload" );
  }
})