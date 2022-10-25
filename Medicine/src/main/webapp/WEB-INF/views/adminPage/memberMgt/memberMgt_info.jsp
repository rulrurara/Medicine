<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상세보기 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/memberMgt_info.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/js/admin/memberMgt_info.js"></script>
</head>
<body>
<form action="#" id="actionForm" method="post">
	<input type="hidden" name="no" id="no" value="${param.no}"/>
	<input type="hidden" name="page" id="page"value="${param.page}" />
	<input type="hidden" name="searchGbn" id="searchGbn"value="${param.searchGbn}" />
	<input type="hidden" name="searchTxt" id="searchTxt" value="${param.searchTxt}" />
</form>
<c:import url="/AdminImport"></c:import>
	<div class="right_wrap">
		<div class="top_header">
			<div class="header">
				<div class="menu"></div>
				<div class="homepage_name">Good Medicine</div>
			</div>
			</div>
		<div id="bottom">
		    <div class="nav">
               <p><b>관리자 홈 > 회원 관리 > 상세보기</b><p>
            </div>
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
						<td>${data.MEM_NUM}</td>
						<th>아이디</th>
						<td>${data.ID}</td>
					</tr>
					<tr>
						<th>회원명</th>
						<td>${data.NM}</td>
						<th>비밀번호</th>
						<td>${data.PW}</td>
					</tr>
					<tr>
						<!-- 세 번째 칸 -->
						<th>성별</th>
						<td>${data.GENDER}</td>
						<th>생년월일</th>
						<td>${data.BIRTH}</td>
					</tr>
					<tr>
						<!-- 네 번째 칸 -->
						<th>전화번호</th>
						<td>${data.PHONE}</td>
						<th>이메일</th>
						<td>${data.EMAIL}</td>
					</tr>
				</table>
			<div>
				<input type="button" class="del btn" value="목록" />
					<div class="btn_one"></div>
				
				<input type="button" class="regsujeong btn" value="수정">
					<div class="btn_one"></div>
				
			</div>

		</div>
	</div>
</body>
</html>