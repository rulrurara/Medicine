$(document).ready(function() {
	

$("#listBtn").on("click", function(){
      $("#actionForm").attr("action", "AFAQList");
      $("#actionForm").submit();
   });
   
   $("#updateBtn").on("click", function() {
	$("#actionForm").attr("action", "AFAQUpdate");
	$("#actionForm").submit();
});

});