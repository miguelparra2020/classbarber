// 1-navbar1-t.tsx
import React from 'react';

const Navbar1 = () => {
  return (
    <>
    <div className="flex lg:ml-6">
      <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Search</span>
      </a>
    </div>
    <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      alt=""
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
    </>
  );
};

export default Navbar1;
