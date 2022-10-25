package com.gdj51.Medicine.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class testController {
	
	
	@RequestMapping(value="testtest")
	public ModelAndView testtest(ModelAndView mav) {
		mav.setViewName("userPage/healthCare/health-main");
		return mav;
	}
}