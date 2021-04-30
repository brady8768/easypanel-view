<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Download extends Auth
{
    public function getData(){
        return json(['code'=>0,'data'=>[]]);
    }
}
