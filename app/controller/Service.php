<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Service extends Auth
{
    public function getData(){
        return RequestControl::getServiceList();
    }
}
