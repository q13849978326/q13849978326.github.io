
window.onload=function(){
	
	// 焦点图函数
	function focus(){
		// 焦点图动画-----------------------------------------
		// 获取盒子和图片
		var oPiclist=document.getElementById('piclist_move');
		var oImg=oPiclist.getElementsByTagName('img');
		var oBan_next_move=document.getElementById('ban_next_move');
		var oBan_prev_move=document.getElementById('ban_prev_move');
		var oBan_button_list=document.getElementById('ban_button_list');
		// 向Html文档添加并获取span标签,同时赋予第一个span_actlei
		var myHtml="";
		for (var i = 0; i < oImg.length; i++) {
			myHtml+="<span>"+(i+1)+"</span>";
		}
		oBan_button_list.innerHTML=myHtml;
		var oButton=oBan_button_list.getElementsByTagName('span');
		oButton[0].className='span_act';
		//初始化图片的类名排布。第一张显示
		oImg[0].className="img_act";
		oImg[1].className="img_next";
		oImg[oImg.length-1].className="img_prev";

		var index=0; 	//显示第i张图片
		var timer;		//计时器
		var interval=3000;	//计时器的速度

		//点击向后切换
		oBan_next_move.onclick=function () {
			index++;
			animation();
		}
		//点击向前切换
		oBan_prev_move.onclick=function () {
			index--;
			animation();
		}
		//点击按钮切换	
		
		for (var k = 0; k < oButton.length; k++) {
			oButton[k].number=k;
			oImg[k].number=k;
			oButton[k].onclick=oImg[k].onclick=function(){		
				index=parseInt(this.number); 				//index=k;不能生效,因为点击时k已经变为最大
				//console.log(this);
				animation();
			}
							
		}

		//循环播放事件
		oPiclist.onmouseover=stop;
		oPiclist.onmouseout=play;
		function play() {
			timer= setInterval(function(){
				oBan_next_move.onclick();
			},interval)
		}
		function stop() {
			clearInterval(timer);
		}
		play();

		//循环主逻辑
		function animation(){
			//首先判断传入的i是否超出范围
			if(index>oImg.length-1){
				index=0;
			} 
			if(index<0){
				index=oImg.length+index;
			} 
			//判断点击的是否是当前图片
			if (oImg[index].className=='img_act') {
					return;	
			}
			//清空图片和按钮的状态
			for (var j = 0; j < oImg.length; j++) {
				if(oImg[j].className=="img_act" ){
					oImg[j].className="";
				}
				if(oImg[j].className=="img_next" ){
					oImg[j].className="";
				}
				if(oImg[j].className=="img_prev" ){
					oImg[j].className="";
				}
				if (oButton[j].className=='span_act') {
					oButton[j].className='';			
				}
			}
			//改变图片和按钮为活动状态
			if(index==oImg.length-1){
				oImg[index].className="img_act";
				oImg[0].className="img_next";
				oImg[index-1].className="img_prev";
				oButton[index].className='span_act';
				index=-1;
			} else  if(index==0){
				oImg[index].className="img_act";
				oImg[index+1].className="img_next";
				oImg[oImg.length-1].className="img_prev";
				oButton[index].className='span_act';			
			} else{
				oImg[index].className="img_act";
				oImg[index+1].className="img_next";
				oImg[index-1].className="img_prev";
				oButton[index].className='span_act';
			}
		}
	// 焦点图动画结束--------------------------------------
	}
	
	//选项卡切换
	function toggleTab(obj){
		var oUl=obj.getElementsByClassName("but")[0];
		var aLi=oUl.getElementsByTagName("li");
		var aCont=obj.getElementsByClassName("contlist")[0].getElementsByClassName("contbox");
		var speed=3000;
		var n=0;//计时器变量					
		// <!--点击事件-->
		for (var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			var k;
			aLi[i].onclick=function(){
				k=this.index;
				for(var j=0;j<aLi.length;j++){
					aLi[j].className="";
					aCont[j].style.display="none";	
				}
				aCont[k].style.display="block";
				this.className="active";
				n=this.index;
			};
		}
		// <!--计时器-->
/*		var timer=setInterval(run,speed);
		function run(){
			n++;
			n%=aLi.length;
			aLi[n].onclick();
			
		}
		// <!--鼠标进入和离开-->
		obj.onmouseenter=function(){
			clearInterval(timer);
		};
		obj.onmouseleave=function(){
			timer=setInterval(run,speed);
		};
*/
	}
	
	//点击显示子菜单
	function showNav(){
		var oUl=document.getElementsByClassName("nav")[0];
		var aNav=oUl.getElementsByClassName("sub_nav");	
		var aLi=document.getElementById("nav_list").getElementsByTagName("li");
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aNav[i].index=i;
			var obj=aNav[i];
			aNav[i].onmouseover=aLi[i].onmouseover=function(){
				var t=this.index;
				aLi[t].className="active";
				if(aNav[t]){
					aNav[t].style.display="block";
				}
			};
			aNav[i].onmouseout=aLi[i].onmouseout=function(){
				var t=this.index;
				aLi[t].className="";
				if(aNav[t]){
					aNav[t].style.display="none";	
				}
			};
		}
	}

	// 执行函数焦点图/显示二级菜单/切换楼层tab
	var aWrap=document.getElementsByClassName("wrap");
	for (var i = 0; i < aWrap.length; i++) {
		toggleTab(aWrap[i]);
	};
	focus();
	showNav();
	
	//JQ函数扩展
	$.fn.extend({
		// 选项卡切换
		transformTab: function (tab){
			//console.log($(this));
			return	$(this).each(function (i) {
				var _this=$(this);
				_this.mouseenter(function () {
					//console.log(_this);
					_this.addClass("ac").siblings().removeClass("ac");
					$(tab).eq(i).show().siblings().hide();
				});
			});
		}
	});

	//鼠标悬停显示icon服务窗口
	var iconPanelFalg=true;
	$("#main_iconPanel>ul li").mouseenter(function(ev){
		var _this = $(ev.delegateTarget);
		var _text = _this.text();
		if(_text==="话费" || _text==="机票" || _text==="酒店" || _text==="游戏" ){
			if(iconPanelFalg ){
				$("#main_iconPanel_info").show().animate({top:28},300);
				_this.addClass("mouseenter").siblings().removeClass("mouseenter");
				var target="";
				switch(_text){
					case "话费":
						target=$(".Panel_telcharge");
					break;
					case "机票":
						target=$(".Panel_airticket");	
					break;
					case "酒店":
						target=$(".Panel_grogshop");	
					break;
					case "游戏":
						target=$(".Panel_game");	
					break;
					default: break;
				};
				target.show().siblings().not(".main_iconPanel_info_close").hide();
				//移动li
				$(".icon_list_head").animate({top: -40},300).css("position","relative");
			}
		}
	});
	$("#main_iconPanel>ul").mouseleave(function () {
		iconPanelFalg = true;
	});//鼠标事件
	//切换窗口信息
	$(".ul_wrap li").transformTab(".tabList");
	//点击关闭icon_info窗口
	$("#main_iconPanel_info_close").click(function (ev) {
		ev.preventDefault();
		iconPanelFalg = false;
		$(".icon_list_head").animate({top: -0},0).finish().removeClass("mouseenter");
		$(this).parent().animate({top:300},0).finish().hide();
	});	

	//楼层导航条
	var navbarFlag=true;	//点击是导航条不滚动
	$(window).scroll(function () {
		if (navbarFlag) {
			windowScrollFn();
		}
	});
	function windowScrollFn() {	//是否阻止导航条滚动，true为阻止
		console.log(1);
		var navBar=$("#floor_navbar");
		var windowScrollTop = $(window).scrollTop();
		if(windowScrollTop >= 1100){
			navBar.show();
			// console.log( $(document.body).scrollTop() );
			// console.log($(".floor").eq(0).offset().top );
			var currentId="qualitylife";
			$(".floor").each(function () {
				if (  windowScrollTop >= $(this).offset().top - 300 ) {
					currentId=$(this).attr("id");
				}
			});
			$('#floor_navbar a[href="#'+currentId+'"]').parent().addClass("ac").siblings().removeClass("ac");
		
		}else{
			navBar.hide();
		}
	}
		//点击跳转楼层
		//获取点击的href，根据$(id).offset().top改变$(window).scrollTop()
	$("#floor_navbar li").click(function () {
		navbarFlag = false;	
		$(this).addClass("ac").siblings().removeClass("ac");
		var clickHref=$(this).children().attr("href");
		var eleTop=$(clickHref).offset().top;
		var winTop=$(window).scrollTop();
		var speed=300;
		var step=Math.abs(eleTop-winTop)/(speed/30);
		var step= eleTop>winTop ? step : -step;
		//console.log(step,eleTop,winTop)
		var timer = setInterval(function () {
			winTop+=step;
			if ( Math.abs(eleTop-winTop)<=Math.abs(step)) {
				//console.log(winTop,eleTop,step);
				winTop=eleTop;
				clearInterval(timer);
				navbarFlag = true;
			}

			$(window).scrollTop(winTop);
		},30);
	});
		//阻止a链接的默认跳转
	$("#floor_navbar li a").click(function (ev) {
		ev.preventDefault();
	});
		//初始化
	windowScrollFn();
	
};//onload结束

















