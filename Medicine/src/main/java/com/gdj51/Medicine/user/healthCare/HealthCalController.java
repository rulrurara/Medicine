package com.gdj51.Medicine.user.healthCare;

import java.io.PrintWriter;
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
public class HealthCalController {
	@Autowired
	public IACDao iACDao;
	@Autowired
	public IPagingService ips;
	@RequestMapping(value= "/MedihealthCal")
	public ModelAndView MediLogin(
			HttpSession session,HttpServletResponse response,
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable {
		if(session.getAttribute("sMemNum") == null || session.getAttribute("sMemNum") == "") {
			response.setContentType("text/html; charset=UTF-8");
			
			  PrintWriter out = response.getWriter();
			  out.println("<script language='javascript'>");
			  out.println("alert('로그인이 필요한 서비스입니다.')");
			  out.println("</script>");
			  out.flush();

			mav.setViewName("common/login");
		}else {
			int page = 1;
			if (params.get("page") != null && params.get("page") != "") {
				page = Integer.parseInt(params.get("page"));
			}
			int page1 = 1;
			if (params.get("page1") != null && params.get("page1") != "") {
				page1 = Integer.parseInt(params.get("page1"));
			}
			mav.addObject("page", page);
			mav.addObject("page1", page1);
			mav.setViewName("userPage/healthCare/healthCare_takeCal");
		}
		return mav;
	}
	
	/* 검색했을때 블럭들과 사용자가 등록한 블럭들 */
	@RequestMapping(value = "/healthCalAjax/{gbn}", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")

	@ResponseBody
	public String healthCalAjax(
			@PathVariable String gbn,
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		int cntt= 0;
		try {
			switch(gbn) {
			case "select" : 
				
			    int cnt = iACDao.getInt("healthInfo.getResultBlockCnt2", params);
			    HashMap<String, Integer> pd =
			    ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 4, 5);
			    params.put("start1", Integer.toString(pd.get("start"))); 
			    params.put("end1",Integer.toString(pd.get("end")));
			    
			    int cnt2 = iACDao.getInt("calendar.getPillCnt", params);
			    HashMap<String, Integer> pd2 =
			    		ips.getPagingData(Integer.parseInt(params.get("page1")), cnt2, 3, 4);
			    params.put("start", Integer.toString(pd2.get("start"))); 
			    params.put("end",Integer.toString(pd2.get("end")));
			    
			    
				List<HashMap<String, String>> list = iACDao.getList("healthInfo.getResultBlock2", params);
				List<HashMap<String, String>> listCal = iACDao.getList("calendar.getPill", params);
				model.put("list", list);
				model.put("listCal", listCal);
				model.put("pd", pd);
				model.put("pd2", pd2);
				break;
			case "update" : cntt = iACDao.update("calendar.productUpdate",params);
				break;
				
			}
			if(cntt>0) {
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
	
	@RequestMapping(value = "/healthPillAjax/{gbn}", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")

	@ResponseBody
	public String healthPillAjax(
			@PathVariable String gbn,
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		int cntt= 0;
		try {
			switch(gbn) {
			case "insert" :
			int cnt = iACDao.getInt("calendar.pillCnt",params);
			if(cnt > 0 ) {
				cntt = iACDao.update("calendar.pillUpdate",params);				
			}else {
				cntt = iACDao.insert("calendar.pillInsert",params);				
			}
				break;
			case "delete" :
				int cnt2 = iACDao.getInt("calendar.pillCnt2",params);
				if(cnt2 > 1) {
					cntt = iACDao.update("calendar.pillDeleteUpdate",params);
				}else {
					cntt = iACDao.delete("calendar.pillDelete",params);					
				}
				break;
			case "select" :	
				List<HashMap<String, String>> list = iACDao.getList("calendar.getCalPill", params);
				model.put("list",list);
			break;
				
			}
			if(cntt>0) {
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
	
	@RequestMapping(value = "/healthCalMemo/{gbn}", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")

	@ResponseBody
	public String healthCalMemo(
			@PathVariable String gbn,
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		int cnt = 0;
		try {
			switch(gbn) {
			case "update" :
			 cnt = iACDao.update("calendar.MemoUpdate",params);
			 	if(cnt>0) {
					model.put("msg","success");
				}else {
					model.put("msg","fail");
				}
				break;
			case "select1" :	
				HashMap<String, String> list = iACDao.getMap("calendar.getMemoInfo", params);
				model.put("list",list);

			case "select2" :	
				List<HashMap<String, String>> list2 = iACDao.getList("calendar.getMemoList", params);
				model.put("list2",list2);
			break;
				
			}
	
			
		} 
		catch (Exception e) {
			e.printStackTrace();
			model.put("msg" , "error");
		}
	
		
		return mapper.writeValueAsString(model);
	}
}
