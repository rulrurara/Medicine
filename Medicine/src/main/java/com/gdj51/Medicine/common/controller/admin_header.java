package com.gdj51.Medicine.common.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.gdj51.Medicine.common.dao.IACDao;

@Controller
public class admin_header {
	@Autowired
	public IACDao dao;
	
	@RequestMapping(value = "/AdminImport")
	public ModelAndView AdminImport(
			HttpSession session,HttpServletResponse response,
			ModelAndView mav) throws IOException {
		mav.setViewName("common/admin_header");
		
		response.setContentType("text/html; charset=UTF-8");
		
		return mav;
		
	}

}
