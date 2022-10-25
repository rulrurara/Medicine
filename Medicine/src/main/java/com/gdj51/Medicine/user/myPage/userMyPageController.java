package com.gdj51.Medicine.user.myPage;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
import com.gdj51.Medicine.util.Utils;

@Controller
public class userMyPageController {
	@Autowired
	public IACDao dao;
	
	@Autowired
	public IPagingService ips;
	
	@Autowired
	public JavaMailSender mailSender;
	
	@RequestMapping(value = "/MyPage")
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
			params.put("memNum", String.valueOf(session.getAttribute("sMemNum")));
			/*
			 * params.put("memId",String.valueOf(session.getAttribute("sMemId")));
			 * params.put("memPw",String.valueOf(session.getAttribute("sMemPw")));
			 * params.put("memPhone",String.valueOf(session.getAttribute("sMemPhone")));
			 * params.put("memEmail",String.valueOf(session.getAttribute("sMemEmail")));
			 */
			mav.setViewName("userPage/myPage/mypage_main");
		}
		return mav;
	}
	//마이페이지 - 리뷰 상세보기
	@RequestMapping(value ="/mypageRevUpdate")
	public ModelAndView mypageRevUpdate(ModelAndView mav) {
		
		mav.setViewName("userPage/myPage/mypage_myReviewDetail");
		
		return mav;
	}
	
	
	

	@RequestMapping(value = "/PwAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String ALoginAjax(@RequestParam HashMap<String, String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();

		// 암호화
		params.put("today_pw", Utils.encryptAES128(params.get("today_pw")));
		params.put("main_pw", Utils.encryptAES128(params.get("main_pw")));

			 if(session.getAttribute("sMemPw").equals(params.get("today_pw")) ) {
				 dao.update("mem.pwUpdate",params);
				 model.put("msg", "success");
			 }
			 else {
				 model.put("msg", "failed");
			 }
		
		return mapper.writeValueAsString(model);

	}
	@RequestMapping(value = "/upDateAction/{gbn}", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String upDateAction(@PathVariable String gbn, @RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		int cnt = 0;

		try {
			switch (gbn) {
			case "update":
				cnt = dao.update("mem.phoneUpdate", params);
				break;
			case "emailUpdate":
				cnt = dao.update("mem.emailUpdate", params);
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
	// 이메일 변경 인증
	@ResponseBody
	@RequestMapping(value="member/emailAuth", method = RequestMethod.POST,
					produces = "text/json;charset=UTF-8")
	public String emailAuth(String user_Email, @RequestParam HashMap<String, String> params) throws Throwable {		
		Random random = new Random();
		int checkNum = random.nextInt(888888) + 111111;
		System.out.println("email = " + user_Email);
		/* 이메일 보내기 */
        String setFrom = "chals862@gmail.com";
        String toMail = user_Email;
        String title = "이메일 변경 인증 이메일 입니다.";
        String content = 
                "구디아카데미 51기 보건팀 프로젝트 이메일 변경 인증번호입니다." +
                "<br><br>" + 
                "인증 번호는 <b style='color:blue;'>" + checkNum + "</b> 입니다." + 
                "<br>" + 
                "해당 인증번호를 인증번호 확인란에 기입하여 이메일 변경을 완료해주세요.";
        
       int cnt = 0;
       int cur = 0;
       
        
       params.put("checkNum", Integer.toString(checkNum));
        
        try {
        	cur = dao.getInt("mail.seqSele", params);//값을 INSERT하기 위한 NEXTVAL
        	params.put("current",Integer.toString(cur));
        	cnt = dao.insert("mail.email_Cert",params);//인증번호 테이블 값 넣기
        	
        	
        	MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setFrom(setFrom);
            helper.setTo(toMail);
            helper.setSubject(title);
            helper.setText(content,true);
            mailSender.send(message);
            
      
            
        }catch(Exception e) {
            e.printStackTrace();
        }
        return Integer.toString(checkNum);
	}
	@ResponseBody
	@RequestMapping(value = "member/certAuth", method = RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	public String certAuth(@RequestParam HashMap<String, String> params) throws Throwable {
		int cur = 0; 
		int confirm = 0; 
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>(); 
		
    	
    	try {
    		cur = dao.getInt("mail.seqSele2", params);//값을 INSERT하기 위한 NEXTVAL
        	params.put("current",Integer.toString(cur));
        	
        	confirm = dao.getInt("mail.seqCurr", params);
        	
		} catch (Exception e) {
			e.printStackTrace();
		}
    	//System.out.println("certCode = " + params.get("certCode"));
    	//System.out.println("current = " + params.get("current"));
    	if(confirm > 0) {
    		model.put("msg", "success");
  
    	} else {
    		model.put("msg", "failed");
    	}
    	return mapper.writeValueAsString(model);
	}
	
	@RequestMapping(value = "/MyPageAnswer")
	public ModelAndView MyPageAnswer(ModelAndView mav,HttpServletResponse response, HttpSession session)throws Throwable{
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
			mav.setViewName("userPage/myPage/mypage_myAnswer");
		}
		
		return mav;
	}
	@RequestMapping(value = "/answerList", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String answerList(@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String, Object> model = new HashMap<String, Object>();
		
		int cnt = dao.getInt("answer.pageCnt",params);
		HashMap<String, Integer> pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt , 5 ,5);
		
		params.put("start" , Integer.toString(pd.get("start")));
		params.put("end", Integer.toString(pd.get("end")));
		
		List<HashMap<String, String>> list = dao.getList("answer.List",params);
		
		model.put("list", list);
		model.put("pd", pd);
		
		return mapper.writeValueAsString(model);
	}
	@RequestMapping(value = "/MyPageAnswerDetail")
	public ModelAndView MyPageAnswerDetail(ModelAndView mav ,@RequestParam HashMap<String, String> params)throws Throwable{
		
		HashMap<String, String> data = dao.getMap("answer.detail",params);
		mav.addObject("data", data);
		mav.setViewName("userPage/myPage/mypage_myAnswerDetail");
		
		return mav;
	}
	@RequestMapping(value = "/answerAction/{gbn}", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String answerAction(@PathVariable String gbn, @RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		int cnt = 0;

		try {
			switch (gbn) {
			case "update":
				cnt = dao.update("answer.update", params);
				break;
			case "delete":
				cnt = dao.delete("answer.delete",params);
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
	@RequestMapping(value = "/MyPagePost")
	public ModelAndView MyPagePost(ModelAndView mav ,@RequestParam HashMap<String, String> params)throws Throwable{
		
		mav.setViewName("userPage/myPage/mypage_myPost");
		
		return mav;
	}
	@RequestMapping(value = "/bbList", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String bbList(@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String, Object> model = new HashMap<String, Object>();
		
		int cnt = dao.getInt("post.postCnt",params);
		HashMap<String, Integer> pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt , 5 ,5);
		
		params.put("start" , Integer.toString(pd.get("start")));
		params.put("end", Integer.toString(pd.get("end")));
		
		List<HashMap<String, String>> list = dao.getList("post.List",params);
		
		model.put("list", list);
		model.put("pd",pd);
		return mapper.writeValueAsString(model);
	}
	@RequestMapping(value = "/MyPagePostDetail")
	public ModelAndView MyPagePostDetail(ModelAndView mav ,@RequestParam HashMap<String, String> params)throws Throwable{
		
		mav.setViewName("userPage/myPage/mypage_myPostDetail");
		
		return mav;
	}


}
