var cnt = 0;

$(document).ready(function(){
	$("html").on("click", function(e) {
		if($(e.target).is(".icon-right") && cnt < 5) {
			cnt++;
			$(".brunch").animate({
				marginLeft:"-=800px"
			}, 100);
		}
		else if($(e.target).is(".icon-left") && cnt > 0) {
			cnt--;
			$(".brunch").animate({
				marginLeft:"+=800px"
			}, 100);
		}
	})
	
	$("#pic0").on("click", function(){
    	location.href = "mainPageDetail";
    });
	$(".logo2").on("click", function(){
    	location.href = "MainPage.html";
    });
	$(".elements_hel").on("click", function() {
		location.href = "MainPage.html";
	});
	$(".elements_food").on("click", function() {
		location.href = "HealthCarePage.html";
	});

});