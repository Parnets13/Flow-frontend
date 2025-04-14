import { 
  FiDollarSign, 
  FiShoppingBag, 
  FiUsers, 
  FiPackage,
  FiTool,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: "Total Customers", value: "Loading...", icon: <FiUsers size={24} />, color: "bg-purple-100 text-purple-600", trend: null },
    { title: "Active Products", value: "Loading...", icon: <FiPackage size={24} />, color: "bg-yellow-100 text-yellow-600", trend: null },
    { title: "Active Services", value: "Loading...", icon: <FiTool size={24} />, color: "bg-red-100 text-red-600", trend: null }
  ]);
  
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product, service, and contact counts on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Make API calls to get all products, services, and contacts
        const [productResponse, serviceResponse, contactResponse] = await Promise.all([
          axios.get('https://flow-backend-of96.onrender.com/api/product'),
          axios.get('https://flow-backend-of96.onrender.com/api/service'),
          axios.get('https://flow-backend-of96.onrender.com/api/contacts')
        ]);
        
        // Set services and contacts state
        setServices(serviceResponse.data);
        setContacts(contactResponse.data);
        
        // Get counts
        const productCount = productResponse.data.data.length;
        const serviceCount = serviceResponse.data.length;
        const contactCount = contactResponse.data.length;
        
        // Update stats with the actual counts
        setStats(prevStats => prevStats.map(stat => {
          if (stat.title === "Active Products") {
            return { ...stat, value: productCount.toString(), trend: Math.random() > 0.5 ? 'up' : 'down' };
          } else if (stat.title === "Active Services") {
            return { ...stat, value: serviceCount.toString(), trend: Math.random() > 0.5 ? 'up' : 'down' };
          } else if (stat.title === "Total Customers") {
            return { ...stat, value: contactCount.toString(), trend: Math.random() > 0.5 ? 'up' : 'down' };
          }
          return stat;
        }));
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
        
        // Set error state in stats
        setStats(prevStats => prevStats.map(stat => ({
          ...stat, 
          value: "Error",
          trend: null
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statusBadge = (status) => {
    const statusConfig = {
      'new': { bg: 'bg-blue-100', text: 'text-blue-800', icon: <FiClock className="mr-1" /> },
      'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <FiTrendingUp className="mr-1" /> },
      'resolved': { bg: 'bg-green-100', text: 'text-green-800', icon: <FiCheckCircle className="mr-1" /> },
      'default': { bg: 'bg-gray-100', text: 'text-gray-800', icon: <FiAlertCircle className="mr-1" /> }
    };
    
    const config = statusConfig[status] || statusConfig['default'];
    
    return (
      <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}>
        {config.icon}
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your business.</p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
          Refresh Data
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                {stat.icon}
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 mb-2">
                  {loading ? <Skeleton width={40} /> : stat.value}
                </p>
                {stat.trend && (
                  <div className={`inline-flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? (
                      <FiTrendingUp className="mr-1" />
                    ) : (
                      <FiTrendingUp className="mr-1 transform rotate-180" />
                    )}
                    {stat.trend === 'up' ? '12%' : '5%'} from last month
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Two Column Layout for Recent Contacts and Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Contacts</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View All <span className="ml-1">→</span>
            </button>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <Skeleton width={120} height={20} />
                  <Skeleton width={80} height={20} />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-500 mb-2">
                <FiAlertCircle size={32} className="mx-auto" />
              </div>
              <p className="text-gray-600">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.length > 0 ? (
                contacts.slice(0, 5).map((contact) => (
                  <div key={contact._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{contact.email}</p>
                    </div>
                    <div>
                      {statusBadge(contact.status)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No contacts found</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Services Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Active Services</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
              Manage Services <span className="ml-1">→</span>
            </button>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center py-3">
                  <Skeleton circle width={48} height={48} className="mr-4" />
                  <div>
                    <Skeleton width={150} height={20} />
                    <Skeleton width={200} height={16} className="mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-500 mb-2">
                <FiAlertCircle size={32} className="mx-auto" />
              </div>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {services.length > 0 ? (
                services.slice(0, 3).map((service) => (
                  <div key={service._id} className="flex items-start py-4 border-b border-gray-100 last:border-0">
                    <div className="flex-shrink-0 mr-4">
                      <img 
                        src={`https://flow-backend-of96.onrender.com/uploads/${service.image}`}
                        alt={service.title}
                        className="h-12 w-12 object-cover rounded-lg" 
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = 'https://via.placeholder.com/48';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{service.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                      {service.benefits && service.benefits.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {service.benefits.slice(0, 3).map((benefit, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                              {benefit}
                            </span>
                          ))}
                          {service.benefits.length > 3 && (
                            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                              +{service.benefits.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No services found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;