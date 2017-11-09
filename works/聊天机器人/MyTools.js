/**
 * Created by hxsd on 2017/4/6.
 */
class MyTools {
    constructor() {

    }

    //自制滚动条
    static createScroll(box, con, scroll, wheelSpeed = 20, scrollBoxColor = '#343434', scrollBoxClickColor = '#e0e0e0') {
        if (con.offsetHeight<box.offsetHeight){
            scroll.style.display = 'none';
        }else {
            scroll.style.display = 'block';
            scroll.style.height = box.offsetHeight/con.offsetHeight*box.offsetHeight;
        }
        scroll.addEventListener('mousedown', onDown); //滚动条监听鼠标按下
        con.addEventListener('mousewheel', onWheel);//内容区域监听滚轮事件
        let startY = 0;
        function onDown(e) {
            scroll.style.background = scrollBoxClickColor;
            startY = e.offsetY; //鼠标按下事件触发，鼠标按下位置到当前元素上端的Y坐标
            document.addEventListener('mousemove', onMove);//监听鼠标移动
            document.addEventListener('mouseup', onUp);//监听鼠标抬起
        }
        function onMove(e) {
            if ((e.clientY - startY - box.offsetTop) < 0) { //限制滚动条移动区域
                scroll.style.top = 0;
                con.style.top = 0;
            } else if ((e.clientY - startY - box.offsetTop) > box.offsetHeight - scroll.offsetHeight) {//限制滚动条移动区域
                scroll.style.top = box.offsetHeight - scroll.offsetHeight + 'px';
                con.style.top = -(con.offsetHeight - box.offsetHeight) + 'px';
            } else {
                //鼠标到浏览器上端的距离 - 鼠标按下时到当前元素上端的距离 - 滚动条上端到浏览器上端的距离 == 滚动条滚动的距离
                scroll.style.top = e.clientY - startY - box.offsetTop + 'px';
                con.style.top = -(con.offsetHeight - box.offsetHeight) / (box.offsetHeight - scroll.offsetHeight) * (e.clientY - startY - box.offsetTop) + 'px';
                //计算原理：先求出滚动条每滚动一像素，相应的内容区域移动多少像素，再乘以滚动条滚动距离
                //用内容区域可滚动的范围 除以  滚动条滚动的范围
            }
        }
        //滚轮事件
        function onWheel(e) {
            // console.log(e.wheelDelta);
            let wheel = parseFloat(scroll.style.top) || 0;//绑定鼠标移动滚动条后，滚动条位置
            wheel += -(box.offsetHeight - scroll.offsetHeight) / e.wheelDelta * wheelSpeed;//计算滚动条，根据滚轮滑动一次的距离，计算控制滚轮每次滑动 ，滚动条滑动20,每次20叠加给wheel
            // console.log(wheel);
            if (wheel < 0) {//控制滚轮滑动后，滚动条的上限和下限
                wheel = 0;
            } else if (wheel > box.offsetHeight - scroll.offsetHeight) {
                wheel = box.offsetHeight - scroll.offsetHeight;
            }
            scroll.style.top = wheel + 'px';

            con.style.top = -(con.offsetHeight - box.offsetHeight) / (box.offsetHeight - scroll.offsetHeight) * wheel + 'px';
            //    此处同理鼠标点击滚动条
        }
        function onUp(e) { //移除监听
            scroll.style.background = scrollBoxColor;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        }
    }

    //复选框全选，反选
    static createCheckAll(inputBoxId, allBtnId, otherBtnId = null) {
        let myDiv = document.getElementById(inputBoxId);//包含input的父元素
        let checkbox = myDiv.getElementsByTagName('input');//input数组
        let btn = document.getElementById(allBtnId);//全选按钮
        if (otherBtnId != null) {
            let btn2 = document.getElementById(otherBtnId);//反选按钮
            //反选
            btn2.onclick = function () {
                for (let i = 0; i < checkbox.length; i++) {
                    if (checkbox[i].checked != true) {
                        checkbox[i].checked = true;
                    } else {
                        checkbox[i].checked = false;
                    }
                }
                //反选后，改变当前选中数量
                n = checkbox.length - n;
            };
        }

        //全选或取消
        let n = 0;//表示复选框选中的数量
        let count = false;//表示全选按钮状态

        btn.onclick = function () {
            //当复选框全选中 ，让全选按钮改变状态
            if (n == checkbox.length) {
                count = true;
            } else {
                count = false;
            }

            //判断状态，实现功能
            if (count == false) {
                for (let i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = true;//全选中
                    n = checkbox.length;
                }
                count = !count;
            } else {
                for (let i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = false;//全不选
                    n = 0;
                }
                count = !count;
            }
        };

        //用户点击复选框后，复选框选中数量
        for (let j = 0; j < checkbox.length; j++) {
            checkbox[j].onclick = function () {
                if (this.checked == true) {
                    n++;
                } else {
                    n--;
                }
            }
        }

        // if (n == checkbox.length){
        //     btn.checked = true;
        // }else {
        //     btn.checked = false;
        // }


    }

    //返回顶部
    static goTop(scrollIconId,iconFadeTop = 500,isTop = true,scrollSpeed = null) {
        $(function () {
            if (isTop)$(window).scrollTop(0);//刷新页面滚动条默认顶部
        });
        let oTop = $('#'+scrollIconId);//a标签
        document.addEventListener('scroll', function () {//动态监听滚动事件
            if ($(window).scrollTop() > iconFadeTop) {//动态获取滚动条位置，控制按钮出现
                oTop.fadeIn();
            } else {
                oTop.fadeOut();
            }
        });

        oTop.click(function () {//点击 返回顶部
            $(document.documentElement).animate({'scrollTop': '0'},scrollSpeed);//IE
            $(document.body).animate({'scrollTop': '0'},scrollSpeed);//谷歌
        })
    }
}