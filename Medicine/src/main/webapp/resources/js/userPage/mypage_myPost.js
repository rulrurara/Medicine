$(document).ready(function() {
	$("tbody").on("click","tr",function(){
		$("#num").val($(this).attr("num"));
		
		$("#actionForm").attr("action","MediFreeDetail");
		$("#actionForm").submit();
	});
	$(".listBtn").on("click", function() {
		location.href = "MyPage";
	});
});