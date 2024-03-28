import { Fragment, useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { UserContext } from "../userContext"
import { CiMenuBurger } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa"
import { Menu, Transition } from "@headlessui/react";
export default function Header(){
  const {user}=useContext(UserContext)
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

    return(
      < header className="flex justify-between items-center m-2 mt-3 ">
    <Link to={'/'} className="flex gap-1 items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
<span className="font-bold text-xl">airdnb</span>
    </Link>
  <div className="flex border border-gray-300 gap-2 rounded-full shadow-md shadow-gray-300 py-2 px-4">
    <div >Any Where</div>
    <div className="border-l border-gray-300"></div>
    <div>Any Week</div>
    <div className="border-r border-gray-300"></div>
    <div>Add guests </div>
    <button className="bg-primary text-white rounded-full p-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
</button>
  </div>
        {/* <div className="flex border border-gray-300 gap-2 rounded-full shadow-md shadow-gray-300 py-2 px-3 justify-between items-center hover:drop-shadow-xl cursor-pointer">
          

        </div> */}


        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex border border-gray-300 gap-2 rounded-full py-2 px-3 justify-between items-center hover:drop-shadow-xl cursor-pointer w-full gap-x-1.5 bg-white text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <CiMenuBurger className="cursor-pointer" color="black" />
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <FaUserAlt className="cursor-pointer" color="white" />
              </div>
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="/login"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Login
                    </NavLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="/register"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      SignUp
                    </NavLink>
                  )}
                </Menu.Item>
                <div className="border-t-2" />
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/gift"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Gift Cards
                      </NavLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/helpcenter"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        help center
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
              </div>


            </Menu.Items>
          </Transition>
        </Menu>

  </header>
    )
}