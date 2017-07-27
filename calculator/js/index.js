(function() {
	"use strict";
	var swiper = new Swiper('.swiper-container',{
		pagination: '.swiper-pagination'
	});

	$(".enter").on("click",function() {
		$(".swiper-container").remove();
		$(".main-content").show("slow");
	});

	$(".number").on("click",function() {
		$(this).css({"background":"#B2B2B2"});
	});
}());