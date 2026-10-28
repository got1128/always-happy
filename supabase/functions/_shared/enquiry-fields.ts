// Enquiry form fields per page. Keys and codes match enquirySpecs in
// dist/assets/v5.js; labels are for staff notification emails.

type Field = { key: string; label: string; required?: boolean; type?: 'email' | 'int'; options?: Record<string, string> };

const status = { student: '在校學生', recent_graduate: '應屆畢業生', graduate_employed: '已畢業／在職', graduate: '已畢業', employed: '在職', other: '其他' };

export const ENQUIRY_TYPES: Record<string, { title: string; fields: Field[] }> = {
  aspiring: {
    title: '想成為機師諮詢',
    fields: [
      { key: 'full_name', label: '姓名', required: true },
      { key: 'email', label: 'Email', required: true, type: 'email' },
      { key: 'phone', label: '聯絡電話' },
      { key: 'status', label: '目前身分', options: status },
      { key: 'pathway', label: '感興趣的路線', required: true, options: { cadet: '航空公司培訓機師', overseas: '海外飛行訓練', both: '兩者都想了解' } },
      { key: 'english', label: '英文能力／準備情況' },
      { key: 'questions', label: '想了解的問題' },
    ],
  },
  cabin: {
    title: '空服員招生意願登記',
    fields: [
      { key: 'full_name', label: '姓名', required: true },
      { key: 'email', label: 'Email', required: true, type: 'email' },
      { key: 'phone', label: '聯絡電話' },
      { key: 'status', label: '目前身分', options: status },
      { key: 'topic', label: '希望諮詢的方向', options: { career: '空服員職涯', recruitment: '招生意願', eligibility: '資格與準備' } },
      { key: 'contact_time', label: '方便聯絡時段', options: { weekday_day: '平日白天', weekday_evening: '平日晚上', weekend: '週末' } },
      { key: 'questions', label: '補充問題' },
    ],
  },
  airlines: {
    title: '航空公司人才需求洽詢',
    fields: [
      { key: 'company', label: '航空公司／企業名稱', required: true },
      { key: 'full_name', label: '聯絡人姓名', required: true },
      { key: 'contact_role', label: '聯絡人職務' },
      { key: 'email', label: '公司 Email', required: true, type: 'email' },
      { key: 'need', label: '需求類型', required: true, options: { captain_fo: '機長／副機師', cabin_crew: '空服員', other_roles: '其他航空專業職務', training: '培訓合作' } },
      { key: 'requirements', label: '機型與資格要求' },
      { key: 'headcount', label: '預計人數', type: 'int' },
      { key: 'timeframe', label: '希望合作時程' },
      { key: 'details', label: '需求說明' },
    ],
  },
};

const LONG_TEXT = new Set(['questions', 'details']);

export function normalizeEnquiry(type: string, raw: unknown) {
  const spec = ENQUIRY_TYPES[type];
  const input = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const data: Record<string, string | number | null> = {};
  const errors: string[] = [];
  for (const f of spec.fields) {
    const value = typeof input[f.key] === 'string' ? (input[f.key] as string).trim() : '';
    if (!value) {
      if (f.required) errors.push(f.key);
      data[f.key] = null;
      continue;
    }
    if (f.options && !(value in f.options)) errors.push(f.key);
    else if (f.type === 'int' && !/^\d{1,5}$/.test(value)) errors.push(f.key);
    else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.push(f.key);
    else if (value.length > (LONG_TEXT.has(f.key) ? 3000 : 200)) errors.push(f.key);
    data[f.key] = f.type === 'int' ? Number(value) : value;
  }
  return { data, errors };
}

export const enquiryRows = (type: string, data: Record<string, unknown>) =>
  ENQUIRY_TYPES[type].fields.map((f) => {
    const v = data[f.key];
    const shown = v === null || v === undefined || v === '' ? '—' : f.options ? f.options[String(v)] ?? String(v) : String(v);
    return [f.label, shown] as [string, string];
  });
