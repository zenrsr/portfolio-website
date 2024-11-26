"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    // Headline Animation
    tl.fromTo(
      ".headline-line",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.3 }
    )
      .fromTo(
        ".supporting-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.8"
      )
      .fromTo(
        ".cta-button",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.8)" },
        "-=0.5"
      );

    // Hero Image Animation
    gsap.fromTo(
      ".hero-image",
      { scale: 1.2, rotation: 5, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
    );

    // Shadow Box Animation
    gsap.fromTo(
      ".shadow-box",
      { x: -60, opacity: 0, rotation: -10 },
      { x: 0, opacity: 1, rotation: 0, duration: 1.5, ease: "power4.out", delay: 0.8 }
    );

    // Parallax Effect for Hero Image and Shadow Box
    gsap.to(".hero-image", {
      y: -50,
      rotation: 2,
      scale: 1.05,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".hero-image",
        start: "top bottom",
        scrub: true,
      },
    });

    gsap.to(".shadow-box", {
      y: -30,
      rotation: -2,
      scale: 1.02,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".hero-image",
        start: "top bottom",
        scrub: true,
      },
    });

    // Scroll-triggered fade in/out of text
    gsap.fromTo(
      ".supporting-text",
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: ".supporting-text",
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  const handleButtonClick = () => {
    const buttonSound = new Audio("/sounds/click.mp3");
    buttonSound.play();

    // Bounce Animation on Button Click
    gsap.fromTo(
      ".cta-button",
      { scale: 1 },
      { scale: 1.2, duration: 0.2, ease: "power1.out", yoyo: true, repeat: 1 }
    );
  };

  const handleButtonHover = () => {
    const hoverSound = new Audio("/sounds/hover.mp3");
    hoverSound.play();
  };

  return (
    <section className="relative w-full h-screen bg-gray-50 flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start h-full">
        {/* Text Content */}
        <div className="lg:w-1/2 flex flex-col justify-center h-full space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight group">
            <div className="headline-line overflow-hidden">
              <span className="block group-hover:text-blue-500 transition-colors duration-300">
                Beyond Visions
              </span>
            </div>
            <div className="headline-line overflow-hidden">
              <span className="block group-hover:text-blue-500 transition-colors duration-300">
                Within Reach
              </span>
            </div>
          </h1>
          <p className="supporting-text text-lg text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            Lusion is a digital production studio that brings your ideas to
            life through visually captivating designs and interactive
            experiences. With our talented team, we push the boundaries by
            solving complex problems, delivering tailored solutions that exceed
            expectations and engage audiences.
          </p>
          <button
            className="cta-button bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 hover:shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={handleButtonClick}
            onMouseEnter={handleButtonHover}
          >
            ABOUT US
          </button>
        </div>

        {/* Visual Elements */}
        <div className="lg:w-1/2 relative flex justify-center items-center h-full mt-12 lg:mt-0">
          {/* Shadow Box */}
          <div className="shadow-box absolute -top-10 left-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] bg-black rounded-lg transform -rotate-6 -z-10 flex items-center justify-center">
            {/* Hero Image */}
            <Image
              src="/images/hero.jpg"
              alt="Hero Visual"
              className="hero-image relative rounded-lg shadow-lg w-[80%] lg:w-[70%] z-10 object-cover"
              width={800}
              height={600}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
