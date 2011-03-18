<?php
/**
 * @file			user_config.php
 * @CopyRight		(C)1996-2099 SINA Inc.
 * @Project			Xweibo
 * @Author			heli <heli1@staff.sina.com.cn>
 * @Create Date:	2010-11-16
 * @Modified By:	heli/2010-11-16
 * @Brief			�û������ļ�
 */

///---------------------------------------------------------------------
/**
 * �Ƿ�������״̬
 * ��IS_DEBUG Ϊ true  ʱ������ display_errors,error_reporting(E_ALL),����ʱֱ����ʾ������Ϣ
 * ��IS_DEBUG Ϊ false ʱ�����ر�����ѡ��
 */
define('IS_DEBUG',				'');
/// SERVER������ ���� Ŀǰֻ������ common (һ���ͨ�û���), sae��(sina SAE������)
define('XWB_SERVER_ENV_TYPE',	'sae');
//----------------------------------------------------------------------
if (XWB_SERVER_ENV_TYPE!=='sae'){
	/// ��Ʒ��ʶ��,ÿ�ΰ�װ�������� ,��date("mdHis") �������°�װʱ���Զ�����MCǰ׺��
	define('APP_FLAG_VER',	'');
	/// MC��KEY����ǰ׺
	define('MC_PREFIX',			'XWB11_MC_'.APP_FLAG_VER);
	/// ��Ʒ��װ·��
	define('W_BASE_URL_PATH',	'/');
	/// ΢�� APP_KEY
	define('WB_AKEY', 			'');
	/// ΢�� SECRET_KEY
	define('WB_SKEY', 			'');
	/// �ٷ�΢�������д���listʹ�õ�ID
	define('SYSTEM_SINA_UID',	'');
	/// �������õ�token
	define('WB_USER_OAUTH_TOKEN',			'');
	define('WB_USER_OAUTH_TOKEN_SECRET',	'');
	
	/// ��װʱ��վ��������Ϣ
	define('WB_USER_SITENAME',		'');
	define('WB_USER_SITEINFO',		'');
	define('WB_USER_NAME',			'');
	define('WB_USER_EMAIL',			'');
	define('WB_USER_QQ',			'');
	define('WB_USER_MSN',			'');
	define('WB_USER_TEL',			'');
}
//----------------------------------------------------------------------
/// SAE�е� Storage Domain����
define('SAE_DOMAIN', 'xweibo');
/// ��������Ƿ���
define('AD_UNION', '0');
/// �洢��XWEIO�������ļ����KEY
define('CONFIG_DOMAIN',     'config');
//----------------------------------------------------------------------
/// �Ƿ�������֤�룬��SAE����֤��ʵ�ֲ���������ر� ����Ϊ���������� �� 
define('IS_USE_CAPTCHA',	'');
//----------------------------------------------------------------------
/// HTTP		������ѡ������
define('HTTP_ADAPTER',		'saeproxy');
/// CACHE 		������ѡ������
define('CACHE_ADAPTER',		'sae');
/// ACCOUNT		������ѡ������
define('ACCOUNT_ADAPTER',	'dzUcenter');
/// SMTP		������ѡ������
define('SMTP_ADAPTER',		'smtp');
/// DB			������ѡ������
define('DB_ADAPTER',		'mysql');
///���ϴ�������
define('UPLOAD_ADAPTER',	'sae');
/// FILE		������ѡ������
define('FILE_ADAPTER',		'saefile');
/// auth			������ѡ������
define('AUTH_ADAPTER',		'sae');
//ͼƬ����
define('IMAGE_ADAPTER', 	'sae');

//mail����
define('MAIL_ADAPTER',		'sae');
/// MC �� HOST ����
define('MC_HOST', 			'');
//----------------------------------------------------------------------
/// DB����ص�����
define('DB_PORT',		$_SERVER["HTTP_MYSQLPORT"]);
define('DB_HOST',		DB_PORT.".mysql.sae.sina.com.cn");
define('DB_USER',		SAE_ACCESSKEY);
define('DB_PASSWD',		SAE_SECRETKEY);
define('DB_CHARSET',	'utf8');
define('DB_PREFIX',		'xwb11_');
define('DB_NAME',		"app_".$_SERVER["HTTP_APPNAME"]);
//----------------------------------------------------------------------
/// �Ƿ���û����黺�� (Ŀǰʵ���в�����) ,����Ϊ false �����û����黺�潫��ͣ�� , ����뵥���޸�ĳ������棬����������ض��Ļ�������
define('CACHE_USER_ALL_ENABLE',	TRUE);
/// �ҵ���ҳ����
define('CACHE_HOME_TIMELINE',	CACHE_USER_ALL_ENABLE ? 'u0/300' : '');
/// ���յ������ۻ���
define('CACHE_COMMENT_TO_ME',	CACHE_USER_ALL_ENABLE ? '' : '');
/// �ᵽ�ҵ�΢������
define('CACHE_MENTIONS',		CACHE_USER_ALL_ENABLE ? '' : '');
/// �ҵķ�˿����
define('CACHE_FANS',			CACHE_USER_ALL_ENABLE ? '' : '');
/// �ҵ�˽�Ż���
define('CACHE_MESSAGES',		CACHE_USER_ALL_ENABLE ? '' : '');
//----------------------------------------------------------------------
/// apiǩ����֤key
define('API_KEY',			'');
/// api������ʱ��
define('API_TIMESTAMP',		60 * 10);
//----------------------------------------------------------------------
/// �����ϴ���С����λ��M
define('MAX_UPLOAD_FILE_SIZE',	'1');
