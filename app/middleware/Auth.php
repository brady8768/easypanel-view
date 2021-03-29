<?php
declare (strict_types = 1);

namespace app\middleware;

class Auth
{
    /**
     * 处理请求
     *
     * @param \think\Request $request
     * @param \Closure       $next
     * @return Response
     */
    public function handle($request, \Closure $next)
    {
        if(!session('user')){
            if($request->isAjax()){
                return json(['code'=>-1, 'msg'=>'登陆超时,请重新登陆']);
            }
        }
        return $next($request);
    }
}
