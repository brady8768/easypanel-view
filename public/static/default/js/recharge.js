$(function () {
    let param = common.getParams();

    if(param.hasOwnProperty('wait')){
        if(param.wait == 'end'){
            $.confirm({
                title: '取消付款',
                content: '您已经取消了该笔付款，如果有任何疑问请联系客服。',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    close: {
                        text: '关闭',
                        btnClass: 'btn-red',
                        action: function(){
                            window.location.href = checkUrl();
                        }
                    }
                }
            });
        }else{
            $.confirm({
                title: '确认付款',
                content: '请确认您是否完成了该笔付款操作？',
                type: 'orange',
                typeAnimated: false,
                buttons: {
                    omg: {
                        text: '确认已付款',
                        btnClass: 'btn-green',
                        action: function(){
                            alert('执行检查');
                        }
                    },
                    close: {
                        text: '支付遇到问题',
                        btnClass: 'btn-red',
                        action: function(){
                            setTimeout(function() {
                                lightyear.url(checkUrl());
                                common.err('很抱歉，请向客服人员反馈该问题详细情况!');
                            }, 2000)
                        }
                    }
                }
            });
        }
    }

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
                    src: "../img/logo.jpg"
                });
                $('#gridSystemModal').modal('show');
            }else{
                window.location.href = res.data.pay_url;
            }
        }, function () {
            common.err('抱歉，充值失败。请您稍后再试！');
        })
    });

    function checkUrl(){
        let url = window.location.href;
        url.replace(/[?&]wait=(end|pay)/, '');
        return url;
    }

});