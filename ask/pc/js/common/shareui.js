!(function(window) {
    
    var renderShareTpl = function(){
        
        var tpl = '<div class="ask-layer-wrap">'+
                '<div class="layer-close-btn share-close-btn"></div>'+
                '<span class="title">分享</span>'+
                '<div class="share-btn-wrap bdsharebuttonbox">'+
                '<a class="flayer-share-wechat bds_weixin" data-cmd="weixin" title="分享到微信">微信</a>'+
                '<a class="flayer-share-qq bds_qzone" data-cmd="qzone" title="分享到QQ空间">qq</a>'+
                '<a class="flayer-share-weibo bds_tsina" data-cmd="tsina" title="分享到新浪微博">微博</a>'+
                '</div>'+
        '</div>';
        $(document).on('click','[data-dom="share"]',function(){
            var shareTile = ($(this).data('sharetitle') && $(this).data('sharetitle')!='')? $(this).data('sharetitle'):'途途试道';
            var shareContext = ($(this).data('sharecontext') && $(this).data('sharecontext')!='')? $(this).data('sharecontext'):'分享内容';
            var shareUrl = ($(this).data('shareurl') && $(this).data('shareurl')!='')? $(this).data('shareurl'):'http://baidu.com';
            var shareimg = ($(this).data('shareimg') && $(this).data('shareimg')!='')? $(this).data('shareimg'): 'https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/movie/pic/item/f703738da9773912433fa0d6f0198618367ae268.jpg';
            var shareLayer =  layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                shadeClose: false,
                area:['314px','174px'],
                skin: 'layer-wrapper',
                content: tpl
            });
            $('.share-close-btn').on('click',function(){
                layer.close(shareLayer);
            });
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
        });
        
    };
   
     
    $(document).ready(function(){
        renderShareTpl(); 
    })
   
})(window);