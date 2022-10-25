$(document).ready(function() {
			      // 팝업
			      $("#searchimg").on("click",function() {
						if ($(".poPup_serch").css("display") == "block") {
							$(".poPup_serch").hide();
						} else if ($(".poPup_serch").css("display") == "none") {
							$(".poPup_serch").show();
						}
					});
			      $("#searchimg1").on("click",function() {
						if ($(".poPup_serch1").css("display") == "block") {
							$(".poPup_serch1").hide();
						} else if ($(".poPup_serch1").css("display") == "none") {
							$(".poPup_serch1").show();
						}
					});
					$("#searchimg2").on("click",function() {
						if ($(".poPup_serch2").css("display") == "block") {
							$(".poPup_serch2").hide();
						} else if ($(".poPup_serch2").css("display") == "none") {
							$(".poPup_serch2").show();
						}
					});
		$(".paging_area").on("click","span",function(){
		
		$("#popForm4 #page").val($(this).attr("page"));
			
		reloadList();
	});
	$("#searchimg").on("click",function(){
		$("#effe").val("");
	});
		$("#searchimg2").on("click",function(){
		$("#seffe").val("");
	});
	$(".popccc").on("click","#efnum",function(){
	      var arr = [];
	      var effe= [];
	      $("#efnum:checked").each(function(){
	         arr.push($(this).val());
	         effe.push($(this).attr("num"));
	      })
	      
	      $("#num").val(arr);
	      $("#effe").val(effe);
	      
	   });
	   $(".popc2").on("click","#sefnum",function(){
	      var arr = [];
	      var num= [];
	      $("#sefnum:checked").each(function(){
	         arr.push($(this).val());
	         num.push($(this).attr("num3"));
	      })
	      
	      $("#num3").val(arr);
	      $("#seffe").val(num);
	      
	   });
	   
	    $(".eYes").on("click", function(){
			$(".poPup1").hide();
			$(".poPup_serch").hide();
			$(".poPup_serch1").hide();
			$(".poPup_serch2").hide();		
		});
		  $(".fYes").on("click", function(){
			$(".poPup6").hide();
			$(".poPup_serch2").hide();		
		});
		 $(".aYes").on("click", function(){
			$(".poPup3").hide();
			$(".poPup_serch2").hide();		
		});		
		 $(".dYes").on("click", function(){
			$(".poPup2").hide();
			$(".poPup_serch").hide();		
		});						
	
});
	// div 나타내기
$(function() {
  $('#btn1').click( function() {
    if( $(this).html() == '약효능 데이터 추가' ) {
      $(this).html('약효능 숨기기');
      $("#noneDiv").show();
    }
    else {
      $(this).html('약효능 데이터 추가');
      $("#noneDiv").hide();	
    }
  });
});

$(function() {
  $('#btn2').click( function() {
    if( $(this).html() == '제형 데이터 추가' ) {
      $(this).html('제형 숨기기');
      $("#noneDiv2").show();
    }
    else {
      $(this).html('제형 데이터 추가');
      $("#noneDiv2").hide();	
    }
  });
});

$(function() {
	  $('#btn3').click( function() {
	    if( $(this).html() == '복용방법 데이터 추가' ) {
	      $(this).html('복용방법 숨기기');
	      $("#noneDiv1").show();
	    }
	    else {
	      $(this).html('복용방법 데이터 추가');
	      $("#noneDiv1").hide();	
	    }
	  });
	});
	
$(function() {
	  $('#btn4').click( function() {
	    if( $(this).html() == '부작용 데이터 추가' ) {
	      $(this).html('부작용 숨기기');
	      $("#noneDiv4").show();
	    }
	    else {
	      $(this).html('부작용 데이터 추가');
	      $("#noneDiv4").hide();	
	    }
	  });
	});

	// 행 추가
function insertTr(){

 var insertTr = "";
   insertTr += "<tr>";
   insertTr += "<td><input type=\"text\" class=\"text\" placeholder=\"내용을 입력하세요.\" /></td>";
   insertTr += "</tr>";
     
   $("#memDiv").append(insertTr);

}
	
function insertTr1(){

 var insertTr = "";
   
   insertTr += "<tr>";
   insertTr += "<td><input type=\"text\" class=\"text\" placeholder=\"내용을 입력하세요.\" /></td>";
   insertTr += "</tr>";
     
   $("#memDiv1").append(insertTr);

}

function insertTr2(){

	var insertTr = "";
      insertTr += "<tr>";
      insertTr += "<td><input type=\"file\" style=\"width:304px\"/>";
      insertTr += "<td><input type=\"text\" class=\"text\" placeholder=\"내용을 입력하세요.\" /></td>";
      insertTr += "</tr>";
	     
	   $("#memDiv2").append(insertTr);

	}
	
function insertTr4(){

	 var insertTr = "";
	   insertTr += "<tr>";
	   insertTr += "<td><input type=\"text\" class=\"text\" placeholder=\"내용을 입력하세요.\" /></td>";
	   insertTr += "</tr>";
	     
	   $("#memDiv4").append(insertTr);

	}
// 행 삭제

		window.onload=()=>{
    	document.getElementById("delBtn").addEventListener("click", fnDel);
    	document.getElementById("delBtn1").addEventListener("click", fnuDel);
    	document.getElementById("delBtn2").addEventListener("click", funDel);
    	document.getElementById("delBtn4").addEventListener("click", funDel1);
}

function fnDel(){
    var body = document.getElementById("memDiv");
    if (body.rows.length>1)
        body.deleteRow(body.rows.length-1);
    else
        alert('더 이상 삭제 불가');
}

function fnuDel(){
    var tbody = document.getElementById("memDiv1");
    if (tbody.rows.length>1)
        tbody.deleteRow(tbody.rows.length-1);
    else
        alert('더 이상 삭제 불가');
}

function funDel(){
    var ttbody = document.getElementById("memDiv2");
    if (ttbody.rows.length>1)
        ttbody.deleteRow(ttbody.rows.length-1);
    else
        alert('더 이상 삭제 불가');
}
function funDel1(){
    var tttbody = document.getElementById("memDiv4");
    if (tttbody.rows.length>1)
        tttbody.deleteRow(tttbody.rows.length-1);
    else
        alert('더 이상 삭제 불가');
}
function reloadList(){
	var params = $("#popForm4").serialize();
	$.ajax({
	      url : "MedicineSelectList", 
	      type : "POST", 
	      dataType : "json", 
	      data : params, 
	      success : function(res) {
	    	  efList(res.efList);
	    	  sefList(res.sefList);
	    	  drawPaging(res.pd);
	    	  drawPaging2(res.sefpd);
	      },
	      error : function(request, status, error){ 
	         console.log(request.responseText); 
	      } 
	   });
}

function efList(efList){
	var html = "";
	for(var data of efList) {
	html += "<tr efnum = \"" + data.EFFECT_NUM + "\">";
	html += "<td class =\"pop3\">";
	html += "<input type=\"checkbox\" id=\"efnum\" num =\""+data.EFFECT_NM +"\"  value=\""+ data.EFFECT_NUM + "\">";
	html += "</td>";
	html += "<td class =\"pop1\">" + data.EFFECT_NM + "</td>";
	html += "</tr>";	
	}
	$(".popccc").html(html);
}
function sefList(sefList){
	var html = "";
	for(var data of sefList) {
	html += "<tr sefnum = \"" + data.SEFFECT_NUM + "\">";
	html += "<td class =\"pop3\">";
	html += "<input type=\"checkbox\" id=\"sefnum\" num3 =\""+data.SEFFECT_NM +"\"  value=\""+ data.SEFFECT_NUM + "\">";
	html += "</td>";
	html += "<td class =\"pop1\">" + data.SEFFECT_NM + "</td>";
	html += "</tr>";	
	}
	$(".popc2").html(html);
}

function drawPaging(pd){
	var html = "";
	
	  html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	  // 이전 구현
	  if($("#popForm4 #page").val() == "1"){
		  html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	  }
	  else {
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#popForm4 #page").val() * 1 - 1)+ "\">이전</span>";
	  }
	  for(var i = pd.startP; i <= pd.endP; i++){
		  if($("#popForm4 #page").val() * 1 == i){ // 현재 페이지 구현
			html += "<span class=\"page_btn_on\" page=\"" + i + "\">" + i + "</span>";
		  }
		  else{ // 다른 페이지 구현
	  		html += "<span class=\"page_btn\" page=\"" + i + "\">" + i + "</span>";
		  }
	  }
	  if($("#popForm4 #page").val() * 1 == pd.maxP){ // 현재 페이지가 마지막 페이지라면,, 구현
	  	html += "<span class=\"page_btn page_next\" page=\"" + pd.maxP + "\">다음</span>"; 
	  }
	  else{
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#popForm4 #page").val() * 1 + 1) + "\">다음</span>";
	  }
	  html += "<span class=\"page_btn page_last\" page=\"" + pd.maxP + "\">마지막</span>";
	$(".paging_area").html(html);
}
function drawPaging2(sefpd){
	var html = "";
	
	  html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	  // 이전 구현
	  if($("#popForm2 #page").val() == "1"){
		  html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	  }
	  else {
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#popForm2 #page").val() * 1 - 1)+ "\">이전</span>";
	  }
	  for(var i = sefpd.startP; i <= sefpd.endP; i++){
		  if($("#popForm2 #page").val() * 1 == i){ // 현재 페이지 구현
			html += "<span class=\"page_btn_on\" page=\"" + i + "\">" + i + "</span>";
		  }
		  else{ // 다른 페이지 구현
	  		html += "<span class=\"page_btn\" page=\"" + i + "\">" + i + "</span>";
		  }
	  }
	  if($("#popForm2 #page").val() * 1 == sefpd.maxP){ // 현재 페이지가 마지막 페이지라면,, 구현
	  	html += "<span class=\"page_btn page_next\" page=\"" + sefpd.maxP + "\">다음</span>"; 
	  }
	  else{
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#popForm2 #page").val() * 1 + 1) + "\">다음</span>";
	  }
	  html += "<span class=\"page_btn page_last\" page=\"" + sefpd.maxP + "\">마지막</span>";
	$(".paging_area").html(html);
}