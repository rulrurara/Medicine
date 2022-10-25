<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<script type="text/javascript" src="resources/js/common/common.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/common/findlogin.css"/>
<link rel="stylesheet" type="text/css"	href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/common/popup.js"></script>
<style type="text/css">
body{
	background: url("resources/images/common/login4.jpg") no-repeat center;
	background-size: cover;
}
.all-wrap{
	box-sizing: border-box;
	display:flex;
	justify-content:center;
	align-items: center;
	font-size:10px;
	font-family: "Nanum-SquareR";
	height:800px;
}
#findId{
	font-weight: bold;
}
</style>
<script type="text/javascript">
$(document).ready(function(){
var bbtn = true;
	$(".popupyes2").on("click", function(){
		$(".popup_select").css("display", "none");
		$("#selectId").html("");
		$("#selectPw").html("");
	});
	$(".popupno").on("click", function(){
		$(".popup_email").css("display", "none");
	});

	$(".popupyes").on("click", function(){
		if( $("#cert").val()==""){
			$("#cert").next("label").addClass("warning");
			$("#cert").focus();
			setTimeout(function(){
				$("label").removeClass("warning")
			}, 1500);
		}
		else{
			Cert();
		}	
	});
		$("#findPw").on("click",function(){
			$("#idArea").css("display", "block");
			$("#findPw").css("background" , "#FFE5D3");
			$("#findPw").css("font-weight" , "bold");
			$("#findId").css("background" , "#6799ff");
			$("#findId").css("font-weight" , "normal");
			$("#id").val("");
			$("#email").val("");
			$("#userNm").val("");
			$(".btn").val("비밀번호 찾기");
			bbtn = false;
		})
		$("#findId").on("click",function(){
			$("#idArea").css("display", "none");
			$("#findId").css("background" , "#FFE5D3");
			$("#findId").css("font-weight" , "bold");
			$("#findPw").css("background" , "#6799ff");
			$("#findPw").css("font-weight" , "normal");
			
			$("#id").val("");
			$("#email").val("");
			$("#userNm").val("");
			$(".btn").val("아이디 찾기");
			 bbtn = true;
		})		
	$(".btn").on("click",function(){
		if(!bbtn && $("#id").val()==""){
				$("#id").next("label").addClass("warning");
				$("#id").focus();
				setTimeout(function(){
					$("label").removeClass("warning")
				}, 1500);
			}
			else if($("#email").val()==""){
				$("#email").next("label").addClass("warning");
				$("#email").focus();
				setTimeout(function(){
					$("label").removeClass("warning")
				}, 1500);
			}
			else if($("#userNm").val()==""){
				$("#userNm").next("label").addClass("warning");
				$("#userNm").focus();	
				setTimeout(function(){
					$("label").removeClass("warning")
				}, 1500);
			}		
			else{
				var params = $("#actionForm").serialize();
				$.ajax({
					url : "LoginFindAjax", 
					type : "post",
					dataType : "json", 
					data : params, 
					success : function(res) { 
						switch(res.msg){
					
						case "EmailFail" :
							makeAlert("알림", "등록된 이메일이 없습니다.")
							break;
						case "success" :
							$("label[for ='cert']").text("인증번호를 작성해주세요.");
							$("#cert").val("");
							$(".popup_email").css("display", "block");
							EmailSend();
							break;
						case "NmFail" :
							makeAlert("알림", "이메일과 등록된 이름이 일치하지 않습니다.")
							break;	
						case "IdEmailFail" :
							makeAlert("알림", "등록된 아이디 또는 이메일이 없습니다.")
							break;	
						case "NmFail2" :
							makeAlert("알림", "아이디 또는 이메일과 등록된 이름이 일치하지 않습니다. ")
							break;	
						
							
						}
					
						},
					
					error : function(request, status, error) { 
						console.log(request.responseText)
					}
				})
				
			}

	
	})
})
function EmailSend(){
		var params = $("#actionForm").serialize();
		$.ajax({
			url : "LoginEmailAjax/email", 
			type : "post",
			dataType : "json", 
			data : params, 
			success : function(res) { 
				$("#cur").val(res.cur);
				$("#email2").val(res.email2);
				},
			
			error : function(request, status, error) { 
				console.log(request.responseText)
			}
		})
}
function Cert(){
	var params = $("#actionForm2").serialize();
	$.ajax({
		url : "LoginEmailAjax/cert", 
		type : "post",
		dataType : "json", 
		data : params, 
		success : function(res) { 
			switch(res.msg){		
			case "success" :
				$(".popup_email").css("display", "none");
				if($("#id").val() == null || $("#id").val() == "" ){
					$("#selectId").html("아이디 :" + res.idpw.ID)
				}else{
					$("#selectPw").html("비밀번호 :" + res.idpw.PW)
				}
				$(".popup_select").css("display", "block");
					
				break;
			case "fail" :
				$("#cert").next("label").addClass("warning");
				setTimeout(function(){
					$("label").removeClass("warning")
				}, 2000);
				$("label[for ='cert']").text("인증번호가 올바르지 않습니다.");
				break;
			}
			},
		
		error : function(request, status, error) { 
			console.log(request.responseText)
		}
	})
}
</script>
</head>
<body>
<c:import url="/ComImport"></c:import>
<div class="all-wrap">
<section class="login-form">
<h1>아이디/비밀번호 찾기</h1>
<div class="btn-wrap">
	<input type="button" value="아이디 찾기" id="findId"> &nbsp;<input type="button" value="비밀번호 찾기" id="findPw">
</div>
<form id="actionForm" action="#"> 
		<div class="int-area" id="idArea">
			<input type="text" name="id" id="id" autocomplete="off" required>
			<label for="id">USER ID</label>
		</div>
		<div class="int-area">
			<input type="text" name="userEmail" id="email" autocomplete="off" required>
			<label for="email">EMAIL</label>
		</div>
		<div class="int-area">
			<input type="text" name="userNm" id="userNm" autocomplete="off" required>
			<label for="pw">USER NAME</label>
		</div>
		<div class="btn-area">
			<input type="button" value="아이디 찾기" class="btn">
		</div>
		<div class="caption">
			<a href="memReg">회원가입</a>  <a href="MediLogin" class="Login">로그인</a>
		</div>
</form>
</section>
</div>
<form action="#" id="actionForm2">
<div class="popup_email">작성하신 이메일로 인증번호가 발송되었습니다.<br><br>
	<div class="int-area">
		<input type="number" name="cert" id="cert" autocomplete="off" required style="width: 40%">
		<label for="cert" style="left: 110px; color:black">인증번호를 작성해주세요</label>
	</div>
	<div class="popupbtn">
		<input type="button" class="popupyes" value="확인">
		<input type="button" class="popupno" value="취소">
	</div>
</div>
<input type="hidden" id="cur" name="cur">
<input type="hidden" id="email2" name="email2">
</form>
<div class="popup_select"><br><br>
	<div class="int-area">
		<div id="selectId"></div>
		<div id="selectPw"></div>
	</div>
	<div class="popupbtn">
		<input type="button" class="popupyes2" value="확인">
	</div>
</div>
</body>
</html>