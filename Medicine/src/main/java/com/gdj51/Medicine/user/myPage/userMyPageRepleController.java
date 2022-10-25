package com.gdj51.Medicine.user.myPage;

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
public class userMyPageRepleController {
	@Autowired
	public IACDao iACDao;
	
	@Autowired
	public IPagingService ips;
	
	
	@RequestMapping(value = "/MyPageReple")
	public ModelAndView MyPage(@RequestParam HashMap<String, String> params, HttpSession session,
			HttpServletResponse response, ModelAndView mav) throws Throwable {
		
		if (session.getAttribute("sMemNum") == null || session.getAttribute("sMemNum") == "") {
			response.setContentType("text/html; charset=UTF-8");

			PrintWriter out = response.getWriter();
			out.println("<script language='javascript'>");
			out.println("alert('로그인이 필요한 서비스입니다.')");
			out.println("</script>");
			out.flush();

			mav.setViewName("common/login");
		} else {
			int page=1;
			if(params.get("page") != null && params.get("page") != "") {
				page = Integer.parseInt(params.get("page"));
			}
			mav.addObject("page" , page);
			params.put("memNum", String.valueOf(session.getAttribute("sMemNum")));
		
			mav.setViewName("userPage/myPage/mypage_myComment");
		}
		return mav;
	}
	
	@RequestMapping(value = "/mypageReple/{gbn}", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")

	@ResponseBody
	public String mypageReple(
			@PathVariable String gbn,
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			switch(gbn) {
			case "select1" : 
				
			    int cnt = iACDao.getInt("mypage_reple.getFreeRepleCnt", params);
			    HashMap<String, Integer> pd =
			    ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 10, 9);
			    params.put("start", Integer.toString(pd.get("start"))); 
			    params.put("end",Integer.toString(pd.get("end")));
			    
			    
				List<HashMap<String, String>> list = iACDao.getList("mypage_reple.getFreeRepleCntList", params);
				model.put("list", list);
				model.put("pd", pd);
				break;
			case "select2" : 
			    int cntt = iACDao.getInt("mypage_reple.getRevRepleCnt", params);
			    HashMap<String, Integer> pd2 =
			    ips.getPagingData(Integer.parseInt(params.get("page")), cntt, 10, 9);
			    params.put("start", Integer.toString(pd2.get("start"))); 
			    params.put("end",Integer.toString(pd2.get("end")));
			    
			    
				List<HashMap<String, String>> list2 = iACDao.getList("mypage_reple.getRevRepleCntList", params);
				model.put("list", list2);
				model.put("pd", pd2);
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
