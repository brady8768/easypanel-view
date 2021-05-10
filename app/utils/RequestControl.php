<?php
declare (strict_types = 1);

namespace app\utils;

class RequestControl
{
    //充值
    public static function recharge($user_id, $param){
        $api = '/user/recharge';
        $param['user_id'] = $user_id;
        $param['device'] = self::getOS();
        $param['user_agent'] = request()->header('user-agent') ?? '';
        return self::curl($api, $param);
    }

    //获取os
    public static function getOS(){
        $Agent = request()->header('user-agent') ?? '';
        if (preg_match('/win/i',$Agent) && strpos($Agent, '95')){
            $os = 'Win 95';
        }elseif(preg_match('/win 9x/i',$Agent) && strpos($Agent, '4.90')){
            $os = 'Win ME';
        }elseif(preg_match('/win/i',$Agent) && preg_match('/98/i',$Agent)){
            $os = 'Win 98';
        }elseif(preg_match('/win/i',$Agent) && preg_match('/nt 5.0/i',$Agent)){
            $os = 'Win 2000';
        }elseif(preg_match('/win/i',$Agent) && preg_match('/nt 6.0/i',$Agent)){
            $os = 'Win Vista';
        }elseif(preg_match('/win/i',$Agent) && preg_match('/nt 6.1/i',$Agent)){
            $os = 'Win 7';
        }elseif(preg_match('/win/i',$Agent) && preg_match('/nt 5.1/i',$Agent)){
            $os = 'Win XP';
        }elseif(preg_match('/win/i',$Agent) && preg_match('/nt 6.2/i',$Agent)){
            $os = 'Win 8';
        }elseif(preg_match('/win/i',$Agent) && preg_match('/nt 6.3/i',$Agent)){
            $os = 'Win 8.1';
        }elseif(preg_match('/win/i',$Agent) && preg_match('/nt 10/i',$Agent)){
            $os = 'Win 10';
        }elseif(preg_match('/win/i',$Agent) && preg_match('/nt/i',$Agent)){
            $os = 'Win NT';
        }elseif(preg_match('/win/i',$Agent) && preg_match('/32/i',$Agent)){
            $os = 'Win 32';
        }elseif(preg_match('/Mi/i',$Agent)){
            $os = '小米';
        }elseif(preg_match('/Android/i',$Agent) && preg_match('/LG/i',$Agent)){
            $os = 'LG';
        }elseif(preg_match('/Android/i',$Agent) && preg_match('/M1/i',$Agent)){
            $os = '魅族';
        }elseif(preg_match('/Android/i',$Agent) && preg_match('/MX4/i',$Agent)){
            $os = '魅族4';
        }elseif(preg_match('/Android/i',$Agent) && preg_match('/M3/i',$Agent)){
            $os = '魅族';
        }elseif(preg_match('/Android/i',$Agent) && preg_match('/M4/i',$Agent)){
            $os = '魅族';
        }elseif(preg_match('/Android/i',$Agent) && preg_match('/H/i',$Agent)){
            $os = '华为';
        }elseif(preg_match('/Android/i',$Agent) && preg_match('/vivo/i',$Agent)){
            $os = 'Vivo';
        }elseif(preg_match('/Android/i',$Agent)){
            $os = 'Android';
        }elseif(preg_match('/linux/i',$Agent)){
            $os = 'Linux';
        }elseif(preg_match('/unix/i',$Agent)){
            $os = 'Unix';
        }elseif(preg_match('/iPhone/i',$Agent)){
            $os = '苹果';
        }else if(preg_match('/sun/i',$Agent) && preg_match('/os/i',$Agent)){
            $os = 'SunOS';
        }elseif(preg_match('/ibm/i',$Agent) && preg_match('/os/i',$Agent)){
            $os = 'IBM OS/2';
        }elseif(preg_match('/Mac/i',$Agent) && preg_match('/PC/i',$Agent)){
            $os = 'Macintosh';
        }elseif(preg_match('/PowerPC/i',$Agent)){
            $os = 'PowerPC';
        }elseif(preg_match('/AIX/i',$Agent)){
            $os = 'AIX';
        }elseif(preg_match('/HPUX/i',$Agent)){
            $os = 'HPUX';
        }elseif(preg_match('/NetBSD/i',$Agent)){
            $os = 'NetBSD';
        }elseif(preg_match('/BSD/i',$Agent)){
            $os = 'BSD';
        }elseif(preg_match('/OSF1/i',$Agent)){
            $os = 'OSF1';
        }elseif(preg_match('/IRIX/i',$Agent)){
            $os = 'IRIX';
        }elseif(preg_match('/FreeBSD/i',$Agent)){
            $os = 'FreeBSD';
        }else{
            $os = 'Unknown';
        }
        return $os;
    }

    //订阅操作
    public static function getSub($param){
        $api = '/client/sub';
        return self::curl($api, $param);
    }

    //订阅数据
    public static function getSubscribe($user_id){
        $api = '/subscribe/sub';
        $param['user_id'] = $user_id;
        return self::curl($api, $param);
    }

    //订阅重置
    public static function resetSubscribe($user_id){
        $api = '/subscribe/reset';
        $param['user_id'] = $user_id;
        return self::curl($api, $param);
    }

    //修改密码
    public static function changePassword($user_id, $old_pwd, $new_pwd){
        $api = '/user/resetPassword';
        $param['user_id'] = $user_id;
        $param['old_password'] = $old_pwd;
        $param['new_password'] = $new_pwd;
        return self::curl($api, $param);
    }

    //购买记录
    public static function getRecord($user_id, $page){
        $api = '/order/record';
        $param['user_id'] = $user_id;
        $param['page'] = $page;
        return self::curl($api, $param);
    }

    //结算订单
    public static function settlementOrder($user_id, $trade_no, $agree){
        $api = '/order/settlement';
        $param['user_id'] = $user_id;
        $param['trade_no'] = $trade_no;
        $param['agree'] = $agree;
        return self::curl($api, $param);
    }

    //获取订单
    public static function confirmOrder($user_id, $trade_no){
        $api = '/order/confirm';
        $param['user_id'] = $user_id;
        $param['trade_no'] = $trade_no;
        return self::curl($api, $param);
    }

    //套餐下单
    public static function advanceServiceOrder($user_id, $service_id, $service_cycle){
        $api = '/service/order';
        $param['user_id'] = $user_id;
        $param['service_id'] = $service_id;
        $param['service_cycle'] = $service_cycle;
        return self::curl($api, $param);
    }

    //首页数据
    public static function getUserSummaryData($user_id){
        $api = '/user/summary';
        $param['user_id'] = $user_id;
        return self::curl($api, $param);
    }

    //注册
    public static function register($param){
        $api = '/user/register';
        return self::curl($api, $param);
    }

    //登陆
    public static function checkAccount($param){
        $api = '/user/login';
        return self::curl($api, $param);
    }

    //套餐数据
    public static function getServiceList(){
        $api = '/service/getListData';
        return self::curl($api);
    }

    //获取套餐
    public static function getServiceConfirm($id){
        $api = '/service/getData';
        $param['id'] = $id;
        return self::curl($api, $param);
    }

    //绑定邮箱
    public static function bindEmail($user_id, $email){
        $api = '/user/email';
        $param['user_id'] = $user_id;
        $param['email'] = $email;
        return self::curl($api, $param);
    }

    //获取软件
    public static function getClientList(){
        $api = '/user/client';
        return self::curl($api);
    }

    private static function curl($url, $param = []){
        $url = 'http://' . config('app.merchant_url') . '/webapi/' . config('app.panel_key') . $url;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT , 5);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
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