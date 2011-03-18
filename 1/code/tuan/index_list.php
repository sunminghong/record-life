<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf8" />
<meta content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=yes;" name="viewport" >

<title>test</title>
<script type="text/javascript" src="../js/base_min.js"></script>
<style>
body,td{font-size:14.3px;text-algin:left;}
.deal {border-bottom:1px solid #eee; padding-bottom:10px;}
.deal b,.deal u,.deal del{padding:2px 5px; font-size:20px;}
.deal_title {display1:none;}
.btn_expand{cursor:pointer;}

table {
	max-width:800px;
border-spacing: 2px 2px;
border-color: gray;
/*border-collapse: separate;
display: table;*/
}
tr {
/*border-color: inherit;
display: table-row;
vertical-align: inherit;*/
}
td{padding:2px 5px;}
</style>
<script>
var ol=window.onload;
window.onload=function(){
	ol();
	$('td.btn_expand').click(function(){
			var id=$(this).attr("id").replace('btn_','');
			if(this.innerHTML=="+"){
				this.innerHTML="-";
				$('#title_'+id).css("display","");
				//$('#title_td'+id).css("display","");
			}
			else{
				this.innerHTML="+";
				$('#title_'+id).css("display","none");
				//$('#title_td'+id).css("display","none");

			}

	});
};
function refresh2(){
	var url="getdeal.php?t="+Math.random();
	url +='&act=reload&noreturn=true';
	ajax(url,{},function(){location.reload();});
}
</script>

</head>
<body>
<a href="#" onclick="refresh2();">刷新数据</a>  <a href="index.php?city=<?php echo $_REQUEST["city"]?>">地图版</a>
<?php

$mysql = new SaeMysql();


$city=$_REQUEST["city"];
if(!$city)$city="武汉";
if($city=="all")
	$where="";
else
	$where=" and (division_name='$city' or division_name='全国')";
	
$sql = "SELECT * FROM `tuan_salesdata` where end_date>now() $where  order by quantity_sold * price desc ";
$data = $mysql->getData( $sql );
//echo "data=";print_r($data);
$tab='<table border="0" cellspacing="0" cellpadding="0" >';
foreach($data as $deal){
	//$tab.='<div class="deal">#'.$deal['id'].'　['.$deal['fromsite'].']<b><a href="'.$deal['deal_url'].'" target="_blank">'.$deal["vendor_name"].'</a></b><u>¥'.$deal["price"].'</u><del>¥'.$deal["value"].'</del><b>'.$deal["quantity_sold"].'</b><b>总¥'.($deal["quantity_sold"] * $deal["price"]).'</b><div id="title_'.$deal["id"].'" class="deal_title"><p><a href="'.$deal['deal_url'].'" target="_blank">'.$deal["title"].'</a></p><p>'.$deal["deal_url"].'</p></div>';

	$tab.='<tbody><tr class="deal"><td class="btn_expand" id="btn_'.$deal['id'].'" >+</td><td>#'.$deal['id'].'</td><td>['.$deal['fromsite'].']</td><td><a href="'.$deal['deal_url'].'" target="_blank">'.$deal["vendor_name"].'</a></td><td>¥'.$deal["price"].'</td><td>¥'.$deal["value"].'</td><td>'.$deal["quantity_sold"].'</td><td>总¥'.($deal["quantity_sold"] * $deal["price"]).'</td></tr></tbody><tbody><tr><td colspan="8" id="title_td_'.$deal["id"].'"><div style="display:none;" class="deal_title" id="title_'.$deal["id"].'"><p><a href="'.$deal['deal_url'].'" target="_blank">'.$deal["title"].'</a></p><p>'.$deal["deal_url"].'</p></div></td></tr></tbody>';

}
echo $tab;echo '</table>';

$mysql->closeDb();

?>

</body>
</html>