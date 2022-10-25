var rows = "";

$(document).ready(function() {
	reloadList();
	
	// 기능성 돋보기 팝업
	$("#searchimg").on("click",function() {
		if ($(".poPup_serch1").css("display") == "block") {
			$(".poPup_serch1").hide();
		} else if ($(".poPup_serch1").css("display") == "none") {
			$(".poPup_serch1").show();
		}
	});
	// 영양소 돋보기 팝업
	$("#searchimg1").on("click",function() {
		if ($(".poPup_serch2").css("display") == "block") {
			$(".poPup_serch2").hide();
		} else if ($(".poPup_serch2").css("display") == "none") {
			$(".poPup_serch2").show();
		}
	});
	// 수치 돋보기 팝업
	$("#searchimg2").on("click",function() {
		if ($(".poPup_serch3").css("display") == "block") {
			$(".poPup_serch3").hide();
		} else if ($(".poPup_serch2").css("display") == "none") {
			$(".poPup_serch3").show();
		}
	});
	
	$("#listBtn").on("click", function(){
		     $("#backForm").submit();
		   });
// 등록 목록 팝업
   	$("#insertBtnPopup").on("click",function() {
    if ($("#insertpoPup").css("display") == "block") {
       $("#insertpoPup").hide();
    } else if ($("#insertpoPup").css("display") == "none") {
       $("#insertpoPup").show();
    }
 });
 
   	$("#listBtnPopup").on("click",function() {
    if ($("#listpoPup").css("display") == "block") {
       $("#listpoPup").hide();
    } else if ($("#listpoPup").css("display") == "none") {
       $("#listpoPup").show();
    }
 });
// 기능성 팝업
    $("#funcInsert").on("click",function() {
    if ($("#funcinsertpoPup").css("display") == "block") {
       $("#funcinsertpoPup").hide();
    } else if ($("#funcinsertpoPup").css("display") == "none") {
       $("#funcinsertpoPup").show();
    }
 });
         
  $("#funcCancle").on("click",function() {
        if ($("#funclistpoPup").css("display") == "block") {
           $("#funclistpoPup").hide();
        } else if ($("#funclistpoPup").css("display") == "none") {
           $("#funclistpoPup").show();
        }
     });
     
     	// 기능성 데이터 넣기
	$(".fu").on("click","#funcNum",function(){
      var funcarr = [];
      var funcnum= [];
      $("#funcNum:checked").each(function(){
         funcarr.push($(this).val());
         funcnum.push($(this).attr("num"));
      })
      
      $("#num").val(funcarr);
      $("#funcnm").val(funcnum);
      
   });
   $("#funcPlus").on("click", function(){
		$(".funcpoPup").hide();	
		$(".poPup_serch1").hide();	
});
     
	  $("#funclistBtn").on("click",function(){
		$(".poPup_serch1").hide();
		$("#funclistpoPup").hide();
		$("#num").val("");
      	$("#funcnm").val("");
	    $("input:checkbox[id='funcNum']").prop("checked", false);

});

// 영양소 팝업
    $("#nutInsert").on("click",function() {
    if ($("#nutinsertpoPup").css("display") == "block") {
       $("#nutinsertpoPup").hide();
    } else if ($("#nutinsertpoPup").css("display") == "none") {
       $("#nutinsertpoPup").show();
    }
 });
         
  $("#nutCancle").on("click",function() {
        if ($("#nutlistpoPup").css("display") == "block") {
           $("#nutlistpoPup").hide();
        } else if ($("#nutlistpoPup").css("display") == "none") {
           $("#nutlistpoPup").show();
        }
     });

	// 영양소 데이터 넣기
		$(".n").on("click","#nutNum",function(){
	      var nutarr = [];
	      var nutnum = [];
	      var figNM = [];
	      $("#nutNum:checked").each(function(){
	         nutarr.push($(this).val());
	         nutnum.push($(this).attr("num1"));
	         figNM.push($(this).attr("num1"));
	      })
	      fig(figNM);
	      
	      $("#num1").val(nutarr);
	      $("#nutnm").val(nutnum);
	   });

     
  $("#nutlistBtn").on("click",function(){
	$(".poPup_serch2").hide();
	$("#nutlistpoPup").hide();
	$("#num1").val("");
	$("#nutnm").val("");
	$("input:checkbox[id='nutNum']").prop("checked", false);
});

   $("#nutplus").on("click", function(){
		$(".nutpoPup").hide();	
		$(".poPup_serch2").hide();

});


// 영양소 등록 팝업
  $("#NutinsertBtn").on("click",function() {
        if ($("#Nutinsertpop").css("display") == "block") {
           $("#Nutinsertpop").hide();
        } else if ($("#Nutinsertpop").css("display") == "none") {
           $("#Nutinsertpop").show();
        }
     });
     
     // 수치 입력 팝업
    $("#figInsert").on("click",function() {
    if ($("#figinsertpoPup").css("display") == "block") {
       $("#figinsertpoPup").hide();
    } else if ($("#figinsertpoPup").css("display") == "none") {
       $("#figinsertpoPup").show();
    }
 });
         
  $("#figCancle").on("click",function() {
        if ($("#figlistpoPup").css("display") == "block") {
           $("#figlistpoPup").hide();
        } else if ($("#figlistpoPup").css("display") == "none") {
           $("#figlistpoPup").show();
        }
     });
     
     // 수치 추가 칸.
        $("#figplus").on("click", function(){
		$(".figpoPup").hide();	
		$(".poPup_serch3").hide();
		
		var row = $(".fig tr").length;
		var arr = [];
		for(var i=0; i<row;i++) {
			arr[i] = $(".fig .text1").eq(i).val();	
		}
		
		var figarr = [];
        figarr.push($(this).val());
	    
	    $("#fig1").val(figarr);
	    $("#fig").val(arr);	
});
     
	  $("#figlistBtn").on("click",function(){
		$(".poPup_serch3").hide();
		$(".figpoPup").hide();

});
     // 업체 등록 팝업
  $("#CominsertBtn").on("click",function() {
        if ($("#cominsertpop").css("display") == "block") {
           $("#cominsertpop").hide();
        } else if ($("#cominsertpop").css("display") == "none") {
           $("#cominsertpop").show();
        }
     });
     // 업체 데이터 추가 여러개
     $("#cominyes").on("click",function(){
		var row = $("#memDiv2 tr").length;
		var arr = [];
		for(var i=0; i<row;i++) {
			arr[i] = $("#memDiv2 #com").eq(i).val();	
		}
		
		var comarr = [];
        comarr.push($(this).val());
        
        $("#com1").val(comarr);
	    $("#com").val(arr);
	
});
     // 기능성 데이터 추가 여러개
     $("#funcinyes").on("click",function(){
		var row = $("#memDiv tr").length;
		var arr = [];
		for(var i=0; i<row;i++) {
			arr[i] = $("#memDiv #func").eq(i).val();	
	}
		
		var funcarr1 = [];
        funcarr1.push($(this).val());
        
        $("#func1").val(funcarr1);
	    $("#func").val(arr);
	
});

     // 영양소 데이터 추가 여러개
     $("#nutinyes").on("click",function(){
		var row = $("#memDiv1 tr").length;
		alert($("#memDiv1 tr").length);
		var nutnm1 = [];
		var unit = [];
		var gbn = [];
		var min = [];
		var max = [];
		for(var i=0; i<row;i++) {
			nutnm1[i] = $("#memDiv1 #nut_nm").eq(i).val();	
			unit[i] = $("#memDiv1 .unit").eq(i).val();	
			gbn[i] = $("#memDiv1 .gbn").eq(i).val();	
			min[i] = $("#memDiv1 #min").eq(i).val();	
			max[i] = $("#memDiv1 #max").eq(i).val();	
		}
		
		var nutnm2 = [];
		var unit1 = [];
		var gbn1 = [];
		var min1 = [];
		var max1 = [];
        nutnm2.push($(this).val());
        unit1.push($(this).val());
        gbn1.push($(this).val());
        min1.push($(this).val());
        max1.push($(this).val());
        
        $("#nut1").val(nutnm2);
        $("#nut2").val(unit1);
        $("#nut3").val(gbn1);
        $("#nut4").val(min1);
        $("#nut5").val(max1);
	    $("#nut_nm").val(nutnm1);
	    $(".unit").val(unit);
	    $(".gbn").val(gbn);
	    $("#min").val(min);
	    $("#max").val(max);
	
});
     // 기능성 등록 팝업
  $("#FuncinsertBtn").on("click",function() {
        if ($("#funcinsertpop").css("display") == "block") {
           $("#funcinsertpop").hide();
        } else if ($("#funcinsertpop").css("display") == "none") {
           $("#funcinsertpop").show();
        }
     });
     
     
	// 아니오 누르면 팝업 사라짐
 	$(".No").on("click",function(){
         $(".ILpoPup").hide();
         $(".funcpoPup").hide();
         $(".nutpoPup").hide();
         $(".compoPup").hide();
         $(".figpoPup").hide();
      });
      

     
     
    // 영양소 데이터 추가
$("#nutinyes").on("click", function(){
		 var params = $("#actionform").serialize();
		 if($.trim($("#nut_nm").val()) == "") {
            makeAlert("알림", "영양소를 입력하세요.", function() {
			$("#Nutinsertpop").hide();
            $("#nut_nm").focus();
            });
         }else if($.trim($("#min").val()) == "") {
        	  makeAlert("알림","최소적정복용 수치를 입력하세요", function(){
				  $("#Nutinsertpop").hide();
                  $("#min").focus();
                  });
         }else
         $.ajax({
        	 url : "HFAction/nutinsert",
        	 type : "POST",
        	 dateType : "json",
        	 data : params,
        	 success : function(res){
        		 switch (res.msg) {
				case "success":
					location.reload();
					break;
				case "fail":
					alert("알림","등록에 실패했습니다.");
					break;
				case "error" :
					alert("알림","등록 중 문제가 발생했습니다.");
					break;
				}
        	 },
        	 error : function(request, status , error){
        		 console.log(request.responseText);
        	 }
         })

	});
	
    // 업체 데이터 추가
$("#cominyes").on("click", function(){

		 var params = $("#actionform").serialize();
		 if($.trim($("#com").val()) == "") {
            makeAlert("알림", "업체명를 입력하세요.", function() {
			$("#cominsertpop").hide();
            $("#com").focus();
            });
         }else
         $.ajax({
        	 url : "HFAction/cominsert",
        	 type : "POST",
        	 dateType : "json",
        	 data : params,
        	 success : function(res){
        		 switch (res.msg) {
				case "success":
					location.reload();
					break;
				case "fail":
					alert("실패");
					break;
				case "error" :
					alert("에러");
					break;
				}
        	 },
        	 error : function(request, status , error){
        		 console.log(request.responseText);
        	 }
         })

	});
	// 기능성 데이터 추가
$("#funcinyes").on("click", function(){
		 if($.trim($("#func").val()) == "") {
            makeAlert("알림", "기능성명를 입력하세요.", function() {
			$("#funcinsertpop").hide();
            $("#func").focus();
            });
         }else
	// 1. 파일 업로드 -> 2. 업로드 파일명 취득 -> 3. 글 저장 
		         // 폼 객체 취득
		         var form = $("#actionform");
		         var pcpc = [];
         // // ajaxForm : form의 동작을 동기화에서 비동기화 방식으로 변경
		         form.ajaxForm({
		            success : function(res){ // 데이터 주고 받기 성공 시
		               if(res.result == "SUCCESS"){ // 파일 전송 성공
		                  // 올라간 파일이 존재한다면
		                  if(res.fileName.length > 0){ // 넘어오는 배열의 개수가 0보다 크다면
		                  for(var i = 0; i < res.fileName.length; i++){
		                     pcpc[i] = res.fileName[i]; // 올라간 파일명 보관
							}
							$("#pic").val(pcpc);
		                  }
		               
		               //글 저장
		               var params = $("#actionform").serialize();
		               $.ajax({
				        	 url : "HFAction/funcinsert",
				        	 type : "POST",
				        	 dateType : "json",
				        	 data : params,
				        	 success : function(res){
				        		 switch (res.msg) {
								case "success":
									alert("등록완료");
									location.reload();
									break;
								case "failed":
									alert("알림","등록에 실패했습니다.");
									break;
								case "error" :
									alert("알림","등록 중 문제가 발생했습니다.");
									
									break;
								}
				        	 },
			        	 error : function(request, status , error){
			        		 console.log(request.responseText);
			        	 }
			         })
		                  
		               }else { // 문제 발생
		                  makeAlert("알림", "파일 업로드에<br>문제가 발생하였습니다.");
		               }
		            },
		            error : function(){ // 에러 시
		               makeAlert("알림", "파일 업로드에<br>문제가 발생하였습니다.");
		            }
		         }); // ajaxForm 설정 끝
		         
		         // ajaxForm 실행
		         form.submit();
				
		      });
	// 등록
		$("#insertBtn").on("click", function(){
		 if($.trim($("#prodNm").val()) == "") {
            makeAlert("알림", "제품명을 입력하세요.", function() {
			$("#insertpoPup").hide();
            $("#prodNm").focus();
            });
         }else if($.trim($("#funcnm").val()) == "") {
        	  makeAlert("알림","기능성을 선택해주세요", function(){
				  $("#insertpoPup").hide();
                  $("#funcnm").focus();
                  });
         }else if($.trim($("#nutnm").val()) == "") {
        	 makeAlert("알림","영양소를 선택해주세요", function(){
				 $("#insertpoPup").hide();
                 $("#nutnm").focus();
                 });
          }else if($.trim($("#fig").val()) == "," && 
          			$.trim($("#fig").val()) == isNaN($("#fig").val())) {
        	 makeAlert("알림","수치를 입력해주세요", function(){
				 $("#insertpoPup").hide();
                 $("#fig").focus();
                 });
          }else
        	// 1. 파일 업로드 -> 2. 업로드 파일명 취득 -> 3. 글 저장 
		         // 폼 객체 취득
		         var form = $("#actionform");
         // // ajaxForm : form의 동작을 동기화에서 비동기화 방식으로 변경
		         form.ajaxForm({
		            success : function(res){ // 데이터 주고 받기 성공 시
		               if(res.result == "SUCCESS"){ // 파일 전송 성공
		                  // 올라간 파일이 존재한다면
		                  if(res.fileName.length > 0){ // 넘어오는 배열의 개수가 0보다 크다면
		                  
		                     $("#pic").val(res.fileName[0]); // 올라간 파일명 보관
		                  }
		               
		               //글 저장
		               var params = $("#actionform").serialize();
		               $.ajax({
				        	 url : "HFAction/insert",
				        	 type : "POST",
				        	 dateType : "json",
				        	 data : params,
				        	 success : function(res){
				        		 switch (res.msg) {
								case "success":
									alert("등록완료");
									location.href = "healthFoodMgtList";
									break;
								case "failed":
									alert("실패했습니다","등록에 실패했습니다.");
									break;
								case "error" :
									alert("문제가","등록 중 문제가 발생했습니다.");
									break;
								}
				        	 },
			        	 error : function(request, status , error){
			        		 console.log(request.responseText);
			        	 }
			         })
		                  
		               }else { // 문제 발생
		                  makeAlert("알림", "파일 업로드에<br>문제가 발생하였습니다.");
		               }
		            },
		            error : function(){ // 에러 시
		               makeAlert("알림", "파일 업로드에<br>문제가 발생하였습니다.");
		            }
		         }); // ajaxForm 설정 끝
		         
		         // ajaxForm 실행
		         form.submit();
				
		      });
	
});
	// 사진 첨부파일 올릴 시 미리 보기
	function readURL(input) {
	  if (input.files && input.files[0]) {
	    var reader = new FileReader();
	    reader.onload = function(e) {
	      document.getElementById('im').src = e.target.result;
	    };
	    reader.readAsDataURL(input.files[0]);
	  } else {
	    document.getElementById('im').src = "";
	  }
	}
	// 기능성 데이터 추가 행
	var cnt = 0;
	function insertTr(){
	cnt++;
	 var insertTr = "";
	   insertTr += "<tr>";
	   insertTr += "<td><input type=\"file\" class=\"func\" id=\"fix\" name=\"picFile"+cnt+"\" style=\"width:304px\"/></td>";
	   insertTr += "<td><input type=\"text\" class=\"text func\" name=\"func\" id=\"func\" placeholder=\"내용을 입력하세요.\" /></td>";
	   insertTr += "</tr>";
	     
	   $("#memDiv").append(insertTr);

	}
	
	// 업체 데이터 추가 행
	function insertTr2(){

	 var insertTr = "";
	   insertTr += "<tr>";
	   insertTr += "<td><input type=\"text\" class=\"text\" name=\"com\" id=\"com\" placeholder=\"내용을 입력하세요.\" /></td>";
	   insertTr += "</tr>";
	     
	   $("#memDiv2").append(insertTr);

	}
		
	// 행 삭제

		window.onload=()=>{
	    	document.getElementById("delBtn").addEventListener("click", fnDel);
	    	document.getElementById("delBtn1").addEventListener("click", fnuDel);
	    	document.getElementById("delBtn2").addEventListener("click", fuDel);
	}

	function fnDel(){
	    var body = document.getElementById("memDiv");
	    if (body.rows.length>1)
	        body.deleteRow(body.rows.length-1);
	    else
	        alert('더 이상 삭제 불가');
	}
	function fuDel(){
	    var ttbody = document.getElementById("memDiv2");
	    if (ttbody.rows.length>1)
	        ttbody.deleteRow(ttbody.rows.length-1);
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

	// div 나타내기
$(function() {
  $('#btn1').click( function() {
    if( $(this).html() == '기능성 데이터 추가' ) {
      $(this).html('기능성 숨기기');
      $("#noneDiv").show();
    }
    else {
      $(this).html('기능성 데이터 추가');
      $("#noneDiv").hide();	
    }
  });
});

$(function() {
	  $('#btn2').click( function() {
	    if( $(this).html() == '업체 추가' ) {
	      $(this).html('업체 숨기기');
	      $("#noneDiv2").show();
	    }
	    else {
	      $(this).html('업체 추가');
	      $("#noneDiv2").hide();	
	    }
	  });
	});
$(function() {
	  $('#btn3').click( function() {
	    if( $(this).html() == '영양소 데이터 추가' ) {
	      $(this).html('영양소 숨기기');
	      $("#noneDiv1").show();
	    }
	    else {
	      $(this).html('영양소 데이터 추가');
	      $("#noneDiv1").hide();	
	    }
	  });
	});
	
	
	// 목록 조회
		function reloadList(){
			var params = $("#actionform").serialize();
			
		$.ajax({
			url : "healthFoodEnrollListAjax",
			type : "POST",
			dataType : "json",
			data : params,
			success : function(res) {
				drawList(res.list);
				drawListt(res.listt);
				insertTr1(res.listtt);
				fig(res.fig);
			},
			error : function(request, status, error) {
				console.log(request.responseText);
			}
		});
	};
	// 기능성 팝업 목록
	function drawList(list){
		var html ="";
		for(var data of list){
			html += "<tr funcNum = \"" + data.FUNC_NUM + "\">";
			html += "<td class=\"pop3\">";
			html += "<input type=\"checkbox\" id=\"funcNum\" num =\""+data.FUNC_NM +"\"  value=\""+ data.FUNC_NUM + "\">";
			html += "</td>";
			html += "<td class=\"pop1\" id=\"funcNm\" name=\"funcNm\">" + data.FUNC_NM + "</td>";
			html += "</tr>";
	}
		$(".fu").html(html);
		
}
	// 수치 입력 목록 팝업
	function fig(fig){
		var html ="";
		for(var data of fig){
			html += "<tr no = "+ data.NUT_NUM + ">";
			html += "<td class=\"pop3\" id=\"figNM\">"+data+"</td>";
			html += "<td class=\"pop1\" ><input type=\"number\" class=\"text1\" id=\"fignumber\"></td>";
			html += "</tr>";
	}
		$(".fig").html(html);
		
}
	// 영양소 팝업 목록
	function drawListt(listt){
		var html ="";
		for(var data of listt){
			html += "<tr nutNum = \"" + data.NUT_NUM + "\">";
			html += "<td class=\"pop3\">";
			html += "<input type=\"checkbox\" id=\"nutNum\" num1 =\"" + data.NUT_NM + "\"  value=\""+ data.NUT_NUM + "\">";
			html += "</td>";
			html += "<td class=\"pop1\">" + data.NUT_NM + "</td>";
			html += "<td class=\"pop1\">" + data.MIN_PROP_TAKE_AMT + "</td>";
			html += "<td class=\"pop1\">" + data.MAX_PROP_TAKE_AMT + "</td>";
			html += "</tr>";
	}
		$(".n").html(html);
		
}
	// 영양소 등록 목록
	function insertTr1(listtt){
			rows += "<tr>";
	   		rows += "<td><input type=\"text\" class=\"text nut\" name=\"nut_nm\" id=\"nut_nm\" placeholder=\"내용을 입력하세요.\" /></td>";
	   		rows += "<td>";
	   		rows += "<select class=\"text nut\" name=\"unit\" >";
		for(var data of listtt){
	   		rows += "<option class=\"unit\" value=\"" + data.UNIT_NUM + "\">" + data.UNIT + "</option>";
		}
	   		rows += "</select>";
	   		rows += "</td>";
	   		rows += "<td>";
	   		rows += "<select class=\"text nut\" name=\"gbn\" >";
	   		rows += "<option class=\"gbn\" value=\"기능성\">기능성</option>";
	   		rows += "<option class=\"gbn\" value=\"필수\">필수</option>";
	   		rows += "</select>";
	   		rows +=	"</td>";
	   		rows += "<td><input type=\"text\" class=\"text nut\" name=\"min\" id=\"min\" placeholder=\"최소 적정 복용을 숫자로 입력하세요.\" /></td>";
	   		rows += "<td><input type=\"text\" class=\"text nut\" name=\"max\" id=\"max\" placeholder=\"최대 적정 복용을 숫자로 입력하세요.\" /></td>";
	   		rows += "</tr>";
	   		
		$("#memDiv1").append(rows);
}

	function appendTr1() {
		$("#memDiv1").append(rows);
	}

