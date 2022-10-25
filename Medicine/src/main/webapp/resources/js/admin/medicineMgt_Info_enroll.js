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
		$("#page").val($(this).attr("page"));

		$("#searchGbn").val($("#oldGbn").val());
		$("#searchText").val($("#oldText").val());
		
		reloadList();
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
      insertTr += "<td colspan=\"2\"><input type=\"text\" class=\"text\" id=\"shapen\" name=\"shapen\" placeholder=\"내용을 입력하세요.\" /></td>";
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
       document.getElementById("delBtn2").addEventListener("click", funDel1);
       document.getElementById("delBtn4").addEventListener("click", funDel);
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

function funDel1(){
    var ttbody = document.getElementById("memDiv2");
    if (ttbody.rows.length>1)
        ttbody.deleteRow(ttbody.rows.length-1);
    else
        alert('더 이상 삭제 불가');
}
function funDel(){
    var tttbody = document.getElementById("memDiv4");
    if (tttbody.rows.length>1)
        tttbody.deleteRow(tttbody.rows.length-1);
    else
        alert('더 이상 삭제 불가');
}

$(document).ready(function(){
	$("#fihi").on("click",function(){
		$("#fix").click();
	});
	$("#fix").on("change",function(event){
		
		var file = event.target.files[0];

	    var reader = new FileReader();
	    
	    reader.onload = function(e) {

	    	$("#imgch").attr("src", e.target.result);
	    }
	    reader.readAsDataURL(file);
	});
	 $("#comnum").on("click",function(){
		$(".poPup_serch3").show();
	});
	 $(".maindel").on("click",function() {
         if ($(".poPup1").css("display") == "block") {
            $(".poPup1").hide();
         } else if ($(".poPup1").css("display") == "none") {
            $(".poPup1").show();
         }
      });
	 $(".mainreg").on("click",function(){
		 if ($(".poPup4").css("display") == "block") {
             $(".poPup4").hide();
          } else if ($(".poPup4").css("display") == "none") {
             $(".poPup4").show();
          }
       });
	 $(".regmeef").on("click",function() {
         if ($(".poPup5").css("display") == "block") {
            $(".poPup5").hide();
         } else if ($(".poPup5").css("display") == "none") {
            $(".poPup5").show();
         }
      });
	 $(".regmesef").on("click",function() {
         if ($(".poPup6").css("display") == "block") {
            $(".poPup6").hide();
         } else if ($(".poPup6").css("display") == "none") {
            $(".poPup6").show();
         }
      });
      $(".regtake").on("click",function() {
         if ($(".poPup7").css("display") == "block") {
            $(".poPup7").hide();
         } else if ($(".poPup7").css("display") == "none") {
            $(".poPup7").show();
         }
      });
	$(".regpl").on("click",function() {
        if ($(".poPup2").css("display") == "block") {
           $(".poPup2").hide();
          
        } else if ($(".poPup2").css("display") == "none") {
           $(".poPup2").show();
        }
     });
	$(".popccc").on("click","#medinum",function(){
	      var arr = [];
	      var numm= [];
	      $("#medinum:checked").each(function(){
	         arr.push($(this).val());
	         numm.push($(this).attr("num"));
	      })
	      
	      $("#num").val(arr);
	      $("#numm").val(numm);
	      
	   });
	
	$(".popc1").on("click","#menum",function(){
	      var arr = [];
	      var numm= [];
	      $("#menum:checked").each(function(){
	         arr.push($(this).val());
	         numm.push($(this).attr("num2"));
	      })
	      
	      $("#num2").val(arr);
	      $("#menumm").val(numm);
	      
	   });
	$(".popc2").on("click","#senum",function(){
	      var arr = [];
	      var numm= [];
	      $("#senum:checked").each(function(){
	         arr.push($(this).val());
	         numm.push($(this).attr("num3"));
	      })
	      
	      $("#num3").val(arr);
	      $("#seffnum").val(numm);
	      
	   });
	   $(".popc4").on("click","#comnums",function(){
	      var arr = [];
	      var numm= [];
	      $("#comnums:checked").each(function(){
	         arr.push($(this).val());
	         numm.push($(this).attr("num4"));
	      })
	      
	      $("#num4").val(arr);
	      $("#comnum").val(numm);
	      
	   });
	$(".bYes").on("click",function(){
		$("#backForm").submit();
	});
	$(".wYes").on("click", function(){
		$(".poPup").hide();
		$(".poPup_serch").hide();
		$(".poPup_serch1").hide();
		$(".poPup_serch2").hide();
		$(".poPup_serch3").hide();
		$("#noneDiv").hide();
		$("#noneDiv2").hide();
		$("#noneDiv3").hide();
		$("#noneDiv4").hide();
		$("#btn2").html('제형 데이터 추가');
		$("#btn1").html('약효능 데이터 추가');
		$("#btn4").html('부작용 데이터 추가');
	});
	$(".cYes").on("click", function(){
		$(".poPup2").hide();
		$(".poPup_serch").hide();
		$(".poPup_serch1").hide();
		$(".poPup_serch2").hide();
		$(".poPup_serch3").hide();
	});
	
	reloadList();
	/* $(".Yes").on("click",function() {
		// history.back();
		$("#backForm").submit();
	}); */	
	$(".dYes").on("click", function(){
		var form =$("#actionForm");
	    	  // ajaxForm 적용
	    	  form.ajaxForm({
	    		  success: function(res){ // 데이터 주고 받기 성공 시
	    			if(res.result == "SUCCESS"){ // 파일 전송 성공
	    				// 올라간 파일이 존재한다면
	    				if(res.fileName.length > 0){
	    					$("#pic").val(res.fileName[0]); // 올라간 파일명 보관
	    				}
		 var params = $("#actionForm").serialize();
         $.ajax({
        	 url : "MedicineAction/insert",
        	 type : "POST",
        	 dateType : "json",
        	 data : params,
        	 success : function(res){
        		 switch (res.msg) {
				case "success":
					location.href = "Medicine";
					break;
				case "failed":
					makeAlert("알림","등록에 실패했습니다.");
					break;
				case "error" :
					makeAlert("알림","등록 중 문제가 발생했습니다.");
					break;
				}
        	 },
        	 error : function(request, status , error){
        		 console.log(request.responseText);
        	 }
         });
		}
		else{
			makeAlert("알림","파일 업로드에 <br /> 문제가 발생했습니다.");
		}
	},
			error: function(){ // 에러 시
	    		makeAlert("알림","파일 업로드에 <br /> 문제가 발생하였습니다.");
	    		 }
	    	});
	    	form.submit();
	});

	$(".aYes").on("click", function(){
		// actionForm 폼에있는 값을 키와 값으로 변경
		var params = $("#actionForm").serialize();
        $.ajax({
       	 url : "MedicineAction/insert2",
       	 type : "POST",
       	 dateType : "json",
       	 // 무조건 hashmap으로 보냄
       	 data : params,
       	 success : function(res){
       		 switch (res.msg) {
				case "success":
					$(".poPup3").hide();
					$("#noneDiv2").hide();
					$("#btn2").html('제형 데이터 추가');
					break;
				case "failed":
					makeAlert("알림","등록에 실패했습니다.");
					break;
				case "error" :
					makeAlert("알림","등록 중 문제가 발생했습니다.");
					break;
				}
       	 },
       	 error : function(request, status , error){
       		 console.log(request.responseText);
       	 }
        })

	});
	$(".eYes").on("click", function(){
		var params = $("#actionForm").serialize();
        $.ajax({
       	 url : "MedicineAction/insert3",
       	 type : "POST",
       	 dateType : "json",
       	 data : params,
       	 success : function(res){
       		 switch (res.msg) {
				case "success":
					$(".poPup5").hide();
					$("#noneDiv").hide();
					$("#btn1").html('약효능 데이터 추가');
					break;
				case "failed":
					makeAlert("알림","등록에 실패했습니다.");
					break;
				case "error" :
					makeAlert("알림","등록 중 문제가 발생했습니다.");
					break;
				}
       	 },
       	 error : function(request, status , error){
       		 console.log(request.responseText);
       	 }
        })
	});
	$(".fYes").on("click", function(){
		var params = $("#actionForm").serialize();
        $.ajax({
       	 url : "MedicineAction/insert4",
       	 type : "POST",
       	 dateType : "json",
       	 data : params,
       	 success : function(res){
       		 switch (res.msg) {
				case "success":
					$(".poPup6").hide();
					$("#noneDiv4").hide();
					$("#btn4").html('부작용 데이터 추가');
					break;
				case "failed":
					makeAlert("알림","등록에 실패했습니다.");
					break;
				case "error" :
					makeAlert("알림","등록 중 문제가 발생했습니다.");
					break;
				}
       	 },
       	 error : function(request, status , error){
       		 console.log(request.responseText);
       	 }
        }); 
	});
	$(".gYes").on("click", function(){
		var params = $("#actionForm").serialize();
        $.ajax({
       	 url : "MedicineAction/takeinsert",
       	 type : "POST",
       	 dateType : "json",
       	 data : params,
       	 success : function(res){
       		 switch (res.msg) {
				case "success":
					$(".poPup7").hide();
					$("#noneDiv1").hide();
					$("#btn3").html('복용방법 데이터 추가');
					break;
				case "failed":
					makeAlert("알림","등록에 실패했습니다.");
					break;
				case "error" :
					makeAlert("알림","등록 중 문제가 발생했습니다.");
					break;
				}
       	 },
       	 error : function(request, status , error){
       		 console.log(request.responseText);
       	 }
        })

	});
});
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
function drawPaging2(sefpd){
	var html = "";
	
	  html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	  // 이전 구현
	  if($("#page").val() == "1"){
		  html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	  }
	  else {
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 - 1)+ "\">이전</span>";
	  }
	  for(var i = sefpd.startP; i <= sefpd.endP; i++){
		  if($("#page").val() * 1 == i){ // 현재 페이지 구현
			html += "<span class=\"page_btn_on\" page=\"" + i + "\">" + i + "</span>";
		  }
		  else{ // 다른 페이지 구현
	  		html += "<span class=\"page_btn\" page=\"" + i + "\">" + i + "</span>";
		  }
	  }
	  if($("#page").val() * 1 == sefpd.maxP){ // 현재 페이지가 마지막 페이지라면,, 구현
	  	html += "<span class=\"page_btn page_next\" page=\"" + sefpd.maxP + "\">다음</span>"; 
	  }
	  else{
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 + 1) + "\">다음</span>";
	  }
	  html += "<span class=\"page_btn page_last\" page=\"" + sefpd.maxP + "\">마지막</span>";
	$(".paging_area").html(html);
}
function drawPaging3(compd){
	var html = "";
	
	  html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	  // 이전 구현
	  if($("#page").val() == "1"){
		  html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	  }
	  else {
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 - 1)+ "\">이전</span>";
	  }
	  for(var i = compd.startP; i <= compd.endP; i++){
		  if($("#page").val() * 1 == i){ // 현재 페이지 구현
			html += "<span class=\"page_btn_on\" page=\"" + i + "\">" + i + "</span>";
		  }
		  else{ // 다른 페이지 구현
	  		html += "<span class=\"page_btn\" page=\"" + i + "\">" + i + "</span>";
		  }
	  }
	  if($("#page").val() * 1 == compd.maxP){ // 현재 페이지가 마지막 페이지라면,, 구현
	  	html += "<span class=\"page_btn page_next\" page=\"" + compd.maxP + "\">다음</span>"; 
	  }
	  else{
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 + 1) + "\">다음</span>";
	  }
	  html += "<span class=\"page_btn page_last\" page=\"" + compd.maxP + "\">마지막</span>";
	$(".paging_area").html(html);
}
function reloadList(){
	var params = $("#popForm").serialize();
	$.ajax({
	      url : "MedicineSelectList", 
	      type : "POST", 
	      dataType : "json", 
	      data : params, 
	      success : function(res) {
	    	  drawList(res.selec);
	    	  drawList2(res.select);
	    	  drawList3(res.select2);
	    	  selectList(res.selList);
	    	  comList(res.comList);
	    	  drawPaging(res.pd);
	    	  drawPaging2(res.sefpd);
	    	  drawPaging3(res.compd);
	      },
	      error : function(request, status, error){ 
	         console.log(request.responseText); 
	      } 
	   });
}
function comList(comList){
	var html = "";
	for(var data of comList) {
	html += "<tr comnums = \"" + data.COM_NUM + "\">";
	html += "<td class =\"pop3\">";
	html += "<input type=\"radio\" name=\"radio\" id=\"comnums\" num4 =\""+data.COM_NM +"\"  value=\""+ data.COM_NUM + "\">";
	html += "</td>";
	html += "<td class =\"pop1\">" + data.COM_NM + "</td>";
	html += "</tr>";	
	}
	$(".popc4").html(html);
}
function selectList(selList){
	var html = "";
	
	html += "<th>제형</th>";
	html += "<td colspan=\"3\">";
	html += "<select id=\"select\" name=\"shap\" >";
	for(var data of selList){
	html +=	"<option value=\""+ data.SHAPE_NUM + "\">"+ data.SHAPE_NM +"</option>";
	}
	html += "</select>";
	html += "</td>";
	$(".shape").html(html);
}
function drawList(selec){
	var html = "";
	for(var data of selec) {
	html += "<tr medinum = \"" + data.EFFECT_NUM + "\">";
	html += "<td class =\"pop3\">";
	html += "<input type=\"checkbox\" id=\"medinum\" num =\""+data.EFFECT_NM +"\"  value=\""+ data.EFFECT_NUM + "\">";
	html += "</td>";
	html += "<td class =\"pop1\">" + data.EFFECT_NM + "</td>";
	html += "</tr>";	
	}
	$(".popccc").html(html);
}

function drawList2(select){
	var html = "";
	for(var data of select) {
	html += "<tr menum = \"" + data.TAKE_METH_NUM + "\">";
	html += "<td class =\"pop3\">";
	html += "<input type=\"radio\" name=\"radio\" id=\"menum\" num2=\""+data.TAKE_METH+"\" value=\""+ data.TAKE_METH_NUM + "\">";
	html += "</td>";
	html += "<td class =\"pop1\">" + data.TAKE_METH + "</td>";
	html += "</tr>";	
	}
	$(".popc1").html(html);
}
function drawList3(select2){
	var html = "";
	for(var data of select2) {
	html += "<tr senum = \"" + data.SEFFECT_NUM + "\">";
	html += "<td class =\"pop3\">";
	html += "<input type=\"checkbox\" id=\"senum\" num3=\""+data.SEFFECT_NM+"\" value=\""+ data.SEFFECT_NUM + "\">";
	html += "</td>";
	html += "<td class =\"pop1\">" + data.SEFFECT_NM + "</td>";
	html += "</tr>";	
	}
	$(".popc2").html(html);
}

