<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>등록 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/medicineMgt_Info_sujeong.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<script type="text/javascript"src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/admin/medicineMgt_Info_sujeong.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/script/jquery/jquery.form.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$("#num").val($("#effeNo").val());
	$("#num3").val($("#seffeNo").val());
	reloadList();
	$("#fihi").on("click",function(){
		$("#fix").click();
	});
	$("#fix").on("change",function(event){
		
		var file = event.target.files[0];

	    var reader = new FileReader();
	    
	    reader.onload = function(e) {

	    	$("#imgch").attr("src", e.target.result);
	    }
	    reader.readAsDataURL(file);
	});
	
	 $(".delef").on("click",function() {
         if ($(".poPup2").css("display") == "block") {
            $(".poPup2").hide();
         } else if ($(".poPup2").css("display") == "none") {
            $(".poPup2").show();
         }
      });
	 $(".delseffect").on("click",function() {
         if ($(".poPup3").css("display") == "block") {
            $(".poPup3").hide();
         } else if ($(".poPup3").css("display") == "none") {
            $(".poPup3").show();
         }
      });
	  $(".reg").on("click",function() {
          if ($(".poPup4").css("display") == "block") {
             $(".poPup4").hide();
          } else if ($(".poPup4").css("display") == "none") {
             $(".poPup4").show();
          }
       });
	  
	  $(".regsef").on("click",function() {
          if ($(".poPup5").css("display") == "block") {
             $(".poPup5").hide();
          } else if ($(".poPup5").css("display") == "none") {
             $(".poPup5").show();
          }
       });
	  $(".regseffect").on("click",function() {
          if ($(".poPup6").css("display") == "block") {
             $(".poPup6").hide();
          } else if ($(".poPup6").css("display") == "none") {
             $(".poPup6").show();
          }
       });
	  $(".regpl").on("click",function() {
          if ($(".poPup1").css("display") == "block") {
             $(".poPup1").hide();
          } else if ($(".poPup1").css("display") == "none") {
             $(".poPup1").show();
          }
       });
	  $(".bYes").on("click",function(){
		  var form =$("#sujeongForm");
    	  // ajaxForm 적용
    	  form.ajaxForm({
    		  success: function(res){ // 데이터 주고 받기 성공 시
    			if(res.result == "SUCCESS"){ // 파일 전송 성공
    				// 올라간 파일이 존재한다면
    				if(res.fileName.length > 0){
    					$("#pic").val(res.fileName[0]);
    				}
    			
		  var params = $("#sujeongForm").serialize();
		  console.log(params);
	        $.ajax({
	       	 url : "AREPAction/insert",
	       	 type : "POST",
	       	 dateType : "json",
	       	 data : params,
	       	 success : function(res){
	       		 console.log(res);
	       		 switch (res.msg) {
					case "success":
						alert("수정 완료!");
						location.href = "Medicine";
						break;
					case "failed":
						makeAlert("알림","등록에 실패했습니다.");
						break;
					case "error" :
						makeAlert("알림","등록 중 문제가 발생했습니다.");
						break;
					}
	       	 },
	       	 error : function(request, status , error){
	       		 console.log(request.responseText);
	       	 }
	        });
    			}
    			else{
    				makeAlert("알림","파일 업로드에 <br /> 문제가 발생했습니다.");
    			}
    		},
    				error: function(){ // 에러 시
    		    		makeAlert("알림","파일 업로드에 <br /> 문제가 발생하였습니다.");
    		    		 }
    		    	});
    		    	form.submit();
	  });
	  $(".Yes").on("click",function() {
		  location.href = "Medicine";
	  });
	   $(".cYes").on("click", function(){
		  	
			var params = $("#sujeongForm").serialize();
	        $.ajax({
	       	 url : "MedicineAction/sefinsert",
	       	 type : "POST",
	       	 dateType : "json",
	       	 data : params,
	       	 success : function(res){
	       		 console.log(res);
	       		 switch (res.msg) {
					case "success":
						$("#seffe").val($("#seffe").val()+ " " +$("#seef").val());
						if($("#seffeNo").val() == "") {
							$("#seffeNo").val(res.mediSefmid);
						} else {
							$("#seffeNo").val($("#seffeNo").val()+ "," +res.mediSefmid);
						}
						$(".poPup5").hide();
						$("#noneDiv4").hide();
						$("#btn4").html('부작용 데이터 추가');
						break;
					case "failed":
						makeAlert("알림","등록에 실패했습니다.");
						break;
					case "error" :
						makeAlert("알림","등록 중 문제가 발생했습니다.");
						break;
					}
	       	 },
	       	 error : function(request, status , error){
	       		 console.log(request.responseText);
	       	 }
	        })
		}); 
});
</script>
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
		<div class="poPup_serch">
			<div class="data1">약효능을 선택하라.</div>
			<div class="mok">
			<form action="#" id="popForm4">
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
				<input type="button" class="delef btn" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="regpl btn" value="수정">
			<div class="btn_one"></div>
			<div class="paging_area" id="pag"></div>
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
				<input type="button" class="delseffect btn" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="regseffect btn" value="추가">
			<div class="btn_one"></div>
			<div class="paging_area"></div>
		</div>
		<div class="poPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="Yes" value="네"></div>
			</div>
		</div>
		<div class="poPup1">
			<div class="data">수정하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="eYes" value="네"></div>
			</div>
		</div>
		<div class="poPup2">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="dYes" value="네"></div>
			</div>
		</div>
		<div class="poPup3">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="aYes" value="네"></div>
			</div>
		</div>
		<div class="poPup4">
			<div class="data">수정하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="bYes" value="네"></div>
			</div>
		</div>
		<div class="poPup5">
			<div class="data">등록하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="cYes" value="네"></div>
			</div>
		</div>
		<div class="poPup6">
			<div class="data">수정하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="fYes" value="네"></div>
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
					<b>관리자 홈 > 의약품 관리 > 상세보기 > 수정</b>
			</div>
				<button id="btn4" class="sh">부작용 데이터 추가</button>
				<button id="btn3" class="sh">복용방법 데이터 추가</button>
				<button id="btn1" class="sh">약효능 데이터 추가</button>
				<button id="btn2" class="sh">제형 데이터 추가</button>
			<form action="fileUploadAjax" id="sujeongForm" method="post" enctype="multipart/form-data">
				<input type="hidden" name="pic" id="pic" /> 
				<input type="file" name="picFile" id="fix" /> 
				<input type="hidden" id="num" name="num" />
				<input type="hidden" id="num3" name="num3"  />
				<input type="hidden" id="numnum" name="numnum" value="${data.MEDI_NUM}" />
				<input type="hidden" name="no" id="no" value="${param.no}"/>
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
					<td rowspan="2" id="mednum">${data.MEDI_NUM}</td>
					<th>제품명</th>
					<td>${data.PROD_NM}</td>
					<td rowspan="4" id="fihi">
						<div>
							<img id="imgch" style="width: 400px; height: 300px;" src="resources/upload/${data.PIC}">
						</div>
					</td>
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
					<!-- 네 번째 칸 
						팝업창 시작
					-->
					<th>제형</th>
					<c:set var="shape"></c:set>
					<c:forEach var="data" items="${shapeList}">
					<c:set var="shape" value="${shape} ${data.SHAPE_NM}" />
					</c:forEach>
					<td colspan="3">
					<select id="select">
							<option value="0">${shape}</option>
					</select></td>
				</tr>
				<tr>
					<!-- 다섯 번째 칸 -->
					<th>약효능</th>
					<c:set var="effect"></c:set>
					<c:forEach var="data" items="${detailList}">
					<c:set var="effect" value="${effect} ${data.EFFECT_NM}" />
					<c:set var="effectNo" value="${effectNo},${data.EFFECT_NUM}" />
					</c:forEach>
					<c:set var="effectNoLength" value="${fn:length(effectNo)}"></c:set>
					<c:choose>
						<c:when test="${effectNoLength > 0}">
							<c:set var="effectNoVal" value="${fn:substring(effectNo, 1, effectNoLength)}" />
						</c:when>
						<c:otherwise>
							<c:set var="effectNoVal" value="" />
						</c:otherwise>
					</c:choose>
					<td colspan="4">
						<input type="text" class="text1" id="effe" value="${effect}">
						<input type="hidden" name="effe" id="effeNo" value="${effectNoVal}" />
						<div id="searchimg">
							<img id="searchimg" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
				<tr>
					<!-- 다섯 번째 칸 -->
					<th>복용방법</th>
					<td colspan="4"><input type="text" class="text1" name="metk" value="${data.TAKE_METH}">
						<div id="searchimg">
							<img id="searchimg1" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
				<tr>
					<!-- 다섯 번째 칸 -->
					<th>부작용</th>
					<c:set var="seffect"></c:set>
					<c:forEach var="data" items="${seffectList}">
					<c:set var="seffect" value="${seffect} ${data.SEFFECT_NM}" />
					<c:set var="seffectNo" value="${seffectNo},${data.SEFFECT_NUM}" />
					</c:forEach>
					<c:set var="seffectNoLength" value="${fn:length(seffectNo)}"></c:set>
						<c:choose>
							<c:when test="${seffectNoLength > 0}">
								<c:set var="seffectNoVal" value="${fn:substring(seffectNo, 1, seffectNoLength)}" />
							</c:when>
							<c:otherwise>
								<c:set var="seffectNoVal" value="" />
							</c:otherwise>
						</c:choose>
						<td colspan="4">
						<input type="text" class="text1" id="seffe" value="${seffect}">
						<input type="hidden" name="seffe" id="seffeNo" value="${seffectNoVal}">
						<div id="searchimg">
							<img id="searchimg2" class="searchimg"
								src="resources/images/adminPage/search_icon.png">
						</div></td>
				</tr>
			</table>
			<div>
				<input type="button" class="del btn" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="reg btn" value="수정">
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
				    <td><input type="text" class="text" id="meef" name="meef" placeholder="내용을 입력하세요." /></td>
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
				    <td><input type="text" class="text" placeholder="내용을 입력하세요." /></td>
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
				    <td colspan="2"><input type="text" class="text" placeholder="내용을 입력하세요." /></td>
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
				    <td><input type="text" class="text" id="seef" name="seef" placeholder="내용을 입력하세요." /></td>
				  </tr>
				</tbody>
				</table>
				<div>
					<input type="button" class="del btn" value="취소">
					<div class="btn_one"></div>
					<input type="button" class="regsef btn" value="등록">
					<div class="btn_one"></div>
				</div>
				</div>
				</form>
		</div>
	</div>
</body>

</html>