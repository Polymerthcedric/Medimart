import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/images/medical1.jpg',
      title: 'Advanced Medical Equipment',
      description: 'Find the latest technology for your healthcare facility.'
    },
    {
      image: '/images/microscope.jpg',
      title: 'Laboratory Essentials',
      description: 'Precision instruments for accurate diagnostics.'
    },
    {
      image: '/images/pexels-tara-winstead-7723388.jpg',
      title: 'Pharmacy Supplies',
      description: 'Wide range of medications and clinical products.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-[2rem] shadow-2xl group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/1200x500?text=${encodeURIComponent(slide.title)}`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
            <div className="container mx-auto px-8 md:px-16">
              <div className={`max-w-xl transition-all duration-700 delay-300 transform ${
                index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-slate-200 mb-8 font-medium">
                  {slide.description}
                </p>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary-500/25 active:scale-95">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide ? 'w-10 h-3 bg-primary-500' : 'w-3 h-3 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Arrows */}
      <button 
        onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={() => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
