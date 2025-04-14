import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';

// { 
//   _id: "1", 
//   name: "Screw Compressors",
//   subcategories: [
//     { _id: "101", name: "Oil-Free Screw Compressors" },
//     { _id: "102", name: "Oil-Injected Screw Compressors" }
//   ]
// },     
// { 
//   _id: "2", 
//   name: "2-Stage Compressors",
//   subcategories: [
//     { _id: "201", name: "Standard 2-Stage" },
//     { _id: "202", name: "High-Pressure 2-Stage" }
//   ]
// },
// { 
//   _id: "3", 
//   name: "VSD Models",
//   subcategories: [
//     { _id: "301", name: "Basic VSD" },
//     { _id: "302", name: "Advanced VSD+" }
//   ]
// }

const ProductsAdmin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = searchParams.get('category');
  const subcategoryId = searchParams.get('subcategory');
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const API_URL = 'https://flow-backend-of96.onrender.com/api/category';

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
  useEffect(()=>{
    fetchCategories()
  } , [])
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log("categories : " , categories)

  // Fetch products on component mount and when filters change
  useEffect(() => {
    fetchProducts();
  }, [categoryId, subcategoryId]);
  
  // Handle new category added from another component
  useEffect(() => {
    // console.log("location.state?.newCategory : " , location.state?.newCategory)
    if (location.state?.newCategory) {
      // console.log("location.state?.newCategory : " , location.state?.newCategory)
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
  
  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = 'https://flow-backend-of96.onrender.com/api/product';
      
      // Add query parameters if filters are applied
      if (categoryId) {
        url += `?categoryId=${categoryId}`;
        if (subcategoryId) {
          url += `&subcategoryId=${subcategoryId}`;
        }
      }
      
      const response = await axios.get(url);  // Using axios instead of fetch
      
      setProducts(response.data.data);  // Access the data property
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };
  // Create new product
  const createProduct = async (productData) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();
      
      // Add all product data to FormData
      Object.keys(productData).forEach(key => {
        if (key === 'specifications' || key === 'features') {
          formData.append(key, JSON.stringify(productData[key]));
        } else if (key === 'mainImage') {
          formData.append('mainImage', productData.mainImage);
        } else if (key === 'additionalImages') {
          productData.additionalImages.forEach(img => {
            if (img instanceof File) {
              formData.append('additionalImages', img);
            }
          });
        } else {
          formData.append(key, productData[key]);
        }
      });
      
      const response = await fetch('https://flow-backend-of96.onrender.com/api/product', {
        method: 'POST',
        body: formData,
        // No Content-Type header - browser will set it with boundary for FormData
      },{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      } 
    ); 
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (err) {
      console.error('Error creating product:', err);
      throw err;
    }
  };

  // Update existing product
  const updateProduct = async (id, productData) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();
      
      // Add all product data to FormData
      Object.keys(productData).forEach(key => {
        if (key === 'specifications' || key === 'features') {
          formData.append(key, JSON.stringify(productData[key]));
        } else if (key === 'mainImage' && productData.mainImage instanceof File) {
          formData.append('mainImage', productData.mainImage);
        } else if (key === 'additionalImages') {
          productData.additionalImages.forEach(img => {
            if (img instanceof File) {
              formData.append('additionalImages', img);
            }
          });
        } else if (key !== 'mainImage' || productData.mainImage instanceof File) {
          // Only append mainImage if it's a file (new image)
          formData.append(key, productData[key]);
        }
      });
      
      const response = await fetch(`https://flow-backend-of96.onrender.com/api/product/${id}`, {
        method: 'PUT',
        body: formData,
        // No Content-Type header - browser will set it with boundary for FormData
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  // Delete product
  const deleteProductFromAPI = async (id) => {
    try {
      const response = await fetch(`https://flow-backend-of96.onrender.com/api/product/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      };
      // console.log("productData : " , productData)
      let result;
      
      if (currentProduct) {
        // Update existing product
        result = await updateProduct(currentProduct._id, productData);
        showAlert("Product updated successfully!");
      } else {
        // Create new product
        console.log("productData : " , productData)
        result = await createProduct(productData);
        showAlert("Product added successfully!");
      }
      
      // Refresh products list
      await fetchProducts();
      
      // Reset form and state
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
    } catch (err) {
      showAlert(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      try {
        await deleteProductFromAPI(id);
        showAlert("Product deleted successfully!");
        
        // Refresh products list
        await fetchProducts();
      } catch (err) {
        showAlert(`Error deleting product: ${err.message}`, 'error');
      } finally {
        setLoading(false);
      }
    }
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
        mainImage: null,  // We can't edit the existing file directly
        price: product.price,
        fullDescription: product.fullDescription,
        specifications: product.specifications || [],
        features: product.features || [],
        additionalImages: []  // Reset since we can't edit existing files directly
      });
      
      // Set preview images from API
      // if (product.mainImage) {
      //   setPreviewImage(product.mainImage.startsWith('http') 
      //     ? product.mainImage 
      //     : `https://flow-backend-of96.onrender.com/${product.mainImage}`);
      // }
      
      // if (product.additionalImages && product.additionalImages.length > 0) {
      //   setPreviewImages(product.additionalImages.map(img => 
      //     img.startsWith('http') ? img : `https://flow-backend-of96.onrender.com/${img}`
      //   ));
      // } else {
      //   setPreviewImages([]);
      // }
      <td className="py-3 px-4">
  {product.mainImage && (
    <img 
      src={product.mainImage.startsWith('http') 
        ? product.mainImage 
        : `https://flow-backend-of96.onrender.com/uploads/${product.mainImage}`} 
      alt={product.name} 
      className="w-16 h-16 object-cover rounded"
      onError={(e) => {
        e.target.onerror = null; 
        e.target.src = '/placeholder-image.jpg';
      }}
    />
  )}
</td>
      
      // Load subcategories for the selected category
      const category = categories.find(c => c._id === product.categoryId);
      if (category && category.subcategories) {
        setAvailableSubcategories(category.subcategories);
      }
      
      setShowAddForm(true);
    }
  };

  // Get current category and subcategory names for display
  const currentCategory = categories.find(c => c._id === categoryId);
  const currentSubcategory = currentCategory?.subcategories?.find(s => s._id === subcategoryId);
  console.log("products : " , products)
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
          disabled={loading}
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
                disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {/* Error message */}
      {error && !loading && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-6">
          {error}
          <button 
            onClick={fetchProducts} 
            className="ml-4 underline text-blue-600"
          >
            Try Again
          </button>
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
                    disabled={loading}
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
                      disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Main Image{!currentProduct && '*'}
                    {currentProduct && ' (Leave empty to keep current image)'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="w-full p-2 border rounded"
                    required={!currentProduct}
                    disabled={loading}
                  />
                  {/* {previewImage && (
                    <div className="mt-2">
                      <img src={previewImage} alt="Preview" className="h-32 object-contain"/>
                      {formData.mainImage && formData.mainImage instanceof File && 
                        <p className="text-sm text-gray-500 mt-1">{formData.mainImage.name}</p>
                      }
                    </div>
                  )} */}
{previewImage && (
  <div className="mt-2">
    <img 
      src={typeof previewImage === 'string' && previewImage.startsWith('http') 
        ? previewImage 
        : URL.createObjectURL(formData.mainImage)} 
      alt="Preview" 
      className="h-32 object-contain"
      onError={(e) => {
        e.target.onerror = null; 
        e.target.src = '/placeholder-image.jpg';
      }}
    />
    {formData.mainImage && formData.mainImage instanceof File && 
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={spec.specValue}
                    onChange={(e) => handleSpecChange(index, 'specValue', e.target.value)}
                    placeholder="Spec value"
                    className="flex-1 p-2 border rounded"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecField(index)}
                    className="text-red-600 px-2"
                    disabled={loading || formData.specifications.length <= 1}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSpecField}
                className="text-blue-600 text-sm mt-2"
                disabled={loading}
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
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={feature.featureValue}
                    onChange={(e) => handleFeatureChange(index, 'featureValue', e.target.value)}
                    placeholder="Feature value"
                    className="flex-1 p-2 border rounded"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 px-2"
                    disabled={loading || formData.features.length <= 1}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="text-blue-600 text-sm mt-2"
                disabled={loading}
              >
                + Add Feature
              </button>
            </div>
            {/* Additional Images */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Additional Images
                {currentProduct && ' (New images will be added to existing ones)'}
              </h2>
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAdditionalImagesChange}
                  className="w-full p-2 border rounded"
                  multiple
                  disabled={loading}
                />
              </div>
              
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative border p-2 rounded">
                    <img src={image} alt={`Preview ${index}`} className="h-32 w-full object-contain"/>
                    {formData.additionalImages[index] && typeof formData.additionalImages[index] !== 'string' && (
                      <p className="text-xs truncate mt-1">{formData.additionalImages[index].name}</p>
                    )}
                    {!loading && (
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div> */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {previewImages.map((image, index) => (
    <div key={index} className="relative border p-2 rounded">
      <img 
        src={typeof image === 'string' && image.startsWith('http') 
          ? image 
          : URL.createObjectURL(formData.additionalImages[index])} 
        alt={`Preview ${index}`} 
        className="h-32 w-full object-contain"
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = '/placeholder-image.jpg';
        }}
      />
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
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Saving...' : currentProduct ? 'Save Changes' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {!loading && !error && products.length > 0 ? (
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
  {products.map(product => {
    const category = categories.find(c => c._id === product.categoryId);
    const subcategory = category?.subcategories?.find(s => s._id === product.subcategoryId);
    
    return (
      <tr key={product._id} className="border-t hover:bg-gray-50">
        <td className="py-3 px-4">
  {product.mainImage && (
    <img 
      src={product.mainImage.startsWith('http') 
        ? product.mainImage 
        : `https://flow-backend-of96.onrender.com/uploads/${product.mainImage}`} 
      alt={product.name} 
      className="w-16 h-16 object-cover rounded"
      onError={(e) => {
        e.target.onerror = null; 
        e.target.src = '/placeholder-image.jpg';
      }}
    />
  )}
</td>
        <td className="py-3 px-4 font-medium">{product.name}</td>
        <td className="py-3 px-4 text-gray-600">{product.shortDescription}</td>
        <td className="py-3 px-4">${product.price?.toLocaleString()}</td>
        <td className="py-3 px-4">{product.categoryId?.name}</td>

        {/* {!categoryId && (
          <td className="py-3 px-4">
            {category?.name || 'N/A'}
          </td>
        )}
        {categoryId && !subcategoryId && (
          <td className="py-3 px-4">
            {subcategory?.name || 'N/A'}
          </td>
        )} */}
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


