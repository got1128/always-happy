/* Reviewer page opened from the signed link in the notification email. Internal, Traditional Chinese only. */
(() => {
const cfg = window.AH_CONFIG || {};
const root = document.getElementById('review');
const token = new URLSearchParams(location.hash.slice(1)).get('t');
const safe = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const statusLabel = {submitted:'待審核',needs_info:'已要求補件，等待申請人回覆',approved:'已通過'};
const errors = {invalid_token:'連結無效或已過期。',not_actionable:'此案件狀態已變更（可能已由其他審核人處理，或申請人已重新送出）。請以最新的通知信處理。',note_required:'要求補件時，請填寫需要補充的內容。'};
const message = s => `<p class="v5-status">${safe(s)}</p>`;

async function call(body){
  const res = await fetch(`${cfg.supabaseUrl}/functions/v1/review-application`,{method:'POST',headers:{'Content-Type':'application/json',apikey:cfg.supabaseAnonKey,Authorization:`Bearer ${cfg.supabaseAnonKey}`},body:JSON.stringify({token,...body})});
  const data = await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(data.error || String(res.status));
  return data;
}

function render(d, notice=''){
  const rows = d.rows.map(([k,v])=>`<tr><th>${safe(k)}</th><td>${safe(v)}</td></tr>`).join('');
  root.innerHTML = `<div class="v5-kicker">PILOT PROFILE REVIEW</div><h1 class="v5-review-title">案件 ${safe(d.case_no)}</h1>${notice}<p>目前狀態：<strong>${safe(statusLabel[d.status]||d.status)}</strong>　送出時間：${safe(new Date(d.submitted_at).toLocaleString('zh-TW'))}　審核人：${safe(d.reviewer)}</p>${d.review_note?`<p><strong>上次補件說明</strong></p><p class="v5-note">${safe(d.review_note)}</p>`:''}<table class="v5-review-table">${rows}</table>${d.actionable?`<form class="v5-review-actions" id="review-form"><label class="v5-field" for="review-note"><span>補件說明（要求補件時必填，會寄給申請人；同意時可留空）</span><textarea id="review-note" rows="4" maxlength="3000"></textarea></label><div><button class="v5-button" type="button" data-action="approve">同意，通知申請人</button><button class="v5-button v5-outline" type="button" data-action="request_info">要求補件，通知申請人</button></div><p id="review-msg" role="status" aria-live="polite"></p></form>`:''}`;
  root.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>act(b.dataset.action)));
}

async function act(action){
  const note = document.getElementById('review-note').value.trim();
  const msg = document.getElementById('review-msg');
  if(action==='request_info' && !note){msg.textContent=errors.note_required;return;}
  if(!confirm(action==='approve'?'確定同意此申請？系統會寄信通知申請人，並開放會員內容。':'確定要求補件？補件說明會寄給申請人。')) return;
  root.querySelectorAll('button').forEach(b=>b.disabled=true);
  try{
    const r = await call({action,note});
    const done = action==='approve'?'已同意此申請':'已要求補件';
    render(await call({action:'view'}), message(r.email_sent?`${done}，並已寄信通知申請人。`:`${done}，但通知信寄送失敗，請另行聯繫申請人。`));
  }catch(e){
    msg.textContent = errors[e.message] || '操作失敗，請稍後再試。';
    root.querySelectorAll('button').forEach(b=>b.disabled=false);
  }
}

if(!cfg.supabaseUrl || !token) root.innerHTML = message('連結無效，或網站尚未完成後端設定。');
else call({action:'view'}).then(d=>render(d)).catch(e=>{root.innerHTML = message(errors[e.message]||'載入失敗，請稍後再試。');});
})();
