package com.gdj51.Medicine.admin.healthFoodMgt;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
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
public class adminHealthFoodController {
	@Autowired
	public IACDao dao;
	@Autowired
	public IPagingService ips;
	
	@RequestMapping(value = "healthFoodMgtList")
	public ModelAndView healthFoodMgtList(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) {
		int page = 1;
		if(params.get("page") != null && params.get("page") != "") {
			page = Integer.parseInt(params.get("page"));
		}
		mav.addObject("page", page);
		
		mav.setViewName("adminPage/healthFoodMgt/healthFoodMgtList");
		return mav;
	}
	
	@RequestMapping(value = "/healthFoodListAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String healthFoodListAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		int cnt = dao.getInt("healthFood.gethealthFoodCnt", params); 

		HashMap<String, Integer> pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 10, 5);

		params.put("start", Integer.toString(pd.get("start")));
		params.put("end", Integer.toString(pd.get("end"))); 

		List<HashMap<String, String>> list = dao.getList("healthFood.gethealthFoodList", params);
		List<HashMap<String, String>> list2 = dao.getList("healthFood.gethealthFoodList2", params);

		model.put("list", list);
		model.put("list2", list2);
		model.put("pd", pd);
		return mapper.writeValueAsString(model);

	}

	@RequestMapping(value = "/healthFoodEnrollListAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String healthFoodEnrollListAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		List<HashMap<String, String>> list = dao.getList("healthFood.ListHFFU", params);
		List<HashMap<String, String>> listt = dao.getList("healthFood.ListHFN", params);
		List<HashMap<String, String>> fig = dao.getList("healthFood.ListHFN", params);
		List<HashMap<String, String>> listtt = dao.getList("healthFood.ListHFUnit", params);
		
		model.put("list", list);
		model.put("listt", listt);
		model.put("listtt", listtt);
		model.put("fig", fig);
		return mapper.writeValueAsString(model);

	}
	
	@RequestMapping(value = "/healthFoodInfo")
	public ModelAndView healthFoodInfo(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable{
		
		if(params.get("no") != null && params.get("no") != "") {
			HashMap<String, String> data = dao.getMap("healthFood.getHF", params);
			
			mav.addObject("data", data);
			
			mav.setViewName("adminPage/healthFoodMgt/healthFoodMgt_info");
		}else {
			mav.setViewName("redirect.healthFoodMgtList");
		}
		return mav;
	}
	
	@RequestMapping(value = "/healthFoodInfoListAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String healthFoodInfoListAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();
		
		int cnt = dao.getInt("healthFood.getHFNCnt", params); 

		HashMap<String, Integer> pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 3, 5);

		params.put("start", Integer.toString(pd.get("start")));
		params.put("end", Integer.toString(pd.get("end")));

		List<HashMap<String, String>> list = dao.getList("healthFood.getHFFU", params);
		List<HashMap<String, String>> list1 = dao.getList("healthFood.getHFN", params);
		List<HashMap<String, String>> list2 = dao.getList("healthFood.getHFS", params);

		model.put("list", list);
		model.put("list1", list1);
		model.put("list2", list2);
		model.put("pd", pd);
		return mapper.writeValueAsString(model);

	}
	
	@RequestMapping(value = "/healthFoodMgtenroll")
	public ModelAndView healthFoodMgtenroll(@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable {
		
		// 카테고리 목록 취득
		List<HashMap<String,String>> shape = dao.getList("healthFood.ListHFS", params);
		List<HashMap<String,String>> unit = dao.getList("healthFood.ListHFUnit", params);
		List<HashMap<String,String>> com = dao.getList("healthFood.ListCOM", params);
				
		mav.addObject("shape", shape);
		mav.addObject("unit", unit);
		mav.addObject("com", com);
				
		mav.setViewName("adminPage/healthFoodMgt/healthFoodMgt_info_enroll");
		
		return mav;
	}
	
	@RequestMapping(value = "/HFAction/{gbn}", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String HFAction(
			@PathVariable String gbn,
			@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String, Object> model = new HashMap<String, Object>();
		
		
		 int cnt = 0;
	      try {
	    	  switch(gbn){
	    	  case "insert" : 
		    		  String[] funcarr;
		    		  funcarr = params.get("num").split(",");
		    		  String[] nutarr;
		    		  nutarr = params.get("num1").split(",");
		    		  String[] figarr;
		    		  figarr = params.get("fig").split(",");
		    		// 시퀀스 의 NEXTVAL 번호 취득
						int sc = dao.getInt("healthFood.selectNum");
						// num 이라는 hashmap 생성
						HashMap<String, String> num = new HashMap<String, String>();
						params.put("numnum", Integer.toString(sc));
						num.put("numnum", Integer.toString(sc));
						//의약품 인서트
						cnt = dao.insert("healthFood.insert",params);
						//의약품 - 효과 중계테이블 인서트
						for(int i=0 ;i<funcarr.length; i++) {
							//반복문으로 넣어줌 해쉬맵은 키값 같으면 덮어씌움
							num.put("funcarr",funcarr[i]);				
							dao.insert("healthFood.insert2",num);					
						}
						for(int i=0 ;i<nutarr.length; i++) {
							num.put("nutarr",nutarr[i]);				
							num.put("fig",figarr[i]);				
							dao.insert("healthFood.insert3",num);					
						}
						break;
	    	  case "nutinsert" : 
	    		  String[] nutnm2 = params.get("nut_nm").split(",");
	    		  String[] unit1 = params.get("unit").split(",");
	    		  String[] gbn1 = params.get("gbn").split(",");
	    		  String[] min1 = params.get("min").split(",");
	    		  String[] max1 = params.get("max").split(",");
	    		  for(int i = 0; i < nutnm2.length; i++) {
	  				params.put("nut_nm",nutnm2[i]);
	  				params.put("unit",unit1[i]);
	  				params.put("gbn",gbn1[i]);
	  				params.put("min",min1[i]);
	  				params.put("max",max1[i]);
	  				cnt = dao.insert("healthFood.nutinsert", params);
	    		  }
				  break;
	    	  case "cominsert" : 
	    		String[] comarr = params.get("com").split(",");
	    		for(int i = 0; i < comarr.length; i++) {
	    			params.put("com",comarr[i]);
	    		  	cnt = dao.insert("healthFood.cominsert", params);
	    		}
	    		  	break;
	    	  case "funcinsert" : 
	    		  String[] funcarr1 = params.get("func").split(",");
	    		  String[] picarr = params.get("pic").split(",");
	    		  for(int i = 0; i < funcarr1.length; i++) {
	    			  params.put("func",funcarr1[i]);
	    			  params.put("pic",picarr[i]);
	    			  cnt = dao.insert("healthFood.funcinsert", params);
	    		  }
	    		  break;
	    	  case "del" :
	    		  String[] delete = params.get("checkdel").split(",");
					cnt = dao.update("healthFood.delete", params);
	    		break;
	    	  case "update" :
	    		  cnt = dao.insert("healthFood.update",params);
	    		  // num 이라는hashmap 생성
					HashMap<String, String> Num = new HashMap<String, String>();
					
					model.put("hfmid", Num);
					
					Num.put("numnum", params.get("numnum"));
					
					// 의약품 인서트
					dao.delete("healthFood.funcdel", params);
					dao.delete("healthFood.nutdel", params);
					
					
					if(params.get("num") != "") {
			    		  String[] Funcarr;
			    		  Funcarr = params.get("num").split(",");
					//의약품 - 효과 중계테이블 인서트
					for(int i=0 ;i<Funcarr.length; i++) {
						//반복문으로 넣어줌 해쉬맵은 키값 같으면 덮어씌움
						Num.put("funcarr",Funcarr[i]);				
						dao.insert("healthFood.insert2",Num);					
						}
					}
					if(params.get("num1") != "") {
			    		  String[] Nutarr;
			    		  Nutarr = params.get("num1").split(",");
			    		  String[] Figarr;
			    		  Figarr = params.get("fig").split(",");
					for(int i=0 ;i<Nutarr.length; i++) {
						Num.put("nutarr",Nutarr[i]);				
						Num.put("fig",Figarr[i]);				
						dao.insert("healthFood.insert3",Num);					
						}
					}
					break;
		      }
	    	  if(cnt > 0) {
	    		  model.put("msg", "success");
	    	  }else {
	    		  model.put("msg", "fail");
	    	  }
	      }catch (Exception e){
	    	  e.printStackTrace();
	    	  model.put("msg", "error");
	      }
		
		return mapper.writeValueAsString(model);
	}
	
	@RequestMapping(value = "/healthFoodMgtsujeong")
	public ModelAndView memAUpdate(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable{
		
		 if(params.get("no") != null && params.get("no") != "") {
			 
			HashMap<String, String> data = dao.getMap("healthFood.getHF", params);
			
			Map<String, Object> model = new HashMap<String, Object>();
			
			List<HashMap<String, String>> funcList = dao.getList("healthFood.funcList", params);
			List<HashMap<String, String>> nutList = dao.getList("healthFood.nutList", params);
			List<HashMap<String, String>> figList = dao.getList("healthFood.figList", params);
			
			mav.addObject("funcList", funcList);
			mav.addObject("nutList", nutList);
			mav.addObject("figList", figList);
			mav.addObject("data", data);
			
			// 카테고리 목록 취득
			List<HashMap<String,String>> shape = dao.getList("healthFood.ListHFS", params);
			List<HashMap<String,String>> com = dao.getList("healthFood.ListCOM", params);
					
			mav.addObject("shape", shape);
			mav.addObject("com", com);
			
			mav.setViewName("adminPage/healthFoodMgt/healthFoodMgt_info_sujeong");
		}else {
			mav.setViewName("redirect.healthFoodMgtList");
		} 
		return mav;
	}
	
	@RequestMapping(value = "/healthFoodUpdateListAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String healthFoodUpdateListAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		List<HashMap<String, String>> list = dao.getList("healthFood.ListHFFU", params);
		List<HashMap<String, String>> listt = dao.getList("healthFood.ListHFN", params);
		List<HashMap<String, String>> fig = dao.getList("healthFood.ListHFN", params);
		List<HashMap<String, String>> listtt = dao.getList("healthFood.ListHFUnit", params);
		
		model.put("list", list);
		model.put("listt", listt);
		model.put("listtt", listtt);
		model.put("fig", fig);
		return mapper.writeValueAsString(model);

	}
	
}

	

