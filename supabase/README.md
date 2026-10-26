# 機師履歷後台：部署說明

系統運作邏輯、更換審核人與日常維護，請見 [../BACKEND.md](../BACKEND.md)。

流程：申請人在「我是機師」填表並設定密碼 → `submit-application` 建立帳號、寫入 `pilot_applications`，用 Resend 寄出含完整履歷的審核信給審核人，並寄收件確認與 Email 驗證信給申請人 → 審核人點信中連結（14 天有效、綁定該次送件）開啟 `/review/`，按「同意」或「要求補件」→ `review-application` 更新狀態並寄信通知申請人 → 補件者登入後修改並重新送出；通過者登入知識中心即可看 `member_content`。

## 1. 事前準備

- Supabase 專案（記下 Project ref、Project URL、anon key）。
- Resend 帳號，並**驗證寄件網域**（例如 `alwayshappy.com.tw`）；未驗證網域只能寄給自己。
- 網站正式網址，例如 `https://xxxx.chatgpt.site`。

## 2. 建立資料表

任選一種：

- 在 Supabase Dashboard → SQL Editor 貼上並執行 `migrations/20261026000000_pilot_applications.sql`；或
- 在 `site-source/` 執行：`npx supabase login`、`npx supabase link --project-ref <ref>`、`npx supabase db push`。

## 3. 設定 Auth

Dashboard → Authentication：

- **URL Configuration**：Site URL 填網站網址；Redirect URLs 加入 `https://<網站>/for-pilots/`。
- **Providers → Email**：保持「Confirm email」開啟（驗證信由我們透過 Resend 寄出，Supabase 不會另寄）。

## 4. 設定 Edge Function 密鑰並部署

在 `site-source/` 執行（值換成你的）：

```
npx supabase secrets set --project-ref <ref> RESEND_API_KEY=re_xxx MAIL_FROM="Always Happy <noreply@你的網域>" REVIEWER_EMAILS="leon@...,tiger@..." SITE_URL=https://<網站> REVIEW_TOKEN_SECRET=<隨機長字串>
npx supabase functions deploy submit-application --project-ref <ref> --no-verify-jwt
npx supabase functions deploy review-application --project-ref <ref> --no-verify-jwt
```

`REVIEW_TOKEN_SECRET` 可用 `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` 產生。更換它會讓所有尚未處理的審核連結失效。

## 5. 開啟前台

編輯 `dist/assets/config.js`，填入 Project URL 與 **anon key**（絕不可放 service role key），重新部署 `dist/`。留空時表單維持原本的預覽模式。

## 6. 會員內容

在 Dashboard → Table Editor → `member_content` 新增資料（`title`、`body`；`published=false` 可先隱藏）。只有審核通過的機師登入後看得到。

## 注意事項

- 審核信含完整履歷個資，審核連結持有者即可檢視與操作，請勿轉寄。
- 所有送件、審核與寄信失敗都記錄在 `pilot_application_events`；寄信失敗不影響資料寫入，請定期查看 `action = 'email_failed'`。
- 尚未實作：忘記密碼、附件上傳、拒絕（不通過）狀態、後台案件列表。案件可先在 Table Editor 檢視。
