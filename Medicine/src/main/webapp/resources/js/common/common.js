//input type = number - 최대길이 공통 조정함수
function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }
}

//다 그리면
$(document).ready(function(){
	 $(".menu").on("click",function(){
		$(".bar").animate({
		marginLeft:"0px"
		}, 100)
	});
	 
	$("html").on("click", function(e) {
		if(!$(e.target).is(".menu") && !$(e.target).is(".bar") && !$(e.target).parent().is(".bar") 
				&& !$(e.target).parent().parent().is(".bar")
				&& !$(e.target).parent().parent().parent().is(".bar")
				&& !$(e.target).parent().parent().parent().parent().is(".bar")) {
			$(".bar").animate({
				marginLeft:"-300px"
			}, 100);
		}
	});
	
	$("#resetBtn").on("click", function() {
		$("#productName").val("");
		$("#companyName").val("");
		$("#ingredientName").val("");
	});
	
	$(".menuLoginBtn").on("click", function() {
		location.href="MediLogin";
	});
	$(".menuNewAccount").on("click", function() {
		location.href="memReg";
	});
	
	$(".menuLogoutBtn").on("click", function() {
		location.href="MediLogout";
	});
	
	$(".medicine_Info").on("click", function() {
			location.href = "medicineInfoMain";
	});
		
	$(".health_Mgt").on("click", function() {
		location.href = "MediHealthMain";
	});
	$(".medicine_Compare").on("click", function() {
		location.href = "MediCompare";
	});
	$(".freeBoard").on("click", function() {
		location.href = "MediFreeList";
	});
	$(".service_center").on("click", function() {
		location.href="MediServiceFaq";
	});
	$(".mypage").on("click", function(){
		location.href = "MyPage";
	});
	
	$(".logo2").on("click", function(){
		location.href = "MediMain";
	});
	$(".homepage_name").on("click", function(){
		location.href = "MediMain";
	});
	

});