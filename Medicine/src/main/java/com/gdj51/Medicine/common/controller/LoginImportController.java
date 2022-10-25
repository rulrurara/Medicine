package com.gdj51.Medicine.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.gdj51.Medicine.common.dao.IACDao;

@Controller
public class LoginImportController {
	@Autowired
	public IACDao dao;
	
	@RequestMapping(value = "/ComImport")
	public ModelAndView ComImport(ModelAndView mav) {
		mav.setViewName("common/common");
		return mav;
	}
}
