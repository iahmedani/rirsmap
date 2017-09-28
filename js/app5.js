// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1. 
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
					maxZoom: 20,
					subdomains:['mt0','mt1','mt2','mt3']
				});
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
					maxZoom: 20,
					subdomains:['mt0','mt1','mt2','mt3']
				});
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
					maxZoom: 20,
					subdomains:['mt0','mt1','mt2','mt3']
				});
var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
					maxZoom: 20,
					subdomains:['mt0','mt1','mt2','mt3']
				});
var LeafIcon = L.Icon.extend({
                    options: {
                    shadowUrl: 'images/marker-shadow.png',
                    iconSize:     [28, 50],
                    shadowSize:   [32, 55],
                    iconAnchor:   [33, 55],
                    shadowAnchor: [28, 65],
                    popupAnchor:  [-3, -27]
                }});
 var options = {
        container_width     : "300px",
        container_maxHeight : "350px", 
        group_maxHeight     : "80px",
        exclusive           : true
    };
            var bing1 = new L.BingLayer("AvZ2Z8Jve41V_bnPTe2mw4Xi8YWTyj2eT87tSGSsezrYWiyaj0ldMaVdkyf8aik6", {type: 'Aerial'});
			var bing2 = new L.BingLayer("AvZ2Z8Jve41V_bnPTe2mw4Xi8YWTyj2eT87tSGSsezrYWiyaj0ldMaVdkyf8aik6", {type: 'Road'});

$.ajax({
    url:'http://me.wfp.org.pk:8003/rirsmap/php/data.php',
    method:'GET',
    dataType:'json',
    success: function (data){

                
                var pHigh = new L.LayerGroup();
				var pMedium = new L.LayerGroup();
				var pLow = new L.LayerGroup();
				var countHigh = [];
				var countMedium =[];
				var countLow =[];
                var actCMAM = new L.LayerGroup();
				var actFfaFood = new L.LayerGroup();
				var actFfaCash = new L.LayerGroup();
                var actRelief = new L.LayerGroup();
                var actSf = new L.LayerGroup();
                var actStp = new L.LayerGroup();
				var countCMAM = [];
				var countFfaFood =[];
				var countFfaCash =[];
                var countRelief = [];
				var countSf =[];
				var countStp =[];
                var statusOpen = new L.LayerGroup();
				var statusResolved = new L.LayerGroup();
				var statusClosed = new L.LayerGroup();
				var countOpen = [];
				var countResolved =[];
				var countClosed =[];
       for (i= 0; i< data.length; i++){
            var a = $.trim(data[i].priority);
            var b = $.trim(data[i].Activity);
            var c = $.trim(data[i].status);
            var myIconUrl;
                if (b.includes('FFT_Cash') || b.includes('FFA_Cash')){
                myIconUrl = 'images/ffaCash'+a+'.svg';
            } else if (b.includes('FFT_Food') || b.includes('FFA_Food')){
                myIconUrl = 'images/ffaFood'+a+'.svg';
            } else if (b.includes('CMAM')){
                myIconUrl = 'images/cmam'+a+'.svg';
            } else if (b.includes('SP')){
                myIconUrl = 'images/stp'+a+'.svg';
            } else if (b.includes('Relief')){
                myIconUrl = 'images/relief'+a+'.svg';
            } else {
                myIconUrl = 'images/sf'+a+'.svg';
            }
            var popup = '<table class="table table-bordered table-striped table-hover"><tr><th>Question:</th><th>Response:</th></tr>'+'<tr><td>Issue Number:</td><td>'+$.trim(data[i].number)+'</td></tr><tr><td>Issue Priority:</td><td>'+$.trim(data[i].priority)+'</td></td><tr><td> Main Catergory: </td><td>'+$.trim(data[i].IssueCategoty)+'</td></tr><tr><td> Sub Category:</td><td>'+$.trim(data[i].IssueSubCategoty)+'</td></td><tr><td> Description: </td><td>'+$.trim(data[i].Description)+'</td></tr><tr><td>Activity: </td><td>'+b+'</td></tr><tr><td> CP:</td><td>'+$.trim(data[i].CP)+'</td></tr><tr><td> Village/Location Name:</td><td>'+$.trim(data[i].Location)+'</td></tr><tr><td> Reported By:</td><td>'+$.trim(data[i].ReportedBy)+'</td></tr><tr><td> Assisgned To:</td><td>'+$.trim(data[i].AssignedTo)+'</td></tr><tr><td> Last Repondent:</td><td>'+$.trim(data[i].LastPersonResponded)+'</td></tr><tr><td> Current Status:</td><td>'+$.trim(data[i].status)+'</td></tr><tr><td> Reported On:</td><td>'+$.trim(data[i].created)+'</td></tr><tr><td> Last Updated On:</td><td>'+$.trim(data[i].lastupdate)+'</td></tr><tr><td> Link:</td><td><a href="http://me.wfp.org.pk:8003/its/scp/tickets.php?id='+$.trim(data[i].ticket_id+'"> RIRS Access Link</a></td></tr></table>');            
         var myIcon = new LeafIcon({iconUrl : myIconUrl});
           if (a.includes('High')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(pHigh).bindPopup(popup);
               countHigh.push(a);
           } else if (a.includes('Medium')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(pMedium).bindPopup(popup);
               countMedium.push(a);
           } else {
                L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(pLow).bindPopup(popup);
               countLow.push(a);
           }
           if (b.includes('FFT_Cash') || b.includes('FFA_Cash')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actFfaCash).bindPopup(popup);
               countFfaCash.push(b);
           } else if (b.includes('FFA_Food') || b.includes('FFT_Food')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actFfaFood).bindPopup(popup);
               countFfaFood.push(b);
           } else if (b.includes('Relief_')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actRelief).bindPopup(popup);
               countRelief.push(b);
           } else if (b.includes('CMAM')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actCMAM).bindPopup(popup);
               countCMAM.push(b);
           } else if (b.includes('SP')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actStp).bindPopup(popup);
               countStp.push(b);
           } else {
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actSf).bindPopup(popup);
               countSf.push(b);
           }
           if   (c.includes('Open')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(statusOpen).bindPopup(popup);
               countOpen.push(b);
           } else if (c.includes('Resolved')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(statusResolved).bindPopup(popup);
               countResolved.push(b);
           } else {
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(statusClosed).bindPopup(popup);
               countClosed.push(b);
           }
      
           
        }
        
        var priority = L.layerGroup([pHigh,pMedium,pLow]);
        var baseMaps = [
                        {
                            groupName: "Map Style",
                            expanded: false,
                            layers :{
                                "Hybrid": googleHybrid,
                                "Streets": googleStreets,
                                "Satelite": googleSat,
                                "Terain":googleTerrain
                            }
                        }
				];
        var overlays = [
                        {
                            groupName: "Priority",
                            expanded: false,
                            layers :{
                               "High": pHigh,
					           "Medium": pMedium,
					           "Low": pLow
                                
                            }
                        }, {
                            groupName: "Activity",
                            expanded: false,
                            layers :{
                               "CMAM": actCMAM,
					           "FFA Cash": actFfaCash,
					           "FFA Food": actFfaFood,
                                "School Feeding": actSf,
                                "Relief": actRelief,
                                "Stunting Prevention": actStp
                                
                            }
                        },{
                                    groupName: "Status",
                                    expanded: true,
                            layers :{
                               "Open": statusOpen,
					           "Resolved": statusResolved,
					           "Closed": statusClosed
                                
                            }
                        }
					
				];
       /* var overlayActivity = {
					"CMAM": actCMAM,
					"FFA Cash": actFfaCash,
					"FFA Food": actFfaFood,
                    "School Feeding": actSf,
                    "Relief": actRelief,
                    "Stunting Prevention": actStp
				};*/
        /* var overlayStatus = {
					"Open": statusOpen,
					"Resolved": statusResolved,
					"Closed": statusClosed
				};*/
/*        var overlayTest = {
            "Priority": overlayPriority,
            "Status": overlayStatus,
            "overlayActivity": overlayActivity
        };
       */ var map = L.map('map',{
            center: [29.8581239, 70.0426108],
            zoom:6.13 ,
            layers: [googleTerrain, statusOpen]
        });
        var control = L.Control.styledLayerControl(baseMaps, overlays, options);
    map.addControl(control);
        //var one = L.control.layers(baseMaps, overlayPriority).addTo(map);
        //var one = L.control.layers(overlayActivity, overlayStatus, overlayPriority).addTo(map);
        var legends = L.control({position: 'topleft'});
			legends.onAdd = function (map) {
				var div = L.DomUtil.create('div','info legends'),
					priorities = ['High', 'Medium', 'Low'],
					labels = [];
				 div.innerHTML = '<p><b>Priorities</b></p><p><i style="background:rgb(255,0,0)"></i>High ('+countHigh.length+')</p><p><i style="background:rgb(255,255,0)"></i>Medium ('+countMedium.length+')</p><p><i style="background:rgb(91,155,255)"></i>Low ('+countLow.length+')</p><p><b>Activity Icons</b></p><p><img class="images" src="images/cmam.png" ></img>CMAM ('+countCMAM.length+')</p><img class="images" src="images/sf.png" ></img>FFE ('+countSf.length+')</p><img class="images" src="images/relief.png" ></img>Relief ('+countRelief.length+')</p><img class="images" src="images/stp.png" ></img>Stunting Prev: ('+countStp.length+')</p><img class="images" src="images/cash.png" ></img>FFA Cash ('+countFfaCash.length+')</p><img class="images" src="images/food.png" ></img>FFA Food ('+countFfaFood.length+')</p><p><b>Summary - Status</b></p><p>Open: '+countOpen.length+'</p><p> Resolved: '+countResolved.length+'</p><p> Closed: '+countClosed.length+'</p>'+'<p><b><a target="_top" href="http://me.wfp.org.pk:8003/index.php/rirs-map" class="btn btn-default" role="button">Back</a><p><a href="http://me.wfp.org.pk:8003/its/scp/export.php" class="btn btn-default" role="button">Export to Excel</a>';
				
				return div;
				
			};
			legends.addTo(map);
		
    },
    error: function(status){
        console.log('Data not loaded');
    }
});
//var imran = $.getJSON('http://localhost/FinalMap/php/data.php','json');



