<?php
// +----------------------------------------------------------------------
// | 应用设置
// +----------------------------------------------------------------------

return [
    // 应用地址
    'app_host'         => env('app.host', ''),
    // 应用的命名空间
    'app_namespace'    => '',
    // 是否启用路由
    'with_route'       => true,
    // 默认应用
    'default_app'      => 'index',
    // 默认时区
    'default_timezone' => 'Asia/Shanghai',

    // 应用映射（自动多应用模式有效）
    'app_map'          => [],
    // 域名绑定（自动多应用模式有效）
    'domain_bind'      => [],
    // 禁止URL访问的应用列表（自动多应用模式有效）
    'deny_app_list'    => [],

    // 异常页面的模板文件
    'exception_tmpl'   =>  root_path() . '/view/' . (env('view.theme') ?: 'default') . '/stop.html',

    // 错误显示信息,非调试模式有效
    'error_message'    => '页面错误！请稍后再试～',
    // 显示错误信息
    'show_error_msg'   => false,

    //面板标题
    'panel_title' => env('app.panel_title', ''),
    //面板关键词
    'panel_keywords' => env('app.panel_keywords', ''),
    //面板描述
    'panel_description' => env('app.panel_description', ''),

    //面板通讯秘钥
    'panel_key' => env('app.panel_key', ''),
    //商户端域名
    'merchant_url'  =>  env('app.merchant_url', ''),
];
