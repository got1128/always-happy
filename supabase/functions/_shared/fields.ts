// Pilot profile fields. Keys match the pilot_applications columns and the
// form control names in dist/assets/v5.js; labels are for reviewer emails.

type Field = {
  key: string;
  label: string;
  type?: 'email' | 'int';
  required?: boolean;
  max?: number;
  options?: Record<string, string>;
};

export const FIELDS: Field[] = [
  { key: 'full_name', label: '姓名', required: true, max: 100 },
  { key: 'email', label: 'Email', type: 'email', required: true, max: 200 },
  { key: 'phone', label: '電話', required: true, max: 50 },
  { key: 'location', label: '目前所在國家／城市', max: 100 },
  { key: 'nationality', label: '國籍', max: 100 },
  { key: 'contact_time', label: '方便聯絡時段', options: { weekday_day: '平日白天', weekday_evening: '平日晚上', weekend: '週末', any: '皆可' } },
  { key: 'employment_status', label: '目前是否在職', options: { employed: '目前在職', unemployed: '目前待業', leaving: '即將離職' } },
  { key: 'current_airline', label: '目前／最近任職航空公司', max: 200 },
  { key: 'previous_airlines', label: '曾任航空公司', max: 500 },
  { key: 'role', label: '職稱', max: 100 },
  { key: 'employment_period', label: '任職期間', max: 100 },
  { key: 'licence', label: '持有執照', required: true, max: 200 },
  { key: 'licence_country', label: '執照簽發國家', max: 100 },
  { key: 'aircraft_types', label: '可飛機型', max: 300 },
  { key: 'type_rating', label: '是否持有 Type Rating', options: { yes: '是', no: '否' } },
  { key: 'total_hours', label: '總飛行時數', type: 'int', required: true },
  { key: 'pic_hours', label: 'PIC 時數', type: 'int' },
  { key: 'english', label: '英文能力', options: { icao4: 'ICAO Level 4', icao5: 'ICAO Level 5', icao6: 'ICAO Level 6', other: '其他' } },
  { key: 'target_location', label: '目標國家／基地', max: 200 },
  { key: 'work_type', label: '可接受的工作型態', options: { full_time: '全職', contract: '合約', roster: '輪班／派駐', open: '皆可討論' } },
  { key: 'availability', label: '可到職時間', max: 100 },
  { key: 'notes', label: '補充說明', max: 3000 },
];

export type Application = Record<string, string | number | null>;

export function normalizeApplication(raw: unknown): { data: Application; errors: string[] } {
  const input = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const data: Application = {};
  const errors: string[] = [];
  for (const f of FIELDS) {
    const value = typeof input[f.key] === 'string' ? (input[f.key] as string).trim() : '';
    if (!value) {
      if (f.required) errors.push(f.key);
      data[f.key] = null;
      continue;
    }
    if (f.options && !(value in f.options)) errors.push(f.key);
    else if (f.type === 'int' && !/^\d{1,6}$/.test(value)) errors.push(f.key);
    else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.push(f.key);
    else if (f.max && value.length > f.max) errors.push(f.key);
    data[f.key] = f.type === 'int' ? Number(value) : value;
  }
  return { data, errors };
}

export const displayRows = (app: Application) =>
  FIELDS.map((f) => {
    const v = app[f.key];
    const shown = v === null || v === undefined || v === '' ? '—' : f.options ? f.options[String(v)] ?? String(v) : String(v);
    return [f.label, shown] as [string, string];
  });
