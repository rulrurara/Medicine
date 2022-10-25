package com.gdj51.Medicine.user.healthCare;

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
public class HealthInfoController {

	@Autowired
	public IACDao iACDao;
	
	@Autowired
	public IPagingService ips;
	
	@RequestMapping(value = "/MediHealthInfo")
	public ModelAndView MediHealthInfo(@RequestParam HashMap<String, String> params,
			HttpSession session, HttpServletResponse response,
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
			int page = 1;
			if (params.get("page") != null && params.get("page") != "") {
				page = Integer.parseInt(params.get("page"));
			}
			
			params.put("memNum",String.valueOf(session.getAttribute("sMemNum")));
			HashMap<String,String> data = iACDao.getMap("healthInfo.wgthgt",params);
			
			mav.addObject("page", page);
			mav.addObject("data", data);
			
			mav.setViewName("userPage/healthCare/healthInfo");
		}
		return mav;
	}
	
	/* 검색했을때 블럭들과 사용자가 등록한 블럭들 */
	@RequestMapping(value = "/healthInfoAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")

	@ResponseBody
	public String healthInfoAjax(
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		System.out.println("********************a" + params);
		
	    int cnt = iACDao.getInt("healthInfo.getResultBlockCnt1", params);
	    HashMap<String, Integer> pd =
	    ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 4, 5);
	    params.put("start", Integer.toString(pd.get("start"))); 
	    params.put("end",Integer.toString(pd.get("end")));
		
		int cnt2 = iACDao.getInt("healthInfo.getResultBlockCnt2", params);
		HashMap<String, Integer> pd2 = ips.getPagingData(Integer.parseInt(params.get("page1")), cnt2, 4, 5);
		params.put("start1", Integer.toString(pd2.get("start")));
		params.put("end1", Integer.toString(pd2.get("end")));

		Map<String, Object> model = new HashMap<String, Object>();

		List<HashMap<String, String>> list = iACDao.getList("healthInfo.getResultBlock1", params);
		List<HashMap<String, String>> list2 = iACDao.getList("healthInfo.getResultBlock2", params);

		model.put("list", list);
		model.put("list2", list2);
		model.put("pd", pd);
		model.put("pd2", pd2);
		
		return mapper.writeValueAsString(model);
	}
	
	/* 체크했을때 팝업창 */
	@RequestMapping(value = "/healthInfoPopupAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")

	@ResponseBody
	public String healthInfoPopupAjax(
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		System.out.println("********************b" + params);

		Map<String, Object> model = new HashMap<String, Object>();

		if(params.get("healthFunFoodNum") != null && params.get("healthFunFoodNum")!= "") {
			try {
				HashMap<String, String> data = iACDao.getMap("healthInfo.getPopupSearch",params);
				model.put("data", data);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return mapper.writeValueAsString(model);
	}
	
	/* 건강기능식품 등록 */
	@RequestMapping(value = "/healthInfoInsertAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String healthInfoInsertAjax(
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		System.out.println("********************c" + params);
		Map<String, Object> model = new HashMap<String, Object>();
		int count=1;
		try {
			count = iACDao.getInt("healthInfo.selectBlock",params);
			System.out.println("***************count=" + count);
			if(count>0) {
				int cnt1= 1;
				cnt1 = iACDao.update("healthInfo.updateBlock",params);
				System.out.println("***************cnt1=" + cnt1);
				if(cnt1>0) {
					model.put("msg","success");
				}else {
					model.put("msg","fail");
				}
			}else {
				int cnt= 1;
				cnt = iACDao.insert("healthInfo.insertBlock",params);
				System.out.println("***************cnt=" + cnt);
				if(cnt>0) {
					model.put("msg","success");
				}else {
					model.put("msg","fail");
				}
			}
		} 
		catch (Exception e) {
			e.printStackTrace();
			model.put("msg" , "error");
		}
		return mapper.writeValueAsString(model);
	}
	
	/* 건강기능식품 삭제 */
	@RequestMapping(value = "/healthInfoDeleteAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String healthInfoDeleteAjax(
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		System.out.println("********************d" + params);
		Map<String, Object> model = new HashMap<String, Object>();
		int cnt= 1;
		try {
			cnt = iACDao.update("healthInfo.deleteBlock",params);
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
	
	/* 키, 몸무게, BMI 등록 */
	@RequestMapping(value = "/healthInfoInsert2Ajax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String healthInfoInsert2Ajax(
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		System.out.println("****************BMI" + params);
		int cnt= 1;
		try {
			cnt = iACDao.insert("healthInfo.insertBMI",params);
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
	
	
}
