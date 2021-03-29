<?php
declare (strict_types = 1);

namespace app\controller;

class Auth extends Base
{
    protected $middleware = ['\app\middleware\Auth'];

    public function index()
    {
        if(!session('user')){
            return redirect('/login.html');
        }

        $theme = env('view.theme') ?: 'default';
        return view($theme . '/' . strtolower(request()->controller()));
    }

    public function getData(){
        return json(['code'=>0, 'data'=>[]]);
    }
}
