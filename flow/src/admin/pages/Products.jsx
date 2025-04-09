import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const ProductsAdmin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = searchParams.get('category');
  const subcategoryId = searchParams.get('subcategory');
  const [categories, setCategories] = useState([
    { 
      _id: "1", 
      name: "Screw Compressors",
      subcategories: [
        { _id: "101", name: "Oil-Free Screw Compressors" },
        { _id: "102", name: "Oil-Injected Screw Compressors" }
      ]
    },
    { 
      _id: "2", 
      name: "2-Stage Compressors",
      subcategories: [
        { _id: "201", name: "Standard 2-Stage" },
        { _id: "202", name: "High-Pressure 2-Stage" }
      ]
    },
    { 
      _id: "3", 
      name: "VSD Models",
      subcategories: [
        { _id: "301", name: "Basic VSD" },
        { _id: "302", name: "Advanced VSD+" }
      ]
    }
  ]);
  useEffect(() => {
    if (location.state?.newCategory) {
      setCategories(prevCategories => {
        const exists = prevCategories.some(
          cat => cat._id === location.state.newCategory._id
        );
        
        if (!exists) {
          return [...prevCategories, location.state.newCategory];
        }
        return prevCategories;
      });
    
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const [products, setProducts] = useState([
    {
      _id: "1",
      categoryId: "1",
      subcategoryId: "101",
      name: "EcoVSD+ 75HP",
      shortDescription: "Premium VSD compressor",
      mainImage: "/abot.png",
      price: 28500,
      fullDescription: "Detailed description about this compressor model...",
      specifications: [
        { specName: "Flow Rate", specValue: "75-300 CFM" },
        { specName: "Pressure", specValue: "100-175 PSIG" }
      ],
      features: [
        { featureName: "Energy", featureValue: "Energy efficient" },
        { featureName: "Noise", featureValue: "Quiet operation" }
      ],
      additionalImages: ["/image1.jpg", "/image2.jpg"]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    subcategoryId: "",
    name: "",
    shortDescription: "",
    mainImage: null,
    price: "",
    fullDescription: "",
    specifications: [{ specName: "", specValue: "" }],
    features: [{ featureName: "", featureValue: "" }],
    additionalImages: []
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  useEffect(() => {
    if (formData.categoryId) {
      const category = categories.find(c => c._id === formData.categoryId);
      if (category && category.subcategories) {
        setAvailableSubcategories(category.subcategories);
        if (!category.subcategories.some(s => s._id === formData.subcategoryId)) {
          setFormData(prev => ({ ...prev, subcategoryId: "" }));
        }
      } else {
        setAvailableSubcategories([]);
        setFormData(prev => ({ ...prev, subcategoryId: "" }));
      }
    } else {
      setAvailableSubcategories([]);
      setFormData(prev => ({ ...prev, subcategoryId: "" }));
    }
  }, [formData.categoryId, categories]);

  const showAlert = (message, type = 'success') => {
    const newAlert = { id: Date.now(), message, type };
    setAlerts([...alerts, newAlert]);
    setTimeout(() => {
      setAlerts(alerts.filter(alert => alert.id !== newAlert.id));
    }, 3000);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        mainImage: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [...formData.additionalImages, ...files];
      setFormData(prev => ({
        ...prev,
        additionalImages: newImages
      }));

      // Create previews
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index) => {
    const newImages = [...formData.additionalImages];
    newImages.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      additionalImages: newImages
    }));

    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData(prev => ({
      ...prev,
      specifications: newSpecs
    }));
  };

  const addSpecField = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { specName: "", specValue: "" }]
    }));
  };

  const removeSpecField = (index) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      specifications: newSpecs
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index][field] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { featureName: "", featureValue: "" }]
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      _id: currentProduct ? currentProduct._id : Date.now().toString(),
      mainImage: formData.mainImage ? URL.createObjectURL(formData.mainImage) : '',
      additionalImages: formData.additionalImages.map(img => 
        typeof img === 'string' ? img : URL.createObjectURL(img)
      )
    };

    if (currentProduct) {
      setProducts(products.map(p => p._id === currentProduct._id ? newProduct : p));
      showAlert("Product updated successfully!");
    } else {
      setProducts([...products, newProduct]);
      showAlert("Product added successfully!");
    }

    setShowAddForm(false);
    setCurrentProduct(null);
    setFormData({
      categoryId: "",
      subcategoryId: "",
      name: "",
      shortDescription: "",
      mainImage: null,
      price: "",
      fullDescription: "",
      specifications: [{ specName: "", specValue: "" }],
      features: [{ featureName: "", featureValue: "" }],
      additionalImages: []
    });
    setPreviewImage(null);
    setPreviewImages([]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p._id !== id));
    showAlert("Product deleted successfully!");
  };

  const editProduct = (id) => {
    const product = products.find(p => p._id === id);
    if (product) {
      setCurrentProduct(product);
      setFormData({
        categoryId: product.categoryId,
        subcategoryId: product.subcategoryId || "",
        name: product.name,
        shortDescription: product.shortDescription,
        mainImage: null,
        price: product.price,
        fullDescription: product.fullDescription,
        specifications: product.specifications,
        features: product.features,
        additionalImages: []  // Reset since we can't edit existing files directly
      });
      setPreviewImage(product.mainImage);
      setPreviewImages(product.additionalImages);
      
      // Load subcategories for the selected category
      const category = categories.find(c => c._id === product.categoryId);
      if (category && category.subcategories) {
        setAvailableSubcategories(category.subcategories);
      }
      
      setShowAddForm(true);
    }
  };

  // Filter products based on selected category and subcategory
  const filteredProducts = products.filter(product => {
    if (categoryId && subcategoryId) {
      return product.categoryId === categoryId && product.subcategoryId === subcategoryId;
    } else if (categoryId) {
      return product.categoryId === categoryId;
    }
    return true;
  });

  // Get current category and subcategory names for display
  const currentCategory = categories.find(c => c._id === categoryId);
  const currentSubcategory = currentCategory?.subcategories?.find(s => s._id === subcategoryId);

  return (
    <div className="p-6">
      {/* Alerts */}
      {alerts.map(alert => (
        <div key={alert.id} className={`mb-4 p-3 rounded ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {alert.message}
        </div>
      ))}
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          {categoryId && (
            <p className="text-gray-600">
              Category: {currentCategory?.name || 'N/A'}
              {subcategoryId && ` > ${currentSubcategory?.name || 'N/A'}`}
            </p>
          )}
        </div>
        <button 
          onClick={() => {
            setCurrentProduct(null);
            setShowAddForm(true);
            // Reset form when adding new product
            setFormData({
              categoryId: "",
              subcategoryId: "",
              name: "",
              shortDescription: "",
              mainImage: null,
              price: "",
              fullDescription: "",
              specifications: [{ specName: "", specValue: "" }],
              features: [{ featureName: "", featureValue: "" }],
              additionalImages: []
            });
            setPreviewImage(null);
            setPreviewImages([]);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Filter controls */}
      {!showAddForm && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
              <select 
                value={categoryId || ""} 
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    navigate(`/admin/products?category=${value}`);
                  } else {
                    navigate('/admin/products');
                  }
                }}
                className="w-full p-2 border rounded"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            {categoryId && currentCategory?.subcategories?.length > 0 && (
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Subcategory</label>
                <select 
                  value={subcategoryId || ""} 
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      navigate(`/admin/products?category=${categoryId}&subcategory=${value}`);
                    } else {
                      navigate(`/admin/products?category=${categoryId}`);
                    }
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="">All Subcategories</option>
                  {currentCategory.subcategories.map(subcategory => (
                    <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            {(categoryId || subcategoryId) && (
              <div className="flex items-end">
                <button
                  onClick={() => navigate('/admin/products')}
                  className="p-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showAddForm ? (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">{currentProduct ? 'Edit Product' : 'Add New Product'}</h1>
          <form onSubmit={handleAddProduct} className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>
                
                <div>
                  <label className="block text-gray-700 mb-1">Category*</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {availableSubcategories.length > 0 && (
                  <div>
                    <label className="block text-gray-700 mb-1">Subcategory*</label>
                    <select
                      name="subcategoryId"
                      value={formData.subcategoryId}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select Subcategory</option>
                      {availableSubcategories.map(subcategory => (
                        <option key={subcategory._id} value={subcategory._id}>
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 mb-1">Product Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Short Description*</label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Main Image*</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="w-full p-2 border rounded"
                    required={!currentProduct}
                  />
                  {previewImage && (
                    <div className="mt-2">
                      <img src={previewImage} alt="Preview" className="h-32 object-contain"/>
                      {formData.mainImage && 
                        <p className="text-sm text-gray-500 mt-1">{formData.mainImage.name}</p>
                      }
                    </div>
                  )}
                </div>
              </div>
              {/* Pricing & Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Pricing & Details</h2>
                
                <div>
                  <label className="block text-gray-700 mb-1">Price*</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="e.g. 28500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Full Description*</label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="5"
                    required
                  />
                </div>
              </div>
            </div>
            {/* Specifications */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Specifications</h2>
              {formData.specifications.map((spec, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={spec.specName}
                    onChange={(e) => handleSpecChange(index, 'specName', e.target.value)}
                    placeholder="Spec name"
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={spec.specValue}
                    onChange={(e) => handleSpecChange(index, 'specValue', e.target.value)}
                    placeholder="Spec value"
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecField(index)}
                    className="text-red-600 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSpecField}
                className="text-blue-600 text-sm mt-2"
              >
                + Add Specification
              </button>
            </div>
            {/* Features */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Features</h2>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={feature.featureName}
                    onChange={(e) => handleFeatureChange(index, 'featureName', e.target.value)}
                    placeholder="Feature name"
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={feature.featureValue}
                    onChange={(e) => handleFeatureChange(index, 'featureValue', e.target.value)}
                    placeholder="Feature value"
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="text-blue-600 text-sm mt-2"
              >
                + Add Feature
              </button>
            </div>
            {/* Additional Images */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Additional Images</h2>
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAdditionalImagesChange}
                  className="w-full p-2 border rounded"
                  multiple
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative border p-2 rounded">
                    <img src={image} alt={`Preview ${index}`} className="h-32 w-full object-contain"/>
                    {formData.additionalImages[index] && typeof formData.additionalImages[index] !== 'string' && (
                      <p className="text-xs truncate mt-1">{formData.additionalImages[index].name}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setCurrentProduct(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {currentProduct ? 'Save Changes' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {filteredProducts.length > 0 ? (
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  {!categoryId && <th className="py-3 px-4 text-left">Category</th>}
                  {categoryId && !subcategoryId && <th className="py-3 px-4 text-left">Subcategory</th>}
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => {
                  const category = categories.find(c => c._id === product.categoryId);
                  const subcategory = category?.subcategories?.find(s => s._id === product.subcategoryId);
                  
                  return (
                    <tr key={product._id} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <img src={product.mainImage} alt={product.name} className="w-16 h-16 object-cover rounded"/>
                      </td>
                      <td className="py-3 px-4 font-medium">{product.name}</td>
                      <td className="py-3 px-4 text-gray-600">{product.shortDescription}</td>
                      <td className="py-3 px-4">${product.price?.toLocaleString()}</td>
                      {!categoryId && (
                        <td className="py-3 px-4">
                          {category?.name || 'N/A'}
                        </td>
                      )}
                      {categoryId && !subcategoryId && (
                        <td className="py-3 px-4">
                          {subcategory?.name || 'N/A'}
                        </td>
                      )}
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editProduct(product._id)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No products found matching the selected filters.</p>
              {(categoryId || subcategoryId) && (
                <button
                  onClick={() => navigate('/admin/products')}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Clear filters and show all products
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsAdmin;