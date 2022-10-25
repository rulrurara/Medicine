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
<link rel="stylesheet" type="text/css" href="resources/css/common/login.css"/>
<link rel="stylesheet" type="text/css"	href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/common/popup.js"></script>
<style type="text/css">
body{
	background: url("resources/images/common/login4.jpg") no-repeat center;
	background-size: cover;
}
</style>
<script type="text/javascript">
$(document).ready(function(){
	$(".btn").on("click",function(){
		if($("#id").val()==""){
			$("#id").next("label").addClass("warning");
			$("#id").focus();
			setTimeout(function(){
				$("label").removeClass("warning")
			}, 1500);
		}
		else if($("#pw").val()==""){
			$("#pw").next("label").addClass("warning");
			$("#pw").focus();
			setTimeout(function(){
				$("label").removeClass("warning")
			}, 1500);
		}else{
			var params = $("#actionForm").serialize();
			$.ajax({
				url : "LoginAjax", 
				type : "post",
				dataType : "json", 
				data : params, 
				success : function(res) { 
					if(res.msg == "success"){
						location.reload()
						 if ( window.location.href == "http://localhost:8090/Medicine/MediLogin" ) { 
							location.href = "MediMain";
							
						}else{
							location.reload()
							
							
						} 
					}else{
						makeAlert("알림", "아이디나 비밀번호가 틀립니다.")
					}
				},
				error : function(request, status, error) { 
					console.log(request.responseText)
				}
			})
			
			
		}
	})
})
</script>
</head>
<body>
<c:import url="/ComImport"></c:import>
<div class="all-wrap">
<section class="login-form">
	<h1>LOGIN</h1>
	<form action="#" id="actionForm">
		<div class="int-area">
			<input type="text" name="id" id="id" autocomplete="off" required>
			<label for="id">USER ID</label>
		</div>
		<div class="int-area">
			<input type="password" name="pw" id="pw" autocomplete="off" required>
			<label for="pw">PASSWORD</label>
		</div>
	</form>
		<div class="btn-area">
			<input type="button" value="LOGIN" class="btn">
		</div>
		<div class="caption">
			<a href="memReg">회원가입</a>  <a href="MediLoginFind" class="findId">아이디/비밀번호 찾기</a>
		</div>
</section>
</div>

</body>
</html>