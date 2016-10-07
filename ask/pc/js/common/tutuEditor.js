var  tutuEditor           =    {};

//编辑对象
//当前编辑器区块
tutuEditor.curPartObj            =    null;
tutuEditor.curPartIntance      =    {};
//表情对象
tutuEditor.emoteObj        =     null;
//编辑器对象
tutuEditor.editor         =     null;
//上传图片
tutuEditor.uploadImg      =     null;
//图片连接
tutuEditor.imgUrl          =    "http://uxue-oss-1.oss-cn-beijing.aliyuncs.com/postUpload/";
//图片数量
tutuEditor.imgCnt          =     0;
//编辑器工具
tutuEditor.tools          =     {
        toolbar: [
            'italic bold underline |removeformat'
       ],
       autoHeightEnabled: true,
       autoFloatEnabled: false,
       retainOnlyLabelPasted :true
};

tutuEditor.canStorage       =    true;

//检验存储
tutuEditor.stopStorage     =    function(flag){
        this.canStorage  =  flag;
}

//检验存储
tutuEditor.checkStorage     =    function(){
    var _this = this;
    if(window.localStorage){
          _this.canStorage = true;
          return true;
    }else{
          _this.canStorage = false;
          return false;
    }
}
//获得存储
tutuEditor.getStorage     =    function(key){
        var _this  = this;
        if(_this.canStorage){
            return localStorage.getItem(key);
        }else{
            return '';
        }
}
//设置存储
tutuEditor.setStorage     =    function(key,val){
    var _this  = this;
    if(_this.canStorage){
        return localStorage.setItem(key,val);
    }else{
        return false;
    }
}
//清楚存储
tutuEditor.clearStorage     =    function(key){
    var _this  = this;
    if(_this.canStorage){
          if(key){
              return localStorage.removeItem(key);
          }else{
              return localStorage.clear();
          }
    }else{
          return false;
    }
}

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
tutuEditor.showEmote     =    function(that){
      that.emoteObj = layer.open({
        title:false,
        type: 2,
        shade: false,
        closeBtn: 0,
        area: ['500px','500px'],
        content: '/js/plugin/umeditor/static/face-icon.html',
        zIndex: layer.zIndex, //重点1
        success: function(layero){
          layer.setTop(layero); //重点2
        }
      }); 
} 

tutuEditor.loadUpload     =    function(that){
    var  imgCnt     = 0;
    var  allImgCnt  = 0;
    var uploadConfig  = {
        btnObj:$('.J_InsertImgeMulit')
        ,flash_url    : "/js/plugin/upload/swfupload.swf"
        ,uploadUrl    : _G['uploadJson']['host']
        ,postParam    :{policy:_G['uploadJson']['policy'],OSSAccessKeyId:_G['uploadJson']['accessid'],success_action_status:200,signature:_G['uploadJson']['signature']}         //参数
        ,btnWidth     : 120               //按钮宽度
        ,btnHeight    : 120               //按钮高度
        ,single       : false            //是否上传单独一个文件
        ,fileSizeLimit : "5 MB"
        ,fileIptName  : "file"
        ,fileKey      :_G['uploadJson']['dir']+'/'
        ,btnImage     :'http://o8r3ccejt.bkt.clouddn.com/c658d4d597c0cedb81756589e045c4b1_1'
        ,startFunc    :function(num){ imgCnt = num; }
        ,fileQueueError    : function (file, errorCode, message) {
            if (errorCode == '-110' ) {
                alert('文件超出5M,请调整后上传');
            }
            if (errorCode == '-130' ) {
                alert('文件格式不正确,请调整后上传');
            }
        }
        ,callback     : function(data,fileName){
                
                if(fileName){
                    allImgCnt++;
                    that.insertImage(that.imgUrl+fileName);
                    if(allImgCnt >= imgCnt){
                            layer.close(that.uploadImg);
                    }  
                }
        }
    };
    $('.J_InsertImgeMulit').uploadInput(uploadConfig);
}

//显示插入图片
tutuEditor.showImage     =    function(that){
    
     
    
     var tpl2 = '<div class="ask-layer-wrap">'+
            '<div class="layer-close-btn upload-layer-close-btn"></div>'+
            '<span class="title">插入图片</span>'+
            '<span class="upload-subtitle">插入图片<span>或</span>引用站外图片</span>'+
            '<div class="upload-layer-input-wrap">'+
            '<input type="text" id="J_InsertImge" class="upload-input">'+
            '<span type="button" class="J_InsertImgeMulit" style="width:100px;height:50px">上传</span>'+
            '<span class="upload-btn J_UploadImgInsert">确认</span>'+
            '</div>'+
            '<span class="upload-tips">请不要上传与问答无关的图片，详细请看<a href="###">途途试道使用规范</a></span>'
            '</div>';
    
        var _this  = this;
        that.uploadImg = layer.open({
            content: tpl2,
            type: 1,
            title: false,
            shade:false,
            closeBtn: 0,
            area:['760px','480px'],
            skin: 'layer-wrapper',
            content: tpl2,
            success: function(){
                   that.loadUpload(that);
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
                   _this.insertVideo($('#J_InsertPlay').val()); 
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
        UM.delEditor(editorId);
        _this.setCurEditor(editorId);
        //初始化编辑器
        return _this.editor;
}
//初始化编辑器
tutuEditor.setCurEditor     =     function(editorId){
        var _this     = this;
        _this.editor   = UM.getEditor(editorId,_this.tools) ;
        typeof _this.curPartIntance[editorId] != 'undefined' && _this.curPartIntance[editorId].render();
        _this.curPartIntance[editorId]  =  _this.editor ;
        _this.curPartObj    = $('#'+editorId).parents('.J_Editor');
        //初始化编辑器
        return _this.editor;
}

//获得编辑器对象
tutuEditor.getEditorObj  = function(editorId){
    return typeof this.curPartIntance[editorId] != 'undefined' ? this.curPartIntance[editorId]:false; 
}

//获得内容
tutuEditor.getContent      =    function(editorId){
    var _this = this, content = '';
    if(_this.editor){
        content  =   _this.editor.getContent();
    }
    return content;
}
//初始化
tutuEditor.init           =     function(editorId){
        var _this = this;
        //初始化编辑器
        _this.setEditOpt(editorId);
        //添加表情
        _this.curPartObj.find('.J_Emote').click(function(){
            var editId = $(this).parents('.J_Editor').attr('cur-editor');
            editId && _this.setCurEditor(editId);
            _this.showEmote(_this);
        });
        //添加图片
        _this.curPartObj.find('.J_Image').click(function(){
             var editId = $(this).parents('.J_Editor').attr('cur-editor');
             editId && _this.setCurEditor(editId);
             _this.showImage(_this)
        });
        //添加视频
        //_this.curPartObj.find('.J_Play').click(_this.showPlay);

        //选择表情回调函数
       
}
//closeEmote
window.selectEmoteImg  =  function(value){
        if(!value){
            return false;
        }
        //插入图片
        tutuEditor.insertImage(value);
        layer.closeAll('iframe')
}
window.closeEmote  =  function(){
        layer.closeAll('iframe')
} 

//关闭图片
$(document).on('click','.layer-close-btn',function(){
        layer.close(tutuEditor.uploadImg);
});
//插入图片
$(document).on('click','.J_UploadImgInsert',function(){
    var  img  = $('#J_InsertImge').val();
    tutuEditor.insertImage(img); 
    layer.close(tutuEditor.uploadImg);
});
//匿名选择切换  icon-anonymous J_Anony icon-anonymous-act
$(document).on('click','.J_CheckBox',function(){
    var that  = $(this);
    if(that.hasClass('icon-anonymous-act')){
         that.removeClass('icon-anonymous-act');
    }else{
        that.addClass('icon-anonymous-act');
    }
});
