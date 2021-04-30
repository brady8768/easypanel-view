<?php
declare (strict_types = 1);

namespace app\validate;

use think\Validate;

class Login extends Validate
{
    /**
     * 定义验证规则
     * 格式：'字段名' =>  ['规则1','规则2'...]
     *
     * @var array
     */
    protected $rule = [
        'account|账号' => 'require|alphaDash|length:4,30',
        'password|密码' => 'require|alphaDash|length:6,30',
        'invite_code|邀请码' => 'alphaNum|length:12',
    ];

    /**
     * 定义错误信息
     * 格式：'字段名.规则名' =>  '错误信息'
     *
     * @var array
     */
    protected $message = [];

    protected $scene = [
        'login' => ['account','password'],
        'reg' => ['account','password','invite_code'],
    ];
}
