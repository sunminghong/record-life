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


//ucexample_2.php 用到的应用程序数据库连接参数
$dbhost = 'localhost';			// 数据库服务器
$dbuser = '5d13_rec';			// 数据库用户名
$dbpw = '5d13_rec';				// 数据库密码
$dbname = '5d13_rec';			// 数据库名
$pconnect = 0;				// 数据库持久连接 0=关闭, 1=打开
$tablepre = 'rec_';   		// 表名前缀, 同一数据库安装多个论坛请修改此处
$dbcharset = 'utf8';			// MySQL 字符集, 可选 'gbk', 'big5', 'utf8', 'latin1', 留空为按照论坛字符集设定

//同步登录 Cookie 设置
$cookiedomain = ''; 			// cookie 作用域
$cookiepath = '/';			// cookie 作用路径