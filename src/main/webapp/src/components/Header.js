import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

export default function Header({ isLoggedIn, onLoggedInChange }) {

  const {dispatchCallEvent} = useContext(GlobalContext);

  function logOut(event) {
    event.preventDefault();
    dispatchCallEvent({type: "clear", payload: {}});
    onLoggedInChange(false);
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <h2 className="text-base text-3xl text-indigo-600 font-extrabold tracking-wide uppercase">Friday</h2>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link to='/' className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      aria-current="page">Home</Link>
              </div>
            </div>
            {isLoggedIn ?
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <Link to='/' onClick={logOut}
                          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700">
                      Sign out
                    </Link>
                </div> :
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                  <Link to='/SignIn' className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                    Sign in</Link>
                  <Link to='/SignUp'
                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign up
                  </Link>
                </div>}
          </div>
        </div>
      </div>
    </nav>
  )
}
