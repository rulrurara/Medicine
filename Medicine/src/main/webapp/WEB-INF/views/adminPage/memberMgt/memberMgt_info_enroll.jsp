<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>등록 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/memberMgt_info_enroll.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/js/admin/memberMgt_info_enroll.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$(".reguser").on("click",function() {
        if ($(".poPup1").css("display") == "block") {
           $(".poPup1").hide();
        } else if ($(".poPup1").css("display") == "none") {
           $(".poPup1").show();
        }
     });
	$(".Yes").on("click",function(){
		location.href = "memberMgtList";
	});
	$(".aYes").on("click", function(){
		var params = $("#actionForm").serialize();
        $.ajax({
       	 url : "memberAction/insert",
       	 type : "POST",
       	 dateType : "json",
       	 data : params,
       	 success : function(res){
       		 switch (res.msg) {
				case "success":
					$(".poPup1").hide();
					location.href = "memberMgtList";
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
        }); 
	});
});
</script>
</head>
<body>
<c:import url="/AdminImport"></c:import>
	<div class="right_wrap">
		<div class="poPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="Yes" value="네"></div>
			</div>
		</div>
		<div class="poPup1">
			<div class="data">등록하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="aYes" value="네"></div>
			</div>
		</div>
		<div class="top_header">
			<div class="header">
				<div class="menu"></div>
				<div class="homepage_name">Good Medicine</div>
			</div>
		</div>
		<div id="bottom">
			<div class="nav">
				<p><b>관리자 홈 > 회원 관리 > 등록</b><p>
			</div>
			<form action="#" id="actionForm" method="post" >
				<input type="hidden" id="num" name="num" />
			<table class="t">
				<colgroup>
					<!-- 전체 길이 1100기준. -->
					<col width="150" />
						<col width="400" />
						<col width="150" />
						<col width="400" />
				</colgroup>
				<tr>
					<!-- 첫 번째 칸 -->
					<th>회원번호</th>
					<td>회원 고유의 번호 </td>
					<th>아이디</th>
					<td><input type="text" class="text" id="id" name="id" placeholder="내용을 입력하세요." /></td>
				</tr>
				<tr>
					<!-- 두 번째 칸 -->
					<th>회원명</th>
					<td><input type="text" class="text" id="name" name="name" placeholder="내용을 입력하세요." /></td>
					<th>비밀번호</th>
					<td><input type="password" class="text" id ="pw" name="pw" placeholder="내용을 입력하세요." /></td>
				</tr>
				<tr>
					<!-- 세 번째 칸 -->
					<th>성별</th>
					<td><select id="select" name="gender" >
							<option value="0">남자</option>
							<option value="1">여자</option>
					</select></td>
					<th>생년월일</th>
					<td><input type="date" id="date" name="date" /></td>
				</tr>
				<tr>
					<!-- 네 번째 칸 -->
					<th>전화번호</th>
					<td><input type="text" class="text" id="phone" name="phone" placeholder="내용을 입력하세요." /></td>
					<th>이메일</th>
					<td><input type="text" class="text" id="email" name="email" placeholder="내용을 입력하세요." /></td>
				</tr>
			</table>
			<div>
				<div>
					<input type="button" class="del btn" value="취소">
						<div class="btn_one"></div>
					<input type="button" class="reguser btn" value="등록">
						<div class="btn_one"></div>
				</div>
			</div>
			</form>
		</div>
	</div>
</body>
</html>