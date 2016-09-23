;
var askMy = {};

askMy = {
    cfg: {
        delBtn: $('.J_Del'),
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

        //删除
        obj.cfg.delBtn.live('click', function (e) {
            var self = $(this);

            e.preventDefault(), obj.del(self);
        });
        //加载更多
        obj.cfg.loadMore.live('click', function (e) {
            var self = $(this);

            e.preventDefault(), obj.loadMore();
        });
    },
    //删除
    del: function (o) {
        var id = o.attr('data-id'),
            type = o.attr('data-type'),
            typeName = this.typeName(type);

        layer.confirm('确定删除该' + typeName + '？', {icon: 3, title: '提示'}, function (index) {
            BTF.post('User_Ajax/Del', {'id': id, 'type': type}, function (data) {
                if (data.rtn) {
                    o.closest('div[name="item"]').remove();
                    
                    layer.msg('删除成功!', {icon: 1, 'time': 800, 'shade': 0.3});
                } else {
                    layer.msg('删除失败!', {icon: 1, 'time': 1500, 'shade': 0.3});
                }
            }, function (error_no, error_msg) {
                layer.msg(error_msg, {icon: 1, 'time': 1500, 'shade': 0.3});
            });

            layer.close(index);
        });
    },
    //加载更多
    loadMore: function () {
        var obj = this,
            curPage = parseInt(obj.cfg.curPage.val()),
            totalPage = parseInt(obj.cfg.totalPage.val()),
            type = obj.cfg.loadMore.attr('data-type');
        
        //是否回答
        var isDraft = (type == 'draft') ? !0 : !1;
        //是否回答
        var isAnswer = (type == 'answer') ? !0 : !1;

        var className = isDraft ? 'draft' : 'ask';

        //是否显示加载更多
        var isShowLoadMore = curPage < totalPage ? !0 : !1;

        if (isShowLoadMore) {
            BTF.post('User_Ajax/List', {'page': curPage + 1, 'type': type}, function (data) {
                var itemHtml = '',
                    buttonHtml = '',
                    list = data.list;

                $.each(list, function (i, ele) {
                    //内容
                    var content = ele.content;
                    //问题ID
                    var questionId = (type == 'answer') ? ele.question_id : ele.id;

                    if (isAnswer) {
                        //统计数据
                        if (typeof(data.statistics[questionId]) != 'undefined') {
                            var statistics  = data.statistics[questionId];
                        }
                        //回复数
                        var answerNum   = (typeof (statistics) != 'undefined' && statistics.answers) ? parseInt(statistics.answers) : 0;
                        //赞
                        var upNum       = (typeof (statistics) != 'undefined' && statistics.up) ? parseInt(statistics.up) : 0;
                    }
                    //菜单
                    if (type == 'draft') { //草稿
                        buttonHtml += '<a target="_blank" href="/question/' + questionId + '#J_EditorPos" class="' + className + '-item-edit">编辑</a>' +
                                      '<span class="' + className + '-item-date">' + ele.createDate + '</span>';
                    }
                    if (type == 'question' || type == 'answer') { //问题和回答
                        //编辑buttonHTML
                        var editBtnHtml = type == 'question' ? '<span class="' + className + '-item-edit">编辑</span>' : '<a target="_blank" href="/question/' + questionId + '?answer_id=' + ele.id + '" class="' + className + '-item-edit">编辑</a>';
                        //回答数HTML
                        var answerNumHtml = answerNum ? '<span class="' + className + '-item-num">' + answerNum + '条评论</span>' : '';
                        //更新时间HTML
                        var updateDateHtml = ele.updateDate ? '<span class="' + className + '-item-update">更新时间' + ele.updateDate.substr(0, 10) + '</span>' : '';
                        
                        buttonHtml += editBtnHtml + answerNumHtml + '<span class="' + className + '-item-date">发布时间' + ele.createDate.substr(0, 10) + '</span>' + updateDateHtml;
                    }
                    
                    //内容HTML
                    var contentHtml = content.showContent ? '<p class="ask-info desc" data-hide-id="' + questionId + '">' + content.showContent + '...<span class="ask-info-all" data-dom="show_askinfo_all" data-id="' + questionId + '">[查看全部]</span></p><p class="ask-info desc hide" data-show-id="' + questionId + '">' + content.content + '</p>' : '<p class="ask-info desc">' + content.content + '</p>';
                    //点赞模块
                    var upHtml = isAnswer ? '<div class="ask-vote-box ask-vote-box-act border border-all"><span class="ask-vote-num">' + (upNum ? upNum : '') + '</span><span class="ask-vote-icon"></span></div>' : '';

                    itemHtml +='<div name="item" class="' + className + '-item border border-bottom">' +
                                    //针对非草稿 点赞数
                                    upHtml +
                                    '<div class="' + className + '-item-right">' +
                                        '<span class="' + className + '-title title">' + ele.title + '</span>' +
                                            //查看全部
                                            contentHtml +
                                        '<div class="' + className + '-item-bottom">' +
                                            '<span class="' + className + '-item-delete J_Del" data-id="' + questionId + '" data-type="' + type + '">删除</span>' +
                                            //button
                                            buttonHtml
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
    },
    //根据类型获取名称
    typeName: function (type) {
        switch (type){
            case 'draft':
                typeName = '草稿';
                break;
                
            case 'answer':
                typeName = '回答';
                break;
                
            case 'question':
                typeName = '问题';
                break;
            default:
                typeName = '';
        }
        return typeName;
    }
};