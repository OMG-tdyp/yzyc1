(function() {
	"use strict";
	var swiper = new Swiper('.swiper-container',{
		pagination: '.swiper-pagination'
	});

	$(".enter").on("click",function() {
		$(".swiper-container").remove();
		$(".main-content").show("slow");
	});

	var num1 = 0;
	var num2;
	var tmp1;
	var tmp2;
	var tmpop = "＝";
	var status = 0;//0：还在一次计数中 1：重新开始计数
	var start = 0;//0：没选取过数字 1：选取过数字
	const numbtn = $(".number");//数字按钮
	const tmpbtn = $(".result span");//显示结果区
	const opbtn = $(".operator");//运算符按钮
	var defaultNum = localStorage.getItem("default");
	defaultNum = defaultNum || 0;
	(defaultNum === "错误") ? initNum(0) : initNum(1);

	//本地存储，默认显示
	function initNum(flag) {
		(flag === 0) ? tmpbtn.html(defaultNum) : tmpbtn.html(parseInt(defaultNum));
	}
	//关闭刷新页面时保存当前值
	window.onbeforeunload = (e) => {
		localStorage.setItem("default",tmpbtn.html());
	}

	//显示当前数字
	function nowNum() {
		const self = $(this);
		start = 1;
		opbtn.removeClass('active');
		(status === 0) ? count1(self) : count2(self);
	}

	//计算数字1
	var count1 = (selector) => {
		selector.addClass('current').siblings().removeClass('current');
		const num = selector.html();
		num1 = num1 * 10 + parseInt(num);
		tmpbtn.html(num1);
	}

	//计算数字2
	var count2 = (selector) => {
		selector.addClass('current').siblings().removeClass('current');
		const num = selector.html();
		num2 = num2 * 10 + parseInt(num);
		tmpbtn.html(num2);
	}

	//使手机支持滑动事件
	document.addEventListener("touchmove", function(event) {
		event.preventDefault();
	},false);

	$.each(numbtn,function(k,v) {
		numbtn.eq(k).swipe(nowNum);//滑动添加数字
		numbtn.eq(k).on("click",nowNum);//点击添加数字
	});

	//清零
	$(".clear").on("click",function() {
		localStorage.setItem("default",0);
		start = 0;
		status = 0;
		tmp1 = 0;
		tmp2 = 0;
		num1 = 0;
		num2 = 0;
		tmpbtn.html(tmp1);
		numbtn.removeClass('current');
		opbtn.removeClass('active');
	});

	//加法
	var addition = (a,b) => {
		let n;
		(a === "错误" || b === "错误") ? n = "错误" : n = a + b;
		return n;
	}
	//减法
	var subtraction = (a,b) => {
		let n;
		(a === "错误" || b === "错误") ? n = "错误" : n = a - b;
		return n;
	}
	//乘法
	var multiplication = (a,b) => {
		let n;
		b = b || 1;
		(a === "错误" || b === "错误") ? n = "错误" : n = a * b;
		return n;
	}
	//除法
	var division = (a,b) => {
		let n;
		(start === 0) ? n = 0 : (b = b || 1,(b === 0 || a === "错误" || b === "错误") ? n = "错误" : n = a / b);
		return n;		
	}
	//等于
	var equal = (a,b) => {
		let n = tmpbtn.html();
		(n === "错误") ? "" : n = parseInt(n);
		return n;
	}

	//点击运算符
	opbtn.on("click",function() {
		tmp1 = num1;
		switch(tmpop) {
			case "＋":
				num1 = addition(tmp1,num2);
				break;
			case "－":
				num1 = subtraction(tmp1,num2);
				break;
			case "×":
				num1 = multiplication(tmp1,num2);
				break;
			case "÷":
				num1 = division(tmp1,num2);
				break;
			case "＝":
				num1 = equal(tmp1,num2);
				break;
		}	
		tmpbtn.html(num1);	
		num2 = 0;
		numbtn.removeClass('current');
		$(this).addClass('active').siblings().removeClass('active');
		const type = $(this).html();
		tmpop = type; 
		status = 1;		
	});
}());