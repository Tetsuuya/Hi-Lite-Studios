import StripPanel from '../components/common/StripPanel';
import Hero from '../components/common/Hero';
import About from './About';

const Home = () => {
  return (
    <div className="min-h-screen">
      
      <section id="strip">
        <StripPanel />
      </section>

      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>
      
    </div>
  );
};

export default Home;
