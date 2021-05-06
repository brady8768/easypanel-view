<!doctype html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<title><?php echo $Title; ?></title>
<link rel="stylesheet" href="./css/install.css?v=9.0" />
</head>
<body>
<div class="wrap">
  <?php require './templates/header.php';?>
  <section class="section">
    <div class="step">
      <ul>
        <li class="on"><em>1</em>检测环境</li>
        <li class="current"><em>2</em>创建数据</li>
        <li><em>3</em>完成安装</li>
      </ul>
    </div>
    <form id="J_install_form" action="index.php?step=4" method="post">
      <input type="hidden" name="force" value="0" />
      <div class="server">
          <table width="100%">
              <tr>
                  <td class="td1" width="100">面板SEO信息</td>
                  <td class="td1" width="200">&nbsp;</td>
                  <td class="td1">&nbsp;</td>
              </tr>
              <tr>
                  <td class="tar">面板标题：</td>
                  <td><input type="text" name="title" id="title" value="" class="input"></td>
                  <td><div id="J_install_tip_manager"></div></td>
              </tr>
              <tr>
                  <td class="tar">面板关键词：</td>
                  <td><input type="text" name="keywords" id="keywords" class="input" autoComplete="off" value=""></td>
                  <td><div id="J_install_tip_manager_pwd"></div></td>
              </tr>
              <tr>
                  <td class="tar">面板描述：</td>
                  <td><input type="text" name="desc" id="desc" class="input" autoComplete="off" value=""></td>
                  <td><div id="J_install_tip_manager_ckpwd"></div></td>
              </tr>
          </table>
        <table width="100%">
          <tr>
            <td class="td1" width="100">面板授权配置</td>
            <td class="td1" width="200">&nbsp;</td>
            <td class="td1">&nbsp;</td>
          </tr>
            <tr>
                <td class="tar">授权秘钥：</td>
                <td><input type="text" name="key" id="key" class="input" autoComplete="off" value=""></td>
                <td><div id="J_install_tip_manager_ckpwd"></div></td>
            </tr>
            <tr>
                <td class="tar">商户端域名：</td>
                <td><input type="text" name="url" id="url" class="input" autoComplete="off" value=""></td>
                <td><div id="J_install_tip_manager_ckpwd"></div></td>
            </tr>
        </table>
        <div id="J_response_tips" style="display:none;"></div>
      </div>
      <div class="bottom tac"> <a href="./index.php?step=2" class="btn">上一步</a>
        <button type="button" onClick="checkForm();" class="btn btn_submit J_install_btn">创建数据</button>
      </div>
    </form>
  </section>
  <div  style="width:0;height:0;overflow:hidden;"> <img src="./images/install/pop_loading.gif"> </div>
  <script src="./js/jquery.js?v=9.0"></script> 
  <script src="./js/validate.js?v=9.0"></script> 
  <script src="./js/ajaxForm.js?v=9.0"></script> 
  <script>
	function checkForm()
	{
			title = $.trim($('#title').val());
            key = $.trim($('#key').val());
            url = $.trim($('#url').val());

			if(title.length == 0 )
			{
				alert('面板标题不能为空');
				return false;
			}
			if(key.length == 0)
			{
				alert('授权秘钥不能为空');
				return false;
			}	
			if(url.length == 0)
			{
				alert('商户端域名不能为空');
				return false;
			}

        $("#J_install_form").submit();
	}
 


</script> 
</div>
<?php require './templates/footer.php';?>
</body>
</html>