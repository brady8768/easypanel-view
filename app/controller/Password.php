<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Password extends Auth
{
    public function getData(){
        $param = request()->param();
        //return RequestControl::getServiceConfirm($param['id']);
    }

    public function bind(){
        $param = request()->param();
        //return RequestControl::advanceServiceOrder(session('user')->id, $param['id'], $param['cycle']);
    }
}
