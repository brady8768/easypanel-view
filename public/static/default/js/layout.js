$('#logout').on('click', function () {
    $.alert({
        title: '安全退出',
        content: '您确认要安全退出系统吗？',
        buttons: {
            confirm: {
                text: '确认',
                btnClass: 'btn-primary',
                action: function(){
                    lightyear.loading('show');
                    $.post('index/logout', {}, function (res) {
                        if(res.code === 0){
                            setTimeout(function() {
                                lightyear.url('/login.html');
                                lightyear.notify('已安全退出，即将跳转至登录页', 'success', 1000, 'mdi mdi-emoticon-happy', 'top', 'center');
                                lightyear.loading('hide');
                            }, 1e3)
                        }else{
                            lightyear.notify('安全退出失败', 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
                            lightyear.loading('hide');
                        }
                    });
                }
            },
            cancel: {
                text: '取消',
                action: function () {
                    //$.alert('你点击了取消!');
                }
            }
        }
    });
});

function getRandInt(low, high) {
    return Math.floor(Math.random() * (1 + high - low) + low);
}