<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>등록 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/healthFoodMgt_Info_enroll.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/js/admin/healthFoodMgt_Info_enroll.js"></script>
<script type="text/javascript" src="resources/script/common/popup.js"></script>
<script type="text/javascript" src="resources/script/jquery/jquery.form.js"></script>

</head>
<body>
<c:import url="/AdminImport"></c:import>
<form action="healthFoodMgtList" id="backForm" method="post">
      <input type="hidden" name="page" value="${param.page}" />
      <input type="hidden" name="searchGbn" value="${param.searchGbn}" />
      <input type="hidden" name="searchTxt" value="${param.searchTxt}" />
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
			<div class="data">등록하시겠습니까?</div>
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

			 <b class="nav">관리자 홈 > 건강 기능 식품 관리 > 등록</b>
				<button id="btn3" class="sh">영양소 데이터 추가</button>
				<button id="btn1" class="sh">기능성 데이터 추가</button>
				<button id="btn2" class="sh">업체 추가</button>
			<form action="fileUploadAjax" id="actionform" method="post" enctype="multipart/form-data">
				<input type="hidden" id="num" name="num" />
				<input type="hidden" id="num1" name="num1" />
				<input type="hidden" id="fig1" name="fig1" />
				<input type="hidden" id="com1" name="com1" />
				<input type="hidden" id="func1" name="func1" />
				<input type="hidden" id="nut1" name="nut1" />
				<input type="hidden" id="nut2" name="nut2" />
				<input type="hidden" id="nut3" name="nut3" />
				<input type="hidden" id="nut4" name="nut4" />
				<input type="hidden" id="nut5" name="nut5" />
				
				<!-- 파일 이름 보관용 -->
				<input type="hidden" id="pic" name="pic" />
				
				<input type="hidden" id="no" name="no" />
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
					<td>${sMemNm}
					<input type="hidden" name="memNo" id="memNo" value="${sMemNo}"></td>
					<th>제품명</th>
					<td><input type="text" name="prodNm" id="prodNm" class="text" placeholder="내용을 입력하세요." /></td>
					<td colspan="1" rowspan="12"><div>
							<input type="file" name="picFile" onchange="readURL(this);"/>
							<img id="im" />
						</div></td>
				</tr>
				<tr>
					<th>업체명</th>
					<td colspan="3">
					<select name="comNo" id="select">
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
					<select name="shapeNo" id="select">
						<c:forEach var="data" items="${shape}">
							<option value="${data.SHAPE_NUM}">${data.SHAPE_NM}</option>
						</c:forEach>
					</select>
					</td>
				</tr>
				<tr>
					<th>기능성</th>
					<td colspan="3"><input type="text" class="text1" id="funcnm">
						<div id="searchimg">
							<img id="searchimg" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
				<tr>
					<th>영양소</th>
					<td colspan="3"><input type="text" class="text1" id="nutnm" >
						<div id="searchimg">
							<img id="searchimg1" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
				<tr>
					<th>수치</th>
					<td colspan="3"><input type="text" class="text1" id="fig" name="fig" >
						<div id="searchimg">
							<img id="searchimg2" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
				
			</table>
				<div>
					<input type="button" class="del btn" id="listBtnPopup" value="취소">
					<div class="btn_one"></div>
					<input type="button" class="reg btn" id="insertBtnPopup" value="등록">
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
				  <tr>
				    <td><input type="text" class="text" name="com" id="com" placeholder="업체를 입력하세요." /></td>
				  </tr>
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