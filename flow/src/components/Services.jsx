import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  // Simplified banner images
  const bannerImages = [
    {
      img: "/abot.png",
      title: "Expert Air Compressor Services",
      subtitle: "Keeping your systems running at peak performance"
    }
  ];

  // Simplified services data
  const services = [
    {
      id: 'installation',
      name: "Installation",
      description: "Professional setup of your air compressor system",
      icon: "🔧",
      link: "/services/installation"
    },
    {
      id: 'maintenance',
      name: "Maintenance",
      description: "Regular care to prevent breakdowns",
      icon: "🛠️",
      link: "/services/maintenance"
    },
    {
      id: 3,
      name: "Emergency Repairs",
      description: "24/7 support to minimize downtime",
      icon: "🚨",
      link: "/services/repairs"
    },
    {
      id: 4,
      name: "Energy Audits",
      description: "Optimize your system's efficiency",
      icon: "📊",
      link: "/services/energy-audits"
    },
    {
      id: 5,
      name: "Upgrades",
      description: "Modernize your existing systems",
      icon: "⚡",
      link: "/services/upgrades"
    },
    {
      id: 6,
      name: "Custom Solutions",
      description: "Tailored for your specific needs",
      icon: "🎯",
      link: "/services/custom-solutions"
    }
  ];

  const benefits = [
    {
      title: "Expert Technicians",
      description: "Certified professionals with years of experience"
    },
    {
      title: "Quick Response",
      description: "24/7 availability for emergency services"
    },
    {
      title: "Genuine Parts",
      description: "Only OEM parts used for all repairs"
    },
    {
      title: "Cost Savings",
      description: "Reduce energy costs with optimized systems"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simplified Banner Section */}
      <div className="relative h-96 overflow-hidden bg-gray-800 mt-1">
        <div className="absolute inset-0">
          <img
            src={bannerImages[0].img}
            alt={bannerImages[0].title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 h-full flex items-center relative z-10 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {bannerImages[0].title}
            </h1>
            <p className="text-xl md:text-2xl">
              {bannerImages[0].subtitle}
            </p>
          </div>
        </div>
      </div>
      {/* Simplified Services Section */}
      <section className="py-16 mt-1">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your compressed air needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-[#4682c4] font-medium hover:underline"
                >
                  Learn more
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;