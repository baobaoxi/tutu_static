var askIndexM = {
	init: function(){
		this.$mel = $('.wrapper')
		this.changeType();
		
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
	}
}
//点赞
$(document).on('click','.J_up_btn',function(){
    if(!isLogin){
        return false;
    }
    var _self       = $(this);
    var answerId    = _self.attr('data-aid');
    var questionId  = _self.attr('data-qid');
    var flag        = _self.hasClass('ask-vote-box-act');
    var voteSpan    = _self.children('.ask-vote-num');
    var voteNum     = parseInt(voteSpan.text());
    //获得评论内容
    BTF.get("Statistics/AnswerUp","answer_id=" + answerId + "&user_id=" + userId + "&question_id=" + questionId, function(data){
        if(flag){
            _self.removeClass('ask-vote-box-act');
            voteSpan.text(voteNum-1);
        }else{
            _self.addClass('ask-vote-box-act');
            voteSpan.text(voteNum+1);
        }
    },function(error_no,error_msg){
       alert(error_msg);
    });
})