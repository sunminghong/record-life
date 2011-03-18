<?php
$_adapter['db']['mysql'] = array(
	'host'	 => 'w.rdc.sae.sina.com.cn',
	'port'	 => 3307,
	'user'	 => DB_USER,
	'pwd'	 => DB_PASSWD,
	'charset'=> DB_CHARSET,
	'tbpre'	 => DB_PREFIX,
	'db'	 => DB_NAME,
	'slaves' => array(
			array(
				'host'	 => 'r.rdc.sae.sina.com.cn',
				'port'	 => 3307,
				'user'	 => DB_USER,
				'pwd'	 => DB_PASSWD,
				)
		)
);

?>