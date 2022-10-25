<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>등록 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/medicineMgt_Info_enroll.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/js/admin/medicineMgt_Info_enroll.js"></script>
<script type="text/javascript" 
		src="resources/script/jquery/jquery.form.js"></script>
</head>
<body>
<form action="Medicine" id="backForm" method="post">
</form>
<c:import url="/AdminImport"></c:import>
		<div class="right_wrap">
		<div class="poPup_serch">
			<div class="data1">약효능을 선택하라.</div>
			<div class="mok">
			<form action="#" id="popForm">
			<input type="hidden" name="page" id="page" value="1" />
				<table class="popT">
					<colgroup>
						<col width="100" />
						<col width="300" />
					</colgroup>
					<thead>
					<tr>
						<th class="popTh"></th>
						<th class="popTh" style="width: 96%;">약 효능</th>
					</tr>
					</thead>
					<tbody class="popccc"></tbody>
				</table>
			</form>

			</div>
			<pre class="br1"></pre>
				<input type="button" class="del btn" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="regpl btn" value="추가">
			<div class="btn_one"></div>
			<div class="paging_area"></div>
		</div>
		<div class="poPup_serch1">
			<div class="data1">복용방법을 선택하라.</div>
			<div class="mok">
				<table class="popT">
					<colgroup>
						<col width="100" />
						<col width="300" />
					</colgroup>
					<thead>
					<tr>
						<th class="popTh"></th>
						<th class="popTh" style="width: 96%;">복용방법</th>
					</tr>
					</thead>
					<tbody class="popc1"></tbody>
				</table>
			</div>
			<pre class="br1"></pre>
				<input type="button" class="del btn" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="regpl btn" value="추가">
			<div class="btn_one"></div>
		</div>
		<div class="poPup_serch2">
			<div class="data1">부작용을 선택하라.</div>
			<div class="mok">
			<form action="#" id="popForm2" method="post">
				<table class="popT">
					<colgroup>
						<col width="100" />
						<col width="300" />
					</colgroup>
					<thead>
					<tr>
						<th class="popTh"></th>
						<th class="popTh" style="width: 96%;">부작용</th>
					</tr>
					</thead>
					<tbody class="popc2"></tbody>
				</table>
			</form>
			</div>
			<pre class="br1"></pre>
				<input type="button" class="del btn" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="regpl btn" value="추가">
			<div class="btn_one"></div>
			<div class="paging_area"></div>
		</div>
		<div class="poPup_serch3">
			<div class="data1">업체를 선택 하라.</div>
			<div class="mok">
				<form action="#" id="popForm2" method="post">
					<table class="popT">
						<colgroup>
							<col width="100" />
							<col width="300" />
						</colgroup>
						<thead>
							<tr>
								<th class="popTh"></th>
								<th class="popTh" style="width: 96%;">업체명</th>
							</tr>
						</thead>
						<tbody class="popc4"></tbody>
					</table>
				</form>
			</div>
			<pre class="br1"></pre>
			<input type="button" class="del btn" value="취소">
			<div class="btn_one"></div>
			<input type="button" class="regpl btn" value="추가">
			<div class="btn_one"></div>
			<div class="paging_area"></div>
		</div>
		<div class="poPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="wYes" value="네"></div>
			</div>
		</div>
		<div class="poPup1">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="bYes" value="네"></div>
			</div>
		</div>
		<div class="poPup2">
			<div class="data">등록하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="cYes" value="네"></div>
			</div>
		</div>
		<div class="poPup3">
			<div class="data">등록하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="aYes" value="네"></div>
			</div>
		</div>
		<div class="poPup4">
			<div class="data">등록하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="dYes" value="네"></div>
			</div>
		</div>
		<div class="poPup5">
			<div class="data">등록하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="eYes" value="네"></div>
			</div>
		</div>
		<div class="poPup6">
			<div class="data">등록하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="fYes" value="네"></div>
			</div>
		</div>
		<div class="poPup7">
			<div class="data">등록하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="gYes" value="네"></div>
			</div>
		</div>
		<div class="top_header">
			<div class="header">
				<div class="menu"></div>
				<div class="homepage_name">Good Medicine</div>
			</div>
		</div>
		<form action="Medicine" id="backForm" method="post">
			<input type="hidden" name="page" id="page" value="${param.page}" />
			<input type="hidden" name="searchGbn" id="searchGbn" value="${param.searchGbn}" /> 
			<input type="hidden" name="searchTxt" id="searchTxt" value="${param.searchTxt}" />
		</form>
		<div id="bottom">
			<div class="nav">
					<b>관리자 홈 > 의약품 관리 > 의약품 등록</b>
			</div>
				<button id="btn4" class="sh">부작용 데이터 추가</button>
				<button id="btn3" class="sh">복용방법 데이터 추가</button>
				<button id="btn1" class="sh">약효능 데이터 추가</button>
				<button id="btn2" class="sh">제형 데이터 추가</button>
			<form action="fileUploadAjax" id="actionForm" method="post" enctype="multipart/form-data">
				<input type="hidden" id="num" name="num" />
				<input type="hidden" id="num2" name="num2" />
				<input type="hidden" id="num3" name="num3" />
				<input type="hidden" id="num4" name="num4" />
				<input type="hidden" name="pic" id="pic" />
				<input type="file" name="picFile" id="fix" />
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
					<td rowspan="2">고유의 번호</td>
					<th>제품명</th>
					<td><input type="text" class="text" name="prnm" id="prnm" placeholder="내용을 입력하세요." /></td>
					<td rowspan="4" id="fihi">
						<div>
							<img id="imgch" style="width: 400px; height: 300px;" src="resources/upload/${data.PIC}">
						</div>
					</td>
				</tr>
				<tr>
					<!-- 두 번째 칸 -->
					<th>제품코드</th>
					<td><input type="text" class="text" name="prcode" id="prcode" placeholder="내용을 입력하세요." /></td>
				</tr>
				<tr>
					<!-- 세 번째 칸 -->
					<th>업체명</th>
					<td><input type="text" class="text" readonly="readonly" style="border:none;" onfocus="this.blur()" name="comnum" id="comnum" placeholder="업체를 선택하세요." /></td>
					<th>성분코드</th>
					<td><input type="text" class="text" name="matcode" id="matcode" placeholder="내용을 입력하세요." /></td>
				</tr>
				<tr class="shape">
					<!-- 네 번째 칸 팝업창 시작-->
				</tr>
				<tr>
					<!-- 다섯 번째 칸 -->
					<th>약효능</th>
					<td colspan="4">
					<input type="text" class="text1" id="numm" >
		
						<div id="searchimg">
							<img id="searchimg" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
				<tr>
					<!-- 다섯 번째 칸 -->
					<th>복용방법</th>
					<td colspan="4"><input type="text" class="text1" id="menumm" name="metk">
						<div id="searchimg">
							<img id="searchimg1" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
				<tr>
					<!-- 다섯 번째 칸 -->
					<th>부작용</th>
					<td colspan="4"><input type="text" class="text1" id="seffnum">
						<div id="searchimg">
							<img id="searchimg2" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
			</table>
			
			<div>
				<input type="button" class="maindel btn" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="mainreg btn" value="등록">
				<div class="btn_one"></div>
			</div>
						<!-- 약효능 추가 목록 -->
		<div id="noneDiv" style="display: none;">
			<div class="pdBtn">
				<input type="button" id="delBtn" class="plus" value="테이블 행 삭제"></input>>
				<input type="button" onclick="insertTr()" class="plus" value="테이블 행 추가"></input>>
			</div>
		
			<table class="t">
				<colgroup>
				<col width="120">
				</colgroup>
				  <thead>
				  <tr>
				    <th colspan="2">약효능</th>
				  </tr>
				  </thead>
				</table>
				<table class="t">
				<colgroup>
				<col width="120">
				</colgroup>
				<tbody id="memDiv">
				  <tr>
				    <td><input type="text" class="text" name="meef" id="meef" placeholder="내용을 입력하세요." /></td>
				  </tr>
				</tbody>
				</table>
				<div>
					<input type="button" class="del btn" value="취소">
					<div class="btn_one"></div>
					<input type="button" class="regmeef btn" value="등록">
					<div class="btn_one"></div>
				</div>
				</div>
				<!-- 영양소 추가 정보 -->
				<div id="noneDiv1" style="display: none;">
				<div class = "pdBtn">
				<input type="button" id="delBtn1" class="plus" value="테이블 행 삭제"></input>>
				<input type="button" onclick="insertTr1()" class="plus" value="테이블 행 추가"></input>>
				</div>
			<table class="t">
				<colgroup>
				<col width="120">
				<col width="120">
				</colgroup>
				  <thead>
				  <tr>
				    <th colspan="2">복용방법</th>
				  </tr>
				  </thead>
				</table>
				<table class="t">
				<colgroup>
				<col width="120">
				</colgroup>
				<tbody id="memDiv1">
				  <tr>
				    <td><input type="text" class="text" id="takemeth" name="takemeth" placeholder="내용을 입력하세요." /></td>
				  </tr>
				</tbody>
				</table>
				<div>
					<input type="button" class="del btn" value="취소">
					<div class="btn_one"></div>
					<input type="button" class="regtake btn" value="등록">
					<div class="btn_one"></div>
				</div>
				</div>
				<!-- 제형 파트 -->
				<div id="noneDiv2" style="display: none;">
				
				<div class = "pdBtn">
					<input type="button" id="delBtn2" class="plus" value="테이블 행 삭제"></input>>
					<input type="button" onclick="insertTr2()" class="plus" value="테이블 행 추가"></input>>
				</div>
			<table class="t">
				<colgroup>
				<col width="120">
				<col width="120">
				</colgroup>
				  <thead>
				  	<tr>
				    	<th colspan="2">제형</th>
				    </tr>
				  </thead>
				</table>
				<table class="t">
				<colgroup>
				<col width="110">
				<col width="130">
				</colgroup>
				<tbody id="memDiv2">
				  <tr>
				    <td colspan="2"><input type="text" class="text" name="shapen" id="shapen" placeholder="내용을 입력하세요." /></td>
				  </tr>
				</tbody>
				</table>
				<div>
					<input type="button" class="del btn" value="취소">
					<div class="btn_one"></div>
					<input type="button" class="reg btn" value="등록">
					<div class="btn_one"></div>
				</div>
				
				</div>
				<!-- 부작용 파트 -->
				<div id="noneDiv4" style="display: none;">
				<div class = "pdBtn">
					<input type="button" id="delBtn4" class="plus" value="테이블 행 삭제"></input>>
					<input type="button" onclick="insertTr4()" class="plus" value="테이블 행 추가"></input>>
				</div>
			<table class="t">
				<colgroup>
				<col width="120">
				</colgroup>
				  <thead>
				  	<tr>
				    	<th colspan="2">부작용</th>
				    </tr>
				  </thead>
				</table>
				<table class="t">
				<colgroup>
				<col width="120">
				</colgroup>
				<tbody id="memDiv4">
				  <tr>
				    <td><input type="text" class="text" name="mesef" id="mesef"placeholder="내용을 입력하세요." /></td>
				  </tr>
				</tbody>
				</table>
				<div>
					<input type="button" class="del btn" value="취소">
					<div class="btn_one"></div>
					<input type="button" class="regmesef btn" value="등록">
					<div class="btn_one"></div>
				</div>
				</div>
				</form>
		</div>
	</div>
</body>
</html>