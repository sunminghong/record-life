<?php
/*
$f = new SaeFetchurl();
//$url="http://wh.meituan.com/deal/755253.html";
$url="http://www.meituan.com/index/changecity";
 $content = $f->fetch($url);
 if ($ret === false){
         var_dump($f->errno(), $f->errmsg());
		 exit;
 }
   $match = '';  
    //preg_match_all('/"position":\[(\d+\.\d+)\,(\d+\.\d+)\]\,"address":"([^"]+)"\}\]/', $content, $match);  
    //preg_match_all('/"name":"([^"]+)","slug":"([^"]+)","firstalpha":"([^"]+)"/', $content, $match);  
    preg_match_all('/\<a class="isonline\s*" href="([^"]+)">([^"]+)\<\/a\>/', $content, $match);
    print_r($match); 
 
	exit;
	*/


$mysql = new SaeMysql();

$f = new SaeFetchurl();

function fetchCity(){
	global $f,$mysql;
	include_once("../include/function.php");
	$content = $f->fetch('http://www.meituan.com/index/changecity');
	 if ($content === false){
			 //var_dump($f->errno(), $f->errmsg());
			 exit;
	 }
	 
 	$citys=array();
	$match = '';  
	//preg_match_all('/"position":\[(\d+\.\d+)\,(\d+\.\d+)\]\,"address":"([^"]+)"\}\]/', $content, $match);  
	//preg_match_all('/"name":"([^"]+)","slug":"([^"]+)","firstalpha":"([^"]+)"/', $content, $match);  
	preg_match_all('/\<a class="isonline\s*" href="http:\/\/([^\.]+)\.meituan\.com">([^"]+)\<\/a\>/', $content, $match);
	//print_r($match);
	if($match){
		$len=count($match[0]);

		for($i=0;$i<$len;$i++){
			$ci=array();
			$ci["first"]=$match[1][$i];
			$ci["name"]=$match[2][$i];
			$ci["url"]="http://" . $match[1][$i] . ".meituan.com";
			$ci["fromsite"]="美团";
			
			$citys[$match[1][$i]]= $ci;
		}		
	}
	$match = '';  
	preg_match_all('/"name":"([^"]+)","slug":"([^"]+)","firstalpha":"([^"]+)"/', $content, $match);  	
	//print_r($match);
	if($match){
		$len=count($match[0]);

		for($i=0;$i<$len;$i++){
			$ci=array();
			if($citys[$match[3][$i]]) $citys[$match[3][$i]]["ename"]= $match[2][$i];
		}		
	} 
 	print_r($citys);
 	foreach($citys as $city) { 	
		$sql = "SELECT id FROM `tuan_city` where fromsite='".$city["fromsite"]."' and name='". $city["name"] . "'";
		$id=$mysql->getVar( $sql );
		$id=$id?$id:'';
		save($city, $id, "`tuan_city`", $id_name = 'id');
 	}
 	
 	exit;
}

function fetch($city) {
	global $f,$mysql;
	include_once("../include/function.php");
	if($city && $city!="all")
		$sql="select * from tuan_city where name='$city' order by id";
	else
		$sql="select * from tuan_city order by ename";
	
	$arr=$mysql->getData($sql);//print_r($arr);
	if($arr){
		foreach($arr as $ci){
			$fromsite=$ci["fromsite"] . "fetchDo";
			$fromsite($ci);
		}
	}
}
function 美团fetchDo($city) {

	global $f,$mysql;
	include_once("../include/function.php");
	$url=$city["url"];
	$fromsite=$city["fromsite"];
	$ename=$city["ename"];
//echo $url ."<br/>";	
	 $content = $f->fetch('http://www.meituan.com/api/v1/' .$ename .'/deals');
	 if ($content=== false){
			 //var_dump($f->errno(), $f->errmsg());
			 echo 'aadfadfa';
			 exit;
	 }
	//解析XML
	$xml = simplexml_load_string($content);
	$result = $xml->xpath("//deal");

	//'id','division_timezone','division_offset_gmt','division_lat','division_lng',
	$fields=array(
	'deal_url','title','small_image_url','medium_image_url','large_image_url','division_id','division_name','vendor_id','vendor_name','vendor_website_url','status','start_date','end_date','quantity_sold','price','value','discount_percent'
	);
	$timestamp=time(); 
	foreach($result as $deal){
		$ins=array();

		$ins["from_id"]=getEl($deal,"id");
		$ins["lasttime"]=$timestamp;
		
		$sql = "SELECT id FROM `tuan_salesdata` where from_id='". $ins["from_id"] . "' and fromsite='" . $fromsite ."'";
		$id=$mysql->getVar( $sql );
		$id=$id?$id:'';
		if($id=="") {
			$ins["fromsite"]=$fromsite;
			foreach($fields as $field){
				$de=getEl($deal,$field);
				$ins[$field]=$de;
			}

			fetchAddress(&$ins,$ins['deal_url']);

			if($ins["status"]=="open") 
				$ins["status"]=1;
			else
				$ins["status"]=0;

			$ins["regtime"]=$timestamp;
		}else{
			$fields2=array('quantity_sold');
			foreach($fields2 as $field){
				$de=getEl($deal,$field);
				$ins[$field]=$de;
			}
		}
		save($ins, $id, "`tuan_salesdata`", $id_name = 'id');
		//echo '$ins=';	print_r($ins);
	}
}

function fetchAddress($arr,$url){
	global $f;
	$content = $f->fetch($url);
	if ($ret === false){
		//var_dump($f->errno(), $f->errmsg());
		return;
	}	 
	$match = '';  
	preg_match_all('/"position":\[(\d+\.\d+)\,(\d+\.\d+)\]\,"address":"([^"]+)"\}/', $content, $match);  
//print_r($match); 
	if($match){
		$len=count($match[0]);
		$ap="";$arr["address"]='[';
		for($i=0;$i<$len;$i++){
			$arr["address"] .= $ap. '{"lat":'. $match[1][$i] . ',"lng":'. $match[2][$i] . ',"addr":"'.$match[3][$i] . '"}';
			$ap=",";
		}
		$arr["address"] .= ']';
	}
}
//////////

$act=$_REQUEST["act"];
$city=$_REQUEST["city"];
if($act == "reload"){
	fetch($city);
	if($_REQUEST["noreturn"])
		exit;
}elseif($act=="recity"){
	fetchcity();
}
if(!$city)$city="武汉";
if($city=="all")
	$where="";
else
	$where=" and (division_name='$city' or division_name='全国')";
	
$sql = "SELECT * FROM `tuan_salesdata` where end_date>now() $where ";
	
$data = $mysql->getData( $sql );
if($data){
	$datajson = json_encode($data);
	//$datajson = preg_replace("#\\u([0-9a-f]+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\1'))", $datajson);
}
$mysql->closeDb();
echo $datajson;
?>