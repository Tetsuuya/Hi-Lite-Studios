import Intersect from '@/assets/images/Intersect.png';
import Logo from '@/assets/images/Logo.png';
import ChatbotButton from '@/assets/images/Chatbot Button.png';

const Hero = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-4 pb-16">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-start">
        {/* Left Side */}
        <div className="relative flex w-full flex-col justify-start px-6 md:w-1/2 md:px-8">
          <img
            src={Intersect}
            alt="Abstract geometric graphic"
            className="absolute -left-14 w-1/2 max-w-[300px] object-contain"
          />

          {/* Foreground Text */}
          <div className="relative z-10 mb-6 mt-10 pl-10">
            <p className="mb-2 text-2xl font-medium text-black">Welcome,</p>
            <h1 className="text-6xl font-black bg-linear-to-r from-[#291471] to-[#4E26D7] bg-clip-text text-transparent md:text-7xl">
              <span className="block">This is Hi-</span>
              <span className="block">Lite Studio.</span>
            </h1>
            <p className="mt-3 text-xl text-black md:text-2xl">
              where vision and storytelling unite.
            </p>
          </div>

            {/* Button Cluster */}
            <div className="relative z-10 mx-auto mt-4 h-[280px] w-full max-w-xl">
            <div className="absolute right-2 top-16 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#291471] to-[#4E26D7] px-6 py-3 font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(74,20,140,0.6)]">
              Capture with us
            </div>

            <div className="absolute left-2 bottom-16 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#291471] to-[#4E26D7] px-6 py-3 font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(74,20,140,0.6)]">
              Own your spotlight
            </div>
            
            <button
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-linear-to-r from-[#F2322E] to-[#AA1815] px-8 py-5 text-xl font-semibold italic text-white shadow-lg transition hover:shadow-xl">
              <span className="relative z-10">Book Appointment</span>
              <span className="absolute inset-0 rounded-2xl p-1 pointer-events-none border-sweep-mask"></span>
            </button>

            <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#F2322E] to-[#AA1815] px-5 py-2.5 font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(242,50,46,0.6)]">
              Create moments
            </div>

            <div className="absolute left-1/3 bottom-0 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#F2322E] to-[#AA1815] px-4 py-2.5 font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(242,50,46,0.6)]">
              Make your memories
            </div>

            <div className="absolute left-8 top-12 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#FBC93D] to-[#FF8000] px-5 py-2 font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(255,193,7,0.6)]">
              Dream with us
            </div>

            <div className="absolute right-8 bottom-10 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#FBC93D] to-[#FF8000] px-4 py-2 font-medium italic text-white transition hover:shadow-[0_0_15px_rgba(255,193,7,0.6)]">
              Frame your story
            </div>
            </div>
          </div>

        {/* Right Side */}
        <div className="relative flex w-full justify-center md:w-1/2">
          <div className="w-full max-w-lg px-6 md:px-0">
            <img
              src={Logo}
              alt="Hi-Lite Studio Logo"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <img
          src={ChatbotButton}
          alt="Chatbot Button"
          className="w-20 h-20 rounded-full shadow-lg cursor-pointer transition hover:shadow-[0_0_25px_rgba(0,123,255,0.9)]"
        />
      </div>
    </section>
  );
};

export default Hero;