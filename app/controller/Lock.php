<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Lock extends Auth
{
    public function email(){
        $param = request()->param();
        $json = RequestControl::bindEmail(session('user')->id, $param['email']);
        if(!$json->code){
            $session = session('user');
            $session->email = $param['email'];
            session('user', $session);
        }

        return $json;
    }
}
