<?php
/**
 * UCenter 应用程序开发 Example
 *
 * 应用程序有自己的用户表，用户登录的 Example 代码
 * 使用到的接口函数：
 * uc_user_login()	必须，判断登录用户的有效性
 * uc_authcode()	可选，借用用户中心的函数加解密激活字串和 Cookie
 * uc_user_synlogin()	可选，生成同步登录的代码
 */
if(empty($_POST['submit'])) {
	//登录表单
	$view->assign("isSubmit",1);
	$view->display('login');
	exit;
} else {
	//通过接口判断登录帐号的正确性，返回值为数组
	list($uid, $username, $password, $email) = uc_user_login($_POST['username'], $_POST['password']);

	setcookie('5D13_auth', '', -86400);
	if($uid > 0) {
		$db->query("REPLACE INTO {$tablepre}ren (uid,username,admin,regtime,lasttime) VALUES ('$uid','$username',0,$timestamp,$timestamp)");
		//用户登陆成功，设置 Cookie，加密直接用 uc_authcode 函数，用户使用自己的函数
		setcookie('5D13_auth', uc_authcode($uid."\t".$username, 'ENCODE'));
		//生成同步登录的代码,将$ucsynlogin输出到客户端才能实现同步登录
		$ucsynlogin = uc_user_synlogin($uid);
		echo '登录成功'.$ucsynlogin.'<script>location.href="'.$_SERVER['PHP_SELF'].'";</script>';
		exit;
	} elseif($uid == -1) {
		echo '用户不存在,或者被删除';
	} elseif($uid == -2) {
		echo '密码错';
	} else {
		echo '未定义';
	}
}

?>