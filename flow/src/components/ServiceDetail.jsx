import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);

  const API_BASE_URL = "https://flow-backend-of96.onrender.com/api/service";

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/${serviceId}`);
        setService(response.data);
        
        // Fetch related services (all services except the current one)
        const allServicesResponse = await axios.get(API_BASE_URL);
        const otherServices = allServicesResponse.data.filter(s => s._id !== serviceId);
        // Take just 3 related services or less if there aren't 3
        setRelatedServices(otherServices.slice(0, 3));
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError("Failed to load service details. Please try again later.");
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading service details...</div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="text-lg text-red-600 mb-8">{error}</p>
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

  // Function to format service details into bullet points
  const formatServiceDetails = (details) => {
    // Split the details by line breaks or periods to create bullet points
    return details.split(/[.\n]+/).filter(item => item.trim().length > 0);
  };

  const detailPoints = formatServiceDetails(service.details);

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
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
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
                src={`https://flow-backend-of96.onrender.com/uploads/${service.image}`}
                alt={service.title}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Service Details */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Details</h2>
              
              {/* Modified: Service Details now has green checkmarks like Key Benefits */}
              <div className="mb-8 space-y-4">
                {detailPoints.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">{point}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Benefits</h3>
              <div className="space-y-4 mb-8">
                {service.benefits && service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">{benefit}</p>
                    </div>
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
        {relatedServices.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Other Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => (
                <div 
                  key={relatedService._id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
                >
                  <div className="mb-4 h-40 overflow-hidden">
                    <img 
                      src={`https://flow-backend-of96.onrender.com/uploads/${relatedService.image}`}
                      alt={relatedService.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{relatedService.title}</h3>
                  <p className="text-gray-600 mb-4">{relatedService.description}</p>
                  <Link
                    to={`/services/${relatedService._id}`}
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
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;