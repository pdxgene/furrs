function init(mapid){
	var map = L.mapbox.map('map', mapid);
	getIssues(map);
}


function getIssues(map){
	var Issue = Parse.Object.extend("Issue");
	var query = new Parse.Query(Issue);
	query.find({
	    success:function(results) {
	            console.log("Total: "+results.length);
				var issueList = "";
				for (var i = 0; i < results.length; i++) { 
				    var object = results[i];
//				      alert(object.id + ' - ' + object.get('IssueType') + ' - ' + object.get('Latitude') + ' - ' + object.get('Longitude'));
					issueList += '<a href="#" alt="' + object.id + ': ' + object.get('Latitude') + ', ' + object.get('Longitude') + '">' + object.get('IssueType') + '<br/>';
					addMarker(map,object.get('IssueType'),object.get('Description'),object.get('Longitude'),object.get('Latitude'),object.get('Photo').url());
				}
				document.getElementById("left").innerHTML = issueList;
			},
	        error:function(error) {
	        	alert("Error when getting objects!");
	        }
    });
}


function addMarker(map,title,description,lng,lat,photourl){
	L.mapbox.featureLayer({
	    // this feature is in the GeoJSON format: see geojson.org
	    // for the full specification
	    type: 'Feature',
	    geometry: {
	        type: 'Point',
	        // coordinates here are in longitude, latitude order because
	        // x, y is the standard for GeoJSON and many formats
	        coordinates: [lng,lat]
	    },
	    properties: {
	        title: title,
	        description: description + '<br/><br/><a href="'+photourl+'" target="_blank">View Photo (new window)</a>',
	        // one can customize markers by adding simplestyle properties
	        // http://mapbox.com/developers/simplestyle/
	        'marker-size': 'large',
	        'marker-color': '#f0a'
	    }
	}).addTo(map);
}
