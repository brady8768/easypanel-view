<?php
declare (strict_types = 1);

namespace app\utils;


class RequestControl
{
    //private const URL = 'http://mmt.bbapk.xyz';
    private const URL = 'http://mmt.com/webapi';

    public static function getSub($param){
        $api = '/client/sub';
        return self::curl($api, $param);
    }

    // 获取订阅相关数据
    public static function getSubscribe($user_id){
        $api = '/subscribe/sub';
        $param['user_id'] = $user_id;
        return self::curl($api, $param);
    }

    // 获取购买记录
    public static function getRecord($user_id, $page){
        $api = '/order/record';
        $param['user_id'] = $user_id;
        $param['page'] = $page;
        return self::curl($api, $param);
    }

    // 结算订单
    public static function settlementOrder($user_id, $trade_no, $agree){
        $api = '/order/settlement';
        $param['user_id'] = $user_id;
        $param['trade_no'] = $trade_no;
        $param['agree'] = $agree;
        return self::curl($api, $param);
    }

    // 获取订单信息
    public static function confirmOrder($user_id, $trade_no){
        $api = '/order/confirm';
        $param['user_id'] = $user_id;
        $param['trade_no'] = $trade_no;
        return self::curl($api, $param);
    }

    // 套餐预下单
    public static function advanceServiceOrder($user_id, $service_id, $service_cycle){
        $api = '/service/order';
        $param['user_id'] = $user_id;
        $param['service_id'] = $service_id;
        $param['service_cycle'] = $service_cycle;
        return self::curl($api, $param);
    }

    // 浏览套餐详情
    public static function browseService($user_id, $service_id){
        $api = '/service/buy';
        $param['user_id'] = $user_id;
        $param['service_id'] = $service_id;
        return self::curl($api, $param);
    }

    public static function getUserSummaryData($user_id){
        $api = '/user/summary';
        $param['user_id'] = $user_id;
        return self::curl($api, $param);
    }

    public static function register($param){
        $api = '/user/register';
        return self::curl($api, $param);
    }

    public static function checkAccount($param){
        $api = '/user/login';
        return self::curl($api, $param);
    }

    public static function getServiceList(){
        $api = '/service/getListData';
        return self::curl($api);
    }

    public static function getServiceConfirm($id){
        $api = '/service/getData';
        $param['id'] = $id;
        return self::curl($api, $param);
    }

    private static function curl($url, $param = []){
        $url = self::URL . '/' . config('app.panel_key') . $url;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        //curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT , 10);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        if($param){
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($param));
        }
        $data = curl_exec($ch);
        if (curl_errno($ch)) {
            trace(curl_error($ch), 'error');
            curl_close($ch);
            abort(500, '操作失败,发生内部错误,请联系管理员处理!');
        }
        $httpCode = curl_getinfo($ch,CURLINFO_HTTP_CODE);
        curl_close($ch);
        switch ((int)$httpCode){
            case 0:
                abort(404, '操作失败,远端服务器连接错误,请联系管理员处理!');
            case 500:
                abort(502, '操作失败,远端服务器无响应,请联系管理员处理!');
            case 200:
                return json_decode($data);
            default:
                trace($data, 'error');
                abort(400, '操作失败,请求不合法!');
        }
    }
}