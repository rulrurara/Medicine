<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>수정 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/healthFoodMgt_Info_sujeong.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/js/admin/healthFoodMgt_Info_sujeong.js"></script>
<script type="text/javascript" src="resources/script/common/popup.js"></script>
<script type="text/javascript" src="resources/script/jquery/jquery.form.js"></script>

</head>
<body>
<c:import url="/AdminImport"></c:import>
<form action="#" id="actionForm" method="post">
	<input type="hidden" name="no" id="no" value="${param.no}"/>
	<input type="hidden" name="page" id="page"value="${param.page}" />
	<input type="hidden" name="searchGbn" id="searchGbn"value="${param.searchGbn}" />
	<input type="hidden" name="searchTxt" id="searchTxt" value="${param.searchTxt}" />
</form>
	<div class="right_wrap">
<!-- 기능성 팝업창 -->
	<div class="poPup_serch1">
			<div class="data1">기능성명을 선택해주세요.</div>
			<div class="mok">
			<form id="popForm">
				<table class="popT" style=" display: block; overflow: auto;">
					<colgroup>
						<col width="100" />
						<col width="300" />
					</colgroup>
					<thead>
					<tr>
						<th class="popTh"></th>
						<th class="popTh" style="width: 96%;">기능성명</th>
					</tr>
					</thead>
					<tbody class="fu">
					</tbody>
				</table>
			</form>
			</div>
			<pre class="br1"></pre>
				<input type="button" class="del btn" id="funcCancle" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="reg btn" id="funcInsert" value="추가">
			<div class="btn_one"></div>
		</div>
		
		<!-- 기능성 팝업 -->
		<div class="funcpoPup" id="funclistpoPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="funcYes" id="funclistBtn" value="네"></div>
			</div>
		</div>
		<div class="funcpoPup" id="funcinsertpoPup">
			<div class="data"> 추가하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="funcYes" id="funcPlus" value="네"></div>
			</div>
		</div>
		<!-- 기능성 등록 팝업 -->
		<div class="funcpoPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="funcYes" id="funlistBtn" value="네"></div>
			</div>
		</div>
		<div class="funcpoPup" id="funcinsertpop">
			<div class="data"> 추가하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="funcYes" id="funcinyes" value="네"></div>
			</div>
		</div>
		<!-- 영양소 팝업창 -->
		<div class="poPup_serch2">
			<div class="data1">영양소를 선택하라.</div>
			<div class="mok">
			<form id="popForm">
				<table class="popT" style=" display: block; overflow: auto;">
					<colgroup>
						<col width="100" />
						<col width="150" />
						<col width="150" />
						<col width="150" />
					</colgroup>
					<thead>
					<tr>
						<th class="popTh"></th>
						<th class="popTh" style="width: 96%;">영양소</th>
						<th class="popTh" style="width: 96%;">최소수치</th>
						<th class="popTh" style="width: 96%;">최대수치</th>
					</tr>
					</thead>
					<tbody class="n">
					<tr>
					</tr>
					</tbody>
				</table>
			</form>
			</div>
			<pre class="br1"></pre>
				<input type="button" class="del btn" id="nutCancle" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="reg btn" id="nutInsert" value="추가">
			<div class="btn_one"></div>
		</div>
		<!-- 영양소 팝업 -->
		<div class="nutpoPup" id="nutlistpoPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="nutYes" id="nutlistBtn" value="네"></div>
			</div>
		</div>
		<div class="nutpoPup" id="nutinsertpoPup">
			<div class="data"> 추가하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="nutYes" id="nutplus" value="네"></div>
			</div>
		</div>
		<!-- 영양소 등록 팝업 -->
		<div class="nutpoPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="nutYes" id="nutlistBtn" value="네"></div>
			</div>
		</div>
		<div class="nutpoPup" id="Nutinsertpop">
			<div class="data"> 추가하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="nutYes" id="nutinyes" value="네"></div>
			</div>
		</div>
		<!-- 수치 팝업창 -->
	<div class="poPup_serch3">
			<div id="figdata">수치를 입력해주세요</div>
			<div class="mok">
			<form id="popForm">
				<table class="popT" style=" display: block; overflow: auto;">
					<colgroup>
						<col width="200" />
						<col width="200" />
					</colgroup>
					<thead>
					<tr>
						<th class="popTh" style="width: 65%;">영양소명</th>
						<th class="popTh">수치</th>
					</tr>
					</thead>
					<tbody class="fig">
					</tbody>
				</table>
			</form>
			</div>
			<pre class="br1"></pre>
				<input type="button" class="del btn" id="figCancle" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="reg btn" id="figInsert" value="추가">
			<div class="btn_one"></div>
		</div>
		<!-- 수치 팝업 -->
		<div class="figpoPup" id="figlistpoPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="figYes" id="figlistBtn" value="네"></div>
			</div>
		</div>
		<div class="figpoPup" id="figinsertpoPup">
			<div class="data"> 추가하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="figYes" id="figplus" value="네"></div>
			</div>
		</div>
		
		<!-- 업체 등록 팝업 -->
		<div class="compoPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="comYes" id="comlistBtn" value="네"></div>
			</div>
		</div>
		<div class="compoPup" id="cominsertpop">
			<div class="data"> 추가하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="comYes" id="cominyes" value="네"></div>
			</div>
		</div>
		
		<!-- 게시물 등록 목록 팝업 -->
		<div class="ILpoPup" id="listpoPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="Yes" id="listBtn" value="네"></div>
			</div>
		</div>
		<div class="ILpoPup" id="insertpoPup">
			<div class="data">수정하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="insertYes" id="insertBtn" value="네"></div>
			</div>
		</div>
		<div class="top_header">
			<div class="header">
				<div class="menu"></div>
				<div class="homepage_name">Good Medicine</div>
			</div>
		</div>
		<div id="bottom">

			 <b class="nav">관리자 홈 > 건강 기능 식품 관리 > 수정</b>
				<button id="btn3" class="sh">영양소 데이터 추가</button>
				<button id="btn1" class="sh">기능성 데이터 추가</button>
				<button id="btn2" class="sh">업체 추가</button>
				
			<form action="fileUploadAjax" id="actionform" method="post" enctype="multipart/form-data">
				<input type="hidden" id="num" name="num" />
				<input type="hidden" id="num1" name="num1" />
				<input type="hidden" id="fig" name="fig" />
				<input type="hidden" id="com1" name="com1" />
				<input type="hidden" id="func1" name="func1" />
				<input type="hidden" id="nut1" name="nut1" />
				<input type="hidden" id="nut2" name="nut2" />
				<input type="hidden" id="nut3" name="nut3" />
				<input type="hidden" id="nut4" name="nut4" />
				<input type="hidden" id="nut5" name="nut5" />
				<input type="hidden" id="no" name="no" value="${param.no}"/>
				<input type="hidden" id="numnum" name="numnum" value="${data.HEALTH_FUN_FOOD_NUM}" />
				
				<input type="hidden" name="comNum" id="comNum" value="${param.comNo}">
				<input type="hidden" name="shapeNum" id="shapeNum" value="${param.shapeNo}">
			<table class="t">
				<colgroup>
					<!-- 전체 길이 1500기준. -->
					<col width="150" />
					<col width="300" />
					<col width="200" />
					<col width="200" />
					<col width="500" />
				</colgroup>
				<tr>
					<th>작성자</th>
					<td>${data.NM}
					<th>제품번호</th>
					<td>${data.HEALTH_FUN_FOOD_NUM}</td>
					<td colspan="1" rowspan="12">
					<span class="attold"> <!-- 기존 파일 -->
						<img id="im" name="pic" src="resources/upload/${data.PROD_PIC}" />
						<input type="button" class="update btn"  id="fileDelBtn" value="파일삭제">
					</span>
					<span class="att"> <!-- 기존 파일 삭제 후 새 파일 용도 -->
	      				<input type="file" name="picFile" />
	      				<input type="hidden" name="pic" id="pic" value="${data.PROD_PIC}"/>
      				</span>	
					</td>
				</tr>
				<tr>
					<th>제품명</th>
					<td colspan="3">
					<input type="text" class="text1" id="prodNm" name="prodNm"value="${data.PROD_NM}"></td>
				</tr>
				<tr>
					<th>업체명</th>
					<td colspan="3">
					<select name="comNo" id="com">
						<c:forEach var="data" items="${com}">
							<option  value="${data.COM_NUM}">${data.COM_NM}</option>
						</c:forEach>
					</select>
					</td>
				</tr>
				<tr>
					<!-- 네 번째 칸 
						팝업창 시작
					-->
					<th>제형</th>
					<td colspan="3">
					<select name="shapeNo" id="shape">
						<c:forEach var="data" items="${shape}">
							<option value="${data.SHAPE_NUM}">${data.SHAPE_NM}</option>
						</c:forEach>
					</select>
					</td>
				</tr>
				<tr>
					<th>기능성</th>
					<c:set var="func"></c:set>
					<c:forEach var="data" items="${funcList}">
						<c:set var="func" value="${func} ${data.FUNC_NM}" />
						<c:set var="funcNo" value="${funcNo},${data.FUNC_NUM}" />
					</c:forEach>
					<c:set var="funcNoLength" value="${fn:length(funcNo)}"></c:set>
						<c:choose>
							<c:when test="${funcNoLength > 0}">
								<c:set var="funcNoVal" value="${fn:substring(funcNo, 1, funcNoLength)}" />
							</c:when>
							<c:otherwise>
								<c:set var="funcNoVal" value="" />
							</c:otherwise>
						</c:choose>
						<td colspan="3">
						<input type="text" class="text1" id="funcnm" value="${func}">
						<input type="hidden" name="funcnm" id="funcnmNo" value="${funcNoVal}">
						<div id="searchimg">
							<img id="searchimg" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
				<tr>
					<th>영양소</th>
					<c:set var="nut"></c:set>
					<c:forEach var="data" items="${nutList}">
					<c:set var="nut" value="${nut} ${data.NUT_NM}" />
					<c:set var="nutNo" value="${nutNo},${data.NUT_NUM}" />
					</c:forEach>
					<c:set var="nutNoLength" value="${fn:length(nutNo)}"></c:set>
						<c:choose>
							<c:when test="${nutNoLength > 0}">
								<c:set var="nutNoVal" value="${fn:substring(nutNo, 1, nutNoLength)}" />
							</c:when>
							<c:otherwise>
								<c:set var="nutNoVal" value="" />
							</c:otherwise>
						</c:choose>
						<td colspan="3">
						<input type="text" class="text1" id="nutnm"  value="${nut}">
						<input type="hidden" name="nutnm" id="nutnmNo" value="${nutNoVal}">
						<div id="searchimg">
							<img id="searchimg1" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
				<tr>
					<th>수치</th>
					<c:set var="fig"></c:set>
					<c:forEach var="data" items="${figList}">
					<c:set var="fig" value="${fig} ${data.FIG}" />
					<c:set var="figNo" value="${figNo},${data.FIG}" />
					</c:forEach>
					<c:set var="figNoLength" value="${fn:length(figNo)}"></c:set>
						<c:choose>
							<c:when test="${figNoLength > 0}">
								<c:set var="figNoVal" value="${fn:substring(figNo, 1, figNoLength)}"/>
								<c:out value="${figNoVal} ${str1}"></c:out>
							</c:when>
							<c:otherwise>
								<c:set var="figNoVal" value="" />
							</c:otherwise>
						</c:choose>
					<td colspan="3">
					<input type="text" class="text1 fig3" id="fig" name="fig" value="${fig}">
					<input type="hidden" name="fignM" id="fignmNo" value="${figNoVal}">
						<div id="searchimg">
							<img id="searchimg2" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
				
			</table>
				<div>
					<input type="button" class="del btn" id="listBtnPopup" value="취소">
					<div class="btn_one"></div>
					<input type="button" class="reg btn" id="insertBtnPopup" value="수정">
					<div class="btn_one"></div>
				</div>
			<div id="noneDiv" style="display: none;"><!-- 기능성 추가 목록 -->
				<div class="pdBtn">
					<input type="button" id="delBtn" class="plus" value="테이블 행 삭제"></input>>
					<input type="button" onclick="insertTr()" class="plus" value="테이블 행 추가"></input>>
				</div>
			<table class="t">
				<colgroup>
				<col width="120">
				<col width="120">
				</colgroup>
				  <thead>
				  <tr>
				    <th colspan="2">기능성</th>
				  </tr>
				  </thead>
				</table>
				<table class="t">
				<colgroup>
				<col width="110">
				<col width="130">
				</colgroup>
				<tbody id="memDiv">
				</tbody>
				</table>
				<div>
				<input type="button" class="del btn" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="reg btn" id="FuncinsertBtn" value="등록">
				<div class="btn_one"></div>
				</div>
				</div>
				<!-- 영양소 추가 정보 -->
				<div id="noneDiv1" style="display: none;">
				<div class = "pdBtn">
				<input type="button" id="delBtn1" class="plus" value="테이블 행 삭제"></input>>
				<input type="button" onclick="appendTr1()" class="plus rowAddBtn" value="테이블 행 추가"></input>>
				</div>
			<table class="t">
				<colgroup>
				<col width="120">
				<col width="120">
				<col width="120">
				<col width="120">
				<col width="120">
				</colgroup>
				  <thead>
				  <tr>
				    <th>영양소명</th>
				    <th>단위</th>
				    <th>구분</th>
				    <th>최소적정복용</th>
				    <th>최대적정복용</th>
				  </tr>
				  </thead>
				</table>
				<table class="t">
				<colgroup>
				<col width="120">
				<col width="120">
				<col width="120">
				<col width="120">
				<col width="120">
				</colgroup>
				<tbody id="memDiv1">
				</tbody>
				</table>
				<div>
					<input type="button" class="del btn" value="취소">
					<div class="btn_one"></div>
					<input type="button" class="reg btn" id="NutinsertBtn" value="등록">
					<div class="btn_one"></div>
				</div>
				</div>
				<!-- 업체 파트 -->
				<div id="noneDiv2" style="display: none;">
				<div class = "pdBtn">
					<input type="button" id="delBtn2" class="plus" value="테이블 행 삭제"></input>>
					<input type="button" onclick="insertTr2()" class="plus" value="테이블 행 추가"></input>>
				</div>
				<table class="t">
				<colgroup>
				<col width="120">
				</colgroup>
				  <thead>
				  	<tr>
				    	<th>업체명</th>
				    </tr>
				  </thead>
				</table>
				<table class="t">
				<colgroup>
				<col width="110">
				</colgroup>
				<tbody id="memDiv2">
				</tbody>
				</table>
				<div>
					<input type="button" class="del btn" value="취소">
					<div class="btn_one"></div>
					<input type="button" class="reg btn"  id="CominsertBtn" value="등록">
					<div class="btn_one"></div>
				</div>
				</div>
			</form>
				</div>
				</div>
</body>
</html>