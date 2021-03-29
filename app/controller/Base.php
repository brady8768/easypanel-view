<?php
declare (strict_types = 1);

namespace app\controller;

class Base
{
    public function __call($name, $arguments)
    {
        $theme = env('view.theme') ?: 'default';
        return view($theme . '/error');
    }
}
