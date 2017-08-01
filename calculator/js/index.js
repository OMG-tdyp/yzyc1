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
	var tmpop;
	var status = 0;//0：还在一次计数中 1：重新开始计数
	const numbtn = $(".number");//数字按钮
	const tmpbtn = $(".result span");//显示结果区
	const opbtn = $(".operator");//运算符按钮

	//显示当前数字
	function nowNum() {
		const self = $(this);
		(status === 0) ? count1(self) : count2(self);
	}

	//计算数字1
	function count1(selector) {
		selector.addClass('current').siblings().removeClass('current');
		const num = selector.html();
		num1 = num1 * 10 + parseInt(num);
		tmpbtn.html(num1);
	}

	//计算数字2
	function count2(selector) {
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
		tmp1 = 0;
		tmpbtn.html(tmp1);
		numbtn.removeClass('current');
		opbtn.removeClass('active');
	});

	//加法
	var addition = (a,b) => {
		a = a || 0;
		b = b || 0;
		return a + b;
	}
	//减法
	var subtraction = (a,b) => {
		a = a || 0;
		b = b || 0;
		return a - b;
	}
	//乘法
	var multiplication = (a,b) => {
		a = a || 0;
		b = b || 1;
		return a * b;
	}
	//除法
	var division = (a,b) => {
		a = a || 0;
		b = b || 1;
		return a / b;
	}
	//等于

	//点击运算符
	opbtn.on("click",function() {
		tmp1 = num1;
		(num2 === 0) ? '' : tmp2 = num2;
		numbtn.removeClass('current');
		$(this).addClass('active').siblings().removeClass('active');
		const type = $(this).html();
		tmpop = type; 
		status = 1;
		switch(type) {
			case "+":
				tmpbtn.html(addition(tmp1,tmp2));
				break;
			case "－":
				tmpbtn.html(subtraction(tmp1,tmp2));
				break;
			case "×":
				tmpbtn.html(multiplication(tmp1,tmp2));
				break;
			case "÷":
				tmpbtn.html(division(tmp1,tmp2));
				break;
		}
	});
}());