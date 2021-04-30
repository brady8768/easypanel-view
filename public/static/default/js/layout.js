$(function () {
    $('#logout').on('click', function () {
        $.alert({
            title: '安全退出',
            content: '您确认要安全退出系统吗？',
            buttons: {
                confirm: {
                    text: '确认',
                    btnClass: 'btn-primary',
                    action: function(){
                        common.ajax('login/logout', {}, function (data) {
                            setTimeout(function() {
                                lightyear.url('/login.html');
                                common.ok('已安全退出，即将跳转至登录页');
                            }, 1e3)
                        })
                    }
                },
                cancel: {
                    text: '取消'
                }
            }
        });
    });
});


function getRandInt(low, high) {
    return Math.floor(Math.random() * (1 + high - low) + low);
}