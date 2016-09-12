var dialog      =  {};

dialog.okObj     = null;
dialog.errorObj  = null;
dialog.msgObj    = null;
dialog.ok = function(msg,callback){
    callback  = callback || function(){ layer.closeAll(dialog.okObj); };    
    this.okObj = layer.alert(msg, {icon: 1},callback); //这时如果你也还想执行yes回调，可以放在第三个参数中。   
}

dialog.error = function(msg,callback){
    msg       = msg ||  "服务器繁忙";
    callback  = callback || function(){ layer.closeAll(dialog.errorObj); }; 
    this.errorObj = layer.alert(msg, {icon: 2},callback); //这时如果你也还想执行yes回调，可以放在第三个参数中。   
}
dialog.msg = function(msg,callback){
    msg       = msg ||  "服务器繁忙";
    callback  = callback || function(){  layer.closeAll(dialog.msgObj);}; 
    this.msgObj = layer.msg(msg, callback);
}