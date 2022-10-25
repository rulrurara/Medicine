<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>관리자 로그인</title>
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<link rel="stylesheet" type="text/css"	href="resources/css/common/popup.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_login.css"/>
<script type="text/javascript" src="resources/script/common/popup.js"></script>
<style type="text/css">
body{
	background: url("resources/images/common/login4.jpg") no-repeat center;
	background-size: cover;
}
.menu{
	background: none;
}
</style>
<script type="text/javascript">
$(document).ready(function(){
	$("#actionForm").on("keypress", "input", function(event) {
		if (event.keyCode == 13) {
			console.log("dsadsadsa");
			// 버튼 이벤트 발생
			$(".admin_login").click();
			return false;
		}
	});
	$(".admin_login").on("click",function(){
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
				url : "AdminLoginAjax", 
				type : "post",
				dataType : "json", 
				data : params, 
				success : function(res) { 
					if(res.msg == "success"){
						location.href = "memberMgt";
					}else{
						makeAlert("알림", "아이디나 비밀번호가 틀립니다.")
						$("#id").val("");
						$("#pw").val("");
					}
				},
				error : function(request, status, error) { 
					console.log(request.responseText)
				}
			});
		};
	});
});
</script>
</head>
<body>
<div class="top_header">
<div class="header">
	<div class="menu"></div>
	<div class="logo"></div>
	<div class="homepage_name">
		Good Medicine
	</div>
</div>
</div>
<div class="all-wrap">
<section class="login-form">
	<h1>LOGIN</h1>
	<form action="#" id="actionForm">
		<div class="int-area">
			<input type="text" name="id" id="id" autocomplete="off" required>
			<label for="id">USER NAME</label>
		</div>
		<div class="int-area">
			<input type="password" name="pw" id="pw" autocomplete="off" required>
			<label for="pw">PASSWORD</label>
		</div>
	</form>
		<div class="btn-area">
			<input type="button" value="LOGIN" class="admin_login">
		</div>
</section>
</div>

</body>
</html>