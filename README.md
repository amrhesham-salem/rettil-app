# رَتِّل (Rattil App) — منصة مراجعة حفظ القرآن الكريم

منصة ويب تفاعلية لمراجعة وتثبيت حفظ القرآن الكريم من خلال تحديات الآية المفقودة (تحدي عشوائي أو تحدي مخصص حسب السورة والجزء)، مع متابعة سجل الاختبارات ولوحة المتصدرين.

## التقنيات المستخدمة (Tech Stack)

- **الإطار الأساسي:** React 19 + TypeScript + Vite
- **التنسيق (Styling):** Tailwind CSS v4 (RTL Arabic-first)
- **التوجيه (Routing):** React Router DOM v7 (Lazy Loading + Route Guards)
- **إدارة حالة البيانات والكاش:** TanStack React Query v5
- **النماذج والتحقق (Forms & Validation):** React Hook Form + Zod
- **الاتصال بالشبكة:** Axios (`src/lib/axios.ts`)

## هيكل المشروع (Feature-Based Clean Architecture)

```text
src/
├── app/                  # إعدادات التطبيق العليا (Providers, AppRouter)
├── assets/               # الصور والشعارات
├── components/           # المكونات العامة المشتركة (auth, layout, ui)
├── config/               # إعدادات البيئة (env.ts)
├── constants/            # الثوابت العامة (ROUTES, STORAGE_KEYS, QUERY_KEYS, SURAHS, JUZ_NUMBERS)
├── context/              # إدارة الجلسة والمستخدم الحالي (AuthContext, AuthProvider)
├── data/                 # البيانات الثابتة لصفحة الهبوط (landing.data.ts)
├── features/             # المكونات المقسمة حسب الميزة (Clean Modular Features)
│   ├── landing/          # أقسام صفحة الهبوط
│   ├── dashboard/        # مكونات لوحة التحكم والمتصدرين (Hero, Table, Podium)
│   ├── challenge/        # مكونات اختيار التحدي وجلسة الأسئلة (Cards, QuestionCard)
│   ├── history/          # مكونات جدول سجل الاختبارات وحالة عدم وجود بيانات
│   └── profile/          # مكونات الملف الشخصي ونماذج التعديل ومودال الخروج
├── hooks/                # Custom Hooks لفصل منطق البيانات عن الواجهة (useAuth, useLeaderboard, ...)
├── lib/                  # تهيئة المكتبات (axios.ts, queryClient.ts)
├── pages/                # صفحات التطبيق (رشيقة ومرتبة تستدعي المكونات من features/)
├── schemas/              # مخططات التحقق بواسطة Zod (auth, challenge, profile)
├── services/             # طبقة الخدمات الموحدة (authService, challengeService, leaderboardService)
├── types/                # تعريفات TypeScript المقسمة حسب النطاق (auth, challenge, history, leaderboard)
└── utils/                # دوال مساعدة للأرقام العربية والتواريخ (toArabicDigits, formatDateTime)
```

## التشغيل السريع

```bash
npm install
npm run dev
```
