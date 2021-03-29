<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Index extends Auth
{
    public function getData()
    {
        $json = RequestControl::getUserSummaryData(session('user')->id);

        if($json === false || $json->code){
            return json(['code'=>1]);
        }

        return json(['code'=>0, 'data'=>$json->data]);
    }

    public function logout(){
        session('user', null);
        return json(['code'=>0]);
    }
}
