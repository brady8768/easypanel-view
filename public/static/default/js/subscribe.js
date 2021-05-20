$(function () {
    common.ajax('subscribe/getData', {}, function (res) {
        if (res.data.length === 0) {
            $('div.card-body').html('<div class="alert alert-danger" role="alert">当前无有效订阅</div>');
        } else {
            let _html = '<div class="row">' +
                '<ul id="myTabs" class="nav nav-tabs" role="tablist">\n' +
                '                  <li class="active"><a href="#copy" id="home-tab" role="tab" data-toggle="tab">复制订阅</a></li>\n' +
                '                  <li><a href="#import" role="tab" id="profile-tab" data-toggle="tab">导入订阅</a></li>\n' +
                '                  <li><a href="#reset" role="tab" id="reset-tab" data-toggle="tab">重置订阅</a></li>\n' +
                '                  <li><a href="#back" role="tab" id="reset-tab" data-toggle="tab">退还订阅</a></li>\n' +
                '                </ul>\n' +
                '                <div id="myTabContent" class="tab-content">\n' +
                '                  <div class="tab-pane fade active in" id="copy">\n' +
                '                    <p>' +
                '<div class="col-lg-6">\n' +
                '<div>当前剩余流量 '+res.data.surplus+'GB 将于'+showDay(res.data)+'</div>\n' +
                   '<div class="input-group">\n' +
            '                        <input type="text" class="form-control" readonly id="sub_input" value="'+res.data.sub_url+'" placeholder="请输入关键词...">\n' +
            '                        <span class="input-group-btn">\n' +
            '                          <button class="btn btn-dark" type="button" id="copy_url">复制订阅</button>\n' +
            '                        </span>\n' +
            '                      </div>\n' +
            '                    </div>' +
                '</p>\n' +
                '                  </div>\n' +
                '                  <div class="tab-pane fade" id="import">\n' +
                '                    <p><button class="btn btn-purple btn-w-md" type="button" id="import_btn">Clash导入</button></p>\n' +
                '                  </div>\n' +
                '                  <div class="tab-pane fade" id="reset">\n' +
                '                    <p><div><h4>重置订阅后，原订阅地址即时失效，新的订阅地址在最多不超过60秒内生效！</h4></div><div style="margin-top: 2rem;"><button class="btn btn-danger btn-w-md" type="button" id="reset_btn">重置订阅</button></div></p>\n' +
                '                  </div>\n' +
                '                  <div class="tab-pane fade" id="back">\n' +
                '                    <p><h4><strong>退还规则</strong></h4><div>1、订阅退还的费用直接进入账户余额，可用于本站任意消费，但不可提现！</div>' +
                '<div>2、月付套餐退还规则，已使用不足10天按10天计算，若使用超过20天则无法退还！</div>' +
                '<div>3、季付、半年、一年套餐退还规则，已使用不足1个月按一个月计算，若剩余时间不足30天则无法退还！</div>' +
                '<div>4、永久套餐退还规则，已使用不足按总流量1/10的按1/10计算，若剩余流量不足1/10则无法退还！</div>' +
                '<div style="margin-top: 2rem;"><button class="btn btn-brown btn-w-md" type="button" id="back_btn">退还订阅</button></div></p>\n' +
                '                  </div>\n' +
                '                </div>' +
                '</div>';

            $('div.card-body').html(_html);

            let _node = '<div class="row">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header"><h4><strong>可用节点</strong></h4></div>\n' +
                '                <div class="card-body">\n' +
                '<div class="table-responsive"><table class="table table-hover"><thead><tr><th>操作</th><th>名称</th><th>倍率</th></tr></thead>';
            _node += '<tbody>';
            $.each(res.data.nodes, function (i, v) {
                _node += '<tr><td><button class="qrcode_btn" type="button" qr-text="'+v.vmess+'">扫码</button></td>';
                _node += '<td>'+v.title+'</td>';
                _node += '<td>'+v.rate+'x</td>';
                _node += '</tr>';
            })
            _node += '</tbody></table></div>';
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>';

            $('div.container-fluid').append(_node);
            copyUrl();
        }
    })

    function showDay(obj) {
        if(obj.resetDay != ''){
            return obj.resetDay+'重置流量';
        }else{
            return obj.endDay+'服务到期';
        }
    }


    function getBase64(obj) {
        let val = {
            host : obj.host,
            port : obj.port
        };
        return $.base64.encode(val.toString());
    }

    function copyUrl (){
        let clipboard = new Clipboard('#copy_url', {
            text: function() {
                return $('#sub_input').val();
            }
        });
        clipboard.on('success',
            function(e) {
                common.ok('订阅地址复制成功');
            });
        clipboard.on('error',
            function(e) {
                common.err('订阅地址复制失败');
            });
    }

    $(document).on('click','button.qrcode_btn', function () {
        let txt = $(this).attr('qr-text');
        $("#qrcode-box").empty().qrcode({
            render: "canvas",
            text: txt,
            width: 256,
            height: 256,
            background: "#ffffff",
            foreground: "#000000",
            src: "/static/img/log.png"
        });
        $('#gridSystemModal').modal('show');
    })

    $(document).on('click','#import_btn',function () {
        alert('未开发完成');
    });

    $(document).on('click','#reset_btn',function () {
        common.ajax('subscribe/reset', {}, function (res) {
            setTimeout(function() {
                lightyear.url('/subscribe.html');
                common.ok('恭喜您，订阅已重置成功，新的订阅地址将在1分钟内生效！');
            }, 1e3)
        });
    });

    $(document).on('click','#back_btn',function () {
        alert('未开发完成');
    });

});