window.onload=function () {
	function (){
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
			myHtml+="<span ></span>";
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
			oImg[k].number=k;								//解决this目标切换
			oButton[k].onclick=oImg[k].onclick=function(){		
				index=parseInt(this.number); 				//index=k;不能生效,因为点击时k已经变为最大
				console.log(this);
				animation();
			}
							
		}

		//循环播放事件
		oPiclist.onmouseover=stop;
		oPiclist.onmouseout=play;
		function play() {
			timer= setInterval(function(){
				oBan_prev_move.onclick();
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

		}//循环逻辑结束
	}// 焦点图动画结束
}	



