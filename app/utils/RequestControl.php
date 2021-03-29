<?php
declare (strict_types = 1);

namespace app\utils;


class RequestControl
{
    private const URL = 'http://mmt.bbapk.xyz';

    public static function buyService($user_id, $service_id){
        $api = '/webapi/service/buy';
        $param['user_id'] = $user_id;
        $param['service_id'] = $service_id;
        return self::curl($api, $param);
    }

    public static function getUserSummaryData($user_id){
        $api = '/webapi/user/summary';
        $param['user_id'] = $user_id;
        return self::curl($api, $param);
    }

    public static function register($param){
        $api = '/webapi/login/register';
        return self::curl($api, $param);
    }

    public static function checkAccount($param){
        $api = '/webapi/login/check';
        return self::curl($api, $param);
    }

    public static function getServiceList(){
        $api = '/webapi/service/getListData';
        return self::curl($api);
    }

    private static function curl($url, $param = []){

        $param['code'] = env('app.panel_key');
        $url = self::URL . $url;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT , 10);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        if($param){
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($param));
        }
        $data = curl_exec($ch);
        curl_close($ch);
        if($data) return json_decode($data);
        return false;
    }
}