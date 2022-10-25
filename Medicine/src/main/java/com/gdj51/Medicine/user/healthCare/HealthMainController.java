package com.gdj51.Medicine.user.healthCare;

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
public class HealthMainController {
	
	@Autowired
	public IACDao iACDao;
	
	@RequestMapping(value="MediHealthMain")
	public ModelAndView MediHealthMain(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable {
		
		List<HashMap<String, String>> list = iACDao.getList("healthmain.getHealthMainPic", params);
		mav.addObject("list",list);
		mav.setViewName("userPage/healthCare/health-main");
		return mav;
	}
	
	
	@RequestMapping(value = "/healthMainAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")

	@ResponseBody
	public String healthMainAjax(
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			List<HashMap<String, String>> list = iACDao.getList("healthmain.getHealthMainPic", params);
			model.put("list",list);
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		return mapper.writeValueAsString(model);
	}

}
