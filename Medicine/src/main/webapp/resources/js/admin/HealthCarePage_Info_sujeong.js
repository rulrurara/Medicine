$(document).ready(function() {
		
	$(".reg").on("click",function() {
		if ($(".poPup2").css("display") == "block") {
			$(".poPup2").hide();
		} else if ($(".poPup2").css("display") == "none") {
			$(".poPup2").show();
		}
	});
     $("#fileDelBtn").on("click", function(){
		  // 기본 파일 내역 영역 제거
		 $(".attold").remove();
		  // 기존 값 제거
		 $("#att").val("");
		  // 파일 선택 영역 제공
		 $(".att").show();
  		});
$("#insertBtn").on("click", function() {
			// $.trim(값) -> 값 앞 뒤 공백제거
			if ($.trim($("#title").val()) == "") {
				alert("제목을 입력하세요", function() {
					$("#title").focus();
				});
			} else if ($.trim($("#con").val()) == "") {
				alert("내용을 입력하세요", function() {
					$("#con").focus();
				});
			}else{
		         // 1. 파일 업로드 -> 2. 업로드 파일명 취득 -> 3. 글 저장 
		         // 폼 객체 취득
		         var form = $("#actionForm");
		         
		         // // ajaxForm : form의 동작을 동기화에서 비동기화 방식으로 변경
		         form.ajaxForm({
		            success : function(res){ // 데이터 주고 받기 성공 시
		               if(res.result == "SUCCESS"){ // 파일 전송 성공
		                  // 올라간 파일이 존재한다면
		                  if(res.fileName.length > 0){ // 넘어오는 배열의 개수가 0보다 크다면
		                     $("#pic").val(res.fileName[0]); // 올라간 파일명 보관
		                  }
		               
		               //글 저장
		               var params = $("#actionForm").serialize();
		               $.ajax({
		                  url : "AHCPAction/update", // 경로
		                  type : "POST", 
		                  dataType : "json", 
		                  data : params, 
		                  success : function(res) {
		                  switch(res.msg) {
		                     case "success" :
								location.href = "AHCPList";
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
		                  
		               }else { // 문제 발생
		                  alert("알림", "파일 업로드에<br>문제가 발생하였습니다.");
		               }
		            },
		            error : function(){ // 에러 시
		               alert("알림", "파일 업로드에<br>문제가 발생하였습니다.");
		            }
		         }); // ajaxForm 설정 끝
		         
		         // ajaxForm 실행
		         form.submit();

		      }
		   });
		$("#listBtn").on("click", function(){
		      $("#actionForm").attr("action", "AHCPDetail");
		      $("#actionForm").submit();
		   });
});

