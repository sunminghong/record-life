<html> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=utf8" /> 
 
<title>test</title> 
<script type="text/javascript" src="../js/base_min.js"></script> 
<style> 
* {
    margin: 0;
    padding: 0;
}
body {font-size:14.3px;
    background: #f2efe9;
    position: relative;
}
p {
    line - height: 18px;
}
a {
    color: #6eafd5;
    text - decoration: none;
}
a: hover {
    text - decoration: underline;
}
.set {
    background - color: #fff;
    bottom: 5px;
    left: 194px;
    padding: 3px 10px;
    position: absolute;
    z - index: 10;
    opacity: .8; - moz - opacity: .8;
    filter: alpha(opacity: 80);
    border: 1px solid; - moz - border - radius: 10px; - khtml - border - radius: 10px; - webkit - border - radius: 10px;
    border - radius: 10px;
}
.set a {
    color: #000;
    color: red;
    font - weight: bold;
}
.dealImg {
    float: left;
    padding - right: 5px;
}
.dealImg img {
    border: 1px solid#6EAFD5;
}
.dealTxt {
    display: table - cell;
}
#Gmap {
    margin: 0 auto;
    clear: both;
    width: 100 % ;
    height: 600px;
}
</style> 
 
 
</head> 
<body> 

<!-- Gmap --> 
<div id="Gmap"></div> 

<!-- set --> 
<div class="set"> 
	<strong>5d13团购导航</strong> by <a href="http://t.sina.com.cn/5d13" target="_blank">一挥</a> 
	|| <a id="refresh" href="#">5d13团购导航</a>  
</div> 
<?php
$mapObj="google";
if ($mapObj=="google"){
?>
<!-- google map api --> 
<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true&amp;key=ABQIAAAAMhaFw2aLvuJCNheXgJ1cnxTwr-LwzND12vMgSpcEZrCrX-deORRMaXpHzeY4Ho3nNKObmhXmK3UTdg" type="text/javascript"></script>
<script src="googlemap.js"></script>
<?php 
}
else{
?>
<!-- baidu map api --> 
<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true&amp;key=ABQIAAAAMhaFw2aLvuJCNheXgJ1cnxTwr-LwzND12vMgSpcEZrCrX-deORRMaXpHzeY4Ho3nNKObmhXmK3UTdg" type="text/javascript"></script>
<script src="baidumap.js"></script>
<?php }?>

<script>
var data=[];
<?php 
	$city=$_REQUEST["city"];
	if($city)
		echo 'var cityurl="&city='.$city.'";';
	else
		echo 'var cityurl="";';
?>
function date() {
    var a, c, d;
    var b = new Date();
    a = b.getHours();
    c = b.getMinutes();
    d = b.getSeconds();
    b = a + ":" + c + ":" + d;
    return b
}

var markerManager=function(map){
	this.map=map;
	this.markers=[];
	this.markerInd=0;

	this.add=function(html,lat,lng){
		var marid=this.map.addMarker(html,lat,lng);
		this.markers.push(marid);
	};
	this.showNextInfo=function() {
		if(this.markerInd >= this.markers.length) this.markerInd=0; 
		
		var mid=this.markers[this.markerInd];
		this.map.showInfo(mid);

		this.markerInd++;
	}
};

var myMap=new MapObject();
var myManager=new markerManager(myMap);
var timerid=null;
 
function showTuan(reload) {
	var url="getdeal.php?t="+Math.random()+'&'+cityurl;
	if(reload) url +='&act=reload';

	ajax(url,"",function(content){
		//alert(content);
		eval("data="+content);
		for(var i=0;i<data.length;i++){
			var deal=data[i];
			eval("var addr="+deal.address);	

			for(var ii=0;ii<addr.length;ii++){
				var addr2=addr[ii];
				deal.division_lat=addr2.lat;
				deal.division_lng=addr2.lng;
				deal.addr=addr2.addr;

				var h = "<div class='deal'><p class='dealImg'><a href='" + deal.deal_url + "'target='_blank'><img src=" + deal.small_image_url + " /></a></p><div class='dealTxt'><p><a href='" + deal.vendor_website_url + "'target='_blank'>" + deal.vendor_name + "</a>:" +deal.title + "...</p><p class='ft'>已有" + deal.quantity_sold + "人购买&nbsp;&nbsp;结束时间：" + deal.end_date + "</p><p>"+deal.addr+"</p></div></div>";
				myManager.add(h,deal.division_lat,deal.division_lng);
			}
		}
		timerid=setInterval('myManager.showNextInfo()',5000);
	});
} 
	var ol=window.onload;
window.onload=function(){
	ol();
 
    var a = document.body.clientHeight && document.documentElement.clientHeight;
    $("#Gmap").css("height",a);
    myMap.initMap();
    showTuan();
    $("#refresh").click(function() {
        showTuan(true);
        return false
    })
};
 
</script> 
 
</body> 
</html>