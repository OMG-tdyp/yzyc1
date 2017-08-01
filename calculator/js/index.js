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
	var num2 = 0;
	var tmp1;
	var tmp2;
	var tmpop = "＝";
	var status = 0;//0：还在一次计数中 1：重新开始计数
	var count = 0;//0：第一次点击运算符 1：非第一次点击运算符
	const numbtn = $(".number");//数字按钮
	const tmpbtn = $(".result span");//显示结果区
	const opbtn = $(".operator");//运算符按钮

	//显示当前数字
	function nowNum() {
		const self = $(this);
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
		status = 0;
		count = 0;
		tmp1 = 0;
		tmpbtn.html(tmp1);
		numbtn.removeClass('current');
		opbtn.removeClass('active');
	});

	//加法
	var addition = (a,b) => {
		a = a || 0;
		b = b || 0;
		let n;
		count = 1;
		(a === "错误" || b === "错误") ? n = "错误" : n = a + b;
		return n;
	}
	//减法
	var subtraction = (a,b) => {
		a = a || 0;
		b = b || 0;
		let n;
		count = 1;
		(a === "错误" || b === "错误") ? n = "错误" : n = a - b;
		return n;
	}
	//乘法
	var multiplication = (a,b) => {
		a = a || 0;
		b = b || 1;
		let n;
		count = 1;
		(a === "错误" || b === "错误") ? n = "错误" : n = a * b;
		return n;
	}
	//除法
	var division = (a,b) => {
		a = a || 0;
		b = b || 1;
		let n;
		count = 1;
		(b === 0 || a === "错误" || b === "错误") ? n = "错误" : n = a / b;
		return n;
	}
	//等于
	var equal = (a,b) => {
		a = a || 0;
		b = a;
		let n;
		count = 1;
		(a === "错误" || b === "错误") ? n = "错误" : n = b;
		return n;
	}

	//点击运算符
	opbtn.on("click",function() {
		tmp1 = num1;
		tmp2 = num2;
		switch(tmpop) {
			case "＋":
				num1 = addition(tmp1,tmp2);
				break;
			case "－":
				num1 = subtraction(tmp1,tmp2);
				break;
			case "×":
				num1 = multiplication(tmp1,tmp2);
				break;
			case "÷":
				num1 = division(tmp1,tmp2);
				break;
			case "＝":
				num1 = equal(tmp1,tmp2);
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