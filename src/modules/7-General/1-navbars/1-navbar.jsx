import React, { useState, useEffect } from 'react';
import IconCarrito from '../../../components/icons/carritoIcon';
import IconUser from '../../../components/icons/userIcon';
import {fontFamilySelect} from '../../0-Cliente-Configuracion/0-fonFamily-config'
import { Transition, Dialog } from '@headlessui/react';
import {
  logoUrl,
  nameStoreLogo, 
  inicioNavbar, 
  productosNavbar, 
  mediaNavbar, 
  nosotrosNavbar, 
  carritoNavbar, 
  usuarioNavbar,
  linknameStoreLogo,
  linkinicioNavbar,
  linkproductosNavbar,
  linkmediaNavbar,
  linknosotrosNavbar,
  linkcarritoNavbar,
  linkusuarioNavbar,
  activenameStoreLogo,
  activeinicioNavbar,
  activeproductosNavbar,
  activemediaNavbar,
  activenosotrosNavbar,
  activecarritoNavbar,
  activeusuarioNavbar,
  colorNavbar,
  colorNameStoreLogo,
  colorLinkNavbar,
  colorLinkNavbarHover,
  colorEntorno,
  colorCard,
  colorLinksCard

} from '../../0-Cliente-Configuracion/7-general-1-navbar-config';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {  
    setIsOpen(!isOpen);
  };

  // Manejar el scroll para cambiar el box-shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`${fontFamilySelect} ${colorNavbar} p-4 fixed top-0 left-0 w-full z-50 transition-shadow duration-300 
        ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        {activenameStoreLogo && <>
          <a href={linknameStoreLogo} className={`${colorNameStoreLogo} text-xl font-bold flex items-center`}>
            <img src={logoUrl} alt="" width={40} height={40}/>
            &nbsp; &nbsp;
            {nameStoreLogo}</a>
        </>}       

        {/* Hamburger Menu (visible solo en móviles) */}
        <button
          className="lg:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Menu Links (visible en pantallas grandes) */}
        <div className={`hidden lg:flex space-x-4`}>
          {activeinicioNavbar && <a href={linkinicioNavbar} className={`${colorLinkNavbar} ${colorLinkNavbarHover} hover:underline`}>{inicioNavbar}</a>}
          {activeproductosNavbar && <a href={linkproductosNavbar} className={`${colorLinkNavbar}  ${colorLinkNavbarHover} hover:underline`}>{productosNavbar}</a>}
          {activemediaNavbar && <a href={linkmediaNavbar} className={`${colorLinkNavbar}  ${colorLinkNavbarHover} hover:underline`}>{mediaNavbar}</a>}
          {activenosotrosNavbar && <a href={linknosotrosNavbar} className={`${colorLinkNavbar}  ${colorLinkNavbarHover} hover:underline`}>{nosotrosNavbar}</a>}
        </div>

        {/* Right Side Menu (visible en pantallas grandes) */}
        <div className="hidden lg:flex space-x-4">
          {activecarritoNavbar && <a href={linkcarritoNavbar} className={`${colorLinkNavbar}  ${colorLinkNavbarHover} hover:underline flex items-center`}>
            <IconCarrito />
            <span className="ml-1">{carritoNavbar}</span>
          </a>}
          {activeusuarioNavbar && <a href={linkusuarioNavbar} className={`${colorLinkNavbar}  ${colorLinkNavbarHover} hover:underline flex items-center`}>
              <IconUser />
              <span className="ml-1">{usuarioNavbar}</span>
            </a>}
        </div>
      </div>

      {/* Mobile Menu (visible solo cuando está abierto) */}
      <Transition appear show={isOpen} >
        <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 overflow-hidden">
          <div className={`absolute inset-0 ${colorEntorno} bg-opacity-75" aria-hidden="true" `}/>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className={`mx-auto max-w-sm rounded ${colorCard} p-6 shadow-lg" `}>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className={`absolute top-4 right-4 ${colorLinksCard} hover:text-white `}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>  
              </button>
              <div className="flex flex-col space-y-4">
                <a href={linkinicioNavbar} className={`${colorLinksCard} hover:text-white `}>{inicioNavbar}</a>
                <a href={linkproductosNavbar} className={`${colorLinksCard} hover:text-white `}>{productosNavbar}</a>
                <a href={linkmediaNavbar} className={`${colorLinksCard} hover:text-white `}>{mediaNavbar}</a>
                <a href={linknosotrosNavbar} className={`${colorLinksCard} hover:text-white `}>{nosotrosNavbar}</a>
                <a href={linkcarritoNavbar} className={`${colorLinksCard} hover:text-white flex items-center `}>
                  <IconCarrito />
                  <span className="ml-1">{carritoNavbar}</span>
                </a>
                <a href={linkusuarioNavbar} className={`${colorLinksCard} hover:text-white flex items-center `} >
                  <IconUser />
                  <span className="ml-1">{usuarioNavbar}</span>
                </a>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};

export default Navbar;
