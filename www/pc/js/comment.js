var comment = {
    init : function(docId,artType){
        this.docId = docId;
        this.artType = artType;//类型,1.文章 2视频
    },
    //发表评论
    postCommentLock : false,
    postCommnent : function(okfunc){
        that = this;
        if(this.postCommentLock){return false;}
        this.postCommentLock = true;
        var content = $.trim($("#comment_content").val());
        if(!content){
            dialog.msg("请输入评论内容!");
            return ;
        }
        var param = $("#comment_form").serialize();
        BTF.post("Ajax_Comments/Add",param,function(data){
            //alert(data.content);
            that.postCommentLock = false;
            $("#comment_content").val("");
            //dialog.ok("评论成功!");
            layer.msg('评论发表成功!', {
                icon: 1,
                time: 1500,
                shade: 0.3
            });
            okfunc();
        },function(err){
            //console.log(err);
            that.postCommentLock = false;
        });
        
    },
    
    //发表评论回复
    postCommentReply : function(replyId,okfunc){
        
        var param = $("#form-reply-"+replyId).serialize();
        BTF.post("Ajax_Comments/Add",param,function(data){
            okfunc();
        },function(err){
            //console.log(err);
        });
    },
    
    //获得评论内容
    getHtml : function(docId,sort,page,okfunc){
        BTF.get("Ajax_Comments/GetHtml","doc_id="+docId+"&sort="+sort+"&page="+page+"&arttype="+this.artType,function(data){
            if(data && data.commentHtml){
                okfunc(data.commentHtml);
            }else{
                okfunc("");
            }
        },function(err){
            return "";
            //console.log(err);
        });
    }
    
}