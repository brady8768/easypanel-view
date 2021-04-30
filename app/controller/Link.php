<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Link extends Base
{
    public function sub()
    {
        $param = request()->param();

        $header = request()->header('user-agent');

        $client = 'v2ray';

        if (strpos($header, 'quantumult%20x') !== false) {
            $client = 'qx';
        }
        if (strpos($header, 'quantumult') !== false) {
            $client = 'q';
        }
        if (strpos($header, 'clash') !== false) {
            $client = 'c';
        }
        if (strpos($header, 'surfboard') !== false) {
            $client = 'sb';
        }
        if (strpos($header, 'surge') !== false) {
            $client = 's';
        }
        if (strpos($header, 'shadowrocket') !== false) {
            $client = 'sr';
        }
        if (strpos($header, 'shadowsocks') !== false) {
            $client = 'ss';
        }

        $param['client'] = $client;

        $json = RequestControl::getSub($param);

        if($json === false || $json->code){
            return json(['code'=>1]);
        }

        return json(['code'=>0, 'data'=>$json->data]);
    }
}
