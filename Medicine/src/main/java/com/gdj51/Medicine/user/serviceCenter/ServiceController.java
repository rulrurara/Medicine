package com.gdj51.Medicine.user.serviceCenter;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gdj51.Medicine.common.dao.IACDao;
import com.gdj51.Medicine.common.service.IPagingService;

@Controller
public class ServiceController {
	@Autowired 
	public IACDao iACDao;
	@Autowired
	public IPagingService ips;
	@RequestMapping(value="/MediServiceQna")
	public ModelAndView MediServiceQna(
			@RequestParam HashMap<String, String>params,
			HttpServletResponse response,
			HttpSession session,
			ModelAndView mav) throws Throwable {
		
		if(session.getAttribute("sMemNum") == null || session.getAttribute("sMemNum") == "") {
			response.setContentType("text/html; charset=UTF-8");
			
			  PrintWriter out = response.getWriter();
			  out.println("<script language='javascript'>");
			  out.println("alert('로그인이 필요한 서비스입니다.')");
			  out.println("</script>");
			  out.flush();

			mav.setViewName("common/login");
		}
		else {
			
			params.put("memnum", String.valueOf(session.getAttribute("sMemNum")));
			HashMap<String,String> data = iACDao.getMap("service.selectServiceQna",params);
			mav.addObject("data" , data);
			mav.setViewName("userPage/serviceCenter/QNA");
		}
		return mav;
	}
	@RequestMapping(value="/MediServiceAjax",
			method= RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MediFreeAjax(
			@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper= new ObjectMapper();
		System.out.println("aaaaaaaaaaaaaaaaaaa" + params);
		int cnt= 1;
		Map<String, Object> model = new HashMap<String,Object>();
		try {
			cnt = iACDao.insert("service.insertServiceQna",params);
			if(cnt>0) {
				model.put("msg","success");
			}else {
				model.put("msg","fail");
			}
		} 
		catch (Exception e) {
			e.printStackTrace();
			model.put("msg" , "error");
		}
		return mapper.writeValueAsString(model);
	}
	@RequestMapping(value="/MediServiceFaq")
	public ModelAndView MediServiceFaq(
			@RequestParam HashMap<String, String>params,
			ModelAndView mav) throws Throwable {
		int page=1;
		if(params.get("page") != null && params.get("page") != "") {
			page = Integer.parseInt(params.get("page"));
		}
		mav.addObject("page" , page);
		mav.setViewName("userPage/serviceCenter/FAQ");
		return mav;
	}
	
	@RequestMapping(value="/MediFAQAjax",
			method= RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MediFAQAjax(
			@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper= new ObjectMapper();
		Map<String, Object> model = new HashMap<String,Object>();
		int cnt = iACDao.getInt("service.getServiceCnt");
		System.out.println("ewewewee" + params.get("page"));
		HashMap<String , Integer>pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 10 ,5);
		params.put("start" , Integer.toString(pd.get("start")));
		params.put("end" , Integer.toString(pd.get("end")));
		List<HashMap<String,String>> list = iACDao.getList("service.selectFaqList",params);
		model.put("list",list);
		model.put("pd", pd);
		return mapper.writeValueAsString(model);
	}
	
}
