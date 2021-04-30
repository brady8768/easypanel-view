<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Order extends Auth
{
    public function getData()
    {
        $param = request()->param();
        return RequestControl::confirmOrder(session('user')->id, $param['trade_no']);
    }

    public function settlement(){
        $param = request()->param();
        $agree = $param['agree'] ?? false;
        return RequestControl::settlementOrder(session('user')->id, $param['trade_no'], $agree);
    }
}
