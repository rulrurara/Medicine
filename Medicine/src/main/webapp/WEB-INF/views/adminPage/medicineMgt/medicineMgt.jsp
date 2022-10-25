<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>목록</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/medicineMgt.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/js/admin/medicineMgt.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	reloadList();
	
	$(".paging_area").on("click","span",function(){
		$("#page").val($(this).attr("page"));

		$("#searchGbn").val($("#oldGbn").val());
		$("#searchText").val($("#oldText").val());
		
		reloadList();
	});
	$(".serbtn").on("click",function(){
		$("#page").val("1");
		
		$("#oldGbn").val($("#searchGbn").val());
		$("#oldText").val($("#searchText").val());
		
		reloadList();
	});
	
	$("tbody").on("click","#check",function(){
	      var arr = [];
	      console.log("클릭됨")
	      $("#check:checked").each(function(){
	         arr.push($(this).val());
	      });
	     
	      $("#delete").val(arr);
	    
	});
	   
	
	
	   reloadList();
	      
	   $(".Yes").on("click",function(){
		   var params = $("#searchForm").serialize();
           $.ajax({
              url : "MedicineAction/update", //경로
              type : "POST", //전송방식
              dateType : "json", //데이터 형태
              data : params, //보낼 데이터
              success : function(res) { //성공했을 때 결과를 result에 받고 함수 실행
                 switch(res.msg) { //ATController -> ATAction컨트롤러의 msg값
                 case "success" :
                	$(".poPup").hide();
                	reloadList();
                    break;
                 case "failed" :
                    makeAlert("알림","삭제에 실패했다!");
                    break;
                 case "error" :
                    makeAlert("알림","삭제 중 문제가 발생했다!");
                    break;
                 }
              },
              error : function(request,status,error) { //실패했을 때 함수 실행
                 console.log(request.responseText); //실패 상세내역
              }
           });
	   });
	   
	/*   $(".dele").on("click",function() {
          if ($(".poPup").css("display") == "block") {
             $(".poPup").hide();
          } else if ($(".poPup").css("display") == "none") {
             $(".poPup").show();
          }
       }); */
       
	$("tbody").on("click","td",function(){
		$("#no").val($(this).attr("no"));
		
		$("#searchGbn").val($("#oldGbn").val());
		$("#searchTxt").val($("#oldTxt").val());
		
		$("#searchForm").attr("action","mediList");
		$("#searchForm").submit();
	});
	
});
function reloadList(){
	var params = $("#searchForm").serialize();
	$.ajax({
	      url : "MedicineList", 
	      type : "POST", 
	      dataType : "json", 
	      data : params, 
	      success : function(res) {
	    	  drawList(res.list);
	    	  drawList2(res.list2);
	    	  drawPaging(res.pd);
	      },
	      error : function(request, status, error){ 
	         console.log(request.responseText); 
	      } 
	   });
}
function drawList(list){
	var html = "";
	for(var data of list) {
	html += "<tr no = \"" + data.MEDI_NUM + "\">";
	html += "<th>";
	html += "<input type=\"checkbox\" id=\"check\" value=\"" + data.MEDI_NUM + "\">";
	html += "</th>";
	html += "<td no = \"" + data.MEDI_NUM + "\">" + data.MEDI_NUM + "</td>";
	console.log(data.PIC);
	if(data.PIC == null) {
		html += "<td no = \"" + data.MEDI_NUM + "\">" + "<img class=\"img\" style=\"width: 150px; height: 150px;\" src=\"resources/upload/이미지없음.png\"></td>";
	}else {
		html += "<td no = \"" + data.MEDI_NUM + "\">" + "<img class=\"img\" style=\"width: 150px; height: 150px;\" src=\"resources/upload/" + data.PIC + "\">" + "</td>";		
	}
	html += "<td no = \"" + data.MEDI_NUM + "\">" + data.PROD_NM + "</td>";
	html += "<td no = \"" + data.MEDI_NUM + "\">" + data.MAT_CODE + "</td>";
	html += "<td no = \"" + data.MEDI_NUM + "\">" + data.COM_NM + "</td>";
	html += "</tr>";	
	}
	$(".clas").html(html);
}
function drawList2(list2){
	var html = "";
	for(var data of list2) {
	html += "<tr no = \"" + data.MEDI_NUM + "\">";
	html += "<th>";
	html += "<input type=\"checkbox\" id=\"check\" value=\"" + data.MEDI_NUM + "\">";
	html += "</th>";
	html += "<td no = \"" + data.MEDI_NUM + "\">" + data.MEDI_NUM + "</td>";
	if(data.PIC == null) {
		html += "<td no = \"" + data.MEDI_NUM + "\">" + "<img class=\"img\" style=\"width: 150px; height: 150px;\" src=\"resources/upload/이미지없음.png\"></td>";
	}else {
		html += "<td no = \"" + data.MEDI_NUM + "\">" + "<img class=\"img\" style=\"width: 150px; height: 150px;\" src=\"resources/upload/" + data.PIC + "\">" + "</td>";		
	}
	html += "<td no = \"" + data.MEDI_NUM + "\">" + data.PROD_NM + "</td>";
	html += "<td no = \"" + data.MEDI_NUM + "\">" + data.MAT_CODE + "</td>";
	html += "<td no = \"" + data.MEDI_NUM + "\">" + data.COM_NM + "</td>";
	html += "</tr>";	
	}
	$(".clase").html(html);
}
function drawPaging(pd){
	var html = "";

	   html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	   // 이전
	   if($("#page").val() == "1"){
	   		html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	   }else{
	   		html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 -1) + "\">이전</span>";			   
	   }
	   
	   for(var i = pd.startP; i <= pd.endP; i++){
		   if($("#page").val() * 1 == i){ // 현재 페이지
	   			html += "<span class=\"page_btn_on\" page=\"" + i + "\">" + i + "</span>";
		   }else{ // 다른페이지
	   			html += "<span class=\"page_btn\" page=\"" + i + "\">" + i + "</span>";
		   }
	   }
	   
	   if($("#page").val() * 1 == pd.maxP){ // 현재 페이지가 마지막 페이지라면..
	   		html += "<span class=\"page_btn page_next\" page=\"" + pd.maxP + "\">다음</span>";			   
	   }else{
	   		html += "<span class=\"page_btn page_next\" page=\"" + ($("#page").val() * 1 + 1) + "\">다음</span>";			   			   
	   }
	   
	   html += "<span class=\"page_btn page_last\" page=\"" + pd.maxP + "\">마지막</span>";
	   
	   $(".paging_area").html(html);
}
</script>
</head>
<body>
<c:import url="/AdminImport"></c:import>
	<div class="right_wrap">
		<div class="poPup">
			<div class="data">삭제하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="Yes" value="네"></div>
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
				<p><b>관리자 홈 > 의약품 관리</b><p>
			</div>
			<div id="bottom_left">
				<table class="tl">
					<colgroup>
						<!-- 전체 750 -->
						<col width="50" />
						<col width="100" />
						<col width="100" />
						<col width="100" />
						<col width="100" />
						<col width="300" />
					</colgroup>
					<thead>
						<tr>
							<th></th>
							<th>번호</th>
							<th>사진</th>
							<th>약품명</th>
							<th>성분코드</th>
							<th>업체명</th>
						</tr>
					</thead>
					<tbody class="clas">
					</tbody>
				</table>
			</div>
			<div id="bottom_right">
				<table class="tr">
					<colgroup>
						<!-- 전체 750 -->
						<col width="50" />
						<col width="100" />
						<col width="100" />
						<col width="100" />
						<col width="100" />
						<col width="300" />
					</colgroup>
					<thead>
						<tr>
							<th></th>
							<th>번호</th>
							<th>사진</th>
							<th>약품명</th>
							<th>성분코드</th>
							<th>업체명</th>
						</tr>
					</thead>
					<tbody class="clase">
					</tbody>
				</table>
			</div>
			<div class="select_bar">
				<input type="hidden" id="oldGbn" value="0" /> 
				<input type="hidden" id="oldText" />
				<form action="#" id="searchForm" method="post">
				<input type="hidden" name="delete" id="delete" />
				<input type="hidden" name="no" id="no" />
					<input type="hidden" name="page" id="page" value="1" />
					<select class="select_1" name="searchGbn" id="searchGbn" >
						<option value="0">성분코드</option>
						<option value="1">제품명</option>
						<option value="2">업체명</option>
						<option value="3">번호</option>
					</select> 
					<input type="text" class="text" name="searchText" id="searchText" placeholder="검색하세요." /> 
					<input type="button" class="serbtn" value="검색">
				</form>
			</div>
			<br /> <br />
			<div class="paging_area">
         		</div>
			<div>
				<input type="button" class="del btn"  value="삭제">
					<div class="btn_one"></div>
				<form action="MedicineInsert" id="goForm">
					<input type="button" class="reg btn" value="등록">
						<div class="btn_one"></div>
				</form>
			</div>
		</div>
	</div>

</body>
</html>