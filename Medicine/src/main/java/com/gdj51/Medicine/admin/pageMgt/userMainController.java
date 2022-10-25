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
public class userMainController {
	@Autowired
	public IACDao dao;
	
	@RequestMapping(value = "mainPage")
	public ModelAndView userMain(ModelAndView mav) {
		mav.setViewName("adminPage/pageMgt/MainPage");
		
		return mav;
	}
	
	@RequestMapping(value = "/mainList", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String mainList(@RequestParam HashMap<String, String> params) throws Throwable{
		
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String, Object> model = new HashMap<String, Object>();
		
		List<HashMap<String, String>> list = dao.getList("main.mainList",params);
		
		model.put("list", list);
		
		return mapper.writeValueAsString(model);
	}
	
	
	@RequestMapping(value = "mainPageDetail")
	public ModelAndView mainPageDetail(ModelAndView mav , @RequestParam HashMap<String, String> params)throws Throwable {
		
		HashMap<String, String> data = dao.getMap("main.mainDetail",params);
		
		mav.addObject("data", data);
		
		mav.setViewName("adminPage/pageMgt/MainPage_Info");
		
		return mav;
	}
	@RequestMapping(value = "/mainAction/{gbn}", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String mainAction(@PathVariable String gbn, @RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();
		
		int cnt = 0;
		try {
			switch (gbn) {
			case "update":
				cnt = dao.update("main.mainUpdate", params);
				break;
			}
			if(cnt > 0) {
				model.put("msg", "success");
			}
			else {
				model.put("msg", "failed");
			}
		}catch (Exception e) {
			e.printStackTrace();
			model.put("msg", "error");
		}
		
		
		return mapper.writeValueAsString(model);
	}
		
}