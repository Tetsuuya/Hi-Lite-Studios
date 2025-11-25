import { Link } from 'react-router-dom';
import Wordmark from '@/assets/images/Wordmark.png';

const Navbar = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      <nav className="w-full bg-white px-14  py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-14">
          <Link 
            to="/works" 
            className="relative text-[#212121] hover:text-blue-800 transition-colors font-medium before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-0.5 before:w-0 before:bg-blue-800 before:transition-all before:duration-300 hover:before:w-full"
          >
            Works
          </Link>
          <Link 
            to="/services" 
            className="relative text-[#212121] hover:text-blue-800 transition-colors font-medium before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-0.5 before:w-0 before:bg-blue-800 before:transition-all before:duration-300 hover:before:w-full"
          >
            Services
          </Link>
          <Link 
            to="/magazine" 
            className="relative text-[#212121] hover:text-blue-800 transition-colors font-medium before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-0.5 before:w-0 before:bg-blue-800 before:transition-all before:duration-300 hover:before:w-full"
          >
            Magazine
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Link to="/" className="flex flex-col items-center">
            <div className="relative">
              <img 
                src={Wordmark} 
                alt="HI-LITE STUDIO" 
                className="h-16 w-auto"
              />
              </div>
          </Link>
        </div>

        <div className="flex items-center gap-14">
          <Link 
            to="/about" 
            className="relative text-[#212121] hover:text-blue-800 transition-colors font-medium before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-0.5 before:w-0 before:bg-blue-800 before:transition-all before:duration-300 hover:before:w-full"
          >
            About Us
          </Link>
          <Link 
            to="/faq" 
            className="relative text-[#212121] hover:text-blue-800 transition-colors font-medium before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-0.5 before:w-0 before:bg-blue-800 before:transition-all before:duration-300 hover:before:w-full"
          >
            FAQs
          </Link>
          <Link 
            to="/capture" 
            className="relative text-[#212121] hover:text-red-700 transition-colors font-medium before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-0.5 before:w-0 before:bg-red-700 before:transition-all before:duration-300 hover:before:w-full"
          >
            Capture with Us
          </Link>
        </div>
      </div>
    </nav>
    </header>
  );
};

export default Navbar;

