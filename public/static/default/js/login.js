$(function() {
    $('#login').click(function () {
        let field = {};

        if($('#username').val() == ''){
            lightyear.loading('hide');
            return lightyear.notify('账号不能为空', 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
        }else{
            field.account = $('#username').val();
        }

        if($('#password').val() == ''){
            lightyear.loading('hide');
            return lightyear.notify('密码不能为空', 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
        }else{
            field.password = $('#password').val();
        }

        lightyear.loading('show');
        $.post('login/check', field, function (res) {
            if(res.code === 0){
                setTimeout(function() {
                    lightyear.url('/');
                    lightyear.notify('登陆成功', 'success', 1000, 'mdi mdi-emoticon-happy', 'top', 'center');
                    lightyear.loading('hide');
                }, 1e3)
            }else{
                lightyear.notify('登陆失败', 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
                lightyear.loading('hide');
            }
        });
    });
});