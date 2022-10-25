package com.gdj51.Medicine.admin.medicineMgt;

import java.util.Arrays;
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
public class adminMedicineController {
	@Autowired
	public IACDao dao;
	
	@Autowired
	public IPagingService ips;
	
	@RequestMapping(value = "Medicine")
	public ModelAndView MedicineList(ModelAndView mav) {
		mav.setViewName("adminPage/medicineMgt/medicineMgt");
		return mav;
	}
	@RequestMapping(value = "/MedicineList", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MedicineList(@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String, Object> model = new HashMap<String, Object>();
		
		int cnt = dao.getInt("medicine.medicineCnt",params);
		HashMap<String, Integer> pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt ,4 ,5);
		params.put("start" , Integer.toString(pd.get("start")));
		params.put("end", Integer.toString(pd.get("end")));
		
		List<HashMap<String, String>> list = dao.getList("medicine.medicineList",params);
		List<HashMap<String, String>> list2 = dao.getList("medicine.medicineList2",params);
		
		model.put("list2", list2);
		model.put("list", list);
		model.put("pd", pd);
		
		return mapper.writeValueAsString(model);
	}
	@RequestMapping(value = "MedicineInsert")
	public ModelAndView MemberInsert(ModelAndView mav) {
		mav.setViewName("adminPage/medicineMgt/medicineMgt_info_enroll");
		return mav;
	}
	@RequestMapping(value = "/MedicineAction/{gbn}", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MedicineAction(@PathVariable String gbn, @RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> model = new HashMap<String, Object>();
		int cnt = 0;
		System.out.println(params);
		try {
			switch (gbn) {
			case "insert":	
				String[] arr;
				arr = params.get("num").split(",");
				String[] arr2;
				arr2 = params.get("num3").split(",");
				// 시퀀스 의 NEXTVAL 번호 취득
				int sc = dao.getInt("medicine.selectNum");
				// num 이라는 hashmap 생성
				HashMap<String, String> num = new HashMap<String, String>();
				params.put("numnum", Integer.toString(sc));
				num.put("numnum", Integer.toString(sc));
				//의약품 인서트
				cnt = dao.insert("medicine.insert",params);
				cnt = dao.insert("medicine.shapeinsert", params);
				//의약품 - 효과 중계테이블 인서트
				for(int i=0 ;i<arr.length; i++) {
				//반복문으로 넣어줌 해쉬맵은 키값 같으면 덮어씌움
				num.put("arr",arr[i]);				
				dao.insert("medicine.insert2",num);					
				}
				for(int i=0 ;i<arr2.length; i++) {
				num.put("arr2",arr2[i]);				
				dao.insert("medicine.insert3",num);					
				}
				break;
			case "insert2":
				cnt = dao.insert("medicine.insert4", params);
				break;
			 case "insert3": 
				cnt = dao.insert("medicine.insert5", params);
				break;
			case "sujeong":
				int mesc = dao.getInt("medicine.mescNum");
				
				HashMap<String, String> mef = new HashMap<String,String>();
				
				params.put("mefnum", Integer.toString(mesc));
				
				cnt = dao.insert("medicine.suinsert2", params);
				
				dao.insert("medicine.suinsert",params);
				
				model.put("mediefmid", mef);
				
				break;
			case "sujeongdel":
				int sudel = dao.getInt("medicine.mescCurrNum");
				params.put("mefnum", Integer.toString(sudel));
				System.out.println(sudel);
				cnt = dao.delete("medicine.deleteMedi", params);
				break;
			case "insert4":
				cnt = dao.insert("medicine.insert6", params);
				break;
			case "update":
				cnt = dao.update("medicine.delete",params);
				break;
			case "sefinsert":
				int smesc = dao.getInt("medicine.sefNum");
				
				HashMap<String, String> smef = new HashMap<String,String>();
				
				params.put("smefnum", Integer.toString(smesc));
				
				cnt = dao.insert("medicine.smefinsert", params);
				
				dao.insert("medicine.smefinsert2",params);
				
				model.put("mediSefmid", smef);
				
				break;
			case "takeinsert":
				cnt = dao.insert("medicine.takeinsert", params);
				break;
			case "efsujeong":
				cnt = dao.update("medicine.efsujeong", params);
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
	
	@RequestMapping(value = "/MedicineSelectList", 
			method = RequestMethod.POST, 
			produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String MedicineSelectList(@RequestParam HashMap<String, String> params) throws Throwable{
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String, Object> model = new HashMap<String, Object>();
		
		int cnt = dao.getInt("medicine.effCnt",params);
		
		int sefcnt = dao.getInt("medicine.seffCnt",params);
		
		int concnt = dao.getInt("medicine.conCnt",params);
		
		HashMap<String, Integer> pd = ips.getPagingData(Integer.parseInt(params.get("page")), cnt , 13 ,5);
		
		HashMap<String, Integer> compd = ips.getPagingData(Integer.parseInt(params.get("page")), concnt , 13 ,5);
		
		HashMap<String, Integer> sefpd = ips.getPagingData(Integer.parseInt(params.get("page")), sefcnt , 13 ,5);
		
		params.put("start" , Integer.toString(pd.get("start")));
		
		params.put("end", Integer.toString(pd.get("end")));
		
		List<HashMap<String, String>> selec = dao.getList("medicine.medicineselectList",params);
		model.put("selec", selec);
		
		List<HashMap<String, String>> select = dao.getList("medicine.medicineselList",params);
		model.put("select", select);
		
		List<HashMap<String, String>> select2 = dao.getList("medicine.medicineselect2List",params);
		model.put("select2", select2);
		
		List<HashMap<String, String>> efList = dao.getList("medicine.efList",params);
		model.put("efList",efList);
		
		List<HashMap<String, String>> sefList = dao.getList("medicine.sefList",params);
		model.put("sefList",sefList);
		
		List<HashMap<String, String>> selList = dao.getList("medicine.mediselList",params);
		model.put("selList", selList);
		
		List<HashMap<String, String>> comList = dao.getList("medicine.medicomList",params);
		model.put("comList", comList);
		
		model.put("pd", pd);
		model.put("sefpd", sefpd);
		model.put("compd",compd);
		
		return mapper.writeValueAsString(model);
	}
	
	@RequestMapping(value = "/MedicineDetailList")
	public ModelAndView MedicineDetailList(ModelAndView mav , @RequestParam HashMap<String, String> params) throws Throwable{
		if(params.get("no") != null && params.get("no") != "") {
			
			
			HashMap<String, String> data = dao.getMap("medicine.medicineDetail",params);
			
			List<HashMap<String, String>> detailList = dao.getList("medicine.medicineEffectList",params);
			
			List<HashMap<String, String>> seffectList = dao.getList("medicine.medicineSEffectList",params);
			
			List<HashMap<String, String>> shapeList = dao.getList("medicine.medicineShapeList",params);
			
			
			mav.addObject("shapeList",shapeList);
			
			mav.addObject("seffectList",seffectList);
			
			mav.addObject("detailList",detailList);
			
			mav.addObject("data", data);
			
			mav.setViewName("adminPage/medicineMgt/medicineMgt_info_sujeong");
		}
		else {
			mav.setViewName("redirect:Medicine");
		}
		
		
		return mav;
	}
	
	@RequestMapping(value = "/mediList")
	public ModelAndView MedicineDetail(ModelAndView mav , @RequestParam HashMap<String, String> params) throws Throwable{
		
		if(params.get("no") != null && params.get("no") != "") {

			HashMap<String, String> data = dao.getMap("medicine.meDetail",params);
			
			List<HashMap<String, String>> effectList = dao.getList("medicine.meDetaileffect",params);
			
			List<HashMap<String, String>> seffectList = dao.getList("medicine.meDetailseffect",params);
				
			HashMap<String, String> comnmList = dao.getMap("medicine.meDetailComnm",params);
			
			mav.addObject("comnmList", comnmList);
			
			mav.addObject("seffectList", seffectList);
			
			mav.addObject("effectList", effectList);
			
			mav.addObject("data", data);
			
			mav.setViewName("adminPage/medicineMgt/medicineMgt_info");
		}
		else {
			mav.setViewName("redirect:Medicine");
		}
		
		
		return mav;
	}
	@RequestMapping(value = "/AREPAction/{gbn}", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String AREPAction(@PathVariable String gbn, @RequestParam HashMap<String, String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> model = new HashMap<String, Object>();

		int cnt = 0;

		try {
			switch (gbn) {
			case "insert":
				// 업뎃으로 올릴준비.
				cnt = dao.update("medicine.imgupdate",params);

				// num 이라는hashmap 생성
				HashMap<String, String> num = new HashMap<String, String>();
				
				num.put("numnum", params.get("numnum"));

				// 의약품 인서트
				dao.delete("medicine.Efdel", params);
				dao.delete("medicine.SEfdel", params);

				// cnt = dao.insert("medicine.sujeonginsert",params);
				
				if(params.get("num") != "") {
					String[] arr;
					arr = params.get("num").split(",");

				// 의약품 - 효과 중계테이블 인서트
					for (int i = 0; i < arr.length; i++) {
						// 반복문으로 넣어줌 해쉬맵은 키값 같으면 덮어씌움
						num.put("arr", arr[i]);
						dao.insert("medicine.insert2", num);
					}
				}
				if(params.get("num3") != "") {
					String[] arr2;
					arr2 = params.get("num3").split(",");
					for (int i = 0; i < arr2.length; i++) {
						num.put("arr2", arr2[i]);
						dao.insert("medicine.insert3", num);
					}
				}
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
