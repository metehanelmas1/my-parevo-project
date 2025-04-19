'use client';

import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar'
import { useCounter } from '@/hooks/useCounter';
import SlidingPartners from '@/components/SlidingPartners';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const monthlyIncrease = useCounter(isVisible ? 93.7 : 0, 2000);
  const revenue = useCounter(isVisible ? 50 : 0, 2000);
  const downloads = useCounter(isVisible ? 57 : 0, 2000);

  const slides = [
    '/meeting-image.jpg',
    '/meeting-image.jpg',
    '/meeting-image.jpg'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        if (isVisible) {
          element.classList.add('animate-active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // İlk yükleme için kontrol
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar onSignupClick={() => setIsSignupOpen(true)} />
      
      {/* Signup Popup */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isSignupOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="relative h-full p-8">
          {/* Close Button */}
          <button 
            onClick={() => setIsSignupOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Signup Content */}
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Create an account</h2>

            {/* Social Buttons */}
            <div className="space-y-4 mb-6">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-gray-700 font-medium">Google ile Giriş Yap</span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1874EA] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
                <span>Facebook ile Giriş Yap</span>
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or Signup with your email</span>
              </div>
            </div>

            {/* Signup Form */}
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Mobile Number or Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent bg-transparent text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent bg-transparent text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent bg-transparent text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent bg-transparent text-gray-800 placeholder-gray-500"
                />
              </div>

              <div className="text-sm text-gray-600">
                By signing up, you agree to our{' '}
                <a href="#" className="text-[#6366F1] hover:underline">Terms</a>,{' '}
                <a href="#" className="text-[#6366F1] hover:underline">Data Policy</a> and{' '}
                <a href="#" className="text-[#6366F1] hover:underline">Cookies Policy</a>.
              </div>

              <button
                type="submit"
                className="w-full bg-[#6366F1] text-white py-3 rounded-lg hover:bg-[#5457E5] transition-colors"
              >
                SINGUP
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSignupOpen && (
        <div 
          className="fixed inset-0 bg-white/50 backdrop-blur-xl md:bg-white/30 md:backdrop-blur-lg z-40"
          onClick={() => setIsSignupOpen(false)}
        ></div>
      )}

      {/* Hero Section */}
      <div className="relative bg-[#6366F1] pb-32">
        <div className="relative pt-40 pb-52 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out animate-active">
            Hakkımızda
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/80 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out animate-active">
            <span>Sayfalar</span>
            <span>/</span>
            <span>Hakkımızda</span>
          </div>
        </div>
        {/* Dalga şekli */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-lg shadow-xl p-8 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 ease-out">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000" 
                alt="Team Meeting" 
                className="rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-[1.02] relative z-10"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-4 z-20">
                <div className="bg-[#27285C] text-white p-4 rounded-lg transform transition-all duration-500 hover:scale-110 hover:bg-[#6366F1] shadow-lg hover:shadow-xl">
                  <div className="text-2xl font-bold">10+</div>
                  <div className="text-sm">Yıl</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-[#6366F1] group/card hover:shadow-xl">
                  <div className="text-2xl font-bold text-[#FF6B6B] group-hover/card:text-white transition-colors">2010</div>
                  <div className="text-sm text-gray-600 group-hover/card:text-white/90 transition-colors">Kuruluş Yılı</div>
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg z-0"></div>
            </div>
            <div className="space-y-6">
              <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-400">
                <div className="text-sm text-[#6366F1] font-medium mb-2">Neler Sunuyoruz</div>
                <h2 className="text-3xl font-bold text-[#27285C] mb-4">
                  Kolay ve Etkili
                  <br />
                  <span className="text-[#27285C]">Yazılım Çözümleri</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Parevo olarak, modern teknolojileri kullanarak işletmeniz için özel yazılım çözümleri geliştiriyoruz. Müşteri odaklı yaklaşımımız ve deneyimli ekibimizle, dijital dönüşüm yolculuğunuzda yanınızdayız.
                </p>
              </div>
              
              <div className="space-y-4 mb-8 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500">
                <div className="flex items-center justify-between group p-2 rounded-lg hover:bg-gray-50 transition-all">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#6366F1] transition-colors">Zamanında Teslim Edilen Projeler</span>
                  <span className="text-sm text-[#FF6B6B] font-bold">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#FF6B6B] h-2 rounded-full transition-all duration-1000 ease-out" style={{width: '95%'}}></div>
                </div>
                
                <div className="flex items-center justify-between group p-2 rounded-lg hover:bg-gray-50 transition-all">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#6366F1] transition-colors">Müşteri Memnuniyeti</span>
                  <span className="text-sm text-[#FF6B6B] font-bold">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#FF6B6B] h-2 rounded-full transition-all duration-1000 ease-out" style={{width: '75%'}}></div>
                </div>
              </div>

              <div className="space-y-2 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-600">
                {[
                  'Sistem Entegrasyonları',
                  'Özel Yazılım Çözümleri',
                  'Teknik Danışmanlık',
                  'Kapsamlı Dokümantasyon'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 group p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <svg className="w-5 h-5 text-[#6366F1] transform transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 group-hover:text-[#6366F1] transition-colors font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="text-center max-w-2xl mx-auto relative z-20">
                <p className="text-white/80 text-sm sm:text-base mb-6">
                  Ücretsiz demo için bizimle iletişime geçin. 30 gün koşulsuz geri ödeme garantisi sunuyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      <section className="relative bg-[#1e2756] py-8 md:py-12 mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e2756] to-[#2a3a6e] transform -skew-y-3"></div>
        <div className="container mx-auto px-4 relative">
          {/* Image Carousel */}
          <div 
            className="relative mb-8 md:mb-12 h-[350px] md:h-[500px] w-[350px] md:w-[500px] mx-auto overflow-hidden rounded-2xl group shadow-2xl -mt-24 z-20"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent z-10"></div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slides */}
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  index === currentSlide 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
              >
                <img
                  src={slide}
                  alt={`Team slide ${index + 1}`}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Achievement Content */}
          <div className="text-center relative z-10" ref={statsRef}>
            <h2 className="mb-6 text-xl font-bold text-white md:text-3xl animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
              Son 12 ayda başarıyla
              <span className="block mt-1 text-lg md:text-2xl text-white/80">tamamlanan projeler</span>
            </h2>

            {/* Statistics Grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
              <div className="text-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-400">
                <div className="text-3xl md:text-4xl font-bold text-orange-500">
                  {isVisible ? `${Math.round(monthlyIncrease)}%` : '0%'}
                </div>
                <p className="text-sm md:text-base text-gray-300">Aylık Artış</p>
              </div>
              <div className="text-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500">
                <div className="text-3xl md:text-4xl font-bold text-orange-500">
                  {isVisible ? `${Math.round(revenue)}B` : '0B'}
                </div>
                <p className="text-sm md:text-base text-gray-300">Gelir</p>
              </div>
              <div className="text-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-600">
                <div className="text-3xl md:text-4xl font-bold text-orange-500">
                  {isVisible ? `${Math.round(downloads)}B` : '0B'}
                </div>
                <p className="text-sm md:text-base text-gray-300">Toplam İndirme</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[#6366F1] mb-2">Neden Bizi Seçmelisiniz</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#27285C] mb-6">
              Ekibimizi ve ürünlerimizi
              <br />
              <span className="text-[#27285C]">temel değerler üzerine inşa ediyoruz</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Müşterilerimizin ihtiyaçlarını en iyi şekilde karşılamak için sürekli kendimizi geliştiriyor ve yenilikçi çözümler üretiyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Erişilebilirlik",
                description: "7/24 müşteri desteği ve kolay erişilebilir hizmetlerle her zaman yanınızdayız.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                title: "Küresel Düşünce",
                description: "Global standartlarda hizmet sunarak dünya çapında çözümler üretiyoruz.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Titizlik",
                description: "Her projede en ince detayına kadar özen göstererek mükemmel sonuçlar elde ediyoruz.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Basit Çalışma",
                description: "Karmaşık süreçleri basitleştirerek, müşterilerimize kullanımı kolay çözümler sunuyoruz.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: "Çeşitlilik",
                description: "Farklı bakış açılarını bir araya getirerek yenilikçi çözümler üretiyoruz.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
              },
              {
                title: "Özgür Deneyim",
                description: "Yeni fikirleri özgürce deneyerek ve geliştirerek en iyi sonuçlara ulaşıyoruz.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-[#6366F1]/10 p-3 rounded-lg">
                    <div className="text-[#6366F1]">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#27285C]">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                <img
                  src="/meeting-image.jpg"
                  alt="Successful Business Meeting"
                  className="w-full h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>

            {/* Right Column - Interactive World Map */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-transparent rounded-3xl transform rotate-2 group-hover:rotate-1 transition-transform duration-700"></div>
              <div className="relative bg-[#1a1a2e] p-8 rounded-3xl shadow-xl overflow-hidden">
                <div className="relative h-[500px] world-map-container">
                  {/* Animated World Map */}
                  <div className="absolute inset-0 world-map"></div>
                  
                  {/* Title Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center group">
                      <h2 className="text-white text-2xl md:text-3xl font-light text-center tracking-[0.2em] transform group-hover:-translate-y-4 transition-all duration-500">
                        Uzaydan İlham,
                        <br />
                        <span className="text-white/80 mt-2 block font-extralight">Teknolojiyle Gelecek...</span>
                      </h2>
                      <div className="overflow-hidden h-0 group-hover:h-16 transition-all duration-500 ease-out">
                        <span className="text-[#6366F1] text-4xl font-bold tracking-[0.5em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 block mt-6 animate-pulse">
                          PAREVO
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated Dots */}
                  <div className="dots-container">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="moving-dot"
                        style={{
                          '--delay': `${i * 0.5}s`,
                          '--duration': `${10 + i * 2}s`,
                          '--x-start': `${Math.random() * 100}%`,
                          '--y-start': `${Math.random() * 100}%`,
                        } as React.CSSProperties}
                      ></div>
                    ))}
                  </div>

                  {/* Connection Lines */}
                  <div className="connections-container">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="connection-line"
                        style={{
                          '--delay': `${i * 1}s`,
                          '--duration': `${15 + i * 2}s`,
                        } as React.CSSProperties}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div>
              <p className="text-sm font-medium text-[#6366F1] mb-2">Harekete Geç</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#27285C] mb-6">
                Başlamaya hazır mısınız?
                <br />
                <span className="text-[#27285C]">Farklı bir çalışma ortamı deneyin</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Çalışma alanlarımızda, faaliyetlerinizi yürütmek için ihtiyacınız olan her şeyi bulacaksınız
                <br />... ve daha fazlasını.
              </p>
              
              <button className="inline-flex items-center group text-[#6366F1] font-semibold hover:text-[#27285C] transition-colors duration-300">
                <span>Hemen Kayıt Olun</span>
                <svg 
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* First Question */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="pr-6">
                    <h3 className="text-lg font-semibold text-[#27285C] mb-2">
                      Hizmetleriniz hakkında detaylı bilgi alabilir miyim?
                    </h3>
                    {openFaq === 0 && (
                      <p className="text-gray-600 text-sm">
                        Size özel çözümler sunmak için detaylı bilgi vermekten mutluluk duyarız. Hizmetlerimiz hakkında daha fazla bilgi için bizimle iletişime geçin.
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <svg 
                      className={`w-6 h-6 text-[#6366F1] transform transition-transform duration-300 ${openFaq === 0 ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Second Question */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="pr-6">
                    <h3 className="text-lg font-semibold text-[#27285C]">
                      Özel çözümler için nasıl başvurabilirim?
                    </h3>
                    {openFaq === 1 && (
                      <p className="text-gray-600 text-sm mt-2">
                        Web sitemizden başvuru formunu doldurabilir veya müşteri temsilcilerimizle iletişime geçebilirsiniz. Size en uygun çözümü birlikte belirleyeceğiz.
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <svg 
                      className={`w-6 h-6 text-[#6366F1] transform transition-transform duration-300 ${openFaq === 1 ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Third Question */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="pr-6">
                    <h3 className="text-lg font-semibold text-[#27285C]">
                      Destek hizmetleriniz nasıl çalışıyor?
                    </h3>
                    {openFaq === 2 && (
                      <p className="text-gray-600 text-sm mt-2">
                        7/24 teknik destek ekibimiz, canlı destek, e-posta ve telefon üzerinden size yardımcı olmak için hazır. Öncelikli destek ve özel çözümler için kurumsal destek paketlerimizi inceleyebilirsiniz.
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <svg 
                      className={`w-6 h-6 text-[#6366F1] transform transition-transform duration-300 ${openFaq === 2 ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[#6366F1] mb-2">Fiyatlandırma Planlarımız İhtiyaçlarınıza Uygun</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#27285C] mb-6">
              Basit ve Anlaşılır
              <br />
              <span className="text-[#27285C]">Fiyatlandırma Paketleri</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              İhtiyaçlarınıza en uygun paketi seçin ve hemen kullanmaya başlayın. Tüm paketlerde 30 gün deneme süresi sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[#27285C]">Ücretsiz Plan</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">%100'e kadar tasarruf</span>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#27285C]">₺0</span>
                <span className="text-gray-500">/ay</span>
              </div>
              <p className="text-gray-600 mb-6">Bireysel kullanıcılar ve küçük projeler için ideal başlangıç paketi.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  3 Proje
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  10GB Depolama
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Ekip Üyeleri
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-white text-[#6366F1] border-2 border-[#6366F1] rounded-lg font-medium hover:bg-[#6366F1] hover:text-white transition-colors duration-300">
                Şimdi Başla
              </button>
            </div>

            {/* Starter Plan */}
            <div className="bg-[#6366F1] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform scale-105">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Başlangıç</h3>
                <span className="bg-yellow-400 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Popüler</span>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">₺29</span>
                <span className="text-white/80">/ay</span>
              </div>
              <p className="text-white/90 mb-6">Büyüyen işletmeler ve profesyonel kullanıcılar için.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  5 Proje
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  50GB Depolama
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  3 Ekip Üyesi
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-white text-[#6366F1] rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300">
                Hemen Başla
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[#27285C]">Profesyonel</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">%80'e kadar tasarruf</span>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#27285C]">₺79</span>
                <span className="text-gray-500">/ay</span>
              </div>
              <p className="text-gray-600 mb-6">Büyük ekipler ve kurumsal müşteriler için ideal çözüm.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Sınırsız Proje
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  100GB Depolama
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  10 Ekip Üyesi
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-white text-[#6366F1] border-2 border-[#6366F1] rounded-lg font-medium hover:bg-[#6366F1] hover:text-white transition-colors duration-300">
                Şimdi Başla
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[#27285C]">Kurumsal</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">%90'a kadar tasarruf</span>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#27285C]">₺159</span>
                <span className="text-gray-500">/ay</span>
              </div>
              <p className="text-gray-600 mb-6">Özel ihtiyaçlar ve büyük ölçekli projeler için.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Sınırsız Proje
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Sınırsız Depolama
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Sınırsız Ekip Üyesi
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-white text-[#6366F1] border-2 border-[#6366F1] rounded-lg font-medium hover:bg-[#6366F1] hover:text-white transition-colors duration-300">
                İletişime Geç
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <SlidingPartners />

      {/* Footer Section */}
      <footer className="bg-white py-16 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo ve Sosyal Medya */}
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-[#27285C]">Serenite</span>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-[#27285C] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#27285C] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#27285C] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#27285C] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                  </svg>
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1 1 0 00-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">
                  Envato Pty Ltd, 13/2 Elizabeth St
                  <br />
                  Melbourne VIC 3000, Avustralya
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">(+01) 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">help@serenitet.com</span>
              </div>
            </div>

            {/* Hakkımızda */}
            <div>
              <h3 className="text-lg font-semibold text-[#27285C] mb-4">Hakkımızda</h3>
              <p className="text-gray-600 text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna lectus, mattis non accumsan in, tempor dictum neque.
              </p>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm">
                  <div>Pzt - Cmt 8:00 - 17:30,</div>
                  <div>Pazar - KAPALI</div>
                </div>
              </div>
            </div>

            {/* Şirket */}
            <div>
              <h3 className="text-lg font-semibold text-[#27285C] mb-4">Şirket</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-[#27285C] text-sm">Hakkımızda</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#27285C] text-sm">İletişim</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#27285C] text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#27285C] text-sm">Kültür</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#27285C] text-sm">Kariyer</a></li>
              </ul>
            </div>

            {/* Destek */}
            <div>
              <h3 className="text-lg font-semibold text-[#27285C] mb-4">Destek</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-[#27285C] text-sm">Başlarken</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#27285C] text-sm">Canlı destek</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#27285C] text-sm">Yardım merkezi</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#27285C] text-sm">Hizmet durumu</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#27285C] text-sm">Hata bildir</a></li>
              </ul>
            </div>
          </div>

          {/* Alt Bilgi */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 mb-4 md:mb-0">
                Copyright © 2025 Serenite. Tüm hakları saklıdır.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-sm text-gray-600 hover:text-[#27285C]">Kullanım Koşulları</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-sm text-gray-600 hover:text-[#27285C]">Gizlilik Politikası</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(2rem);
        }
        
        .animate-active {
          opacity: 1;
          transform: translateY(0);
        }

        .world-map {
          background-image: url('/images/world-map.svg');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          animation: pulse 8s ease-in-out infinite;
          opacity: 0.7;
          filter: brightness(1.2);
        }

        .world-map-container {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #1a1a2e, #16213e);
          border-radius: 1rem;
        }

        .moving-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          opacity: 0.6;
          left: var(--x-start);
          top: var(--y-start);
          animation: moveDot var(--duration) ease-in-out var(--delay) infinite;
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        .connection-line {
          position: absolute;
          width: 150px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform-origin: left center;
          animation: connectLine var(--duration) ease-in-out var(--delay) infinite;
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 0.7;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.02);
          }
        }

        @keyframes moveDot {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translate(calc(100vw - 100%), calc(100vh - 100%));
            opacity: 0;
          }
        }

        @keyframes connectLine {
          0% {
            transform: translate(-100%, -100%) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(100%, 100%) rotate(45deg);
            opacity: 0;
          }
        }

        .world-map-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: backgroundMove 60s linear infinite;
          opacity: 0.3;
        }

        @keyframes backgroundMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50%, -50%); }
        }
      `}</style>
    </main>
  )
}
