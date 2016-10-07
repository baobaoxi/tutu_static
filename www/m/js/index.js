$(document).ready(function(){
    $('.flexslider').flexslider({
            slideshowSpeed: 3000, // 展示时间间隔ms
            animationSpeed: 400, // 滚动时间ms
            touch: true, // 是否支持触屏滑动
            animation: 'slide',
            directionNav: false,
            allowOneSlide: false,
            pauseOnAction: true,
            pauseInvisible: true,
            after: function (slider) {
                slider.pause();
                slider.play();
            }
        });
    var setSize = function(){
        var wWidth = $(window).width();
        var wHeight = $(window).height();
        if(wHeight > 400){
            $('.menu-wrap').height(wHeight);
             $('.menu-wrap').width(wWidth);
        }
    }
    setSize();
    var evtBind = function(){
        $(document).on('click','header .header-left-bar',function(){
            $('.menu-wrap').show();
        });
        $(document).on('click','header .menu-close-btn',function(){
            $('.menu-wrap').hide();
        })
    }
    evtBind();
})    
