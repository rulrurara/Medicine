$(document).ready(function() {
   $("#listBtn").on("click", function(){
      $("#actionForm").attr("action", "AOneInfo");
      $("#actionForm").submit();
   });
   $(".reg").on("click",function() {
            if ($(".poPup2").css("display") == "block") {
               $(".poPup2").hide();
            } else if ($(".poPup2").css("display") == "none") {
               $(".poPup2").show();
            }
         });
    $(".No2").on("click", function(){
		 $(".poPup2").hide();
	});   
   	$("#insertBtn").on("click", function(){
		 var params = $("#actionForm").serialize();
         $.ajax({
        	 url : "AOAction/update",
        	 type : "POST",
        	 dateType : "json",
        	 data : params,
        	 success : function(res){
				console.log(res);
        		 switch (res.msg) {
				case "success":
					location.href = "AOneList";
					break;
				case "fail":
					alert("알림");
					break;
				case "error" :
					alert("알림");
					break;
				}
        	 },
        	 error : function(request, status , error){
        		 console.log(request.responseText);
        	 }
         })

	});	  
});