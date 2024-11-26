"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from "@splinetool/react-spline";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
};

const projects: Project[] = [
  {
    title: "Synthetic Human",
    description: "Web · Design · Development · 3D",
    tags: ["Web", "Design", "Development", "3D"],
    imageUrl: "/projects/knight.jpg",
  },
  {
    title: "Spaace NFT",
    description: "Web3 · NFT · Design · Development",
    tags: ["Web", "Design", "Development", "Web3"],
    imageUrl: "/projects/sun.jpg",
  },
  {
    title: "Lights",
    description: "Web · Design · Development · 3D",
    tags: ["Web", "Design", "Development", "3D"],
    imageUrl: "/projects/lights.jpg",
  },
  {
    title: "Abstract",
    description: "Web3 · NFT · Design · Development",
    tags: ["Web", "Design", "Development", "Web3"],
    imageUrl: "/projects/abstract.jpg",
  },
];

const ProjectSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;

    if (container) {
      gsap.fromTo(
        container.querySelectorAll(".project-card"),
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    }

    if (button) {
      gsap.fromTo(
        button,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: button,
            start: "top 90%",
          },
        }
      );
    }
  }, []);

  const handleRedirect = () => {
    router.push("/projects");
  };

  return (
    <section
      ref={containerRef}
      className="relative max-w-screen h-full py-16 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Spline Background */}
      <div className="absolute inset-0 -z-10 touch-none pointer-events-none">
        <Spline scene="./models/projects.splinecode" />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Projects Content */}
      <h2 className="text-4xl font-bold text-center mb-8 text-white">
        Featured Work
      </h2>
      <p className="text-center text-gray-200 mb-12">
        A selection of our most passionately crafted works with forward-thinking
        clients and friends over the years.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card relative overflow-hidden rounded-lg shadow-lg group h-[300px] md:h-[350px] lg:h-[400px]"
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              layout="fill"
              quality={75}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-semibold mb-2 transition-transform duration-300 group-hover:translate-y-[-5px]">
                {project.title}
              </h3>
              <p className="text-white text-sm mb-4 transition-opacity duration-300 group-hover:opacity-80">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <button
          ref={buttonRef}
          onClick={handleRedirect}
          className="relative bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <span className="flex items-center gap-2">
            SEE ALL PROJECTS
            <span className="material-icons transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </span>
          <span className="absolute inset-0 bg-blue-500 scale-x-0 origin-right hover:scale-x-100 transition-transform duration-500 ease-out z-[-1]"></span>
        </button>
      </div>
    </section>
  );
};

export default ProjectSection;
