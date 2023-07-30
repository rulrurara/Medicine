# GOOD MEDICINE

간단한 프로젝트 소개: 의약품에 대한 정보 제공, 의약품 별 사용자 리뷰 제공, 사용자가 섭취중인 건강기능식품별 영양소 분석, 사용자가 섭취중인 영양소 분석, BMI 차트 제공, 사용자 영양제 섭취일지 제공 등
진행 기간: 2022년 9월 1일 → 2022년 10월 7일
팀구성: 5명의 팀원
담당 업무: 기능 정의, 화면 디자인 및 기획 , DB설계, ERD설계, FRONT 및 BACK END 구현
사용기술 및 프로그램: Ajax, Eclipse, GIT, MyBatis, Oracle, Spring4.3, jsp
사용언어: CSS, EL, HTML, JSTL, Javascript, Jquery, SQL, dynamic query, java


## 프로젝트 내용

**(의약품)**사람들이 온라인 상에서 의약품에 대한 평가를 진행하고 토론할 수 있는 플랫폼을 만들었습니다. 또한 의약품 뿐만이 아니라 **(건강 관리)**사용자가 섭취하고 있는 영양제에 대한 정보를 제공하고, 사용자의 섭취 중인 영양소 분석, BMI제공, 영양제 섭취일지 제공 등 사용자의 영양소 섭취 상태를 관리할 수 있는 웹을 만드는 프로젝트를 진행하였습니다. 부가적인 페이지로 고객센터 및 자유 게시판을 제공하였습니다. 

## 담당 업무

[담당 페이지 - front, back 개발]

로그인, ID 및 PW 찾기, 건강 관리 메인페이지, 슬라이드형 사이드바 메뉴, 영양제 섭취일지 페이지, 섭취 중인 영양제 영양소 분석 페이지, 사용자 키 몸무게를 기반으로 한 일별, 월별 BMI그래프 제공 페이지, 고객센터 QnA 및 FAQ 페이지 , 자유게시판 페이지 , 마이페이지 - 내가 작성한 댓글 페이지

[기획 아이디어 제공]

웹 페이지 아이디어를 제공하고 세부 기능들에 대한 아이디어를 제공 하였습니다. 특히 건강기능식품 섭취 현황 제공, BMI분석, 영양소 섭취일지 아이디어를 제공하였습니다.

[기능 정의서 작성]

아이디어를 기반으로 하여 필요한 기능을 정의하는 기능 정의서를 작성하였습니다. 팀원들과 페이지를 분담하여 맡은 부분에 대한 기능을 정의하고 서로 토론하는 방식으로 진행 하였습니다.

[화면 디자인 및 기획서 작성]

각각 맡은 페이지를 디자인 하고 기능 정의서를 기반으로 팀원들과 페이지를 분담하여 ppt를 이용하여 화면 기획서를 작성하였습니다.

[ERD 작성]

ERD작성 업무를 맡아 진행하였습니다. 해당 업무를 처음 진행하다 보니 어려운 점이 많았습니다. 특히 중계테이블과 정규화에 대한 지식이 부족하여 스스로 공부하며 진행 하였습니다. 

[front 화면 구현]

화면 기획서에 작성한 내용을 기반으로 HTML, CSS , Jquery를 이용하여 front화면을 만들었습니다. block 과 inline-block , Flex를 기반으로 만들었습니다. 슬라이드 형 사이드바 메뉴 만들기, FullCalendar에 이미지 데이터 넣기, 슬라이드 형 메인페이지 만들기 등 담당 페이지 화면을 개발하였습니다.

[back-end 구현] 

Spring을 이용하여 서버사이드 개발을 하였습니다. MVC패턴을 기반으로 개발하였습니다. 미리 만들어 놓은 jsp에 ModelAndView를 이용하여 데이터를 전달해 주거나, Ajax를 이용하여 비동기 방식으로 데이터를 보내주었습니다. 

1. Session을 이용한 로그인 구현과 

2. Google 이메일 인증을 활용한 ID, PW찾기, 

3. 일별, 월별 BMI를 계산하여  HighChart를 이용한 BMI그래프 제공, 

4. 섭취중인 영양제를 분석하여 사용자 영양 상태 분석 및 제공, 

5. 영양제 섭취일지를 제공하여 FullCalendar에 섭취한 영양제를 날짜 별로 등록 할 수 있는 기능 제공 및 섭취 시 특이사항을 메모할 수 있는 기능 제공 등 주요 기능을 많이 담당하였습니다. 또한 

6. 메인페이지, 메뉴, 기본적인 게시판 및 고객센터 CRUD, Dynamic Query를 활용한 검색 기능을 구현하였습니다.

## 🌉  기능 정의서, 화면 기획서, ERD , 테이블 정의서

- 기능 정의서
    
     구현하고 싶은 페이지 별 기능 정의서 작성 
    
   ![Untitled](https://github.com/rulrurara/Medicine/assets/110279337/98258fd7-7f30-4a81-8595-aa4b5ac01412)
  



- 화면 기획서
    
     기능 정의서를 참고하여 화면 디자인 및 기획서 작성
    

![Untitled 1](https://github.com/rulrurara/Medicine/assets/110279337/40b20a86-4ef3-4170-a66c-009e727f721d)


- ERD
    
    Diagrams.net을 사용하여 DB모델링
    
   ![Untitled 2](https://github.com/rulrurara/Medicine/assets/110279337/16ec23b6-56c3-4b42-bdae-acf235fb5067)

    
- 테이블 정의서
    
    모델링 데이터를 기준으로 테이블 정의서 작성
    
   ![Untitled 3](https://github.com/rulrurara/Medicine/assets/110279337/8eb5fc71-c54d-47ff-a68f-0ed370f26188)

    

## 📖 담당 페이지 및 주요 기능

## LOGIN , LOGOUT

![Untitled 4](https://github.com/rulrurara/Medicine/assets/110279337/40962dcb-d46c-40d8-8025-c6115b469e24)


<aside>
💡 로그인 시 Ajax 이용하여, DB 정보와 입력한 ID, PW 대조 후 로그인
비밀번호는 암호화(AES) 하여 대조

</aside>

<aside>
💡 로그인 시 Session 생성 후 다른 페이지에서 로그인 정보 사용할 수 있도록
Session에 로그인한 정보(사용자 이름, 사용자번호 등) 할당

</aside>

---

## ID, PW 찾기

![Untitled 5](https://github.com/rulrurara/Medicine/assets/110279337/353090c2-b917-4312-98e9-20715784a091)


<aside>
💡 Ajax 이용하여 입력한 정보와 DB 대조 후 찾고자 하는 ID 또는 PW제공

</aside>

<aside>
💡 ID, PW 찾기 시 Google 이메일 인증 활용

</aside>

---

## 사이드 메뉴바

![Untitled 6](https://github.com/rulrurara/Medicine/assets/110279337/326bbaed-d5dc-4575-9782-be2997d520fb)


<aside>
💡 Jquery 이용하여 슬라이드형 메뉴바 구현

</aside>

---

## 건강관리 메인페이지

![Untitled 8](https://github.com/rulrurara/Medicine/assets/110279337/9ebda655-5bbd-42f5-be6f-cbad5c97bae8)



<aside>
💡 Jquery 이용하여 화면 클릭시 화면 slide 구현 (텍스트,이미지, 배경색 변경)

</aside>

---

## 영양제 섭취일지

![Untitled 8](https://github.com/rulrurara/Medicine/assets/110279337/611d6734-deef-4871-b076-8d10302149b0)

<aside>
💡 사용자가 섭취중인 영양제 DB에 등록.
섭취 날짜 클릭 후 섭취한 약품 등록버튼 클릭 시 해당 날짜에 섭취한 영양제 아이콘이 등록됨. 
영양제 별 아이콘은 DB에서 sequence이용하여 각각 할당.
Ajax 및 함수 이용하여 화면을 Reload 하면서 구현.

</aside>

<aside>
💡 해당 날짜 클릭 후 메모 등록 시 등록된 약품 별 메모 작성 가능.

</aside>

---

## 건강관리 리포트 - 달력


![Untitled 8](https://github.com/rulrurara/Medicine/assets/110279337/611d6734-deef-4871-b076-8d10302149b0)


<aside>
💡 사용자 별 건강 리포트 제공 
등록했던 섭취일지 및 메모 제공

</aside>

---

## 건강관리 리포트 - 영양제 분석

![Untitled 10](https://github.com/rulrurara/Medicine/assets/110279337/5acf056e-ad8e-4ae6-9cac-f09d73728415)


<aside>
💡 사용자 별 건강 리포트 제공. 
등록했던 영양제의 성분 분석.
Jquery 이용하여 화면 슬라이드 구현 및 슬라이드 시 Ajax 이용하여 DB에서 사용자가 섭취중인 약품정보 가져와서 화면에 그림.

</aside>

<aside>
💡 IF문 이용, DB의 적정 섭취량과 현재 섭취량 비교하여 과다, 적정, 부족섭취 할당

</aside>

<aside>
💡 DB 테이블 구조 상 Controller에서 List<List<HashMap<String,String>>> 이용하여 jsp에 값 전달 후 2차원 배열로 받아서 화면에 그림

</aside>

---

## 건강관리 리포트 - BMI 제공

![Untitled 11](https://github.com/rulrurara/Medicine/assets/110279337/eaa0d4c5-4262-421c-8b82-ae06324d6fe8)


<aside>
💡 사용자가 등록한 날짜별 키와 몸무게를 기준으로 BMI 지수 계산
 일별, 월별 그래프 제공

</aside>

<aside>
💡 체질량 지수 값에 따른 결과 및 권장사항 제공

</aside>

---

## 고객센터 - FAQ

![Untitled 12](https://github.com/rulrurara/Medicine/assets/110279337/aff0e14c-890d-490b-b3c7-f96d85104bc1)

<aside>
💡 고객센터 FAQ DB에서 가져와 제공 
질문 클릭시 슬라이드로 펼쳐져 답변이 보임

</aside>

---

## 고객센터 - QNA

![Untitled 13](https://github.com/rulrurara/Medicine/assets/110279337/de97a6de-fd87-442c-87a3-6a37629abbc6)

<aside>
💡 QNA 등록 시 DB에 등록됨 답변은 Admin 페이지에서 진행
MyPage에서 답변 내용 확인
Session에서 로그인 정보 가져와 전화번호와 이메일 값은 고정시킴

</aside>

---

## Mypage - 내가 등록한 댓글


![Untitled 14](https://github.com/rulrurara/Medicine/assets/110279337/f5860578-b682-4837-960d-d6311296503b)

<aside>
💡 게시판 별 내가 등록한 댓글 제공.
Category 변경 시 ajax 이용하여 화면 다시 그림. 
검색은 DynamicQuery 활용

</aside>

---

## 자유게시판


![Untitled 15](https://github.com/rulrurara/Medicine/assets/110279337/f3f98cb5-3410-45e4-8a03-30586ffd402a)


<aside>
💡 기본적인 게시판, 댓글 CRUD 제공

</aside>

## 간단한 후기

웹 프로젝트를 진행해 내가 원하는 기능을 만들기 위해서 아직 배워야 할 내용이 많다고 느꼈다. 특히 화면을 사용자가 보기에 좀 더 매력적으로 구현하는 법 이나, DB에서 데이터를 좀 더 쉽게 가져오는 법, Query문을 좀 더 최적화 하는 법 등 배우고 싶은 점이 많았다. 기능적으로 아쉬웠던 점은  AI를 이용하여 사용자의 영양소를 분석 후 부족한 영양제를 추천해주는 기능이 있으면 더 좋았을 것 같다.
