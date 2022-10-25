$(document).ready(function(){
   //상세보기 들어가기
   $("tbody").on("click","tr",function() {
	   $("#no").val($(this).attr("no"));
	   $("#actionForm").submit();
   });
   /* 목록버튼 클릭 시 */
	$(".listBtn").on("click", function() {
		history.back();
	});
	
});