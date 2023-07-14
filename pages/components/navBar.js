/* eslint-disable react/react-in-jsx-scope */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const navigation = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Libros', href: '#libros' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Unirme', href: '#unirme' },
  ];
  
  const handleNavigationClick = (event, href) => {
    event.preventDefault();
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  };
  

export default function NavBar() {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item, itemIdx) =>
                      itemIdx === 0 ? (
                        <Fragment key={item.name}>
                          <Link href={item.href}>
                            <p className="bg-blue-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                              {item.name}
                            </p>
                          </Link>
                        </Fragment>
                      ) : (
                        <Link key={item.name} href={item.href} onClick={(event) => handleNavigationClick(event, item.href)}>
  <p className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
    {item.name}
  </p>
</Link>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative inline-block text-left">
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {/* Aquí puedes agregar más opciones en el menú desplegable */}
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={`${
                                  active ? 'bg-blue-100 text-blue-900' : 'text-blue-700'
                                } block px-4 py-2 text-sm`}
                              >
                                Opción 1
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={`${
                                  active ? 'bg-blue-100 text-blue-900' : 'text-blue-700'
                                } block px-4 py-2 text-sm`}
                              >
                                Opción 2
                              </a>
                            )}
                          </Menu.Item>
                          {/* ... */}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <p className="bg-blue-800 text-white block px-3 py-2 rounded-md text-base font-medium">
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
