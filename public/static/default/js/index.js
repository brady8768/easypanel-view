$(function () {
    lightyear.loading('show');
    $.post('index/getData', {}, function (res) {
        if(res.code === 0){
            $('#balance').text(res.data.balance + ' 元');
            $('#expire').text(res.data.expire);
            $('#surplus').text(res.data.surplus + ' GB');
            $('#subordinates').text(res.data.subordinates + ' 位');
        }else{
            if(res.code === -1){
                return setTimeout(function() {
                    lightyear.url('/login.html');
                    lightyear.notify('登陆状态已失效，即将跳转至登录页面！', 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
                }, 1e3)
            }
            lightyear.notify('获取数据失败', 'danger', 5000, 'mdi mdi-emoticon-happy', 'top', 'center');
        }
        lightyear.loading('hide');
    });
});