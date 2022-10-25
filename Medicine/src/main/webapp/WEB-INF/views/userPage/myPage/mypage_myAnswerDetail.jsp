<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/userPage/mypage_myAnswerDetail.css"/>
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/script/jquery/jquery-ui.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/mypage_myAnswerDetail.js"></script>
<script type="text/javascript" src="resources/script/common/popup.js"></script>
</head>
<body>
<c:import url="/ComImport"></c:import>
		<div class="info">1:1 문의 상세보기</div>
		<div class="gnb">마이페이지 - 나의 1:1 문의 상세보기</div>
		<div class="main_border">
			<div class="table_border">
	<form action="#" id="actionForm">
	<input type="hidden" id="no" name="no" value="${param.no}" />
				<table style="padding: 15px;">
					<colgroup>
						<col width="100px" />
						<col width="1000px" />
						<col width="215px" />
					</colgroup>
					<thead>
						<tr>
							<td class="th">제목</td>
							<td><input type="text" class="answerTitle" name="title"
								id="title" value="${data.TITLE}" /></td>
							<td class="th">${data.REG_D}</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="th">문의 내용</td>
							<td colspan="3"><textarea rows="10" cols="105" name="con"
									id="con" class="answerCon">${data.CON}</textarea></td>
						</tr>
						<!-- 답변여부가 O일때만 답변내용이 보여져야 함 -->
						<tr>
							<td class="th">답변 내용</td>
							<td colspan="3"><textarea rows="10" cols="105"
									class="answerCon2" readonly="readonly">${data.A}</textarea></td>
						</tr>
					</tbody>
				</table>
	</form>

				<!-- 버튼 div -->
				<div class="bottom_border">
					<input type="button" class="updateBtn blueBtn" value="수 정" /> <input
						type="button" class="cancelBtn grayBtn" id="backBtn" value="취 소" />
					<input type="button" class="deleteBtn blueBtn" value="삭 제" />
				</div>
			</div>
		</div>
</body>
</html>