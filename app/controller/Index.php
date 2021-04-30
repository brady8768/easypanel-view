<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Index extends Auth
{
    public function getData()
    {
        return RequestControl::getUserSummaryData(session('user')->id);
    }
}
