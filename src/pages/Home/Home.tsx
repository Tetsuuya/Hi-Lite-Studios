import { useState } from 'react'
import StripPanel from '@/components/common/StripPanel'
import Hero from '@/components/common/Hero'
import HeroMobile from '@/components/common/HeroMobile'
import AboutSection from '@/components/sections/AboutSection'
import WorksSection from '@/components/sections/WorksSection'
import ServicesSection from '@/components/sections/ServicesSection'
import MagazineSection from '@/components/sections/MagazineSection'
import FAQSection from '@/components/sections/FAQSection'
import CaptureSection from '@/components/sections/CaptureSection'
import { Chatbot } from '@/components/common/Chatbot'
import ChatbotButton from '@/assets/images/ChatbotButton.png'

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  return (
    <div className="min-h-screen">
      <section id="strip">
        <StripPanel />
      </section>

      <section id="hero">
        <div className="md:hidden">
          <HeroMobile />
        </div>
        <div className="hidden md:block">
          <Hero />
        </div>
      </section>

      <section id="about-section">
        <AboutSection />
      </section>

      <section id="works-section">
        <WorksSection />
      </section>

      <section id="services-section">
        <ServicesSection />
      </section>

      <section id="magazine-section">
        <MagazineSection />
      </section>

      <section id="faq-section">
        <FAQSection />
      </section>

      <section id="capture">
        <CaptureSection />
      </section>

      {/* Chatbot Button */}
      <div className="fixed bottom-3 right-3 md:bottom-8 md:right-8 z-50">
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="w-14 h-14 md:w-20 md:h-20 rounded-full shadow-lg cursor-pointer transition hover:shadow-[0_0_25px_rgba(0,123,255,0.9)]"
        >
          <img
            src={ChatbotButton}
            alt="Chatbot Button"
            className="w-full h-full rounded-full"
          />
        </button>

        {isChatbotOpen && (
          <div className="absolute bottom-16 -right-2 md:right-0 md:bottom-24 w-72 md:w-96 max-h-[65vh] md:max-h-none">
            <Chatbot onClose={() => setIsChatbotOpen(false)} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
