<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- jstl의 function : el tag 추가 옵션 -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>           
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>수정 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/HealthCarePage_Info_sujeong.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/admin/HealthCarePage_Info_sujeong.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/script/jquery/jquery.form.js"></script>
</head>
<body>
<c:import url="/AdminImport"></c:import>
	<div class="right_wrap">
		<div class="poPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="Yes" id="listBtn" value="네"></div>
			</div>
		</div>
		<div class="poPup2">
			<div class="data">수정하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div>
					<input type="button" class="Yes" id="insertBtn" value="네"></div>
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
					<b>관리자 홈 > 페이지 관리 > 건강 관리 메인 페이지 > 수정 페이지</b>
				<p>
			</div>
			<form action="fileUploadAjax" id="actionForm" method="post" enctype="multipart/form-data">
				<input type="hidden" name="no" value="${data.INFO_NUM}" />
				<table class="t">
				
					<colgroup>
						<!-- 전체 길이 1500기준. -->
						<col width="500" />
						<col width="900" />
					</colgroup>
					<tr>
						<th>작성자</th>
						<td>${sMemNm}<input type="hidden" name="memno" id="memno"
							value="${sMemNum}"></td>
					</tr>
					<tr>
						<th>제목</th>
						<td><input type="text" style="width: 99%;  height: 99%; border: 0px;"
						id="title" name="title" value="${data.TITLE}"></td>
					</tr>
					<tr>
						<th>내용</th>
						<td><input type="text" style="width: 99%;  height: 99%; border: 0px;"
						id="con" name="con" value="${data.CON}"></td>
					</tr>
					<tr>
						<th>첨부파일</th>
						<td>
							<span class="attold"> <!-- 기존 파일 -->
		      				<c:set var="fileLength" value="${fn:length(data.HEALTH_MAIN_PIC)}"></c:set>
		      				<c:set var="fileName" value="${fn:substring(data.HEALTH_MAIN_PIC, 20, fileLength)}"></c:set>
		      				${fileName}
		      				<div class="update btn" id="fileDelBtn">파일 삭제</div>
		      				</span>
		      				<span class="att"> <!-- 기존 파일 삭제 후 새 파일 용도 -->
		      				<input type="file" name="attFile" />
		      				<input type="hidden" name="pic" id="att" value="${data.HEALTH_MAIN_PIC}"/>
		      				</span>
						</td>
					</tr>
				</table>
				<div>
					<input type="button" class="del btn" value="취소">
					<div class="btn_one"></div>
					<input type="button" class="reg btn" value="수정">
					<div class="btn_one"></div>
				</div>
			</form>
			</div>
		</div>
</body>
</html>