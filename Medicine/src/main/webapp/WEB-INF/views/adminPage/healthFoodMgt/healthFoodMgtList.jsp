<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>목록</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/healthFoodMgtList.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/js/admin/healthFoodMgtList.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		if("${param.searchGbn}" != ""){ //검색 구분이 넘어오면
			$("#searchGbn").val("${param.searchGbn}");
		}else{
			$("#oldGbn").val("0")
		}
		// 목록 조회
		reloadList();
		//검색 버튼
		$("#searchBtn").on("click", function(){
			$("#page").val("1");
			// 신규 상태 적용
			$("#oldGbn").val($("#searchGbn").val());
			$("#oldTxt").val($("#searchTxt").val());
			
			reloadList();
		});
		
		// 페이징 버튼
		$(".paging_area").on("click", "span", function(){
			// 기존 검색 상태 유지
				$("#searchGbn").val($("#oldGbn").val());
				$("#searchTxt").val($("#oldTxt").val());
			$("#page").val($(this).attr("page"));
			
			reloadList();
		});
		
		   // 상세보기 이동
		$("tbody").on("click", "td", function() {
			$("#no").val($(this).attr("no"));
			//검색 상태 유지
			$("#searchGbn").val($("#oldGbn").val());
			$("#searchTxt").val($("#oldTxt").val());
			
			$("#actionForm").attr("action", "healthFoodInfo");
			$("#actionForm").submit();
		});
		   
		// 등록 버튼
		$("#insertBtn").on("click", function() {
			//검색 상태 유지
			$("#searchGbn").val($("#oldGbn").val());
			$("#searchTxt").val($("#oldTxt").val());
			
			$("#actionForm").attr("action", "healthFoodMgtenroll");
			$("#actionForm").submit();
		});

	});
</script>
</head>
<body>
<c:import url="/AdminImport"></c:import>
<!-- 기존 검색 내용 유지용 -->
<input type="hidden" id="oldGbn" value="${param.searchGbn}"/>
<input type="hidden" id="oldTxt" value="${param.searchTxt}"/>
<div class="right_wrap">
		<div class="top_header">
			<div class="header">
				<div class="menu"></div>
				<div class="homepage_name">Good Medicine</div>
			</div>
		</div>
		<div class="poPup1" id="delpoPup">
			<div class="data">삭제하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
			<div><input type="button" class="No" value="아니요"></div>
			<div><input type="button" class="Yes" id="delyes" value="네"></div>
			</div>
		</div>

		
		<div id="bottom">
			<div class="nav">
				<p><b>관리자 홈 > 건강 기능 식품 관리</b><p>
			</div>
			<div id="bottom_left">
				<table class="tl">
					<colgroup>
						<!-- 전체 750 -->
						<col width="50" />
						<col width="100" />
						<col width="100" />
						<col width="400" />
						<col width="200" />
					</colgroup>
					<thead>
						<tr class="th_main">
							<th></th>
							<th>번호</th>
							<th>사진</th>
							<th>제품명</th>
							<th>업체명</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
			<div id="bottom_right">
				<table class="tr">
					<colgroup>
						<!-- 전체 850 -->
						<col width="50" />
						<col width="100" />
						<col width="100" />
						<col width="400" />
						<col width="200" />
					</colgroup>
					<thead>
						<tr class="th_main">
							<th></th>
							<th>번호</th>
							<th>사진</th>
							<th>제품명</th>
							<th>업체명</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>

		<form action="#" id="actionForm" method="post">
		<div class="select_bar">
				<input type="hidden" id="page" name="page" value="1" />
				<input type="hidden" name="no" id="no" />
				<input type="hidden" name="checkdel" id="checkdel" />
				<select class="select_1" name="searchGbn" id="searchGbn" style="margin-bottom: 8px;">
					<option value="0">제품명</option>
					<option value="1">업체명</option>
				</select> 
				
				<input type="text" class="text" name="searchTxt" id="searchTxt" value="${param.searchTxt}"/> 
				<input type="button" class="serbtn" value="검색" id="searchBtn">
		</div>
			
			<br/> <br/>
		
			<div class="paging_area"></div>
			<div>
				<input type="button" class="del btn" id="delBtn" value="삭제">
				<div class="btn_one"></div>
				<input type="button" class="reg btn" id="insertBtn" value="등록">
				<div class="btn_one"></div>
			</div>
			</form>
		</div>
	</div>
</body>
</html>