window.onload = getMyLocation ; // function to be called when window loads 
var map ;
var service;

function getMyLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(displayLocation);
	}
	else{
		alert("No geolocation support");
	}
}

/* the function above checks for geoloaction support in our system.
 geolocation is the property in the navigotor object, which checks for geolocation support.
 If there is support, it calls the getCurrentPosition method of the navigator.gelocation object.
 This method does the work of getting the browsers location , it has handler function(here named displayLocation)*/


function displayLocation (position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	showMap(position.coords);
}

/* when the displayLocation is called the geolocation API passes it a position object, that contains information about the browsers location.
 we set the latitude and longitude values and then call the showMap function */

function showMap(coords){
	  googleLatAndLong= new google.maps.LatLng(coords.latitude,coords.longitude);
// this make a map object by using google's map constructor


	//adding some map options provided by google 

	 mapOptions = {
		zoom :16 ,
		center : googleLatAndLong,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

callmap();

}
function callmap(){

	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv,mapOptions);
	/* another constructor from google that takes and element and mapOptions and creates and returns a map object */

	var title ="my home" ;
    var content =" you are here ";
    
    addMarker1(map,googleLatAndLong,title,content);
    // this function adds a marker to our current location 

}


// the query parameter is got from our search text box 
function displayPlaces(map,googleLatAndLong,query) {
	var request ={
		location:googleLatAndLong,
		radius:'5000',
		query: query
	};
 
//Google Text Search API 
	service = new google.maps.places.PlacesService(map);
	service.textSearch(request,callback);
}

function callback(results,status){

	/* this is the handler for the search results,which gets a results array
	and a status as arguments, if the status is OK ,
	for every result it adds a marker on the map */

	if (status=="OK"){
		for(var i=0;i<results.length;i++){
			addMarker(map,results[i]);
		}
	}
}

function addMarker(map,result){
    
    //set marker options 
    var markerOptions={
        position : result.geometry.location,
        map : map ,
        title : result.name ,
        clickable : true
        
    };
    var marker = new google.maps.Marker(markerOptions);
	/*  another constructor from google that takes and element and options and creates and returns a marker object */

google.maps.event.addListener(marker,"click",function(){popup(result);});
}

function addMarker1(map,latlong,title,content){
    
    //set marker options 
    var markerOptions={
        position : latlong,
        map : map ,
        title : title ,
        clickable : true,
        animation:google.maps.Animation.BOUNCE
    };
	    
	var marker = new google.maps.Marker(markerOptions);
	/*  another constructor from google that takes and element and options and creates and returns a marker object */


}

// our getPlaces fxn is here ... suprising its so small :D 
function getPlace(){
//gets value from text box and then computes places

	var query=document.getElementById("textbox").value 
	callmap();
	displayPlaces(map,googleLatAndLong,query);	
}

function popup(result){

document.getElementById('myModalLabel').innerHTML=result.name;
document.getElementById('address').innerHTML="<b>Address :</b> " + result.formatted_address;
document.getElementById('phno').innerHTML="<b>Phone Number :</b>" + result.formatted_phone_number;
document.getElementById('website').innerHTML="<b>Website :</b>" + result.website;
document.getElementById('url').innerHTML="<b>Google URL :</b>" + result.url;
document.getElementById('types').innerHTML="<b>Types :</b>" + result.types;
$('#myModal').modal({
	backdrop:false,
	show:true
});
}
