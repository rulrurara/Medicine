$(document).ready(function(){
	$(".searchTxt").val($("#oldTxt").val());
	
	if($("#oldGbn").val() === "undefined" || $("#oldGbn").val() === "") {
		$(".select_border").val("1");
	}else {
		$(".select_border").val($("#oldGbn").val());
	}
	reloadList();
	
	//클릭 시 디테일 - 수정
	$("tbody").on("click","tr",function() {
		$("#no").val($(this).attr("no"));
		$("#actionForm").attr("action", "medicineInfoDetail");
		$("#actionForm").submit();
	});
	/* 목록버튼 클릭 시 */
	$(".listBtn").on("click", function() {
		history.back();
	});
	//페이징 클릭시
	$(".paging_area").on("click", "span", function() {
		$("#page").val($(this).attr("page"));
		reloadList();
	});
	//검색버튼 클릭시
	 $(".medicineSearchBtn").on("click", function() {
		reloadList();
	});
	
});//end of document	
	
	/* --------------------- function --------------------- */
//테이블에 데이터 가져오기
function drawList(list) {
	var html = "";
	for(data of list) {
		if(data.MD === "ODD"){
			html += "<tr no=\"" + data.MEDI_NUM + "\">";
			html += "<td>" + data.MEDI_NUM + "</td>";
			html += "<td>";
			if(data.PIC == null) {
				html += "<img src=\"resources/upload/이미지없음.png\" style=\"width=\"100px;\" height=\"100px;\"></img>";		
			} else {
				html += "<img src=\"resources/upload/" + data.PIC + "\" style=\"width=\"100px;\" height=\"100px;\"></img>";				
			}
			html += "</td>";
			html += "<td>" + data.PROD_NM + "</td>";
			html += "<td>" + data.MAT_NM + "</td>";
			html += "<td>" + data.COM_NM + "</td>";
			html += "</tr>";
		}
	}
	$(".main_table_left tbody").html(html);
	
	var html2 = "";
	for(data of list) {
		if(data.MD === "EVEN") {
			html2 += "<tr no=\"" + data.MEDI_NUM + "\">";
			html2 += "<td>" + data.MEDI_NUM + "</td>";
			html2 += "<td>";
			
			if(data.PIC == null) {
				html2 += "<img src=\"resources/upload/이미지없음.png\" style=\"width=\"100px;\" height=\"100px;\"></img>";		
				//html2 += "<td no = \"" + data.MEDI_NUM + "\">" + "<img class=\"img\" style=\"width: 100px; height: 100px;\" src=\"resources/upload/이미지없음.png\"></td>";
			} else {
				html2 += "<img src=\"resources/upload/" + data.PIC + "\" style=\"width=\"100px;\" height=\"100px;\"></img>";				
			}
			
			html2 += "</td>";
			html2 += "<td>" + data.PROD_NM + "</td>";
			html2 += "<td>" + data.MAT_NM + "</td>";
			html2 += "<td>" + data.COM_NM + "</td>";
			html2 += "</tr>";
		}
	}
	$(".main_table_right tbody").html(html2);
	
}//end of drawList

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
}

function reloadList() {
	var params = $("#actionForm").serialize();
	console.log("params = " + params);
	$.ajax({
		url : "MedicineListAjax",
		type : "POST",
		dataType : "json",
		data : params,
		success : function(res) {
			//console.log(res);
			drawList(res.list);
			drawPaging(res.pd);
		},
		error : function(request, status, error) {
			console.log(request.responseText);
		}
	});
}//end of reloadList

