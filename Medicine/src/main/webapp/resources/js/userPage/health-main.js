$(document).ready(function(){
	var cnt=0;
	$(".back").on("click",function(){
		
		if(!$(".pic-all").is(":animated") ){	
		cnt++;
		}
		
		$.ajax({
		url : "healthMainAjax", 
		type : "post", 
		dataType : "json", 
		success : function(res) {
		if(cnt==1){
		if(!$(".pic-all").is(":animated") ){
			$(".back").css("background-color","#5561C7");
			$(".top_header").css("background-color","#5561C7");
			$(".text0").text(res.list[1].TITLE);
			$(".text2").text(res.list[1].CON);
			$(".pic-all").animate({
				left:"-=1200px"
			},1000,"easeOutExpo");
		}}
		else if(cnt==2){
			
		if(!$(".pic-all").is(":animated") ){
			$(".back").css("background-color","#D26A51");
			$(".top_header").css("background-color","#D26A51");
			$(".text0").text(res.list[2].TITLE);
			$(".text2").text(res.list[2].CON);
			$(".pic-all").animate({
				left:"-=1200px"
			},1000,"easeOutExpo");
		}}
		else if(cnt==3){
		if(!$(".pic-all").is(":animated") ){
			$(".back").css("background-color","#ABA35A");
			$(".top_header").css("background-color","#ABA35A");
			$(".text0").text(res.list[3].TITLE);
			$(".text2").text(res.list[3].CON);
			$(".pic-all").animate({
				left:"-=1200px"
			},1000,"easeOutExpo");
		}}
		else if(cnt>=4){
			cnt=0;
		if(!$(".pic-all").is(":animated") ){
			$(".back").css("background-color","#5d9061");
			$(".top_header").css("background-color","#5d9061");
			$(".text0").text(res.list[0].TITLE);
			$(".text2").text(res.list[0].CON);
			$(".pic-all").animate({
				left:"0px"
			},1000,"easeOutExpo");
		}}
		
		
		},
		error : function(request, status, error) { 
			console.log(request.responseText) 
		}
		})
	});
	
	
	$("#icon1").on("click", function() {
		location.href = "MediHealthInfo";
	});
	$("#icon2").on("click", function() {
		location.href = "MedihealthCal";
	});
	$("#icon3").on("click", function() {
		location.href = "MediHealthReport";
	});
	
});