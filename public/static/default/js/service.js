$(function () {

    lightyear.loading('show');
    $.post('service/getData', {}, function (res) {
        if(res.code === 0){
            let carType = ['bg-success','bg-info','bg-purple','bg-warning','bg-danger'];
            let bgType = ['list-group-item-success','list-group-item-info','list-group-item-warning','list-group-item-danger'];
            let labelType = ['label-primary','label-success','label-info','label-warning','label-danger','label-dark','label-secondary','label-purple','label-pink','label-cyan','label-yellow','label-brown'];
            let _html = '';

            $.each(res.data, function (i, v) {
                _html += '<div class="col-sm-6 col-lg-3"><div class="card"><div class="card-header ' + carType[v.level - 1] + '">' ;
                _html += '<h4>'+v.title+'</h4>';
                _html += '<ul class="card-actions"><li><button type="button"><i class="mdi mdi-thumb-up-outline"></i></button></li></ul></div><div class="card-body"><p><div>';
                _html += '<span class="label ' + labelType[getRandInt(0, 11)] + '">' + v.level + '级会员</span>';
                let flow = v.reset ? v.flow + 'GB/月' : v.flow + 'GB/永久';
                _html += '<span class="label ' + labelType[getRandInt(0, 11)] + '">' + flow + '</span>';
                _html += '<span class="label ' + labelType[getRandInt(0, 11)] + '">有效期' + v.expire + '天</span>';
                _html += '</div><ul class="list-group">';
                if(v.intro){
                    let intro = v.intro.split(/\n/);
                    $.each(intro, function (k, t) {
                        _html += '<li class="list-group-item ' + bgType[k % 4] + '">'+ t +'</li>';
                    })
                }
                _html += '</ul></p>';
                _html += '<div><span>原价 <s>' + v.scribing + '</s></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>现价 <strong>' + v.price + '</strong></span></div>';
                _html += '<div style="text-align: center;margin-top: 30px;"><button class="btn btn-label btn-pink" data-service-value="'+v.id+'"><label><i class="mdi mdi-star mdi-spin"></i></label> 立即购买</button>';
                _html += '</div></div></div></div>';
            })

            $('div.row').html(_html);
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

    $('div.row').on('click','button.btn-pink',  function () {
        let service = $(this).attr('data-service-value');
        if (service) {
            $.confirm({
                title: '确认操作',
                content: '你确认要购买该服务吗？确认后将直接从你的账号余额中扣除相关费用！',
                type: 'green',
                buttons: {
                    omg: {
                        text: '确认',
                        btnClass: 'btn-green',
                        action: function () {
                            lightyear.loading('show');
                            $.post('service/buy', {id: service}, function (res) {
                                if (res.code === 0) {
                                    lightyear.notify('购买成功', 'success', 1000, 'mdi mdi-emoticon-happy', 'top', 'center');
                                } else {
                                    if(res.code === -1){
                                        return setTimeout(function() {
                                            lightyear.url('/login.html');
                                            lightyear.notify('登陆状态已失效，即将跳转至登录页面！', 'danger', 3000, 'mdi mdi-emoticon-happy', 'top', 'center');
                                        }, 1e3)
                                    }
                                    $.alert({
                                        title: '操作失败',
                                        type: 'red',
                                        content: '请核对账户余额是否充足 <br> 若余额不足可 <strong><a herf="/recharge.html">点此进行充值</a></strong> 后再进行购买！',
                                        buttons: {
                                            cancel: {
                                                text: '关闭'
                                            }
                                        }
                                    });
                                }
                                lightyear.loading('hide');
                            });
                        }
                    },
                    close: {
                        text: '关闭',
                    }
                }
            });
        }
    });
});