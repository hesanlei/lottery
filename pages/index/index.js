//index.js

//获取应用实例
var app = getApp()
var apiHandle = require( '../../utils/apiHandle.js' );
const NewLOTTERYQUERY_URL = 'http://f.apiplus.cn/ssq-1.json';

Page( {
  data: {
    motto: 'Hello World',
    userInfo: {},
    time: { hour: 0, minute: 0, second: 0 },
    lotterData: [],
    isModalHidden:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },
  ShowCountDown: function( leftTime ) {
    var hour = Math.floor( leftTime / 3600 );
    var minute = Math.floor(( leftTime - hour * 3600 ) / 60 );
    var second = Math.floor( leftTime - hour * 3600 - minute * 60 );
    this.setData( {
      time: { hour: hour, minute: minute, second: second }
    });
  },
  countDown: function() {
    var currentDate = new Date();
    var currentTime = Date.parse( currentDate ) / 1000;
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var currentDay = currentDate.getDate();
    var currentWeek = currentDate.getDay();
    var IntervalDays = 0;
    (currentWeek == 0) ? IntervalDays = 7 : IntervalDays=currentWeek;
    var initialTime = new Date( currentYear, currentMonth, currentDay - IntervalDays, 21, 20, 40 ) / 1000;
    var firstTime = initialTime + 86400 * 2
    var nextTime = initialTime + 86400 * 4
    var lastTime = initialTime + 86400 * 7
   
    if( initialTime < currentTime && currentTime < firstTime ) {
      this.ShowCountDown( firstTime - currentTime )
    } else if( firstTime < currentTime && currentTime < nextTime ) {
      this.ShowCountDown( nextTime - currentTime )
    } else if( nextTime < currentTime && currentTime < lastTime ) {
      this.ShowCountDown( lastTime - currentTime )
    }


  },

  getNewLottery: function() {
    app.reqGetApi( NewLOTTERYQUERY_URL, ( err, data ) => {
      if( data.rows > 0 ) {
        console.log(data.data);
        for( var i = 0;i < data.data.length;i++ ) {
          console.log("分割",data.data[ i ].opencode)
          data.data[ i ].opencode = apiHandle.getOpenCodeArray( data.data[ i ].opencode );
        }
        console.log("分割结束",data.data.opencode)
        this.setData( { lotterData: data.data ,isModalHidden:true})
      } else {
        this.setData( { isModalHidden: false })
      }
    })
  },

  onLoad: function() {
    console.log( 'onLoad' )

    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })

    
    that.getNewLottery();
    that.countDown();

  },
  onShow: function() {
    console.log( "onShow" )
  },
  onReady: function() {
    console.log( "onReady" )
    setInterval( this.countDown, 1000 )
  }
})
