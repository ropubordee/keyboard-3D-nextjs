"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import TypingText from "../TypingText";


const Hero = () => {
  useEffect(() => {
    const handlescroll = () => {
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        const isInView = rect.top >= 84 && rect.bottom >= window.innerHeight;
        document.body.style.overflow = isInView ? "hidde" : "auto";
      }
    };
    window.addEventListener("scroll", handlescroll);
    handlescroll();

    return () => {
      window.removeEventListener("scroll", handlescroll);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      id="hero"
      className="relative h-screen max-w-5xl mx-auto flex flex-col p-4 pt-8 lg:pt-32 md:p-16"
    >
      <div className="flex flex-col md:flex-row items-center relative">
        <div className="w-full h-full md:w-1/2 flex flex-col gap-8 z-10 bg-gradient-to-r from-stone-950 via-stone-950 to-transparent">
          <div>
            <TypingText
              title="Your Keyboard"
              textStyles="text-5xl md:text-6xl font-bold text-white"
            />
            <TypingText
              title="Built to Elevate Your Workflow"
              textStyles="text-xl md:text-2xl text-slate-400"
            />
          </div>

          <p className="text-slate-400">
            Experience a keyboard meticulously crafted for those who value both
            style and performance. From the satisfying click 
          </p>

          <div className="flex flex-row gap-6">
            <Link
              href="/"
              className="w-36 flex justify-center py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-colors duration-300"
            >
              Buy Now
            </Link>
            <Link
              href="/"
              className="w-36 flex justify-center py-3 rounded-xl text-xs font-semibold text-white border border-white hover:bg-white hover:text-stone-950 transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>

        <Image
          src="assets/hero.png"
          alt="hero"
          width={700}
          height={400}
          unoptimized={true}
          className="left-1/4 top-4 mt-16 md:mt-0 md:absolute"
          priority
        />
      </div>
      <Link
        href="#catalog"
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-row items-center px-6 py-2 mx-auto mb-10 border border-slate-400 rounded-xl text-sm text-slate-400"
      >
        <MdKeyboardDoubleArrowDown className="w-4 h-4 mr-2 animate-ping" />
        <span>Click to Scroll</span>
        <MdKeyboardDoubleArrowDown className="w-4 h-4 ml-2 animate-ping" />
      </Link>
    </div>
  );
};

export default Hero;
