var showUserCard = {
    init:function(){
        this.listenHover();
    },
    listenHover:function(){
        var me = this;
        $(document).on('mouseenter','[data-dom="user-card"]',function(){
           
            var uid = $(this).data('uid');
            var userData =  me.getUserInfo(uid);
            var tpl = '<div class="user-card-wrap"><div class="user-card-main border border-all"><span class="user-card-arrow"></span>'+
                '<div class="user-info border border-bottom">'+
                '<img class="user-card-avatar" src="https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/movie/pic/item/f703738da9773912433fa0d6f0198618367ae268.jpg">'+
                '<span class="user-info-top">'+
                '<span class="user-card-name">阿白</span>'+
                '<span class="user-tag">汽车</span>'+
                '<span class="user-card-local">北京</span>'+
                '</span>'+
                '<span class="desc">4s店一名修理工</span>'+
                '</div>'+
                '<div class="user-follow-wrap">'+
                '<span class="vote-num">获得赞数<span class="num">123</span></span>'+
                '<span class="follow-num">粉丝总数<span class="num">123</span></span>'+
                '<span class="follow-btn">关注</span>'+
                '</div>'+
                '</div>'+
            '</div>';
            $(this).append(tpl);
        });
        $(document).on('mouseleave','[data-dom="user-card"]',function(){
            setTimeout(function(){
                  $('.user-card-wrap').remove();
            },500)
          
        });
    },
    getUserInfo:function(){
        var me = this;
        return '';
            
    }
}