package com.gdj51.Medicine.admin.postMgt;

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
public class admin_postMgt_FreeController {

	@Autowired
	public IACDao dao;
	
	@Autowired
	public IPagingService ips;
	
	@RequestMapping(value = "/AFreeList")
	public ModelAndView AFreeList(
			@RequestParam HashMap<String, String> params,
			ModelAndView mav) throws Throwable{
		int page = 1;
		
		if(params.get("page") != null && params.get("page") != "") {
			page = Integer.parseInt(params.get("page"));
		}
		
		mav.addObject("page", page);
		
		mav.setViewName("adminPage/postMgt/postMgt_Free");
		
		return mav;
	}
	
	 @RequestMapping(value="/AFreeListAjax",
	         method = RequestMethod.POST,
	         produces = "text/json;charset=UTF-8")
	 @ResponseBody
	 public String AFreeListAjax(@RequestParam HashMap<String, String> params) throws Throwable{
		 ObjectMapper mapper = new ObjectMapper();
		 
		 Map<String, Object> model = new HashMap<String, Object>();
		 
		 int cnt = dao.getInt("Free.getAdminFreeCnt", params);
		 
		 HashMap<String, Integer> pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 10, 5);
		 
		 params.put("start", Integer.toString(pd.get("start")));
		 params.put("end", Integer.toString(pd.get("end")));
		 
		 List<HashMap<String, String>> list = dao.getList("Free.getAdminFreeList", params);
		 
		 model.put("list", list);
		 model.put("pd", pd);
		 
		 return mapper.writeValueAsString(model);
	 }
	
	 @RequestMapping(value = "/AFreeInfo")
		public ModelAndView AFreeInfo(
				@RequestParam HashMap<String, String> params,
				ModelAndView mav) throws Throwable{
			
			if(params.get("no") != null && params.get("no") != "") {
				// 조회수
				dao.update("Free.AFreeHit",params);
				HashMap<String,String> data = dao.getMap("Free.getAFee",params);
				mav.addObject("data", data);
				mav.setViewName("adminPage/postMgt/postMgt_Free_info");
			}else {
				mav.setViewName("redirect.AFreeList");
			}
			return mav;
		}
		@RequestMapping(value = "/AFAction/{gbn}", 
				method = RequestMethod.POST, 
				produces = "text/json;charset=UTF-8")
		@ResponseBody
		public String AFAction(
				@PathVariable String gbn,
				@RequestParam HashMap<String, String> params) throws Throwable{
			ObjectMapper mapper = new ObjectMapper();
			
			Map<String, Object> model = new HashMap<String, Object>();
			
			
			 int cnt = 0;
		      try {
		    	  switch(gbn){
		    	  case "del" :
		    		  String[] delete = params.get("checkdel").split(",");
						cnt = dao.update("Free.delete", params);
		    		break;
		    	  case "infodel" :
		    		  cnt = dao.update("Free.infodel", params);
			      }
		    	  if(cnt > 0) {
		    		  model.put("msg", "success");
		    	  }else {
		    		  model.put("msg", "fail");
		    	  }
		      }catch (Exception e){
		    	  e.printStackTrace();
		    	  model.put("msg", "error");
		      }
			
			return mapper.writeValueAsString(model);
		}
	 
}
