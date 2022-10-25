<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/hee/userMainheath.css" />
<link rel="stylesheet" type="text/css" href="resources/css/hee/userMain.css" />
<link rel="stylesheet" type="text/css" href="resources/css/hee/menu2.css" />
<link rel="stylesheet" type="text/css" href="resources/script/fullcalendar/fullcalendar.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<!-- Moment Script -->
<script type="text/javascript" src="resources/script/jquery/moment.js"></script>
<script type="text/javascript" src="resources/script/fullcalendar/fullcalendar.js"></script>
<script type="text/javascript" src="resources/script/fullcalendar/locale-all.js"></script>
<script src="resources/js/highcharts/highcharts.js"></script>
<script src="resources/js/highcharts/exporting.js"></script>
<script src="resources/js/highcharts/export-data.js"></script>
<script src="resources/js/highcharts/accessibility.js"></script>
<script src="resources/js/userPage/userMain.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	reloadList();

	$(".menu_4").on("click",function(){
		location.href = "MediCompare";
	});
	$(".menu_3").on("click",function(){
	  var target = $(".new_rap").offset().top;
	  previousScroll = target;
	  $("html").animate({scrollTop : target}, 600);
	});
	$(".menu_1").on("click",function(){
		var target = $(".good_rap").offset().top;
		previousScroll = target;
		$("html").animate({scrollTop : target}, 600);
	});
	$(".menu_2").on("click",function(){
		var target = $(".new2_rap").offset().top;
		previousScroll = target;
		$("html").animate({scrollTop : target}, 600);
	});
	
});
function reloadList(){
	var params = $("#searchForm").serialize();
	$.ajax({
	      url : "userMainList", 
	      type : "POST", 
	      dataType : "json", 
	      data : params, 
	      success : function(res) {
	    	 	List(res.list);
	      },
	      error : function(request, status, error){ 
	         console.log(request.responseText); 
	      } 
	   });	
}
function List(list){
	var html = "";
	html += "<div class=\"icon-left\">"+"</div>";
	html += "<div class=\"icon-right\">"+"</div>";
	html += "<div class=\"pic-first\">"+"</div>";
	html += "<div class=\"pic\" id=\"pic0\">"+"</div>";
	for(var data of list){
		html += "<div id=\"pic6\" no=\""+ data.MEM_NUM + "\" impic=\""+ data.DIET_NUM + "\" class=\"pic\" )\">";
		html += "<img class=\"picpic\" src=\"resources/upload/"+data.HEADER_PIC+"\">";
		html += "<div class=\"text\">"+ data.TITLE +"</div>";
		html += "</div>";
	}
	$(".brunch").html(html);
}
</script>
</head>
<body>
<form action="#" id="searchForm" method="post">
		<img src="">
		<input type="hidden" name="impic" id="impic" />
		<input type="hidden" name="no" id="no" />
	</form>
	<!-- 상단바 밑 사이드바 -->
	<div class="bar">
		<div class="wrap">
			<div class="logo2"></div>
			<div class="menu_login_border">
				<div class="menu_userId_border">
					<c:if test="${!empty sMemNum}">
						<span class="menu_userId">${sMemNm}님 환영합니다.</span>
					</c:if>
					<span class="menu_userId2"></span>
				</div>
				<div class="menu_btn_border">
					<c:choose>
						<c:when test="${empty sMemNum}">
							<input type="button" class="menuLoginBtn" id="menuLoginBtn"
								value="로그인" />
							<input type="button" class="menuNewAccount" id="menuNewAccount"
								value="회원가입" />
						</c:when>
						<c:otherwise>
							<input type="button" class="menuLogoutBtn" id="menuLogoutBtn" value="로그아웃" />
						</c:otherwise>
					</c:choose>
				</div>
			</div>
		</div>
	<div class="element">
 <div class="elements medicine_Info">의약품 정보
         <span class="bar_left bar_left1" ></span>
         <span class="bar_right bar_right1" ></span>
      </div>
      <div class="elements health_Mgt">건강 관리
         <span class="bar_left bar_left2" ></span>
         <span class="bar_right bar_right2" ></span>
      </div>
      <div class="elements medicine_Compare">영양제 비교
         <span class="bar_left bar_left3" ></span>
         <span class="bar_right bar_right3" ></span>
      </div>
      <div class="elements freeBoard">자유게시판
         <span class="bar_left bar_left4" ></span>
         <span class="bar_right bar_right4" ></span>
      </div>
      <div class="elements service_center">고객센터
         <span class="bar_left bar_left5"></span>
         <span class="bar_right bar_right5"></span>
      </div>
      <div class="elements mypage" >마이페이지
         <span class="bar_left bar_left6"></span>
         <span class="bar_right bar_right6"></span>
      </div>
		</div>
	</div>
	<div class="txtrap">
		<div class="top_header">
			<div class="menu"></div>
			<div class="logo"></div>
			<div class="login_border">
			<c:choose>
				<c:when test="${!empty sMemNum}">
				<div class="userId_border2">
					<div class="userId">
						${sMemNm}님 환영합니다. 
						<input type="button" id="logoutBtn" value="로그아웃" class="logoutBtn" />
					</div>
				</div>
					</c:when>
				<c:otherwise>	
				<div class="userId_border">
						<div class="userId2">
							<input type="button" id="loginBtn1" value="로그인" class="loginBtn1" />
							<div class="userlogin">회원 가입</div>
						</div>
				</div>
				</c:otherwise>
			</c:choose>
			</div>
		</div>
	</div>
	<div class="rap_100">
		<div class="main_rap">
			<div class="main_title">
				<div class="title1">여러분들이 섭취중인 약과 식품의 정보를 입력하고, 그래프로 만나보세요.</div>
				<div class="title2">오늘의 추천 건강 식단도 함께 만나보세요.</div>
			</div>
			<div class="menu_rap">
				<div class="menu_1">건강 문진표 작성 하러 하기</div>
				<div class="menu_2">오늘의 추천 식단</div>
				<div class="menu_3">그래프 구경하러 가기</div>
				<div class="menu_4">건강 식품 비교 하러 가기</div>
			</div>
			<div class="bottom_rap">
				<div class="bottom_txt">샘플 자세하게 확인해보기</div>
				<div class="bottom_img"></div>
			</div>
		</div>
	</div>
	
<div class="good_rap">
		<div class="total">
			<div id="nameblock" class="a">
				<div id="name">이름</div>
				<div id="namebar">
					<div id="nameVal">오병호</div>
				</div>
				<div class="edit"></div>
			</div>
			<div id="birthblock" class="a">
				<div id="birth">생년월일</div>
				<div id="year">1997년</div>
				<div id="month">12월</div>
				<div id="day">24일</div>
				<div class="edit"></div>
			</div>
			<div id="cmblock" class="a">
				<div id="cm">키</div>
				<div id="cmbox">
					<div id="cmVal">187</div>
				</div>
				<div id="cmtxt">cm</div>
				<div class="edit"></div>
			</div>
			<div id="kgblock" class="a">
				<div id="kg">몸무게</div>
				<div id="kgbox">
					<div id="kgVal">90</div>
				</div>
				<div id="kgtxt">kg</div>
				<div class="edit"></div>
			</div>
			<div id="searchblock" class="blocks">
				<div class="blockTxt">건강 기능 식품 검색</div>
				<input type="text" id="searchbox" class="inputbox"
					placeholder="텍스트 입력">
				<div id="searchimg"></div>
			</div>
			<div class="side_rap">
				좌측 정보입력표는 견본표 입니다.
			</div>
			<div class="side_rap2">
				여러분의 BMI까지 확인하고 나의 건강에 무엇이 필요할지 <br/>찾아보세요.
			</div>
		</div>
	</div>
	<div class="new_rap">
		<div class="chart_rap">
			<figure class="highcharts-figure">
				<div id="container"></div>
			</figure>
			<div class="information_rap">
				<div class="information_srap">
					<div class="information_child1"></div>
					현재 보시는 그래프는 임의의 그래프입니다.
				</div>
				<div class="information">
					<div class="information_child"></div>
					"abc님은" 현재 저체중 / 정상 / <br /> 과체중 / 비만 / 고도비만 입니다.
				</div>
				<div class="information2">
					<div class="information_child2"></div>
					저체중 / 정상 / 과체중 / 비만 / 고도비만 에<br /> 따른 주의사항 및 권장사항 내용
				</div>
				<div class="information_btn">그래프 확인하러 가기 (이미지 삽입)</div>
			</div>
		</div>	
	</div>
	<div class="new2_rap">
		<div class="txtnamerap">
			<div class="txt_name">
				식이요법에 대한 끝없는 근심걱정을 그 대가로 치뤄야 한다면, <br />건강이라 불리는 것은 만성 질환보다 별로 나을
				것이 없다. <br /> <br /> 조지 데니슨 프렌티스
			</div>
		</div>
		<!-- 여기까지 상단바 밑 사이드바 -->
		<div class="brunch-wrap">	
			<div class="brunch">
			</div>
		</div>
	</div>
	<div class="new3_rap">
		<div class="total2">
			<div class="headTxt">관심있는 영양제의 기능성, 함량 등을 확인해보세요</div>
			<div class="headImg"></div>
			<div class="compare1">
				<div class="compareBtn1"></div>
			</div>
			<div class="compare2">
				<div class="compareBtn2"></div>
			</div>
			<div class="compareTxt">비교하기</div>
			<div class="comtxt_rap">
				<div class="comtext">건강 기능 식품 비교를 통해 나에게 맞는 제품을 찾아보세요.</div>
			</div>
		</div>
	</div>
</body>
</html>