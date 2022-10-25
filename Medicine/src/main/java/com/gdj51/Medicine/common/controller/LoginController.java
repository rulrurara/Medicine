package com.gdj51.Medicine.common.controller;

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
import com.gdj51.Medicine.util.Utils;

@Controller
public class LoginController {
	@Autowired
	public IACDao iACDao;
	@Autowired
	public JavaMailSender mailSender;
	@RequestMapping(value= "/MediLogin")
	public ModelAndView MediLogin(
			HttpSession session,HttpServletResponse response,
			ModelAndView mav) throws Throwable {
		if(session.getAttribute("sMemNum") != null && session.getAttribute("sMemNum") != "") {
			response.setContentType("text/html; charset=UTF-8");
			
			  PrintWriter out = response.getWriter();
			  out.println("<script language='javascript'>");
			  out.println("alert('이미 로그인 중입니다.')");
			  out.println("</script>");
			  out.flush();
			
			mav.setViewName("userPage/userMain");
		}else {
			mav.setViewName("common/login");
		}
		return mav;
	}
	@RequestMapping(value= "/LoginAjax",
			method = RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String LoginAjax(
			HttpSession session,
			@RequestParam HashMap<String,String> params) throws Throwable{
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String , Object> model = new HashMap<String,Object>(); 
		//암호화 * static이라서 Autowired 안해도 Utils의 메서드를 가져올 수 있음!
		params.put("pw", Utils.encryptAES128(params.get("pw")));
		//System.out.println(params.get("pw"));
		//복호화
		//System.out.println(Utils.decryptAES128(params.get("pw")));
	
		
		HashMap<String, String> data = iACDao.getMap("login.checkMen", params);
		if(data != null) {
			session.setAttribute("sMemNum", data.get("MEM_NUM"));
			session.setAttribute("sMemNm", data.get("NM"));
			session.setAttribute("sMemCode", data.get("AUTHOR_CODE"));
			session.setAttribute("sMemBirth", data.get("BIRTH"));
			session.setAttribute("sMemId", data.get("ID"));
			session.setAttribute("sMemPw", data.get("PW"));
			session.setAttribute("sMemPhone", data.get("PHONE"));
			session.setAttribute("sMemEmail", data.get("EMAIL"));
			model.put("msg","success");
		}else {
			model.put("msg","failed");
		}
		return mapper.writeValueAsString(model);
	}
	@RequestMapping(value= "/MediLogout")
	public ModelAndView testAHeader(
			HttpSession session,
			ModelAndView mav) {
		session.invalidate();
		mav.setViewName("redirect:MediMain");
		
		return mav;
	}
	@RequestMapping(value= "/MediLoginFind")
	public ModelAndView MediLoginFind(
			HttpSession session,HttpServletResponse response,
			ModelAndView mav) throws Throwable {
		if(session.getAttribute("sMemNum") != null && session.getAttribute("sMemNum") != "") {
			response.setContentType("text/html; charset=UTF-8");
			
			  PrintWriter out = response.getWriter();
			  out.println("<script language='javascript'>");
			  out.println("alert('이미 로그인 중입니다.')");
			  out.println("</script>");
			  out.flush();
			
			mav.setViewName("userPage/userMain");
		}else {
			mav.setViewName("common/findlogin");
		}
		return mav;
	}
	@RequestMapping(value= "/LoginEmailAjax/{gbn}",
			method = RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String LoginEmailAjax(
			@PathVariable String gbn,
			String userEmail,
			@RequestParam HashMap<String,String> params) throws Throwable{
		ObjectMapper mapper = new ObjectMapper();
		Map<String , Object> model = new HashMap<String,Object>(); 
		
       try {
    	   switch (gbn) {
			case "email":
				Random random = new Random();
				int checkNum = random.nextInt(888888) + 111111;
				/* 이메일 보내기 */
				String setFrom = "chals862@gmail.com";
				String toMail = userEmail;
				String title = "아이디/비밀번호 찾기 인증 이메일 입니다.";
				String content = 
						"구디아카데미 51기 보건팀 프로젝트 아이디/비밀번호 찾기 인증번호입니다." +
								"<br><br>" + 
								"인증 번호는 <b style='color:blue;'>" + checkNum + "</b> 입니다." + 
								"<br>" + 
								"해당 인증번호를 인증번호 확인란에 기입하여 아이디/비밀번호찾기를 완료해주세요.";
		       	MimeMessage message = mailSender.createMimeMessage();
		           MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
		           helper.setFrom(setFrom);
		           helper.setTo(toMail);
		           helper.setSubject(title);
		           helper.setText(content,true);
		           mailSender.send(message);
				
				int cnt = 0;
				int cur = 0;	
				params.put("checkNum", Integer.toString(checkNum));	
				cur = iACDao.getInt("mail.seqSel", params);//값을 INSERT하기 위한 NEXTVAL
				params.put("current",Integer.toString(cur));
				cnt = iACDao.insert("mail.emailCert",params);//인증번호 테이블 값 넣기
				model.put("cur", cur);
				model.put("email2",params.get("userEmail"));
				break;
			case "cert":				
				int confirm = 0;
				confirm = iACDao.getInt("login.cert", params);
				if (confirm > 0) {
					model.put("msg", "success");
					HashMap<String , String> data = iACDao.getMap("login.getId",params);
					data.put("PW" , Utils.decryptAES128(data.get("PW")));
					model.put("idpw", data);
				} else {
					model.put("msg", "fail");
				}
				break;

			}

       }catch(Exception e) {
           e.printStackTrace();
       }
		
		

		return mapper.writeValueAsString(model);
	}
	@RequestMapping(value= "/LoginFindAjax",
			method = RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String LoginFindAjax(
			@RequestParam HashMap<String,String> params) throws Throwable{
		ObjectMapper mapper = new ObjectMapper();
		Map<String , Object> model = new HashMap<String,Object>(); 
		

		
		int cntt= 0;
		int cnt = 0;
       try {
    	   cnt = iACDao.getInt("login.getEmailCnt",params);
    	   System.out.println("cnt =  " + cnt);
	   		if(params.get("id") == null || params.get("id") == "") {
	   			if(cnt>=1){
	   				HashMap<String,String> data = iACDao.getMap("login.getNm",params);
	   				//자바에서 문자열 비교할 때는 이렇게
	   				if(data.get("NM").equals(params.get("userNm"))) {
	   					model.put("msg","success");
	   				}
	   				else {
	   					model.put("msg","NmFail");
	   				}
	   			}
	   			else {
	   				model.put("msg","EmailFail");
	   			}
			}
	   		else {
	   			cntt = iACDao.getInt("login.getIdCnt",params);
	   			if(cnt>=1 && cntt>=1) {
	   				HashMap<String,String> data2 = iACDao.getMap("login.getNm2",params);
	   				if(data2.get("NM").equals(params.get("userNm"))) {
	   					model.put("msg","success");
	   				}
	   				else {
	   					model.put("msg","NmFail2");
	   				}
	   			}
	   			else {
	   				model.put("msg","IdEmailFail");
	   			}
	   		}
           
       }catch(Exception e) {
           e.printStackTrace();
       }
		
		

		return mapper.writeValueAsString(model);
	}
	

}
