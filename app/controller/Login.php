<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;
use think\exception\ValidateException;

class Login extends Base
{
    public function index(){
        $theme = env('view.theme') ?: 'default';
        return view($theme . '/' . strtolower(request()->controller()));
    }

    public function check(){
        $param = request()->param();

        try{
            Validate(\app\validate\Login::class)->scene('login')->check($param);
        }catch (ValidateException $e){
            abort(400, $e->getMessage());
        }

        $json = RequestControl::checkAccount($param);
        if($json->code) return $json;

        session('user', $json->data);
        return json(['code'=>0]);
    }

    public function logout(){
        session('user', null);
        return json(['code'=>0]);
    }
}
