

$(function(){
	//切换图片
	$("#presentPic li").mouseenter(function(){
		var _this=this;
		$(_this).addClass("ac").siblings().removeClass("ac")

		$("#magnify img").attr("src",$(this).find("img").attr("src"));
	});
	//选取型号
	var flag;
	$("#changeSize li").hover(function(){
		flag=$(this).hasClass("size_ac");
		if (!flag) {
			$(this).addClass("size_ac");
		}
	} ,function(){
		if (!flag) {
			$(this).removeClass("size_ac");
		}
	});
	$("#changeSize li").click(function(){
		$(this).addClass("size_ac").siblings().removeClass("size_ac");
		flag=true;
		var data=$(this).attr("data-size");
		$("#presentPic img").each(function(){
			if( $(this).attr("data-size")==data ){
				$(this).parent().parent().addClass("ac").siblings().removeClass("ac");
				$("#magnify img").attr("src",$(this).attr("src") );

			}
		});

	});
	//切换changeRecommend
	$("#changeRecommend li").click(function(){
		var index=$(this).index();
		$(this).addClass("ac").siblings().removeClass("ac");
		$("#changeRecommend .tab_box").eq(index).show().siblings().hide();
	}).hover();
	//增减产品
	$("#addProduct button").click(function(){
		var input=$(this).siblings("input");
		if ( $(this).index()=="1" ) {
				
			input.val( parseInt( input.val() )+1 );

		}else if(parseInt( input.val() ) >1 ){
			input.val( parseInt( input.val() )-1 );
		}
	});
	//放大镜
	function magnify($obj){
		//创建元素
		$obj.append("<span></span>");	
		var html=$('<div class="magnify_big"><img class="bigImg" src="'+$("#magnify img").prop("src")+'" /></div>')
		$obj.append(html);
		$obj.mouseenter(function(ev){
				$("#magnify span").show();
				$(".magnify_big").show();
				
				$(this).mousemove(function(ev){
					//获取鼠标的坐标
					// ev.pageX;
					// ev.pageY;

					//div1的坐标
					var offset=$(this).offset();
					//盒子尺寸
					var spanW=$("#magnify span").width();
					var spanH=$("#magnify span").height();
					var div1W=$obj.width();
					var div1H=$obj.height();

					var div2W=$(".magnify_big").width();
					var div2H=$(".magnify_big").height();

					//计算缩放比例
					var scaleL=spanW/div2W;
					var scaleH=spanH/div2H;
					//计算大图的尺寸
					$(".magnify_big img").css({"width":div1W/scaleL, "height":div1H/scaleH});

					//阴影距离盒子的位置
					l=ev.pageX-offset.left-spanW/2;	//鼠标-div1的左位移-Span宽度的一半
					h=ev.pageY-offset.top-spanH/2;
					// 可以移动的最大距离
					maxL=div1W-spanW;	//span父的宽-Span的宽
					maxH=div1H-spanH;
					console.log(h,maxH)
					if (l<0) {
						l=0;
					}else if (l>maxL) {
						l=maxL;
					}
					if (h<0) {
						h=0;
					}else if (h>maxH) {
						h=maxH;
					}

					// 移动span
					$("#magnify span").css({"left":l,"top":h});
		
					//计算div2的图片移动
					l=l/scaleL;
					h=h/scaleH;
					$(".magnify_big img").css({"left":-l, "top": -h});

				})
			}).mouseleave(function(){
				$("#magnify span").hide();
				$(".magnify_big").hide();
			});
	}
	magnify($("#magnify"));

});














