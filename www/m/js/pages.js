$(document).ready(function(){
    
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
