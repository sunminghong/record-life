<?php
define('UC_CONNECT', 'mysql');
define('UC_DBHOST', 'localhost');
define('UC_DBUSER', '5d13_uc');
define('UC_DBPW', '5d13_uc');
define('UC_DBNAME', '5d13_uc');
define('UC_DBCHARSET', 'utf8');
define('UC_DBTABLEPRE', '`5d13_uc`.uc_');
define('UC_DBCONNECT', '0');

define('UC_KEY', '123456789sdfsadfg345343');
define('UC_API', 'http://localhost:9999/uc');
define('UC_CHARSET', 'utf-8');
define('UC_IP', '');
define('UC_APPID', '1');
define('UC_PPP', '20');


//ucexample_2.php �õ���Ӧ�ó������ݿ����Ӳ���
$dbhost = 'localhost';			// ���ݿ������
$dbuser = '5d13_rec';			// ���ݿ��û���
$dbpw = '5d13_rec';				// ���ݿ�����
$dbname = '5d13_rec';			// ���ݿ���
$pconnect = 0;				// ���ݿ�־����� 0=�ر�, 1=��
$tablepre = 'rec_';   		// ����ǰ׺, ͬһ���ݿⰲװ�����̳���޸Ĵ˴�
$dbcharset = 'utf8';			// MySQL �ַ���, ��ѡ 'gbk', 'big5', 'utf8', 'latin1', ����Ϊ������̳�ַ����趨

//ͬ����¼ Cookie ����
$cookiedomain = ''; 			// cookie ������
$cookiepath = '/';			// cookie ����·��