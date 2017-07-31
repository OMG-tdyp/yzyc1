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
	const tmpbtn = $(".result span");
	// document.addEventListener("touchmove", function(event) {
	// 	event.preventDefault();
	// },false);
	// const btnnumber = $(".number");
	// $.each(btnnumber,function(k,v) {
	// 	btnnumber.eq(k).swipe(function() {
	// 		alert($(this).html())
	// 	})
	// })

	$(".number").on("click",function() {
		$(this).addClass('current').siblings().removeClass('current');
		const num = $(this).html();
		num1 = parseInt((0 + num1) * 10) + num;
		tmpbtn.html(num1);
	})
}());