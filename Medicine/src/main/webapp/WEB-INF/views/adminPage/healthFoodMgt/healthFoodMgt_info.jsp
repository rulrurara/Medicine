<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상세보기 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/healthFoodMgt_Info.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/js/admin/healthFoodMgt_Info.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	
	// 수정
	  $("#updateBtn").on("click", function(){
	      $("#actionForm").attr("action", "healthFoodMgtsujeong");
	      $("#actionForm").submit();
	   });
	
	// 목록이동
		$("#listBtn").on("click", function(){
		      $("#actionForm").attr("action", "healthFoodMgtList");
		      $("#actionForm").submit();
		   });
});
</script>
</head>
<body>
<c:import url="/AdminImport"></c:import>

	<form action="#" id="actionForm" method="post">
		<!-- 전 화면에서 넘어온 페이지 정보 -->
		<input type ="hidden" name="page" id="page" value="1"/>
		<!-- 전 화면에서 넘어온 검색 정보 -->
		<input type ="hidden" name="searchGbn" value="${param.searchGbn}" />
		<input type ="hidden" name="searchTxt" value="${param.searchTxt}" />
	
		<input type="hidden" name="no" value="${data.HEALTH_FUN_FOOD_NUM}">
		
		<input type="hidden" name="shapeNo" id="shapeNo" value="${data.SHAPE_NUM}">
		<input type="hidden" name="comNo" id="comNo" value="${data.COM_NUM}">
		
	</form>
	<div class="right_wrap">
		<div class="top_header">
			<div class="header">
				<div class="menu"></div>
				<div class="homepage_name">Good Medicine</div>
			</div>
		</div>
		<div id="bottom">
			<div class="nav">
				<b>관리자 홈 > 건강 기능 식품 관리 > 상세보기</b>
			</div>
		<table class="t">
				<colgroup>
					<!-- 전체 길이 1500기준. -->
					<col width="300" />
					<col width="200" />
					<col width="200" />
					<col width="200" />
					<col width="500" />
				</colgroup>
				<tr>
					<th>작성자</th>
					<td>${data.NM}</td>
					<th>건강 기능 식품 번호</th>
					<td>${data.HEALTH_FUN_FOOD_NUM}</td>
					<td colspan="2" rowspan="12"><div>
							 <%-- ${data.PROD_PIC} --%> 
							<img class="imm" src="resources/upload/${data.PROD_PIC}">
						</div>
						<a href="resources/upload/${data.PROD_PIC}"download="${fileName}">${fileName}</a>
						</td>
				</tr>
				<tr>
					<th>업체명</th>
					<td colspan="3">${data.COM_NM}</td>
				</tr>
				<tr>
					<th>제품명</th>
					<td colspan="3">${data.PROD_NM}</td>
				</tr>
			</table>
			<!-- 기능성 추가 목록 -->

			<table class="t">
				<colgroup>
				<col width="120">
				<col width="120">
				</colgroup>
				  <thead>
				  <tr>
				    <th>기능성 이미지</th>
				    <th>설명</th>
				  </tr>
				  </thead>
				</table>
				<table class="t">
				<colgroup>
				<col width="120">
				<col width="120">
				</colgroup>
				<tbody id="memDiv">
				</tbody>
				</table>
				
						<!-- 제형 파트 -->
				
			<table class="t">
				<colgroup>
				<col width="120">
				<col width="120">
				</colgroup>
				  <thead>
				  <tr>
				    <th>제형 이미지</th>
				    <th>제형명</th>
				  </tr>
				  </thead>
				</table>
				<table class="t" >
				<colgroup>
				<col width="120">
				<col width="120">
				</colgroup>
				<tbody id="memDiv2">
				</tbody>
				</table> 
			 	<!-- 영양소 추가 정보 -->
			 	
			<table class="t">
				<colgroup>
				<col width="120">
				<col width="120">
				</colgroup>
				  <thead>
				  <tr>
				    <th>영양소 종류</th>
				    <th>수치</th>
				  </tr>
				  </thead>
				</table>
				<table class="t">
				<colgroup>
				<col width="120">
				<col width="120">
				</colgroup>
				<tbody id="memDiv1">
				</tbody>
				</table>
				<br/> <br/>
				<div class="paging_area" style="margin-top: 25px;"></div>
		
			<div>
				<input type="button" class="del btn" id="listBtn" value="목록">
				<div class="btn_one"></div>
				<input type="button" class="reg btn"  id="updateBtn" value="수정">
				<div class="btn_one"></div>
			</div>
			</div>
		</div>
</body>
</html>