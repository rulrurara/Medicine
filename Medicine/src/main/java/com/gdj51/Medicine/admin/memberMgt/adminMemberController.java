package com.gdj51.Medicine.admin.memberMgt;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;

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
public class adminMemberController {
	@Autowired
	public IACDao dao;

	@Autowired
	public IPagingService ips;

	@RequestMapping(value = "memberMgtList")
	public ModelAndView memberMgtList(ModelAndView mav) {

		mav.setViewName("adminPage/memberMgt/memberMgt");
		return mav;
	}

	@RequestMapping(value = "/memberList", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String memberList(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		
		int cnt = dao.getInt("mem.memCnt", params);
		HashMap<String, Integer> pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 10, 5);

		params.put("start", Integer.toString(pd.get("start")));
		params.put("end", Integer.toString(pd.get("end")));

		List<HashMap<String, String>> list = dao.getList("mem.memList", params);

		model.put("list", list);
		model.put("pd", pd);

		return mapper.writeValueAsString(model);
	}
	@RequestMapping(value ="/memDetail")
	public ModelAndView memDetail(ModelAndView mav , @RequestParam HashMap<String, String> params) throws Throwable{
		if(params.get("no") != null && params.get("no") != "") {
			System.out.println("no");
			HashMap<String, String> data = dao.getMap("mem.memDetail",params);
			
			mav.addObject("data", data);
			
			mav.setViewName("adminPage/memberMgt/memberMgt_info");
		}
		else {
			mav.setViewName("redirect:memberMgtList");
		}
		
		return mav;
	}
	@RequestMapping(value = "memInsert")
	public ModelAndView MemberInsert(ModelAndView mav) {
		mav.setViewName("adminPage/memberMgt/memberMgt_info_enroll");
		return mav;
	}
	@RequestMapping(value = "/memberAction/{gbn}", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MedicineAction(@PathVariable String gbn, @RequestParam HashMap<String, String> params) throws Throwable {
		
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String, Object> model = new HashMap<String, Object>();
		int cnt =0;
		try{
			switch(gbn) {
			case "insert":
				cnt = dao.insert("mem.memberInsert", params);
				break;
			case "sujeong":
				cnt = dao.update("mem.memberUpdate", params);
				break;
			case "update":
				cnt = dao.update("mem.memberDelete", params);
				break;
			}
			if(cnt > 0) {
				model.put("msg", "success");
			}
			else {
				model.put("msg", "failed");
			}
		}catch (Exception e) {
			e.printStackTrace();
			model.put("msg", "error");
		}
		return mapper.writeValueAsString(model);
	}
	@RequestMapping(value = "memsujeong")
	public ModelAndView memsujeong(ModelAndView mav , @RequestParam HashMap<String, String> params) throws Throwable{
			
		if(params.get("no") != null && params.get("no") != "") {
			System.out.println("no");
			
			HashMap<String, String> data = dao.getMap("mem.memsujeong",params);
			
			mav.addObject("data", data);
			
			mav.setViewName("adminPage/memberMgt/memberMgt_info_sujeong");
		}
		else {
			mav.setViewName("redirect:memberMgtList");
		}
		
		
		
		
		return mav;
	}
}
