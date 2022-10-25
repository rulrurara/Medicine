package com.gdj51.Medicine.admin.postMgt;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
public class admin_postMgt_FAQController {
	@Autowired
	public IACDao dao;
	
	@Autowired
	public IPagingService ips;
	
	@RequestMapping(value = "/AFAQList")
	public ModelAndView AFAQList(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable{
		int page = 1;
		
		if(params.get("page") != null && params.get("page") != "") {
			page = Integer.parseInt(params.get("page"));
		}
		
		mav.addObject("page", page);
		
		mav.setViewName("adminPage/postMgt/postMgt_FAQ");
		
		return mav;
	}
	
	 @RequestMapping(value="/AFAQListAjax",
	         method = RequestMethod.POST,
	         produces = "text/json;charset=UTF-8")
	 @ResponseBody
	 public String AFAQListAjax(@RequestParam HashMap<String, String> params) throws Throwable{
		 ObjectMapper mapper = new ObjectMapper();
		 
		 Map<String, Object> model = new HashMap<String, Object>();
		 
		 int cnt = dao.getInt("FAQ.getAdminFreeCnt", params);
		 
		 HashMap<String, Integer> pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 10, 5);
		 
		 params.put("start", Integer.toString(pd.get("start")));
		 params.put("end", Integer.toString(pd.get("end")));
		 
		 List<HashMap<String, String>> list = dao.getList("FAQ.getAdminFAQList", params);
		 
		 model.put("list", list);
		 model.put("pd", pd);
		 
		 return mapper.writeValueAsString(model);
	 }
	 
	 @RequestMapping(value = "/AFAQInfo")
		public ModelAndView AFreeInfo(
				@RequestParam HashMap<String, String> params,
				ModelAndView mav) throws Throwable{
			
			if(params.get("no") != null && params.get("no") != "") {
				HashMap<String,String> data = dao.getMap("FAQ.getAFAQ",params);
				mav.addObject("data", data);
				mav.setViewName("adminPage/postMgt/postMgt_FAQ_info");
			}else {
				mav.setViewName("redirect.AFAQList");
			}
			return mav;
		}
	 @RequestMapping(value = "/AFAQInsert")
		public ModelAndView memAInsert(@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable{
		 
			
			List<HashMap<String,String>> gbn = dao.getList("FAQ.ListGBN", params);
			
			mav.addObject("gbn", gbn);
			
			mav.setViewName("adminPage/postMgt/postMgt_FAQ_info_enroll");
			
			return mav;
		}
		
		@RequestMapping(value = "/AFAQAction/{gbn}", 
				method = RequestMethod.POST, 
				produces = "text/json;charset=UTF-8")
		@ResponseBody
		public String AFAQAction(
				@PathVariable String gbn,
				@RequestParam HashMap<String, String> params) throws Throwable{
			ObjectMapper mapper = new ObjectMapper();
			
			Map<String, Object> model = new HashMap<String, Object>();
			
			 int cnt = 0;
		      try {
		    	  switch(gbn){
		    	  case "insert" : 
		    		  cnt = dao.insert("FAQ.AFAQInsert", params);
		    		  break;
		    	  case "delete" : 
		    		  cnt = dao.insert("FAQ.delete", params);
		    		  break;
		    	  case "update" : 
		    		  cnt = dao.insert("FAQ.update", params);
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
		
		@RequestMapping(value = "/AFAQUpdate")
		public ModelAndView AFAQUpdate(
				@RequestParam HashMap<String, String> params,
				ModelAndView mav) throws Throwable{
			
			if(params.get("no") != null && params.get("no") != "") {
				
				List<HashMap<String,String>> gbn = dao.getList("FAQ.ListGBN", params);
				HashMap<String, String> data = dao.getMap("FAQ.getAFAQ", params);
				
				mav.addObject("data", data);				
				mav.addObject("gbn", gbn);
				
				mav.setViewName("adminPage/postMgt/postMgt_FAQ_info_sujeong");
			}else {
				mav.setViewName("redirect.AFAQList");
			}
			return mav;
		}
}
