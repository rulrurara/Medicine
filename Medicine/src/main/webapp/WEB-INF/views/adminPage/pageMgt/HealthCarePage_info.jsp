<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>   
<!-- jstl의 function : el tag 추가 옵션 -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상세보기 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/HealthCarePage_Info.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/admin/HealthCarePage_Info.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/script/common/popup.js"></script>
</head>
<body>
<c:import url="/AdminImport"></c:import>
	<div class="right_wrap">
	<div class="poPup">
			<div class="data">삭제하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="Yes" id="delBtn" value="네"></div>
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
				<p>
					<b>관리자 홈 > 페이지 관리 > 건강 관리 메인 페이지 > 상세보기 페이지</b>
				<p>
			</div>
			<form action="#" id="actionForm" method="post">
				<input type="hidden" name="no" value="${data.INFO_NUM}">
			</form>
			<table class="t">

				<colgroup>
					<!-- 전체 길이 1500기준. -->
					<col width="500" />
					<col width="900" />
				</colgroup>
				<tr>
					<th>작성자</th>
					<td>${sMemNm}<input type="hidden" name="memNo" id="memNo"
						value="${sMemNo}"></td>
				</tr>
				<tr>
					<th>제목</th>
					<td>${data.TITLE}</td>
				</tr>
				<tr>
					<th>내용</th>
					<td>${data.CON}</td>
				</tr>
					<c:if test="${!empty data.HEALTH_MAIN_PIC}">
						<!-- fn:length(대상) : 대상 문자열의 길이나 배열, 리스트의 크기를 가져옴 -->
						<c:set var="fileLength" value="#{fn:length(data.HEALTH_MAIN_PIC)}"></c:set>
						<!-- fn:substring(값, 숫자1, 숫자2) : 값을 숫자 1 이상부터 숫자 2 미만까지 인덱스 기준으로 자름 -->
						<c:set var="fileName" value="${fn:substring(data.HEALTH_MAIN_PIC, 20, fileLength)}"></c:set>
						<tr>
							<th>첨부파일</th>
							<!-- download 속성을 걸면 바로 다운로드, 안걸면 웹 상에서 띄워짐 -->
							<!-- download="${fileName}" -> 다운받는 파일 이름 -->
							<td><a href="resources/upload/${data.HEALTH_MAIN_PIC}"
								download="${fileName}">${fileName}</a></td>
						</tr>
					</c:if>
			</table>
			<div>
				<form action="#" id="actionForm" method="post">
					<div>
						<input type="button" class="del btn" value="삭제">
						<div class="btn_one"></div>
						<input type="button" class="reg btn" id="updateBtn" value="수정"
						style="margin-top: 0px;">
						<div class="btn_one"></div>
						<input type="button" class="back btn" id="backBtn" value="목록">
						<div class="btn_one"></div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>