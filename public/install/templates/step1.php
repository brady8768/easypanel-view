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
  <div class="section">
    <div class="main cc">
      <pre class="pact" readonly="readonly">
          <h1 style="text-align: center;">软件介绍</h1>


<strong> EasyPanel 是由 EasyPanel 团队 开发的一系列与计算机网络相关的软件。集成了用户前端、管理后端、支付、防护以及资源推广的一系列的服务。EasyPanel不仅仅只是个面板，它为运营者提供了一整套的解决方案。</strong>
<br><br><br>EasyPanel网址：https://easypanel.xyz

</pre>
    </div>
    <div class="bottom tac"> <a href="<?php echo $_SERVER['PHP_SELF']; ?>?step=2" class="btn">接 受</a> </div>
  </div>
</div>
<?php require './templates/footer.php';?>
</body>
</html>