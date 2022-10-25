<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/userPage/medicineInfo_reviewInsert.css" />
 
<script type="text/javascript" src="resources/js/highchart/highcharts.js"></script>
<script type="text/javascript" src="resources/js/highchart/accessibility.js"></script>
<script type="text/javascript" src="resources/js/highchart/data.js"></script>
<script type="text/javascript" src="resources/js/highchart/drilldown.js"></script>
<script type="text/javascript" src="resources/js/highchart/export-data.js"></script>
<script type="text/javascript" src="resources/js/highchart/exporting.js"></script>
<script type="text/javascript" src="resources/js/highchart/highcharts-more.js"></script>

<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/medicineInfo_reviewInsert.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="resources/js/ckeditor/ckeditor.js"></script>
<!-- POPUP -->
<script type="text/javascript" src="resources/script/common/popup.js"></script>
</head>
<style>
	.reviewTable .reviewTable_th:hover,
	.reviewTable2 .reviewTable2_th:hover {
		color:black;
	}
	.effect_tr1 td, .effect_tr2 td,
	.effect_tr3 td, .effect_tr4 td,
	.seffect_tr1 td, .seffect_tr2 td,
	.seffect_tr3 td, .seffect_tr4 td {
		width: 150px !important;
		text-align: center;
		height: 36px;
	}
</style>
<body>
<c:import url="/ComImport"></c:import>
<!-- 메인페이지 -->
<div class="info">리뷰 등록</div>
	<div class="gnb">메인페이지-리뷰등록</div>
	<form action="#" id="actionForm" method="post">
	<div class="main_border">
		<div class="assistant_border">
		
		<input type="hidden" id="page" name="page" value="${page}" />
		<input type="hidden" id="no" name="no" value="${param.no}" />
 		<input type="hidden" id="effectHiddenName" name="effectHiddenName" class="effectHiddenName" />
		<input type="hidden" id="seffectHiddenName" name="seffectHiddenName" class="seffectHiddenName" />
		<input type="hidden" id="mediNum" name="mediNum" class="mediNum" />
		<input type="hidden" id="prodNm" name="prodNm" value="${param.prodNm}" />
		<input type="hidden"  name="sMemNum" value="${sMemNum}" />
		
		<!-- 효과 -->
		<input type="hidden" id="effect_arr" name="effect_arr" class="effect_arr" />
		<input type="hidden" id="effect_score_arr" name="effect_score_arr" class="effect_score_arr" />
		<input type="hidden" id="effectNum" name="effectNum" class="effectNum" />
		<!-- 부작용 -->
		<input type="hidden" id="seffect_arr" name="seffect_arr" class="seffect_arr" />
		<input type="hidden" id="seffect_score_arr" name="seffect_score_arr" class="seffect_score_arr" />
		<input type="hidden" id="seffectNum" name="seffectNum" class="seffectNum" />
		<!-- 기타 효과 -->
		<input type="hidden" id="effect_arr2" name="effect_arr2" class="effect_arr2" />
		<input type="hidden" id="effect_score_arr2" name="effect_score_arr2" class="effect_score_arr2" />	
		<input type="hidden" id="effectNum2" name="effectNum2" class="effectNum2" />
		<!-- 기타 부작용 -->
		<input type="hidden" id="seffect_arr2" name="seffect_arr2" class="seffect_arr2" />
		<input type="hidden" id="seffect_score_arr2" name="seffect_score_arr2" class="seffect_score_arr2" />
		<input type="hidden" id="seffectNum2" name="seffectNum2" class="seffectNum2" />
			<table class="left_table">
				
				<tbody>
					<tr>
						<td><p>효과 선택 / 점수</p></td>
					</tr>
					<tr>	
						<td colspan="2">
							<input type="text" id="effectChoice" class="effectChoice" placeholder="효과 선택" readonly="readonly"/>
						</td>
						<td>
							<input type="button" id="choiceBtn" class="choiceBtn effectAddBtn blueBtn" value="선택"/>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<input type="number" class="effectScore" placeholder="0~10점" maxlength="2" oninput="maxLengthCheck(this)"/>
						</td>
						<td>
							<input type="button" id="effectScoreAddBtn" class="effectScoreAddBtn addBtn blueBtn" value="추가"/>
						</td>
					</tr>
					
					
					
					
				<tr>
					<td style="width:150px;"><p>부작용 선택 / 점수</p></td>
				</tr>
				<tr>
					<td colspan="2">
						<input type="text" id="seffectChoice" class="seffectChoice" placeholder="부작용 선택" readonly="readonly" />
					</td>
					<td>
						<input type="button" id="choiceBtn" class="choiceBtn seffectAddBtn blueBtn" value="선택" />
					</td>
				</tr>
				<tr>
						<td colspan="2">
							<input type="number" class="seffectScore" placeholder="0~10점" maxlength="2" oninput="maxLengthCheck(this)"/>
						</td>
						<td>
							<input type="button" id="addBtn" class="seffectScoreAddBtn addBtn blueBtn" value="추가"/>
						</td>
				</tr>
				
				
				
				<tr>
					<td><p>기타 효과</p></td>
					<td colspan="2">
						<input type="text" class="effectChoice2" placeholder="기타 효과 입력" maxlength="15" style="width: 190px;"/>
					</td>
				</tr>
				<tr>
						<td colspan="2">
							<input type="number" class="effectScore2" placeholder="0~10점" maxlength="2" oninput="maxLengthCheck(this)"/>
						</td>
						<td>
							<input type="button" id="addBtn" class="effectScoreAddBtn2 addBtn blueBtn" value="추가"/>
						</td>
				</tr>
				<tr>
					<td><p>기타 부작용</p></td>
					<td colspan="2">
						<input type="text" class="seffectChoice2" placeholder="기타 부작용 입력" maxlength="15" style="width:190px;"/>
					</td>
				</tr>
				<tr>
						<td colspan="2">
							<input type="number" class="seffectScore2" placeholder="0~10점" maxlength="2" oninput="maxLengthCheck(this)"/>
						</td>
						<td>
							<input type="button"  id="addBtn" class="seffectScoreAddBtn2 addBtn blueBtn" value="추가"/>
						</td>
				</tr>
				</tbody>
			</table>
			<div style="position: relative; display: inline-block;">
			<table class="middle_table">
				<tbody>
					<!-- 효과 -->
					<tr class="effect_name effect_name1" style="height: 10px;"><td style="color:blue;">효과</td></tr>
					<tr class="effect_tr1"></tr>
					
					<tr class="effect_tr2"></tr>
					<!-- 부작용 -->
					<tr class="effect_name effect_name2" style="height: 10px;"><td style="color:red;">부작용</td></tr>
					<tr class="seffect_tr1"></tr>
					
					<tr class="seffect_tr2"></tr>
					<!-- 기타 효과 -->
					<tr class="effect_name effect_name3" style="height: 10px;"><td style="color:blue;">기타 효과</td></tr>
					<tr class="effect_tr3"></tr>
					
					<tr class="effect_tr4"></tr>
					<!-- 기타 부작용 -->
					<tr class="effect_name effect_name4" style="height: 10px;"><td style="color:red;">기타 부작용</td></tr>
					<tr class="seffect_tr3"></tr>
					
					<tr class="seffect_tr4"></tr>
					
				</tbody>
			</table><!-- end of middle_table -->
			</div>
			<div class="right_div">
				<!-- 효과,부작용 선택시 바뀌는 현재 그래프 -->
				<figure class="highcharts-figure3">
    				<div id="container3"></div>
   					<p class="highcharts-description"></p>
				</figure>
			</div>
			
			
		</div><!-- end of assistantBorder -->
			<!-- 에디터 div -->
			<div class="editor_div">
				<textarea id="con" class="con" name="con"></textarea>
			</div>
	</div><!-- end of main_border -->
	</form>
	<div class="btn_border">
		<input type="button" class="reviewAddBtn blueBtn" id="reviewAddBtn" value="리 뷰 등 록"/>
		<input type="button" class="listBtn blueBtn" value="목록으로"/>
	</div>
</body>
</html>