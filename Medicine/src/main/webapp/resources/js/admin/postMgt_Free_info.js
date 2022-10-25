$(document).ready(function() {
	$("#goForm2").on("click", function(){
		      $("#actionForm").attr("action", "AFreeList");
		      $("#actionForm").submit();
		   });
		   
	 $("#deleteBtn").on("click", function(){
		      makePopup({
		         bg : true,
		         bgClose : true,
		         title : "알림",
		         contents : "삭제 하시겠습니까?",
		         buttons : [{
		            name : "삭제",
		            func:function() {
		            	var params = $("#actionForm").serialize();
				         $.ajax({
				            url : "AFAction/infodel", // 경로
				            type : "POST", 
				            dataType : "json", 
				            data : params, 
				            success : function(res) {
				               switch(res.msg){
				               case "success" :
				            	   location.href = "AFreeList";
				            	   break;
				               case "fail" :
				            	   makeAlert("알림", "삭제에 실패하였습니다.");
				            	   break;
				               case "error" :
				            	   makeAlert("알림", "삭제 중 문제가 발생하였습니다.");
				            	   break;
				               }
				            },
				            error : function(request, status, error){ 
				               console.log(request.responseText); 
				            } 
				         });
		            }
		         }, {
		            name : "취소"
		         }]
		      });
		   });

});