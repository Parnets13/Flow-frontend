import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const bannerImages = [
    {
      img: "/about.png",
      title: "Innovating Since 2008",
      subtitle: "15+ Years of Compressed Air Excellence"
    },
    {
      img: "/abot.png",
      title: "Manufacturing Excellence",
      subtitle: "State-of-the-Art Facility in Salem"
    },
    {
      img: "/about.png",
      title: "Trusted by Industries",
      subtitle: "500+ Satisfied Clients Worldwide"
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[600px] overflow-hidden bg-gray-900 mt-1">
        {bannerImages.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
              index === currentBanner && !isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={banner.img}
                alt={banner.title}
                className="w-full h-[600px] opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>
            
            <div className="container mx-auto px-6 text-white relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {banner.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                {banner.subtitle}
              </p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentBanner(index);
                  setIsTransitioning(false);
                }, 500);
              }}
              className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                index === currentBanner ? 'bg-white w-16' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-medium text-sm mb-8">
                OUR STORY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Engineering Excellence in Compressed Air Solutions
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2008, FLOW AIR has grown from a small workshop to a leading manufacturer of industrial air compressors, serving clients across India and internationally. Our journey has been driven by a commitment to innovation, quality, and customer satisfaction.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Today, we operate from our state-of-the-art manufacturing facility in Salem, Tamil Nadu, where we combine cutting-edge technology with decades of engineering expertise to deliver reliable, energy-efficient compressed air solutions.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-[#4682c4] hover:bg-[#3face2] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
              >
                Contact Our Team
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-70 bg-blue-200/20 rounded-full blur-3xl"></div>
              <img
                src="/abot.png"
                alt="FLOW AIR Manufacturing Facility"
                className="relative rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Continuously developing new technologies to improve efficiency and reduce energy consumption in compressed air systems.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" stroke-linejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                Rigorous testing and premium components ensure our compressors deliver reliable performance in the most demanding environments.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" stroke-linejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Tailored solutions and 24/7 support to ensure our clients' operations run smoothly and efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="/images.jpeg"
                alt="FLOW AIR Manufacturing Process"
                className="rounded-xl shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 max-w-xs">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Years of Manufacturing Excellence</div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-medium text-sm mb-8">
                OUR FACILITY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                State-of-the-Art Manufacturing
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our 50,000 sq. ft. manufacturing facility in Salem is equipped with advanced CNC machines, automated assembly lines, and rigorous quality control systems.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">ISO 9001:2015 Certified Production</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">100+ Skilled Technicians</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">In-House R&D Department</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Advanced Testing Facilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600">
              Experienced professionals driving innovation in compressed air technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src="/leder.jpeg" alt="CEO" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Rajiv Menon</h3>
                <p className="text-blue-600 mb-4">Founder & CEO</p>
                <p className="text-gray-600">
                  With 25+ years in industrial machinery, Rajiv founded FLOW AIR to bring energy-efficient solutions to the market.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src="/leder.jpeg" alt="CTO" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Priya Sharma</h3>
                <p className="text-blue-600 mb-4">Chief Technology Officer</p>
                <p className="text-gray-600">
                  Mechanical engineer specializing in compressor technology and energy efficiency innovations.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src="/leder.jpeg" alt="Operations Head" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Arjun Patel</h3>
                <p className="text-blue-600 mb-4">Head of Operations</p>
                <p className="text-gray-600">
                  Oversees manufacturing with a focus on quality control and production efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </div>
  );
};

export default AboutPage;