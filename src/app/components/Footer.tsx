"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Confetti from "react-confetti";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const copyButtonRef = useRef<HTMLButtonElement | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const footer = footerRef.current;
    const copyButton = copyButtonRef.current;

    // Footer animations on scroll
    if (footer) {
      gsap.fromTo(
        footer.querySelectorAll(".footer-section"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Liquid hover effect for the button
    if (copyButton) {
      gsap.set(copyButton, {
        backgroundPosition: "200% 0%",
        backgroundSize: "200% 100%",
      });

      const hoverAnimation = gsap.timeline({ paused: true });
      hoverAnimation.to(copyButton, {
        backgroundPosition: "0% 0%",
        ease: "power1.inOut",
        duration: 0.4,
      });

      copyButton.addEventListener("mouseenter", () => hoverAnimation.play());
      copyButton.addEventListener("mouseleave", () => hoverAnimation.reverse());
    }
  }, []);

  const handleCopyEmail = async () => {
    if (copyButtonRef.current) {
      const rect = copyButtonRef.current.getBoundingClientRect();
      setButtonPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }

    try {
      await navigator.clipboard.writeText("zenrsrdev@gmail.com");
      // Show confetti for 2 seconds
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-white text-black py-16 overflow-hidden shadow-lg w-full h-full"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-blue-100 via-blue-200 to-white blur-xl"></div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={300}
          colors={["#00b4d8", "#90e0ef", "#03045e"]}
          width={window.innerWidth}
          height={window.innerHeight}
          confettiSource={{
            x: buttonPosition.x,
            y: buttonPosition.y,
            w: 10,
            h: 10,
          }}
        />
      )}

      <div className="container mx-auto px-6 lg:px-24">
        {/* Left-Right Layout */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-12 md:space-y-0">
          {/* Email Copy Section */}
          <div className="flex-1 footer-section max-w-md text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 hover-title">
              Contact Me
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Have questions or want to work with me? Copy my email and get in touch!
            </p>
            <button
              ref={copyButtonRef}
              onClick={handleCopyEmail}
              className="relative px-6 py-3 text-white text-lg font-semibold rounded-lg shadow-lg overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(to right, #2563eb 50%, #60a5fa 50%)",
                backgroundSize: "200% 100%",
                transition: "background-position 0.4s ease",
              }}
            >
              Copy Email
            </button>
          </div>

          {/* Social Media Icons with Individual Hover Effects */}
          <div className="flex-1 footer-section flex flex-col justify-center items-center space-y-4 relative">
            <Image
              src="/background-illustration.svg"
              alt="Illustration"
              width={400}
              height={400}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -z-10 opacity-10"
            />
            <h2 className="text-xl font-bold mb-4 hover-title">Follow Me</h2>
            <div className="flex space-x-6">
              <a
                href="#"
                className="social-icon group hover:text-blue-600"
                title="Follow me on Twitter"
              >
                <Image
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </a>
              <a
                href="#"
                className="social-icon group hover:text-blue-500"
                title="Connect on LinkedIn"
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </a>
              <a
                href="#"
                className="social-icon group hover:text-gray-800"
                title="View GitHub Profile"
              >
                <Image
                  src="/icons/github.svg"
                  alt="GitHub"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
