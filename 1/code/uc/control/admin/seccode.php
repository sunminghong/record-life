<?php

/*
	[UCenter] (C)2001-2009 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: seccode.php 753 2008-11-14 06:48:25Z cnteacher $
*/

!defined('IN_UC') && exit('Access Denied');

class control extends base {

	function __construct() {
		$this->control();
	}

	function control() {
		parent::__construct();
		$authkey = md5(UC_KEY.$_SERVER['HTTP_USER_AGENT'].$this->onlineip);		
		$this->time = time();
		$seccodeauth = getgpc('seccodeauth');
		$seccode = $this->authcode($seccodeauth, 'DECODE', $authkey);
		
		
		

 //<img src="http://vcode.sae.sina.com.cn/img.php?key=k-12919771529465">
		//$seccode = rand(100000, 999999);
		//$this->setcookie('uc_secc', $this->authcode($seccode."\t".$this->time, 'ENCODE'));
		
		@header("Expires: -1");
		@header("Cache-Control: no-store, private, post-check=0, pre-check=0, max-age=0", FALSE);
		@header("Pragma: no-cache");
		
		$im = imagecreate(70, 30);

		// °×É«±³¾°ºÍÀ¶É«ÎÄ±¾
		$bg = imagecolorallocate($im, 255, 255, 255);
		$textcolor = imagecolorallocate($im, 0, 0, 255);
		
		// °Ñ×Ö·û´®Ð´ÔÚÍ¼Ïñ×óÉÏ½Ç
		imagestring($im, 5, 0, 0, $seccode, $textcolor);
		
		// Êä³öÍ¼Ïñ
		header("Content-type: image/png");
		imagepng($im);
		exit;

		include_once UC_ROOT.'lib/seccode.class.php';
		$code = new seccode();
		$code->code = $seccode;
		$code->type = 1;
		$code->width = 70;
		$code->height = 31;
		$code->background = 0;
		$code->adulterate = 0;
		$code->ttf = 1;
		$code->angle = 1;
		$code->color = 1;
		$code->size = 1;
		$code->shadow =1;
		$code->animator = 0;
		$code->fontpath = UC_ROOT.'images/fonts/';
		$code->datapath = UC_ROOT.'images/';
		$code->includepath = '';
		
		$code->display();
	}

}

?>