$(document).ready(function() {
	
		$(".year").on("keyup" , function () {
			if($(".year").val() >= 1900) {
				$(".userBirthChk").html("");
			}else {
				$(".userBirthChk").css("color", "red");
				$(".userBirthChk").html("생년월일을 제대로 입력해주세요.");
			}
		});
		
		//회원가입 버튼 클릭시
		$(".newAccountBtn").on("click", function() {
			//생년월일 유효성 검사
			//년도
			if($(".year").val() != "" && $(".month").val() != "" && $(".day").val() != "") {
				$("#birthCheck").val("1");
			}
			//생년월일 - 일 숫자 처리
			if($(".day").val() >= 1 && $(".day").val() <= 9 && $(".day").val().length < 2) {
				$(".day").val(0+$(".day").val());
				$("#birthCheck").val("1");
			}else if($(".day").val() > 31 || $(".day").val() <= 0) {
				$(".userBirthChk").css("color", "red");
				$(".userBirthChk").html("생년월일을 제대로 입력해주세요.");
				$("#birthCheck").val("0");
			}
			if($(".year").val() < 1900) {
				$(".userBirthChk").css("color", "red");
				$(".userBirthChk").html("생년월일을 제대로 입력해주세요.");
				$("#birthCheck").val("0");
			} else {
				$("#birthCheck").val("1")
			}
			
			$("#userBirth").val($("#year").val()+$(".month").val()+$("#day").val());
			if($("#idCheck").val() == 1 && $("#pwCheck").val() == 1 && $("#nameCheck").val() == 1 &&
			   $("#genderCheck").val() == 1 && $("#birthCheck").val() == 1 && $("#phoneCheck").val() == 1 &&
			   $("#mailCheck").val() == 1 && $("#certCheck").val() == 1) {
				newAccount();
			} else {
				makeAlert("알림", "필수사항을 확인해주세요.");
			}
		});
		
		//중복확인 버튼 클릭시
		$(".userIdBtn").on("click", function() {
			//아이디 중복확인 함수
			idDupple();
		});
		
		
		//취소 버튼 클릭시
		$("#cancelBtn").on("click", function() {
			history.back();
		});
		
		//비밀번호
		$("#userPw").on("keyup", function() {
			//var specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
			var pwLength = $("#userPw").val().length;
			var pwVal = $("#userPw").val();
			if(pwLength < 8) {
				$(".pwChk").css("color", "red");
				$(".pwChk").html("비밀번호를 8글자 이상 입력해주세요.");
				//8글자 이상일때
			}else if(pwLength >= 8) {
				//특문포함 여부
				if(!pwVal.match(/([`~!@#$%^&*|\\\'\";:\/?])/)){
					$(".pwChk").css("color", "red");
					$(".pwChk").html("특수문자를 포함해주세요.");
				}else {
					$(".pwChk").css("color", "blue");
					$(".pwChk").html("사용가능한 비밀번호입니다.");
				}
			}
		});
		//비밀번호 확인
		$("#userPwConfirm").on("keyup", function() {
			var pwVal = $("#userPw").val();
			var pwConfirmVal = $("#userPwConfirm").val();
			
			if(pwVal != pwConfirmVal) {
				$(".pwConfirmChk").css("color", "red");
				$(".pwConfirmChk").html("비밀번호를 확인해주세요.");
			}else if(pwVal == pwConfirmVal) {
				if(pwVal.length >= 8) {			
					$(".pwConfirmChk").css("color", "blue");
					$(".pwConfirmChk").html("비밀번호가 일치합니다.");
					$("#pwCheck").val("1");
					
				}
			}
		});
		
		//이름
		$("#userName").on("keyup", function() {
			var userName = $("#userName").val();
			$(this).val($(this).val().replace(/[^ㄱ-ㅣ가-힣]/g,""));
			if($(this).length >= 1) {
				$(".userNameChk").html("");

				$("#nameCheck").val("1");
			}
			if($(this).length < 1 || $(this).val() == null || $(this).val() == "") {
				$(".userNameChk").css("color", "red");
				$(".userNameChk").html("이름을 입력하세요.");
			}
		});
		$(".gender").on("click",function(){
			$(".genderChk").html("");

			$("#genderCheck").val("1");
		});
		
		

		//휴대폰번호 유효성 검사
		$(".userPhone").on("keyup", function() {
			if($(this).val().length == 11) {
				$(".phoneChk").css("color","blue");
				$(".phoneChk").html("올바른 번호입니다.");

				$("#phoneCheck").val("1");
			}else {
				$(".phoneChk").css("color", "red");
				$(".phoneChk").html("휴대전화번호가 틀립니다.");
			}
		});
		
	//이메일 인증
		$(".emailCertificationBtn").on("click", function() {
    		mailChk();
		});  	 
		
	//이메일 인증확인 버튼 클릭시
		$(".certificationConfirmBtn").on("click", function() {
			certNumChk();
		});
		

});//document
var certCode = "";
/*                            함수                            */
		//아이디 중복검사함수
		function idDupple() {
				//ajax
			var params = $("#actionForm").serialize();
			$.ajax({
				url : "memAction/{flag}", 
				type : "post",
				dataType : "json", 
				data : params, 
				success : function(res) { 
					if(res.msg1 == "idSuccess"){
						$(".idChk").css("color","red");
						$(".idChk").html("사용불가능한 아이디입니다.");
					}else if (res.msg1 == "idFailed"){
						$(".idChk").css("color","blue");
						$(".idChk").html("사용가능한 아이디입니다.");
						$("#idCheck").val("1");
					}
				},
				error : function(request, status, error) { 
					console.log(request.responseText)
				}
			});
		}

		//이메일 인증 함수
	function mailChk() {
			var params = $("#actionForm").serialize();
			var userEmail = $('#userEmail').val();
    	 if(userEmail == ''){
    	 	makeAlert("알림", "이메일을 입력해주세요.");
    	 	return false;
    	 }
    	 
    	 $.ajax({
			url : "Medicine/emailAuth",
			type : "post",
			data : params,
			success: function(data){
				makeAlert("알림", "인증번호가 발송되었습니다.");
				$(".successEmailChk").css("color", "blue");
				$(".successEmailChk").html("인증번호가 전송되었습니다");
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
				url : "Medicine/certAuth",
				type : "post",
				data : params,
				success: function(data) {
					if(data.msg == "success") {
						$(".successCertChk").css("color", "blue");
						$(".successCertChk").html("인증번호가 일치합니다.");
						$("#certCheck").val("1");
					} else if(data.msg == "failed"){
						$(".successCertChk").css("color", "red");
						$(".successCertChk").html("인증번호가 일치하지 않습니다.");
					}
				},
				error : function(request, status, error) {
					console.log(request.responseText);
					makeAlert("알림", "인증번호 인증에 실패!");
				}
			});
		}
		//회원가입 함수
		function newAccount() {
			var params = $("#actionForm").serialize();
			$.ajax({
				url : "Medicine/newAccount",
				type : "POST",
				data : params,
				success : function(data) {
					if(data.msg == "success") {
						makePopup({
							title : "알림",
							contents : "회원가입이 완료되었습니다.",
							buttons : [{
								name : "확인",
								func: function() {
									//회원가입 완료후, 유저 메인페이지로 이동
									location.href = "MediMain";
								}
							}]
						})
					} else if(data.msg == "failed") {
						//화면 변동 없음
						makeAlert("알림", "회원가입에 실패하였습니다.");
					}
				},
				error : function(request, status, error) {
					console.log(request.responseText);
				}
			})
		}