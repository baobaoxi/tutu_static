;
var Login = {};
Login = {
    //配置变量
    cfg: {
        'host': $CONFIG['host'],
        'baseUrl': '/xhr/'
    },
    init: function () {
        //表单验证
        this.captcha(), this.validForm();
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
    //表单验证
    validForm: function () {
        $.ajaxSetup({async: false});
        //手机号码格式验证
        $.validator.addMethod('mobile', function (value, element) {
            var mobile = /^1[37458]\d{9}$/;
            return mobile.test(value);
        }, '手机号码格式错误');

        $('#loginForm').validate({
            errorClass: 'wrong', //指定错误提示的css类名,可以自定义错误提示的样式
            errorElement: 'div', //使用什么标签标记错误
            focusInvalid: false, //提交表单后,未通过验证的表单(第一个或提交之前获得焦点的未通过验证的表单)会获得焦点
            onkeyup: false, //是否在敲击键盘时验证
            onfocusout: function (element) {
                $(element).valid();
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent()).css({'color': '#C00', 'padding-top': '5px'});
            },
            event: 'blur',
            rules: {
                mobile: {
                    required: true,
                    mobile: true
                },
                password: {
                    required: true
                }
            },
            messages: {
                mobile: {
                    required: '请输入手机号码',
                    mobile: '手机号码格式错误'
                },
                password: {
                    required: '请输入密码'
                }
            },
            submitHandler: function (form) {
                var postArr = {
                    'name': $('#mobile').val(),
                    'password': $('#password').val(),
                    'isKeepLogin': $('#keepLogin').attr('checked') ? 1 : 0,
                    'geetestChallenge': $('input[name="geetest_challenge"]').val(),
                    'geetestValidate': $('input[name="geetest_validate"]').val(),
                    'geetestSeccode': $('input[name="geetest_seccode"]').val(),
                    'backUrl': $('#backUrl').val()
                };

                //提交数据
                BTF.post('User_Login/Post/', postArr, function (data) {
                    
                    if (data.rtn == 1) {
                        window.location.href = data.backUrl;
                    } else {
                        layer.msg('登录失败,请重试!', {icon: 2, 'time': 1500, 'shade': 0.3});
                    }
                }, function (error_no, error_msg) {
                    layer.msg(error_msg, {icon: 2, 'time': 1500, 'shade': 0.3});
                });
            }
        });
    }
};

Login.init();