package com.gdj51.Medicine.user.board;

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
import com.gdj51.Medicine.common.service.IPagingService;

@Controller
public class FreeController {
	@Autowired 
	public IACDao iACDao;
	
	@Autowired
	public IPagingService ips;
	
	@RequestMapping(value="/MediFreeList")
	public ModelAndView MediFreeList(
			@RequestParam HashMap<String, String>params,
			ModelAndView mav) throws Throwable {
		int page=1;
		if(params.get("page") != null && params.get("page") != "") {
			page = Integer.parseInt(params.get("page"));
		}
		//카테고리 목록 취득
		mav.addObject("page" , page);
		mav.setViewName("userPage/board/free");
		return mav;
	}
	
	@RequestMapping(value="/MediFreeAjax",
			method= RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MediFreeAjax(
			@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper= new ObjectMapper();
		
		Map<String, Object> model = new HashMap<String,Object>();
		
		int cnt = iACDao.getInt("free.getFreeCnt",params);
		HashMap<String , Integer>pd 
		= ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 10 ,5);
		params.put("start" , Integer.toString(pd.get("start")));
		params.put("end" , Integer.toString(pd.get("end")));
		List<HashMap<String,String>> list = iACDao.getList("free.getFreeList",params);
		model.put("list",list);
		model.put("pd", pd);
		
		return mapper.writeValueAsString(model);
	}
	@RequestMapping(value="/MediFreeWrite")
	public ModelAndView MediFreeWrite(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable {
			mav.setViewName("userPage/board/freeWrite");
		return mav;
	}
	@RequestMapping(value="/FreeAction/{gbn}",
			method= RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String ATAction(
			@PathVariable String gbn,
			@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper= new ObjectMapper();
		 
		Map<String, Object> model = new HashMap<String,Object>();
		int cnt = 0;
		try {
			switch(gbn) {
			case "insert" : cnt = iACDao.insert("free.freeInsert" , params); 
				break;
			case "update" : cnt = iACDao.update("free.freeUpdate" , params);
				break;
			case "delete" : cnt = iACDao.update("free.freeDelete" , params);
				break;
			}
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
	@RequestMapping(value="/MediFreeDetail")
	public ModelAndView aTDetail(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable {
		if(params.get("num") != null && params.get("num") !="") {
			//조회수
			iACDao.update("free.updateFreeHit",params);
		HashMap<String,String> data = iACDao.getMap("free.getFreeDetail",params);
		int cnt = iACDao.getInt("free.getRepleCnt",params);
		mav.addObject("cnt", cnt);
		mav.addObject("data", data);
		mav.setViewName("userPage/board/freeDetail");
		}else {
			mav.setViewName("redirect:MediFreeList");
		}
		
		return mav;
	}
	@RequestMapping(value="/MediFreeUpdate")
	public ModelAndView aTUpdate(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable {
		if(params.get("num") != null && params.get("num") !="") {
		HashMap<String,String> data = iACDao.getMap("free.getFreeDetail",params);
		mav.addObject("data", data);
		mav.setViewName("userPage/board/freeUpdate");
		}else {
		mav.setViewName("redirect:MediFreeList");
		}
		
		return mav;
	}
	
	@RequestMapping(value="/FreeRepleAjax",
			method= RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String FreeRepleAjax(
			@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper= new ObjectMapper();
		 
		Map<String, Object> model = new HashMap<String,Object>();
		
		try {
			int cnt = iACDao.getInt("free.getRepleCnt",params);
			HashMap<String , Integer>pd 
			= ips.getPagingData(Integer.parseInt(params.get("page1")), cnt, 5 ,5);
			params.put("start" , Integer.toString(pd.get("start")));
			params.put("end" , Integer.toString(pd.get("end")));
			List<HashMap<String,String>> list = iACDao.getList("free.getFreeReple",params);
			model.put("list",list);	
			model.put("pd",pd);	
		} 
		catch (Exception e) {
			e.printStackTrace();
			model.put("msg" , "error");
		}
		return mapper.writeValueAsString(model);
	}
	
	@RequestMapping(value = "/freeRepleAction/{gbn}",
			method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String freeRepleAction(
			@PathVariable String gbn,
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();
		int cnt = 0;
		try {
			switch (gbn) {
			case "insert":
				cnt = iACDao.insert("free.freeRepleInsert", params);
				break;
			case "update":
				cnt = iACDao.update("free.freeRepleUpdate", params);
				break;
			case "delete":
				cnt = iACDao.update("free.freeRepleDelete", params);
				break;
			}
			if (cnt > 0) {
				model.put("msg", "success");
			} else {
				model.put("msg", "fail");
			}
		} catch (Exception e) {
			e.printStackTrace();
			model.put("msg", "error");
		}
		return mapper.writeValueAsString(model);
	}
}
