package com.gdj51.Medicine.user.main;

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
public class userMainPageController {
	@Autowired
	public IACDao dao;
	@Autowired
	public IPagingService ips;

	@RequestMapping(value = "/MediMain")
	public ModelAndView testAMain(ModelAndView mav) {
		mav.setViewName("userPage/userMain");

		return mav;
	}

	@RequestMapping(value = "/userMainList", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String userMainList(@RequestParam HashMap<String, String> params) throws Throwable {

		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		List<HashMap<String, String>> list = dao.getList("main.mainList", params);

		model.put("list", list);

		return mapper.writeValueAsString(model);
	}

	@RequestMapping(value = "/MediMainDetail")
	public ModelAndView MediMainDetail(ModelAndView mav, @RequestParam HashMap<String, String> params)
			throws Throwable {

		HashMap<String, String> data = dao.getMap("main.mainDetail", params);

		mav.addObject("data", data);

		mav.setViewName("userPage/mainDetail");

		return mav;
	}

	@RequestMapping(value = "/userrepList", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String userrepList(@RequestParam HashMap<String, String> params) throws Throwable {

		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		int cnt = dao.getInt("main.repCnt", params);
		HashMap<String, Integer> pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 5, 5);

		params.put("start", Integer.toString(pd.get("start")));

		params.put("end", Integer.toString(pd.get("end")));

		List<HashMap<String, String>> rep = dao.getList("main.repList", params);

		model.put("replist", rep);

		model.put("pd", pd);

		return mapper.writeValueAsString(model);
	}
	@RequestMapping(value = "/REPAction/{gbn}", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String REPAction(@PathVariable String gbn, @RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		int cnt = 0;

		try {
			switch (gbn) {
			case "insert":
				cnt = dao.insert("main.insert", params);
				break;
			case "update":
				cnt = dao.update("main.update", params);
				break;
			case "delete":
				cnt = dao.update("main.delete", params);
				break;

			}
			if (cnt > 0) {
				model.put("msg", "success");
			} else {
				model.put("msg", "failed");
			}
		} catch (Exception e) {
			e.printStackTrace();
			model.put("msg", "error");
		}
		return mapper.writeValueAsString(model);
	}
	
}
