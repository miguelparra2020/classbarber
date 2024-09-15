import React, { useState } from 'react';
import IconCarrito from '../../../components/icons/carritoIcon';
import IconUser from '../../../components/icons/userIcon';
import {
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
  linkusuarioNavbar
} from '../../../modules/0-Cliente/7-general-1-navbar-config';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 console.log(isOpen);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href={linknameStoreLogo} className="text-white text-xl font-bold">{nameStoreLogo}</a>

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
        <div className="hidden lg:flex space-x-4">
          <a href={linkinicioNavbar} className="text-gray-300 hover:text-white">{inicioNavbar}</a>
          <a href={linkproductosNavbar} className="text-gray-300 hover:text-white">{productosNavbar}</a>
          <a href={linkmediaNavbar} className="text-gray-300 hover:text-white">{mediaNavbar}</a>
          <a href={linknosotrosNavbar} className="text-gray-300 hover:text-white">{nosotrosNavbar}</a>
        </div>

        {/* Right Side Menu (visible en pantallas grandes) */}
        <div className="hidden lg:flex space-x-4">
          <a href={linkcarritoNavbar} className="text-gray-300 hover:text-white flex items-center">
            <IconCarrito />
            <span className="ml-1">{carritoNavbar}</span>
          </a>
          <a href={linkusuarioNavbar} className="text-gray-300 hover:text-white flex items-center">
            <IconUser />
            <span className="ml-1">{usuarioNavbar}</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu (visible solo cuando está abierto) */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog className="mx-auto max-w-sm rounded bg-gray-800 p-6 shadow-lg">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div className="flex flex-col space-y-4">
                <a href={linkinicioNavbar} className="text-gray-300 hover:text-white">{inicioNavbar}</a>
                <a href={linkproductosNavbar} className="text-gray-300 hover:text-white">{productosNavbar}</a>
                <a href={linkmediaNavbar} className="text-gray-300 hover:text-white">{mediaNavbar}</a>
                <a href={linknosotrosNavbar} className="text-gray-300 hover:text-white">{nosotrosNavbar}</a>
                <a href={linkcarritoNavbar} className="text-gray-300 hover:text-white flex items-center">
                  <IconCarrito />
                  <span className="ml-1">{carritoNavbar}</span>
                </a>
                <a href={linkusuarioNavbar} className="text-gray-300 hover:text-white flex items-center">
                  <IconUser />
                  <span className="ml-1">{usuarioNavbar}</span>
                </a>
              </div>
            </Dialog>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};

export default Navbar;
