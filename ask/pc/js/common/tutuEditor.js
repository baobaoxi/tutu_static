var  tutuEditor           =    {};
//当前编辑器区块
tutuEditor.curPartObj      =    null;
//表情对象
tutuEditor.emoteObj        =     null;
//编辑器对象
tutuEditor.editor         =     null;
//编辑器工具
tutuEditor.tools          =      {
        toolbar: [
            'italic bold underline |removeformat'
       ],
       autoHeightEnabled: true,
       autoFloatEnabled: false,
       retainOnlyLabelPasted :true
};

//插入图片
tutuEditor.insertImage     =    function(value){
    var param  =  $.isArray(value)  ? value :  [{src:value,_src:value}]; 
    this.editor && this.editor.execCommand('insertimage',param);
}
//插入视频
tutuEditor.insertVideo     =    function(url){
    //insertvideo
    this.editor && this.editor.execCommand('insertvideo', { url: url });
}

//显示表情
tutuEditor.showEmote     =    function(){
      this.emoteObj = layer.open({
        title: '选择表情',
        type: 2,
        shade: false,
        area: ['500px','500px'],
        content: 'http://wangmc.ask.lianwx.com/js/plugin/umeditor/static/face-icon.html',
        zIndex: layer.zIndex, //重点1
        success: function(layero){
          layer.setTop(layero); //重点2
        }
      }); 
} 
//显示插入图片
tutuEditor.showImage     =    function(){
        var index = layer.open({
            title: '选择图片',
            content: '<input id="J_InsertImge"  value="" >',
            area: '200px',
            yes: function(){
                    var  img  = $('#J_InsertImge').val();
                    tutuEditor.insertImage(img); 
                    layer.closeAll(index);
            }    
        });
} 
//显示插入视频
tutuEditor.showPlay      =    function(){

        var _this  =  this, index = layer.open({
            title: '选择视频',
            content: '<input id="J_InsertPlay"  value="" >',
            area: '200px',
            yes: function(){
                   tutuEditor.insertVideo($('#J_InsertPlay').val()); 
                   layer.closeAll(index);
            },
            cancel:function(){
                   layer.closeAll(index);   
            }       
        });
} 
//初始化编辑器
tutuEditor.setEditOpt     =     function(editorId){
        var _this = this;
        _this.editor        != null &&  UM.delEditor(editorId);
        _this.editor        = UM.getEditor(editorId,_this.tools);
        _this.curPartObj    = $('#'+editorId).parents('.J_Editor');
        //初始化编辑器
        return _this.editor;
}
//获得内容
tutuEditor.getContent      =    function(){
    var _this = this, content = '';
    if(_this.editor){
        content  =   _this.editor.getContent();
    }
    return content;
}
tutuEditor.init           =     function(editorId){
        var _this = this;
        //初始化编辑器
        _this.setEditOpt(editorId);

        //添加表情
        _this.curPartObj.find('.J_Emote').click(_this.showEmote);
        //添加图片
        _this.curPartObj.find('.J_Image').click(_this.showImage);
        //添加视频
        _this.curPartObj.find('.J_Play').click(_this.showPlay);

        //选择表情回调函数
        window.selectEmoteImg  =  function(value){
                if(!value){
                    return false;
                }
                //插入图片
                _this.insertImage(value);
                layer.closeAll('iframe')
        }

}