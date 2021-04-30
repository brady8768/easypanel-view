$(function () {
     common.ajax('service/getData', {}, function (res) {
         if(res.data.length === 0){
             $('div.card-body').html('<div class="alert alert-danger" role="alert">当前无可购买套餐</div>');
         }else{
             let carType = ['bg-success','bg-info','bg-purple','bg-warning','bg-danger'];
             let _html = '<div class="row">';

             $.each(res.data, function (i, v) {
                 _html += '<div class="col-sm-6 col-lg-3"><div class="card"><div class="card-header ' + carType[v.level - 1] + '">' ;
                 _html += '<h4>'+v.title+'</h4>';
                 _html += '<ul class="card-actions"><li><button type="button"><i class="mdi mdi-thumb-up-outline"></i></button></li></ul></div><div class="card-body"><p>';
                 _html += '<div class="row"><div>'+v.level+'级套餐 </div><div>'+v.flow+' GB流量</div><div><span>￥ </span><span style="font-size: 40px;color: red;"><strong>' + v.price + '</strong></span>  起</div></div>';
                 _html += '</p>';
                 _html += '<div style="text-align: center;margin-top: 30px;"><button class="btn btn-label btn-success" data-service-value="'+v.id+'"><label><i class="mdi mdi-magnify"></i></label> 查看详情</button>';
                 _html += '</div></div></div></div>';
             })
             _html += '</div>';

             $('div.card-body').html(_html);
         }
     })

    $('div.container-fluid').on('click','button.btn-success',  function () {
        let service = $(this).attr('data-service-value');
        window.location.href = '/plan.html?id=' + service;
    });
});