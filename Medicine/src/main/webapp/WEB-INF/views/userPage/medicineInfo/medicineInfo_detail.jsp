<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/userPage/medicineInfo_detail.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="resources/script/common/popup.js"></script>

<script type="text/javascript" src="resources/js/highchart/highcharts.js"></script>
<script type="text/javascript" src="resources/js/highchart/accessibility.js"></script>
<script type="text/javascript" src="resources/js/highchart/data.js"></script>
<script type="text/javascript" src="resources/js/highchart/drilldown.js"></script>
<script type="text/javascript" src="resources/js/highchart/export-data.js"></script>
<script type="text/javascript" src="resources/js/highchart/exporting.js"></script>
<script type="text/javascript" src="resources/js/highchart/highcharts-more.js"></script>

<script type="text/javascript" src="resources/js/userPage/medicineInfoDetail.js"></script>
</head>
<body>
	<c:import url="/ComImport"></c:import>
	<!-- 메인페이지 -->
<!-- 	<div class="info">의약품 상세보기</div> -->
	<div class="gnb">메인페이지-의약품 목록 - 상세보기</div>
	<div class="main_border">
		<form action="#" id="actionForm" method="post">
			<input type="hidden" id="no" name="no" value="${param.no}"/>
			<input type="hidden" id="prodNm" name="prodNm" />
			
			<table class="main_table">
				<colgroup>
					<col width="17%">
					<col width="17%">
					<col width="17%">
					<col width="17%">
					<col width="32%">
				</colgroup>
				
				<thead>
				</thead>
			</table>
		</form>
			<form id="revDetailForm" action="#" method="post">
				<input type="hidden" id="revNum" name="revNum" class="revNum" />
				<input type="hidden" id="revCon" name="revCon" class="revCon" />
			</form>
		<!-- 1번 전체 통계 그래프 -->
		<div class="statistic_border1">
			<figure class="highcharts-figure">
				<div id="container"></div>
				<p class="highcharts-description"></p>
			</figure>
		</div>

		<!-- 2번 전체 통계 그래프 -->
		<div class="statistic_border2">
			<figure class="highcharts-figure2">
				<div id="container2"></div>
				<p class="highcharts-description"></p>
			</figure>
		</div>

		<!-- 리뷰등록 버튼 -->
		<c:if test="${!empty sMemNum}">
		<div class="reviewDiv">
			<input type="button" class="reviewBtn" id="reviewBtn" value="리뷰 등록" />
		</div>
		</c:if>
		<hr style="margin-top: 65px;"></hr>
		<!-- 의약품 정보 상세 목록 스크롤3 (목록) -->
		<form id="actionRevForm" action="#" method="post">
		<input type="hidden" id="page" name="page" value="${page}" />
		<input type="hidden" id="no" name="no" value="${param.no}"/>
 		<div class="board_table_border">
			<table class="board_table" style="table-layout:fixed">
			
				<colgroup>
					<col width="120px">
					<col width="120px">
					<col width="120px">
					<col width="120px">
					<col width="*">
					<col width="0">
				</colgroup>

				<thead>
					<tr>
						<th>번호</th> 
						<th>작성자</th>
						<th>내용</th>
						<th>작성일</th>
						<th></th>
					</tr>
				</thead>
				<tbody class="reviewList"></tbody>
				
				<div class="paging_area paging_area1" style="position: absolute; bottom: 1%;"></div>
					<tr class="tr_hidden" style="display: none; border:0px;">
						<td style="border: 0px;" colspan="5">
							<!-- 펼치기 눌렀을 때 해당 의약품 상세 테이블 표출 -->
						
							<table class="detail_border">
								<colgroup>
									<col width="100px">
									<col width="100px">
									<col width="100px">
									<col width="100px">
									<col width="100px">
								</colgroup>
								<tbody class="detail_tbody">

									 <div class="pic_div">
										<figure class="highcharts-figure3">
											<div id="container3"></div>
											<p class="highcharts-description"></p>
										</figure>
									</div> 

									<!-- <tr>
										<td><input type="button" class="goodBtn" /></td>
									</tr> -->
								</tbody>
							</table>
							 </form>
							
							<div class="editor_border"></div>
							
							<div class="comment_border">
								<form id="repForm" method="post" action="#">
									<input type="hidden" id="memNum" name ="memNum" value="${sMemNum}"/>
									<input type="hidden" id="revNumber" name="revNum" class="revNumber"/>
									<input type="hidden" id="repNum" name="repNum" class="repNum" />
									<input type="hidden" id="repCon" name="repCon" class="repCon" />
									<input type="hidden" id="page1" name="page1" class="page1" value="1" />
									<c:if test="${!empty sMemNum}">
								 		<input type="text" class="review_comment" id="review_comment" name="review_comment"
										placeholder="200자 이하 입력해주세요." maxlength="200" /> 
										<input type="button" class="commentAddBtn" id="commentAddBtn" value="등 록" />  
									</c:if>
								</form>
								
							</div> <!-- 해당 의약품 리뷰에 대한 댓글 목록 -->
							<table class="repTable">
								<tbody>	
								</tbody>
							</table>
						</td>

					</tr> <!-- end of tr_hidden -->

				<!-- </tbody> -->
				
			</table>
			
		</div>
		
		 <input type="button" class="listBtn" value="목록으로" />
		<!-- 테이블 div -->
		<div style="height: 30px;"></div>
		<div class= "paging_area paging_area2" style="height: 30px; display: none; position: absolute;bottom: 0%;" ></div>
	
	</div>
	<!-- main_border -->
	<div style="height: 30px;"></div>
</body>
</html>