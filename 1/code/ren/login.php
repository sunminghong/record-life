<?php
/**
 * UCenter Ӧ�ó��򿪷� Example
 *
 * Ӧ�ó������Լ����û����û���¼�� Example ����
 * ʹ�õ��Ľӿں�����
 * uc_user_login()	���룬�жϵ�¼�û�����Ч��
 * uc_authcode()	��ѡ�������û����ĵĺ����ӽ��ܼ����ִ��� Cookie
 * uc_user_synlogin()	��ѡ������ͬ����¼�Ĵ���
 */
if(empty($_POST['submit'])) {
	//��¼��
	$view->assign("isSubmit",1);
	$view->display('login');
	exit;
} else {
	//ͨ���ӿ��жϵ�¼�ʺŵ���ȷ�ԣ�����ֵΪ����
	list($uid, $username, $password, $email) = uc_user_login($_POST['username'], $_POST['password']);

	setcookie('5D13_auth', '', -86400);
	if($uid > 0) {
		$db->query("REPLACE INTO {$tablepre}ren (uid,username,admin,regtime,lasttime) VALUES ('$uid','$username',0,$timestamp,$timestamp)");
		//�û���½�ɹ������� Cookie������ֱ���� uc_authcode �������û�ʹ���Լ��ĺ���
		setcookie('5D13_auth', uc_authcode($uid."\t".$username, 'ENCODE'));
		//����ͬ����¼�Ĵ���,��$ucsynlogin������ͻ��˲���ʵ��ͬ����¼
		$ucsynlogin = uc_user_synlogin($uid);
		echo '��¼�ɹ�'.$ucsynlogin.'<script>location.href="'.$_SERVER['PHP_SELF'].'";</script>';
		exit;
	} elseif($uid == -1) {
		echo '�û�������,���߱�ɾ��';
	} elseif($uid == -2) {
		echo '�����';
	} else {
		echo 'δ����';
	}
}

?>