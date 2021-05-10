<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;
use think\facade\Session;

class Lock extends Auth
{
    public function email(){
        $param = request()->param();
        $json = RequestControl::bindEmail(session('user')->id, $param['email']);
        if(!$json->code) Session::set('user.email', $param['email']);

        return $json;
    }
}
