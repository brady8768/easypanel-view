$(function () {

    $('#submit').click(function () {
        let email = $('#email').val();

        if(email.length == 0){
            return common.err('绑定的邮箱不能为空');
        }

        let pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        if(!pattern.test(email)){
            return common.err('邮箱的格式错误');
        }

        common.ajax('lock/email', {email : email}, function () {
            setTimeout(function() {
                lightyear.url('/index.html');
                common.ok('恭喜您，邮箱绑定成功!');
            }, 2000)
        }, function (res) {
            common.err(res.msg);
        });
    });

});