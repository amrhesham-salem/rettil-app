import { Gamepad2, Edit3, Trophy, CircleCheck, NotebookText, AlignJustify, CalendarClock } from 'lucide-react';
import { ROUTES } from '../constants/routes';

export const HOW_IT_WORKS_STEPS = [
  {
    number: '١.',
    Icon: Gamepad2,
    title: 'اختر التحدي',
    description: 'اختر بين التحدي العشوائي لاختبار شامل أو حدد سورة وجزءاً معيناً للتركيز على حفظها.',
  },
  {
    number: '٢.',
    Icon: Edit3,
    title: 'أجب عن الآية المفقودة',
    description: 'استعرض السياق القرآني المحيط بالآية المفقودة واختر الإجابة الصحيحة من بين الخيارات.',
  },
  {
    number: '٣.',
    Icon: Trophy,
    title: 'احصل على النقاط وراجع نتائجك',
    description: 'كل إجابة صحيحة تمنحك نقاطاً تضاف لرصيدك، مع إمكانية مراجعة تاريخ اختباراتك وتطور مستواك.',
  },
] as const;

export const PLATFORM_FEATURES = [
  { Icon: CircleCheck, title: 'تجربة بسيطة', description: 'خطوات واضحة من البداية للنهاية.' },
  { Icon: NotebookText, title: 'سياق قرآني واضح', description: 'الآيات المحيطة تظهر معك أثناء الاختبار.' },
  { Icon: AlignJustify, title: 'تغذية راجعة فورية', description: 'تعرف صحة إجابتك مباشرة بعد الاختبار.' },
  { Icon: CalendarClock, title: 'نتائج محفوظة', description: 'راجع اختباراتك السابقة في أي وقت.' },
] as const;

export const CHALLENGE_CARDS = [
  {
    id: 'random',
    title: 'تحدي عشوائي',
    description: 'اختبر قوة حفظك بآيات عشوائية من مختلف سور القرآن الكريم. مناسب للمراجعة العامة.',
    buttonLabel: 'ابدأ التحدي العشوائي',
    to: ROUTES.challengePreview,
    variant: 'filled',
  },
  {
    id: 'specific',
    title: 'تحدي محدد',
    description: 'اختر سورة أو جزءاً محدداً ترغب في مراجعة حفظه واختبار إتقانك له بدقة.',
    buttonLabel: 'ابدأ التحدي المحدد',
    to: ROUTES.login,
    variant: 'outline',
  },
] as const;

export const QUIZ_PREVIEW = {
  surah: 'سورة البقرة',
  previousAyah: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ',
  prompt: '... ما هي الآية التالية؟ ...',
  nextAyah: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ',
  options: [
    { text: 'وَاللَّهُ غَفُورٌ رَّحِيمٌ', correct: false },
    { text: 'هُدًى لِّلْمُتَّقِينَ', correct: true },
    { text: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', correct: false },
    { text: 'وَاللَّهُ بِمَا تَعْمَلُونَ عَلِيمٌ', correct: false },
  ],
} as const;

export const NAV_LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'كيف يعمل؟', href: '#how-it-works' },
  { label: 'التحديات', href: '#challenges' },
] as const;

export const FOOTER_LINKS = NAV_LINKS;

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Facebook', href: '#' },
] as const;