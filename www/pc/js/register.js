;
var Register = {};
Register = {
    //配置变量
    cfg: {
        'host': $CONFIG['host'],
        'baseUrl': '/xhr/'
    },
    init: function () {
        //表单验证
        this.captcha(), this.bindEvent(), this.validForm();
    },
    //事件绑定
    bindEvent: function () {
        var obj = this;
        
        $('#sendCodeBtn').on('click', function () {
            obj.sendCode();
        });
    },
    //极验验证
    captcha: function () {
        function handler(captchaObj) {
            $('#submit').click(function (e) {
                //验证验证码
                var validate = captchaObj.getValidate();

                if (!validate) {
                    e.preventDefault();
                    //添加错误提示
                    $('.gt_ajax_tip').addClass('fail');
                }
            });
            captchaObj.appendTo('#captcha');
        }
        //初始化参数请求地址
        var url = this.cfg.host + '/geetest/t.php?t=' + (new Date()).getTime();
        $.post(url, {'type': 'pc'}, function (data) {
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                product: 'float',
                offline: !data.success
            }, handler);
        }, 'json');

    },
    //发送短信验证码
    sendCode: function () {
        var obj = this,
            curCount = 60, //当前剩余时间
            t = 60, //总时间
            InterValObj;

        //手机号
        var mobile = $('#mobile').val();

        if ($('#sendCodeBtn').hasClass('disabled')) {
            return false;
        }

        $('#sendCodeBtn').html(t + '秒重新获取').addClass('disabled'), window.clearInterval(InterValObj), InterValObj = window.setInterval(function () {
            setRemainTime();
        }, 1e3);

        function setRemainTime() {
            0 == curCount ? (window.clearInterval(InterValObj), $('#sendCodeBtn').removeClass('disabled').html('发送验证码'), curCount = 60) : ($('#sendCodeBtn').off('click'), curCount--, $('#sendCodeBtn').html(curCount + '秒重新获取'));
        }
        
        //提交数据
        var postArr = {
            'mobile': $('#mobile').val(),
            'geetestChallenge': $('input[name="geetest_challenge"]').val(),
            'geetestValidate': $('input[name="geetest_validate"]').val(),
            'geetestSeccode': $('input[name="geetest_seccode"]').val(),
            'backUrl': $('#backUrl').val()
        };
        //提交数据
//        BTF.post('User_Register/SendCode/', postArr, function (data) {
//
//            if (data.rtn == 1) {
//                
//            } else {
//                layer.msg('发送失败,请重试!', {icon: 2, 'time': 1500, 'shade': 0.3});
//            }
//        }, function (error_no, error_msg) {
//            layer.msg(error_msg, {icon: 2, 'time': 1500, 'shade': 0.3});
//        });
    },
    //表单验证
    validForm: function () {

        $.ajaxSetup({async: false});
        //手机号码格式验证
        $.validator.addMethod('mobile', function (value, element) {
            var mobile = /^1[37458]\d{9}$/;
            return mobile.test(value);
        }, '手机号码格式错误');

        //验证手机号码是否存在
        $.validator.addMethod('verifyMobile', function (value, element) {
            $.post(Register.cfg.baseUrl + 'Ajax_User/VerifyMobile/', {'mobile': value}, function (rst) {
                result = (typeof (rst) !== 'undefined' && rst.error_no == 0 && rst.data.rtn == 0) ? 1 : 0;
            }, 'jsonp');
            return this.optional(element) || result;
        }, '该手机号码已被使用');

        //手机验证码
        $.validator.addMethod('veriCode', function (value, element) {
            return true;
        }, "验证码输入错误");

        $('#registerForm').validate({
            errorClass: 'wrong', //指定错误提示的css类名,可以自定义错误提示的样式
            errorElement: 'div', //使用什么标签标记错误
            focusInvalid: false, //提交表单后,未通过验证的表单(第一个或提交之前获得焦点的未通过验证的表单)会获得焦点
            onkeyup: false, //是否在敲击键盘时验证
            onfocusout: function (element) {
                $(element).valid();
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent()).css({'color': '#C00', 'display': 'table-footer-group'});
            },
            event: 'blur',
            rules: {
                mobile: {
                    required: true,
                    mobile: true,
                    verifyMobile: true
                },
                veriCode: {
                    required: true,
                    minlength: 6,
                    maxlength: 6,
                    veriCode: true
                }, password: {
                    required: true,
                    minlength: 6,
                    maxlength: 16
                }
            },
            messages: {
                mobile: {
                    required: '请输入手机号码',
                    mobile: '手机号码格式错误',
                    verifyMobile: '该手机号码已被使用'
                },
                veriCode: {
                    required: '请输入手机验证码',
                    minlength: $.format('验证码不正确'),
                    maxlength: $.format('验证码不正确')
                },
                password: {
                    required: '请输入密码',
                    minlength: $.format(' 密码长度不少于 {0} 位 '),
                    maxlength: $.format(' 密码长度不超过 {0} 位 ')
                }
            },
            submitHandler: function () {
                var postArr = {
                    'value': $('#mobile').val(),
                    'password': $('#password').val(),
                    'code': $('#veriCode').val(),
                    'geetestChallenge': $('input[name="geetest_challenge"]').val(),
                    'geetestValidate': $('input[name="geetest_validate"]').val(),
                    'geetestSeccode': $('input[name="geetest_seccode"]').val(),
                    'backUrl': $('#backUrl').val()
                };

                //提交数据
                BTF.post('User_Register/Post', postArr, function (data) {

                    if (data.rtn == 1) {
                        window.location.href = data.backUrl;
                    } else {
                        layer.msg('注册失败,请重试!', {icon: 2, 'time': 1500, 'shade': 0.3});
                    }
                }, function (error_no, error_msg) {
                    layer.msg(error_msg, {icon: 2, 'time': 1500, 'shade': 0.3});
                });
            }
        });
    }
};

Register.init();