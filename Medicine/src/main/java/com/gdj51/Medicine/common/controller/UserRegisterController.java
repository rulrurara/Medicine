package com.gdj51.Medicine.common.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gdj51.Medicine.common.dao.IACDao;
import com.gdj51.Medicine.util.Utils;
/*
 * 회원가입은 추가만
 * */
@Controller
public class UserRegisterController {
	@Autowired
	public IACDao iACDao;
	@Autowired
	public JavaMailSender mailSender;
	
	//민호꺼
	@RequestMapping(value = "memReg")
	public ModelAndView memReg(ModelAndView mav) {
		mav.setViewName("userPage/register"); 
		return mav; 
	}
	
	//회원가입 - 액션 컨트롤러
	@RequestMapping(value = "/memAction/{flag}",
					method = RequestMethod.POST,
					produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String memAction(@PathVariable String flag,
							@RequestParam HashMap<String, String> params) throws Throwable {
		int cnt = 0;
		
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>(); 
		
		//아이디 중복확인
		int data = iACDao.getInt("mem.idChk",params);
		//중복X
		if(data == 0) {
			model.put("msg1","idFailed");
		//증복O
		}else {
			model.put("msg1","idSuccess");
		}
		
		
		//비밀번호 암호화
		try {
			if(flag.equals("reg")) {
				//params.put("userPw", Utils.encryptAES128(params.get("userPw")));
				cnt = iACDao.insert("");
			}
			if(cnt > 0) {
				model.put("msg","success");
			} else {
				model.put("msg","failed");
			}
		} catch (Exception e) {
			e.printStackTrace();
			model.put("msg", "error");
		}
		return mapper.writeValueAsString(model);
	}
	
	//이메일 인증
	@ResponseBody
	@RequestMapping(value="Medicine/emailAuth", method = RequestMethod.POST,
					produces = "text/json;charset=UTF-8")
	public String emailAuth(String userEmail, @RequestParam HashMap<String, String> params) throws Throwable {		
		Random random = new Random();
		int checkNum = random.nextInt(888888) + 111111;
		System.out.println("email = " + userEmail);
		/* 이메일 보내기 */
        String setFrom = "chlalsgh862@gmail.com";
        String toMail = userEmail;
        String title = "회원가입 인증 이메일 입니다.";
        String content = 
                "구디아카데미 51기 보건팀 프로젝트 회원가입 인증번호입니다." +
                "<br><br>" + 
                "인증 번호는 <b style='color:blue;'>" + checkNum + "</b> 입니다." + 
                "<br>" + 
                "해당 인증번호를 인증번호 확인란에 기입하여 회원가입을 완료해주세요.";
        
       int cnt = 0;
       int cur = 0;
       
        
       params.put("checkNum", Integer.toString(checkNum));
        
        try {
        	cur = iACDao.getInt("mail.seqSel", params);//값을 INSERT하기 위한 NEXTVAL
        	params.put("current",Integer.toString(cur));
        	cnt = iACDao.insert("mail.emailCert",params);//인증번호 테이블 값 넣기
        	
        	
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
	@RequestMapping(value = "Medicine/certAuth", method = RequestMethod.POST,
			produces = "text/json;charset=UTF-8")
	public String certAuth(@RequestParam HashMap<String, String> params) throws Throwable {
		int cur = 0; 
		int confirm = 0; 
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>(); 
		
    	
    	try {
    		cur = iACDao.getInt("mail.seqSel2", params);//값을 INSERT하기 위한 NEXTVAL
        	params.put("current",Integer.toString(cur));
        	
        	confirm = iACDao.getInt("mail.seqCur", params);
        	
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
	
	//회원추가
	@ResponseBody
	@RequestMapping(value = "Medicine/newAccount",
					method = RequestMethod.POST,
					produces = "test/json;charset=UTF-8")
	public String memReg(@RequestParam HashMap<String, String> params) throws Throwable {
		
		ObjectMapper mapper = new ObjectMapper();
		Map<String,Object> model = new HashMap<String, Object>();
		int cnt = 0;
		
		try {
			//비밀번호 암호화
			params.put("userPw", Utils.encryptAES128(params.get("userPw")));
			cnt = iACDao.insert("mem.memReg", params);
			
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
