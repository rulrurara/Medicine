<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>답변 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/postMgt_One-on-one_Info2.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/admin/postMgt_One-on-one_Info2.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<style type="text/css">
</style>
</head>
<body>
<c:import url="/AdminImport"></c:import>
	<div class="right_wrap">
		<div class="poPup">
			<div class="data">답변 취소 하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div>
					<form action="#" id="listBtn">
						<input type="button" class="Yes" value="네">
					</form>
				</div>
			</div>
		</div>
		<div class="poPup2">
			<div class="data">답변 등록 하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No2" value="아니요"></div>
				<div>
					<input type="button" class="Yes2" id="insertBtn" value="네">
				</div>
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
					<p><b>관리자 홈 > 게시물 관리 > 1대1문의 > 답변페이지</b><p>
				</div>
		<form action="#" id="actionForm" method="post">
			<!-- 전 화면에서 넘어온 페이지 정보 -->
			<input type ="hidden" name="page" value="${param.page}" />
			<!-- 전 화면에서 넘어온 검색 정보 -->
			<input type ="hidden" name="searchGbn" value="${param.searchGbn}" />
			<input type ="hidden" name="searchTxt" value="${param.searchTxt}" />
			
			<input type="hidden" name="no" value="${data.Q_NUM}">

				<table id="t" style="margin-left: auto; margin-right: auto; border-spacing: 0 20px;" >
					<colgroup>
						<!-- 전체 길이 1100기준. -->
						<col width="200" />
						<col width="900" />
					</colgroup>
					<tr>
						<!-- 첫 번째 칸 -->
						<th style="font-size: 20px;">답변자</th>
						<td width="1000px;">${sMemNm}</td>
					</tr>
					<tr>
						<!-- 첫 번째 칸 -->
						<th style="font-size: 20px;">작성자</th>
						<td width="1000px;">${data.NM}</td>
					</tr>
					<tr>
						<!-- 두 번째 칸 -->
						<th style="font-size: 20px;">휴대전화</th>
						<td width="1000px;">${data.PHONE}</td>
					</tr>
					<tr>
						<!-- 세 번째 칸 -->
						<th style="font-size: 20px;">이메일</th>
						<td width="1000px;">${data.EMAIL}</td>
					</tr>
					<tr>
						<!-- 네 번째 칸 -->
						<th style="font-size: 20px;">제목</th>
						<td width="1000px;">${data.TITLE}</td>
					</tr>
					<tr>
						<!-- 다섯 번째 칸 -->
						<th style="font-size: 20px;">내용</th>
						<td width="1000px;">${data.CON}</td>
					</tr>
					<tr>
						<!-- 여섯 번째 칸 -->
						<th style="font-size: 20px;">답변</th>
						<td width="1000px;"><textarea rows="10%" cols="100%" name="a" placeholder="답변해주세요">${data.A}</textarea></td>
					</tr>
				</table>

				<div>
					<input type="button" class="del btn" value="취소">
						<div class="btn_one"></div>
						<input type="button" class="reg btn" value="등록">
							<div class="btn_one"></div>
				</div>
				 </form>
			</div>
		</div>
</body>
</html>