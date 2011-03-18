
var MapObject=function(){

this.zoom = 13;
this.num = true;
this.dalay = 6000;
this.map = new GMap2(document.getElementById("Gmap"));
this.centerLat=30.593088;
this.centerLng=114.305172;
this.markers=[];

this.initMap=function(lat,lng) {
    lat=lat || this.centerLat;
    lng=lng || this.centerLng;
    
    this.map.setCenter(new GLatLng(lat,lng), this.zoom);
    this.map.enableScrollWheelZoom();
    this.map.addControl(new GLargeMapControl());
    this.map.addControl(new GOverviewMapControl());
    this.map.addControl(new GScaleControl())
};
this.addMarker=function(html,lat,lng) {//alert(lat+','+lng);
	var point = new GLatLng(lat,lng);
	var marker = new GMarker(point);
	this.map.addOverlay(marker);
	//map.removeOverlay(marker);
	  
	this.markers.push({marker:marker,html:html});
	var marid=this.markers.length-1;

	var self=this;
	GEvent.addListener(marker, "click", function() {
	    marker.openInfoWindowHtml(self.markers[marid].html);
  	});
	/*marker.bindInfoWindowHtml(html, {
		maxWdith: 100,
		noCloseOnClick: true
	});*/
	return marid;
};

this.showInfo=function(markerInd) {	
	var m=this.markers[markerInd];
	m.marker.openInfoWindowHtml(m.html, {
		maxWdith: 100,
		noCloseOnClick: true
	});
};
};