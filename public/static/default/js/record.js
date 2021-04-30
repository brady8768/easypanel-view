$(function () {
    let param = common.getParams();
    let page = 1;
    if(param.hasOwnProperty('p') && param.p){
        page = Number(isPositiveNum(param.p));
    }
    common.ajax('record/getData', {page: page}, function (res) {
        let _html = '';
        if(res.count > 0){
            _html += '<div class="table-responsive"><table class="table table-hover"><thead><tr><th>操作</th><th>套餐名称</th><th>使用期限</th><th>金额</th><th>状态</th></tr></thead>';
            _html += '<tbody>';
            $.each(res.data, function (i, v) {
                _html += '<tr>';
                _html += '<td>'+getButton(v)+'</td>';
                _html += '<td>'+v.title+'</td>';
                _html += '<td>'+v.cycle+'</td>';
                _html += '<td>¥'+v.money+'</td>';
                _html += '<td>'+getStatus(v)+'</td>';
                _html += '</tr>';
            })
            _html += '</tbody></table></div>';
            if(res.count > 10) {
                _html += '<nav><ul class="pagination pager">';
                if (page == 1) {
                    _html += '<li class="disabled"><a href="javascript:;">上一页</a></li>';
                } else {
                    _html += '<li><a href="/record.html?p=' + (page - 1) + '">上一页</a></li>';
                }
                _html += '<li class="active"><a href="javascript:;">' + page + '</a></li>'
                if (page < getPage(res.count)) {
                    _html += '<li><a href="/record.html?p=' + (page + 1) + '">下一页</a></li>';
                } else {
                    _html += '<li class="disabled"><a href="javascript:;">下一页</a></li>';
                }
            }
            $('div.card-body').html(_html);
        }else{
            $('div.card-body').html('<div>您没有购买记录</div>');
        }
    })

    $('div.card-body').on('click','button.btn-dark',  function () {
        let trade_no = $(this).attr('order-value');
        common.ajax('order/settlement', {trade_no: trade_no}, function (res) {
            setTimeout(function() {
                lightyear.url('/record.html');
                common.ok('恭喜，购买成功！请到购买记录中查看详情！');
            }, 1e3)
        }, function (res) {
            if(res.code == 1){
                $('#gridSystemModal #trade_no').val(trade_no);
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
            common.ajax('order/settlement', {trade_no: $('#gridSystemModal #trade_no').val(), agree: true}, function () {
                setTimeout(function() {
                    lightyear.url('/record.html');
                    common.ok('恭喜，购买成功！请到购买记录中查看详情！');
                }, 1e3)
            })
        }
    })

    function isPositiveNum(s){
        let re = /^[1-9][0-9]*$/ ;
        if(re.test(s)){
            return s;
        }else{
            return 1;
        }
    }

    function getPage(count) {
        return Math.floor((count + 10 - 1) / 10)
    }

    function getButton(v) {
        if(v.status == 1 && v.pay != 1){
            return '<button class="btn btn-xs btn-dark" order-value="'+v.trade_no+'">结算</button>';
        }
        return '';
    }

    function getStatus(v) {
        if(v.status == 1){
            if(v.pay == 1){
                return '已付款';
            }else{
                return '待付款';
            }
        }else{
           return '已取消';
        }
    }

});