"use client";

import "./landing.css";
import React, { useEffect } from "react";
import Hero from "./Hero";
import Profile from "./Profile";
import ProjectSection from "./ProjectsSection";
import Footer from "./Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".parallax-section");

    // Parallax animations for sliding cards
    sections.forEach((section) => {
      const cards = section.querySelectorAll(".parallax-card");

      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true, // Smooth scrolling effect
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Profile Section */}
      <section className="parallax-section snap-start relative h-screen">
        <Profile />
      </section>

      {/* Hero Section */}
      <section className="parallax-section snap-start relative h-screen">
        <Hero />
      </section>

      {/* Projects Section */}
      <section className="parallax-section snap-start relative h-full">
        <ProjectSection />
      </section>

      {/* Footer Section */}
      <section className="snap-start relative h-auto">
        <Footer />
      </section>
    </div>
  );
};

export default Landing;
