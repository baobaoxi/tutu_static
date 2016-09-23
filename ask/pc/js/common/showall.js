var  showAll  = {};            
showAll.init    =   function(obj){
        var _this  =  this;
        obj.on('click','.J_ShowAllBtn',function(){  
                var  me  = $(this), p  =   me.parents('.J_ShowAllPart'),all  = p.find('.J_AllPart').val(),showDiv = p.find('.J_AllDiv'),short = p.find('.J_ShortPart');
                if(showDiv.length <= 0){
                    p.prepend("<div  class='J_AllDiv' >"+all+"</div>");
                    short.hide();
                    me.html('[收起]');
                }else{
                    if(showDiv.is(':hidden')){
                        showDiv.show();
                        short.hide();
                        me.html('[收起]');
                    }else{
                        showDiv.hide();
                        short.show();
                        me.html('[查看完整回答]');
                    }
                }
                return false;
        });

}