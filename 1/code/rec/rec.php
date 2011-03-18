<?php
$type=empty($_GET['type'])?'good':$_GET['type'];

$db->query("REPLACE INTO {$tablepre}good (uid,yymmdd,regtime) VALUES ('$uid',$yymmdd,$timestamp)");

?>