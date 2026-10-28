/* Always Happy V5 review prototype. No submission or member database is active. */
(() => {
const pages = ['home','pilots','aspiring','cabin','airlines','jobs','insights','contact'];
const urls = ['../index.html','../for-pilots/index.html','../become-a-pilot/index.html','../cabin-crew/index.html','../for-airlines/index.html','../pilot-jobs/index.html','../insights/index.html','../contact/index.html'];
const root = document.body.dataset.root ?? '../';
const here = document.body.dataset.page || 'home';
const route = i => root + urls[i].slice(3);
const pictures = ['aviation-hero.png','pilot-career.png','flight-training.png','cabin-crew-career.png','airline-recruitment.png','aviation-hero.png','pilot-career.png','aviation-hero.png'];
const languages = {
  'zh-Hant': {
    nav:['我們的故事','我是機師','想成為機師','空服員招生','航空公司合作','航空職缺','知識中心','聯絡我們'],menu:'選單',strap:'國際航空人才招募 · 培育 · 職涯媒合',note:'無論你是機師、未來機師、空服員或航空公司，都歡迎透過線上表單或 Email 與我們聯繫。',cta:'了解更多',contact:'聯絡諮詢',back:'回到首頁',status:'規劃中',footer:'飛行安全至上 · 快樂職涯同行',mail:'以 Email 洽詢',footerNote:'個人資料僅用於人才審核、諮詢回覆與職涯媒合，未經同意不會提供給第三方。',lead:'建立清楚的航空職涯路徑',partners:'合作資訊以實際授權及有效協議為準。歷史合作不代表目前仍有招聘合約。',
    content: {
      home:{k:'OUR STORY / ALWAYS HAPPY',h:'我們的故事',p:'從飛行出發，與每個未來同行。Always Happy Co., Ltd. 成立於 2015 年 1 月 7 日，以國際航空人才招募、專業培育與職涯媒合為方向，連結飛行人才與航空產業的實際需求。',sections:[['創立起點｜2015 年 1 月 7 日','每一份飛行履歷背後，都有長年的訓練、選擇與責任；每一次人才推薦，都應建立在清楚的條件與信任之上。'],['Tiger Lee 的飛行視角','Tiger Lee 曾任戰鬥機飛行員，後於中華航空及海南航空擔任機長，累積逾三十年飛行經驗。這段經歷為人才評估、飛安交流與職涯輔導提供專業視角。'],['我們的工作方式','從理解個人資歷、航空公司職位需求，到甄選準備與後續媒合，Always Happy 重視資格核對、審慎溝通與適切的服務銜接。']],storyHeading:'從創立起點，到專業飛行經驗與信任。',sectionTitle:'選擇適合你的航空職涯入口'},
      pilots:{k:'FOR LICENSED PILOTS',h:'我是機師：下一段飛行職涯。',p:'服務現役民航機師，也歡迎已取得飛行執照、尚未進入航空公司的飛行員。兩類人才將依資歷分開管理與評估。',sections:[['線上履歷登錄','填寫聯絡方式、飛行執照與機型資格、總飛行時數、工作經歷及求職意願，送出時同時建立帳號。'],['資料與資格初審','Always Happy 將依個別條件進行人工審核、必要補件及後續聯繫。人才庫登錄不等於申請特定職缺。'],['審核結果與會員','審核結果與補件通知會寄到你的 Email，也可登入查看進度；審核通過即可瀏覽知識中心的會員內容。']],sectionTitle:'人才登錄流程'},
      aspiring:{k:'FUTURE PILOTS',h:'想成為機師：兩條清楚的飛行路徑。',p:'無飛行經驗的學生，可以了解航空公司培訓機師甄選；有志自費訓練者，也可以了解海外飛行學校與後續職涯服務。',sections:[['航空公司培訓機師','了解甄選制度、英文能力、數理與邏輯準備、面試及相關職涯規劃。各航空公司的實際資格與考試內容，以官方公告為準。'],['海外飛行培訓','Always Happy 已依公司提供資料與澳洲 AIAC 簽訂合作 MOU，涉及學員推薦與申請協助。美國學校的合作共識與 MOU 仍在研擬中，暫不列為正式簽約夥伴。'],['訓練後的職涯媒合','完成飛行訓練後，可以依執照、時數及航空公司實際需求評估就業推薦機會；不保證面試或錄取。']],sectionTitle:'兩條路徑，適合不同起點'},
      cabin:{k:'CABIN CREW',h:'空服員招生：從職涯意願開始。',p:'Always Happy 提供招生意願登記、基本資料接收與初步審核，合作訓練及後續航空公司媒合依最終合作安排辦理。',sections:[['Always Happy 的角色','統一對外招生與初審，申請資料由 Always Happy 自主管理。'],['專業訓練與職涯銜接','訓練機構及結訓後資料回流、就業推薦流程，預計於 2026 年 11 月中旬確認。現階段不對外承諾特定班次、機構或錄取。'],['意願登記','可直接透過下方表單登記意願，由專人以 Email 聯繫。轉介至外部訓練機構前，將另行取得你的同意。']],sectionTitle:'預定服務流程'},
      airlines:{k:'FOR AIRLINES',h:'國際航空合作經驗與專業資源網絡。',p:'Always Happy 結合航空人才引薦、跨國招募、專業培訓及媒合經驗，協助航空公司從實際需求出發尋找合適人才。',sections:[['國際航空合作經驗','公司提供的歷史合作名單涵蓋海南航空、香港航空、約旦航空及其他航空公司。每筆合作內容將依可公開資料逐項核對，並標示歷史與現行狀態。'],['飛行學校及訓練資源','澳洲 AIAC 與模擬機訓練合作資源可依確認的合作範圍介紹；對外素材與品牌標誌使用需符合授權。'],['企業招募需求','企業可透過下方表單提交需求職務、機型、資格、地區、人數及時間，由 Always Happy 專人評估與聯繫。']],sectionTitle:'合作領域'},
      jobs:{k:'AVIATION CAREERS',h:'航空職缺訊息。',p:'規劃以單一職缺管理系統提供機師、空服員及其他航空專業職務的真實招聘資訊。',sections:[['機師職缺','可依未來公開且獲授權的職缺呈現職務、機型、飛行資格、地點及截止日期。'],['空服員職缺','配合航空公司實際招募需求，提供經確認的空服員職涯機會。'],['其他航空專業職務','保留未來擴充空間；目前沒有經確認可發布的職缺，因此不展示示意招聘。']],sectionTitle:'職缺分類'},
      insights:{k:'AVIATION KNOWLEDGE',h:'Tiger Lee 航空知識與飛行安全交流中心。',p:'以逾三十年飛行經驗為基礎，規劃飛行安全觀念、航空事件案例與專業知識分享。',sections:[['飛行安全案例','優先採用可公開核實的官方調查與可信來源，清楚區分調查結論與個人專業觀點。'],['專業交流會員','訪客不會因瀏覽網站自動成為會員。專業討論區未來採申請與審核制，Tiger Lee 專業初審、Leon 同步知悉並參與重要案件確認。'],['LINE 專業交流','預留 Always Happy LINE 官方帳號 QR Code 區塊。帳號尚未建立，啟用前不顯示無效掃描碼。']],sectionTitle:'知識與交流'},
      contact:{k:'CONTACT ALWAYS HAPPY',h:'聯絡我們：找到正確的服務窗口。',p:'請選擇你的諮詢類型，透過各專區的線上表單，或以 Email、電話與我們聯繫。',sections:[['機師人才與職涯','現役機師、持照飛行員、履歷登錄及工作機會諮詢。'],['培訓與海外飛行訓練','航空公司培訓機師、海外飛行學校及職涯規劃。'],['空服員招生','空服員職涯諮詢與招生意願登記。'],['航空公司合作','人才招募、專業培訓及企業合作需求。']],sectionTitle:'選擇聯絡主題'}
    }
  },
  'zh-Hans': {
    nav:['我们的故事','我是飞行员','想成为飞行员','空乘人员招生','航空公司合作','航空职位','知识中心','联系我们'],menu:'菜单',strap:'国际航空人才招聘 · 培训 · 职业匹配',note:'无论你是飞行员、未来飞行员、空乘人员或航空公司，都欢迎通过在线表单或电子邮件与我们联系。',cta:'了解更多',contact:'咨询联系',back:'返回首页',status:'筹备中',footer:'飞行安全至上 · 快乐职业同行',mail:'通过电子邮件咨询',footerNote:'个人资料仅用于人才审核、咨询回复与职业匹配，未经同意不会提供给第三方。',lead:'建立清晰的航空职业路径',partners:'合作信息以实际授权与有效协议为准。历史合作不代表当前仍有招聘合同。',
    content: {
      home:{k:'OUR STORY / ALWAYS HAPPY',h:'我们的故事',p:'从飞行出发，与每个未来同行。Always Happy Co., Ltd. 成立于2015年1月7日，以国际航空人才招聘、专业培养和职业匹配为发展方向。',sections:[['创立起点｜2015年1月7日','每一份飞行履历背后，都有多年的训练、选择与责任。我们相信人才推荐应建立在清晰条件与互相信任之上。'],['Tiger Lee 的飞行视角','Tiger Lee 曾任战斗机飞行员，并在中华航空和海南航空担任机长，拥有三十余年飞行经验。'],['我们的工作方式','从核对资历、理解航空公司需求，到甄选准备与职业匹配，我们重视专业判断和审慎沟通。']],storyHeading:'从创立起点，到飞行经验与信任。',sectionTitle:'选择适合你的航空职业入口'},
      pilots:{k:'FOR LICENSED PILOTS',h:'我是飞行员：开启下一段职业旅程。',p:'服务现役民航飞行员，也欢迎已经取得飞行执照、尚未进入航空公司的人员。两类人才将分别管理。',sections:[['在线简历登记','填写联系方式、执照与机型资质、飞行小时、工作经历及求职意向，提交时同时创建账号。'],['人工资格审核','由 Always Happy 核对资格、处理补件及后续联系。登记人才库不等于申请具体职位。'],['审核结果与会员','审核结果与补充资料通知会发送到你的邮箱，也可登录查看进度；审核通过即可浏览知识中心的会员内容。']],sectionTitle:'人才登记流程'},
      aspiring:{k:'FUTURE PILOTS',h:'想成为飞行员：两条清晰的路径。',p:'没有飞行经验的学生可了解航空公司培训飞行员甄选；希望自费训练者可了解海外航校及职业服务。',sections:[['航空公司培训飞行员','介绍英语、数理逻辑、面试和职业准备。实际资格及考试以各航空公司官方公告为准。'],['海外飞行培训','根据公司资料，澳大利亚 AIAC 已签署合作 MOU；美国航校合作 MOU 仍在拟定，不列为正式签约伙伴。'],['训练后的职业匹配','完成训练后可依据执照、飞行小时与实际招聘需求评估推荐机会，不保证面试或录用。']],sectionTitle:'两条路径，适合不同起点'},
      cabin:{k:'CABIN CREW',h:'空乘人员招生：从职业意向开始。',p:'Always Happy 负责招生意向登记和初审，训练及后续推荐由最终合作安排确定。',sections:[['我们的角色','由 Always Happy 统一招生、初审并管理申请资料。'],['培训与职业衔接','合作机构及结训后职业推荐流程预计于2026年11月中旬确认，目前不承诺具体班次或录用。'],['意向登记','可直接通过下方表单登记意向，由专人通过电子邮件联系。转介至外部培训机构前，将另行征得你的同意。']],sectionTitle:'预定服务流程'},
      airlines:{k:'FOR AIRLINES',h:'国际航空合作经验与专业资源网络。',p:'结合跨国飞行人才推荐、招聘、培训及职业匹配经验，为航空公司提供专业对接。',sections:[['历史航空合作','公司提供的历史合作名单包括海南航空、香港航空、约旦航空等。公开内容将区分历史与现行合作。'],['航校与训练资源','澳大利亚 AIAC 及模拟机训练合作资源将在核实协议与品牌授权后介绍。'],['企业招聘需求','企业可通过下方表单提交职位、机型、资格、地点、人数及招聘时间，由专人评估并联系。']],sectionTitle:'合作领域'},
      jobs:{k:'AVIATION CAREERS',h:'航空职位信息。',p:'规划统一展示飞行员、空乘人员及其他航空专业岗位的真实招聘信息。',sections:[['飞行员','公布获得授权的机型、资格、地点和申请期限。'],['空乘人员','根据航空公司的实际需求发布职位。'],['其他航空职位','保留扩充空间。当前没有确认可发布的公开职位。']],sectionTitle:'职位分类'},
      insights:{k:'AVIATION KNOWLEDGE',h:'Tiger Lee 航空知识与飞行安全交流中心。',p:'以三十余年飞行经验为背景，规划安全知识、案例和专业经验分享。',sections:[['飞行安全案例','采用可核实的公开来源，区分官方调查结论与个人专业观点。'],['专业会员交流','浏览网站不会自动成为会员。未来由 Tiger Lee 初审专业资格，Leon 参与重要审核。'],['LINE 交流','预留官方账号二维码位置，正式申请完成前不启用。']],sectionTitle:'知识与交流'},
      contact:{k:'CONTACT ALWAYS HAPPY',h:'联系我们：找到合适的服务入口。',p:'请选择咨询主题，通过各专区的在线表单，或以电子邮件、电话与我们联系。',sections:[['飞行员职业','现役或持照飞行员、登记与工作机会。'],['培训与海外航校','培训飞行员甄选及海外飞行训练。'],['空乘人员招生','空乘职业咨询与招生意向登记。'],['航空公司合作','人才招聘、培训与商务合作。']],sectionTitle:'选择咨询主题'}
    }
  },
  en: {
    nav:['Our Story','For Pilots','Become a Pilot','Cabin Crew','Airline Partners','Aviation Jobs','Knowledge Hub','Contact'],menu:'Menu',strap:'International Aviation Recruitment · Training · Career Connections',note:'Whether you are a pilot, future pilot, cabin crew candidate or airline, contact us through our online forms or by email.',cta:'Learn more',contact:'Contact us',back:'Back to home',status:'In preparation',footer:'Safety first · A fulfilling aviation career',mail:'Enquire by email',footerNote:'Personal information is used only for talent review, enquiries and career matching, and is never shared with third parties without consent.',lead:'Clear pathways into aviation careers',partners:'Partnership details depend on confirmed permissions and active agreements. Past cooperation does not imply current recruitment contracts.',
    content: {
      home:{k:'OUR STORY / ALWAYS HAPPY',h:'Our Story',p:'Rooted in flight. Connected to every future. Founded on 7 January 2015, Always Happy Co., Ltd. connects aviation talent with international recruitment, professional development and career opportunities.',sections:[['Our beginnings | 7 January 2015','Every flight résumé reflects years of training and responsibility. We believe successful recruitment starts with reliable qualifications, clear expectations and trust.'],['Tiger Lee’s perspective','A former fighter pilot and airline captain at China Airlines and Hainan Airlines, Tiger Lee brings over 30 years of flying experience to our professional outlook.'],['How we work','We listen, verify qualifications and assess career options against real airline needs, with safety and considered communication at the centre.']],storyHeading:'From our beginnings to experience and trust.',sectionTitle:'Explore your aviation pathway'},
      pilots:{k:'FOR LICENSED PILOTS',h:'For pilots: your next career chapter.',p:'We welcome experienced airline pilots and licensed pilots who have not yet joined an airline. These groups will be assessed separately.',sections:[['Online profile','Share your contact details, licences, ratings, flight hours, employment history and career preferences. Submitting also creates your account.'],['Human review','Always Happy verifies qualifications, request missing items and follow up. Joining a talent pool is not an application for a particular vacancy.'],['Outcome and membership','You will receive the outcome or any request for more information by email, and can sign in to track progress. Approved pilots can view member content in the Knowledge Hub.']],sectionTitle:'Registration process'},
      aspiring:{k:'FUTURE PILOTS',h:'Become a pilot: two distinct pathways.',p:'Students without flight experience can explore airline cadet selection. Others may consider overseas flight training and subsequent career guidance.',sections:[['Airline cadet programmes','Learn about English, numerical reasoning, interviews and preparation. Requirements depend on each airline’s official announcement.'],['Overseas flight training','According to company-provided information, an MOU is signed with Australia’s AIAC. Discussions with a US flight school are ongoing; its MOU is not yet signed.'],['Career opportunities after training','Any airline referral depends on licences, experience and actual recruitment needs. Training does not guarantee an interview or job.']],sectionTitle:'Two pathways, different starting points'},
      cabin:{k:'CABIN CREW',h:'Cabin crew: begin with your career interest.',p:'Always Happy receives expressions of interest and performs initial screening. Training and subsequent referrals depend on final partner arrangements.',sections:[['Our role','Always Happy will be the initial recruitment contact and will manage applicant records.'],['Training and employment','Training arrangements and post-training referral procedures are expected to be confirmed in mid-November 2026. No course or job placement is guaranteed.'],['Register your interest','Use the form below and our team will contact you by email. We will ask for your separate consent before any referral to a training partner.']],sectionTitle:'Proposed service flow'},
      airlines:{k:'FOR AIRLINES',h:'International airline experience and professional networks.',p:'Always Happy draws on cross-border pilot referrals, recruitment and training experience to help airlines define and address talent needs.',sections:[['Airline cooperation history','Company-supplied records list past work involving Hainan Airlines, Hong Kong Airlines and Jordan Aviation, among others. Past and current relationships will be clearly distinguished.'],['Flight schools and training','Australian AIAC and simulator training resources will be described only within verified agreements and brand permissions.'],['Recruitment requirements','Use the form below to share positions, aircraft types, qualifications, bases, headcount and timing; our team will assess and respond.']],sectionTitle:'Areas of cooperation'},
      jobs:{k:'AVIATION CAREERS',h:'Aviation career opportunities.',p:'A single future jobs system will cover pilots, cabin crew and other aviation professionals, using genuine authorised listings.',sections:[['Pilot roles','Aircraft types, qualifications, bases and deadlines will be shown for verified vacancies.'],['Cabin crew roles','Openings will reflect confirmed airline recruitment needs.'],['Other aviation roles','The system can expand later. No verified public openings are currently available.']],sectionTitle:'Job categories'},
      insights:{k:'AVIATION KNOWLEDGE',h:'Tiger Lee’s Aviation Safety & Knowledge Hub.',p:'A planned space for safety principles, aviation cases and professional exchange informed by over 30 years of flying experience.',sections:[['Flight safety cases','Use reliable public reports and clearly distinguish official findings from professional commentary.'],['Professional membership','Browsing does not create membership. Future specialist access will require review by Tiger Lee with Leon involved in key decisions.'],['LINE community','A space is reserved for a future official LINE account QR code; it is not active yet.']],sectionTitle:'Knowledge and community'},
      contact:{k:'CONTACT ALWAYS HAPPY',h:'Contact us: the right route for your enquiry.',p:'Choose your enquiry topic and use the online form in each section, or contact the team by email or telephone.',sections:[['Pilot careers','Experienced or licensed pilots, talent registration and job opportunities.'],['Cadet and overseas training','Airline cadet selection and overseas flight schools.'],['Cabin crew','Cabin crew careers and expressions of interest.'],['Airline partnerships','Recruitment, training and business cooperation.']],sectionTitle:'Choose an enquiry topic'}
    }
  }
};
const profileLabels = {
 'zh-Hant': {title:'建立你的機師履歷',intro:'第 4 版履歷表單預覽已恢復。你可以查看及試填，但這個頁面不會儲存、傳送或建立人才庫紀錄。',groups:['01｜基本資料','02｜現職與航空公司經歷','03｜執照、機型與飛行時數','04｜媒合偏好'],labels:['姓名','Email','電話','目前所在國家／城市','國籍','方便聯絡時段','目前是否在職','目前／最近任職航空公司','曾任航空公司','職稱','任職期間','持有執照','執照簽發國家','可飛機型','是否持有 Type Rating','總飛行時數','PIC 時數','英文能力','目標國家／基地','可接受的工作型態','可到職時間','補充說明'],options:{5:['請選擇','平日白天','平日晚上','週末','皆可'],6:['請選擇','目前在職','目前待業','即將離職'],14:['請選擇','是','否'],17:['請選擇','ICAO Level 4','ICAO Level 5','ICAO Level 6','其他'],19:['請選擇','全職','合約','輪班／派駐','皆可討論']},consent:'我了解此頁僅供介面預覽，資料不會被儲存或送出。',submit:'測試預覽按鈕',result:'此為預覽介面：沒有儲存、傳送或提交任何資料。'},
 'zh-Hans': {title:'建立你的飞行员简历',intro:'第四版的简历表单预览已恢复。可查看和试填，但不会保存、发送或建立人才库记录。',groups:['01｜基本资料','02｜现职与航空公司经历','03｜执照、机型和飞行小时','04｜职业匹配偏好'],labels:['姓名','电子邮箱','电话','所在国家／城市','国籍','方便联系时间','目前就业状态','目前／最近任职航空公司','曾任航空公司','职位','任职期间','飞行执照','执照签发国家','可飞机型','是否持有机型签注','总飞行小时','机长飞行小时','英语能力','目标国家／基地','工作形式','可入职时间','补充说明'],options:{5:['请选择','工作日白天','工作日晚上','周末','均可'],6:['请选择','目前在职','目前待业','即将离职'],14:['请选择','是','否'],17:['请选择','ICAO Level 4','ICAO Level 5','ICAO Level 6','其他'],19:['请选择','全职','合同','轮班／派驻','均可讨论']},consent:'我了解本页仅用于界面预览，不会保存或提交资料。',submit:'测试预览按钮',result:'这是预览界面：没有保存、发送或提交任何资料。'},
 en:{title:'Build your pilot profile',intro:'The Version 4 résumé form preview has been restored. You can inspect or try the fields, but no information is stored, transmitted or submitted.',groups:['01 | Personal details','02 | Employment and airlines','03 | Licences, ratings and flight hours','04 | Career preferences'],labels:['Full name','Email','Phone','Current country / city','Nationality','Preferred contact time','Employment status','Current / most recent airline','Previous airlines','Role','Employment period','Pilot licence','Issuing country','Aircraft types','Type rating held?','Total flight hours','PIC hours','English proficiency','Preferred country / base','Work arrangement','Available start date','Additional information'],options:{5:['Select','Weekday daytime','Weekday evening','Weekend','Any time'],6:['Select','Currently employed','Not employed','Leaving soon'],14:['Select','Yes','No'],17:['Select','ICAO Level 4','ICAO Level 5','ICAO Level 6','Other'],19:['Select','Full-time','Contract','Roster / assignment','Open to discussion']},consent:'I understand this is a preview only; no information is stored or submitted.',submit:'Test preview button',result:'Preview only: nothing was stored, transmitted or submitted.'}
};
// Strings for the live application, account and member area (used only when Supabase is configured).
const liveLabels = {
 'zh-Hant': {intro:'送出後資料將安全儲存，由 Always Happy 審核人員人工審核；審核結果與補件通知會寄到你的 Email。',consent:'我同意 Always Happy 為人才審核與職涯媒合目的蒐集、處理及利用上述個人資料；未經我另行同意，不會提供給第三方。',submit:'送出履歷',resubmit:'送出補件',accountLegend:'00｜建立帳號',accountNote:'送出時將以下方「基本資料」中的 Email 建立帳號，用於查詢審核進度與補件。',password:'設定密碼（至少 8 碼）',password2:'再次輸入密碼',haveAccount:'已有帳號？請先登入',email:'Email',loginPassword:'密碼',login:'登入',logout:'登出',loggedInAs:'已登入：',sending:'送出中…',errPassword:'密碼至少 8 碼，且兩次輸入需相同。',errConsent:'請勾選同意個人資料使用說明。',errEmailExists:'此 Email 已註冊，請先登入後再送出。',errInvalid:'部分欄位格式不正確，請檢查後再送出。',errGeneric:'送出失敗，請稍後再試或以 Email 聯繫我們。',errLogin:'登入失敗：請確認 Email、密碼，以及是否已點擊驗證信中的連結。',okNew:'已收到你的履歷（案件編號 {case}）。請到信箱點擊驗證連結啟用帳號，審核結果將以 Email 通知。',okExisting:'已收到你的履歷（案件編號 {case}），審核結果將以 Email 通知。',statusTitle:'我的申請',caseLabel:'案件編號',statuses:{submitted:'審核中',needs_info:'需要補件',approved:'已通過'},statusHelp:{submitted:'審核人員正在審閱你的資料，期間無法修改。',needs_info:'請依下方說明更新資料後重新送出。',approved:'恭喜！你已成為 Always Happy 專業會員，可瀏覽知識中心的會員內容。'},reviewNote:'補件說明',memberLink:'前往會員內容',memberTitle:'會員專區',memberLogin:'審核通過的機師會員登入後，即可瀏覽此區內容。',memberPending:'你的帳號尚未通過機師審核，通過後即可瀏覽會員內容。',memberEmpty:'目前尚無會員內容。',memberApply:'前往機師履歷登錄',memberError:'會員內容載入失敗，請稍後再試。'},
 'zh-Hans': {intro:'提交后资料将安全保存，由 Always Happy 审核人员人工审核；审核结果和补充资料通知会发送到你的邮箱。',consent:'我同意 Always Happy 为人才审核与职业匹配目的收集、处理和使用上述个人资料；未经我另行同意，不会提供给第三方。',submit:'提交简历',resubmit:'提交补充资料',accountLegend:'00｜创建账号',accountNote:'提交时将以下方「基本资料」中的邮箱创建账号，用于查询审核进度与补充资料。',password:'设置密码（至少 8 位）',password2:'再次输入密码',haveAccount:'已有账号？请先登录',email:'电子邮箱',loginPassword:'密码',login:'登录',logout:'退出登录',loggedInAs:'已登录：',sending:'提交中…',errPassword:'密码至少 8 位，且两次输入需一致。',errConsent:'请勾选同意个人资料使用说明。',errEmailExists:'该邮箱已注册，请先登录后再提交。',errInvalid:'部分字段格式不正确，请检查后再提交。',errGeneric:'提交失败，请稍后再试或通过电子邮件联系我们。',errLogin:'登录失败：请确认邮箱、密码，以及是否已点击验证邮件中的链接。',okNew:'已收到你的简历（案件编号 {case}）。请到邮箱点击验证链接启用账号，审核结果将通过邮件通知。',okExisting:'已收到你的简历（案件编号 {case}），审核结果将通过邮件通知。',statusTitle:'我的申请',caseLabel:'案件编号',statuses:{submitted:'审核中',needs_info:'需要补充资料',approved:'已通过'},statusHelp:{submitted:'审核人员正在审阅你的资料，期间无法修改。',needs_info:'请根据下方说明更新资料后重新提交。',approved:'恭喜！你已成为 Always Happy 专业会员，可浏览知识中心的会员内容。'},reviewNote:'补充说明',memberLink:'前往会员内容',memberTitle:'会员专区',memberLogin:'审核通过的飞行员会员登录后，即可浏览此区内容。',memberPending:'你的账号尚未通过飞行员审核，通过后即可浏览会员内容。',memberEmpty:'目前暂无会员内容。',memberApply:'前往飞行员简历登记',memberError:'会员内容加载失败，请稍后再试。'},
 en: {intro:'Your information is stored securely and reviewed personally by the Always Happy team. You will receive the outcome, or any request for more information, by email.',consent:'I agree that Always Happy may collect, process and use the information above for talent review and career matching. It will not be shared with third parties without my separate consent.',submit:'Submit profile',resubmit:'Submit update',accountLegend:'00 | Create your account',accountNote:'Your account will use the email address in Personal details. You will use it to track your application.',password:'Choose a password (min. 8 characters)',password2:'Confirm password',haveAccount:'Already have an account? Sign in first',email:'Email',loginPassword:'Password',login:'Sign in',logout:'Sign out',loggedInAs:'Signed in as ',sending:'Submitting…',errPassword:'Passwords must match and be at least 8 characters.',errConsent:'Please tick the consent box.',errEmailExists:'This email is already registered. Please sign in, then submit.',errInvalid:'Some fields are not valid. Please check and try again.',errGeneric:'Submission failed. Please try again later or email us.',errLogin:'Sign-in failed. Check your email and password, and that you have confirmed your email address.',okNew:'Profile received (case {case}). Please confirm your email address using the link we sent. We will email you the outcome.',okExisting:'Profile received (case {case}). We will email you the outcome.',statusTitle:'My application',caseLabel:'Case number',statuses:{submitted:'Under review',needs_info:'More information needed',approved:'Approved'},statusHelp:{submitted:'Our team is reviewing your profile; it cannot be edited meanwhile.',needs_info:'Please update your profile as described below and submit again.',approved:'Congratulations! You are now an Always Happy professional member and can view member content in the Knowledge Hub.'},reviewNote:'What we need',memberLink:'View member content',memberTitle:'Members area',memberLogin:'Approved pilot members can sign in to view this content.',memberPending:'Your account has not yet been approved. Member content becomes available once your pilot profile is approved.',memberEmpty:'No member content yet.',memberApply:'Submit your pilot profile',memberError:'Member content could not be loaded. Please try again later.'}
};
const profileGroups=[[0,1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15,16,17],[18,19,20,21]];
// Control names match the pilot_applications columns; select values are language-independent codes.
const profileNames=['full_name','email','phone','location','nationality','contact_time','employment_status','current_airline','previous_airlines','role','employment_period','licence','licence_country','aircraft_types','type_rating','total_hours','pic_hours','english','target_location','work_type','availability','notes'];
const optionCodes={5:['weekday_day','weekday_evening','weekend','any'],6:['employed','unemployed','leaving'],14:['yes','no'],17:['icao4','icao5','icao6','other'],19:['full_time','contract','roster','open']};
const requiredFields=[0,1,2,11,15];
const cfg = window.AH_CONFIG || {};
const backend = cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey) : null;
function profileForm(lang){
 const d=profileLabels[lang],L=liveLabels[lang],names=profileNames;
 const types={1:'email',2:'tel',15:'number',16:'number'};
 const field=i=>{const id='pilot-'+names[i],label=safe(d.labels[i]),req=requiredFields.includes(i)?' required':'';let control;
  if(d.options[i]) control=`<select id="${id}" name="${names[i]}"${req}>${d.options[i].map((v,j)=>`<option value="${j?optionCodes[i][j-1]:''}">${safe(v)}</option>`).join('')}</select>`;
  else if(i===21) control=`<textarea id="${id}" name="${names[i]}" rows="4" maxlength="3000"></textarea>`;
  else control=`<input id="${id}" name="${names[i]}" type="${types[i]||'text'}" ${types[i]==='number'?'min="0" max="999999"':''} autocomplete="off"${req}>`;
  return `<label class="v5-field ${i===21?'v5-wide':''}" for="${id}"><span>${label}${req?' *':''}</span>${control}</label>`};
 const account=backend?`<fieldset id="account-fieldset" hidden><legend>${safe(L.accountLegend)}</legend><p class="v5-account-note">${safe(L.accountNote)}</p><div class="v5-fields"><label class="v5-field" for="pilot-password"><span>${safe(L.password)} *</span><input id="pilot-password" name="password" type="password" minlength="8" maxlength="72" autocomplete="new-password" disabled></label><label class="v5-field" for="pilot-password2"><span>${safe(L.password2)} *</span><input id="pilot-password2" name="password2" type="password" minlength="8" maxlength="72" autocomplete="new-password" disabled></label></div></fieldset><label class="v5-hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>`:'';
 return `<section class="v5-section v5-profile-section" id="pilot-profile"><div class="v5-wrap"><div class="v5-kicker">${backend?'PILOT PROFILE':'PILOT PROFILE / PREVIEW ONLY'}</div><h2>${safe(d.title)}</h2><p class="v5-profile-intro">${safe(backend?L.intro:d.intro)}</p>${backend?'<div id="account-panel"></div><div id="pilot-status"></div>':''}<form id="pilot-profile-form" autocomplete="off">${account}${profileGroups.map((g,j)=>`<fieldset><legend>${safe(d.groups[j])}</legend><div class="v5-fields">${g.map(field).join('')}</div></fieldset>`).join('')}<label class="v5-consent"><input type="checkbox" id="preview-consent">${safe(backend?L.consent:d.consent)}</label><div class="v5-profile-actions"><button class="v5-button" type="submit"><span data-submit-label>${safe(backend?L.submit:d.submit)}</span> <span aria-hidden="true">↗</span></button><p id="profile-response" role="status" aria-live="polite"></p></div></form></div></section>`;
}
const loginForm=(L,open)=>`<details class="v5-login"${open?' open':''}><summary>${safe(L.haveAccount)}</summary><form data-login><label class="v5-field"><span>${safe(L.email)}</span><input type="email" name="email" required autocomplete="email"></label><label class="v5-field"><span>${safe(L.loginPassword)}</span><input type="password" name="password" required autocomplete="current-password"></label><button class="v5-button" type="submit">${safe(L.login)}</button><p data-login-msg role="status" aria-live="polite"></p></form></details>`;
const accountLine=(L,user)=>`<p class="v5-account">${safe(L.loggedInAs)}<strong>${safe(user.email)}</strong><button type="button" class="v5-link-button" data-logout>${safe(L.logout)}</button></p>`;
function bindAccount(container){
 const L=liveLabels[language];
 container.querySelector('[data-login]')?.addEventListener('submit',async e=>{
  e.preventDefault();const f=new FormData(e.target),msg=e.target.querySelector('[data-login-msg]');msg.textContent='';
  const {error}=await backend.auth.signInWithPassword({email:String(f.get('email')).trim(),password:String(f.get('password'))});
  if(error) msg.textContent=L.errLogin;
 });
 container.querySelector('[data-logout]')?.addEventListener('click',()=>backend.auth.signOut());
}
const applicationColumns='case_no,status,review_note,'+profileNames.join(',');
// Re-renders the account-dependent parts of the page without touching other form input.
async function refreshAccount(){
 if(!backend||(here!=='pilots'&&here!=='insights')) return;
 const L=liveLabels[language];
 const {data:{session}}=await backend.auth.getSession();
 const user=session?.user||null;
 let app=null;
 if(user){const {data}=await backend.from('pilot_applications').select(applicationColumns).eq('user_id',user.id).maybeSingle();app=data;}
 if(here==='pilots') showApplication(L,user,app);
 if(here==='insights') await showMembers(L,user,app);
}
function setFormLocked(form,locked){form.querySelectorAll('input,select,textarea,button').forEach(el=>{if(!el.closest('#account-fieldset')&&el.name!=='website')el.disabled=locked;});}
function showApplication(L,user,app){
 const form=document.getElementById('pilot-profile-form'),panel=document.getElementById('account-panel'),box=document.getElementById('pilot-status'),acct=document.getElementById('account-fieldset');
 if(!form) return;
 panel.innerHTML=user?accountLine(L,user):loginForm(L,false);bindAccount(panel);
 acct.hidden=!!user;acct.querySelectorAll('input').forEach(i=>{i.disabled=!!user;i.required=!user;});
 const email=form.elements.namedItem('email');email.readOnly=!!user;if(user)email.value=user.email;
 const label=form.querySelector('[data-submit-label]');
 if(!app){box.innerHTML='';setFormLocked(form,false);label.textContent=L.submit;return;}
 profileNames.forEach(n=>{const el=form.elements.namedItem(n);if(el&&n!=='email')el.value=app[n]??'';});
 box.innerHTML=`<div class="v5-status" data-status="${safe(app.status)}"><h3>${safe(L.statusTitle)}：${safe(L.statuses[app.status]||app.status)}</h3><p>${safe(L.caseLabel)}：${safe(app.case_no)}</p><p>${safe(L.statusHelp[app.status]||'')}</p>${app.status==='needs_info'&&app.review_note?`<p><strong>${safe(L.reviewNote)}</strong></p><p class="v5-note">${safe(app.review_note)}</p>`:''}${app.status==='approved'?link(6,L.memberLink):''}</div>`;
 setFormLocked(form,app.status!=='needs_info');
 label.textContent=app.status==='needs_info'?L.resubmit:L.submit;
}
async function submitProfile(form){
 const L=liveLabels[language],msg=document.getElementById('profile-response'),button=form.querySelector('button[type="submit"]');
 if(!document.getElementById('preview-consent').checked){msg.textContent=L.errConsent;return;}
 const application={};profileNames.forEach(n=>{application[n]=form.elements.namedItem(n).value.trim();});
 const {data:{session}}=await backend.auth.getSession();
 let password;
 if(!session){password=form.elements.namedItem('password').value;if(password.length<8||password!==form.elements.namedItem('password2').value){msg.textContent=L.errPassword;return;}}
 button.disabled=true;msg.textContent=L.sending;
 const {data,error}=await backend.functions.invoke('submit-application',{body:{application,password,language,website:form.elements.namedItem('website').value}});
 if(error){
  let code;try{code=(await error.context.json()).error;}catch{}
  msg.textContent=code==='email_exists'?L.errEmailExists:code==='invalid'?L.errInvalid:L.errGeneric;button.disabled=false;return;
 }
 msg.textContent=(data.new_account?L.okNew:L.okExisting).replace('{case}',data.case_no);
 setFormLocked(form,true);
 if(session) refreshAccount();
}
async function showMembers(L,user,app){
 const body=document.getElementById('member-body');
 if(!body) return;
 if(!user){body.innerHTML=`<p>${safe(L.memberLogin)}</p>${loginForm(L,true)}`;bindAccount(body);return;}
 if(app?.status!=='approved'){body.innerHTML=`${accountLine(L,user)}<p>${safe(L.memberPending)}</p>${link(1,L.memberApply)}`;bindAccount(body);return;}
 const {data,error}=await backend.from('member_content').select('id,title,body,created_at').order('created_at',{ascending:false});
 const items=error?`<p>${safe(L.memberError)}</p>`:data.length?`<div class="v5-member-list">${data.map(m=>`<article><time datetime="${safe(m.created_at)}">${safe(new Date(m.created_at).toLocaleDateString(language))}</time><h3>${safe(m.title)}</h3><p>${safe(m.body)}</p></article>`).join('')}</div>`:`<p>${safe(L.memberEmpty)}</p>`;
 body.innerHTML=accountLine(L,user)+items;bindAccount(body);
}
const intakeForms={
 'zh-Hant':{
  aspiring:{title:'想成為機師｜諮詢表單',intro:'請選擇感興趣的路線：航空公司培訓機師甄選或海外飛行訓練。送出後將由專人以 Email 回覆。',fields:[['姓名','text'],['Email','email'],['聯絡電話','tel'],['目前身分','select',['請選擇','在校學生','應屆畢業生','已畢業／在職','其他']],['感興趣的路線','select',['請選擇','航空公司培訓機師','海外飛行訓練','兩者都想了解']],['英文能力／準備情況','text'],['想了解的問題','textarea']]},
  cabin:{title:'空服員招生｜意願登記',intro:'由 Always Happy 收件與初步審核，此處不需提供完整履歷。實際招生、訓練與轉介安排確認後，將以 Email 另行通知。',fields:[['姓名','text'],['Email','email'],['聯絡電話','tel'],['目前身分','select',['請選擇','在校學生','已畢業','在職','其他']],['希望諮詢的方向','select',['請選擇','空服員職涯','招生意願','資格與準備']],['方便聯絡時段','select',['請選擇','平日白天','平日晚上','週末']],['補充問題','textarea']]},
  airlines:{title:'航空公司合作｜人才需求洽詢',intro:'請留下需求概要，Always Happy 將由專人評估並與您聯繫。',fields:[['航空公司／企業名稱','text'],['聯絡人姓名','text'],['聯絡人職務','text'],['公司 Email','email'],['需求類型','select',['請選擇','機長／副機師','空服員','其他航空專業職務','培訓合作']],['機型與資格要求','text'],['預計人數','number'],['希望合作時程','text'],['需求說明','textarea']]},
  consent:'我同意 Always Happy 為回覆本次諮詢之目的蒐集、處理及利用上述資料；未經我另行同意，不會提供給第三方。',submit:'送出',sending:'送出中…',ok:'已收到你的資料（編號 {case}），我們會盡快以 Email 與你聯繫。',errConsent:'請勾選同意個人資料使用說明。',errInvalid:'部分欄位格式不正確，請檢查後再送出。',errTooMany:'你剛剛已送出過，請稍候幾分鐘再試。',errGeneric:'送出失敗，請稍後再試或以 Email 聯繫我們。',jobsTitle:'航空職缺訊息',jobsIntro:'這裡將顯示經航空公司確認並授權公開的職缺，與機師及空服員專區共用同一套職缺資料。',empty:'目前沒有已確認可公開的職缺。正式資料核實後才會發布，不展示示意招聘。',jobsLink:'查看所有航空職缺'},
 'zh-Hans':{
  aspiring:{title:'想成为飞行员｜咨询表单',intro:'请选择感兴趣的路径：航空公司培训飞行员甄选或海外飞行训练。提交后将由专人通过电子邮件回复。',fields:[['姓名','text'],['电子邮箱','email'],['联系电话','tel'],['目前身份','select',['请选择','在校学生','应届毕业生','已毕业／在职','其他']],['感兴趣的路径','select',['请选择','航空公司培训飞行员','海外飞行训练','两者都想了解']],['英语能力／准备情况','text'],['咨询问题','textarea']]},
  cabin:{title:'空乘人员招生｜意向登记',intro:'由 Always Happy 接收并初步审核，此处无需提供完整简历。实际招生、培训与转介安排确认后，将通过电子邮件另行通知。',fields:[['姓名','text'],['电子邮箱','email'],['联系电话','tel'],['目前身份','select',['请选择','在校学生','已毕业','在职','其他']],['咨询方向','select',['请选择','空乘职业发展','招生意向','资格与准备']],['方便联系时间','select',['请选择','工作日白天','工作日晚上','周末']],['补充问题','textarea']]},
  airlines:{title:'航空公司合作｜人才需求咨询',intro:'请留下需求概要，Always Happy 将由专人评估并与您联系。',fields:[['航空公司／企业名称','text'],['联系人姓名','text'],['联系人职位','text'],['企业邮箱','email'],['需求类型','select',['请选择','机长／副驾驶','空乘人员','其他航空专业职位','培训合作']],['机型与资格要求','text'],['预计人数','number'],['希望合作时间','text'],['需求说明','textarea']]},
  consent:'我同意 Always Happy 为回复本次咨询之目的收集、处理和使用上述资料；未经我另行同意，不会提供给第三方。',submit:'提交',sending:'提交中…',ok:'已收到你的资料（编号 {case}），我们会尽快通过电子邮件与你联系。',errConsent:'请勾选同意个人资料使用说明。',errInvalid:'部分字段格式不正确，请检查后再提交。',errTooMany:'你刚刚已提交过，请稍候几分钟再试。',errGeneric:'提交失败，请稍后再试或通过电子邮件联系我们。',jobsTitle:'航空职位信息',jobsIntro:'这里只展示经航空公司核实并授权公开的职位，与其他人才专区共用资料。',empty:'目前没有确认可公开的职位，不展示模拟招聘。',jobsLink:'查看全部航空职位'},
 en:{
  aspiring:{title:'Become a Pilot | Enquiry',intro:'Tell us which pathway interests you: airline cadet selection or overseas flight training. Our team will reply by email.',fields:[['Full name','text'],['Email','email'],['Phone','tel'],['Current status','select',['Select','Student','Recent graduate','Graduate / employed','Other']],['Pathway of interest','select',['Select','Airline cadet programme','Overseas flight training','Both']],['English level / preparation','text'],['Questions','textarea']]},
  cabin:{title:'Cabin Crew | Register Your Interest',intro:'Always Happy receives and screens expressions of interest; no full résumé is needed here. We will email you once recruitment, training and referral arrangements are confirmed.',fields:[['Full name','text'],['Email','email'],['Phone','tel'],['Current status','select',['Select','Student','Graduate','Employed','Other']],['Enquiry topic','select',['Select','Cabin crew career','Recruitment interest','Eligibility and preparation']],['Preferred contact time','select',['Select','Weekday daytime','Weekday evening','Weekend']],['Questions','textarea']]},
  airlines:{title:'Airline Partnerships | Talent Request',intro:'Share an outline of your requirements and our team will assess them and contact you.',fields:[['Airline / company','text'],['Contact name','text'],['Contact role','text'],['Business email','email'],['Talent required','select',['Select','Captain / First Officer','Cabin crew','Other aviation roles','Training cooperation']],['Aircraft / qualification needs','text'],['Estimated headcount','number'],['Desired timeframe','text'],['Requirements','textarea']]},
  consent:'I agree that Always Happy may collect, process and use the information above to respond to this enquiry. It will not be shared with third parties without my separate consent.',submit:'Submit',sending:'Submitting…',ok:'Received (reference {case}). We will contact you by email shortly.',errConsent:'Please tick the consent box.',errInvalid:'Some fields are not valid. Please check and try again.',errTooMany:'You have just submitted. Please wait a few minutes before trying again.',errGeneric:'Submission failed. Please try again later or email us.',jobsTitle:'Aviation Job Openings',jobsIntro:'This area will show verified, authorised airline vacancies using the same listings as the career sections.',empty:'No verified public vacancies are available at present. Sample recruitment listings will not be shown.',jobsLink:'View all aviation jobs'}
};
// Field keys and select codes for the enquiry forms, aligned by index with intakeForms[lang][page].fields.
// Must match supabase/functions/_shared/enquiry-fields.ts.
const enquirySpecs={
 aspiring:[{key:'full_name',req:1},{key:'email',req:1},{key:'phone'},{key:'status',codes:['student','recent_graduate','graduate_employed','other']},{key:'pathway',req:1,codes:['cadet','overseas','both']},{key:'english'},{key:'questions'}],
 cabin:[{key:'full_name',req:1},{key:'email',req:1},{key:'phone'},{key:'status',codes:['student','graduate','employed','other']},{key:'topic',codes:['career','recruitment','eligibility']},{key:'contact_time',codes:['weekday_day','weekday_evening','weekend']},{key:'questions'}],
 airlines:[{key:'company',req:1},{key:'full_name',req:1},{key:'contact_role'},{key:'email',req:1},{key:'need',req:1,codes:['captain_fo','cabin_crew','other_roles','training']},{key:'requirements'},{key:'headcount'},{key:'timeframe'},{key:'details'}]
};
function intakeForm(page,lang){
 const bundle=intakeForms[lang],d=bundle[page],spec=enquirySpecs[page];
 const control=(f,i)=>{const [label,type,options]=f,{key,req,codes}=spec[i],id=`${page}-${key}`,r=req?' required':'';let inner;
  if(type==='select')inner=`<select id="${id}" name="${key}"${r}>${options.map((o,j)=>`<option value="${j?codes[j-1]:''}">${safe(o)}</option>`).join('')}</select>`;
  else if(type==='textarea')inner=`<textarea id="${id}" name="${key}" rows="4" maxlength="3000"></textarea>`;
  else inner=`<input id="${id}" name="${key}" type="${type}" ${type==='number'?'min="0" max="99999"':'maxlength="200"'} autocomplete="off"${r}>`;
  return `<label class="v5-field ${type==='textarea'?'v5-wide':''}" for="${id}"><span>${safe(label)}${req?' *':''}</span>${inner}</label>`};
 return `<section class="v5-section v5-profile-section" id="service-form"><div class="v5-wrap"><div class="v5-kicker">SERVICE ENQUIRY</div><h2>${safe(d.title)}</h2><p class="v5-profile-intro">${safe(d.intro)}</p><form id="service-form-el" class="v5-service-form" autocomplete="off"><fieldset><legend>${safe(d.title)}</legend><div class="v5-fields">${d.fields.map(control).join('')}</div></fieldset><label class="v5-hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label><label class="v5-consent"><input type="checkbox" id="service-consent">${safe(bundle.consent)}</label><div class="v5-profile-actions"><button class="v5-button" type="submit">${safe(bundle.submit)} <span aria-hidden="true">↗</span></button><p id="service-response" role="status" aria-live="polite"></p></div></form></div></section>`;
}
async function submitEnquiry(form){
 const d=intakeForms[language],msg=document.getElementById('service-response'),button=form.querySelector('button[type="submit"]');
 if(!document.getElementById('service-consent').checked){msg.textContent=d.errConsent;return;}
 if(!cfg.supabaseUrl){msg.textContent=d.errGeneric;return;}
 const fields={};enquirySpecs[here].forEach(({key})=>{fields[key]=form.elements.namedItem(key).value.trim();});
 button.disabled=true;msg.textContent=d.sending;
 try{
  const res=await fetch(`${cfg.supabaseUrl}/functions/v1/submit-enquiry`,{method:'POST',headers:{'Content-Type':'application/json',apikey:cfg.supabaseAnonKey},body:JSON.stringify({type:here,fields,language,website:form.elements.namedItem('website').value})});
  const data=await res.json().catch(()=>({}));
  if(!res.ok){msg.textContent=data.error==='invalid'?d.errInvalid:data.error==='too_many'?d.errTooMany:d.errGeneric;button.disabled=false;return;}
  msg.textContent=d.ok.replace('{case}',data.case_no);form.reset();button.disabled=false;
 }catch{msg.textContent=d.errGeneric;button.disabled=false;}
}
function airlineJobs(lang){const d=intakeForms[lang];return `<section class="v5-section v5-jobs-section" id="airline-jobs"><div class="v5-wrap"><div class="v5-kicker">AVIATION VACANCIES</div><h2>${safe(d.jobsTitle)}</h2><p>${safe(d.jobsIntro)}</p><div class="v5-jobs-empty"><span aria-hidden="true">✈</span><strong>${safe(d.empty)}</strong></div>${link(5,d.jobsLink)}</div></section>`}
const initial = localStorage.getItem('alwayshappy-language') || 'zh-Hant';
let language = languages[initial] ? initial : 'zh-Hant';
const safe = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link = (i,label,cls='') => `<a class="v5-button ${cls}" href="${route(i)}">${safe(label || t.nav[i])}<span aria-hidden="true">↗</span></a>`;
let t;
function draw(){
  t=languages[language]; document.documentElement.lang=language; document.title=`${t.nav[pages.indexOf(here)]} | Always Happy`;
  const c=t.content[here] || t.content.home;
  // The full vacancies page remains reachable from the airline partnerships
  // section, but does not occupy a separate top-level menu item.
  const nav = pages.map((p,i)=>({p,i})).filter(({p})=>p!=='jobs').map(({p,i})=>`<a ${p===here?'aria-current="page"':''} href="${i===0&&here==='home'?'#our-story':route(i)+(i===0?'#our-story':'')}">${safe(t.nav[i])}</a>`).join('');
  const card = (name,description,idx)=>`<article class="v5-card"><span class="v5-card-num">0${idx+1}</span><h3>${safe(name)}</h3><p>${safe(description)}</p></article>`;
  let lower='';
  if(here==='home') lower=`<section class="v5-section v5-paths"><div class="v5-wrap"><div class="v5-kicker">EXPLORE YOUR PATH</div><h2>${safe(c.sectionTitle)}</h2><div class="v5-path-grid">${[1,2,3,4].map(i=>`<a class="v5-path" href="${route(i)}"><img src="${root}assets/${pictures[i]}" alt=""><span>${safe(t.nav[i])}<b>↗</b></span></a>`).join('')}</div></div></section>`;
  if(here==='pilots') lower=`<section class="v5-section v5-jobs-section"><div class="v5-wrap"><h2>${safe(intakeForms[language].jobsTitle)}</h2><p>${safe(intakeForms[language].jobsIntro)}</p>${link(5,intakeForms[language].jobsLink)}</div></section>`+profileForm(language);
  if(here==='aspiring'||here==='cabin') lower=intakeForm(here,language);
  if(here==='airlines') lower=`<section class="v5-section v5-logos"><div class="v5-wrap"><div class="v5-kicker">AIRLINE NETWORK / HISTORICAL COOPERATION</div><h2>${safe(language==='en'?'Selected past airline relationships':language==='zh-Hans'?'部分历史航空合作单位':'部分歷史航空合作單位')}</h2><div class="v5-logo-grid"><div>HAINAN AIRLINES<small>海南航空</small></div><div>HONG KONG AIRLINES<small>香港航空</small></div><div>JORDAN AVIATION<small>約旦航空</small></div></div><p class="v5-muted">${safe(t.partners)}</p><p class="v5-muted">${safe(language==='en'?'Official logo artwork will be inserted after verification of supplied brand files.':language==='zh-Hans'?'官方 Logo 将于原档与使用范围确认后加入。':'正式 Logo 待核對原檔與使用範圍後加入。')}</p>${link(5,t.nav[5])}</div></section>`;
  if(here==='airlines') lower+=airlineJobs(language)+intakeForm(here,language);
  if(here==='insights') lower=`<section class="v5-section"><div class="v5-wrap"><div class="v5-qr"><div class="v5-qr-placeholder">LINE<br>QR</div><div><h2>${safe(language==='en'?'Join the future aviation community':language==='zh-Hans'?'加入未来航空专业交流':'加入未來的航空專業交流')}</h2><p>${safe(language==='en'?'Reserved for the official Always Happy LINE account once activated.':language==='zh-Hans'?'预留官方 LINE 二维码位置，尚未启用。':'預留 Always Happy LINE 官方帳號 QR Code 位置，尚未啟用。')}</p><span class="v5-chip">${safe(t.status)}</span></div></div></div></section>`;
  if(here==='insights'&&backend) lower+=`<section class="v5-section v5-member-section" id="member-area"><div class="v5-wrap"><div class="v5-kicker">MEMBERS ONLY</div><h2>${safe(liveLabels[language].memberTitle)}</h2><div id="member-body"></div></div></section>`;
  const steps=c.sections.map(([h,p],i)=>card(h,p,i)).join('');
  document.getElementById('site').innerHTML=`<div class="v5-top"><div class="v5-wrap"><span>ALWAYS HAPPY CO., LTD.</span><span>${safe(t.strap)}</span></div></div><header class="v5-header"><div class="v5-wrap v5-head"><a class="v5-brand" href="${route(0)}"><img src="${root}assets/always-happy-logo.png" alt=""><span>Always Happy<small>AVIATION CAREERS</small></span></a><nav class="v5-nav" aria-label="Main navigation">${nav}</nav><div class="v5-controls"><label class="v5-lang-label"><span class="sr-only">Language</span><select id="lang" aria-label="Language"><option value="zh-Hant">繁中</option><option value="zh-Hans">简中</option><option value="en">English</option></select></label><button class="v5-menu-button" id="menu" aria-expanded="false" aria-controls="smallnav" type="button">☰ ${safe(t.menu)}</button></div></div><nav id="smallnav" class="v5-smallnav" aria-label="Mobile navigation">${nav}</nav></header><main id="main"><section class="v5-hero"><div class="v5-wrap v5-hero-grid"><div class="v5-hero-text"><div class="v5-kicker">${safe(c.k)}</div><h1>${safe(c.h)}</h1><p>${safe(c.p)}</p><div class="v5-actions">${here==='home'?link(1,t.nav[1]):link(7,t.contact)}${here==='home'?link(2,t.nav[2],'v5-outline'):link(0,t.back,'v5-outline')}</div></div><div class="v5-photo"><img src="${root}assets/${pictures[pages.indexOf(here)]}" alt="Aviation visual"/><span>ALWAYS HAPPY · SINCE 2015</span></div></div></section><section class="v5-section"><div class="v5-wrap"><div class="v5-section-heading"><div class="v5-kicker">${safe(c.k)}</div><h2>${safe(c.sectionTitle || t.lead)}</h2></div><div class="v5-card-grid">${steps}</div></div></section>${lower}<section class="v5-section v5-contact-band"><div class="v5-wrap v5-band-grid"><div><div class="v5-kicker">ALWAYS HAPPY / NEXT STEP</div><h2>${safe(t.lead)}</h2><p>${safe(t.note)}</p></div><div>${link(7,t.contact)}<a class="v5-button v5-outline" href="mailto:alwayshappy@hotmail.com?subject=${encodeURIComponent('Always Happy inquiry')}">${safe(t.mail)}<span aria-hidden="true">↗</span></a></div></div></section></main><footer class="v5-footer"><div class="v5-wrap"><div class="v5-footer-main"><div><strong>Always Happy Co., Ltd.</strong><p>${safe(t.footer)}</p></div><div><a href="mailto:alwayshappy@hotmail.com">alwayshappy@hotmail.com</a><a href="tel:+886917215888">+886 917 215 888</a></div><div><p>${safe(t.footerNote)}</p></div></div><div class="v5-footnote">© 2026 Always Happy Co., Ltd. · Seychelles IBC No. 159555 · 桃園市桃園區新埔六街 95 號 16 樓</div></div></footer>`;
  document.getElementById('lang').value=language;
  if(here==='pilots'){
    document.getElementById('pilot-profile-form').addEventListener('submit',e=>{
      e.preventDefault();
      if(backend) submitProfile(e.currentTarget);
      else document.getElementById('profile-response').textContent=profileLabels[language].result;
    });
  }
  if(here==='aspiring'||here==='cabin'||here==='airlines'){
    document.getElementById('service-form-el').addEventListener('submit',e=>{e.preventDefault();submitEnquiry(e.currentTarget);});
    document.querySelector('.v5-hero .v5-actions').innerHTML=`<a class="v5-button" href="#service-form">${safe(intakeForms[language][here].title)}<span aria-hidden="true">↓</span></a>${link(7,t.contact,'v5-outline')}`;
    if(here==='airlines') document.querySelector('.v5-logos .v5-button')?.remove();
  }
  if(here==='home'){
    const story=document.querySelector('main > section.v5-section');
    story.id='our-story';
    story.querySelector('h2').textContent=c.storyHeading;
    document.querySelector('.v5-actions').innerHTML=`<a class="v5-button" href="#our-story">${safe(t.nav[0])}<span aria-hidden="true">↓</span></a><a class="v5-button v5-outline" href="#audiences">${safe(c.sectionTitle)}<span aria-hidden="true">↗</span></a>`;
    document.querySelector('.v5-paths').id='audiences';
  }
  document.getElementById('lang').addEventListener('change',e=>{language=e.target.value;localStorage.setItem('alwayshappy-language',language);draw();});
  document.getElementById('menu').addEventListener('click',e=>{const el=document.getElementById('smallnav'),opened=el.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(opened));});
  if(here==='home' && location.hash==='#our-story') requestAnimationFrame(()=>document.getElementById('our-story')?.scrollIntoView());
  refreshAccount();
}
draw();
// Deferred so Supabase calls are not made inside the auth callback itself.
backend?.auth.onAuthStateChange(()=>setTimeout(refreshAccount,0));
})();
