$(document).ready(function(){
	$("#resetBtn").on("click", function() {
		$("#productName").val("");
		$("#companyName").val("");
		$("#ingredientName").val("");
	});
	//검색버튼 클릭시 해당 검색어로 입력된 상태로 페이지이동
	
	//제품명 검색
	$(".searchPN").on("click", function() {
		var pnVal = $(".searchTxt").val();
		$("#searchGbn").val("1");
		var searchVal = $("#searchGbn").val();
		$("#actionForm").attr("action", "medicineInfoList");
		$("#actionForm").submit();
	});
	//업체명 검색
	$(".searchCN").on("click", function() {
		var pnVal = $(".searchTxt2").val();
		$("#searchGbn").val("2");
		var searchVal = $("#searchGbn").val();
		$("#actionForm").attr("action", "medicineInfoList");
		$("#actionForm").submit();
	});
	//성분명 검색
	$(".searchIN").on("click", function() {
		var pnVal = $(".searchTxt3").val();
		$("#searchGbn").val("3");
		var searchVal = $("#searchGbn").val();
		$("#actionForm").attr("action", "medicineInfoList");
		$("#actionForm").submit();
	});
});