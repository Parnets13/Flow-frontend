import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const bannerImages = [
    {
      img: "/abot.png",
      title: "Premium Air Compressor Solutions",
      subtitle: "High-performance equipment for industrial applications"
    },
    {
      img: "/about.png",
      title: "Energy Efficient Models",
      subtitle: "Reduce operational costs with our advanced technology"
    },
    {
      img: "/abot.png",
      title: "Reliable Performance",
      subtitle: "Built to withstand demanding industrial environments"
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
  const productCategories = [
    {
      id: 1,
      name: "Screw Compressors",
      description: "High-efficiency rotary screw compressors for continuous operation",
      features: [
        "Oil-injected and oil-free models",
        "15-500 HP capacity range",
        "Energy saving designs",
        "Low noise operation"
      ],
      image: "/abot.png",
      link: "/products/screw-compressors"
    },
    {
      id: 2,
      name: "2-Stage Compressors",
      description: "Heavy-duty compressors for higher pressure requirements",
      features: [
        "5-200 HP capacity range",
        "Intercooling between stages",
        "Durable cast iron construction",
        "Lower operating temperatures"
      ],
      image: "/images.jpeg",
      link: "/products/2-stage-compressors"
    },
    {
      id: 3,
      name: "VSD Models",
      description: "Variable Speed Drive compressors for optimal energy usage",
      features: [
        "30-60% energy savings",
        "Precise pressure control",
        "Reduced electrical peaks",
        "Extended component life"
      ],
      image: "/about.png",
      link: "/products/vsd-models"
    },
    {
      id: 4,
      name: "Spare Parts",
      description: "Genuine OEM parts for all major compressor brands",
      features: [
        "Filters and separators",
        "Valves and gaskets",
        "Bearings and seals",
        "Lubricants and coolants"
      ],
      image: "/about.png",
      link: "/products/spare-parts"
    },
    {
      id: 5,
      name: "Accessories",
      description: "Complete solutions for your compressed air system",
      features: [
        "Air dryers and filters",
        "Condensate management",
        "Piping and fittings",
        "Control systems"
      ],
      image: "images.jpeg",
      link: "/products/accessories"
    },
    {
      id: 1,
      name: "Screw Compressors",
      description: "High-efficiency rotary screw compressors for continuous operation",
      features: [
        "Oil-injected and oil-free models",
        "15-500 HP capacity range",
        "Energy saving designs",
        "Low noise operation"
      ],
      image: "/abot.png",
      link: "/products/screw-compressors"
    }
  ];
  const featuredProducts = [
    {
      id: "ecovsd-75hp",
      name: "EcoVSD+ 75HP",
      category: "screw-compressor",
      description: "Premium efficiency variable speed drive compressor with smart control",
      specs: {
        "Flow Rate": "75-300 CFM",
        "Pressure": "100-175 PSIG",
        "Motor": "Premium Efficiency IE4",
        "Noise Level": "68 dB(A)"
      },
      image: "/abot.png"
    },
    {
      id: "duratwo-50hp",
      name: "DuraTwo 50HP",
      category: "2-stage-compressor",
      description: "Heavy-duty two-stage compressor for industrial applications",
      specs: {
        "Flow Rate": "50-200 CFM",
        "Pressure": "175-250 PSIG",
        "Motor": "Cast Iron Construction",
        "Noise Level": "72 dB(A)"
      },
      image: "/about.png"
    }
  ];

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
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-medium text-sm mb-6">
              OUR PRODUCTS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Compressed Air Equipment
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              High-quality compressors and accessories for every industrial application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category) => (
              <div 
                key={category.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {category.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <svg className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={category.link}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#4682c4] to-[#3face2] hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                  >
                    View Products
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our most popular and high-performance compressor models
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:w-1/2">
                    <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-1">
                      {product.category.replace('-', ' ')}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    
                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Specifications:</h4>
                      <ul className="space-y-2">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <li key={key} className="flex justify-between">
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-4">
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-medium text-sm mb-8">
                OUR TECHNOLOGY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Advanced Compressor Engineering
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Energy Efficiency</h3>
                    <p className="text-gray-600">
                      Our VSD technology adjusts motor speed to match air demand, reducing energy consumption by up to 50%
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Durable Construction</h3>
                    <p className="text-gray-600">
                      Heavy-duty components and precision engineering ensure long service life in demanding environments
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Smart Controls</h3>
                    <p className="text-gray-600">
                      Advanced microprocessor controls with remote monitoring capabilities for optimal performance
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="/abot.png"
                alt="Compressor Technology"
                className="rounded-xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 max-w-xs">
                <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
                <div className="text-gray-600">Average energy savings with VSD models</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Industrial Applications
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our compressors serve a wide range of industries and applications
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="font-medium">Manufacturing</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="font-medium">Packaging</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="font-medium">Automotive</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="font-medium">Pharmaceutical</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div className="font-medium">Food & Beverage</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="font-medium">Construction</div>
            </div>
          </div>
        </div>
      </section>
     
    </div>
  );
};

export default Products;