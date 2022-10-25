<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/ye/common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/userPage/mainDetail.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/script/common/popup.js"></script>

<script type="text/javascript">
$(document).ready(function() {
	reloadList();
	
	$(".paging_area").on("click","span",function(){
		$("#page").val($(this).attr("page"));

		$("#searchGbn").val($("#oldGbn").val());
		$("#searchText").val($("#oldText").val());
		
		reloadList();
	});
	$(".replog").on("click",function(){
		
		$("#searchForm").attr("action","MediLogin");
		$("#searchForm").submit();
	});
	$(".list").on("click",function(){
		
		$("#searchForm").attr("action","MediMain");
		$("#searchForm").submit();
	});
	$(".enroll").on("click",function(){
			action("insert");
			$(".reple1004").val("");
	});
	$("tbody").on("click",".del",function(){
		var no = $(this).parent().parent().attr("no");
		
		makePopup({
			title : "알림",
			contents : "삭제하시겠습니까?",
			buttons : [{
				name : "삭제",
				func:function(){
					$("#no").val(no);
					action("delete");
					closePopup(); // 제일 위의 팝업 닫기
				}
			},{
				name : "취소"
			}]		
		});
	});
	$("tbody").on("click",".revise",function(){
		var no = $(this).parent().parent().attr("no");
		$("#no").val(no);
		
		// eq(인덱스번호) : 자식들 중 인덱스 몇번째 인지 찾아서 취득
		var con = $(this).parent().parent().children().eq(1).html();
		// 수정 내용 넣기전 <> 변환
		con = con.replace(/&lt;/gi, "<");
		con = con.replace(/&gt;/gi, ">");
		
		$(".cancel").show();
		$(".sujeong").show();
		
		$(".enroll").hide();
		$(".list").hide();
		
		$("#replePlaceHolder").val(con);
		
		$("#replePlaceHolder").focus();
	});
	$(".cancel").on("click",function(){
		$("#no").val("");
		$("#replePlaceHolder").val("");
		
		// 등록버튼 나타나기 + 수정,취소 버튼 감추기
		$(".cancel").hide();
		$(".sujeong").hide();
		
		$(".enroll").show();
		$(".list").show();
	});
	$(".sujeong").on("click",function() {
		$(".cancel").hide();
		$(".sujeong").hide();
		$(".enroll").show();
		$(".list").show();
		action("update");
	});
});
function reloadList(){
	var params = $("#searchForm").serialize();
	$.ajax({
	      url : "userrepList", 
	      type : "POST", 
	      dataType : "json", 
	      data : params, 
	      success : function(res) {
	    	  drawList(res.replist);
	    	  drawPaging(res.pd);
	      },
	      error : function(request, status, error){ 
	         console.log(request.responseText); 
	      } 
	   });
}
var msg = {
		"insert" : "등록",
		"update" : "수정",
		"delete" : "삭제",
	}
function action(flag){
	// con의 < 들을 웹문자로 변환
	$("#replePlaceHolder").val($("#replePlaceHolder").val().replace(/</gi, "&lt;"));
	// con의 > 들을 웹문자로변환
	$("#replePlaceHolder").val($("#replePlaceHolder").val().replace(/>/gi, "&gt;"));
	
	// javascript Object에서의 [] : 해당 키값으로 내용을 불러오거나 넣을 수 있다.
	//                            java의 Map에서 get , put 역할
	var params = $("#searchForm").serialize();
    $.ajax({
       url : "REPAction/" + flag, //경로
       type : "POST", //전송방식
       dateType : "json", //데이터 형태
       data : params, //보낼 데이터
       success : function(res) { //성공했을 때 결과를 result에 받고 함수 실행
          switch(res.msg) { //ATController -> ATAction컨트롤러의 msg값
          case "success" :
        	 switch (flag) {
			case "delete":
				alert("삭제 성공!!");
				// 조회 데이터 초기화
				$("#page").val("1");
				$("#replePlaceHolder").val("");
				break;
			case "update":
				$("#replePlaceHolder").val($("#oldText").val());
				break;
			}
        	 reloadList();
             break;
          case "failed" :
             makeAlert("알림", msg[flag] + "에 실패했다!");
             break;
          case "error" :
             makeAlert("알림", msg[flag] + " 중 문제가 발생했다!");
             break;
          }
       },
       error : function(request,status,error) { //실패했을 때 함수 실행
          console.log(request.responseText); //실패 상세내역
       }
    }); // Ajax End
}
function drawList(replist){
	var html = "";
	for(var data of replist) {
		html += "<tr no = \"" + data.REP_DIET_NUM + "\">";
		html += "<td>" + data.ID +"</td>";
		html += "<td>" + data.CON + "</td>";
		html += "<td>" + data.REG_D + "</td>";
		html += "<td>";
		if("${sMemNum}" == data.MEM_NUM){ // 작성자 이면
			html += "<div class=\"revise blueBtn\">수정</div>";
			html += "<div class=\"del blueBtn\">삭제</div>";
			}
		html += "</td>";
		html += "</tr>";
	}
	$("tbody").html(html);
} 
function drawPaging(pd){
	var html = "";
	
	  html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	  // 이전 구현
	  if($("#page").val() == "1"){
		  html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	  }
	  else {
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 - 1)+ "\">이전</span>";
	  }
	  for(var i = pd.startP; i <= pd.endP; i++){
		  if($("#page").val() * 1 == i){ // 현재 페이지 구현
			html += "<span class=\"page_btn_on\" page=\"" + i + "\">" + i + "</span>";
		  }
		  else{ // 다른 페이지 구현
	  		html += "<span class=\"page_btn\" page=\"" + i + "\">" + i + "</span>";
		  }
	  }
	  if($("#page").val() * 1 == pd.maxP){ // 현재 페이지가 마지막 페이지라면,, 구현
	  	html += "<span class=\"page_btn page_next\" page=\"" + pd.maxP + "\">다음</span>"; 
	  }
	  else{
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 + 1) + "\">다음</span>";
	  }
	  html += "<span class=\"page_btn page_last\" page=\"" + pd.maxP + "\">마지막</span>";
	$(".paging_area").html(html);
}
</script>
</head>
<body>
<form action="#" id="searchForm" method="post">
	<input type="hidden" name="page" id="page" value="1" />
	<input type="hidden" name="memnum" value="${sMemNum}" />
	<input type="hidden" name="dietnum" value="${data.DIET_NUM}" />
	<input type="hidden" name="no" id="no" />
	<input type="hidden" id="oldGbn" value="0" />
	<input type="hidden" id="oldText" />
<div class="top_header">
<div class="header">
	<div class="menu"></div>
	<div class="logo"></div>
	<div class="homepage_name">
		Good Medicine
	</div>
</div>
	
</div>
<div class="bar">
	<div class="wrap">
		<div class="logo2"></div>
		<div class="menu_login_border">
			<div class="menu_userId_border">
				<span class="menu_userId">조영은 주당님 환영합니다.</span>
				<span class="menu_userId2"></span>
			</div>
			<div class="menu_btn_border">
				<input type="button" class="menuLogoutBtn" id="menuLogoutBtn" value="로그아웃"/>
				<input type="button" class="menuLoginBtn" id="menuLoginBtn" value="로그인" />
				<input type="button" class="menuNewAccount" id="menuNewAccount" value="회원가입" />
			</div>
		</div>
	</div>
	<div class="element">
		 <div class="elements medicine_Info">의약품 정보
         <span class="bar_left"></span>
         <span class="bar_right"></span>
      </div>
      <div class="elements health_Mgt">건강 관리
         <span class="bar_left"></span>
         <span class="bar_right"></span>
      </div>
      <div class="elements medicine_Compare">의약품 비교
         <span class="bar_left"></span>
         <span class="bar_right"></span>
      </div>
      <div class="elements freeBoard">자유게시판
         <span class="bar_left"></span>
         <span class="bar_right"></span>
      </div>
      <div class="elements service_center">고객센터
         <span class="bar_left"></span>
         <span class="bar_right"></span>
      </div>
      <div class="elements mypage" >마이페이지
         <span class="bar_left"></span>
         <span class="bar_right"></span>
      </div>
		
	</div>
</div>
<!-- ---------------------------------------- -->

<div class="total">
	<div class="body">
		<div class="img">
		<img id="imgch" src="resources/upload/${data.DIET_MAIN_PIC}">
		</div>	
		<div class="cont">${data.CON}</div>
		
		<div class="repleCntBlock">
			<div class="repleCnt1">댓글</div>
			<div class="repleCnt2">2개</div>
		</div>
		<div class="reple" id="reple1">
			<table class="exit">
			<colgroup>
				<col width="150"/>
				<col width="700"/>
				<col width="150"/>
				<col width="230"/>
			</colgroup>
				<thead>
					<th>작성자</th>
					<th>내용</th>
					<th>날짜</th>
					<th>&nbsp;</th>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
		<c:choose>
				<c:when test="${empty sMemNum}">
				<div class="replogin">로그인이 필요한 서비스입니다.
				<input type="button" value="로그인" class="replog blueBtn" />
				</div>
		</c:when>
			<c:otherwise>
		<div class="reple1004" id="reple3">
			<textarea class="reple1004" id="replePlaceHolder" name="replePlaceHolder" placeholder="로그인 하고 댓글을 입력해 보세요!(비로그인시) &#13;&#10; 댓글을 입력해 주세요!(로그인시)" ></textarea>
			<input type="button" value="목록" class="list blueBtn">
			<input type="button" value="등록" class="enroll blueBtn">
			<input type="button" value="수정" class="sujeong blueBtn">
			<input type="button" value="취소" class="cancel blueBtn">
		</div>
			</c:otherwise>
		</c:choose>
		<div class="paging_area"></div>
	</div>
</div>
</form>
</body>
</html>
