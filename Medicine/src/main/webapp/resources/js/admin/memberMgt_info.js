$(document).ready(function(){

    $(".regsujeong").on("click",function(){
      $("#actionForm").attr("action","memsujeong");
		$("#actionForm").submit();
   });
    $(".del").on("click",function(){
      $("#actionForm").attr("action","memberMgtList");
	  $("#actionForm").submit();
   });
   
   $(".logo2").on("click", function(){
    	location.href = "memberMgt.html";
    });

});