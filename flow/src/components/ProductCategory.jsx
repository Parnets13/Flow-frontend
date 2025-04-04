import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for products in each category
  useEffect(() => {
    const mockCategoryProducts = {
      'screw-compressors': [
        {
          id: 'ecovsd-75hp',
          name: "EcoVSD+ 75HP",
          description: "Premium efficiency variable speed drive compressor",
          image: "/abot.png",
          specs: {
            "Flow Rate": "75-300 CFM",
            "Pressure": "100-175 PSIG"
          }
        },
        {
          id: 'ecovsd-50hp',
          name: "EcoVSD+ 50HP", 
          description: "Medium capacity VSD compressor",
          image: "/about.png",
          specs: {
            "Flow Rate": "50-250 CFM",
            "Pressure": "100-150 PSIG"
          }
        },
        {
            id: 'ecovsd-50hp',
            name: "EcoVSD+ 50HP", 
            description: "Medium capacity VSD compressor",
            image: "/about.png",
            specs: {
              "Flow Rate": "50-250 CFM",
              "Pressure": "100-150 PSIG"
            }
          }
      ],
      '2-stage-compressors': [
        {
          id: 'duratwo-50hp',
          name: "DuraTwo 50HP",
          description: "Heavy-duty two-stage compressor",
          image: "/images.jpeg",
          specs: {
            "Flow Rate": "50-200 CFM",
            "Pressure": "175-250 PSIG"
          }
        },
        {
            id: 'duratwo-50hp',
            name: "DuraTwo 50HP",
            description: "Heavy-duty two-stage compressor",
            image: "/images.jpeg",
            specs: {
              "Flow Rate": "50-200 CFM",
              "Pressure": "175-250 PSIG"
            }
          },
          {
            id: 'duratwo-50hp',
            name: "DuraTwo 50HP",
            description: "Heavy-duty two-stage compressor",
            image: "/images.jpeg",
            specs: {
              "Flow Rate": "50-200 CFM",
              "Pressure": "175-250 PSIG"
            }
          }

      ],
      'vsd-models': [
        {
          id: 'vsd-premium',
          name: "VSD Premium 100HP",
          description: "Advanced variable speed model",
          image: "/abot.png",
          specs: {
            "Flow Rate": "100-400 CFM",
            "Pressure": "100-150 PSIG"
          }
        },
        {
            id: 'vsd-premium',
            name: "VSD Premium 100HP",
            description: "Advanced variable speed model",
            image: "/abot.png",
            specs: {
              "Flow Rate": "100-400 CFM",
              "Pressure": "100-150 PSIG"
            }
          },
          {
            id: 'vsd-premium',
            name: "VSD Premium 100HP",
            description: "Advanced variable speed model",
            image: "/abot.png",
            specs: {
              "Flow Rate": "100-400 CFM",
              "Pressure": "100-150 PSIG"
            }
          }
      ],
      
      
    };

    setTimeout(() => {
      setProducts(mockCategoryProducts[category] || []);
      setLoading(false);
    }, 500);
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <Link to="/products" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                  Products
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {category.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {category.replace('-', ' ').toUpperCase()}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Specifications:</h4>
                  <ul className="space-y-1">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  to={`/products/${category}/${product.id}`}
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#4682c4] to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                >
                  View Details
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;