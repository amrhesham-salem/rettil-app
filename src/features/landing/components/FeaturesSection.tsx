import { PLATFORM_FEATURES } from '../../../data/landing.data';

export const FeaturesSection = () => (
  <div className="relative bg-white py-16 md:py-24 px-4 sm:px-8 overflow-hidden" dir="rtl">
    <img
      alt=""
      aria-hidden="true"
      className="hidden md:block absolute inset-0 w-full h-full object-cover object-top scale-x-[-1] pointer-events-none select-none"
    />

    <div className="relative z-10 max-w-5xl mx-auto">
      <span className="flex items-center justify-center gap-2 text-brand-secondary text-[13px] font-bold mb-4">
        <span className="w-5 h-px bg-brand-secondary/60" />
        قيم المنصة
      </span>

      <h2 className="text-center text-[30px] sm:text-[36px] font-extrabold text-black mb-16">
        راجع حفظك بثقة وتركيز
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {PLATFORM_FEATURES.map(({ Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-lg bg-[#DCE6DF] text-brand-dark flex items-center justify-center mb-4">
              <Icon size={16} strokeWidth={1.6} />
            </div>
            <h4 className="font-extrabold text-black text-[15px] mb-1.5">{title}</h4>
            <p className="text-gray-500 text-[12px] leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);