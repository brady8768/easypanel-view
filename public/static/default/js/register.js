$(function() {
    let param = common.getParams();

    if (param.hasOwnProperty('invite')){
        $('#invite_code').val(param.invite);
    }

    $('#login').click(function () {
        let field = {};

        if($('#username').val() == ''){
            return common.err('账号不能为空');
        }else{
            field.account = $('#username').val();
        }

        if($('#password').val() == ''){
            return common.err('密码不能为空');
        }else{
            field.password = $('#password').val();
        }

        if(field.password != $('#re_password').val()){
            return common.err('俩次密码不一致');
        }

        field.invite_code = $('#invite_code').val();

        common.ajax('register/reg', field, function () {
            setTimeout(function() {
                lightyear.url('/');
                common.ok('注册成功');
            }, 1e3)
        })
    });
});