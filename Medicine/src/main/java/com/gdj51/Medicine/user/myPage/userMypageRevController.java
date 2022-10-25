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
public class userMypageRevController {
	@Autowired
	public IACDao iACDao;
	
	@Autowired
	public IPagingService ips;
	
	
	@RequestMapping(value = "/MyPageReview")
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
		
			mav.setViewName("userPage/myPage/mypage_myReview");
		}
		return mav;
	}

	
	
	@RequestMapping(value = "/mypageReviewAjax", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")

	@ResponseBody
	public String mypageReple(
		
			@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			    int cnt = iACDao.getInt("mypage_review.getReviewCnt", params);
			    HashMap<String, Integer> pd =
			    ips.getPagingData(Integer.parseInt(params.get("page")), cnt, 8, 5);
			    params.put("start", Integer.toString(pd.get("start"))); 
			    params.put("end",Integer.toString(pd.get("end")));
				List<HashMap<String, String>> list = iACDao.getList("mypage_review.getReviewList", params);
				model.put("list", list);
				model.put("pd", pd);
	
		} 
		catch (Exception e) {
			e.printStackTrace();
			model.put("msg" , "error");
		}
		return mapper.writeValueAsString(model);
	}
	
	@RequestMapping(value= "revUpdateTitleAjax",
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String revUpdateTitleAjax(@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();

		try {
			List<HashMap<String, String>> titleList = iACDao.getList("mypage_review.getReviewTitle", params);
			HashMap<String, String> revCon = iACDao.getMap("mypage_review.getRevCon", params);

			model.put("revTitleList", titleList);
			model.put("getRevCon", revCon);
		} catch (Exception e) {
			e.printStackTrace();
			model.put("msg" , "error");
		}
		
		
		return mapper.writeValueAsString(model);
	}
	
	@RequestMapping(value= "UDfuncAjax/{gbn}",
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String UDfuncAjax(@PathVariable String gbn,@RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		
		String[] effectArr = params.get("effect_arr").split(",");
		String[] effectNum = params.get("effectNum").split(",");
		String[] effectScore = params.get("effect_score_arr").split(",");
		
		
		String[] seffectArr = params.get("seffect_arr").split(",");
		String[] seffectNum = params.get("seffectNum").split(",");
		String[] seffectScore = params.get("seffect_score_arr").split(",");
		//기타효과
		String[] effectArr2 = params.get("effect_Name2").split(",");
		String[] effectScore2 = params.get("effectNum2").split(",");
		//기타 부작용
		String[] seffectArr2 = params.get("seffect_Name2").split(",");
		String[] seffectScore2 = params.get("seffectNum2").split(",");
		
		//내용
		String revCon = params.get("revCon");
		try {
			int cnt = 0;
		
			switch(gbn) {
			case "update" :
				if(!effectArr[0].isEmpty()) {
					for(int row=0;row<effectArr.length;row++) {
						params.put("effect_arr", effectArr[row]);
						params.put("effectNum", effectNum[row]);
						params.put("effectScore", effectScore[row]);
						cnt = iACDao.insert("mypage_review.updateRevEffect", params);
					}
				}
				if(!seffectArr[0].isEmpty()) {
					for(int row=0;row<seffectArr.length;row++) {
						params.put("seffect_arr", seffectArr[row]);
						params.put("seffectNum", seffectNum[row]);
						params.put("seffectScore", seffectScore[row]);
						cnt = iACDao.insert("mypage_review.updateRevSEffect", params);
					}
				}
				if(!effectArr2[0].isEmpty()) {
					for(int row=0;row<effectArr2.length;row++) {
						params.put("effectArr2", effectArr2[row]);
						params.put("effectScore2", effectScore2[row]);
						cnt = iACDao.insert("mypage_review.updateRevEffect_etc", params);
					}
				}
				if(!seffectArr2[0].isEmpty()) {
					for(int row=0;row<seffectArr2.length;row++) {
						params.put("seffectArr2", seffectArr2[row]);
						params.put("seffectScore2", seffectScore2[row]);
						cnt = iACDao.insert("mypage_review.updateRevSEffect_etc", params);
					}
				}
				params.put("revCon", revCon);
				cnt = iACDao.update("mypage_review.updateRevCon", params);
				
				break;
			case "delete" :
				cnt = iACDao.delete("mypage_review.deleteRev", params);
				break;
			
		}
			if(cnt > 0) {
				model.put("msg", "success");
			} else {
				model.put("msg", "failed");
			}
			
		}	
			catch (Exception e) {
			e.printStackTrace();
			model.put("msg" , "error");
		}
		
		
		return mapper.writeValueAsString(model);
	}
	//수정, 삭제
	@RequestMapping(value = "revUpdate/{gbn}/{effectGbn}",
					method = RequestMethod.POST,
					produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String revUpdate(@RequestParam HashMap<String, String> params,
							@PathVariable String gbn, @PathVariable String effectGbn) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		
		int cnt = 0;
		try {
			switch(gbn) {
			case "update" :
				
				break;
			case "delete" :
					switch(effectGbn) {
						case "effect" :
							if(Integer.parseInt(params.get("effectDelNum")) > 0) {
								cnt = iACDao.delete("mypage_review.deleteEffect", params);
							}						
							break;
						case "seffect" :
							if(Integer.parseInt(params.get("effectDelNum")) > 0) {
								cnt = iACDao.delete("mypage_review.deleteSEffect", params);
							}
							break;
						case "etc_effect" :
								cnt = iACDao.delete("mypage_review.delete_etc_Effect", params);
							break;
						case "etc_seffect" :
								cnt = iACDao.delete("mypage_review.delete_etc_SEffect", params);
							break;
					}
					
				break;
			}
			
			if(cnt > 0) {
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
