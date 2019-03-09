road_data={
    level : 13,//地图级别
    contentPoint:[116.387722,39.95127],//地图中心点/
    roadPoints:[{style:"solid",weight:5,color:"#0ff",opacity:0.4,points:["116.386392|39.954368","116.385674|39.948173","116.38553|39.946624","116.385818|39.943914","116.386177|39.941646","116.386464|39.939875","116.386536|39.939101","116.386321|39.938326","116.386249|39.93722","116.386249|39.937331"]}
		 ,{style:"solid",weight:4,color:"#f00",opacity:0.8,points:["116.386967|39.954257","116.389483|39.952985","116.391207|39.952266","116.392429|39.951602","116.393723|39.951049","116.393723|39.95116"]}
		 ,{style:"solid",weight:4,color:"#0ff",opacity:0.4,points:["116.393938|39.950939","116.396166|39.949334","116.397028|39.948726"]}
		 ,{style:"solid",weight:4,color:"#f00",opacity:0.6,points:["116.397172|39.94856","116.399472|39.947177","116.400909|39.947067","116.401843|39.946624","116.401915|39.946624"]}
		 ],
    lid:[{title:"下水道",content:"状况:良好<br/>水位:xxx",point:"116.386033|39.941756",isOpen:0,icon:{w:23,h:25,l:0,t:21,x:9,lb:12,img:"blue.ico"}}
	,{title:"xx路下水道1",content:"状况:拥堵<br/>水位：xxxx",point:"116.391351|39.952045",isOpen:1,icon:{w:23,h:25,l:69,t:21,x:9,lb:12,img:"red.ico"}}
	,{title:"xx路下水道:2",content:"状况：严重拥堵<br/>水位：xxxx",point:"116.399544|39.947233",isOpen:0,icon:{w:23,h:25,l:46,t:21,x:9,lb:12,img:"yellow.ico"}}]
		 
}

two_zhuti ={
    "styleJson":[
            {
                      "featureType": "poilabel",
                      "elementType": "all",
                      "stylers": {
                                "visibility": "off"
                      }
            },
            {
                      "featureType": "manmade",
                      "elementType": "all",
                      "stylers": {
                                "visibility": "off"
                      }
            },
            {
                      "featureType": "building",
                      "elementType": "all",
                      "stylers": {
                                "visibility": "off"
                      }
            }
  ]
  }

function initBaiduMap(road_data,containerId){

    //创建和初始化地图函数：
    function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMarker();//向地图中添加marker
        addPolyline();//向地图中添加线
    }
    
    //创建地图函数：
    function createMap(){
        var map = new BMap.Map(containerId);//在百度地图容器中创建一个地图
        var point = new BMap.Point(road_data.contentPoint[0],road_data.contentPoint[1]);//定义一个中心点坐标
        map.centerAndZoom(point,15);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
    }
    
    //地图事件设置函数：
    function setMapEvent(){
        map.setMapStyleV2(two_zhuti)
        map.enableDragging();//启用地图拖拽事件，默认启用(可不http://lbsyun.baidu.com/customv2/index.html
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启http://lbsyun.baidu.com/customv2/index.html不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }
    
    //地图控件添加函数：
    function addMapControl(){
        //向地图中添加缩放控件
	// var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_SMALL});
	// map.addControl(ctrl_nav);
    //     //向地图中添加缩略图控件
	// var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	// map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);
    }
    
    //标注点数组
    var markerArr = road_data.lid;
    //创建marker
    function addMarker(){
        for(var i=0;i<markerArr.length;i++){
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0,p1);
			var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point,{icon:iconImg});
			var iw = createInfoWindow(i);
			var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
			marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                        borderColor:"#808080",
                        color:"#333",
                        cursor:"pointer"
            });
			
			(function(){
				var index = i;
				var _iw = createInfoWindow(i);
				var _marker = marker;
				_marker.addEventListener("click",function(){
				    this.openInfoWindow(_iw);
			    });
			    _iw.addEventListener("open",function(){
				    _marker.getLabel().hide();
			    })
			    _iw.addEventListener("close",function(){
				    _marker.getLabel().show();
			    })
				label.addEventListener("click",function(){
				    _marker.openInfoWindow(_iw);
			    })
				if(!!json.isOpen){
					label.hide();
					_marker.openInfoWindow(_iw);
				}
			})()
        }
    }
    //创建InfoWindow
    function createInfoWindow(i){
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
        return iw;
    }
    //创建一个Icon
    function createIcon(json){
        var icon = new BMap.Icon(json.img, new BMap.Size(json.w,json.h))
        return icon;
    }
//标注线数组
    var plPoints = road_data.roadPoints;
    //向地图中添加线函数
    function addPolyline(){
		for(var i=0;i<plPoints.length;i++){
			var json = plPoints[i];
			var points = [];
			for(var j=0;j<json.points.length;j++){
				var p1 = json.points[j].split("|")[0];
				var p2 = json.points[j].split("|")[1];
				points.push(new BMap.Point(p1,p2));
			}
			var line = new BMap.Polyline(points,{strokeStyle:json.style,strokeWeight:json.weight,strokeColor:json.color,strokeOpacity:json.opacity});
			map.addOverlay(line);
		}
	}
    
    initMap();//创建和初始化地图
}