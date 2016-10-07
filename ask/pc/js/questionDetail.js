var questionDetail = {
    
    init:function(){
        this.changeRankType();
    },
    changeRankType:function(){
        var flag = false;
        $(document).on("click",'[data-dom="show_rank_types"]',function(){
            $('.ask-rank-wrap').find('ul').show();
        })
        $(document).on("click",'[data-dom="select_rank_type"]',function(){
            $('.ask-rank-ul').hide();
            $('.rank-type-text').html($(this).data('text'));
            $('.ask-rank-wrap ul li').removeClass('current-type');
            $(this).addClass('current-type');
        })
    }
}