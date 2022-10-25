<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/userPage/medicineInfo_list.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/medicineInfo_list.js"></script>
</head>
<body>
<c:import url="/ComImport"></c:import>
	<div class="info">의약품 목록</div>
	<div class="gnb">메인페이지 - 의약품 목록</div>
	<div class="main_border">
		
		<table class="main_table_left">
			<colgroup>
				<col width="100px">
				<col width="224.86px">
				<col width="100px">
				<col width="150px">
				<col width="150px">
			</colgroup>
			<thead>
				<tr>
					<th>번호</th>
					<th>사진</th>
					<th>약품명</th>
					<th>성분명</th>
					<th>업체명</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
				
		<table class="main_table_right" style="position: absolute;">
			<colgroup>
				<col width="100px">
				<col width="224.86px">
				<col width="100px">
				<col width="150px">
				<col width="153px">
			</colgroup>
			<thead>
				<tr>
					<th>번호</th>
					<th>사진</th>
					<th>약품명</th>
					<th>성분명</th>
					<th>업체명</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		
		<!-- 검색창 -->
		<form action="#" id="actionForm" method="post">
		<input type="hidden" id="page" name="page" value="${page}"/>
		<input type="hidden" id="no" name="no"/>
		<input type="hidden" id="mediNum" name="mediNum" />
		<div class="border_wrap">
	<div class="search_border">
			<select class="select_border" name="searchGbn" id="searchGbn" value="${params.searchGbn}">
				<option value="1">제품명</option>
				<option value="2">업체명</option>
				<option value="3">성분명</option>
			</select>
		<div class="search_text_border">
			<c:choose>
				<c:when test="${param.searchGbn eq 1}">
					<input type="text" id="searchTxt"  class="searchTxt" name="searchTxt" placeholder="검색어를 입력해주세요." value="${param.searchTxt}" />
					<input type="hidden" id="oldTxt" name="oldTxt" value="${param.searchTxt}" /> 
					<input type="hidden" id="oldGbn" name="oLdGbn" value="${param.searchGbn}" />
				</c:when>
				<c:when test="${param.searchGbn eq 2}">
					<input type="text" id="searchTxt"  class="searchTxt" name="searchTxt" placeholder="검색어를 입력해주세요." value="${param.searchTxt2}" />
					<input type="hidden" id="oldTxt" name="oldTxt" value="${param.searchTxt2}" /> 
					<input type="hidden" id="oldGbn" name="oLdGbn" value="${param.searchGbn}" />
				</c:when>
				<c:when test="${param.searchGbn eq 3}">
					<input type="text" id="searchTxt" class="searchTxt" name="searchTxt" placeholder="검색어를 입력해주세요." value="${param.searchTxt3}" />
					<input type="hidden" id="oldTxt" name="oldTxt" value="${param.searchTxt3}" /> 
					<input type="hidden" id="oldGbn" name="oLdGbn" value="${param.searchGbn}" />
				</c:when>
				<c:otherwise>
					<input type="text" id="searchTxt"  class="searchTxt" name="searchTxt" placeholder="검색어를 입력해주세요." value="" />
				</c:otherwise>
			</c:choose>
			
			<input type="button" id="searchBtn" class="searchBtn medicineSearchBtn" value="검색"/>
		</div>
	</div>
            <div class="paging_area"></div>
      
        
       </div>
        <input type="button" class="listBtn" value="목록으로"/>
       </form>
	</div>
</body>
</html>