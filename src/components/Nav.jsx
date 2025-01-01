import { hamburger } from "../assets/icons";
import { headerLogo } from "../assets/images";
import { navLinks } from "../constants";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import toast from "react-hot-toast";

const Nav = () => {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

  const handleLogin = (userDetails) => {
    localStorage.setItem('user', JSON.stringify(userDetails));
    setIsLoggedIn(true);
    setIsModalOpen(false);
    toast.success('Logged In successfully');
    
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    toast.success('Logged Out successfully');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
      setAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`padding-x py-4 fixed z-50 transition-all duration-300 bg-white ${
          atTop ? 'w-full' : 'w-[95%] ml-8 mt-5 rounded-lg shadow-lg'
        } ${showNav ? 'top-0 border-b-2 border-slate-200' : '-top-32'}`}
      >
        <nav className='flex justify-between items-center max-container'>
          <a href='/'>
            <img
              src={headerLogo}
              alt='logo'
              className='m-0 w-[129px] h-[59px]'
            />
          </a>
          <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
            {navLinks.map((item) => (
              <li key={item.label} className="hover:scale-110 hover:font-semibold">
                <a
                  href={item.href}
                  className={`font-montserrat leading-normal text-lg text-slate-gray relative ${
                    location.pathname === item.href ? 'active' : ''
                  }`}
                >
                  {item.label}
                  {location.pathname === item.href && (
                    <span className='absolute bottom-0 left-0 w-full h-[2px] bg-black animate-border'></span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <div className='flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24'>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="hover:scale-110 font-medium">Logout</button>
            ) : (
              <>
                <button onClick={() => setIsModalOpen(true)} className="hover:scale-110 font-medium outline-none">Login</button>
                <span>/</span>
                <button onClick={() => setIsModalOpen(true)} className="hover:scale-110 font-medium outline-none">SignUp</button>
              </>
            )}
          </div>
          <div className='hidden max-lg:block'>
            <img src={hamburger} alt='hamburger icon' width={25} height={25} />
          </div>
        </nav>
      </header>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onLogin={handleLogin} />}
    </>
  );
};

export default Nav;