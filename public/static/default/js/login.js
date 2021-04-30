$(function() {
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

        common.ajax('login/check', field);
    });
});