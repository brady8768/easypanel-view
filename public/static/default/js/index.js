$(function () {
    common.ajax('index/getData', {}, function (res) {
        $('#balance').text(res.data.balance + ' 元');
        $('#expire').text(res.data.expire);
        $('#surplus').text(res.data.surplus + ' GB');
        $('#subordinates').text(res.data.subordinates + ' 位');
        traffic(res.data.traffic);
        notice(res.data.notice);
    })

    function notice(notice) {
        if(notice.length === 0){
            $('div.notice-box').html('<p>暂无公告</p>');
        }else{
            let _html = '<div class="list-group">';
            $.each(notice, function (i, v) {
                _html += '<a href="/notice.html?id='+v.id+'" class="list-group-item">'+(i+1)+'、' + v.title + '<small> '+ v.send_time +' </small></a>';
            });
            _html += '</div>';
            $('div.notice-box').html(_html);
        }
    }

    function traffic(traffic) {
        let $dashChartBarsCnt  = jQuery( '.js-chartjs-bars' )[0].getContext( '2d' );

        let $dashChartBarsData = {
            labels: traffic.labels,
            datasets: [
                {
                    label: '流量(单位:GB)',
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0)',
                    backgroundColor: 'rgba(51,202,185,0.5)',
                    hoverBackgroundColor: "rgba(51,202,185,0.7)",
                    hoverBorderColor: "rgba(0,0,0,0)",
                    data: traffic.data
                }
            ]
        };

        new Chart($dashChartBarsCnt, {
            type: 'bar',
            data: $dashChartBarsData
        });
    }

});
