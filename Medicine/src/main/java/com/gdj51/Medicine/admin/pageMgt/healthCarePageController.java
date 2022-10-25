package com.gdj51.Medicine.admin.pageMgt;

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

@Controller
public class healthCarePageController {
	@Autowired
	public IACDao dao;
	
	@RequestMapping(value = "AHCPList")
	public ModelAndView AHCPList(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) {

		int page = 1;
		
		if(params.get("page") != null && params.get("page") != "") {
			page = Integer.parseInt(params.get("page"));
		}

		mav.addObject("page", page);

		mav.setViewName("adminPage/pageMgt/HealthCarePage");
		return mav;
	}
	
	@RequestMapping(value = "/AhcpListAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String AhcpListAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		List<HashMap<String, String>> list = dao.getList("ahcp.getAhcpList", params);

		model.put("list", list);
		return mapper.writeValueAsString(model);

	}
	
	@RequestMapping(value = "/AHCPInsert")
	public ModelAndView memAInsert(ModelAndView mav) {
		
		mav.setViewName("adminPage/pageMgt/HealthCarePage_info_enroll");
		
		return mav;
	}
	
	@RequestMapping(value = "/AHCPAction/{gbn}", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String AHCPAction(
			@PathVariable String gbn,
			@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String, Object> model = new HashMap<String, Object>();
		
		 int cnt = 0;
	      try {
	    	  switch(gbn){
	    	  case "insert" : 
	    		  cnt = dao.insert("ahcp.AhcpInsert", params);
	    		  break;
	    	  case "delete" : 
	    		  cnt = dao.update("ahcp.AhcpDelete", params);
	    		  break;
	    	  case "update" : 
	    		  cnt = dao.update("ahcp.AhcpUpdate", params);
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
	
	@RequestMapping(value = "/AHCPDetail")
	public ModelAndView AHCPDetail(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable{
		
		if(params.get("no") != null && params.get("no") != "") {
			
			HashMap<String, String> data = dao.getMap("ahcp.getAhcp", params);
			
			mav.addObject("data", data);
			
			mav.setViewName("adminPage/pageMgt/HealthCarePage_info");
		}else {
			mav.setViewName("redirect.AHCPList");
		}
		return mav;
	}
	
	@RequestMapping(value = "/AHCPUpdate")
	public ModelAndView AHCPUpdate(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable{
		
		if(params.get("no") != null && params.get("no") != "") {
			
			HashMap<String, String> data = dao.getMap("ahcp.getAhcp", params);
			
			mav.addObject("data", data);
			
			mav.setViewName("adminPage/pageMgt/HealthCarePage_info_sujeong");
		}else {
			mav.setViewName("redirect.AHCPList");
		}
		return mav;
	}
}
