<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;
use think\exception\ValidateException;

class Register extends Base
{
    public function index()
    {
        $theme = env('view.theme') ?: 'default';
        return view($theme . '/' . strtolower(request()->controller()));
    }

    public function reg(){
        $param = request()->param();

        try{
            Validate(\app\validate\Login::class)->scene('reg')->check($param);
        }catch (ValidateException $e){
            abort(400, $e->getMessage());
        }

        $json = RequestControl::register($param);
        if($json->code) return $json;

        session('user', $json->data);
        return json(['code'=>0]);
    }
}
