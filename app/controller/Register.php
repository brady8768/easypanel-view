<?php
declare (strict_types = 1);

namespace app\controller;

use app\utils\RequestControl;

class Register extends Base
{
    public function index()
    {
        $theme = env('view.theme') ?: 'default';
        return view($theme . '/' . strtolower(request()->controller()));
    }

    public function reg(){
        $param = request()->param();

        $json = RequestControl::register($param);

        if($json === false || $json->code){
            return json(['code'=>1]);
        }

        session('user', $json->data);

        return json(['code'=>0]);
    }
}
