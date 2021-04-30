$(function () {
    let param = common.getParams();

    if (param.hasOwnProperty('trade_no')){
        common.ajax('order/getData', {trade_no: param.trade_no}, function (res) {
            let _html = '<div class="row">';

            _html += '<div class="col-sm-12 col-lg-12"><div class="card"><div class="card-header">' ;
            _html += '<h4>'+res.data.title+'</h4>';
            _html += '</div><div class="card-body"><p>';
            _html += '<div class="row"><div><span>套餐等级：'+res.data.level+'</span></div>';
            _html += '<div><span>套餐流量：'+res.data.flow+' GB </span></div>';
            _html += '<div><span>购买周期：'+res.data.cycle+' </span></div>';
            _html += '<div>应付金额：'+res.data.money+' 元</div>';
            _html += '<div>当前余额：'+res.data.balance+' 元</div>';
            _html += '</div></p>';
            if(Number(res.data.money) > res.data.balance){
                _html += '<div style="text-align: center">当前账户余额不足，请先 <a href="/recharge.html">去充值</a> 后再进行结算</div>';
            }else{
                _html += '<div style="text-align: center;margin-top: 30px;"><button class="btn btn-label btn-dark"><label><i class="mdi mdi-currency-jpy"></i></label> 立即结算</button></div>';
            }
            _html += '</div></div></div></div>';

            $('div.card-body').html(_html);
        })

        $('div.card-body').on('click','button.btn-dark',  function () {
            common.ajax('order/settlement', {trade_no: param.trade_no}, function (res) {
                setTimeout(function() {
                    lightyear.url('/record.html');
                    common.ok('恭喜，购买成功！请到购买记录中查看详情！');
                }, 1e3)
            }, function (res) {
                if(res.code == 1){
                    $('#gridSystemModal #agree').prop('checked', false);
                    $('#gridSystemModal').modal('show');
                }else{
                    setTimeout(function() {
                        lightyear.url('/recharge.html');
                        common.err(res.msg);
                    }, 1e3)
                }
            })
        });

        $('#agree').change(function () {
            if($(this).is(':checked')){
                $('#continue_btn').removeClass('disabled');
            }else{
                $('#continue_btn').addClass('disabled');
            }
        })

        $('#continue_btn').click(function () {
            if(!$(this).hasClass('disabled')){
                $('#gridSystemModal').modal('hide');
                common.ajax('order/settlement', {trade_no: param.trade_no, agree: true}, function () {
                    setTimeout(function() {
                        lightyear.url('/record.html');
                        common.ok('恭喜，购买成功！请到购买记录中查看详情！');
                    }, 1e3)
                })
            }
        })
    }else{
        notFindOrder();
    }

    function notFindOrder() {
            let carType = ['bg-success','bg-info','bg-purple','bg-warning','bg-danger'];
            let _html = '';
            _html += '<div class="col-sm-12 col-lg-12"><div class="card"><div class="card-header bg-danger">' ;
            _html += '<h4>错误</h4>';
            _html += '<ul class="card-actions"><li><button type="button"><i class="mdi mdi-thumb-up-outline"></i></button></li></ul></div><div class="card-body"><p>';
            _html += '<div>';
            _html += '未发现有效的订单';
            _html += '</div></p>';
            _html += '</div></div></div>';
            $('#content-body').html(_html);
    }
});