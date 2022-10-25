<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상세보기 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css"/>
<link rel="stylesheet" type="text/css" href="resources/css/admin/medicineMgt_Info.css"/>
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/js/admin/medicineMgt_Info.js"></script>
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
					<p><b>관리자 홈 > 의약품 관리 > 상세보기</b><p>
				</div>
				<table class="t">
					<colgroup>
						<!-- 전체 길이 1500기준. -->
						<col width="200" />
						<col width="200" />
						<col width="250" />
						<col width="450" />
						<col width="400" />
					</colgroup>
					<tr>
						<!-- 첫 번째 칸 -->
						<th rowspan="2">의약품 번호</th>
						<td rowspan="2">${data.MEDI_NUM}</td>
						<th>제품명</th>
						<td>${data.PROD_NM}</td>
						<td rowspan="4"><div>
								<img id="im"  src="resources/upload/${data.PIC}">
							</div></td>
					</tr>
					<tr>
						<!-- 두 번째 칸 -->
						<th>제품코드</th>
						<td>${data.PROD_CODE}</td>
					</tr>
					<tr>
						<!-- 세 번째 칸 -->
						<th>업체명</th>
						<td>${data.COM_NM}</td>
						<th>성분코드</th>
						<td>${data.MAT_CODE}</td>
					</tr>
					<tr>
						<!-- 네 번째 칸 -->
						<th>제형</th>
						<td colspan="3">${data.SHAPE_NM}
						</td>
					</tr>
					<tr>
						<!-- 다섯 번째 칸 -->
						<th>약효능</th>
						<c:set var="effect"></c:set>
						<c:forEach var="data" items="${effectList}">
						<c:set var="effect" value="${effect} ${data.EFFECT_NM}" />
						</c:forEach>
						<td colspan="4">
							${effect}
						</td>
					</tr>
					<tr>
						<!-- 다섯 번째 칸 -->
						<th>복용방법</th>
						<td colspan="4">${data.TAKE_METH}</td>
					</tr>
					<tr>
						<!-- 다섯 번째 칸 -->
						<th>부작용</th>
						<c:set var="seffect"></c:set>
						<c:forEach var="data" items="${seffectList}">
						<c:set var="seffect" value="${seffect} ${data.SEFFECT_NM}" />
						</c:forEach>
						<td colspan="4">${seffect}</td>
					</tr>
				</table>
				<div>
					<form action="#" id="goForm">
						<input type="button" class="del btn" value="목록">
							<div class="btn_one"></div>
					</form>
						<input type="button" class="regsu btn" value="수정">
							<div class="btn_one"></div>
				</div>
			</div>
		</div>
</body>
</html>