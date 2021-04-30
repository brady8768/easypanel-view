<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Record extends Auth
{
    public function getData()
    {
        $param = request()->param();
        $page = $param['page'] ?? 1;
        return RequestControl::getRecord(session('user')->id, $page);
    }
}
