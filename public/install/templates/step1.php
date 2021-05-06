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

<strong>UFO视频加速器面板（以下称“UFO”），由UFO小组独创开发，基于 PHP + MySQL 的技术，采用ThinkPHP6框架开发。</strong>
UFO官方网站：http://www.ufo.com

</pre>
    </div>
    <div class="bottom tac"> <a href="<?php echo $_SERVER['PHP_SELF']; ?>?step=2" class="btn">接 受</a> </div>
  </div>
</div>
<?php require './templates/footer.php';?>
</body>
</html>