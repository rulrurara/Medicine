$(document).ready(function(){
	$("tbody").on("click","td",function() {
		location.href ="medicineInfo_detail.html";
	});
	/*$("#today_pw").on("keyup",function(){
		var pwLength = $("#today_pw").val().length;
		var pwVal = $("#today_pw").val();
		
		
	});*/
	
	//이메일 인증
		$(".certificationBtn").on("click", function() {
    		mailChk();
		});  	 
		
	//이메일 인증확인 버튼 클릭시
		$(".certificationBtn2").on("click", function() {
			certNumChk();
		});
	//이메일 변경 확인
		$(".changeEmailBtn").on("click",function(){
			 var params = $("#actionForm").serialize();
           $.ajax({
              url : "upDateAction/emailUpdate", //경로
              type : "POST", //전송방식
              dateType : "json", //데이터 형태
              data : params, //보낼 데이터
              success : function(res) { //성공했을 때 결과를 result에 받고 함수 실행
                 switch(res.msg) { //ATController -> ATAction컨트롤러의 msg값
                 case "success" :
                 	$("#emailList").val($("#user_Email").val());
                 	$(".popup_border_email").hide();
                 	alert("이메일이 변경되었습니다.");
                    break;
                 case "failed" :
                    makeAlert("알림","삭제에 실패했다!");
                    break;
                 case "error" :
                    makeAlert("알림","삭제 중 문제가 발생했다!");
                    break;
                 }
              },
              error : function(request,status,error) { //실패했을 때 함수 실행
                 console.log(request.responseText); //실패 상세내역
              }
           });
		});
	   $(".changePhoneBtn").on("click",function(){
		   var params = $("#PhoneForm").serialize();
           $.ajax({
              url : "upDateAction/update", //경로
              type : "POST", //전송방식
              dateType : "json", //데이터 형태
              data : params, //보낼 데이터
              success : function(res) { //성공했을 때 결과를 result에 받고 함수 실행
                 switch(res.msg) { //ATController -> ATAction컨트롤러의 msg값
                 case "success" :
                 	$("#phoneList").val($("#change_phone_check").val());
                 	$("#change_phone_check").val("");
                 	$("#change_phone").val("");
                 	$(".phone_check").html("");
                 	$(".phone_check2").html("");
                 	$(".popup_border_phone").hide();
                 	alert("전화번호가 변경되었습니다.");
                    break;
                 case "failed" :
                    makeAlert("알림","삭제에 실패했다!");
                    break;
                 case "error" :
                    makeAlert("알림","삭제 중 문제가 발생했다!");
                    break;
                 }
              },
              error : function(request,status,error) { //실패했을 때 함수 실행
                 console.log(request.responseText); //실패 상세내역
              }
           });
	   });
	$("#change_phone_check").on("keyup",function(){
		var phoneLength = $("#change_phone_check").val().length;
		var phoneVal = $("#change_phone_check").val();
		if(phoneLength < 11) {
				$("#phone_check").css("color", "red");
				$("#phone_check").html("전화번호는 - 제외 11글자를 입력해주세요.");
				//8글자 이상일때
			}else if(phoneLength >= 11) {
				$("#phone_check").css("color", "blue");
				$("#phone_check").html("사용 가능한 전화번호 입니다.");
			}		
	});
	$("#change_phone").keyup(function(){
		let pass1 =$("#change_phone_check").val();
		let pass2 =$("#change_phone").val();
		var phoneLength = $("#change_phone_check").val().length;
		if(phoneLength < 11) {
				$("#phone_check2").css("color", "red");
				$("#phone_check2").html("전화번호는 - 제외 11글자를 입력해주세요..");
				//8글자 이상일때
		}
		else if(phoneLength >= 11){
			
			if(pass1 != "" || pass2 != "")
			{
				if(pass1 == pass2){
					$("#phone_check2").html("일치합니다.");
					$("#phone_check2").css('color','blue');
			}
				else{
					$("#phone_check2").html("일치하지않습니다.");
					$("#phone_check2").css('color','red');
			}
		  }
		}
	});
	$(".editCompleteBtn").on("click",function(){
		var params = $("#pwcheckForm").serialize();
				$.ajax({
				      url : "PwAjax", // 경로
				      type : "POST", // 전송방식(GET : 주소 형태, POST : 주소 헤더 형태)
				      dataType : "json", // 데이터 형태
				      data : params, // 보낼 데이터
				      success : function(res) {
				    	  if(res.msg == "success"){
				    		  $(".popup_border_pw").hide();
				    		  $("#today_pw").val("");
				    		  $("#input_pw").val("");
				    		  $("#input_pw2").val("");
				    		  $(".exception_pw").html("");
				    		  alert("비밀 번호가 변경되었습니다.");
				    	  }
				    	  else{
				    		  makeAlert("알림","현재 비밀번호가 일치하지 않습니다.");
				    	  }
				      },
				      error : function(request, status, error){ // 실패했을 때 함수 실행
				         console.log(request.responseText); // 실패 상세 내역
				      } 
				   });
	});
	
	$("#input_pw").on("keyup", function() {
			//var specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
			var pwLength = $("#input_pw").val().length;
			var pwVal = $("#input_pw").val();
			if(pwLength < 8) {
				$("#pwchk").css("color", "red");
				$("#pwchk").html("비밀번호를 8글자 이상 입력해주세요.");
				//8글자 이상일때
			}else if(pwLength >= 8) {
				//특문포함 여부
				if(!pwVal.match(/([`~!@#$%^&*|\\\'\";:\/?])/)){
					$("#pwchk").css("color", "red");
					$("#pwchk").html("특수문자를 포함해주세요.");
				}else {
					$("#pwchk").css("color", "blue");
					$("#pwchk").html("사용가능한 비밀번호입니다.");
				}
			}
		});
	/* 비밀번호 수정시 비밀번호 체크  */
	$(".input_password").keyup(function(){
		let pass1 =$("#input_pw").val();
		let pass2 =$("#input_pw2").val();
		var pwLength = $("#input_pw").val().length;
		if(pwLength < 8) {
				$("#checkpw").css("color", "red");
				$("#checkpw").html("비밀번호를 8글자 이상 입력해주세요.");
				//8글자 이상일때
			}
		else if(pwLength >= 8){
			if(!pass2.match(/([`~!@#$%^&*|\\\'\";:\/?])/)){
				$("#checkpw").css("color", "red");
				$("#checkpw").html("특수문자를 포함해주세요.");
			}
			else if(pass1 != "" || pass2 != ""){
			if(pass1 == pass2){
				$("#checkpw").html("일치합니다.");
				$("#checkpw").css('color','blue');
			}
			else{
				$("#checkpw").html("일치하지않습니다.");
				$("#checkpw").css('color','red');
			}
		  }
		}
	});
	/* 비밀번호 수정 버튼 이벤트 */
	$(".pwUpdateBtn").on("click", function() {
		$(".popup_border_pw").show();
		$(".popup_border_phone").hide();
		$(".popup_border_email").hide();
		$(".popup_border_leave").hide();
	});
	/* 비밀번호 수정 - 수정완료버튼 이벤트 */  
	
	/* 비밀번호 수정 - 취소버튼 이벤트 */
	$("#cancelPwBtn").on("click", function() {
		$(".popup_border_pw").hide();
	});
	/* ---휴대폰번호 수정 버튼 이벤트--- */
	$(".phoneUpdateBtn").on("click", function() {
		$(".popup_border_phone").show();
		$(".popup_border_pw").hide();
		$(".popup_border_email").hide();
		$(".popup_border_leave").hide();
	});
	/* ---휴대폰번호 수정 팝업창 변경하기 이벤트--- */
	
	
	/* ---휴대폰번호 수정 팝업창 취소버튼 이벤트--- */
	$("#cancelPhoneBtn").on("click", function() {
		$(".popup_border_phone").hide();
	});
	
	/* ---이메일주소 수정 버튼 이벤트--- */
	$(".emailUpdateBtn").on("click", function() {
		$(".popup_border_email").show();
		$(".popup_border_phone").hide();
		$(".popup_border_pw").hide();
		$(".popup_border_leave").hide();
	});
	/* ---이메일주소 수정 팝업창 변경하기 이벤트--- */
	
	
	/* ---이메일주소 수정 팝업창 취소버튼 이벤트--- */
	$("#cancelEmailBtn").on("click", function() {
		$(".popup_border_email").hide();
	});
	
	/* --- 회원 탈퇴 버튼 클릭 시 */
	$("#leaveBtn").on("click", function(){
		$(".popup_border_leave").show();
		$(".popup_border_email").hide();
		$(".popup_border_phone").hide();
		$(".popup_border_pw").hide();
		});
	/*회원탈퇴 - 아니오 버튼 클릭시*/
	$("#noBtn").on("click", function(){
		$(".popup_border_leave").hide();
	});
	
	/* ---나의 1:1문의 클릭 시--- */
	$("#myAnswer").on("click" ,function(){
		location.href ="MyPageAnswer";
	});
	/* ---나의 리뷰 클릭 시--- */
	$("#myReview").on("click" ,function(){
		location.href ="MyPageReview";
	});
	/* ---나의 게시글 클릭 시--- */
	$("#myPost").on("click" ,function(){
		location.href ="MyPagePost";
	});
	/* ---나의 댓글 클릭 시--- */
	$("#myComment").on("click" ,function(){
		location.href ="MyPageReple";
	});
	/* ---목록 버튼 클릭 시 ---*/
	$(".listBtn").on("click", function() {
		history.back();
	});
	
});
var certCode = "";
// 이메일 인증
function mailChk() {
	var params = $("#actionForm").serialize();
	var userEmail = $('#user_Email').val();
    if(userEmail == ''){
    	 makeAlert("알림", "이메일을 입력해주세요.");
    	 return false;
    }
    	$.ajax({
			url : "member/emailAuth",
			type : "post",
			data : params,
			success: function(data){
					makeAlert("알림", "인증번호가 발송되었습니다.");
					$("#exception_email_check").css("color", "blue");
					$("#exception_email_check").html("인증번호가 전송되었습니다");
					$("#mailCheck").val("1");
					$("#certCode").val(data);
			},
			error : function(request, status, error) { 
				console.log(request.responseText)
				makeAlert("알림", "메일 발송에 실패했습니다.");
			}
		}); 
}
//인증번호 확인 함수
function certNumChk() {
	var params = $("#actionForm").serialize();
	//인증번호 입력란
	var num = $(".certificationConfirm").val();
		if(num == '') {
			makeAlert("알림", "인증번호를 입력해주세요.");
			return false;
		}
			$.ajax({
				url : "member/certAuth",
				type : "post",
				data : params,
				success: function(data) {
					
					console.log(data.msg);
					if(data.msg == "success") {
					$("#successCertChk").css("color", "blue");
					$("#successCertChk").html("인증번호가 일치합니다.");

						$("#certCheck").val("1");
					} else if(data.msg == "failed"){
						$("#successCertChk").css("color", "red");
						$("#successCertChk").html("인증번호가 일치하지 않습니다.");
					}
				},
				error : function(request, status, error) {
					console.log(request.responseText);
					makeAlert("알림", "인증번호 인증에 실패!");
				}
			});
}