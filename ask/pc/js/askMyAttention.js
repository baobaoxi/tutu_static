;
var askMyAttention = {};

askMyAttention = {
    cfg: {
        unfollowBtn: $('.J_Unfollow'),
        reportBtn: $('.J_Report'),
        list: $('#J_List'),
        curPage: $('#J_CurPage'),
        totalPage: $('#J_TotalPage'),
        loadMore: $('#J_LoadMore')
    },
    init: function () {
        this.loadMore(), this.bindEvent();
    },
    //事件绑定
    bindEvent: function () {
        var obj = this;

        //取消关注
        obj.cfg.unfollowBtn.live('click', function (e) {
            var self = $(this);
            
            e.preventDefault(), obj.unfollow(self);
        });
        //举报
        obj.cfg.reportBtn.live('click', function (e) {
            var self = $(this);
            
            e.preventDefault(), obj.report(self);
        });
        //加载更多
        obj.cfg.loadMore.live('click', function (e) {
            var self = $(this);

            e.preventDefault(), obj.loadMore();
        });
    },
    //取消关注
    unfollow: function (o) {
        var id = o.attr('data-id');

        layer.confirm('确定取消关注？', {icon: 3, title: '提示'}, function (index) {
            BTF.post('User_Ajax/Del', {'id': id, 'type': 'attention'}, function (data) {
                if (data.rtn) {
                    o.closest('div[name="item"]').remove();
                    
                    layer.msg('取消关注成功!', {icon: 1, 'time': 800, 'shade': 0.3});
                } else {
                    layer.msg('取消关注失败!', {icon: 1, 'time': 1500, 'shade': 0.3});
                }
            }, function (error_no, error_msg) {
                layer.msg(error_msg, {icon: 1, 'time': 1500, 'shade': 0.3});
            });

            layer.close(index);
        });
    },
    //举报
    report: function () {
        askUtil.renderReportLayer();
    },
    //加载更多
    loadMore: function () {
        var obj = this,
            curPage = parseInt(obj.cfg.curPage.val()),
            totalPage = parseInt(obj.cfg.totalPage.val()),
            type = obj.cfg.loadMore.attr('data-type');
        
        //是否显示加载更多
        var isShowLoadMore = curPage < totalPage ? !0 : !1;

        if (isShowLoadMore) {
            BTF.post('User_Ajax/AttentionList', {'page': curPage + 1}, function (data) {
                var itemHtml = '',
                    list = data.list;
                    
                $.each(list, function (i, ele) {
                    //统计数据
                    if (typeof(data.statistics) != 'undefined') {
                        var statistics  = data.statistics[ele.id];
                    }
                    //回复数
                    var answers     = (typeof(statistics) != 'undefined' && statistics.answers) ? parseInt(statistics.answers) : 0;
                    //关注数
                    var attention   = (typeof(statistics) != 'undefined' && statistics.attention) ? parseInt(statistics.attention) : 0;
                    
                    itemHtml +='<div name="item" class="follow-item border border-bottom">' +
                                        '<div class="follow-item-right">' +
                                                '<span class="follow-title title">' + ele.title + '</span>' +
                                                '<div class="follow-item-bottom">' +
                                                        '<span class="follow-item-time J_Unfollow" data-id="' + ele.id + '">取消关注</span>' +
                                                        //回答数
                                                        (answers ? '<span class="follow-item-num">回答数（' + answers + '）</span>' : '') +
                                                        '<span class="follow-item-share">关注人数（' + attention + '）</span>' +
                                                '</div>' +
                                        '</div>' +
                                '</div>';
                });

                obj.cfg.list.append(itemHtml);
                //当前页数
                isShowLoadMore && obj.cfg.curPage.val(curPage + 1);
                
                (curPage + 1 == totalPage) ? obj.cfg.loadMore.remove() : obj.cfg.loadMore.show();
            }, function (error_no, error_msg) {
                layer.msg(error_msg, {icon: 2, 'time': 1500, 'shade': 0.3});
            });
        } else {
            obj.cfg.loadMore.remove();
        }
    }
};