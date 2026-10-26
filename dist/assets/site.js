(() => {
 const toggle=document.querySelector('.mobile-toggle'),menu=document.querySelector('.mobile-nav');
 if(toggle&&menu){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));menu.dataset.open=String(open)});}
 const choices=document.querySelectorAll('[data-journey]');if(!choices.length)return;
 const journeys={pilot:{title:'下一份工作，先看清條件與取捨。',text:'探索機型、飛行時數、執照與基地要求，釐清下一步適合的機會。',href:'for-pilots/index.html',cta:'進入機師專區'},aspiring:{title:'想成為機師，從路徑開始。',text:'先掌握體檢、英文、訓練與取得執照後的職涯銜接。',href:'become-a-pilot/index.html',cta:'探索成為機師'},cabin:{title:'探索客艙職涯，先認識真正的工作。',text:'從安全、服務、語言與團隊合作開始，了解空服員招生的諮詢方式。',href:'cabin-crew/index.html',cta:'了解空服員招生'},airline:{title:'尋找符合條件、也願意到位的人。',text:'從機型、資格、基地與時程定義需求，讓人才搜尋更聚焦。',href:'for-airlines/index.html',cta:'進入航空公司專區'}};
 const title=document.getElementById('journey-title'),text=document.getElementById('journey-text'),link=document.getElementById('journey-link');
 choices.forEach(button=>button.addEventListener('click',()=>{const choice=button.dataset.journey,entry=journeys[choice];choices.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));title.textContent=entry.title;text.textContent=entry.text;link.href=entry.href;link.innerHTML=entry.cta+' <span aria-hidden="true">↗</span>'}));
})();

(() => {
 const main=document.querySelector('.submain .container');
 if(!main||!location.pathname.replace(/\\/g,'/').includes('/for-pilots/')) return;
 const formSection=document.createElement('section');
 formSection.className='pilot-profile';
 formSection.setAttribute('aria-labelledby','profile-title');
 formSection.innerHTML=`
   <div class="profile-heading"><span class="eyebrow">PILOT PROFILE</span><h2 id="profile-title">建立你的機師履歷</h2><p>先留下媒合所需的核心資料；這是預覽版，不會儲存或送出資訊。</p></div>
   <form class="profile-form">
     <fieldset><legend>01｜基本資料</legend><div class="profile-grid"><label>姓名<input name="name" autocomplete="name" placeholder="請輸入姓名"></label><label>Email<input name="email" type="email" autocomplete="email" placeholder="name@example.com"></label><label>電話<input name="phone" type="tel" autocomplete="tel" placeholder="請輸入電話"></label><label>目前所在國家／城市<input name="location" autocomplete="address-level1" placeholder="例如：台灣／台北"></label><label>國籍<input name="nationality" placeholder="請輸入國籍"></label><label>方便聯絡時段<select name="contact-time"><option>請選擇</option><option>平日白天</option><option>平日晚上</option><option>週末</option><option>皆可</option></select></label></div></fieldset>
     <fieldset><legend>02｜現職與航空公司經歷</legend><div class="profile-grid"><label>目前是否在職<select name="employed"><option>請選擇</option><option>目前在職</option><option>目前待業</option><option>即將離職</option></select></label><label>目前／最近任職航空公司<input name="current-airline" placeholder="請輸入航空公司名稱"></label><label>曾任航空公司<input name="previous-airline" placeholder="可填寫主要經歷"></label><label>職稱<input name="role" placeholder="例如：First Officer"></label><label>任職期間<input name="employment-period" placeholder="例如：2020–2025"></label></div></fieldset>
     <fieldset><legend>03｜執照、機型與飛行時數</legend><div class="profile-grid"><label>持有執照<input name="licence" placeholder="例如：ATPL、CPL"></label><label>執照簽發國家<input name="licence-country" placeholder="請輸入國家"></label><label>可飛機型<input name="aircraft-types" placeholder="例如：A320、B737"></label><label>是否持有 Type Rating<select name="type-rating"><option>請選擇</option><option>是</option><option>否</option></select></label><label>總飛行時數<input name="total-hours" type="number" min="0" placeholder="小時"></label><label>PIC 時數<input name="pic-hours" type="number" min="0" placeholder="小時"></label><label>英文能力<select name="english"><option>請選擇</option><option>ICAO Level 4</option><option>ICAO Level 5</option><option>ICAO Level 6</option><option>其他</option></select></label></div></fieldset>
     <fieldset><legend>04｜媒合偏好</legend><div class="profile-grid"><label>目標國家／基地<input name="target-location" placeholder="例如：日本、新加坡"></label><label>可接受的工作型態<select name="work-type"><option>請選擇</option><option>全職</option><option>合約</option><option>輪班／派駐</option><option>皆可討論</option></select></label><label>可到職時間<input name="availability" placeholder="例如：一個月內"></label><label class="profile-wide">補充說明<textarea name="notes" rows="4" placeholder="可補充簽證、家庭考量或其他媒合條件"></textarea></label></div></fieldset>
     <label class="profile-consent"><input type="checkbox" name="consent"> 我了解此頁為預覽介面，尚未建立帳號、儲存或送出資料。</label>
     <div class="profile-actions"><button class="button" type="submit">預覽送出資料 <span aria-hidden="true">↗</span></button><p class="profile-status" aria-live="polite"></p></div>
   </form>`;
 const nextLinks=main.querySelector('.next-links');
 main.insertBefore(formSection,nextLinks);
 const form=formSection.querySelector('form');
 form.addEventListener('submit',event=>{
   event.preventDefault();
   formSection.querySelector('.profile-status').textContent='這是預覽版：你的資料沒有被儲存或送出。';
 });
})();

(() => {
 const header=document.querySelector('.header-row');
 const menuButton=document.querySelector('.mobile-toggle');
 if(!header||!menuButton||!document.querySelector('.home-hero')) return;
 const switcher=document.createElement('div');
 switcher.className='language-switch';
 switcher.innerHTML='<button type="button" class="language-button" aria-label="語言選擇">語言</button>';
 header.insertBefore(switcher,menuButton);
})();
