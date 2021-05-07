$(function () {
    common.ajax('download/getData', {}, function (res) {

        for(let i=1;i<=5;i++){
            let _html = '';
            $.each(res.data, function (k, v) {
                if(v.system == i){
                    _html += '<div class="row"><div class="col-sm-6 col-lg-3"><div class="card"><div class="card-header bg-success">';
                    _html += '<h4>' +v.title+ ' '+ v.ver +'</h4>';
                    _html += '</div><div class="card-body"><p>';
                    _html += '<div>' +common.cutString(v.intro)+ '</div>';
                    _html += '<div style="text-align: center;margin-top: 3rem;"><button download-link="'+v.link+'" class="btn btn-label btn btn-warning"><label> <i class="mdi mdi-arrow-down-box"></i></label>';
                    _html += ' 立即下载 </button></div></p></div></div></div></div>';
                }
            })
            if(_html == ''){
                _html = '<div class="row">暂无可下载软件</div>';
            }
            switch (i) {
                case 1:
                    $('#windows-basic').html('<p>'+_html+'</p>');
                    break;
                case 2:
                    $('#mac-basic').html('<p>'+_html+'</p>');
                    break;
                case 3:
                    $('#linux-basic').html('<p>'+_html+'</p>');
                    break;
                case 4:
                    $('#android-basic').html('<p>'+_html+'</p>');
                    break;
                case 5:
                    $('#ios-basic').html('<p>'+_html+'</p>');
                    break;
            }
        }
    })

    $('div.tab-content').on('click','button.btn-warning', function () {
        let url = $(this).attr('download-link');
        window.open(url);
    })
});