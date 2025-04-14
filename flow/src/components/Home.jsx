
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CheckCircle = () => (
  <svg 
    className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" 
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path 
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.06 14.54l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41-7.77 7.77z" 
    />
  </svg>
);

const ArrowRight = () => (
  <svg 
    className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" 
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M14 5l7 7m0 0l-7 7m7-7H3" 
    />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
  </svg>
);

const HomePage = () => {
  const features = [
    "10-480 HP Range Available",
    "Energy Efficient Models (Up to 35% savings)",
    "Low Maintenance Design",
    "24/7 Technical Support",
    "Customizable Solutions",
    "5-Year Comprehensive Warranty"
  ];

  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [industrialContent, setIndustrialContent] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch banners
        const bannersResponse = await axios.get("https://flow-backend-of96.onrender.com/api/banner");
        setBanners(bannersResponse.data);
        
        // Fetch industrial content
        const industrialResponse = await axios.get("https://flow-backend-of96.onrender.com/api/industrial");
        if (industrialResponse.data.length > 0) {
          setIndustrialContent(industrialResponse.data[0]);
        }
        
        // Fetch testimonials
        const testimonialsResponse = await axios.get("https://flow-backend-of96.onrender.com/api/testimonial");
        setTestimonials(testimonialsResponse.data);
        
        setLoading(false);
        setTestimonialsLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
        setTestimonialsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentBanner((prev) => (prev + 1) % banners.length);
          setIsTransitioning(false);
        }, 500);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Banner Section */}
      <div className="relative h-screen max-h-[600px] overflow-hidden bg-gray-900 mt-1">
        {banners.length > 0 ? (
          banners.map((banner, index) => (
            <div 
              key={banner._id}
              className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
                index === currentBanner && !isTransitioning ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={`https://flow-backend-of96.onrender.com/${banner.image}`}
                  alt={banner.title}
                  className="object-fill w-full h-[600px] opacity-100"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
              </div>
              
              <div className="container mx-auto px-6 text-white relative z-10">
                <div className="max-w-2xl">
                  <div className="mb-6">
                    <span className="inline-block bg-[#4682c4] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                      INDUSTRIAL SOLUTIONS
                    </span>
                  </div>
                  <h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                  >
                    {banner.title || "Industrial Compressor Solutions"}
                  </h1>
                  <p 
                    className="text-xl md:text-2xl mb-8 text-gray-300 font-medium"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    {banner.description || "Premium quality compressors for industrial applications"}
                  </p>
                  <div>
                    <Link
                      to="/products"
                      className="group inline-flex items-center bg-[#4682c4] hover:bg-[#3face2] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                      View Products
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-6 text-white relative z-10">
              <div className="max-w-2xl">
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                >
                  Industrial Compressor Solutions
                </h1>
                <p 
                  className="text-xl md:text-2xl mb-8 text-gray-300 font-medium"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  Premium quality compressors for industrial applications
                </p>
                <Link
                  to="/products"
                  className="group inline-flex items-center bg-[#4682c4] hover:bg-[#3face2] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  View Products
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {banners.length > 0 && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentBanner(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBanner ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-10 h-10 border-2 border-white/80 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Industrial Content Section */}
      <div className="container mx-auto px-4 relative z-10 py-20 -mt-20">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-12 lg:p-16 bg-gradient-to-br from-gray-50 to-white">
              <div className="inline-flex items-center px-5 py-2.5 bg-blue-600/10 rounded-full text-blue-800 font-medium text-sm mb-8 border border-blue-600/20">
                <BoltIcon className="mr-2 text-blue-600" />
                INDUSTRIAL PERFORMANCE
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight mb-8 text-gray-900">
                <span className="block">FLOW INDUSTRIAL</span>
                <span className="bg-gradient-to-r from-blue-700 to-cyan-600 text-transparent bg-clip-text">
                  {industrialContent?.title || "COMPRESSOR SYSTEMS"}
                </span>
              </h1>

              <p className="text-lg text-gray-700 max-w-xl mb-10 leading-relaxed">
                {industrialContent?.description || "Engineered for maximum performance and reliability in the most demanding industrial environments. Our compressors deliver exceptional efficiency with industry-leading durability."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle />
                    <span className="text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center bg-[#4682c4] hover:bg-[#3face2] text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 rounded-lg font-medium transform hover:-translate-y-1"
                >
                  Explore Product Line
                  <ArrowRight />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden bg-gray-900">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl"></div>
              <div className="relative h-full min-h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-cyan-800/20 mix-blend-overlay"></div>
                {industrialContent?.image ? (
                  <img
                    src={`https://flow-backend-of96.onrender.com/${industrialContent.image}`}
                    alt="Industrial Content"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <img
                    src="/abot.png"
                    alt="Default Industrial"
                    className="w-full h-full object-cover object-center"
                  />
                )}
                <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-lg px-5 py-3 text-sm font-medium text-gray-900 flex items-center border border-gray-200">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ISO 9001 Certified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-5 py-2 bg-[#4682c4] rounded-full text-blue-800 font-medium text-sm mb-6 border border-blue-600/20">
              ENGINEERED FOR INDUSTRY
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Global Manufacturers Choose FLOW
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by Fortune 500 companies for uncompromising quality, efficiency, and reliability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
              <div className="p-8 h-full flex flex-col">
                <div className="bg-blue-600/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-blue-600/20">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Energy Efficiency</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Our advanced screw compressor technology reduces energy consumption by up to 35% compared to conventional models, with Class 0 oil-free options available.
                </p>
                <Link to="/services" className="text-[#4682c4] font-medium flex items-center group">
                  Efficiency benchmarks <ArrowRight />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
              <div className="p-8 h-full flex flex-col">
                <div className="bg-blue-600/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-blue-600/20">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">24/7 Reliability</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Engineered with premium components for continuous operation. Our MTBF exceeds industry standards by 40%, with remote monitoring available.
                </p>
                <Link to="/services" className="text-[#4682c4] font-medium flex items-center group">
                  Reliability data <ArrowRight />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
              <div className="p-8 h-full flex flex-col">
                <div className="bg-blue-600/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-blue-600/20">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Complete Range</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  From compact 10HP units to powerful 480HP systems, with options for variable speed drive, oil-free, and high-pressure configurations.
                </p>
                <Link to="/products" className="text-[#4682c4] font-medium flex items-center group">
                  Browse full range <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Technical Specifications
            </h2>
            <p className="text-lg text-gray-600">
              Engineered to meet the most demanding industrial requirements
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Performance Data</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Power Range</span>
                    <span className="font-medium">10-480 HP</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Working Pressure</span>
                    <span className="font-medium">7-13 bar (custom up to 40 bar)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Air Delivery</span>
                    <span className="font-medium">0.5-85 m³/min</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sound Level</span>
                    <span className="font-medium">62-75 dB(A)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Certifications</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500" />
                    <span className="ml-2">ISO 9001:2015 Certified</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500" />
                    <span className="ml-2">CE Compliant</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500" />
                    <span className="ml-2">ATEX Options Available</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500" />
                    <span className="ml-2">Class 0 Oil-Free Options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#4682c4] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-blue-100">
              What global manufacturers say about FLOW compressor systems
            </p>
          </div>
          
          {testimonialsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.length > 0 ? (
                testimonials.slice(0, 3).map((testimonial) => (
                  <div 
                    key={testimonial._id}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:border-blue-300 transition-colors duration-300"
                  >
                    <div className="flex items-center mb-6">
                      <div className="flex items-center mr-4">
                        {renderStars(parseInt(testimonial.star))}
                      </div>
                      <div className="text-sm text-blue-100">
                        {testimonial.designation || "Client"}
                      </div>
                    </div>
                    <p className="text-white mb-6 italic">
                      "{testimonial.feedback}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 mr-4 overflow-hidden flex-shrink-0">
                        <img 
                          src={testimonial.image.startsWith('http') ? testimonial.image : `https://flow-backend-of96.onrender.com/${testimonial.image}`}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/default-profile.png';
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-blue-100">
                          {testimonial.designation || "Satisfied Customer"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p>No testimonials available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default HomePage;