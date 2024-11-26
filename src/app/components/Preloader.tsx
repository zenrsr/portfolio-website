"use client";

// File: components/Preloader.tsx
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import Spline from "@splinetool/react-spline";

const Preloader: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Simulate the countdown progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 300); // Adjust speed of progress

    if (progress === 100) {
      // GSAP fade-out animation after progress hits 100
      const timeline = gsap.timeline();
      timeline
        .to(".preloader", {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            const preloader = document.querySelector(".preloader");
            if (preloader) preloader.remove(); // Remove preloader from DOM
          },
        });
    }
  }, [progress]);

  return (
    <div
      className="preloader fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Loading content"
    >
      {/* Spline 3D Model */}
      <div className="absolute inset-0 -z-10 items-center justify-center">
        <Spline scene="./models/preloader.splinecode" />
      </div>

      {/* Cyberpunk-Style Countdown */}
      <div className="absolute bottom-8 left-8 text-white font-mono text-10xl md:text-6xl flex items-center gap-2">
        <span className="neon-text">{progress}</span>
        <span className="text-neon-blue">%</span>
      </div>

      {/* Cyberpunk Glow Effect */}
      <div className="absolute bottom-4 left-8 w-64 h-2 bg-neon-blue rounded-lg overflow-hidden">
        <div
          className="bg-neon-green h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Preloader;
