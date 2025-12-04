import { useNavigate } from 'react-router-dom'
import AboutBackground from '@/assets/images/AboutBackground.png';
import AboutHeader from '@/assets/images/AboutHeader.png';
import BlueBorder from '@/assets/images/BorderBlue.png';
import LearnButton from '@/assets/images/LearnButton.png';
import Subtract from '@/assets/images/Subtract.png';

const AboutSection = () => {
  const navigate = useNavigate()
  return (
    <section id="about" className="relative w-full bg-white overflow-hidden">
      {/* Top Accent Border */}
      <div className="w-full relative flex justify-center pt-2 md:pt-6 pb-2 md:pb-4 z-20">
        <img
          src={BlueBorder}
          alt="Top blue border"
          className="w-full object-cover"
        />
      </div>

      {/* Background Layer */}
      <div className="relative w-full h-auto md:h-[400px] mx-auto">
        {/* Background image */}
        <img
          src={AboutBackground}
          alt="About page background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Main Content */}
        <div className="relative z-10 max-w-full md:max-w-6xl mx-auto flex flex-col gap-0 md:gap-1 md:h-full h-auto px-2 md:px-6 py-6 md:py-8">
          {/* Header */}
          <div className="flex justify-start md:justify-start items-start md:items-start -mt-2 md:-mt-5 pl-0 md:pl-36 mb-4 md:mb-0">
            <img
              src={AboutHeader}
              alt="About Hi-Lite Studio header"
              className="w-sm md:w-full md:max-w-xl object-contain"
            />
          </div>

          {/* Grid Content */}
          <div className="flex flex-row items-start justify-start gap-1 md:gap-3 pl-0 md:pl-36">
            {/* Illustration */}
            <div className="w-10 md:w-16 shrink-0 pt-0.5 md:pt-0">
              <img
                src={Subtract}
                alt="abstract subtract illustration"
                className="w-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Text Section */}
            <div className="flex-1 px-2 md:px-4 max-w-[320px] md:max-w-2xl">
              <p className="text-[12px] md:text-lg leading-tight md:leading-relaxed text-left md:text-justify text-white">
                At Hi-Lite Studio, we create photographs and videos that feel genuine, warm, and intentional.
                Based in Cagayan de Oro, we specialize in capturing stories whether for families, students,
                or organizations through a blend of technical precision and emotional depth. Every project is
                shaped by our passion for storytelling and our commitment to delivering timeless, meaningful
                visuals.
              </p>

              <button 
                type="button"
                onClick={() => navigate('/about')}
                className="relative mt-4 inline-flex w-24 md:w-32 transition hover:opacity-90 hover:scale-[1.02] hover:drop-shadow-[0_0_25px_rgba(41,20,113,0.35)]"
              >
                <img
                  src={LearnButton}
                  alt="Learn more button"
                  className="w-32 md:w-48 h-auto object-contain drop-shadow-lg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Border */}
      <div className="w-full relative pt-2 md:pt-4 pb-2 md:pb-6 z-20">
        <img
          src={BlueBorder}
          alt="Bottom blue border"
          className="w-full object-cover"
        />
      </div>
    </section>
  );
};

export default AboutSection;