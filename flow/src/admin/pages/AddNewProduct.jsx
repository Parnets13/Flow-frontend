import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [categories] = useState([
    { id: "1", name: "Screw Compressors" },
    { id: "2", name: "2-Stage Compressors" },
    { id: "3", name: "VSD Models" }
  ]);
  
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    description: "",
    image: "",
    price: "",
    fullDescription: "",
    specs: [{ key: "", value: "" }],
    features: [""],
    images: [""]
  });

  const [alerts, setAlerts] = useState([]);

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

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specs];
    newSpecs[index][field] = value;
    setFormData(prev => ({
      ...prev,
      specs: newSpecs
    }));
  };

  const addSpecField = () => {
    setFormData(prev => ({
      ...prev,
      specs: [...prev.specs, { key: "", value: "" }]
    }));
  };

  const removeSpecField = (index) => {
    const newSpecs = formData.specs.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      specs: newSpecs
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ""]
    }));
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty specs, features, and images
    const filteredSpecs = formData.specs
      .filter(spec => spec.key.trim() && spec.value.trim())
      .reduce((obj, spec) => {
        obj[spec.key] = spec.value;
        return obj;
      }, {});

    const filteredFeatures = formData.features.filter(f => f.trim());
    const filteredImages = formData.images.filter(img => img.trim());

    // Here you would typically send the data to your backend API
    console.log("Submitting product:", {
      ...formData,
      specs: filteredSpecs,
      features: filteredFeatures,
      images: filteredImages
    });

    showAlert("Product added successfully!");
    navigate('/admin/products'); // Redirect to products page after submission
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
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
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

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
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Main Image URL*</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-2 h-32 object-contain"/>
              )}
            </div>
          </div>

          {/* Pricing & Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">Pricing & Details</h2>
            
            <div>
              <label className="block text-gray-700 mb-1">Price*</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="e.g. $28,500"
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
          {formData.specs.map((spec, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={spec.key}
                onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                placeholder="Spec name"
                className="flex-1 p-2 border rounded"
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
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
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Feature description"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="ml-2 text-red-600 px-2"
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
          {formData.images.map((image, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-1">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="Image URL"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="ml-2 text-red-600 px-2"
                >
                  ×
                </button>
              </div>
              {image && (
                <img src={image} alt={`Preview ${index}`} className="h-32 object-contain"/>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImage}
            className="text-blue-600 text-sm mt-2"
          >
            + Add Image
          </button>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;