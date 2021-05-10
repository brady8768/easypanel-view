<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;
use think\exception\ValidateException;

class Password extends Auth
{
    public function change(){
        $param = request()->param();

        try{
            Validate(\app\validate\Login::class)->scene('change')->check($param);
        }catch (ValidateException $e){
            abort(400, $e->getMessage());
        }

        $json = RequestControl::changePassword(session('user')->id, $param['old_pwd'], $param['new_pwd']);
        if(!$json->code) session('user', null);

        return $json;
    }
}
