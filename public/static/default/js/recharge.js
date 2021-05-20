$(function () {
    let param = common.getParams();

    $('#quick').on('click', 'button', function () {
        $('#quick button').removeClass('btn-success').addClass('btn-secondary');
        $(this).removeClass('btn-secondary').addClass('btn-success');
        $('#money').val('');
    });

    $('#money').on('focus', function () {
        $('#quick button').removeClass('btn-success').addClass('btn-secondary');
    });

    $('#pay').on('click', 'button', function () {
        $('#pay button').removeClass('btn-success').addClass('btn-secondary');
        $(this).removeClass('btn-secondary').addClass('btn-success');
    });

    $('#submit').click(function () {
        let quick = $('#quick button.btn-success');
        let money = $('#money').val();
        if(quick.length === 0 && !money){
            return common.err('请选择或者输入充值金额');
        }
        let pay_type = $('#pay button.btn-success').attr('pay-type');
        let _data = {
            money : money ? money : quick.attr('quick-value'),
            pay_type : pay_type
        }

        common.ajax('recharge/confirm', _data, function (res) {
            if(res.data.device == 'pc' && pay_type == 'wx'){
                $("#qrcode-box").empty().qrcode({
                    render: "canvas",
                    text: res.data.pay_url,
                    width: 256,
                    height: 256,
                    background: "#ffffff",
                    foreground: "#000000",
                    src: "../img/log.png"
                });
                $('#gridSystemModal').modal('show');
            }else{
                window.location.href = res.data.pay_url;
            }
            /*setTimeout(function() {
                if(param.hasOwnProperty('callback')){
                    lightyear.url(param.callback);
                }else{
                    lightyear.url('/index.html');
                }
                common.ok('恭喜您，充值成功。感谢您的大力支持！');
            }, 2000)*/
        }, function () {
            common.err('抱歉，充值失败。请您稍后再试！');
        })
    });

});