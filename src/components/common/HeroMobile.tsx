import { useNavigate } from 'react-router-dom';
import StarYellow from '@/assets/images/StarYellow.png';

const HeroMobile = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-white overflow-hidden h-auto md:h-[75vh] flex flex-col">
      {/* Star Yellow Background - Top */}
      <div className="absolute top-0 -left-20 md:-left-70 w-[400px] md:w-[800px] h-[500px] md:h-[550px] opacity-70 pointer-events-none">
        <img
          src={StarYellow}
          alt="Abstract geometric graphic"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="relative mx-auto flex w-full flex-1 flex-col px-4 md:px-4 py-3 md:py-3">
        {/* Text */}
        <div className="relative z-10 flex flex-col justify-start">
          <p className="mb-1 text-2xl sm:text-xl font-medium text-black">Welcome,</p>
          <h1 className="text-6xl sm:text-6xl font-black bg-linear-to-r from-[#291471] to-[#4E26D7] bg-clip-text text-transparent leading-none">
            <span className="block">This is Hi-</span>
            <span className="block">Lite Studio.</span>
          </h1>
          <p className="mt-3 text-md sm:text-base text-black font-medium">
            where vision and storytelling unite.
          </p>
        </div>

        {/* Buttons - Scattered */}
        <div className="relative z-10 mt-13 h-[200px]">
          <div className="absolute top-7 left-63 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#291471] to-[#4E26D7] px-3 py-2 text-xs font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(74,20,140,0.6)] opacity-80" style={{ animation: 'floatY 4s ease-in-out infinite' }}>
            Capture with us
          </div>

          <div className="absolute bottom-12 left-10 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#291471] to-[#4E26D7] px-3 py-2 text-xs font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(74,20,140,0.6)] opacity-80" style={{ animation: 'floatY 5s ease-in-out infinite', animationDelay: '0.2s' }}>
            Own your spotlight
          </div>
          
          <button
            onClick={() => navigate('/appointment')}
            className="absolute left-50 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-md bg-linear-to-r from-[#F2322E] to-[#AA1815] px-4 sm:px-5 py-4 sm:py-2 text-xs sm:text-sm md:text-base font-semibold italic text-white shadow-lg transition hover:shadow-[0_0_25px_rgba(242,50,46,0.7)] hover:scale-[1.02] whitespace-nowrap">
            <span className="relative z-10">Book Appointment</span>
          </button>

          <div className="absolute top-0 left-39 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#F2322E] to-[#AA1815] px-3 py-1.5 text-xs font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(242,50,46,0.6)] opacity-80" style={{ animation: 'floatY 4.5s ease-in-out infinite', animationDelay: '0.1s' }}>
            Create moments
          </div>

          <div className="absolute bottom-1 left-30 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#F2322E] to-[#AA1815] px-3 py-1.5 text-xs font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(242,50,46,0.6)] opacity-80" style={{ animation: 'floatY 5.2s ease-in-out infinite', animationDelay: '0.3s' }}>
            Make your memories
          </div>

          <div className="absolute bottom-33 left-15 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#FBC93D] to-[#FF8000] px-3 py-1.5 text-xs font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(255,193,7,0.6)] opacity-80" style={{ animation: 'floatY 4.8s ease-in-out infinite', animationDelay: '0.15s' }}>
            Dream with us
          </div>

          <div className="absolute bottom-10 left-60 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#FBC93D] to-[#FF8000] px-3 py-1.5 text-xs font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(255,193,7,0.6)] opacity-80" style={{ animation: 'floatY 5.4s ease-in-out infinite', animationDelay: '0.25s' }}>
            Frame your story
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMobile;