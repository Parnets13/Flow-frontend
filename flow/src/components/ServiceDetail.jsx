import { useParams, Link } from 'react-router-dom';

const ServiceDetail = () => {
  const { serviceId } = useParams();

  // Mock service data - in a real app you'd fetch this from an API
  const services = {
    'installation': {
      title: "Professional Installation",
      description: "Expert setup of your air compressor system",
      details: [
        "Site assessment and planning",
        "Proper equipment sizing",
        "Professional installation by certified technicians",
        "Initial system testing and calibration",
        "Operator training"
      ],
      image: "/abot.png",
      benefits: [
        "Optimal system performance from day one",
        "Reduced risk of installation errors",
        "Extended equipment lifespan",
        "Warranty protection"
      ]
    },
    'maintenance': {
      title: "Preventive Maintenance",
      description: "Regular care to prevent breakdowns and extend equipment life",
      details: [
        "Scheduled maintenance visits",
        "Complete system inspection",
        "Lubrication and filter changes",
        "Belt tension adjustments",
        "Performance testing"
      ],
      image: "/about.png",
      benefits: [
        "Reduced unexpected downtime",
        "Lower repair costs over time",
        "Consistent air quality",
        "Energy efficiency maintained"
      ]
    },
    // Add other services similarly...
  };

  const service = services[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <Link 
            to="/services" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 6 10">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <Link to="/services" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                  Services
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 6 10">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 capitalize">
                  {service.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Service Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {service.description}
          </p>
        </div>

        {/* Service Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Service Image */}
            <div className="h-96 bg-gray-100 flex items-center justify-center p-8">
              <img 
                src={service.image} 
                alt={service.title}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Service Details */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Details</h2>
              
              <ul className="space-y-4 mb-8">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-[#4682c4] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition duration-300"
                >
                  Request Service
                </Link>
                <a
                  href="tel:04272262889"
                  className="border border-blue-600 text-[#4682c4] hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg text-center transition duration-300"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Other Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* You would map through related services here */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Maintenance Plans</h3>
              <p className="text-gray-600 mb-4">Keep your system running smoothly with our maintenance packages</p>
              <Link
                to="/services/maintenance"
                className="inline-flex items-center text-[#4682c4] font-medium hover:underline"
              >
                Learn more
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;