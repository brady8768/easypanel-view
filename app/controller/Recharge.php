<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Recharge extends Auth
{
    public function confirm(){
        $param = request()->param();
        return RequestControl::recharge(session('user')->id, $param);
    }
}
