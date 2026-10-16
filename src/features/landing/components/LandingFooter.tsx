import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaXTwitter, FaFacebookF } from 'react-icons/fa6';
import { ROUTES } from '../../../constants/routes';
import { FOOTER_LINKS } from '../../../data/landing.data';
import logo from '../../../assets/images/logo.svg';

const SOCIAL_ICONS = [
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'Twitter', Icon: FaXTwitter },
  { label: 'Facebook', Icon: FaFacebookF },
] as const;

const HEADING = 'font-bold text-[#C9A978] text-[13px] mb-6';
const LINK = 'hover:text-white transition-colors cursor-pointer';

export const LandingFooter = () => {
  const navigate = useNavigate();

  return (
    <footer dir="rtl" className="w-full bg-[#03170E] text-white pt-12 pb-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 pb-16">
          <div className="md:max-w-90">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-extrabold text-[24px] text-white">رَتِّل</span>
              <img src={logo} alt="" aria-hidden="true" className="h-5 w-auto" />
            </div>
            <p className="text-white/80 text-[13px] leading-[1.9]">
              منصة تفاعلية تهدف لمساعدة المسلمين على مراجعة وتثبيت حفظهم للقرآن الكريم بطريقة حديثة ومحفزة.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 md:gap-16">
            <div>
              <h4 className={HEADING}>روابط</h4>
              <ul className="flex flex-col gap-4 text-[13px] text-white/90">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={LINK}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={HEADING}>الحساب</h4>
              <ul className="flex flex-col gap-4 text-[13px] text-white/90">
                <li><button onClick={() => navigate(ROUTES.login)} className={LINK}>تسجيل الدخول</button></li>
                <li><button onClick={() => navigate(ROUTES.profile)} className={LINK}>الملف الشخصي</button></li>
                <li><span className={LINK}>سياسة الخصوصية</span></li>
              </ul>
            </div>

            <div>
              <h4 className={HEADING}>تواصل معنا</h4>
              <div className="flex items-center gap-3">
                {SOCIAL_ICONS.map(({ label, Icon }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-6.75 h-6.75 rounded-full border border-white/80 flex items-center justify-center hover:bg-white/10 transition-all"
                  >
                    <Icon size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 pt-8 flex flex-col sm:flex-row items-center justify-between text-white/60 text-[12px] gap-4">
          <p>© {new Date().getFullYear()} رَتِّل. جميع الحقوق محفوظة.</p>
          <p>صُنِع بكل حب لخدمة كتاب الله</p>
        </div>
      </div>
    </footer>
  );
};