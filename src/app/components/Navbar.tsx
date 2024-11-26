"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    gsap.to(".drawer", { x: "100%", duration: 0.8, ease: "power4.out" });
  }, [closeButtonRef]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Tab" && isOpen && sidebarRef.current) {
      const focusableElements = sidebarRef.current.querySelectorAll(
        "button, a, input, [tabindex]:not([tabindex='-1'])"
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    if (event.key === "Escape" && isOpen) {
      closeSidebar();
    }
  }, [isOpen, closeSidebar]);

  const openSidebar = () => {
    setIsOpen(true);
    if (firstFocusableElementRef.current) {
      firstFocusableElementRef.current.focus();
    }

    gsap.to(".drawer", { x: 0, duration: 0.8, ease: "power4.out" });

    // Fade-in Sidebar Background
    gsap.fromTo(
      ".drawer",
      { backgroundColor: "rgba(255, 255, 255, 0)" },
      { backgroundColor: "rgba(255, 255, 255, 1)", duration: 0.5 }
    );

    // Bounce Animation for Menu Items
    gsap.fromTo(
      ".drawer-item",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.2 }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        closeSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeSidebar, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown, closeSidebar]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent bg-opacity-50 backdrop-blur-sm z-50 ">
      <div className="flex items-center justify-end px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            className="bg-black text-white px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300"
            onClick={openSidebar}
            ref={firstFocusableElementRef}
          >
            MENU
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="drawer fixed top-0 right-0 w-full sm:max-w-xs bg-white h-screen transform translate-x-full z-40 shadow-lg"
        role="dialog"
        aria-labelledby="menu-title"
        aria-hidden={!isOpen}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          className="absolute top-4 right-4 text-black hover:text-gray-700 text-2xl font-bold"
          onClick={closeSidebar}
        >
          ✕
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col justify-between h-full p-12">
          {/* Menu Items */}
          <div className="space-y-6 flex flex-col ">
            {["HOME", "ABOUT US", "PROJECTS", "CONTACT"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="drawer-item text-black text-lg font-bold hover:underline hover:text-gray-700"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-black font-bold text-lg">
              Subscribe to our newsletter
            </h3>
            <div
              className="flex items-center space-x-2 border-b border-gray-300 pb-2"
              onFocus={() =>
                gsap.to(".newsletter-input", { scaleX: 1.05, duration: 0.3, ease: "power2.out" })
              }
              onBlur={() =>
                gsap.to(".newsletter-input", { scaleX: 1, duration: 0.3, ease: "power2.out" })
              }
            >
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input flex-1 outline-none"
              />
              <button className="text-black hover:text-gray-700">→</button>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="flex items-center justify-between border-t border-gray-300 pt-4">
            <div className="footer-brand text-black font-bold text-lg hover:scale-105 hover:text-gray-700 transition-transform duration-300">
              ö LABS
            </div>
            <button className="text-black hover:text-gray-700 transition-transform duration-300 hover:translate-x-1">
              →
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
