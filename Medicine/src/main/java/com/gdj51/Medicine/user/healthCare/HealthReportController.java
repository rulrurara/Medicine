package com.gdj51.Medicine.user.healthCare;

import java.io.PrintWriter;
import java.util.ArrayList;
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
public class HealthReportController {
	@Autowired
	public IPagingService ips;
	@Autowired 
	public IACDao iACDao;
	@RequestMapping(value="/MediHealthReport")
	public ModelAndView MediFreeList(
			@RequestParam HashMap<String, String>params,
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
		params.put("memnum",String.valueOf(session.getAttribute("sMemNum")));
		HashMap<String,String> data = iACDao.getMap("report.getBmiReport",params);
		mav.addObject("data",data);
		mav.setViewName("userPage/healthCare/health-report");

		}
		return mav;
	}
	@RequestMapping(value="/MediReportBmiAjax",
			method= RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MediReportAjax(HttpSession session,
			@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper= new ObjectMapper();
		params.put("memnum",String.valueOf(session.getAttribute("sMemNum")));
		Map<String, Object> model = new HashMap<String,Object>();

		List<HashMap<String,String>> data1 = iACDao.getList("report.getBmiGraph1",params);
		List<HashMap<String,String>> data2 = iACDao.getList("report.getBmiGraph2",params);
		List<HashMap<String,String>> data3 = iACDao.getList("report.getBmiGraph3",params);
		List<HashMap<String,String>> data4 = iACDao.getList("report.getBmiGraph4",params);
		
		String[] str = new String[data1.size()];
		String[] str2 = new String[data3.size()];
		float [] strr = new float[data2.size()];
		float [] strr2 = new float[data4.size()];
		for(int row=0;row<data1.size();row++) {
			str[row] = data1.get(row).get("D").toString();
			System.out.println("배열 = " + str[row]);
		}
		for(int row=0;row<data2.size();row++) {
			strr[row] =  Float.parseFloat(String.valueOf(data2.get(row).get("BMI")));
			System.out.println("배열 = " + strr[row]);
		}
		for(int row=0;row<data3.size();row++) {
			str2[row] = data3.get(row).get("D").toString();
			System.out.println("배열 = " + str2[row]);
		}
		for(int row=0;row<data4.size();row++) {
			strr2[row] =  Float.parseFloat(String.valueOf(data4.get(row).get("BMII")));
			System.out.println("배열 = " + strr2[row]);
		}

		model.put("data1",str);
		model.put("data2",strr);
		model.put("data3",str2);
		model.put("data4",strr2);

		
		return mapper.writeValueAsString(model);
	}
	
	@RequestMapping(value="/MediReportDrugAjax",
			method= RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MediReportDrugAjax(HttpSession session,
			@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper= new ObjectMapper();
		params.put("memnum",String.valueOf(session.getAttribute("sMemNum")));
		Map<String, Object> model = new HashMap<String,Object>();
		
		List<HashMap<String,String>> list = iACDao.getList("report.getDrugList",params);
		
		for(int i = 0 ; i<list.size(); i++) {
			params.put("number"+i , String.valueOf(list.get(i).get("HEALTH_FUN_FOOD_NUM")));
		}
		
		List<List<HashMap<String,String>>> list2 = new ArrayList<List<HashMap<String,String>>>();
		List<List<HashMap<String,String>>> list3 = new ArrayList<List<HashMap<String,String>>>();
		
		for(int i = 0 ; i<list.size(); i++) {
			list2.add(iACDao.getList("report.getDrugList2",params.get("number"+i)));
		}

		for(int i = 0 ; i<list.size(); i++) {
			list3.add(iACDao.getList("report.getDrugList3",params.get("number"+i)));
		}

		System.out.println("ewqewwwwwwwwwq"+ list2);
		System.out.println("ewqeq"+ list3);
		
		model.put("list",list);
		model.put("list2",list2);
		model.put("list3",list3);
		return mapper.writeValueAsString(model);
	}
	
	@RequestMapping(value="/MediReportVitAjax",
			method= RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MediReportVitAjax(HttpSession session,
			@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper= new ObjectMapper();
		params.put("memnum",String.valueOf(session.getAttribute("sMemNum")));
		Map<String, Object> model = new HashMap<String,Object>();
	
		List<HashMap<String,String>> list = iACDao.getList("report.getVitList1",params);
		List<HashMap<String,String>> list2 = iACDao.getList("report.getVitList2",params);

		model.put("list",list);
		model.put("list2",list2);

		return mapper.writeValueAsString(model);
	}
	
	
	@RequestMapping(value = "/healthReportCalAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")

	@ResponseBody
	public String healthReportCalAjax(
		
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			
			    int cnt2 = iACDao.getInt("calendar.getPillCnt", params);
			    HashMap<String, Integer> pd2 =
			    		ips.getPagingData(Integer.parseInt(params.get("page1")), cnt2, 5, 2);
			    params.put("start", Integer.toString(pd2.get("start"))); 
			    params.put("end",Integer.toString(pd2.get("end")));
				List<HashMap<String, String>> listCal = iACDao.getList("calendar.getPill", params);
				model.put("listCal", listCal);
				model.put("pd2", pd2);
		
		} 
		catch (Exception e) {
			e.printStackTrace();
			model.put("msg" , "error");
		}
	
		
		return mapper.writeValueAsString(model);
	}
}
