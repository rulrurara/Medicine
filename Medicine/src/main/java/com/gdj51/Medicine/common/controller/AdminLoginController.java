package com.gdj51.Medicine.common.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gdj51.Medicine.common.dao.IACDao;
import com.gdj51.Medicine.util.Utils;

@Controller
public class AdminLoginController {
	@Autowired
	public IACDao iACDao;
	@Autowired
	public JavaMailSender mailSender;
	@RequestMapping(value= "/AdminLogin")
	public ModelAndView MediLogin(
			HttpSession session,HttpServletResponse response,
			ModelAndView mav) throws IOException {
		if(session.getAttribute("sMemNum") != null && session.getAttribute("sMemNum") != "") {
			response.setContentType("text/html; charset=UTF-8");
			
			  PrintWriter out = response.getWriter();
			  out.println("<script language='javascript'>");
			  out.println("alert('이미 로그인 중입니다.')");
			  out.println("</script>");
			  out.flush();
			
			mav.setViewName("adminPage/memberMgt/memberMgt");
		}else {
			mav.setViewName("common/admin_Login");
		}
		return mav;
	}
	@RequestMapping(value= "/AdminLoginAjax",
			method = RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String LoginAjax(
			HttpSession session,
			@RequestParam HashMap<String,String> params) throws Throwable{
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String , Object> model = new HashMap<String,Object>(); 
		//암호화 * static이라서 Autowired 안해도 Utils의 메서드를 가져올 수 있음!
		params.put("pw", Utils.encryptAES128(params.get("pw")));
		//System.out.println(params.get("pw"));
		//복호화
		//System.out.println(Utils.decryptAES128(params.get("pw")));
	
		
		HashMap<String, String> data = iACDao.getMap("login.admincheckMen", params);
		
		if(data != null) {
			session.setAttribute("sMemNum", data.get("MEM_NUM"));
			session.setAttribute("sMemNm", data.get("NM"));
			session.setAttribute("sMemCode", data.get("AUTHOR_CODE"));
			model.put("msg","success");
		}else {
			model.put("msg","failed");
		}
		return mapper.writeValueAsString(model);
	}

	
	  @RequestMapping(value= "/memberMgt") 
	  public ModelAndView testAMain(ModelAndView mav) { 
		  mav.setViewName("adminPage/memberMgt/memberMgt");
	  
		  return mav; 
	  }
	 
	@RequestMapping(value= "/AdminLogout")
	public ModelAndView testAHeader(
			HttpSession session,
			ModelAndView mav) {
		session.invalidate();
		mav.setViewName("redirect:AdminLogin");
		
		return mav;
	}
}
