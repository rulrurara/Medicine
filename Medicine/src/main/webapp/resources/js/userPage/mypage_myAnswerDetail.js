$(document).ready(function(){
   $("#backBtn").on("click", function() {
	  location.href = "MyPageAnswer";
   });
   $(".updateBtn").on("click",function() {
	makePopup({
			bg : true,
			bgClose : false,
			title : "수정",
			contents : "수정하시겠습니까?",
			draggable : true,
			buttons : [{
				name : "예",
				func:function() {
						var params = $("#actionForm").serialize();
				        $.ajax({
				       	 url : "answerAction/update",
				       	 type : "POST",
				       	 dateType : "json",
				       	 data : params,
				       	 success : function(res){
				       		 console.log(res);
				       		 switch (res.msg) {
								case "success":
									closePopup();
									location.href = "MyPageAnswer";
									break;
								case "failed":
									makeAlert("알림","등록에 실패했습니다.");
									break;
								case "error" :
									makeAlert("알림","등록 중 문제가 발생했습니다.");
									break;
								}
				       	 },
				       	 error : function(request, status , error){
				       		 console.log(request.responseText);
				       	 }
				        })
				}
			}, {
				name : "아니오"
			}]
		});
	  });
	   $(".deleteBtn").on("click",function() {
			makePopup({
				bg : true,
				bgClose : false,
				title : "삭제",
				contents : "해당 문의를 삭제하시겠습니까?",
				draggable : true,
				buttons : [{
					name : "예",
					func:function() {
						var params = $("#actionForm").serialize();
				        $.ajax({
				       	 url : "answerAction/delete",
				       	 type : "POST",
				       	 dateType : "json",
				       	 data : params,
				       	 success : function(res){
				       		 console.log(res);
				       		 switch (res.msg) {
								case "success":
									closePopup();
									location.href = "MyPageAnswer";
									break;
								case "failed":
									makeAlert("알림","등록에 실패했습니다.");
									break;
								case "error" :
									makeAlert("알림","등록 중 문제가 발생했습니다.");
									break;
								}
				       	 },
				       	 error : function(request, status , error){
				       		 console.log(request.responseText);
				       	 }
				        })
					}
				}, {
					name : "아니오"
				}]
			});
		});
});