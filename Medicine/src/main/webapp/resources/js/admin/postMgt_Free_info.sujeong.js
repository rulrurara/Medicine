$(document).ready(function() {
	
	CKEDITOR.replace("nn", {
	resize_enabled : false,
	language : "ko",
	enterMode : "2",
	width : 1350,
	height : 450,
	});
	$(".logo2").on("click", function(){
		location.href = "postMgt_Free.html";
	});


});