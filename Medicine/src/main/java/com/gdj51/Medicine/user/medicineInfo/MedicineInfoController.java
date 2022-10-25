package com.gdj51.Medicine.user.medicineInfo;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gdj51.Medicine.common.dao.IACDao;
import com.gdj51.Medicine.common.service.IPagingService;

@Controller
public class MedicineInfoController {
	
	@Autowired
	public IACDao iACDao;
	@Autowired
	public IPagingService ips;
	
	//의약품 메인
	@RequestMapping(value = "medicineInfoMain")
	public ModelAndView medicineInfoMain(ModelAndView mav) {
		mav.setViewName("userPage/medicineInfo/medicineInfo_main");
		
		return mav;
	}
	//의약품 리스트
	@RequestMapping(value = "medicineInfoList")
	public ModelAndView medicineInfoList(ModelAndView mav, @RequestParam HashMap<String, String> params ) throws Throwable {
		
		int page = 1;
		
		if(params.get("page") != null && params.get("page") != "") {
			page = Integer.parseInt(params.get("page"));
		}
		mav.addObject("page", page);
		
		mav.setViewName("userPage/medicineInfo/medicineInfo_list");
		return mav;
	}
	
	//의약품 상세
	@RequestMapping(value = "medicineInfoDetail")
	public ModelAndView medicineInfoDetail(ModelAndView mav,
											@RequestParam HashMap<String, String> params) throws Throwable {
		
		if(params.get("no") != null && params.get("no") != "") {
			mav.setViewName("userPage/medicineInfo/medicineInfo_detail");			
		} else {
			mav.setViewName("userPage/medicineInfo/medicineInfo_list");
		}

		return mav;
	}
	//의약품 상세 - AJAX
	
	
	//의약품리스트 - ajax
	@RequestMapping(value = "/MedicineListAjax",
					method = RequestMethod.POST,
					produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MedicineListAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		
		//총 데이터건수 - 페이징
		int cnt = iACDao.getInt("userMedicine.selectMedicineCnt", params);
		int page = Integer.parseInt(params.get("page"));

		HashMap<String, Integer> pd = ips.getPagingData(page, cnt,10,5);

		//시작, 마지막 페이징 
		String start = Integer.toString(pd.get("start"));
		String end = Integer.toString(pd.get("end"));

		params.put("start", start);
		params.put("end", end);
		
		List<HashMap<String, String>> list = iACDao.getList("userMedicine.selectMedicineList", params);
		
		model.put("list", list);
		model.put("pd", pd);
		
		return mapper.writeValueAsString(model);
	}
	
	//의약품 상세보기 - 테이블 ajax
	@RequestMapping(value= "/MedicineDetailTableAjax",
					method = RequestMethod.POST,
					produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MedicineDetailTableAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		//의약품 정보 상세
		List<HashMap<String, String>> list = iACDao.getList("userMedicine.medicineDetail", params);
		

		model.put("list", list);

		return mapper.writeValueAsString(model);
	}
	
	//의약품 상세보기 - 테이블 ajax
		@RequestMapping(value= "/MedicineDetailTableAjax2",
						method = RequestMethod.POST,
						produces = "text/json;charset=UTF-8")
		@ResponseBody
		public String MedicineDetailTableAjax2(@RequestParam HashMap<String, String> params) throws Throwable {
			ObjectMapper mapper = new ObjectMapper();
			Map<String, Object> model = new HashMap<String, Object>();
			//의약품 정보 상세
			//List<HashMap<String, String>> list = iACDao.getList("userMedicine.medicineDetail", params);
			
			
			int cnt = iACDao.getInt("userMedicine.selectRevCnt", params); 
			int page = 1;
			System.out.println("page = " + page);
			if(params.get("page") != null && params.get("page") != "") { 
				page = Integer.parseInt(params.get("page")); 
			} 
			HashMap<String, Integer> pd = ips.getPagingData(page, cnt, 3, 5); 
			String start = Integer.toString(pd.get("start")); 
			String end = Integer.toString(pd.get("end"));
			System.out.println("pd = " + pd);
			
			params.put("start", start); 
			params.put("end", end);
			model.put("pd", pd);
			  
			  List<HashMap<String, String>> list2 = iACDao.getList("userMedicine.selectRev", params);
			  
			
			  model.put("list2", list2);
			return mapper.writeValueAsString(model);
		}
	//의약품 상세보기 - 왼쪽 종합 그래프
		@RequestMapping(value ="/MedicineSumGraphAjax1",
						method = RequestMethod.POST,
						produces = "text/json;charset=UTF-8")
		@ResponseBody
		public String MedicineSumGraphAjax1(@RequestParam HashMap<String, String> params) throws Throwable {
			ObjectMapper mapper = new ObjectMapper();
			Map<String, Object> model = new HashMap<String, Object>();
			//효과
			List<HashMap<String, String>> list = iACDao.getList("userMedicine.selectGraph1",params);
			
			
			if(list.size() > 0) {
				String[] effectNm = new String[list.size()];
				String[] effectScore = new String[list.size()];
				String[] esum = new String[list.size()];
			for(int row=0;row<list.size();row++) {
				effectNm[row] = list.get(row).get("EFFECT_NM"); //상위 효과 6개 이름가져와서 배열에 넣기
				effectScore[row] = String.valueOf(list.get(row).get("SCORE_SUM")); //상위 효과 6개 점수 가져와서 배열에 넣기
			}
			esum[0] = String.valueOf(list.get(0).get("SUMSUM")); //효과 총합 가져오기
			
			model.put("graph1", list);
			model.put("effectDetailNm", effectNm);
			model.put("effectDetailScore", effectScore);
			model.put("leftGraphSumScore", esum[0]);
			//값이 없을때 0처리
			} else {
				String[] effectNm = new String[1];
				String[] effectScore = new String[1];
				String[] esum = new String[1];
				
				effectNm[0] = "";
				effectScore[0] = "";
				esum[0] = "";
				
				model.put("graph1", list);
				model.put("effectDetailNm", effectNm);
				model.put("effectDetailScore", effectScore);
				model.put("leftGraphSumScore", esum[0]);
			}
			//부작용
			List<HashMap<String, String>> list2 = iACDao.getList("userMedicine.selectGraph2", params);
			
			if(list2.size() > 0) {
				String[] seffectNm = new String[list2.size()];
				String[] seffectScore = new String[list2.size()];
				String[] ssum = new String[list2.size()];
			for(int row=0;row<list2.size();row++) {
				seffectNm[row] = list2.get(row).get("SEFFECT_NM");
				seffectScore[row] = String.valueOf(list2.get(row).get("SCORE_SUM"));
			}
			ssum[0] = String.valueOf(list2.get(0).get("SUMSUM"));
			model.put("graph2", list2);
			model.put("seffectDetailNm", seffectNm);
			model.put("seffectDetailScore", seffectScore);
			model.put("leftGraphSumScore2", ssum);
			//값이 없을떄 0처리
			} else {
				String[] seffectNm = new String[1];
				String[] seffectScore = new String[1];
				String[] ssum = new String[1];
				
				seffectNm[0] = "";
				seffectScore[0] = "";
				ssum[0] = "";
				
				model.put("graph2", list2);
				model.put("seffectDetailNm", seffectNm);
				model.put("seffectDetailScore", seffectScore);
				model.put("leftGraphSumScore2", ssum);
			}
			
			//기타 효과
			List<HashMap<String, String>> list3 = iACDao.getList("userMedicine.selectGraph3", params);
			
			if(list3.size() > 0) {
				String[] etceffectNm = new String[list3.size()];
				String[] etceffectScore = new String[list3.size()];
				String[] esum2 = new String[list3.size()];
				
				for(int row=0;row<list3.size();row++) {
					etceffectNm[row] = list3.get(row).get("EFFECT_NM");
					etceffectScore[row] = String.valueOf(list3.get(row).get("SCORE_SUM"));
				}
				esum2[0] = String.valueOf(list3.get(0).get("SUMSUM"));
				model.put("graph3", list3);
				model.put("etceffectDetailNm", etceffectNm);
				model.put("etceffectDetailScore", etceffectScore);
				model.put("leftGraphSumScore3", esum2);
			} else {
				String[] etceffectNm = new String[1];
				String[] etceffectScore = new String[1];
				String[] esum2 = new String[1];
				
				etceffectNm[0] = "";
				etceffectScore[0] = "";
				esum2[0] = "";
				
				model.put("graph3", list3);
				model.put("etceffectDetailNm", etceffectNm);
				model.put("etceffectDetailScore", etceffectScore);
				model.put("leftGraphSumScore3", esum2);
			}
			
			//기타 부작용
			List<HashMap<String, String>> list4 = iACDao.getList("userMedicine.selectGraph4", params);
			
			if(list4.size() > 0) {
				String[] etcseffectNm = new String[list4.size()];
				String[] etcseffectScore = new String[list4.size()];
				String[] ssum2 = new String[list4.size()];
				
				for(int row=0;row<list4.size();row++) {
					etcseffectNm[row] = list4.get(row).get("SEFFECT_NM");
					etcseffectScore[row] = String.valueOf(list4.get(row).get("SCORE_SUM"));
				}
				ssum2[0] = String.valueOf(list4.get(0).get("SUMSUM"));
				model.put("graph4", list4);
				model.put("etcseffectDetailNm", etcseffectNm);
				model.put("etcseffectDetailScore", etcseffectScore);
				model.put("leftGraphSumScore4", ssum2);
			} else {
				String[] etcseffectNm = new String[1];
				String[] etcseffectScore = new String[1];
				String[] ssum2 = new String[1];
				
				etcseffectNm[0] = "";
				etcseffectScore[0] = "";
				ssum2[0] = "";
				
				model.put("graph4", list4);
				model.put("etcseffectDetailNm", etcseffectNm);
				model.put("etcseffectDetailScore", etcseffectScore);
				model.put("leftGraphSumScore4", ssum2);
			}

			
			return mapper.writeValueAsString(model);
		}
		
	//의약품 상세보기 - 오른쪽 종합 그래프
		@RequestMapping(value ="/MedicineSumGraphAjax2",
						method = RequestMethod.POST,
						produces = "text/json;charset=UTF-8")
		@ResponseBody
		public String MedicineSumGraphAjax2(@RequestParam HashMap<String, String> params) throws Throwable {
			ObjectMapper mapper = new ObjectMapper();
			Map<String, Object> model = new HashMap<String, Object>();
			//효과
			List<HashMap<String, String>> list = iACDao.getList("userMedicine.selectGraph5", params);
			
			if(list.size() > 0) {
				String[] effectNm = new String[list.size()];
				String[] effectScore = new String[list.size()];
				String[] esum = new String[list.size()];
				
				for(int row=0;row<list.size();row++) {
					effectNm[row] = list.get(row).get("EFFECT_NM"); //상위 효과 6개 이름가져와서 배열에 넣기
					effectScore[row] = String.valueOf(list.get(row).get("SCORE_SUM")); //상위 효과 6개 점수 가져와서 배열에 넣기
				}
				esum[0] = String.valueOf(list.get(0).get("SUMSUM")); //효과 총합 가져오기
				model.put("graph5", list);
				model.put("effectDetailNm", effectNm);
				model.put("effectDetailScore", effectScore);
				model.put("rightGraphSumScore", esum[0]);
			//값이 없을때 0처리
			} else {
				String[] effectNm = new String[1];
				String[] effectScore = new String[1];
				String[] esum = new String[1];
				
				effectNm[0] = "";
				effectScore[0] = "";
				esum[0] = "";
				
				model.put("graph5", list);
				model.put("effectDetailNm", effectNm);
				model.put("effectDetailScore", effectScore);
				model.put("rightGraphSumScore", esum[0]);
			}
			//부작용
			List<HashMap<String, String>> list2 = iACDao.getList("userMedicine.selectGraph6", params);
			
			if(list2.size() > 0) {
				String[] seffectNm = new String[list2.size()];
				String[] seffectScore = new String[list2.size()];
				String[] ssum = new String[list2.size()];
			for(int row=0;row<list2.size();row++) {
				seffectNm[row] = list2.get(row).get("SEFFECT_NM");
				seffectScore[row] = String.valueOf(list2.get(row).get("SCORE_SUM"));
			}
			ssum[0] = String.valueOf(list2.get(0).get("SUMSUM"));
			model.put("graph6", list2);
			model.put("seffectDetailNm", seffectNm);
			model.put("seffectDetailScore", seffectScore);
			model.put("rightGraphSumScore2", ssum);
			//값이 없을떄 0처리
			} else {
				String[] seffectNm = new String[1];
				String[] seffectScore = new String[1];
				String[] ssum = new String[1];
				
				seffectNm[0] = "";
				seffectScore[0] = "";
				ssum[0] = "";
				
				model.put("graph6", list2);
				model.put("seffectDetailNm", seffectNm);
				model.put("seffectDetailScore", seffectScore);
				model.put("rightGraphSumScore2", ssum);
			}
			//기타 효과
			List<HashMap<String, String>> list3 = iACDao.getList("userMedicine.selectGraph7", params);
			
			if(list3.size() > 0) {
				String[] etceffectNm = new String[list3.size()];
				String[] etceffectScore = new String[list3.size()];
				String[] esum2 = new String[list3.size()];
				
				for(int row=0;row<list3.size();row++) {
					etceffectNm[row] = list3.get(row).get("EFFECT_NM");
					etceffectScore[row] = String.valueOf(list3.get(row).get("SCORE_SUM"));
				}
				esum2[0] = String.valueOf(list3.get(0).get("SUMSUM"));
				model.put("graph7", list3);
				model.put("etceffectDetailNm", etceffectNm);
				model.put("etceffectDetailScore", etceffectScore);
				model.put("rightGraphSumScore3", esum2);
			} else {
				String[] etceffectNm = new String[1];
				String[] etceffectScore = new String[1];
				String[] esum2 = new String[1];
				
				etceffectNm[0] = "";
				etceffectScore[0] = "";
				esum2[0] = "";
				
				model.put("graph7", list3);
				model.put("etceffectDetailNm", etceffectNm);
				model.put("etceffectDetailScore", etceffectScore);
				model.put("rightGraphSumScore3", esum2);
			}
			//기타 부작용
			List<HashMap<String, String>> list4 = iACDao.getList("userMedicine.selectGraph8", params);
			
			if(list4.size() > 0) {
				String[] etcseffectNm = new String[list4.size()];
				String[] etcseffectScore = new String[list4.size()];
				String[] ssum2 = new String[list4.size()];
				
				for(int row=0;row<list4.size();row++) {
					etcseffectNm[row] = list4.get(row).get("SEFFECT_NM");
					etcseffectScore[row] = String.valueOf(list4.get(row).get("SCORE_SUM"));
				}
				ssum2[0] = String.valueOf(list4.get(0).get("SUMSUM"));
				model.put("graph8", list4);
				model.put("etcseffectDetailNm", etcseffectNm);
				model.put("etcseffectDetailScore", etcseffectScore);
				model.put("rightGraphSumScore4", ssum2);
			} else {
				String[] etcseffectNm = new String[1];
				String[] etcseffectScore = new String[1];
				String[] ssum2 = new String[1];
				
				etcseffectNm[0] = "";
				etcseffectScore[0] = "";
				ssum2[0] = "";
				
				model.put("graph8", list4);
				model.put("etcseffectDetailNm", etcseffectNm);
				model.put("etcseffectDetailScore", etcseffectScore);
				model.put("rightGraphSumScore4", ssum2);
			}
			return mapper.writeValueAsString(model);
		}
	
	//리뷰 등록 - 효과 팝업 ajax
	@RequestMapping(value = "/MedicineReviewAddAjax",
					method = RequestMethod.POST,
					produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MedicineReviewAddAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		
		int cnt = iACDao.getInt("userMedicine.effectCnt", params);
		int page = 1;
		
		if(params.get("page") != null && params.get("page") != "") {
			page = Integer.parseInt(params.get("page"));
		}
		HashMap<String, Integer> pd = ips.getPagingData(page, cnt, 10, 5);
		
		String start = Integer.toString(pd.get("start"));
		String end = Integer.toString(pd.get("end"));
		
		params.put("start", start);
		params.put("end", end);
		
		List<HashMap<String,String>> list = iACDao.getList("userMedicine.effectList", params);
		
		model.put("list", list);
		model.put("pd", pd);
		
		return mapper.writeValueAsString(model);
	}
	
	//리뷰 등록 - 부작용 팝업 ajax
		@RequestMapping(value = "/MedicineReviewAddAjax2",
						method = RequestMethod.POST,
						produces = "text/json;charset=UTF-8")
		@ResponseBody
		public String MedicineReviewAddAjax2(@RequestParam HashMap<String, String> params) throws Throwable {
			ObjectMapper mapper = new ObjectMapper();
			Map<String, Object> model = new HashMap<String, Object>();
			
			int cnt = iACDao.getInt("userMedicine.seffectCnt", params);
			int page = 1;
			
			if(params.get("page") != null && params.get("page") != "") {
				page = Integer.parseInt(params.get("page"));
			}
			HashMap<String, Integer> pd = ips.getPagingData(page, cnt, 10, 5);
			
			String start = Integer.toString(pd.get("start"));
			String end = Integer.toString(pd.get("end"));
			
			params.put("start", start);
			params.put("end", end);
			
			List<HashMap<String,String>> list = iACDao.getList("userMedicine.seffectList", params);
			
			model.put("list", list);
			model.put("pd", pd);
			
			return mapper.writeValueAsString(model);
		}
	
	
	//효과
	@RequestMapping(value ="/MedicineReviewListAjax",
					method = RequestMethod.POST,
					produces = "test/json;charset=UTF-8")
	@ResponseBody
	public String MedicineReviewListAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		
		int cnt = iACDao.getInt("userMedicine.effectCnt", params);
		int page = 1;
		
		if(params.get("page") != null && params.get("page") != "") {
			page = Integer.parseInt(params.get("page"));
		}
		
		HashMap<String, Integer> pd = ips.getPagingData(page, cnt, 10, 5);
		
		String start = Integer.toString(pd.get("start"));
		String end = Integer.toString(pd.get("end"));
		
		params.put("start", start);
		params.put("end", end);
		
		List<HashMap<String, String>> list = iACDao.getList("userMedicine.effectList", params);
		
		model.put("list", list);
		model.put("pd", pd);
		
		return mapper.writeValueAsString(model);
	}
	
	// 부작용
	@RequestMapping(value = "/MedicineReviewListAjax2", method = RequestMethod.POST, produces = "test/json;charset=UTF-8")
	@ResponseBody
	public String MedicineReviewListAjax2(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		
		
		
		int cnt = iACDao.getInt("userMedicine.seffectCnt", params);
		int page = 1;

		if (params.get("page") != null && params.get("page") != "") {
			page = Integer.parseInt(params.get("page"));
		}

		HashMap<String, Integer> pd2 = ips.getPagingData(page, cnt, 10, 5);

		String start = Integer.toString(pd2.get("start"));
		String end = Integer.toString(pd2.get("end"));

		params.put("start", start);
		params.put("end", end);
		List<HashMap<String, String>> list = iACDao.getList("userMedicine.seffectList", params);
		

		model.put("list", list);
		model.put("pd2", pd2);

		return mapper.writeValueAsString(model);
	}
	
	//의약품 디테일 - 리뷰등록
	@RequestMapping(value = "/medicineInfoReviewAdd")
	public ModelAndView medicineInfoReviewAdd(ModelAndView mav,
											  @RequestParam HashMap<String, String> params,
											  HttpSession session, HttpServletResponse response) throws Throwable {
		if(session.getAttribute("sMemNum") == null || session.getAttribute("sMemNum") == "") {
			response.setContentType("text/html; charset=UTF-8");
			PrintWriter out = response.getWriter();
			out.println("<script language='javascript'>");
			out.println("alert('로그인이 필요한 서비스입니다.')");
			out.println("</script>");
			out.flush();
			
			mav.setViewName("common/login");
		} 
		  if(params.get("no") != null && params.get("no") != "") {
			mav.setViewName("userPage/medicineInfo/medicineInfo_reviewInsert");
		} else if(params.get("no") == null && params.get("no") != "") {
			mav.setViewName("redirect:medicineInfoDetail");
		}  
		return mav;
	}
	
	
	
	
	//리뷰등록버튼 클릭시 ajax
	@RequestMapping(value = "/mediRevReg", method = RequestMethod.POST,
					produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String mediRevReg(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model  = new HashMap<String, Object>();
		int seq = 0;
		int cnt = 0;
		int cnt2 = 0;
		int cnt3 = 0;
		int cnt4 = 0;
		int cnt5 = 0;
		try {
			//시퀀스 취득
			seq = iACDao.getInt("userMedicine.curSeq");
			System.out.println("시퀀스 : " + seq);
			HashMap<String, String> list = new HashMap<String, String>();
			
			//리뷰번호,내용 등 등록
			params.put("seqNum", Integer.toString(seq));
			list.put("list", Integer.toString(seq));
			cnt = iACDao.insert("userMedicine.insertRev",params);
			
			//효과
			String[] effectArr = params.get("effect_arr").split(",");
			String[] effect_score_arr = params.get("effect_score_arr").split(",");
			String[] effectNum = params.get("effectNum").split(",");

			//부작용
			String[] seffectArr = params.get("seffect_arr").split(",");
			String[] seffect_score_arr = params.get("seffect_score_arr").split(",");
			String[] seffectNum = params.get("seffectNum").split(",");

			//기타 효과
			String[] effectArr2 = params.get("effect_arr2").split(",");
			String[] effect_score_arr2 = params.get("effect_score_arr2").split(",");
			
			//기타 부작용
			String[] seffectArr2 = params.get("seffect_arr2").split(",");
			String[] seffect_score_arr2 = params.get("seffect_score_arr2").split(",");
			
			//효과
			if(!effectNum[0].isEmpty()) {
				for(int i=0;i<effectArr.length;i++) {
					list.put("effectNm", effectArr[i]);
					list.put("effectScore", effect_score_arr[i]);
					params.put("effectNm", effectArr[i]);
					params.put("effectScore",effect_score_arr[i]);
					params.put("effectNum", effectNum[i]);
					cnt2 = iACDao.insert("userMedicine.insertEffect", params);
				}
			}
			
			
			//부작용
		if(!seffectNum[0].isEmpty()) {
			System.out.println("들어오면 안돼");
			for(int i=0;i<seffectArr.length;i++) {
				list.put("seffectNm", seffectArr[i]);
				list.put("seffectScore", seffect_score_arr[i]);
				params.put("seffectNm", seffectArr[i]);
				params.put("seffectScore",seffect_score_arr[i]);
				params.put("seffectNum", seffectNum[i]);
				cnt3 = iACDao.insert("userMedicine.insertSEffect", params);
			}
		}
			//기타 효과
		if(!effectArr2[0].isEmpty()) {
			for(int i=0;i<effectArr2.length;i++) {
				list.put("etceffectNm", effectArr2[i]);
				list.put("etceffectScore", effect_score_arr2[i]);
				params.put("etceffectNm", effectArr2[i]);
				params.put("etceffectScore", effect_score_arr2[i]);
				//params.put("effectNum2", effectNum2[i]);
				cnt = iACDao.insert("userMedicine.insertEtcEffect", params);
			}
		}
			//기타 부작용
		if(!seffectArr2[0].isEmpty()) {
			for(int i=0;i<seffectArr2.length;i++) {
				list.put("etcseffectNm", seffectArr2[i]);
				list.put("etcseffectScore", seffect_score_arr2[i]);
				params.put("etcseffectNm", seffectArr2[i]);
				params.put("etcseffectScore", seffect_score_arr2[i]);
				//params.put("seffectNum2", seffectArr2[i]);
				cnt = iACDao.insert("userMedicine.insertEtcSEffect", params);
			}
		}
			if(seq > 0) {
				model.put("msg", "successSeq");
			}else {
				model.put("msg", "failedSeq");
			}
			if(cnt > 0 || cnt2 > 0 || cnt3 > 0 || cnt4 > 0 || cnt5 > 0) {
				model.put("msg", "success");
			}else {
				model.put("msg", "failed");
			}
		} catch (Exception e) {
			e.printStackTrace();
			model.put("msg", "error");
		}

		return mapper.writeValueAsString(model);
	}
	
	//리뷰상세 ajax
	@RequestMapping(value ="/MedicineRevDetailAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MedicineRevDetailAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		
		//리뷰 댓글 페이징
		
		
		String revNum = params.get("revNum");

		System.out.println("revNum = = = = =" + revNum);
		System.out.println("params = " + params);
		//리뷰 상세
		List<HashMap<String, String>> revDetailCnt = iACDao.getList("userMedicine.revDetail", params);
		
		
		//리뷰 상세 - 효과
		List<HashMap<String, String>> revTableEffect = iACDao.getList("userMedicine.revTableEffect", params);
		//리뷰 상세 - 부작용
		List<HashMap<String, String>> revTableSEffect = iACDao.getList("userMedicine.revTableSEffect", params);
		//리뷰 상세 - 기타 효과
		List<HashMap<String, String>> revTableEffectEtc = iACDao.getList("userMedicine.revTableEffectEtc", params);
		//리뷰 상세 - 기타 부작용
		List<HashMap<String, String>> revTableSEffectEtc = iACDao.getList("userMedicine.revTableSEffectEtc", params);
		
		
		
		
		model.put("revDetailList", revDetailCnt);
		
		model.put("revDetailEffect", revTableEffect);
		
		model.put("revDetailSEffect", revTableSEffect);
		
		model.put("revDetailEffectEtc", revTableEffectEtc);
		
		model.put("revDetailSEffectEtc", revTableSEffectEtc);
		
		
		
		return mapper.writeValueAsString(model);
	}
	
	
	//리뷰 - 댓글목록 , 댓글 페이징
	@RequestMapping(value = "/reviewRepListAjax",
					method = RequestMethod.POST,
					produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String reviewRepListAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		
		int repCnt = iACDao.getInt("userMedicine.revRepCnt", params);
		
		int page = 1;
		
		if(params.get("page1") != null && params.get("page1") != "") {
			page = Integer.parseInt(params.get("page1"));
		}
		
		HashMap<String, Integer> pd2 = ips.getPagingData(page, repCnt, 5, 5);
		
		String start = Integer.toString(pd2.get("start"));
		String end = Integer.toString(pd2.get("end"));
		
		params.put("start", start);
		params.put("end", end);
		model.put("pd2", pd2);
		
		List<HashMap<String, String>> revRepList = iACDao.getList("userMedicine.revRepList", params);
		model.put("revRepList", revRepList);
		
		return mapper.writeValueAsString(model);
	
	}
	
	//리뷰 - 댓글 CRUD
	@RequestMapping(value = "/reviewRepAjax/{gbn}",
					method = RequestMethod.POST,
					produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String reviewRepInsertAjax(@RequestParam HashMap<String, String> params,
			@PathVariable String gbn) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		
		int cnt = 0;	
	
		try {
			switch(gbn) {

			case "insert" :
				cnt = iACDao.insert("userMedicine.repInsert", params);
				break;
			
			case "delete" :
				cnt = iACDao.update("userMedicine.repDelete", params);
				break;
			
			case "update" :
				cnt = iACDao.update("userMedicine.repUpdate", params);
				break;
			}
			
			if(cnt > 0) {
				model.put("msg", "success");
			}else {
				model.put("msg", "failed");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			model.put("msg", "error");
		}
		
		return mapper.writeValueAsString(model);
	}
}