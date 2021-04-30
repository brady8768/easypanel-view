<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Subscribe extends Auth
{
    public function getData(){
        $json = RequestControl::getSubscribe(session('user')->id);
        $data = [];
        trace($json);
        if($json->code === 0 && $json->data->sub_code != ''){
            $data['sub_url'] = request()->domain() . '/sub/' . $json->data->sub_code;
            $data['nodes'] = $json->data->nodes;
        }
        return json(['code'=>0,'data'=>$data]);
    }
}
