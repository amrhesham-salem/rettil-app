import { useNavigate } from 'react-router-dom';
import { ChevronsLeft } from 'lucide-react';
import { CHALLENGE_CARDS } from '../../../data/landing.data';
import historyBg from '../../../assets/images/HistorywithoutData.png';

const BUTTON_STYLES = {
  filled:
    'text-white bg-linear-to-r from-brand-secondary via-[#B89C6E] to-brand-secondary shadow-md hover:brightness-110',
  outline: 'text-white border border-white hover:bg-white/10',
} as const;

export const ChallengesSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="challenges"
      dir="rtl"
      className="relative w-full bg-white pb-16 md:pb-24 px-4 sm:px-8 overflow-hidden"
    >
      <div className="relative z-10">
        <span className="flex items-center justify-center gap-2 text-brand-secondary text-[13px] font-bold mb-4 pt-16">
          <span className="w-5 h-px bg-brand-secondary/60" />
          التحديات
        </span>

        <h2 className="text-center text-[30px] sm:text-[36px] font-extrabold text-black mb-12">
          اختر أسلوب المراجعة المناسب لك
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {CHALLENGE_CARDS.map((card) => (
            <div
              key={card.id}
              className="rounded-2xl p-8 text-white text-right relative overflow-hidden flex flex-col justify-between min-h-66 bg-cover bg-center"
              style={{ backgroundImage: `url(${historyBg})` }}
            >
              <div>
                <h3 className="text-[22px] font-extrabold mb-3">{card.title}</h3>
                <p className="text-white/80 text-[13px] leading-relaxed mb-6 max-w-95">
                  {card.description}
                </p>
              </div>
              <button
                onClick={() => navigate(card.to)}
                className={`self-start flex items-center gap-2 font-bold text-[14px] px-6 py-2.5 rounded-lg cursor-pointer transition-all ${BUTTON_STYLES[card.variant]}`}
              >
                <span>{card.buttonLabel}</span>
                <ChevronsLeft size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};