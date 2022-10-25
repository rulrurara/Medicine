$(document).ready(function(){
	//그래프 리로드
	reloadGraph();
	
	console.log("prod = = " + $("#prodNm").val());
	//에디터 생성
	CKEDITOR.replace("con", {
			resize_enabled : false, //크기조절기능 활용여부
			language : "ko", //사용 언어
			enterMode : "2", //엔터키 처리 방법 -> 1 : p태그, 2 : br태그 , 3: div태그
			width : 1296, // 숫자일 경우 px, 문자열일 경우 css크기
			height : 100,
			skin : 'office2013'
		});
			
	//목록 버튼 클릭 시 이벤트
	$(".listBtn").on("click", function() {
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
				reloadGraph();
				$(".effect_arr").val(effectArr);
				$(".effect_score_arr").val(effectScoreArr);
				$(".effectNum").val(effectNum);
				$(".effectScore").val("");
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
				reloadGraph();
				$(".seffect_arr").val(seffectArr);
				$(".seffect_score_arr").val(seffectScoreArr);
				$(".seffectNum").val(seffectNum);
				console.log("no = " + $(".seffectNum").val());
				$(".seffectScore").val("");
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
				reloadGraph();
				$(".effect_arr2").val(effectArr2);
				$(".effect_score_arr2").val(effectScoreArr2);
				$(".effectScore2").val("");
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
				reloadGraph();
				$(".seffect_arr2").val(seffectArr2);
				$(".seffect_score_arr2").val(seffectScoreArr2);
				$(".seffectScore2").val("");
			}
		}
	});
	
	//리뷰등록 버튼 클릭시
	$(".reviewAddBtn").on("click", function() {
		if(($(".effect_td_0").val() == null && $(".seffect_td_0").val() == null) &&
			($(".effect_td2_0").val() == null && $(".seffect_td2_0").val() == null)) {
			makeAlert("알림", "효과나 부작용을 1개이상 입력해주세요.");
		} else {
			$("#con").val(CKEDITOR.instances['con'].getData());
			var params = $("#actionForm").serialize();
			$.ajax({
				url : "mediRevReg",
				type : "POST",
				dataType : "json",
				data : params,
				success : function(res) {
					if(res.msg == "successSeq") {
						alert("시퀀스 성공");
					}else if(res.msg == "failedSeq") {
						alert("시퀀스 실패");	
					}else if(res.msg == "success") {
						$("#actionForm").attr("action","medicineInfoDetail");
						$("#actionForm").submit();
					}else if(res.msg == "failed") {
						alert("실패");
					}else if(res.msg == "error") {
						alert("에러");
					}
				},
				error : function(request, status, error) {
					console.log(request.responseText);
				}
			})//END OF Ajax
		}
	});
	
	
	
	
	
	
});//end of document
function reloadGraph() {
	//CKEDITOR.replace(아이디, 옵션)

		//그래프
		Highcharts.chart('container3', {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        align: 'left',
		        text: $("#prodNm").val()+"의 효과/부작용 점수"
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
		                format: '{point.y:.f}점'
		            }
		        }
		    },

		    tooltip: {
		        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>총합 {point.y:.f}점</b> <br/>'
		    },

		    series: [
		        {
		            name: "",
		            colorByPoint: true,
		            data: [
		                {
		                    name: "효과",
		                    y : 
		                    parseInt(effectScoreSum)
		                    ,
		                    drilldown: "효과"
		                },
		                {
		                    name: "부작용",
		                      y : 
		                      parseInt(seffectScoreSum)
		                      ,
		                    drilldown: "부작용"
		                },
		                {
		                    name: "기타 효과",
		                      y : 
		                      parseInt(effectScoreSum2)
		                    ,
		                    drilldown: "기타 효과"
		                },
		                {
		                    name: "기타 부작용",
		                      y : 
		                      parseInt(seffectScoreSum2)
		                      ,
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
		                      effectArr[0],
		                      parseInt(effectScoreArr[0])
		                   ],
		                   [
							  effectArr[1],
		                      parseInt(effectScoreArr[1])
						   ],
						   [
		                      effectArr[2],
		                      parseInt(effectScoreArr[2])
		                   ],
		                   [
		                      effectArr[3],
		                      parseInt(effectScoreArr[3])
		                   ],
		                   [
		                      effectArr[4],
		                      parseInt(effectScoreArr[4])
		                   ],
		                   [
		                      effectArr[5],
		                      parseInt(effectScoreArr[5])
		                   ]

		                ]
		            },
		            {
		                name: "부작용",
		                id: "부작용",
		                data: [
							[
								seffectArr[0],
		                    	parseInt(seffectScoreArr[0])
							],
							[
								seffectArr[1],
		                    	parseInt(seffectScoreArr[1])
							],
							[
								seffectArr[2],
		                    	parseInt(seffectScoreArr[2])
							],
							[
								seffectArr[3],
		                    	parseInt(seffectScoreArr[3])
							],
							[
								seffectArr[4],
		                    	parseInt(seffectScoreArr[4])
							],
							[
								seffectArr[5],
		                    	parseInt(seffectScoreArr[5])
							],
		                    
		                ]
		            },
		            {
		                name: "기타 효과",
		                id: "기타 효과",
		                data: [
		                    [
		                        effectArr2[0],
		                        parseInt(effectScoreArr2[0])
		                    ],
		                    [
		                        effectArr2[1],
		                        parseInt(effectScoreArr2[1])
		                    ],
		                    [
		                        effectArr2[2],
		                        parseInt(effectScoreArr2[2])
		                    ],
		                    [
		                        effectArr2[3],
		                        parseInt(effectScoreArr2[3])
		                    ],
		                    [
		                        effectArr2[4],
		                        parseInt(effectScoreArr2[4])
		                    ],
		                    [
		                        effectArr2[5],
		                        parseInt(effectScoreArr2[5])
		                    ],
		                ]
		            },
		            {
		                name: "기타 부작용",
		                id: "기타 부작용",
		                data: [
		                    [
								seffectArr2[0],
		                    	parseInt(seffectScoreArr2[0])
							],
							[
								seffectArr2[1],
		                    	parseInt(seffectScoreArr2[1])
							],
							[
								seffectArr2[2],
		                    	parseInt(seffectScoreArr2[2])
							],
							[
								seffectArr2[3],
		                    	parseInt(seffectScoreArr2[3])
							],
							[
								seffectArr2[4],
		                    	parseInt(seffectScoreArr2[4])
							],
							[
								seffectArr2[5],
		                    	parseInt(seffectScoreArr2[5])
							]
		                ]
		            },
		        ]
		    }
		});//end of graph
}


//효과 선택 및 점수 -> 테이블 추가
var effectNum = [];
var effectArr = [];
var effectScoreArr = [];
var effectScoreSum = 0;
//추가 함수
function addEffect() {
	var html = "";
	var cnt = 0;
	var chk = false;
	//1번. 입력한 값이 배열에 없을 경우 and 아무것도 안들어가 있을 때
	//2번. tr에 length가 3개면 다음 tr로 이동, 총 6개까지만 가능
	var chkVal = $(".effectChoice").val();
	var effectScoreValue = $(".effectScore").val();
	var effectNumber = $(".effectNum").val();
	
	for(var i=0;i<effectArr2.length;i++) {
			if(effectArr2[i] == chkVal) {
				makeAlert("알림", "중복된 효과입니다.");
				chk = true;
			}
		}
	
	if(effectArr.length == 0 && (chkVal != "" || chkVal != null || chkVal != "undefined")){
		effectArr.push(chkVal);
		effectScoreArr.push(effectScoreValue);
		effectScoreSum += parseInt(effectScoreValue);
		effectNum.push(effectNumber);
		$(".effect_name1 td").show();
	}else if(effectArr.length > 0){
		for(var i=0;i<effectArr.length;i++) {
			 if(chkVal != effectArr[i]) {
				cnt++;
			}$()
		}
		if(cnt == effectArr.length && (chkVal != "" || chkVal != null || chkVal != "undefined")){
			effectArr.push(chkVal);
			effectScoreArr.push(effectScoreValue);
			effectScoreSum += parseInt(effectScoreValue);
			effectNum.push(effectNumber);
		}
		else{
			makeAlert("알림", "중복된 효과입니다.");
			chk = true;
		}
	}
	if(!chk && effectArr.length <= 3) {
		html += "<td no=\"" + cnt + "\" indexNum=\"" + $(".effectNum").val() + "\" class=\"effect_td_"+cnt+"\">" + effectArr[cnt] +"("+$(".effectScore").val()+")"+ "</td>";
		$(".effect_tr1").append(html);
	}else if(!chk && effectArr.length >= 4 && effectArr.length <= 6) {
		html += "<td no=\"" + cnt + "\" indexNum=\"" + $(".effectNum").val() + "\" class=\"effect_td_"+cnt+"\">" + effectArr[cnt] +"("+$(".effectScore").val()+")"+ "</td>";
		$(".effect_tr2").append(html);
	}else if(!chk && effectArr.length >= 6) {
		makeAlert("알림", "최대 6개까지만 등록 가능합니다.");
	}
	 console.log(effectScoreArr[0]);
}//END OF addEffect()

 
//기타 효과
var effectNum2 = [];
var effectArr2 = [];
var effectScoreArr2 = [];
var effectScoreSum2 = 0;
function addEffect2() {
	var html = "";
	var cnt = 0;
	var chk = false;
	var chkVal = $(".effectChoice2").val();
	var effectScoreValue2 = $(".effectScore2").val();
	var effectNumber2 = $(".effectNum2").val();
	
	for(var i=0;i<effectArr2.length;i++) {
			if(effectArr2[i] == chkVal) {
				makeAlert("알림", "중복된 효과입니다.");
				chk = true;
			}
		}
	
	if(effectArr2.length == 0 && (chkVal != "" || chkVal != null || chkVal != "undefined")) {
		effectArr2.push(chkVal);
		effectScoreArr2.push(effectScoreValue2);
		effectScoreSum2 += parseInt(effectScoreValue2);
		effectNum2.push(effectNumber2);
		$(".effect_name3 td").show();
	}else if(effectArr2.length > 0) {
		for(var i=0;i<effectArr2.length;i++) {
			if(chkVal != effectArr2[i]) {
				cnt++;
			}
		}
		if(cnt == effectArr2.length) {
			effectArr2.push(chkVal);
			effectScoreArr2.push(effectScoreValue2);
			effectScoreSum2 += parseInt(effectScoreValue2);
			effectNum2.push(effectNumber2);
		} else if(cnt != effectArr2.length){
			makeAlert("알림", "중복된 효과입니다.");
			chk = true;
		}
		
	}
	
	if(!chk && effectArr2.length <= 3) {
		html += "<td no=\"" + cnt + "\"  class=\"effect_td2_"+cnt+"\">" + effectArr2[cnt] +"("+$(".effectScore2").val()+")"+ "</td>";
		$(".effect_tr3").append(html);
	}else if(!chk && effectArr2.length >= 4 && effectArr2.length <= 6) {
		html += "<td no=\"" + cnt + "\"  class=\"effect_td2_"+cnt+"\">" + effectArr2[cnt] +"("+$(".effectScore2").val()+")"+ "</td>";
		$(".effect_tr4").append(html);
	}else if(!chk && effectArr2.length >= 6) {
		makeAlert("알림", "최대 6개까지만 등록 가능합니다.");
	}
	
}//END OF addEffect2()
//부작용
var seffectNum = [];
var seffectArr = [];
var seffectScoreArr = [];
var seffectScoreSum = 0;
function addSEffect() {
	var html = "";
	var cnt = 0;
	var chk = false;
	var chkVal2 = $(".seffectChoice").val();
	var seffectScoreValue = $(".seffectScore").val();
	var seffectNumber = $(".seffectNum").val();
	
	for(var i=0;i<seffectArr2.length;i++) {
			if(seffectArr2[i] == chkVal2) {
				makeAlert("알림", "중복된 부작용입니다.");
				chk = true;
			}
		}
	
	
	
	if(seffectArr.length == 0 && (chkVal2 != "" || chkVal2 != null || chkVal2 != "undefined")) {
		seffectArr.push(chkVal2);
		seffectScoreArr.push(seffectScoreValue);
		seffectScoreSum += parseInt(seffectScoreValue);
		seffectNum.push(seffectNumber);
		$(".effect_name2 td").show();
		
	}else if(seffectArr.length > 0) {
		for(var i=0;i<seffectArr.length;i++) {
			if(chkVal2 != seffectArr[i]) {
				cnt++;
			}
		}
		if(cnt == seffectArr.length && (chkVal2 != "" || chkVal2 != null || chkVal2 != "undefined")) {
			seffectArr.push(chkVal2);
			seffectScoreArr.push(seffectScoreValue);
			seffectScoreSum += parseInt(seffectScoreValue);
			seffectNum.push(seffectNumber);
		} else {
			makeAlert("알림", "중복된 부작용입니다.");
			chk = true;
		}
	}
	if(!chk && seffectArr.length <= 3 && (chkVal2 != "" || chkVal2 != null || chkVal2 != "undefined")) {
		
		html += "<td no=\"" + cnt + "\" indexNum=\"" + $(".seffectNum").val() + "\" class=\"seffect_td_"+cnt+"\">" + seffectArr[cnt] +"("+$(".seffectScore").val()+")"+ "</td>";
		
		$(".seffect_tr1").append(html);
	}else if(!chk && seffectArr.length >= 4 && seffectArr.length <= 6) {
		html += "<td no=\"" + cnt + "\" indexNum=\"" + $(".seffectNum").val() + "\" class=\"seffect_td_"+cnt+"\">" + seffectArr[cnt] +"("+$(".seffectScore").val()+")"+ "</td>";
		$(".seffect_tr2").append(html);
	}else if(!chk && seffectArr.length >= 6) {
		makeAlert("알림", "최대 6개까지만 등록 가능합니다.");
	}
} //END OF addSEffect()

//기타부작용
var seffectNum2 = [];
var seffectArr2 = [];
var seffectScoreArr2 = [];
var seffectScoreSum2 = 0;
function addSEffect2() {
	var html = "";
	var cnt = 0;
	var chk = false;
	var chkVal = $(".seffectChoice2").val();
	var seffectScoreValue2 = $(".seffectScore2").val();
	var seffectNumber2 = $(".seffectNum2").val();
	
	for(var i=0;i<seffectArr2.length;i++) {
			if(seffectArr[i] == chkVal) {
				makeAlert("알림", "중복된 부작용입니다.");
				chk = true;
			}
		}
	
	if(seffectArr2.length == 0 && (chkVal != "" || chkVal != null || chkVal != "undefined")) {
		seffectArr2.push(chkVal);
		seffectScoreArr2.push(seffectScoreValue2);
		seffectScoreSum2 += parseInt(seffectScoreValue2);
		seffectNum2.push(seffectNumber2);
		$(".effect_name4 td").show();
	}else if(seffectArr2.length > 0) {
		for(var i=0;i<seffectArr2.length;i++) {
			if(chkVal != seffectArr2[i]) {
				cnt++;
			}
		}
		if(cnt == seffectArr2.length && (chkVal != "" || chkVal != null || chkVal != "undefined")) {
			seffectArr2.push(chkVal);
			seffectScoreArr2.push(seffectScoreValue2);
			seffectScoreSum2 += parseInt(seffectScoreValue2);
			seffectNum2.push(seffectNumber2);
		} else {
			makeAlert("알림", "중복된 기타 부작용입니다.");
			chk = true;
		}
	}
	
	if(!chk && seffectArr2.length <= 3) {
		html += "<td no=\"" + cnt + "\" class=\"seffect_td2_"+cnt+"\">" + seffectArr2[cnt] +"("+$(".seffectScore2").val()+")"+ "</td>";
		$(".seffect_tr3").append(html);
	}else if(!chk && seffectArr2.length >= 4 && seffectArr2.length <= 6) {
		html += "<td no=\"" + cnt + "\" class=\"seffect_td2_"+cnt+"\">" + seffectArr2[cnt] +"("+$(".seffectScore2").val()+")"+ "</td>";
		$(".seffect_tr4").append(html);
	}else if(!chk && seffectArr2.length >= 6) {
		makeAlert("알림", "최대 6개까지만 등록 가능합니다.");
	}
	
}//END OF addSEffect2()


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
			//
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


//팝업창 - 효과 목록
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
