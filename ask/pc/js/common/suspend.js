var suspend = {
    renderLeftShare : function(_opt){
        var me = this;
        var tpl = '<div class="left-suspend-wrap border border-left border-top border-right">'+
            '<div class="bdsharebuttonbox">'+
            '<a class="suspend-li  share-weibo"  data-cmd="tsina"></a>'+
            '<a class="suspend-li  share-wechat"  data-cmd="weixin" ></a>'+
            '<a class="suspend-li  share-qq"  data-cmd="qzone"></a>'+
            '<a class="suspend-li share-comment" ></a>'+
            '<a class="suspend-li share-collection" ></a>'+
            '</div>'+
        '</div>';
        $('.main-wrap').append(tpl);
        var wrapLeft = $('.main-wrap').offset().left;
        if($(window).width() < 1400){
            $('.left-suspend-wrap').css({position:'fixed',left:0});
        }
        $(document).on('mouseenter','.share-comment',function(){
            $(this).html('评论');
            $(this).addClass('share-comment-hover');
        })
        $(document).on('mouseleave','.share-comment',function(){
            $(this).html('');
            $(this).removeClass('share-comment-hover');
        })
         $(document).on('mouseenter','.share-collection',function(){
            $(this).html('收藏');
            $(this).addClass('share-collection-hover');
        })
        $(document).on('mouseleave','.share-collection',function(){
            $(this).html('');
            $(this).removeClass('share-collection-hover');
        })
        me.initShare(_opt)
    },
    initShare : function(_opt){
            var shareTile = (_opt && _opt.title && _opt.title!='')? _opt.title:'途途试道';
            var shareContext = (_opt && _opt.context && _opt.context!='')? _opt.context:'分享内容';
            var shareUrl = (_opt && _opt.url && _opt.url!='')? _opt.url:'http://baidu.com';
            var shareimg = (_opt && _opt.img && _opt.img!='')? _opt.img: 'https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/movie/pic/item/f703738da9773912433fa0d6f0198618367ae268.jpg';
            window._bd_share_config={
                "common":{
                    "bdSnsKey":{},
                    "bdText":shareTile,
                    "bdDesc":shareContext,
                    "bdUrl":shareUrl,
                    "bdMini":"2",
                    "bdPic":shareimg,
                    "bdStyle":"0",
                    "bdSize":"16"
                }
                ,"share":{}};
            with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
    }
}