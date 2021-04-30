$(function () {
    let param = common.getParams();

    if (param.hasOwnProperty('id')) {
        common.ajax('plan/getData', {id: param.id}, function (res) {
            if (res.data.length === 0) {
                $('div.card-body').html('<div class="alert alert-danger" role="alert">无效套餐</div>');
            } else {
                let _html = '<div class="row">';

                _html += '<div class="col-sm-12 col-lg-12"><div class="card"><div class="card-header">';
                _html += '<h4><strong>' + res.data.title + '</strong></h4>';
                _html += '</div><div class="card-body"><p>';
                _html += '<div class="row">';

                _html += '<div><span>套餐等级：'+res.data.level+'级 </span></div>';
                _html += '<div><span> 套餐流量：'+res.data.flow+' GB </span></div><div class="example-box">';
                if (res.data.hasOwnProperty('month')) _html += '<button class="btn btn-w-md btn-round btn-secondary" carry="month">月付 ' + res.data.month + ' 元</button>';
                if (res.data.hasOwnProperty('quarter')) _html += '<button class="btn btn-w-md btn-round btn-secondary" carry="quarter">季付 ' + res.data.quarter + ' 元</button>';
                if (res.data.hasOwnProperty('half')) _html += '<button class="btn btn-w-md btn-round btn-secondary" carry="half">半年付 ' + res.data.half + ' 元</button>';
                if (res.data.hasOwnProperty('year')) _html += '<button class="btn btn-w-md btn-round btn-secondary" carry="year">一年付 ' + res.data.year + ' 元</button>';
                if (res.data.hasOwnProperty('forever')) _html += '<button class="btn btn-w-md btn-round btn-secondary" carry="forever">永久付 ' + res.data.forever + ' 元</button>';
                _html += '</div><div><span> 套餐介绍：'+TransferString(res.data.intro)+' </span></div>';

                _html += '</div></p>';
                _html += '<div style="text-align: center;margin-top: 30px;"><button class="btn btn-label btn-dark" data-service-value="' + res.data.id + '"><label><i class="mdi mdi-rotate-right"></i></label> 立即下单</button>';
                _html += '</div></div></div></div></div>';

                $('div.card-body').html(_html);
            }
        })

        $('div.card-body').on('click', 'button.btn-round', function () {
            $('button.btn-round').removeClass('btn-success').addClass('btn-secondary');
            $(this).removeClass('btn-secondary').addClass('btn-success');
        });

        $('div.card-body').on('click', 'button.btn-dark', function () {
            let service = $(this).attr('data-service-value');
            let choose = $('button.btn-success');
            if (choose.length === 0) return common.err('请选择购买周期');
            common.ajax('plan/advance', {id: param.id, cycle: choose.attr('carry')}, function (res) {
                window.location.href = '/order.html?trade_no=' + res.data.trade_no;
            })
        });
    }

    function TransferString(content)
    {
        var string = content;
        try{
            string=string.replace(/\r\n/g,"<br>")
            string=string.replace(/\n/g,"<br>");
        }catch(e) {
            alert(e.message);
        }
        return string;
    }
});