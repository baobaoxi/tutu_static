 window.toastShow = function(text,length){
        var text = text||'';
        var length = length||2;
        var tpl = '<div class="toast-flayer">'+
                '<div class="toast-wrap">'+
                text+
                '</div>'+
            '</div>';
     $('body').append(tpl);
     
        

        setTimeout(function(){
            $('.toast-flayer').hide();
            $('.toast-flayer').remove();
        },(length+1)*1000);
    };
$(document).ready(function(){
    $('html').css({fontSize:$(window).width()/15});
   
})