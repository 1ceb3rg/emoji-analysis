import { Menu, Disclosure, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { signOut, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const navigation = [
    { href: '/', name: 'Home', current: router.pathname === '/' },
    { href: '/song', name: 'Song', current: router.pathname === '/song' },
    { href: '/about', name: 'About', current: router.pathname === '/about' },
  ];
  return (
    <>
      <Disclosure as="nav" className="bg-black">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div
                      className="text-3xl"
                      style={{
                        textShadow: 'white 0 0 0',
                        color: 'transparent',
                      }}
                    >
                      🎼
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium',
                            )}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-black rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          {(session?.user?.image && (
                            <img className="h-8 w-8 rounded-full" src={session?.user?.image} alt="" />
                          )) || (
                            <div
                              className="text-xl"
                              style={{
                                textShadow: 'white 0 0 0',
                                color: 'transparent',
                              }}
                            >
                              {' '}
                              🎵
                            </div>
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <button
                              type="button"
                              onClick={() => {
                                if (status === 'authenticated') signOut();
                                else signIn();
                              }}
                              className={classNames('block px-4 py-2 text-sm text-gray-700')}
                            >
                              {status === 'authenticated' ? 'Sign Out' : 'Sign In'}
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="bg-black inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
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
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    {(session?.user?.image && (
                      <img className="h-10 w-10 rounded-full" src={session.user?.image} alt="" />
                    )) || (
                      <div
                        className="text-xl"
                        style={{
                          textShadow: 'white 0 0 0',
                          color: 'transparent',
                        }}
                      >
                        🎵
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{session?.user?.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{session?.user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Disclosure.Button
                    // href={
                    //   status === "authenticated"
                    //     ? "/api/auth/signout"
                    //     : "/api/auth/signin"
                    // }
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (status === 'authenticated') signOut();
                        else signIn();
                      }}
                    >
                      {status === 'authenticated' ? 'Sign Out' : 'Sign In'}
                    </button>
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="bg-black ">
        <div className=" shadow max-w-7xl mx-auto bg-blend-lighten   md:px-6 lg:px-8  h-0.5   bg-origin-border">
          <div className="bg-gray-700 mx-auto w-full h-full " />
        </div>
      </div>
      <header className="bg-black  shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-mono text-gray-200">Playlist Emojis</h1>
        </div>
        <div className="h-20 md:h-20"> </div>
      </header>
    </>
  );
}
export default Header;
