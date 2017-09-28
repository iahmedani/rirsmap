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
         var myIcon = new LeafIcon({iconUrl : myIconUrl});
           if (a.includes('High')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(pHigh);
               countHigh.push(a);
           } else if (a.includes('Medium')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(pMedium);
               countMedium.push(a);
           } else {
                L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(pLow);
               countLow.push(a);
           }
           if (b.includes('FFT_Cash') || b.includes('FFA_Cash')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actFfaCash);
               countFfaCash.push(b);
           } else if (b.includes('FFA_Food') || b.includes('FFT_Food')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actFfaFood);
               countFfaFood.push(b);
           } else if (b.includes('Relief_')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actRelief);
               countRelief.push(b);
           } else if (b.includes('CMAM')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actCMAM);
               countCMAM.push(b);
           } else if (b.includes('SP')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actStp);
               countStp.push(b);
           } else {
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(actSf);
               countSf.push(b);
           }
           if   (c.includes('Open')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(statusOpen);
               countOpen.push(b);
           } else if (c.includes('Resolved')){
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(statusResolved);
               countResolved.push(b);
           } else {
               L.marker([data[i].lattitude, data[i].longitude], {icon : myIcon} ).addTo(statusClosed);
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
                            expanded: true,
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
                                    expanded: false,
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
            layers: [googleTerrain, priority]
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
				 div.innerHTML = '<p><b>Priorities</b></p><p><i style="background:rgb(255,0,0)"></i>High ('+countHigh.length+')</p><p><i style="background:rgb(255,255,0)"></i>Medium ('+countMedium.length+')</p><p><i style="background:rgb(91,155,255)"></i>Low ('+countLow.length+')</p><p><b>Activity Icons</b></p><p><img class="images" src="images/cmam.png" ></img>CMAM ('+countCMAM.length+')</p><img class="images" src="images/sf.png" ></img>FFE ('+countSf.length+')</p><img class="images" src="images/relief.png" ></img>Relief ('+countRelief.length+')</p><img class="images" src="images/stp.png" ></img>Stunting Prev: ('+countStp.length+')</p><img class="images" src="images/cash.png" ></img>FFA Cash ('+countFfaCash.length+')</p><img class="images" src="images/food.png" ></img>FFA Food ('+countFfaFood.length+')</p><p><b>Summary - Status</b></p><p>Open: '+countOpen.length+'</p><p> Resolved: '+countResolved.length+'</p><p> Closed: '+countClosed.length+'</p>'+'<p><b>';
				
				return div;
				
			};
			legends.addTo(map);
		
    },
    error: function(status){
        console.log('Data not loaded');
    }
});
//var imran = $.getJSON('http://localhost/FinalMap/php/data.php','json');



