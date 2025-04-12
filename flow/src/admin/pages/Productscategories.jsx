import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoriesAdmin = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [featureInput, setFeatureInput] = useState({ name: '', description: '' });
  const [categoryFeatures, setCategoryFeatures] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  // API base URL
  const API_URL = 'http://localhost:5001/api/category';

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      showAlert('Failed to fetch categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Initialize form when editing
  useEffect(() => {
    if (currentCategory) {
      // Format features based on the data structure
      const features = Array.isArray(currentCategory.features) 
        ? currentCategory.features.map(feature => {
            if (typeof feature === 'string') {
              return { name: feature, description: '' };
            }
            return feature;
          })
        : [];
      
      setCategoryFeatures(features);
      
      // Set image preview if available
      if (currentCategory.image) {
        setImagePreview(`http://localhost:5001/${currentCategory.image}`);
      } else {
        setImagePreview(null);
      }
    } else {
      // Reset form if adding new
      setCategoryFeatures([]);
      setImagePreview(null);
    }
  }, [currentCategory]);

  const showAlert = (message, type = 'success') => {
    const newAlert = { id: Date.now(), message, type };
    setAlerts([...alerts, newAlert]);
    setTimeout(() => {
      setAlerts(alerts.filter(alert => alert.id !== newAlert.id));
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('name', e.target.name.value);
      formData.append('description', e.target.description.value || '');
      
      // Prepare features data
      const featuresData = categoryFeatures.map(feature => ({
        name: feature.name,
        description: feature.description || ''
      }));
      formData.append('features', JSON.stringify(featuresData));
      
      // Handle image upload
      if (e.target.image.files && e.target.image.files[0]) {
        formData.append('image', e.target.image.files[0]);
      }
      
      let response;
      
      if (currentCategory) {
        // Update existing category
        response = await axios.put(
          `${API_URL}/${currentCategory._id}`, 
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        showAlert('Category updated successfully!');
        
        // Refresh categories list
        await fetchCategories();
        setShowModal(false);
      } else {
        // Create new category
        response = await axios.post(
          API_URL, 
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        showAlert('Category added successfully!');
        
        // Refresh categories list
        await fetchCategories();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      showAlert(
        error.response?.data?.message || 'Failed to save category', 
        'error'
      );
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        showAlert('Category deleted successfully!');
        await fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        showAlert(
          error.response?.data?.message || 'Failed to delete category', 
          'error'
        );
      }
    }
  };

  const handleViewProducts = (categoryId) => {
    const newCategory = categoryId
    navigate(`/admin/products/${newCategory}`);
  };
  
  const addFeature = () => {
    if (featureInput.name.trim() === '') return;
    
    setCategoryFeatures([...categoryFeatures, {...featureInput}]);
    setFeatureInput({ name: '', description: '' });
  };

  const removeFeature = (index) => {
    const updatedFeatures = [...categoryFeatures];
    updatedFeatures.splice(index, 1);
    setCategoryFeatures(updatedFeatures);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Alerts */}
      {alerts.map(alert => (
        <div 
          key={alert.id} 
          className={`mb-4 p-3 rounded ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {alert.message}
        </div>
      ))}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <button 
          onClick={() => {
            setCurrentCategory(null);
            setCategoryFeatures([]);
            setImagePreview(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No categories found. Add your first category.</p>
          </div>
        ) : (
          categories.map(category => (
            <div key={category._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={category.image ? `http://localhost:5001/${category.image}` : '/placeholder.png'} 
                  alt={category.name} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder.png';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{category.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                
                {/* Features section */}
                {category.features && category.features.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-semibold text-sm text-gray-700">Features:</h4>
                    <ul className="mt-1 text-sm">
                      {category.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start mt-1">
                          <span className="inline-block h-5 w-5 mr-1 text-blue-600">•</span>
                          <div>
                            <span className="font-medium">{typeof feature === 'string' ? feature : feature.name}</span>
                            {feature.description && (
                              <p className="text-gray-500 text-xs">{feature.description}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={() => handleViewProducts(category._id)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View Products
                  </button>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setCurrentCategory(category);
                        setShowModal(true);
                      }}
                      className="text-yellow-600 text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteCategory(category._id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-screen overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {currentCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name*</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentCategory?.name || ''}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    defaultValue={currentCategory?.description || ''}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full p-2 border rounded"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-32 object-contain"
                        onError={(e) => {
                          e.target.src = '/placeholder.png';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                {/* Features Section */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Features</label>
                  
                  {/* Feature input fields */}
                  <div className="flex mb-2">
                    <input
                      type="text"
                      placeholder="Feature name"
                      value={featureInput.name}
                      onChange={(e) => setFeatureInput({...featureInput, name: e.target.value})}
                      className="w-1/2 p-2 border rounded-l"
                    />
                    <input
                      type="text"
                      placeholder="Description (optional)"
                      value={featureInput.description}
                      onChange={(e) => setFeatureInput({...featureInput, description: e.target.value})}
                      className="w-1/2 p-2 border-t border-b border-r rounded-r"
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={addFeature}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm mb-3"
                  >
                    Add Feature
                  </button>
                  
                  {/* Features list */}
                  {categoryFeatures.length > 0 && (
                    <div className="border rounded p-3 mt-2">
                      <h4 className="font-medium text-sm mb-2">Added Features:</h4>
                      <ul className="space-y-2">
                        {categoryFeatures.map((feature, idx) => (
                          <li key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <div>
                              <span className="font-medium text-sm">{feature.name}</span>
                              {feature.description && (
                                <p className="text-gray-500 text-xs">{feature.description}</p>
                              )}
                            </div>
                            <button 
                              type="button" 
                              onClick={() => removeFeature(idx)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {currentCategory ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesAdmin;