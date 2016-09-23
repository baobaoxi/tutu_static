var askIndexM = {
	init: function(){
		this.$mel = $('.wrapper')
		this.changeType();
        //加载更多的锁
        this.getMoreLock = false;
	},
	changeType : function(){
		var me = this;
		me.$mel.find('.nav-li').on('click',function(){
			var type = $(this).data('type');
			me.$mel.find('.nav-li').removeClass('active');
			$(this).addClass('active');
			$('.wrap-main').hide();
			me.$mel.find('[data-node="'+type+'"]').show();
		})
	},
    //加载更多的相关处理
    getMore : function(obj){
        if(askIndexM.getMoreLock){
            layer.msg('hold on!', {icon: 2, 'time': 1500, 'shade': 0.3});
            return false;
        }
        askIndexM.getMoreLock = true;
        obj.children('.J_loadText').text('加载中...');
        var _self       = obj;
        var type    = parseInt(_self.attr('data-type'));
        var page    = parseInt(_self.attr('data-page'));
        var status  = parseInt(_self.attr('data-status'));
        if(status !== 1 || page < 2){
            askIndexM.getMoreLock = false;
            obj.children('.J_loadText').text('点击展开更多');
            return false;
        }
        //
        BTF.post("Default/AjaxList","&type=" + type + "&page=" + page, function(data){
            if(data.state == 1){
                _self.before(data.dataHtml);
                _self.attr('data-page',page+1);
            }else{
                layer.msg(data.msg, {icon: 2, 'time': 1500, 'shade': 0.3});
                _self.hide();
            }
            askIndexM.getMoreLock = false;
            obj.children('.J_loadText').text('点击展开更多');
        },function(error_no,error_msg){
            layer.msg(error_msg, {icon: 2, 'time': 1500, 'shade': 0.3});
            askIndexM.getMoreLock = false;
            obj.children('.J_loadText').text('点击展开更多');
        });
    }
};

//点赞
$(document).on('click','.J_up_btn',function(){
    if(!isLogin){
        layer.msg('no login', {icon: 2, 'time': 1500, 'shade': 0.3});
        return false;
    }
    publicObj.doUp($(this));
});

//关注
$(document).on('click','.J_follow_btn',function(){
    if(!isLogin){
        layer.msg('no login', {icon: 2, 'time': 1500, 'shade': 0.3});
        return false;
    }
    publicObj.doFollow($(this));
});

//举报弹出
$(document).on('click','.J_report_btn',function(){
    if(!isLogin){
        layer.msg('no login', {icon: 2, 'time': 1500, 'shade': 0.3});
        return false;
    }
    askUtil.renderReportLayer();
    publicObj.doReportInit($(this));
});

//举报提交
$(document).on('click','#J_report_submit',function(){
    if(!isLogin){
        layer.msg('no login', {icon: 2, 'time': 1500, 'shade': 0.3});
        return false;
    }
    publicObj.doReport($(this));
});

//加载更多
$(document).on('click','.J_GetMore',function(){
    askIndexM.getMore($(this));
});

//搜索
$('#J_search_btn').click(function(){
    var keyword = $('#J_keyword').val();
    $('#searchform').submit();
})