$(function() {
    $('#login').click(function () {
        let field = {};

        if($('#username').val() == ''){
            return lightyear.notify('账号不能为空', 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
        }else{
            field.account = $('#username').val();
        }

        if($('#password').val() == ''){
            return lightyear.notify('密码不能为空', 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
        }else{
            field.password = $('#password').val();
        }

        if(field.password != $('#re_password').val()){
            return lightyear.notify('俩次密码不一致', 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
        }

        lightyear.loading('show');
        $.post('register/reg', field, function (res) {
            if(res.code === 0){
                setTimeout(function() {
                    lightyear.url('/');
                    lightyear.notify('注册成功', 'success', 1000, 'mdi mdi-emoticon-happy', 'top', 'center');
                    lightyear.loading('hide');
                }, 1e3)
            }else{
                lightyear.notify('注册失败', 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
                lightyear.loading('hide');
            }
        });
    });
});