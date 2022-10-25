
$(document).ready(function(){
	reloadList();
	graphloadList();
	reloadListTitle();
	
   $(".middle_table").on("click", "td", function() {
	   $(".updateBtn").show();
	   $(".deleteBtn").show();
   });
   
   $("#cancelReviewBtn").on("click", function() {
		history.back();
   });
   
   
   //효과 - 선택버튼 클릭시
	$(".effectAddBtn").on("click", function() {
		choicePopup();
	});
	//부작용 - 선택버튼 클릭시
	$(".seffectAddBtn").on("click", function() {
		choicePopup2();
	});
	//리뷰 - 삭제버튼 클릭시
	$("#deleteReviewBtn").on("click", function() {
		revDelFunc();
	});
	//리뷰 - 수정버튼 클릭시
	$("#updateReviewBtn").on("click", function() {
		revUpdateFunc();
	});
	var chk1 = false;
	var chk2 = false;
	var chk3 = false;
	var chk4 = false;
	
	//효과 - 점수입력후, 추가 버튼 클릭시
	$(".effectScoreAddBtn").on("click", function() {
		
		if($(".effectScore").val() > 10 || $(".effectScore").val() < 0 || $(".effectScore").val() == "") {
			makeAlert("알림", "0~10점을 입력해주세요.");
			$(".effectScore").val("");
			$(".effectScore").focus();
			chk1 = false;
		}else {
			chk1 = true;
		}
		if($(".effectChoice").val() == "" || $(".effectChoice").val() == null) {
			makeAlert("알림", "효과를 선택해주세요.");
			chk1 = false;
		}else {
			chk1 = true;
		}
		if(chk1) {
			if($(".effectScore").val() > 0 ) {
				addEffect();
				reloadRevGraph();
				$(".effect_arr").val(effectArr);
				$(".effect_score_arr").val(effectScoreArr);
				$(".effectNum").val(effectNum);
				$(".effectScore").val("");
				$(".effectChoice").val("");
			}
		}
		
	});
	//부작용 - 점수입력후, 추가 버튼 클릭시
	$(".seffectScoreAddBtn").on("click", function() {
		if($(".seffectScore").val() > 10 || $(".seffectScore").val() < 0 || $(".seffectScore").val() == "") {
			makeAlert("알림", "0~10점을 입력해주세요.");
			$(".seffectScore").val("");
			$(".seffectScore").focus();
			chk2 = false;
		}else {
			chk2 = true;
		}
		if($(".seffectChoice").val() == "" || $(".seffectChoice").val() == null) {
			makeAlert("알림", "부작용을 선택해주세요.");
			chk2 = false;
		}else {
			chk2 = true;
		}
		if(chk2) {
			if($(".seffectScore").val() > 0 ) {
				addSEffect();
				reloadRevGraph();
				$(".seffect_arr").val(seffectArr);
				$(".seffect_score_arr").val(seffectScoreArr);
				$(".seffectNum").val(seffectNum);
				$(".seffectScore").val("");
				$(".seffectChoice").val("");
			}
		}
	});
	//기타 효과 - 점수입력후, 추가 버튼 클릭시
	$(".effectScoreAddBtn2").on("click", function() {
		if($(".effectScore2").val() > 10 || $(".effectScore2").val() < 0 || $(".effectScore2").val() == "") {
			makeAlert("알림", "0~10점을 입력해주세요.");
			$(".effectScore2").val("");
			$(".effectScore2").focus();
			chk3 = false;
		} else {
			chk3 = true;
		}
		if($(".effectChoice2").val() == "" || $(".effectChoice2").val() == null) {
			makeAlert("알림", "기타 효과를 선택해주세요.");
			chk3 = false;
		} else {
			chk3 = true;
		}
		if(chk3) {
			if($(".effectScore2").val() > 0) {
				$(".mediNum").val($("#no").val());
				addEffect2();
				reloadRevGraph();
				$(".effect_arr2").val(effectArr2);
				$(".effect_score_arr2").val(effectScoreArr2);
				$(".effectScore2").val("");
				$("effectChoice2").val("");
			}
		}
	});
	//기타 부작용 - 점수입력후, 추가 버튼 클릭시
	$(".seffectScoreAddBtn2").on("click", function() {
		if($(".seffectScore2").val() > 10 || $(".seffectScore2").val() < 0 || $(".seffectScore2").val() == "") {
			makeAlert("알림", "0~10점을 입력해주세요.");
			$(".seffectScore2").val("");
			$(".seffectScore2").focus();
			chk4 = false;
		} else {
			chk4 = true;
		}
		if($(".seffectChoice2").val() == "" || $(".seffectChoice2").val() == null) {
			makeAlert("알림", "기타 부작용를 선택해주세요.");
			chk4 = false;
		} else {
			chk4 = true;
		}
		if(chk4) {
			if($(".seffectScore2").val() > 0) {
				$(".mediNum").val($("#no").val());
				addSEffect2();
				reloadRevGraph();
				$(".seffect_arr2").val(seffectArr2);
				$(".seffect_score_arr2").val(seffectScoreArr2);
				$(".seffectScore2").val("");
				$(".seffectChoice2").val("");
			}
		}
	});
	
	//각 효과 클릭시
	$(".middle_table").on("click", "td", function()  {
		var html = "";
		var spanHtml = "";
		var classNm = $(this).parent().attr("class");
		var flag = false;
		var effectIndexNumber = $(this).attr("no");
		$(".effectTargetNum").val($(this).attr("no"));
		$(".seffectTargetNum").val($(this).attr("no"));
		var thisClassNm = $(this).attr("class");
		var effectIndexNum = $(this).attr("indexnumber");
		
		//삭제할 번호 가져오기
		$(".effectDelNum").val($(this).attr("indexnumber"));
		
		if($(this).attr("class") == null) {
			flag = false;
		}else {
			flag = true;
		}
		
			html += "<form id=\"updatePopupForm\">";
			
			if(classNm == "effect_tr1" || classNm == "effect_tr2") {
				html += "<span>효과</span>";
				$("#updatePopupForm input").css("margin-left", "10px").css("margin-top", "10px");
			//부작용
			}else if(classNm == "seffect_tr1" || classNm == "seffect_tr2") {
				html += "<span>부작용</span>";
				$("#updatePopupForm input").css("margin-left", "24px").css("margin-top", "10px");
			//기타 효과
			}else if(classNm == "effect_tr3" || classNm == "effect_tr4") {
				html += "<span>기타 효과</span>";
				$("#updatePopupForm input").css("margin-left", "40px").css("margin-top", "10px");
			//기타 부작용
			}else if(classNm == "seffect_tr3" || classNm == "seffect_tr4") {
				html += "<span>기타 부작용</span>";
				$("#updatePopupForm input").css("margin-left", "55px").css("margin-top", "10px");
			}
			
			html += "<input type=\"text\" class=\"updateEffectText\" />";
			
			//효과
			if(classNm == "effect_tr1" || classNm == "effect_tr2" || classNm == "seffect_tr1" || classNm == "seffect_tr2") {
				html += "<input type=\"button\" class=\"popupEffectBtn\"  value=\"선택\"/>";
				
			//부작용
			}else if(classNm == "seffect_tr1" || classNm == "seffect_tr2") {
				html += "<input type=\"button\" class=\"popupSEffectBtn\" value=\"선택\"/>";
			}
			
			html += "</br>";
			html += "<span>점수</span>";
			html += "<input type=\"number\" class=\"updateEffectScore\" placeholder=\"0~10점\" maxlength=\"2\" oninput=\"maxLengthCheck(this)\"/>";
			html += "</form>";
		
		var nm = $(this).text();
		var popupEffectName = nm.substring(0, nm.lastIndexOf("("));
		var popupEffectScore = nm.substring(nm.lastIndexOf("(")+1, nm.lastIndexOf(")"));
		
		makePopup({
			width : 400,
			height : 200,
			bg : false,
			bgClose : true,
			title : "수정/삭제",
			contents : html, 
			contentsEvent : function () {
				$(".popupEffectBtn").css("margin-left" , "10px").css("background-color" , "#70adf9").css("color", "#FFFFFF").css("border", "0px").css("width", "50px").css("height", "39px");
				$("#popup1Btn0").css("float", "left").css("margin-left", "10px");
				//$("#popup1Btn1").css("margin-right" , "100px");
				$("#updatePopupForm").css("display", "block").css("margin", "0 auto").css("text-align" , "center");
				
				if(classNm == "effect_tr1" || classNm == "effect_tr2") {
					$("#updatePopupForm .updateEffectText").css("margin-top", "10px").css("margin-left", "10px");
					$("#updatePopupForm .updateEffectScore").css("margin-left", "10px").css("margin-top", "10px");
					$("#updatePopupForm span:nth-child(1)").css("margin-left", "60px");
					
				//부작용
				}else if(classNm == "seffect_tr1" || classNm == "seffect_tr2") {
					$("#updatePopupForm .updateEffectText").css("margin-top", "10px").css("margin-left", "10px");
					$("#updatePopupForm .updateEffectScore").css("margin-left", "24px").css("margin-top", "10px");
				//기타 효과
				}else if(classNm == "effect_tr3" || classNm == "effect_tr4") {
					$("#updatePopupForm .updateEffectText").css("margin-top", "10px").css("margin-left", "10px");
					$("#updatePopupForm .updateEffectScore").css("margin-left", "40px").css("margin-top", "10px");
				//기타 부작용
				}else if(classNm == "seffect_tr3" || classNm == "seffect_tr4") {
					$("#updatePopupForm .updateEffectText").css("margin-top", "10px").css("margin-left", "10px");
					$("#updatePopupForm .updateEffectScore").css("margin-left", "55px").css("margin-top", "10px");
				}
			
				$("#updatePopupForm .updateEffectText").val(popupEffectName);
				$("#updatePopupForm .updateEffectScore").val(popupEffectScore);		
				
				$(".popupEffectBtn").on("click" , function() {
					updateEffectChoice();
				});
			},
			draggable : false,
			buttons : 
			[{
			name : "삭제",
			func : function() {

				//클래스가 있으면 -> DB에 등록되지 않은 값
				if(flag) {
					//효과일때
					if(classNm == "effect_tr1" || classNm == "effect_tr2") {
						effectSum1 -= parseInt(popupEffectScore);
						for(let i=0;i<effectArrNm1.length;i++) {
							if(effectArrNm1[i] === popupEffectName) {
								effectArrNm1.splice(i, 1);
								effectArr1.splice(i,1);
								i--;
							}
						}
						$("." + thisClassNm).remove();
						reloadRevGraph();
						closePopup();	
			
					} 
					//부작용일때		
					if(classNm == "seffect_tr1" || classNm == "seffect_tr2") {
						seffectSum1 -= parseInt(popupEffectScore);
						for(let i=0;i<seffectArrNm1.length;i++) {
							if(seffectArrNm1[i] === popupEffectName) {
								seffectArrNm1.splice(i,1);
								seffectArr1.splice(i,1);
								i--;
							}
						}
						$("." + thisClassNm).remove();
						reloadRevGraph();
						closePopup();
					}
					//기타 효과일때
					if(classNm == "effect_tr3" || classNm == "effect_tr4") {
						effectSum2 -= parseInt(popupEffectScore);
						for(let i=0;i<effectArrNm2.length;i++) {
							if(effectArrNm2[i] === popupEffectName) {
								effectArrNm2.splice(i,1);
								effectArr2.splice(i,1);
								i--;
							}
						}
						$("." + thisClassNm).remove();
						reloadRevGraph();
						closePopup();				
					}
					//기타 부작용일때
					if(classNm == "seffect_tr3" || classNm == "seffect_tr4") {
						seffectSum2 -= parseInt(popupEffectScore);
						for(let i=0;i<seffectArrNm2.length;i++) {
							if(seffectArrNm2[i] === popupEffectName) {
								seffectArrNm2.splice(i,1);
								seffectArr2.splice(i,1);
								i--;
							}
						}
						$("." + thisClassNm).remove();
						reloadRevGraph();
						closePopup();
					}
					
					
					
				//클래스가 없으면 -> DB에 등록된 값 -> AJAX
				}else {
					//효과일 때
					if(classNm == "effect_tr1" || classNm == "effect_tr2") {
						deleteEffectChoice();
						effectSum1 -= parseInt(popupEffectScore);
						for(let i=0;i<effectArrNm1.length;i++) {
							if(effectArrNm1[i] === popupEffectName) {
								effectArrNm1.splice(i,1);
								effectArr1.splice(i,1);
								i--;
							}
						}
						$("." + classNm + " " + "td[indexnumber="+effectIndexNum+"]").remove();
						reloadRevGraph();
						closePopup();
					//부작용일 때
					}else if(classNm == "seffect_tr1" || classNm == "seffect_tr2") {
						deleteSEffectChoice();
						seffectSum1 -= parseInt(popupEffectScore);
						for(let i=0;i<seffectArrNm1.length;i++) {
							if(seffectArrNm1[i] === popupEffectName) {
								seffectArrNm1.splice(i,1);
								seffectArr1.splice(i,1);
								i--;
							}
						}
						$("." + classNm + " " + "td[indexnumber="+effectIndexNum+"]").remove();
						reloadRevGraph();
						closePopup();
					//기타 효과일때
					}else if(classNm == "effect_tr3" || classNm == "effect_tr4") {
						$(".effectTargetNm").val(popupEffectName);
						var targetNum = $(".effectTargetNum").val();
						delete_etc_EffectChoice();
						$("." + classNm + " " + "td[no="+targetNum+"]").remove();
						reloadRevGraph();
						closePopup();
					//기타 부작용일때
					}else if(classNm == "seffect_tr3" || classNm == "seffect_tr4") {
						$(".seffectTargetNm").val(popupEffectName);
						var targetNum = $(".seffectTargetNum").val();
						delete_etc_SEffectChoice();
						$("." + classNm + " " + "td[no="+targetNum+"]").remove();
						reloadRevGraph();
						closePopup();
					}
					
				}
			}
			},{
			name : "취소", 
			func : function() {
				closePopup();
				
			}
			}]
		})
	});
	
	
	
	
	
});//END OF DOCUMENT

var effectArr1 = [];
var effectArr2 = [];
var effectArrNm1 = [];
var effectArrNm2 = [];
//효과 총합
var effectSum1 = 0;
//기타효과 총합
var effectSum2 = 0;
//부작용 총합
var seffectSum1 = 0;
//기타 부작용 총합
var seffectSum2 = 0;

var seffectArr1 = [];
var seffectArr2 = [];
var seffectArrNm1 = [];
var seffectArrNm2 = [];
//화면 그리기
function reloadListTitle() {
	var params = $("#actionForm").serialize();
	$.ajax({
		url : "revUpdateTitleAjax",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			revTitleList(res.revTitleList, res.getRevCon);
			
		},
		error : function(reqeust,status,error) {
			console.log(request.responseText);
		}
	});
}

function revTitleList(revTitleList, getRevCon) {
	var html = "";
	var html2 = "";
	var conData = "";
	for(data of revTitleList) {
		html += "<span class=\"topSpan\">" + data.PROD_NM + "</span>";
		html2 += "<span class=\"regDt\">" + data.REG_D +"</span>";
	}
		if(getRevCon != null){
			conData += "<textarea rows=\"10\" cols=\"30\" id=\"con\">" + getRevCon.CON + "</textarea>";			
		}else{
			conData += "<textarea rows=\"10\" cols=\"30\" id=\"con\">" + "" + "</textarea>";
		}
		
	$(".topSpan").html(html);
	$(".regDt").html(html2);
	$(".editor_div").html(conData);
	CKEDITOR.replace("con", {
		resize_enabled : false, //크기조절기능 활용여부
		language : "ko", //사용 언어
		enterMode : "2", //엔터키 처리 방법 -> 1 : p태그, 2 : br태그 , 3: div태그
		width : 1296, // 숫자일 경우 px, 문자열일 경우 css크기
		height : 100,
		skin : 'office2013'
	});
}

//효과 - 선택 팝업창
function choicePopup() {
	var html = "";
	
	html += "<form id=\"popupForm\">";
	html += "<input type=\"hidden\" name=\"page\" id=\"page\" value=\"1\" />";
	html += "<input type=\"hidden\" name=\"searchTxt\" />";
	html += "<input type=\"text\" id=\"searchEffect\" name=\"searchEffect\" class=\"searchEffect\" />";
	html += "<input type=\"button\" id=\"searchEffectBtn\" class=\"searchEffectBtn blueBtn\" value=\"검색\" />";
	html += "<table class=\"reviewTable\">";
	html += "<thead>";
	html += "<tr class=\"reviewTable_th\">";
	html += "<th>효과 번호</th>";
	html += "<th>효과명</th>";
	html += "</tr>";
	html += "</thead>";
	html += "<tbody>";
	html += "</tbody>";
	html += "</table>";
	html += "<div class=\"paging_area\"></div>";
	html += "</form>";

	makePopup({
		width : 800,
		height : 600,
		bg : false,
		bgClose : true,
		title : "효과 선택",
		contents : html,
		contentsEvent : function() {
			$("#popupForm .paging_area").on("click", "span", function() {
				$("#page").val($(this).attr("page"));
				//리로드
				reloadList();
			});
			
			$(".reviewTable").on("click", "tr", function () {
				$(".effectNum").val($(this).attr("no"));
				//td의 2번쨰값 가져오기
				$(".effectHiddenName").val($(this).closest('tr').find('td:nth-child(2)').text());
				$(".effectNum").val($(this).closest('tr').find('td:nth-child(1)').text());
				$(".effectDelNum").val($(this).closest('tr').find('td:nth-child(1)').text());
				effectNum.push($(".effectNum").val());
				makePopup({
					width : 300,
					height : 200,
					bg : false,
					bgClose : true,
					title : "등록",
					contents : "등록 하시겠습니까?",
					draggable : false,
					buttons : [{
						name : "등록",
							func : function() {
								$(".effectChoice").val($(".effectHiddenName").val());
								closePopup(1);//팝업 depth 닫기
								closePopup(2);//팝업 depth 닫기
								$(".effectHiddenName").val(""); //초기화
							}
						}, {
						name : "취소",
						func : function() {
							closePopup(1);//팝업 depth 닫기
							closePopup(2);
						}
					}]
				})
			});
			//검색버튼 클릭시
			$(".searchEffectBtn").on("click", function () {
				$("#page").val("1");
				reloadList();
			});
			
			reloadList();
			//리로드
			var params = $("#popupForm").serialize();
			
			$.ajax({
				url : "MedicineReviewAddAjax",
				type : "POST",
				dataType : "json",
				data : params,
				success : function(res) {
					if(res.list.length > 0) {
							drawList(res.list);
							drawPaging(res.pd);
						
					} else {
						makeAlert("알림", "검색 결과가 없습니다.");
					}
				},
				error : function(request, status, error) {
					console.log(request.responseText);
				}
			});
		},
		draggable : false,
		buttons : [{
			name : "취소",
			func : function() {
				closePopup(1);
				//closePopup(2);//팝업 depth 닫기
			}
		}]
		
	});
}//END OF choicePopup()

//부작용 선택 팝업창
function choicePopup2() {
	var html = "";
	
	html += "<form id=\"popupForm2\">";
	html += "<input type=\"hidden\" name=\"page\" id=\"page1\" value=\"1\" />";
	html += "<input type=\"hidden\" name=\"searchTxt\" />";
	html += "<input type=\"text\" id=\"searchSeffect\" name=\"searchSeffect\" class=\"searchSeffect\" />";
	html += "<input type=\"button\" id=\"searchSeffectBtn\" class=\"searchSeffectBtn blueBtn\" value=\"검색\" />";
	html += "<table class=\"reviewTable2\">";
	html += "<thead>";
	html += "<tr class=\"reviewTable_th2\">";
	html += "<th>부작용 번호</th>";
	html += "<th>부작용명</th>";
	html += "</tr>";
	html += "</thead>";
	html += "<tbody>";
	html += "</tbody>";
	html += "</table>";
	html += "<div class=\"paging_area paging_area2\"></div>";
	html += "</form>";
	
	makePopup({
		width : 800,
		height : 600,
		bg : false,
		bgClose : true,
		title : "부작용 선택",
		contents : html,
		contentsEvent : function() {
			$("#popupForm2 .paging_area2").on("click", "span", function() {
				$("#page1").val($(this).attr("page1"));
				//리로드
				reloadList2();
			});
			//
			$(".reviewTable2").on("click", "tr", function () {
				$(".seffectNum").val($(this).attr("no"));
				//td의 2번쨰값 가져오기
				$(".seffectHiddenName").val($(this).closest('tr').find('td:nth-child(2)').text());
				$(".seffectNum").val($(this).closest('tr').find('td:nth-child(1)').text());
				seffectNum.push($(".seffectNum").val());
				makePopup({
					width : 300,
					height : 200,
					bg : false,
					bgClose : true,
					title : "등록",
					contents : "등록 하시겠습니까?",
					draggable : false,
					buttons : [{
						name : "등록",
							func : function() {
								$(".seffectChoice").val($(".seffectHiddenName").val());
								closePopup(1);//팝업 depth 닫기
								closePopup(2);//팝업 depth 닫기
								$(".seffectHiddenName").val(""); //초기화
							}
						}, {
						name : "취소",
						func : function() {
							closePopup(2);
						}
					}]
				})
			});
			//검색버튼 클릭시
			$(".searchSeffectBtn").on("click", function () {
				$("#page1").val("1");
				reloadList2();
			});
			
			reloadList2();
			//리로드
			var params = $("#popupForm2").serialize();
			
			$.ajax({
				url : "MedicineReviewAddAjax2",
				type : "POST",
				dataType : "json",
				data : params,
				success : function(res) {
					if(res.list.length > 0) {
							drawList2(res.list);
							drawPaging2(res.pd);
						
					} else {
						makeAlert("알림", "검색 결과가 없습니다.");
					}
				},
				error : function(request, status, error) {
					console.log(request.responseText);
				}
			});
		},
		draggable : false,
		buttons : [{
			name : "취소",
			func : function() {
				closePopup(1);
			}
		}]
		
	});
}//END OF choicePopup2()

//팝업창 -효과 목록
function drawList(list) {
	var html = "";
	
	for(data of list) {
		html += "<tr no=\"" + data.EFFECT_NUM + "\">";
		html += "<td>" +data.EFFECT_NUM;
		html += "</td>";
		html += "<td>" +data.EFFECT_NM;
		html += "</td>";
		html += "</tr>";
	}
	$(".reviewTable tbody").html(html);
}//END OF drawList()

//팝업창 - 부작용 목록
function drawList2(list) {
	var html = "";
	
	for(data of list) {
		html += "<tr no=\"" + data.SEFFECT_NUM + "\">";
		html += "<td>" +data.SEFFECT_NUM;
		html += "</td>";
		html += "<td>" +data.SEFFECT_NM;
		html += "</td>";
		html += "</tr>";
	}
	$(".reviewTable2 tbody").html(html);
}//END OF drawList2()

//페이징 그리기
function drawPaging(pd) {
	var html = "";
	
	html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	// 이전
	if($("#page").val() == "1") {
		html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	} else {
		html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 -1) + "\">이전</span>";
	}
	
	for(var i = pd.startP; i <= pd.endP; i++) {
		if($("#page").val() * 1 == i) { //현재 페이지의 경우 별도처리
			html += "<span class=\"page_btn_on\" page=\"" + i + "\">" + i + "</span> ";
		} else { //그게 아니면 다른 페이지
			html += "<span class=\"page_btn\" page=\"" + i + "\">" + i + "</span>";		
		}
	}
	
	//[다음도 조건문으로 처리]
	if($("#page").val() *1 == pd.maxP){ //현재 페이지가 마지막 페이지라면
		html += "<span class=\"page_btn page_next\" page=\"" + pd.maxP + "\">다음</span>";
	} else { //그게 아니라면
		html += "<span class=\"page_btn page_next\" page=\"" + ($("#page").val() *1 +1)+ "\">다음</span>";	
	}
		html += "<span class=\"page_btn page_last\" page=\"" + pd.maxP+ "\">마지막</span>";
		
	$(".paging_area").html(html);
}//END OF drawPaging

function drawPaging2(pd2) {
	var html = "";
	
	html += "<span class=\"page_btn page_first\" page1=\"1\">처음</span>";
	// 이전
	if($("#page1").val() == "1") {
		html += "<span class=\"page_btn page_prev\" page1=\"1\">이전</span>";
	} else {
		html += "<span class=\"page_btn page_prev\" page1=\"" + ($("#page1").val() * 1 -1) + "\">이전</span>";
	}
	
	for(var i = pd2.startP; i <= pd2.endP; i++) {
		if($("#page1").val() * 1 == i) { //현재 페이지의 경우 별도처리
			html += "<span class=\"page_btn_on\" page1=\"" + i + "\">" + i + "</span> ";
		} else { //그게 아니면 다른 페이지
			html += "<span class=\"page_btn\" page1=\"" + i + "\">" + i + "</span>";		
		}
	}
	
	//[다음도 조건문으로 처리]
	if($("#page1").val() *1 == pd2.maxP){ //현재 페이지가 마지막 페이지라면
		html += "<span class=\"page_btn page_next\" page1=\"" + pd2.maxP + "\">다음</span>";
	} else { //그게 아니라면!
		html += "<span class=\"page_btn page_next\" page1=\"" + ($("#page1").val() *1 +1)+ "\">다음</span>";	
	}
		html += "<span class=\"page_btn page_last\" page1=\"" + pd2.maxP+ "\">마지막</span>";
		
	$(".paging_area2").html(html);
}//END OF drawPaging


function graphloadList() {
var params = $("#actionForm").serialize();
	$.ajax({
		url : "MedicineRevDetailAjax",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			reloadRevTable(res.revDetailEffect, res.revDetailSEffect, res.revDetailEffectEtc, res.revDetailSEffectEtc);
			reloadRevGraph();
		},
		error : function(request, status, error) {
			console.log(request.responseText);
		}
	});
}
//전역변수
	var effectArrFirst = [];
	var effectArrSecond = [];
	var effectCntFirst = 0;
	var effectCntSecond = 0;
	
	var seffectArrFirst = [];
	var seffectArrSecond = [];
	var seffectCntFirst = 0;
	var seffectCntSecond = 0;
function reloadRevTable(revDetailEffect, revDetailSEffect, revDetailEffectEtc, revDetailSEffectEtc) {
	var html = "";
	
	for(data of revDetailEffect) {
		effectArr1.push(data.SCORE); //점수 - DB에 넣을 용도
		effectArrNm1.push(data.EFFECT_NM); //이름 - DB에 넣을 용도
		effectSum1 += data.SCORE; //그래프 그리기용 점수
		//td에 그리용
		effectArrFirst.push("<td no=\"" + effectCntFirst++ + "\" indexNumber = \"" + data.EFFECT_NUM+ "\">" + data.EFFECT_NM+"(" + data.SCORE + ")" + "</td>");
	
	}
		for(var i=0;i<3;i++) {
			$(".effect_tr1").append(effectArrFirst[i]);
	}	
		for(var i=3;i<6;i++) {
			$(".effect_tr2").append(effectArrFirst[i]);
	}
	
	
	
	//부작용
	for(data of revDetailSEffect) {
		seffectArr1.push(data.SCORE);
		seffectArrNm1.push(data.SEFFECT_NM);
		seffectSum1 += data.SCORE;
		seffectArrFirst.push("<td no=\"" + seffectCntFirst++ + "\" indexNumber = \"" + data.SEFFECT_NUM+ "\">" + data.SEFFECT_NM+"(" + data.SCORE + ")" + "</td>");
	}
	for(var i=0;i<3;i++) {
			$(".seffect_tr1").append(seffectArrFirst[i]);
	}	
		for(var i=3;i<6;i++) {
			$(".seffect_tr2").append(seffectArrFirst[i]);
	}
	
	
	//기타효과
	for(data of revDetailEffectEtc) {
		effectArr2.push(data.SCORE);
		effectArrNm2.push(data.EFFECT_NM);
		effectSum2 += data.SCORE;
		effectArrSecond.push("<td no=\"" + effectCntSecond++ + "\">" + data.EFFECT_NM+"(" + data.SCORE + ")" + "</td>");
	}
	for(var i=0;i<3;i++) {
			$(".effect_tr3").append(effectArrSecond[i]);
	}	
		for(var i=3;i<6;i++) {
			$(".effect_tr4").append(effectArrSecond[i]);
	}
	
	//기타부작용
	for(data of revDetailSEffectEtc) {
		seffectArr2.push(data.SCORE);
		seffectArrNm2.push(data.SEFFECT_NM);
		seffectSum2 += data.SCORE;
		seffectArrSecond.push("<td no=\"" + seffectCntSecond++ + "\">" + data.SEFFECT_NM+"(" + data.SCORE + ")" + "</td>");
	}
	for(var i=0;i<3;i++) {
			$(".seffect_tr3").append(seffectArrSecond[i]);
	}	
		for(var i=3;i<6;i++) {
			$(".seffect_tr4").append(seffectArrSecond[i]);
	}
	
}

//효과 리스트 리로드
function reloadList() {
	var params = $("#popupForm").serialize();
	$.ajax({
		url : "MedicineReviewListAjax",
		type : "POST",
		dataType: "json",
		data : params,
		success : function(res) {
			drawList(res.list);
			drawPaging(res.pd);
		},
		error : function(request, status, error) {
			console.log(request.responseText);
		}
	});
}
//부작용 리스트 리로드
function reloadList2() {
	var params = $("#popupForm2").serialize();
	$.ajax({
		url : "MedicineReviewListAjax2",
		type : "POST",
		dataType: "json",
		data : params,
		success : function(res) {
			drawList2(res.list);
			drawPaging2(res.pd2);
		},
		error : function(request, status, error) {
			console.log(request.responseText);
		}
	});
}


function reloadRevGraph() {
	/* 상세보기 - 해당 의약품 그래프 */
//Create the chart
Highcharts.chart('container3', {
    chart: {
        type: 'column'
    },
    title: {
        align: 'left',
        text: '의약품에 대한  상세 그래프'
    },
    
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: ''
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y}점'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>총합 {point.y}점</b> <br/>'
    },

    series: [
        {
            name: "",
            colorByPoint: true,
            data: [
                {
                    name: "효과",
                    y : effectSum1,
                    drilldown: "효과"
                },
                {
                    name: "부작용",
                      y : seffectSum1,
                    drilldown: "부작용"
                },
                {
                    name: "기타 효과",
                    y : effectSum2,
                    drilldown: "기타 효과"
                },
                {
                    name: "기타 부작용",
                      y : seffectSum2,
                    drilldown: "기타 부작용"
                }
                
            ]
        }
    ],
    drilldown: {
        breadcrumbs: {
            position: {
                align: 'right'
            }
        },
        series: [
            {
                name: "효과",
                id: "효과",
                data: [
                   [
                      effectArrNm1[0],
                      parseInt(effectArr1[0])
                   ],
                    [
                      effectArrNm1[1],
                      parseInt(effectArr1[1])
                   ],
                    [
                      effectArrNm1[2],
                      parseInt(effectArr1[2])
                   ],
                    [
                      effectArrNm1[3],
                      parseInt(effectArr1[3])
                   ],
                    [
                      effectArrNm1[4],
                      parseInt(effectArr1[4])
                   ],
                    [
                      effectArrNm1[5],
                      parseInt(effectArr1[5])
                   ]
                   
                ]
            },
            {
                name: "부작용",
                id: "부작용",
                data: [
                    [
					  seffectArrNm1[0],
                      parseInt(seffectArr1[0])
				    ],
				    [
					  seffectArrNm1[1],
                      parseInt(seffectArr1[1])
				    ],
				    [
					  seffectArrNm1[2],
                      parseInt(seffectArr1[2])
				    ],
				    [
					  seffectArrNm1[3],
                      parseInt(seffectArr1[3])
				    ],
				    [
					  seffectArrNm1[4],
                      parseInt(seffectArr1[4])
				    ],
				    [
					  seffectArrNm1[5],
                      parseInt(seffectArr1[5])
				    ]
                ]
            },
            {
                name: "기타 효과",
                id: "기타 효과",
                data: [
                    [
                      effectArrNm2[0],
                      parseInt(effectArr2[0])
                    ],  
                     [
                      effectArrNm2[1],
                      parseInt(effectArr2[1])
                    ],  
                     [
                      effectArrNm2[2],
                      parseInt(effectArr2[2])
                    ],  
                     [
                      effectArrNm2[3],
                      parseInt(effectArr2[3])
                    ],  
                     [
                      effectArrNm2[4],
                      parseInt(effectArr2[4])
                    ],  
                     [
                      effectArrNm2[5],
                      parseInt(effectArr2[5])
                    ]
                ]
            },
            {
                name: "기타 부작용",
                id: "기타 부작용",
                data: [
                   [
					  seffectArrNm2[0],
                      parseInt(seffectArr2[0])
				   ],
				   [
					  seffectArrNm2[1],
                      parseInt(seffectArr2[1])
				   ],
				   [
					  seffectArrNm2[2],
                      parseInt(seffectArr2[2])
				   ],
				   [
					  seffectArrNm2[3],
                      parseInt(seffectArr2[3])
				   ],
				   [
					  seffectArrNm2[4],
                      parseInt(seffectArr2[4])
				   ],
				   [
					  seffectArrNm2[5],
                      parseInt(seffectArr2[5])
				   ]
                ]
            },
        ]
    }
});
}





//효과 선택 및 점수 -> 테이블 추가
var effectNum = [];
var effectArr = [];
var effectScoreArr = [];
var effectScoreSum = 0;

function addEffect() {
	var html = "";
	var flag = false;

	if(effectArrNm1.length >= 6) {
		makeAlert("알림", "최대 6개까지만 등록 가능합니다.");
	}else if(effectArrNm1.length < 6) {
		//중복검사
		for(var i=0;i<effectArrNm1.length;i++) {
			if($(".effectChoice").val() === effectArrNm1[i]) {
				makeAlert("알림", "중복된 효과입니다.");
				flag = true;
				break;
			}
		}
		//3보다 작고 중복되는게 없을때
		if(effectArrNm1.length < 3 && !flag) {
			
			effectArr.push($(".effectChoice").val());
			effectArrNm1.push($(".effectChoice").val());
			effectArr1.push($(".effectScore").val());
			effectScoreArr.push($(".effectScore").val());
			effectSum1 += parseInt($(".effectScore").val());
			html += "<td no=\"" + effectCntFirst++ + "\" class=\"effect_td_"+effectCntFirst +"\">" + $(".effectChoice").val() +"("+$(".effectScore").val()+")"+ "</td>";
	
			//tr1의 길이가 3보다 작을때 tr1 클래스에 넣기
			if($(".effect_tr1 td").length < 3) {
				$(".effect_tr1").append(html);
			//tr2의 길이가 3보다 작을때 tr2 클래스에 넣기
			}else if($(".effect_tr2 td").length < 3) {
				$(".effect_tr2").append(html);
			}
		//3보다 작지만 tr2에 넣기
		}else if(effectArrNm1.length >= 3 && effectArrNm1.length < 6 && !flag) {
			
			effectArr.push($(".effectChoice").val());
			effectArrNm1.push($(".effectChoice").val());
			effectArr1.push($(".effectScore").val());
			effectScoreArr.push($(".effectScore").val());
			effectSum1 += parseInt($(".effectScore").val());
			html += "<td no=\"" + effectCntFirst++ + "\" class=\"effect_td_"+effectCntFirst +"\">" + $(".effectChoice").val() +"("+$(".effectScore").val()+")"+ "</td>";
			
			//tr1의 길이가 3보다 작을때 tr1 클래스에 넣기
			if($(".effect_tr1 td").length < 3) {
				$(".effect_tr1").append(html);
			//tr2의 길이가 3보다 작을때 tr2 클래스에 넣기
			}else if($(".effect_tr2 td").length < 3) {
				$(".effect_tr2").append(html);
			}
		}
		
		
	}


	console.log(effectArr);
	console.log(effectArrNm1);
	console.log(effectArr1);

}//END OF addEffect()

//부작용 선택 및 점수 -> 테이블 추가
var seffectNum = [];
var seffectArr = [];
var seffectScoreArr = [];
var seffectScoreSum = 0;
function addSEffect() {
	var html = "";
	var flag = false;

	if(seffectArrNm1.length >= 6) {
		makeAlert("알림", "최대 6개까지만 등록 가능합니다.");
	}else if(seffectArrNm1.length < 6) {
		//중복검사
		for(var i=0;i<seffectArrNm1.length;i++) {
			if($(".seffectChoice").val() === seffectArrNm1[i]) {
				makeAlert("알림", "중복된 효과입니다.");
				flag = true;
				break;
			}
		}
		if(seffectArrNm1.length < 3 && !flag) {
			seffectArr.push($(".seffectChoice").val());
			seffectArrNm1.push($(".seffectChoice").val());
			seffectArr1.push($(".seffectScore").val());
			seffectScoreArr.push($(".seffectScore").val());
			seffectSum1 += parseInt($(".seffectScore").val());
			html += "<td no=\"" + seffectCntFirst++ + "\" class=\"seffect_td_"+seffectCntFirst +"\">" + $(".seffectChoice").val() +"("+$(".seffectScore").val()+")"+ "</td>";
			
			if($(".seffect_tr1 td").length < 3) {
				$(".seffect_tr1").append(html);
			}else if($(".seffect_tr2 td").length < 3) {
				$(".seffect_tr2").append(html);
			}

		}else if(seffectArrNm1.length >= 3 && seffectArrNm1.length < 6 && !flag) {
			seffectArr.push($(".seffectChoice").val());
			seffectArrNm1.push($(".seffectChoice").val());
			seffectArr1.push($(".seffectScore").val());
			seffectScoreArr.push($(".seffectScore").val());
			seffectSum1 += parseInt($(".seffectScore").val());
			html += "<td no=\"" + seffectCntFirst++ + "\" class=\"seffect_td_"+seffectCntFirst +"\">" + $(".seffectChoice").val() +"("+$(".seffectScore").val()+")"+ "</td>";
			
			if($(".seffect_tr1 td").length < 3) {
				$(".seffect_tr1").append(html);
			}else if($(".seffect_tr2 td").length < 3) {
				$(".seffect_tr2").append(html);
			}
		}
	}

}//END OF addSEffect()

//기타효과 선택 및 점수 -> 테이블 추가
var effectName2 = [];
var effectNum2 = [];
var effectArr2 = [];
var effectScoreArr2 = [];
var effectScoreSum2 = 0;
function addEffect2() {
	var html = "";
	var flag = false;

	if(effectArrNm2.length >= 6) {
		makeAlert("알림", "최대 6개까지만 등록 가능합니다.");
	}else if(effectArrNm2.length < 6) {
		//중복검사
		for(var i=0;i<effectArrNm2.length;i++) {
			if($(".effectChoice2").val() === effectArrNm2[i]) {
				makeAlert("알림", "중복된 효과입니다.");
				flag = true;
				break;
			}
		}
		if(effectArrNm2.length < 3 && !flag) {
			effectArr2.push($(".effectChoice2").val());
			effectArrNm2.push($(".effectChoice2").val());
			effectNum2.push($(".effectScore2").val());
			effectName2.push($(".effectChoice2").val());
			$(".effect_Name2").val(effectName2);
			$(".effectNum2").val(effectNum2);
			effectSum2 += parseInt($(".effectScore2").val());
			html += "<td no=\"" + effectCntSecond++ + "\" class=\"etc_effect_td_"+effectCntSecond +"\">" + $(".effectChoice2").val() +"("+$(".effectScore2").val()+")"+ "</td>";
			
			if($(".effect_tr3 td").length < 3) {
				$(".effect_tr3").append(html);
			}else if($(".effect_tr4 td").length < 3) {
				$(".effect_tr4").append(html);
			}

		}else if(effectArrNm2.length >= 3 && effectArrNm2.length < 6 && !flag) {
			effectArr2.push($(".effectChoice2").val());
			effectArrNm2.push($(".effectChoice2").val());
			effectNum2.push($(".effectScore2").val());
			effectName2.push($(".effectChoice2").val());
			$(".effect_Name2").val(effectName2);
			$(".effectNum2").val(effectNum2);
			effectSum2 += parseInt($(".effectScore2").val());
			html += "<td no=\"" + effectCntSecond++ + "\" class=\"etc_effect_td_"+effectCntSecond +"\">" + $(".effectChoice2").val() +"("+$(".effectScore2").val()+")"+ "</td>";
			
			if($(".effect_tr3 td").length < 3) {
				$(".effect_tr3").append(html);
			}else if($(".effect_tr4 td").length < 3) {
				$(".effect_tr4").append(html);
			}
		}
		
		
	}
}//END OF addEffect2()

//기타부작용 선택 및 점수 -> 테이블 추가
var seffectName2 = [];
var seffectNum2 = [];
var seffectArr2 = [];
var seffectScoreArr2 = [];
var seffectScoreSum2 = 0;
function addSEffect2() {
	var html = "";
	var flag = false;

	if(seffectArrNm2.length >= 6) {
		makeAlert("알림", "최대 6개까지만 등록 가능합니다.");
	}else if(seffectArrNm2.length < 6) {
		//중복검사
		for(var i=0;i<seffectArrNm2.length;i++) {
			if($(".seffectChoice2").val() === seffectArrNm2[i]) {
				makeAlert("알림", "중복된 효과입니다.");
				flag = true;
				break;
			}
		}
		if(seffectArrNm2.length < 3 && !flag) {
			seffectArr2.push($(".seffectChoice2").val());
			seffectArrNm2.push($(".seffectChoice2").val());
			seffectNum2.push($(".seffectScore2").val());
			seffectName2.push($(".seffectChoice2").val());
			$(".seffect_Name2").val(seffectName2);
			$(".seffectNum2").val(seffectNum2);
			seffectSum2 += parseInt($(".seffectScore2").val());
			html += "<td no=\"" + seffectCntSecond++ + "\" class=\"etc_seffect_td_"+seffectCntSecond +"\">" + $(".seffectChoice2").val() +"("+$(".seffectScore2").val()+")"+ "</td>";
			
			if($(".seffect_tr3 td").length < 3) {
				$(".seffect_tr3").append(html);
			}else if($(".seffect_tr4 td").length < 3) {
				$(".seffect_tr4").append(html);
			}
		}else if(seffectArrNm2.length >= 3 && seffectArrNm2.length < 6 && !flag) {
			seffectArr2.push($(".seffectChoice2").val());
			seffectArrNm2.push($(".seffectChoice2").val());
			seffectNum2.push($(".seffectScore2").val());
			seffectName2.push($(".seffectChoice2").val());
			$(".seffect_Name2").val(seffectName2);
			$(".seffectNum2").val(seffectNum2);
			seffectSum2 += parseInt($(".seffectScore2").val());
			html += "<td no=\"" + seffectCntSecond++ + "\" class=\"etc_seffect_td_"+seffectCntSecond +"\">" + $(".seffectChoice2").val() +"("+$(".seffectScore2").val()+")"+ "</td>";
			
			if($(".seffect_tr3 td").length < 3) {
				$(".seffect_tr3").append(html);
			}else if($(".seffect_tr4 td").length < 3) {
				$(".seffect_tr4").append(html);
			}
		}
	}

}//END OF addSEffect()

function updateEffectChoice() {
	var html = "";
	
	html += "<form id=\"popupForm\">";
	html += "<input type=\"hidden\" name=\"page\" id=\"page\" value=\"1\" />";
	html += "<input type=\"hidden\" name=\"searchTxt\" />";
	html += "<input type=\"text\" id=\"searchEffect\" name=\"searchEffect\" class=\"searchEffect\" />";
	html += "<input type=\"button\" id=\"searchEffectBtn\" class=\"searchEffectBtn blueBtn\" value=\"검색\" />";
	html += "<table class=\"reviewTable\">";
	html += "<thead>";
	html += "<tr class=\"reviewTable_th\">";
	html += "<th>효과 번호</th>";
	html += "<th>효과명</th>";
	html += "</tr>";
	html += "</thead>";
	html += "<tbody>";
	html += "</tbody>";
	html += "</table>";
	html += "<div class=\"paging_area\"></div>";
	html += "</form>";

	makePopup({
		width : 800,
		height : 600,
		bg : false,
		bgClose : true,
		title : "효과 선택",
		contents : html,
		contentsEvent : function() {
			$("#popupForm .paging_area").on("click", "span", function() {
				$("#page").val($(this).attr("page"));
				//리로드
				reloadList();
			});
			
			$(".reviewTable").on("click", "tr", function () {
				$(".effectNum").val($(this).attr("no"));
				//td의 2번쨰값 가져오기
				$(".effectHiddenName").val($(this).closest('tr').find('td:nth-child(2)').text());
				$(".effectNum").val($(this).closest('tr').find('td:nth-child(1)').text());
				makePopup({
					width : 300,
					height : 200,
					bg : false,
					bgClose : true,
					title : "등록",
					contents : "등록 하시겠습니까?",
					draggable : false,
					buttons : [{
							func : function() {
								$("#updatePopupForm .updateEffectText").val($(".effectHiddenName").val());
								$("#updatePopupForm .updateEffectScore").val("");
								closePopup(2);//팝업 depth 닫기
								closePopup(3);//팝업 depth 닫기
								
								$(".effectHiddenName").val(""); //초기화
								
							}
						}, {
						name : "취소",
						func : function() {
							closePopup(3);
						}
					}]
				})
			});
			//검색버튼 클릭시
			$(".searchEffectBtn").on("click", function () {
				$("#page").val("1");
				reloadList();
			});
			
			reloadList();
			//리로드
			var params = $("#popupForm").serialize();
			
			$.ajax({
				url : "MedicineReviewAddAjax",
				type : "POST",
				dataType : "json",
				data : params,
				success : function(res) {
					if(res.list.length > 0) {
							drawList(res.list);
							drawPaging(res.pd);
						
					} else {
						makeAlert("알림", "검색 결과가 없습니다.");
					}
				},
				error : function(request, status, error) {
					console.log(request.responseText);
				}
			});
		},
		draggable : false,
		buttons : [{
			name : "취소",
			func : function() {
				closePopup(2);
			}
		}]
		
	});
}
/* 삭제 - db에 있는 효과 */
function deleteEffectChoice() {
	var params = $("#actionForm").serialize();
	$.ajax({
		url : "revUpdate/delete/effect",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			reloadRevGraph();
		},
		error : function(request, status, error) {
			console.log(request.reponseText);
		}
	});
}
/* 삭제 - db에 있는 부작용 */
function deleteSEffectChoice() {
	var params = $("#actionForm").serialize();
	$.ajax({
		url : "revUpdate/delete/seffect",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			reloadRevGraph();
		},
		error : function(request, status, error) {
			console.log(request.reponseText);
		}
	});
}
//삭제 - db에 있는 기타 효과
function delete_etc_EffectChoice() {
	var params = $("#actionForm").serialize();
	$.ajax({
		url : "revUpdate/delete/etc_effect",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			reloadRevGraph();
		},
		error : function(request, status, error) {
			console.log(request.reponseText);
		}
	});
}
//삭제 - db에 있는 기타 부작용
function delete_etc_SEffectChoice() {
	var params = $("#actionForm").serialize();
	$.ajax({
		url : "revUpdate/delete/etc_seffect",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			reloadRevGraph();
		},
		error : function(request, status, error) {
			console.log(request.reponseText);
		}
	});
}
//리뷰 삭제
function revDelFunc() {
	var params = $("#actionForm").serialize();
	$.ajax({
		url : "UDfuncAjax/delete",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.msg=="success"){
				location.href = "MyPageReview";
			}else if (res.msg =="failed"){
				makeAlert("알림" , "삭제 실패!");
			}else if (res.msg =="error"){
				makeAlert("알림" , "삭제 실패!");
			}
			
		},
		error : function(request, status, error) {
			console.log(request.reponseText);
		}
	});
}
//리뷰 수정
function revUpdateFunc() {
	$(".revCon").val(CKEDITOR.instances['con'].getData());
	var params = $("#actionForm").serialize();
	$.ajax({
		url : "UDfuncAjax/update",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.msg=="success"){
				location.href = "MyPageReview";
			}else if (res.msg =="failed"){
				makeAlert("알림" , "수정에 실패!");
			}else if (res.msg =="error"){
				makeAlert("알림" , "수정 에러!");
			}
			
		},
		error : function(request, status, error) {
			console.log(request.reponseText);
		}
	});
}