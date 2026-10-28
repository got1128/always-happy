import { type Application, displayRows } from './fields.ts';

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const siteUrl = () => (Deno.env.get('SITE_URL') ?? '').replace(/\/+$/, '');

export async function sendMail(to: string, subject: string, html: string, replyTo?: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: Deno.env.get('MAIL_FROM'), to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

const layout = (inner: string) =>
  `<div style="font-family:Arial,'Microsoft JhengHei',sans-serif;color:#172e40;max-width:640px;margin:auto;line-height:1.6">` +
  `<div style="background:#0c253a;color:#fff;padding:18px 24px;font-size:18px;font-weight:bold">Always Happy Aviation Careers</div>` +
  `<div style="padding:24px;border:1px solid #dbe1e3;border-top:0">${inner}</div></div>`;

const button = (href: string, label: string) =>
  `<p style="margin:24px 0"><a href="${escapeHtml(href)}" style="background:#c9a976;color:#102c3e;padding:12px 20px;border-radius:5px;text-decoration:none;font-weight:bold">${escapeHtml(label)}</a></p>`;

const paragraph = (s: string) => `<p>${escapeHtml(s)}</p>`;
const note = (s: string) =>
  `<p style="white-space:pre-wrap;background:#f7f6f2;padding:12px 14px;border-radius:6px">${escapeHtml(s)}</p>`;

const rowsTable = (rows: [string, string][]) =>
  `<table style="border-collapse:collapse;width:100%;font-size:14px">` +
  rows
    .map(([k, v]) => `<tr><th style="text-align:left;padding:8px 10px;background:#fafbfb;border-bottom:1px solid #edf1f2;width:36%;vertical-align:top">${escapeHtml(k)}</th><td style="padding:8px 10px;border-bottom:1px solid #edf1f2;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join('') +
  `</table>`;

export function reviewerEmail(app: Application, reviewUrl: string, resubmitted: boolean) {
  const subject = `[機師履歷${resubmitted ? '・補件' : ''}] ${app.case_no} ${app.full_name}`;
  const html = layout(
    `<h2 style="margin-top:0">${resubmitted ? '申請人已完成補件' : '新的機師履歷'}：${escapeHtml(String(app.case_no))}</h2>` +
      rowsTable(displayRows(app)) +
      button(reviewUrl, '開啟審核頁面（同意／要求補件）') +
      `<p style="font-size:12px;color:#61717b">此連結 14 天內有效，僅供指定審核人使用，請勿轉寄。申請人重新送出後，舊連結即失效。</p>`,
  );
  return { subject, html };
}

type Lang = 'zh-Hant' | 'zh-Hans' | 'en';
const copy = {
  'zh-Hant': {
    received: '已收到你的機師履歷', resubmitted: '已收到你的補件',
    receivedBody: '我們已收到你的資料，案件編號 {case}。審核人員會盡快人工審閱，結果將以 Email 通知。',
    confirm: '請點擊下方按鈕驗證 Email 並啟用帳號，之後即可登入查看審核進度：', confirmButton: '驗證 Email',
    approved: '你的機師履歷已通過審核', approvedBody: '恭喜！案件 {case} 已通過審核，你已成為 Always Happy 專業會員，登入後即可瀏覽會員內容。', approvedButton: '前往會員內容',
    needsInfo: '你的機師履歷需要補件', needsInfoBody: '案件 {case} 需要補充以下資料：', needsInfoButton: '登入並補件',
  },
  'zh-Hans': {
    received: '已收到你的飞行员简历', resubmitted: '已收到你的补充资料',
    receivedBody: '我们已收到你的资料，案件编号 {case}。审核人员会尽快人工审阅，结果将通过电子邮件通知。',
    confirm: '请点击下方按钮验证邮箱并启用账号，之后即可登录查看审核进度：', confirmButton: '验证邮箱',
    approved: '你的飞行员简历已通过审核', approvedBody: '恭喜！案件 {case} 已通过审核，你已成为 Always Happy 专业会员，登录后即可浏览会员内容。', approvedButton: '前往会员内容',
    needsInfo: '你的飞行员简历需要补充资料', needsInfoBody: '案件 {case} 需要补充以下资料：', needsInfoButton: '登录并补充资料',
  },
  en: {
    received: 'We have received your pilot profile', resubmitted: 'We have received your updated profile',
    receivedBody: 'Your case number is {case}. Our team will review it personally and let you know the outcome by email.',
    confirm: 'Please confirm your email address to activate your account and track your application:', confirmButton: 'Confirm email',
    approved: 'Your pilot profile has been approved', approvedBody: 'Congratulations! Case {case} has been approved and you are now an Always Happy professional member. Sign in to view member content.', approvedButton: 'View member content',
    needsInfo: 'More information needed for your pilot profile', needsInfoBody: 'Case {case} needs the following additional information:', needsInfoButton: 'Sign in and update',
  },
};
const pick = (lang: unknown) => copy[(lang as Lang) in copy ? (lang as Lang) : 'zh-Hant'];

export function receivedEmail(app: Application, resubmitted: boolean, confirmUrl?: string) {
  const c = pick(app.language);
  const html = layout(
    paragraph(c.receivedBody.replace('{case}', String(app.case_no))) +
      (confirmUrl ? paragraph(c.confirm) + button(confirmUrl, c.confirmButton) : ''),
  );
  return { subject: `${resubmitted ? c.resubmitted : c.received}｜${app.case_no}`, html };
}

export function approvedEmail(app: Application) {
  const c = pick(app.language);
  const html = layout(paragraph(c.approvedBody.replace('{case}', String(app.case_no))) + button(`${siteUrl()}/insights/#member-area`, c.approvedButton));
  return { subject: `${c.approved}｜${app.case_no}`, html };
}

export function staffEnquiryEmail(caseNo: string, title: string, name: string, rows: [string, string][]) {
  const html = layout(
    `<h2 style="margin-top:0">新的${escapeHtml(title)}：${escapeHtml(caseNo)}</h2>` +
      rowsTable(rows) +
      `<p style="font-size:12px;color:#61717b">直接回覆此信即可聯繫填表人。此信含個人資料，請勿轉寄。</p>`,
  );
  return { subject: `[${title}] ${caseNo} ${name}`, html };
}

const enquiryCopy = {
  'zh-Hant': { subject: '已收到你的諮詢', body: '感謝你與 Always Happy 聯繫。我們已收到你的資料（編號 {case}），將由專人盡快以 Email 回覆。' },
  'zh-Hans': { subject: '已收到你的咨询', body: '感谢你与 Always Happy 联系。我们已收到你的资料（编号 {case}），将由专人尽快通过电子邮件回复。' },
  en: { subject: 'We have received your enquiry', body: 'Thank you for contacting Always Happy. We have received your details (reference {case}) and our team will reply by email shortly.' },
};

export function enquiryReceivedEmail(caseNo: string, language: unknown) {
  const c = enquiryCopy[(language as Lang) in enquiryCopy ? (language as Lang) : 'zh-Hant'];
  return { subject: `${c.subject}｜${caseNo}`, html: layout(paragraph(c.body.replace('{case}', caseNo))) };
}

export function needsInfoEmail(app: Application, reviewNote: string) {
  const c = pick(app.language);
  const html = layout(paragraph(c.needsInfoBody.replace('{case}', String(app.case_no))) + note(reviewNote) + button(`${siteUrl()}/for-pilots/#pilot-profile`, c.needsInfoButton));
  return { subject: `${c.needsInfo}｜${app.case_no}`, html };
}
