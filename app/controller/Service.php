<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Service extends Auth
{
    public function getData()
    {
        $json = RequestControl::getServiceList();

        if($json === false || $json->code){
            return json(['code'=>1]);
        }

        return json(['code'=>0, 'data'=>$json->data]);
    }

    public function buy(){
        $param = request()->param();

        $json = RequestControl::buyService(session('user')->id, $param['id']);

        if($json === false || $json->code){
            return json(['code'=>1]);
        }

        return json(['code'=>0]);
    }
}
