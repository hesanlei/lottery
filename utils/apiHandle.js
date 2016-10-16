function _getArray( openCode ) {
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
}
module.exports={
  getOpenCodeArray:_getArray
}
