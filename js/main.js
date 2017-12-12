/* Initialize Swiper */
 var swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
       // 如果需要前进后退按钮
	    navigation: {
	      nextEl: '.swiper-button-next',
	    },
       on:{
	      init: function(){
	        swiperAnimateCache(this); //隐藏动画元素 
	        swiperAnimate(this); //初始化完成开始动画
	      }, 
	      slideChangeTransitionEnd: function(){ 
	        swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
	      } 
	    }
    });
    

/*音乐处理开始*/
var music = document.getElementById("music");
var musicbg = document.querySelectorAll(".musicbg")[0];
var  musicImg = document.querySelectorAll(".musicImg")[0];
var audio = document.querySelector("audio");
var flag = 1;
music.onclick = function(){
	if(flag == 1){
		musicbg.style.display = "none";
		musicImg.style.animation = "none";
		audio.pause();//停止播放
		flag = 0;
	}else{
		musicbg.style.display = "block";
		musicImg.style.animation = "music 1s linear infinite";
		audio.play();//播放
		flag = 1;
	}
	
}
/*音乐处理结束*/




/*百度地图js*/
//创建和初始化地图函数：
    function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){ 
      map = new BMap.Map("map"); 
      map.centerAndZoom(new BMap.Point(116.578822,38.083109),17);
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }
    function addMapOverlay(){
      var markers = [
        {content:"双选会",title:"泊头职业学院",imageOffset: {width:0,height:3},position:{lat:38.081802,lng:116.577618}}
      ];
      for(var index = 0; index < markers.length; index++ ){
        var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
        var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
          imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
        })});
        var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
        var opts = {
          width: 200,
          title: markers[index].title,
          enableMessage: false
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
        marker.setLabel(label);
        addClickHandler(marker,infoWindow);
        map.addOverlay(marker);
      };
    }
    //向地图添加控件
    function addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
      map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:0});
      map.addControl(navControl);
      var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
      map.addControl(overviewControl);
    }
    var map;
      initMap();