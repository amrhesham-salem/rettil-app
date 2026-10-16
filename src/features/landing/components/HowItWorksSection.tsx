import { HOW_IT_WORKS_STEPS } from '../../../data/landing.data';

export const HowItWorksSection = () => (
  <section
    id="how-it-works"
    dir="rtl"
    className="w-full bg-brand-light py-16 md:py-24 px-4 sm:px-8"
  >
    <span className="flex items-center justify-center gap-2 text-brand-secondary text-[13px] font-bold mb-4">
      <span className="w-5 h-px bg-brand-secondary/60" />
      كيف يعمل؟
    </span>

    <h2 className="text-center text-[30px] sm:text-[36px] font-extrabold text-black mb-14">
      ثلاث خطوات بسيطة
    </h2>

    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
      {HOW_IT_WORKS_STEPS.map(({ number, Icon, title, description }) => (
        <div
          key={title}
          className="bg-white rounded-2xl p-6 border border-brand-sand shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-right hover:-translate-y-1 transition-transform"
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-brand-secondary font-bold text-[16px]">{number}</span>
            <Icon size={22} strokeWidth={1.5} className="text-brand-secondary" />
          </div>
          <h3 className="text-[20px] font-extrabold text-black mb-2">{title}</h3>
          <p className="text-gray-500 text-[13px] leading-relaxed">{description}</p>
        </div>
      ))}
    </div>
  </section>
);