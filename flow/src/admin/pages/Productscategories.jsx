import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CategoriesAdmin = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    {
      _id: "1",
      name: "Screw Compressors",
      description: "High-efficiency rotary screw compressors",
      image: null,
      imagePreview: "/abot.png",
      features: [
        { name: "Energy Efficient", description: "Reduces power consumption by 25%" },
        { name: "Low Noise", description: "Operates at just 65dB" }
      ],
      subcategories: [
        { _id: "101", name: "Oil-Free Screw Compressors" },
        { _id: "102", name: "Oil-Injected Screw Compressors" }
      ]
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [featureInput, setFeatureInput] = useState({ name: '', description: '' });
  const [categoryFeatures, setCategoryFeatures] = useState([]);
  const [subcategoryInput, setSubcategoryInput] = useState('');
  const [categorySubcategories, setCategorySubcategories] = useState([]);

  const showAlert = (message, type = 'success') => {
    const newAlert = { id: Date.now(), message, type };
    setAlerts([...alerts, newAlert]);
    setTimeout(() => {
      setAlerts(alerts.filter(alert => alert.id !== newAlert.id));
    }, 3000);
  };

  const handleSubmit = (formData) => {
    if (currentCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat._id === currentCategory._id ? { 
          ...cat, 
          ...formData,
          subcategories: categorySubcategories 
        } : cat
      ));
      showAlert("Category updated successfully!");
    } else {
      // Add new category
      const newCategory = { 
        _id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        image: formData.image,
        imagePreview: formData.imagePreview || '/placeholder.png',
        features: categoryFeatures,
        subcategories: categorySubcategories
      };
      
      setCategories([...categories, newCategory]);
      showAlert("Category added successfully!");
      
      // Navigate to products page with the new category
      navigate('/admin/products', {
        state: { 
          newCategory: {
            _id: newCategory._id,
            name: newCategory.name,
            subcategories: newCategory.subcategories
          } 
        }
      });
    }
    setShowModal(false);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(c => c._id !== id));
    showAlert("Category deleted successfully!");
  };

  const handleViewProducts = (categoryId) => {
    navigate('/admin/products?category=' + categoryId);
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

  const addSubcategory = () => {
    if (subcategoryInput.trim() === '') return;
    
    const newSubcategory = {
      _id: `sub-${Date.now()}`,
      name: subcategoryInput
    };
    
    setCategorySubcategories([...categorySubcategories, newSubcategory]);
    setSubcategoryInput('');
  };

  const removeSubcategory = (index) => {
    const updatedSubcategories = [...categorySubcategories];
    updatedSubcategories.splice(index, 1);
    setCategorySubcategories(updatedSubcategories);
  };

  return (
    <div className="p-6">
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
            setCategorySubcategories([]);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <div key={category._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img 
                src={category.imagePreview || (category.image ? URL.createObjectURL(category.image) : '/placeholder.png')} 
                alt={category.name} 
                className="w-full h-48 object-cover"
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
                          <span className="font-medium">{feature.name}</span>
                          {feature.description && (
                            <p className="text-gray-500 text-xs">{feature.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Subcategories section */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-semibold text-sm text-gray-700">Subcategories:</h4>
                  <ul className="mt-1 text-sm">
                    {category.subcategories.map((subcategory, idx) => (
                      <li key={idx} className="flex items-start mt-1">
                        <span className="inline-block h-5 w-5 mr-1 text-blue-600">-</span>
                        <div>
                          <span className="font-medium">{subcategory.name}</span>
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
                      setCategoryFeatures(category.features || []);
                      setCategorySubcategories(category.subcategories || []);
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
        ))}
      </div>

      {/* Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-screen overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {currentCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  name: e.target.name.value,
                  description: e.target.description.value,
                  image: currentCategory?.image || null,
                  imagePreview: currentCategory?.imagePreview || null,
                  features: categoryFeatures,
                  subcategories: categorySubcategories
                };
                
                // Handle image upload
                const imageInput = e.target.image.files[0];
                if (imageInput) {
                  formData.image = imageInput;
                  formData.imagePreview = URL.createObjectURL(imageInput);
                }
                
                handleSubmit(formData);
              }}>
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
                  <label className="block text-gray-700 mb-2">Image*</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full p-2 border rounded"
                  />
                  {(currentCategory?.imagePreview || currentCategory?.image) && (
                    <div className="mt-2">
                      <img 
                        src={currentCategory.imagePreview || URL.createObjectURL(currentCategory.image)} 
                        alt="Preview" 
                        className="h-32 object-contain"
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
                
                {/* Subcategories Section */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Subcategories</label>
                  
                  {/* Subcategory input field */}
                  <div className="flex mb-2">
                    <input
                      type="text"
                      placeholder="Subcategory name"
                      value={subcategoryInput}
                      onChange={(e) => setSubcategoryInput(e.target.value)}
                      className="w-full p-2 border rounded-l"
                    />
                    <button 
                      type="button" 
                      onClick={addSubcategory}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-r border-t border-r border-b"
                    >
                      Add
                    </button>
                  </div>
                  
                  {/* Subcategories list */}
                  {categorySubcategories.length > 0 && (
                    <div className="border rounded p-3 mt-2">
                      <h4 className="font-medium text-sm mb-2">Added Subcategories:</h4>
                      <ul className="space-y-2">
                        {categorySubcategories.map((subcategory, idx) => (
                          <li key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <span className="font-medium text-sm">{subcategory.name}</span>
                            <button 
                              type="button" 
                              onClick={() => removeSubcategory(idx)}
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
                    Save
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