package com.gdj51.Medicine.user.compareMedicine;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
public class CompareController {

	@Autowired
	public IACDao iACDao;

	@Autowired
	public IPagingService ips;

	@RequestMapping(value = "/MediCompare")
	public ModelAndView compare(@RequestParam HashMap<String, String> params, ModelAndView mav) throws Throwable {

		int page = 1;
		if (params.get("page") != null && params.get("page") != "") {
			page = Integer.parseInt(params.get("page"));
		}
		mav.addObject("page", page);
		mav.setViewName("userPage/compareMedicine/compare");
		return mav;
	}
	
	/* resultblock */
	@RequestMapping(value = "/acompareAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")

	@ResponseBody
	public String acompareAjax(
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		int cnt = iACDao.getInt("compare.getResultBlockCnt", params);
		HashMap<String, Integer> pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 4, 5);
		params.put("start", Integer.toString(pd.get("start")));
		params.put("end", Integer.toString(pd.get("end")));

		Map<String, Object> model = new HashMap<String, Object>();

		List<HashMap<String, String>> list = iACDao.getList("compare.getResultBlock", params);

		model.put("list", list);
		model.put("pd", pd);
		
		return mapper.writeValueAsString(model);
	}
	
	/* 체크버튼 눌렀을 때 팝업창 */
	@RequestMapping(value = "/comparePopupAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")

	@ResponseBody
	public String comparePopupAjax(
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		if(params.get("healthFunFoodNum") != null && params.get("healthFunFoodNum")!= "") {
			HashMap<String, String> data = iACDao.getMap("compare.getPopupSearch",params);
			List<HashMap<String, String>> data2 = iACDao.getList("compare.getFunc", params);
			List<HashMap<String, String>> data3 = iACDao.getList("compare.getNut", params);
			List<HashMap<String, String>> data4 = iACDao.getList("compare.getForm", params);

			model.put("data", data);
			model.put("data2", data2);
			model.put("data3", data3);
			model.put("data4", data4);
		}
		return mapper.writeValueAsString(model);
	}

}
