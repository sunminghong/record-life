<?php

define('ROOT', substr(__FILE__, 0, -18));
define('DATADIR', ROOT.'data/');

//exit;
include ROOT.'./config.inc.php';
include ROOT.'./include/db_mysql.class.php';

$db = new dbstuff;
$db->connect($dbhost, $dbuser, $dbpw, $dbname, $pconnect);
unset($dbhost, $dbuser, $dbpw, $dbname, $pconnect);

include ROOT.'./uc_client/client.php';

//print_r(explode("\t", uc_authcode($_COOKIE['5D13_auth'], 'DECODE')));

if(!empty($_COOKIE['5D13_auth'])) {
	$userauth= explode("\t", uc_authcode($_COOKIE['5D13_auth'], 'DECODE'));
	list($uid, $username) =$userauth;
} else {
	$uid = $username = '';
}
$nickname='';

//时间
$mtime = explode(' ', microtime());
$timestamp = $mtime[1];
//$_SGLOBAL['supe_starttime'] = $_SGLOBAL['timestamp'] + $mtime[0];
$yymmdd=date("ymd");

$act=empty($_GET['act'])?'rec':$_GET['act'];
$op=empty($_GET['op'])?'index':$_GET['op'];

//初始化模版对象
require_once ROOT.'include/template.class.php';
$view = new template();
$view->assign('charset', UC_CHARSET);
$view->assign('uid', $uid);
$view->assign('username',$username);
$view->assign('nickname',$nickname);

if($op=="register"){
	include "$act/$op.php";
}else{
	if(!$username) {
		include 'ren/login.php';
		exit;
	}
	else{
		include "$act/$op.php";exit;	
	}
}

?>