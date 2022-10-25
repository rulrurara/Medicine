
$(document).ready(function(){
	reloadList();
	reloadList2();
	reloadGraph1();//왼쪽 그래프 
	reloadGraph2();
	
	//리뷰등록 버튼 눌렀을 떄 이벤트
	$("#reviewBtn").on("click",function() {
		$("#actionForm").attr("action", "medicineInfoReviewAdd");
		$("#actionForm").submit();
	});
	
		/* 목록버튼 클릭 시 */
	$(".listBtn").on("click", function() {
		history.back();
	});
	
	
	//리뷰 목록 페이징
	$(".paging_area1").on("click", "span", function() {
		$("#page").val($(this).attr("page"));
		$(".paging_area1").css("position" , "absolute").css("bottom" , "1%");
		$(".tr_hidden").hide();
		
		$(".editor_border").hide();
		$(".paging_area2").hide();
		
		reloadList2();
	});
	//리뷰의 댓글 페이징 
	$(".paging_area2").on("click", "span", function() {
		$("#page1").val($(this).attr("page1"));
		
		reloadRepList();
	});
	
	//댓글 - 등록 버튼 클릭시
	$(".commentAddBtn").on("click", function() {
		if($.trim($(".review_comment").val()) == "") {
			makeAlert("알림", "내용을 입력해주세요.");
		}else {
			var params = $("#repForm").serialize();
			$.ajax({
				url : "reviewRepAjax/insert",
				type : "POST",
				dataType : "json",
				data : params,
				success : function(res) {
					if(res.msg == "success") {
						reloadRepList();
						
					}else if(res.msg == "failed") {
						makeAlert("알림", "뜽록에 실패하였습니다.");
					}else if(res.msg == "error") {
						makeAlert("알림", "등록 에러!");
					}
				},
				error : function(request, status, error) {
					console.log(request.responseText);
				}
				
			});
			$(".review_comment").val("");
		}
	});
	
	//클릭시 댓글 아웃라인 none처리
	$(document).on("click", ".comment_input_text", function() {
		$(".comment_input_text").css("outline", "none");
	});
	$(document).on("click", ".review_comment", function() {
		$(".review_comment").css("outline", "none");
	});
	
	//댓글 - 수정 버튼 클릭시
	$(document).on("click", ".commentUpdateBtn", function() {
		if($(this).val() == "수 정") {
			$(this).val("수정완료");
			$(this).parent().parent().children().eq(0).children().focus();
			$(this).parent().parent().children().eq(0).children().attr("readonly", false);
		} else if($(this).val() == "수정완료") {
			$(".repNum").val($(this).attr("no"));
			if($(this).parent().parent().children().eq(0).children().val() == "") {
				makeAlert("알림", "내용을 입력해주세요.");
			}else {
				$(".repCon").val($(this).parent().parent().children().eq(0).children().val());
				var params = $("#repForm").serialize();
				$.ajax({
					url : "reviewRepAjax/update",
					type : "POST",
					dataType : "json",
					data : params,
					success : function(res) {
						if(res.msg == "success") {
							
							reloadRepList();
						}else if(res.msg == "failed") {
							makeAlert("알림", "수정에 실패하였습니다.");
						}else if(res.msg == "error") {
							makeAlert("알림", "수정 에러!");
						}
					},
					error : function(request, status, error) {
						console.log(request.responseText);
					}
				});
			}
		}
	});
		
		
		
	
	//댓글 - 삭제 버튼 클릭시
	$(document).on("click", ".commentDeleteBtn", function() {
		$(".repNum").val($(this).attr("no"));
		var params = $("#repForm").serialize();
		$.ajax({
			url : "reviewRepAjax/delete",
			type : "POST",
			dataType : "json",
			data : params,
			success : function(res) {
				if(res.msg == "success") {
					reloadRepList();
				}else if(res.msg == "failed") {
					makeAlert("알림", "삭제에 실패하였습니다.");
				}else if(res.msg == "error") {
					makeAlert("알림", "삭제 에러!");
				}
			},
			error : function(request, status, error) {
				console.log(request.responseText);
			}
		});
	});
	
		/* 펼치기 버튼 클릭시 버튼 이름 변경 */
		$(document).on("click", ".reviewList .spreadBtn",function() {
			effectSum1 = 0;
			effectSum2 = 0;
			seffectSum1 = 0;
			seffectSum2 = 0;
			
			effectArrNm1 = [];
			effectArr1 = [];
			effectArrNm2 = [];
			effectArr2 = [];
			
			seffectArrNm1 = [];
			seffectArr1 = [];
			seffectArrNm2 = [];
			seffectArr2 = [];
			
			if($(this).val() =="펼 치 기") {
				console.log($(this).attr("class"));
				if($(this).attr("class") == "spreadBtn spreadBtn0") {
					$(".paging_area1").css("position" , "absolute").css("bottom" , "41%");
				}else if($(this).attr("class") == "spreadBtn spreadBtn1") {
					$(".paging_area1").css("position" , "absolute").css("bottom" , "34%");
				}else if($(this).attr("class") == "spreadBtn spreadBtn2") {
					$(".paging_area1").css("position" , "absolute").css("bottom" , "34%");
				}
			
				$(".revNum").val($(this).parent().parent().attr("no"));
				$(".revNumber").val($(this).parent().parent().attr("no"));
				$(".revCon").val($(this).parent().parent().children('.revConDiv').text());
				$(".reviewList .spreadBtn").val("펼 치 기");
				$(".reviewList .spreadBtn").css("background-color", "#6799FF");
				$(this).val("닫 기");
				$(this).css("background-color", "#8C8C8C");
				$(".tr_hidden").show();
				$(".paging_area2").show();
				$("#page1").val("1");
				reloadRepList();
				
				var params = $("#revDetailForm").serialize();
				$.ajax({
					url : "MedicineRevDetailAjax",
					type : "POST",
					dataType : "json",
					data : params,
					success : function(res) {
						console.log("res.revRepList");
						console.log(res.revRepList);
						revDetail(res.revDetailList);
						reloadRevTable(res.revDetailEffect, res.revDetailSEffect, res.revDetailEffectEtc, res.revDetailSEffectEtc);
						reloadRevGraph();
						reloadRepList();
					},
					error : function(request, status, error) {
						console.log(request.responseText);
					}
				});
				
				$(".editor_border").show();
			} 
			else if($(this).val() == "닫 기") {
				$(".paging_area1").css("position" , "absolute").css("bottom" , "1%");
				$(this).val("펼 치 기");
				$(this).css("background-color", "#6799FF");
				$(".tr_hidden").hide();
				$(".editor_border").hide();
				$(".paging_area2").hide();
				
				
			}
		});
		
});//end of document


/*                              function                                  */
//의약품 정보 상세보기
function reloadList() {
	var params = $("#actionForm").serialize();
	$.ajax({
		url : "MedicineDetailTableAjax",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			drawList(res.list);
		},
		error : function(request, status, error) {
			console.log(request.responseText);
		}
	})
}
//디테일 - 리뷰 리스트
function reloadList2() {
	var params = $("#actionRevForm").serialize();
	$.ajax({
		url : "MedicineDetailTableAjax2",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			drawList2(res.list2);
			drawPaging(res.pd);
			console.log(res.pd);
		},
		error : function(request, status, error) {
			console.log(request.responseText);
		}
	})
}
//의약품 정보 가져오기
function drawList(list) {

	var html = "";
	const effectNmArr = [];
	const seffectNmArr = [];
	let uniqueEffect = [];
	let uniqueSEffect = [];
	//효과
	for(var i=0;i<list.length;i++) {
		effectNmArr[i] = list[i].EFFECT_NM;  
	}
	//부작용
	for(var i=0;i<list.length;i++) {
		seffectNmArr[i] = list[i].SEFFECT_NM;
	}
	//효과 중복제거
	effectNmArr.forEach((element) => {
		if(!uniqueEffect.includes(element)) {
			uniqueEffect.push(element);
		}
	});
	//부작용 중복제거
	seffectNmArr.forEach((element) => {
		if(!uniqueSEffect.includes(element)) {
			uniqueSEffect.push(element);
		}
	});
					html += "<tr>";
					html += "<td rowspan=\"2\">의약품 번호</td>";
					html += "<td rowspan=\"2\">" + list[0].MEDI_NUM + "</td>";
					html += "<td>제품명</td>";
					html += "<td>" + list[0].PROD_NM + "</td>";
					if(list[0].PIC == "undefined" || list[0].PIC == null || list[0].PIC == "") {
						html += "<td rowspan=\"4\">사진 없음</td>";					
					} else {
						//html += "<td rowspan=\"4\">" + list[0].PIC + "</td>";
						html += "<td rowspan=\"4\" style=\"background-image: url('resources/upload/" + list[0].PIC+"')\"  class=\"medicineImage\"></td>";
					}
					html += "</tr>";
					html += "<tr>";
					html += "<td>제품코드</td>";
					html += "<td>" + list[0].PROD_CODE + "</td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td>업체명</td>";
					html += "<td>" + list[0].COM_NM + "</td>";
					html += "<td>성분코드</td>";
					html += "<td>" + list[0].MAT_CODE + "</td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td>제형</td>";
					html += "<td colspan=\"3\">" + list[0].SHAPE_NM + "</td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td>약효능</td>";
					html += "<td colspan=\"4\">";
					html += uniqueEffect;
					html +=  "</td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td>복용방법</td>";
					html += "<td colspan=\"4\">";
					html += list[0].TAKE_METH;
					html += "</td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td>부작용</td>";
					html += "<td colspan=\"4\">";
					html += uniqueSEffect;
					html += "</td>";
					html += "</tr>";
					
		$(".main_table thead").html(html);
		$("#prodNm").val(list[0].PROD_NM);
}
//리뷰 목록 가져오기
function drawList2(list2) {
	var cnt = 0;
	var html = "";
	for(data of list2) {
		html += "<tr no=\"" + data.REV_NUM + "\">";
		html += "<td>" + data.REV_NUM + "</td>";
		html += "<td>" + data.ID + "</td>";
		html += "<td class = \"revConDiv\" style=\"overflow:hidden;white-space:nowrap;text-overflow:ellipsis;\">" + data.CON + "</td>";
		html += "<td>" + data.REG_D + "</td>";
		html += "<td><input type=\"button\" class=\"spreadBtn spreadBtn"+cnt++ +"\" value=\"펼 치 기\" /></td>";
		html += "</tr>";
	}
	$(".board_table .reviewList").html(html);
}

//리뷰 페이징 그리기
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
		console.log("html = " + html);
	$(".paging_area1").html(html);
}//END OF drawPaging

//왼쪽 그래프 그리는 함수
function reloadGraph1() {
	var params = $("#actionForm").serialize();
	$.ajax({
		url : "MedicineSumGraphAjax1",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			Highcharts.chart('container', {
    	chart: {
        	type: 'column'
    	},
    	title: {
        	align: 'center',
        	text: '총합 상위 6개에 대한 종합점수'
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
            	text: '' //좌측 y축 글자
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
                	format: '{point.y:f}점'
            	}
        	}
    	},

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>총합 {point.y:.1f}점</b> <br/>'
    },

    series: [
        {
            name: "",
            colorByPoint: true,
            data: [
                {
                    name: "효과",
                    y : parseInt(res.leftGraphSumScore),
                    drilldown: "효과"
                },
                {
                    name: "부작용",
                      y : parseInt(res.leftGraphSumScore2),
                    drilldown: "부작용"
                },
                {
                    name: "기타 효과",
                    y : parseInt(res.leftGraphSumScore3),
                    drilldown: "기타 효과"
                },
                {
                    name: "기타 부작용",
                      y : parseInt(res.leftGraphSumScore4),
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
                      res.effectDetailNm[0],
                      parseInt(res.effectDetailScore[0])
                   ],
                   [
					  res.effectDetailNm[1],
					  parseInt(res.effectDetailScore[1])
				   ],
				    [
					  res.effectDetailNm[2],
					  parseInt(res.effectDetailScore[2])
				   ],
				    [
					  res.effectDetailNm[3],
					  parseInt(res.effectDetailScore[3])
				   ],
				    [
					  res.effectDetailNm[4],
					  parseInt(res.effectDetailScore[4])
				   ],
				    [
					  res.effectDetailNm[5],
					  parseInt(res.effectDetailScore[5])
				   ]
                   
                ]
            },
            {
                name: "부작용",
                id: "부작용",
                data: [
                    [
						res.seffectDetailNm[0],
						parseInt(res.seffectDetailScore[0])
					],
					[
						res.seffectDetailNm[1],
						parseInt(res.seffectDetailScore[1])
					],
					[
						res.seffectDetailNm[2],
						parseInt(res.seffectDetailScore[2])
					],
					[
						res.seffectDetailNm[3],
						parseInt(res.seffectDetailScore[3])
					],
					[
						res.seffectDetailNm[4],
						parseInt(res.seffectDetailScore[4])
					],
					[
						res.seffectDetailNm[5],
						parseInt(res.seffectDetailScore[5])
					],
                ]
            },
            {
                name: "기타 효과",
                id: "기타 효과",
                data: [
                    [
                      res.etceffectDetailNm[0],
                      parseInt(res.etceffectDetailScore[0])
                    ],
                    [
                      res.etceffectDetailNm[1],
                      parseInt(res.etceffectDetailScore[1])
                    ],
                    [
                      res.etceffectDetailNm[2],
                      parseInt(res.etceffectDetailScore[2])
                    ],
                    [
                      res.etceffectDetailNm[3],
                      parseInt(res.etceffectDetailScore[3])
                    ],
                    [
                      res.etceffectDetailNm[4],
                      parseInt(res.etceffectDetailScore[4])
                    ],
                    [
                      res.etceffectDetailNm[5],
                      parseInt(res.etceffectDetailScore[5])
                    ],
                ]
            },
            {
                name: "기타 부작용",
                id: "기타 부작용",
                data: [
                   [
					 res.etcseffectDetailNm[0],
					 parseInt(res.etcseffectDetailScore[0])
				   ],
				   [
					 res.etcseffectDetailNm[1],
					 parseInt(res.etcseffectDetailScore[1])
				   ],
				   [
					 res.etcseffectDetailNm[2],
					 parseInt(res.etcseffectDetailScore[2])
				   ],
				   [
					 res.etcseffectDetailNm[3],
					 parseInt(res.etcseffectDetailScore[3])
				   ],
				   [
					 res.etcseffectDetailNm[4],
					 parseInt(res.etcseffectDetailScore[4])
				   ],
				   [
					 res.etcseffectDetailNm[5],
					 parseInt(res.etcseffectDetailScore[5])
				   ],
                ]
            },
        ]
    }
});
		},
		error : function(request, status, error) {
			console.log(request.responseText);
		}
	})
}


//오른쪽 그래프 그리는 함수
function reloadGraph2() {
	var params = $("#actionForm").serialize();
	
	$.ajax({
		url : "MedicineSumGraphAjax2",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			Highcharts.chart('container2', {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: '총합 상위 12개에 대한 효과별 점수'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}점'
    },
    plotOptions: {
        packedbubble: {
            minSize: '40%',
            maxSize: '100%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                gravitationalConstant: 0.05,
                splitSeries: true,
                seriesInteraction: false,
                dragBetweenSeries: true,
                parentNodeLimit: true
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 0 //이 값보다 큰걸 그래프에 이름을 보여줌
                },
                style: {
                    color: 'black', //글씨 색
                    textOutline: 'none', 
                    fontWeight: 'bold' //글씨 두께
                }
            }
        }
    },
    series: [{
        name: '효과',
        data: [
        {
            name: res.effectDetailNm[0],
            value: parseInt(res.effectDetailScore[0])
        }, {
             name: res.effectDetailNm[1],
            value: parseInt(res.effectDetailScore[1])
        },
        {
             name: res.effectDetailNm[2],
            value: parseInt(res.effectDetailScore[2])
        },
        {
             name: res.effectDetailNm[3],
            value: parseInt(res.effectDetailScore[3])
        },
        {
             name: res.effectDetailNm[4],
            value: parseInt(res.effectDetailScore[4])
        },
        {
             name: res.effectDetailNm[5],
            value: parseInt(res.effectDetailScore[5])
        },
        {
             name: res.effectDetailNm[6],
            value: parseInt(res.effectDetailScore[6])
        },
        {
             name: res.effectDetailNm[7],
            value: parseInt(res.effectDetailScore[7])
        },
        {
             name: res.effectDetailNm[8],
            value: parseInt(res.effectDetailScore[8])
        },
        {
             name: res.effectDetailNm[9],
            value: parseInt(res.effectDetailScore[9])
        },
        {
             name: res.effectDetailNm[10],
            value: parseInt(res.effectDetailScore[10])
        },
        {
             name: res.effectDetailNm[11],
            value: parseInt(res.effectDetailScore[11])
        }
        ]
    }, 
    {
        name: '기타 효과',
        data: [
        {
            name: res.etceffectDetailNm[0],
            value: parseInt(res.etceffectDetailScore[0])
        },
        {
            name: res.etceffectDetailNm[1],
            value: parseInt(res.etceffectDetailScore[1])
        },
        {
            name: res.etceffectDetailNm[2],
            value: parseInt(res.etceffectDetailScore[2])
        },
        {
            name: res.etceffectDetailNm[3],
            value: parseInt(res.etceffectDetailScore[3])
        },
        {
            name: res.etceffectDetailNm[4],
            value: parseInt(res.etceffectDetailScore[4])
        },
        {
            name: res.etceffectDetailNm[5],
            value: parseInt(res.etceffectDetailScore[5])
        },
        {
            name: res.etceffectDetailNm[6],
            value: parseInt(res.etceffectDetailScore[6])
        },
        {
            name: res.etceffectDetailNm[7],
            value: parseInt(res.etceffectDetailScore[7])
        },
        {
            name: res.etceffectDetailNm[8],
            value: parseInt(res.etceffectDetailScore[8])
        },
        {
            name: res.etceffectDetailNm[9],
            value: parseInt(res.etceffectDetailScore[9])
        },
        {
            name: res.etceffectDetailNm[10],
            value: parseInt(res.etceffectDetailScore[10])
        },
        {
            name: res.etceffectDetailNm[11],
            value: parseInt(res.etceffectDetailScore[11])
        }
        ]
    }, {
        name: '부작용',
        data: [
		{
            name: res.seffectDetailNm[0],
            value: parseInt(res.seffectDetailScore[0])
        },
        {
            name: res.seffectDetailNm[1],
            value: parseInt(res.seffectDetailScore[1])
        },
        {
            name: res.seffectDetailNm[2],
            value: parseInt(res.seffectDetailScore[2])
        },
        {
            name: res.seffectDetailNm[3],
            value: parseInt(res.seffectDetailScore[3])
        },
        {
            name: res.seffectDetailNm[4],
            value: parseInt(res.seffectDetailScore[4])
        },
        {
            name: res.seffectDetailNm[5],
            value: parseInt(res.seffectDetailScore[5])
        },
        {
            name: res.seffectDetailNm[6],
            value: parseInt(res.seffectDetailScore[6])
        },
        {
            name: res.seffectDetailNm[7],
            value: parseInt(res.seffectDetailScore[7])
        },
        {
            name: res.seffectDetailNm[8],
            value: parseInt(res.seffectDetailScore[8])
        },
        {
            name: res.seffectDetailNm[9],
            value: parseInt(res.seffectDetailScore[9])
        },
        {
            name: res.seffectDetailNm[10],
            value: parseInt(res.seffectDetailScore[10])
        },
        {
            name: res.seffectDetailNm[11],
            value: parseInt(res.seffectDetailScore[11])
        },
		]
    }, {
        name: '기타 부작용',
        data: [
		{
           name: res.etcseffectDetailNm[0],
            value: parseInt(res.etcseffectDetailScore[0])
        },
		{
           name: res.etcseffectDetailNm[1],
            value: parseInt(res.etcseffectDetailScore[1])
        },
        {
           name: res.etcseffectDetailNm[2],
            value: parseInt(res.etcseffectDetailScore[2])
        },
        {
           name: res.etcseffectDetailNm[3],
            value: parseInt(res.etcseffectDetailScore[3])
        },
        {
           name: res.etcseffectDetailNm[4],
            value: parseInt(res.etcseffectDetailScore[4])
        },
        {
           name: res.etcseffectDetailNm[5],
            value: parseInt(res.etcseffectDetailScore[5])
        },
        {
           name: res.etcseffectDetailNm[6],
            value: parseInt(res.etcseffectDetailScore[6])
        },
        {
           name: res.etcseffectDetailNm[7],
            value: parseInt(res.etcseffectDetailScore[7])
        },
        {
           name: res.etcseffectDetailNm[8],
            value: parseInt(res.etcseffectDetailScore[8])
        },
        {
           name: res.etcseffectDetailNm[9],
            value: parseInt(res.etcseffectDetailScore[9])
        },
        {
           name: res.etcseffectDetailNm[10],
            value: parseInt(res.etcseffectDetailScore[10])
        },
        {
           name: res.etcseffectDetailNm[11],
            value: parseInt(res.etcseffectDetailScore[11])
        }
        ]
    }]
});
		},
		error : function(request, status, error) {
			console.log(request.responseText);
		}
	})
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//리뷰 상세보기 + 댓글
function revDetail(revDetailList) {
	console.log("asdsadsad = " + revDetailList);
	var html = "";
	html += "<textarea rows=\"10\" cols=\"30\" class=\"con\" readonly=\"readonly\">" + $(".revCon").val() +"</textarea>";
	$(".editor_border").html(html);
	
}


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


function reloadRevTable(revDetailEffect, revDetailSEffect, revDetailEffectEtc, revDetailSEffectEtc) {
	var html = "";
	
	var effect1 = "";
	var seffect1 = "";
	
	var effect2 = "";
	var seffect2 = "";
	
	//효과
		html += "<tr class=\"effect_First\">";
		html += "<td>효과</td>";
		html += "</tr>";
		
	
	for(data of revDetailEffect) {
		effectArr1.push(data.SCORE);
		effectArrNm1.push(data.EFFECT_NM);
		effectSum1 += data.SCORE;
		effect1 += "<td>" + data.EFFECT_NM+"(" + data.SCORE + ")" + "</td>";
	}
	//부작용
		html += "<tr class=\"seffect_First\">";
		html += "<td>부작용</td>";
		html += "</tr>";
	
	for(data of revDetailSEffect) {
		seffectArr1.push(data.SCORE);
		seffectArrNm1.push(data.SEFFECT_NM);
		seffectSum1 += data.SCORE;
		seffect1 += "<td>" + data.SEFFECT_NM+"(" + data.SCORE + ")" + "</td>";
	}
	//기타 효과
		html += "<tr class=\"effect_Second\">";
		html += "<td>기타 효과</td>";
		html += "</tr>";
		
	for(data of revDetailEffectEtc) {
		effectArr2.push(data.SCORE);
		effectArrNm2.push(data.EFFECT_NM);
		effectSum2 += data.SCORE;
		effect2 += "<td>" + data.EFFECT_NM+"(" + data.SCORE + ")" + "</td>";
	}	
	//기타 부작용
		html += "<tr class=\"seffect_Second\">";
		html += "<td>기타 부작용</td>";
		html += "</tr>";
	
	for(data of revDetailSEffectEtc) {
		seffectArr2.push(data.SCORE);
		seffectArrNm2.push(data.SEFFECT_NM);
		seffectSum2 += data.SCORE;
		seffect2 += "<td>" + data.SEFFECT_NM+"(" + data.SCORE + ")" + "</td>";
	}
	
	$(".detail_border tbody").html(html);
	$(".effect_First").append(effect1);
	$(".seffect_First").append(seffect1);
	$(".effect_Second").append(effect2);
	$(".seffect_Second").append(seffect2);
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

function reloadRepList() {
	var params = $("#repForm").serialize();
	$.ajax({
		url : "reviewRepListAjax",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			reloadRep(res.revRepList);
			drawPaging2(res.pd2);
		},
		error : function(request, status, error) {
			console.log(request.responseText);
		}
	});
}

//리뷰 댓글 그리기
function reloadRep(revRepList) {
	var html = "";	
	var sub = "";
	for(data of revRepList) {
             
		html += "<tr no=\"" + data.REP_NUM+ "\">";
		html += "<td style=\"width: 200px\">작성자 : " + data.ID + "</td>";
		html += "<td></td>";
		html += "<td></td>";
		html += "<td></td>";
		html += "<td></td>";
		html += "<td class=\"revRegday\">작성일 : " + data.REG_D +  "</td>";
		html += "</tr>";
		html += "<tr>";
		html += "<td colspan=\"6\">";
		html += "<input type=\"text\" class=\"comment_input_text\" name=\"comment_input_text\" maxlength=\"200\" readonly=\"readonly\" value=\"" +data.CON + "\" />";
		html += "</td>";
		html += "<td>";
		//로그인한 사람과 작성자가 같을때
		if(data.MEM_NUM == $("#memNum").val()) {
			html += "<input type=\"button\" id=\"commentDeleteBtn\" class=\"commentDeleteBtn\" value=\"삭 제\" no=\"" + data.REP_NUM+ "\"/>";
			html += "<input type=\"button\" id=\"commentUpdateBtn\" class=\"commentUpdateBtn\" value=\"수 정\" no=\"" + data.REP_NUM+ "\"/>";
			html += "<input type=\"button\" id=\"commentUpdateConfirmBtn\" class=\"commentUpdateConfirmBtn\" value=\"수정완료\" no=\"" + data.REP_NUM+ "\" style=\"display:none\" />";
		}
		html += "</td>";
		html += "</tr>";
	}
	$(".repTable tbody").html(html);
	
}

//리뷰 댓글의 페이징
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