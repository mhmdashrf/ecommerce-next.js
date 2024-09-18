"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart, MoonIcon, Sun } from "lucide-react";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from "./Cart";
import * as motion from "framer-motion/client";
import CountDownTimer from "../_components/CountDownTimer"

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("currentMode") ?? "light"
  );
  useEffect(() => {
    if (isDarkMode === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [isDarkMode]);

  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    setIsLoggedIn(window.location.href.toString().includes("sign-in"));
  }, []);

  const { user } = useUser();

  useEffect(() => {
    user && getCartItems();
  }, [user]);

  const getCartItems = () => {
    CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(
      (res) => {
        console.log("allCart", res?.data?.data);
        res?.data?.data.forEach((cartItem) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: cartItem.id,
              product: cartItem?.attributes?.products?.data[0],
            },
          ]);
        });
      }
    );
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    !isLoggedIn && (
      <>
        <motion.div 
          initial={{y: -100 , opacity:0}}
          animate={{y: 0 , opacity:1}}
          transition={{duration: 0.5 , delay:0}}
        className=" bg-[#021526] text-white ">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-10  flex justify-between items-center  text-white py-5 ">
            <div
             
            >
              {" "}
              <h2
             
              className="text-sm sm:text-2xl ">
                Get Special Offer 40% Limted Time Only
              </h2>
            </div>
           <CountDownTimer/>
          </div>
        </motion.div>
        <nav className="shadow-md py-3">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-10">
    <div className="relative flex items-center justify-between h-16">
      {/* Mobile menu button */}
      <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <svg
              className="block h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 items-center justify-between">
        {/* Left side: Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/">
            <img src="/logo.svg" alt="Logo" className="text-2xl font-bold" />
          </Link>
        </div>

        {/* Center: Navigation Links and Dark Mode Toggle */}
        <div className="flex flex-1 items-center justify-center space-x-4">
          {/* Navigation Links */}
          <div className="hidden sm:flex space-x-4">
            <Link
              href="/"
              className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="#"
              className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="#"
              className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </Link>
            <Link
              href="#"
              className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Dark Mode Toggle */}
          <div>
            <button
              onClick={() => {
                const newMode = isDarkMode === "dark" ? "light" : "dark";
                localStorage.setItem("currentMode", newMode);
                setIsDarkMode(newMode);
              }}
              className="flex items-center justify-center border w-[45px] h-[45px] rounded-full border-amber-950 hover:border-brown-800 hover:shadow-lg"
            >
              {isDarkMode === "dark" ? (
                <span className="text-gray-400">
                  <MoonIcon />
                </span>
              ) : (
                <span className="text-yellow-400">
                  <Sun />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Right side: User and Cart */}
        <div className="flex items-center flex-shrink-0">
          {!user ? (
            <div className="flex space-x-4">
              <Link
                href="/sign-in"
                className="bg-primary hover:bg-teal-700 text-white text-center font-bold px-4 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="bg-primary hover:bg-teal-700 text-white text-center font-bold px-4 py-2 rounded-md hidden sm:flex"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <h2
                onClick={() => setOpenCart(!openCart)}
                className="flex gap-1 cursor-pointer relative"
              >
                <ShoppingCart />
                <span className="absolute top-[-20px] end-[-10px] w-[25px] h-[25px] bg-red-600 rounded-full flex justify-center items-center text-white text-[14px]">
                  {cart.length}
                </span>
              </h2>
              <UserButton />
              {openCart && <Cart setOpenCart={setOpenCart} />}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    <div className={`sm:hidden ${isOpen ? "block" : "hidden"} mt-2`}>
      <ul className="space-y-1 px-2">
        <li>
          <a
            href="#"
            className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </a>
        </li>
      </ul>
      <div className="flex flex-col mt-4">
        <Link
          href="/sign-up"
          className="bg-primary hover:bg-teal-700 text-white text-center font-bold px-4 py-2 rounded-md"
        >
          Signup
        </Link>
      </div>
    </div>
  </div>
</nav>





      </>
    )
  );
}

export default Header;
