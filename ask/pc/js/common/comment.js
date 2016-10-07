
var comment = {};

//评论列表
comment.curCommentList = null;
//评论模块
comment.curCommentPart = null;
//问题Id
comment.curAnswerId = 0;

comment.initParam = function (answerId) {
    var _this = this;
    if (answerId <= 0) {
        _this.curAnswerId = 0;
        _this.curCommentList = null;
        _this.curCommentPart = null;
        return _this;
    }
    _this.curAnswerId = answerId;
    _this.curCommentList = $('#J_CommentList_' + answerId);
    _this.curCommentPart = $('#J_CommentPart_' + answerId);
    return _this;
}

//评论html
comment.getCommentHtml = function (list) {
    if (typeof list.length == 'undefined') {
        return  '';
    }

    var strVar = "", len = list.length, i = 0;
    if (len <= 0) {
        return '';
    }
    for (i; i < len; i++) {

        strVar += "<div class=\"comment-item border border-bottom J_ReplyItem\">";
        strVar += "	<div class=\"comment-item-top\"><a target='_blank'  href='"+ (typeof list[i]['user_url'] != 'undefined' ? list[i]['user_url'] : '') + "'  >";
        strVar += "		<img class=\"fl\" src=\"" + (typeof list[i]['user_avator'] != 'undefined' ? list[i]['user_avator'] : 'http://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/lvpics/pic/item/0df431adcbef7609a6df28bb2ddda3cc7cd99e3a.jpg') + "\"><span class=\"comment-user-name fl\">" + (typeof list[i]['user_nickname'] != 'undefined' ? list[i]['user_nickname'] : '匿名') + "<\/span><span class=\"comment-user-info co-999 fl\">" + (typeof list[i]['user_remark'] != 'undefined' ? list[i]['user_remark'] : '热心网友') + "</a><\/span>";
        strVar += "	<\/div>";
        strVar += "	<div class=\"comment-item-main\">";
        strVar += "		<p class=\"co-333\">" + (typeof list[i]['content'] != 'undefined' ? list[i]['content'] : '') + "<\/p>";
        strVar += "	<\/div>";
        strVar += "	<div class=\"comment-item-bottom co-999\">";
        strVar += "		<span class=\"comment-item-time\">" + (typeof list[i]['tm_txt'] != 'undefined' ? list[i]['tm_txt'] : '-') + "<\/span><span   data-userid='" + (typeof list[i]['user_id'] != 'undefined' ? list[i]['user_id'] : '0') + "'  data-replyid='" + (typeof list[i]['id'] != 'undefined' ? list[i]['id'] : '0') + "'  class=\"comment-item-reply J_ReplyBtn\">回复<\/span>";
        strVar += "	<\/div>";
        strVar += "<\/div>";
    }
    return strVar;

}

//设置评论
comment.setComment = function (list, answerId) {
    answerId > 0 && this.initParam(answerId);

    var htmlStr = this.getCommentHtml(list);
    this.curCommentList && this.curCommentList.html(htmlStr);
}
//追加
comment.addComment = function (addObj, answerId) {
    if (typeof addObj == 'undefined') {
        return false;
    }
    answerId > 0 && this.initParam(answerId);
    var htmlStr = this.getCommentHtml([addObj]);
    this.curCommentList && this.curCommentList.append(htmlStr);
}
//设置评论
comment.setPageBar = function (htmlStr, answerId) {
    answerId > 0 && this.initParam(answerId);
    (this.curCommentPart.find('.J_PageBar') && htmlStr) && this.curCommentPart.find('.J_PageBar').html(htmlStr).show();
}

//获得评论数据
comment.getCommentList = function (page, success, error) {
    var _this = this, success = success || function () {
    }, error = error || function () {
    };

    if (_this.curAnswerId == null || _this.curAnswerId <= 0) {
        return false;
    }
    var a = _this.curAnswerId;
    BTF.get("Comments/List", "answer_id=" + a + "&page=" + page, function (data) {
        success(data);
    }, function (error_no, error_msg) {
        error(error_no, error_msg);
    });
}

//展示评论
comment.showComment = function (answerId, page) {
    var _this = this, page = page || 1;
    _this.initParam(answerId);
    //显示列表
    _this.getCommentList(page, function (data) {
        _this.setComment(typeof data['list'] != 'undefined' ? data['list'] : []);
        _this.setPageBar(typeof data['pageBar'] != 'undefined' ? data['pageBar'] : '');
        _this.curCommentPart && _this.curCommentPart.slideDown().show();
    }, function (error_no, error_msg) {
        dialog.error(error_msg);
        _this.setPageBar('');
        _this.curCommentPart && _this.curCommentPart.slideUp().hide();
    });

}
//保存评论
comment.saveComment = function (answerId, content, success, error) {
    var _this = this, success = success || function () {
    }, error = error || function () {
    };

    _this.initParam(answerId);
    if (_this.curAnswerId == null || _this.curAnswerId <= 0) {
        return false;
    }
    
    var  replyId  = 0,replyUserId = 0;
    if(_this.curCommentPart){
        replyId     =   _this.curCommentPart.find('.J_ReplyId').val(); 
        replyUserId =   _this.curCommentPart.find('.J_ReplyUserId').val();
    }
    BTF.post("Comments/Add", "answer_id=" + _this.curAnswerId + "&content=" + content+"&reply_user_id=" + replyUserId + "&reply_id="+replyId, success, error);
}
//设置回复bar
comment.setReplyBar = function ( userName ,answerId) {
    answerId > 0 && this.initParam(answerId);
    var  bar = this.curCommentPart.find('.J_ReplyText');
    bar.find('span').html("正在@"+userName);
    if(userName!=''){
        bar.show();
    }else{
        bar.hide();
    }
}

//设置回复
comment.setReply = function (replyId, replyUserId, userName ,answerId) {
    answerId > 0 && this.initParam(answerId);
    this.curCommentPart.find('.J_ReplyUserId').val(replyUserId);
    this.curCommentPart.find('.J_ReplyId').val(replyId);
    this.setReplyBar(userName);
}
//清空回复
comment.clearReply = function (answerId) {
    answerId > 0 && this.initParam(answerId);
    this.curCommentPart.find('.J_ReplyUserId').val(0);
    this.curCommentPart.find('.J_ReplyId').val(0);
    this.setReplyBar('');
}
comment.init = function () {

    var _this = this;
    $('#J_AnswerPart').on('click', '.J_SaveComment', function () {
        var that = $(this), answerId = that.attr('data-id'), conObj = $('#J_Content_' + answerId), content = conObj.val();

        if (that.hasClass('btn-disabled')) {
            return false;
        }

        that.val('提交中').addClass('btn-disabled');
        if (!content || $.trim(content) == '') {
            dialog.msg('内容不能为空');
            that.val('发布').removeClass('btn-disabled');
            return false;
        }

        //展示列表
        _this.saveComment(answerId, content, function (data) {
            dialog.ok(data.msg, function () {
                _this.showComment(answerId);
                conObj.val('');
                layer.closeAll();
                that.val('发布').removeClass('btn-disabled');
            });
        }, function (error_no, error_msg) {
            dialog.error(error_msg);
            that.val('发布').removeClass('btn-disabled');
        });
    });


    //展示列表
    $(document).on('click', '.J_CommentShow', function () {
        var that = $(this), answerId = that.attr('data-id');
        //展示列表
        _this.showComment(answerId);
    });
    //分页
    $('#J_AnswerPart').on('click', '.J_Page', function () {
        var that = $(this), part = that.parents('.J_CommentPart'), answerId = part.attr('data-id'), curPage = that.attr('data-page');
        //展示列表
        _this.showComment(answerId, curPage);

    });
    //J_CommentClose
    $(document).on('click', '.J_CommentClose', function () {
        var answerId = $(this).attr('data-id');
        $('.J_CommentClose').parent('#J_CommentPart_' + answerId).slideUp("slow");
    });
    //回复
    $('#J_AnswerPart').on('click', '.J_ReplyBtn', function () {
        var that = $(this), replyId = that.attr('data-replyid'), replyUserId = that.attr('data-userid'), part = that.parents('.J_CommentPart'), answerId = part.attr('data-id'),userName = that.parents('.J_ReplyItem').find('.comment-user-name').html();
        if(answerId <= 0){
            return false;
        }
        _this.initParam(answerId);
        _this.setReply(replyId, replyUserId,userName, answerId);
    });

    //关闭回复
    $('#J_AnswerPart').on('click','.J_ReplyClose',function(){
         var that = $(this), part = that.parents('.J_CommentPart'), answerId = part.attr('data-id');
         _this.clearReply(answerId);
    })

}
