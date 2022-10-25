$(document).ready(function() {
	
	$("#select").val($("#rara").val());
	
	CKEDITOR.replace("con", {
	resize_enabled : false,
	language : "ko",
	enterMode : "2",
	height : 450,
	});
	
	$(".reg").on("click",function() {
		if ($(".poPup2").css("display") == "block") {
			$(".poPup2").hide();
		} else if ($(".poPup2").css("display") == "none") {
			$(".poPup2").show();
		}
	});
	
	    $("#insertBtn").on("click",function() {
		$("#con").val(CKEDITOR.instances['con'].getData());
        var params = $("#actionForm").serialize();
        if($.trim($("#title").val()) == "") {
            alert("제목를 입력하세요.", function() {
			$(".poPup2").hide();
            $("#title").focus();
            });
         }else if($.trim($("#con").val()) == "") {
        	  alert("내용을 입력하세요", function(){
				  $(".poPup2").hide();
                  $("#con").focus();
                  });
         }else
		         $.ajax({
		            url : "AFAQAction/update", // 경로
		            type : "POST", 
		            dataType : "json", 
		            data : params, 
		            success : function(res) {
		               switch(res.msg){
		               case "success" :
		            	   location.href = "AFAQList";
		            	   break;
		               case "fail" :
		            	   alert("알림", "등록에 실패하였습니다.");
		            	   break;
		               case "error" :
		            	   alert("알림", "등록 중 문제가 발생하였습니다.");
		            	   break;
		               }
		            },
		            error : function(request, status, error){ 
		               console.log(request.responseText); 
		            } 
		         });
         });

	


});