$(function () {

    $('#submit').click(function () {
        let old_pwd = $('#old_password').val();
        let new_pwd = $('#new_password').val();
        let cfm_pwd = $('#cfm_password').val();

        if(old_pwd.length == 0){
            return common.err('原始密码不能为空');
        }

        if(new_pwd.length == 0){
            return common.err('新的密码不能为空');
        }

        if(new_pwd.length < 6 || new_pwd.length > 30){
            return common.err('密码长度只能在6~30位之间');
        }

        if(new_pwd != cfm_pwd){
            return common.err('俩次密码输入不一致');
        }

        if(new_pwd == old_pwd){
            return common.err('新的密码不能与原始密码相同');
        }

        common.ajax('password/change', {old_pwd : old_pwd, new_pwd : new_pwd}, function () {
            setTimeout(function() {
                lightyear.url('/login.html');
                common.ok('恭喜您，密码修改成功，即将跳转至登陆页面');
            }, 2000)
        }, function (res) {
            common.err(res.msg);
        });

    });

});