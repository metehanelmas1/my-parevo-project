'use client';

import { useState } from 'react';
import Image from 'next/image';

const Statistics = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    '/team-1.jpg',
    '/team-2.jpg',
    // Add more image paths as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full bg-[#1e2756] py-16">
      <div className="container mx-auto px-4">
        {/* Image Carousel */}
        <div className="relative mb-12 h-[300px] md:h-[400px] overflow-hidden rounded-lg">
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-orange-500 p-2 text-white hover:bg-orange-600"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-orange-500 p-2 text-white hover:bg-orange-600"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute h-full w-full transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide}
                alt={`Team slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Achievement Section */}
        <div className="text-center">
          <h2 className="mb-8 text-2xl font-bold text-white md:text-4xl">
            Products successfully launched in the
            <span className="block text-white">previous 12 months</span>
          </h2>

          {/* Play Button */}
          <button className="mb-12 flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-white mx-auto hover:bg-orange-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Play Intro Video
          </button>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-orange-500 md:text-5xl">93%</div>
              <p className="text-gray-300">Increase in Monthly</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-orange-500 md:text-5xl">50K</div>
              <p className="text-gray-300">Revenue generated</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-orange-500 md:text-5xl">57K</div>
              <p className="text-gray-300">Total Downloads</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics; 