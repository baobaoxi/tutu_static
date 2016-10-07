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
        //编辑问题
        $('#J_List .icon-toask').live('click', function (e) {
            var self = $(this),
                item = self.closest('div[name="item"]'),
                id = self.attr('data-id'),
                isAnony = parseInt(self.attr('data-isAnony')),
                title = item.find('.title').html(),
                content = item.find('[data-show-id="' + id + '"]').html();

            //匿名
            if (isAnony) {
                $('#J_QuestionAnony').addClass('icon-anonymous-act');
            }
                
            $('#J_Title').val(title || ''), $('#J_QuestionEditor').html(content || ''), e.preventDefault();
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
                    layer.msg('删除失败!', {icon: 2, 'time': 1500, 'shade': 0.3});
                }
            }, function (error_no, error_msg) {
                layer.msg(error_msg, {icon: 2, 'time': 1500, 'shade': 0.3});
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
        var isAnswer = (type == 'answer') ? !0 : !1;
        //是否草稿
        var isDraft = (type == 'draft') ? !0 : !1;

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
                    var questionId = (type != 'question') ? ele.question_id : ele.id;

                    if (!isDraft) {
                        //统计数据
                        if (typeof(data.statistics) != 'undefined') {
                            var statistics  = data.statistics[ele.id];
                        }
                    }
                    //菜单
                    if (type == 'draft') { //草稿
                        buttonHtml += '<span class="' + className + '-item-delete J_Del" data-id="' + ele.id + '" data-type="' + type + '">删除</span>' +
                                      '<a target="_blank" href="/question/' + questionId + '#J_EditorPos" class="' + className + '-item-edit">编辑</a>' +
                                      '<span class="' + className + '-item-date">' + ele.createDate + '</span>';
                    }
                    if (type == 'question') { //问题
                        var answerNum = 0, attentionNum = 0;
                        if (typeof (statistics) != 'undefined') {
                            //回答数
                            answerNum = parseInt(statistics.answers);
                            //关注数
                            attentionNum = parseInt(statistics.attention);
                        }

                        buttonHtml += '<span class="' + className + '-item-edit icon-toask" data-autosave="0" data-id="' + ele.id + '" data-isAnony="' + ele.is_anony + '">编辑</span>' +
                                      '<span class="' + className + '-item-date">发布时间 ' + ele.createDate + '</span>' +
                                      '<span class="' + className + '-item-num">' + (answerNum ? '回答数' + answerNum : '暂无回答') + '</span>' +
                                      '<span class="' + className + '-item-num">' + (attentionNum ? '关注人数' + attentionNum : '暂无关注') + '</span>';
                    }
                    if (type == 'answer') { //回答
                        var upNum = 0,commentNum = 0;
                        if (typeof (statistics) != 'undefined') {
                            //点赞数
                            upNum = parseInt(statistics.up);
                            //评论数
                            commentNum = parseInt(statistics.comments);
                        }
                        
                        buttonHtml += '<span class="' + className + '-item-delete J_Del" data-id="' + ele.id + '" data-type="' + type + '">删除</span>' +
                                      '<a target="_blank" href="/question/' + questionId + '?answer_id=' + ele.id + '&act=edit#goEdit" class="' + className + '-item-edit">编辑</a>' +
                                      '<span class="' + className + '-item-num J_CommentShow" data-id="' + ele.id + '">' + (commentNum ? commentNum + '条' : '暂无') + '评论</span>' +
                                      '<span class="' + className + '-item-date">创建时间 ' + ele.createDate + '</span>' +
                                      (ele.updateDate ? '<span class="' + className + '-item-date">更新时间 ' + ele.updateDate + '</span>' : '');
                    }
                    
                    //内容HTML
                    var contentHtml = content.showContent ? '<div class="ask-info desc" data-hide-id="' + ele.id + '">' + content.showContent + '...<span class="ask-info-all" data-dom="show_askinfo_all" data-id="' + ele.id + '">[查看完整回答]</span></div><div class="ask-info desc hide" data-show-id="' + ele.id + '">' + content.content + '</div>' : '<div class="ask-info desc">' + content.content + '</div>';
                    //点赞模块
                    var upHtml = isAnswer ? '<div class="ask-vote-box ask-vote-box-act border border-all"><span class="ask-vote-num">' + (upNum || 0) + '</span><span class="ask-vote-icon"></span></div>' : '';
                    //评论列表针对回答
                    var commentList = (type == 'answer') ?
                                        '<div id="J_CommentPart_' + ele.id + '" class="comment-wrap border border-all hide J_CommentPart" data-id="' + ele.id + '">' +
                                            '<span class="comment-arrow"></span><div class="comment-list" id="J_CommentList_' + ele.id + '" ></div><div class="comment-page hide J_PageBar"></div>' +
                                            '<span class="comment-list-up border border-top J_CommentClose" data-id="' + ele.id + '">' +
                                                '<span class="arrow-up-xl-gray"></span>点击收起' +
                                            '</span>' +
                                        '</div>': '';
                                        
                    itemHtml +='<div name="item" class="' + className + '-item border border-bottom">' +
                                    //点赞针对回答
                                    upHtml +
                                    '<div class="' + className + '-item-right ' + ((type == 'question') ? 'un-margin-left' : '') + '">' +
                                        '<span class="' + className + '-title title">' + ele.title + '</span>' +
                                            //查看全部
                                            contentHtml +
                                        '<div class="' + className + '-item-bottom">' +
                                            //button
                                            buttonHtml +
                                        '</div>' +
                                        commentList +
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
