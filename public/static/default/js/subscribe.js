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
                '<div>当前剩余流量 450GB 将于2020年5月6日凌晨重置流量</div>\n' +
            '                      <div class="input-group">\n' +
            '                        <input type="text" class="form-control" readonly value="'+res.data.sub_url+'" placeholder="请输入关键词...">\n' +
            '                        <span class="input-group-btn">\n' +
            '                          <button class="btn btn-dark" type="button">复制订阅</button>\n' +
            '                        </span>\n' +
            '                      </div>\n' +
            '                    </div>' +
                '</p>\n' +
                '                  </div>\n' +
                '                  <div class="tab-pane fade" id="import">\n' +
                '                    <p><button class="btn btn-purple btn-w-md" type="button">Clash导入</button></p>\n' +
                '                  </div>\n' +
                '                  <div class="tab-pane fade" id="reset">\n' +
                '                    <p><button class="btn btn-danger btn-w-md" type="button">重置订阅</button></p>\n' +
                '                  </div>\n' +
                '                  <div class="tab-pane fade" id="back">\n' +
                '                    <p>这里介绍退还规则 重点只可退还至账户余额 不可提现 当前可退还金额 55.55<button class="btn btn-brown btn-w-md" type="button">退还订阅</button></p>\n' +
                '                  </div>\n' +
                '                </div>' +
                '</div>';

            $('div.card-body').html(_html);

            let _node = '<div class="row">\n' +
                '        <div class="col-lg-12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-header"><h4><strong>可用节点</strong></h4></div>\n' +
                '                <div class="card-body">\n' +
                '<div class="table-responsive"><table class="table table-hover"><thead><tr><th>操作</th><th>名称</th><th>地址</th><th>端口</th><th>状态</th></tr></thead>';
            _node += '<tbody>';
            $.each(res.data.nodes, function (i, v) {
                _node += '<tr><td><button class="qrcode_btn" type="button">扫码</button></td>';
                _node += '<td>'+v.title+'</td>';
                _node += '<td>'+v.host+'</td>';
                _node += '<td>'+v.host+'</td>';
                _node += '<td>'+v.port+'</td>';
                _node += '</tr>';
            })
            _node += '</tbody></table></div>';
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>';

            $('div.container-fluid').append(_node);
        }
    })

    $(document).on('click','button.qrcode_btn', function () {
        $("#qrcode").qrcode({
            render: "canvas",
            text: 'http://www.jq22.com',
            width: "200", //二维码的宽度
            height: "200", //二维码的高度
            background: "#ffffff", //二维码的后景色
            foreground: "#000000", //二维码的前景色
            //src: './logo.jpeg' //二维码中间的图片
        });
    })
    function createQrcode () {
        var url = 'http://www.jq22.com;';//需要生成二维码的网址
        makeCode(url);
    }
});