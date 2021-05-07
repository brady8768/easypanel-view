var common = {
    ajax : function (url, field, callback, failed) {
        lightyear.loading('show');
        $.post(url, field, function (res) {
            if(res.code === 0){
                if(typeof callback === "function"){
                    callback(res);
                }else{
                    setTimeout(function() {
                        lightyear.url('/');
                        lightyear.notify('登陆成功', 'success', 1000, 'mdi mdi-emoticon-happy', 'top', 'center');
                    }, 1e3)
                }
            }else{
                if(typeof failed === "function"){
                    failed(res);
                }else {
                    lightyear.notify(res.msg, 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
                    if (res.code === -1) {
                        setTimeout(function () {
                            lightyear.url('/login.html');
                        }, 1e3)
                    }
                }
            }
        },'JSON').error(function (e) {
            let msg = '出现未知错误，请联系管理员解决！';
            if(e.readyState === 4 && e.status !== 500){
                msg = e.responseText;
            }
            lightyear.notify(msg, 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
        }).complete(function () {
            lightyear.loading('hide');
        });
    },

    ok : function (msg) {
        lightyear.notify(msg, 'success', 1000, 'mdi mdi-emoticon-happy', 'top', 'center');
    },

    err : function (msg) {
        lightyear.notify(msg, 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
    },

    getParams : function () {
        let args = new Object();
        let query = location.search.substring(1);
        let pairs = query.split("&");
        for(let i=0;i<pairs.length;i++) {
            let pos = pairs[i].indexOf('=');
            if(pos == -1) continue;
            let argname = pairs[i].substring(0, pos);
            let value = pairs[i].substring(pos + 1);
            args[argname] = unescape(value);
        }
        return args;
    },

    cutString : function (str) {
        str = str.replace(/\r\n/g,"<br><br>")
        str = str.replace(/\n/g,"<br><br>");
        return str;
    }
}