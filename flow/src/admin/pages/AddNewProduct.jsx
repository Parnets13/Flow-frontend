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
    image: null,
    price: "",
    fullDescription: "",
    specs: [{ key: "", value: "" }],
    features: [""],
    images: []
  });

  const [alerts, setAlerts] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

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
        image: file
      }));
      
      // Create preview
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
      const newImages = [...formData.images, ...files];
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
      
      // Create previews
      const readers = files.map(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
        return reader;
      });
    }
  };

  const removeAdditionalImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
    
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real application, you would upload the images to a server here
    // and then submit the form data with the image URLs you get back
    
    // For demonstration, we'll just log the form data
    console.log("Form data to submit:", {
      ...formData,
      image: formData.image ? formData.image.name : null,
      images: formData.images.map(img => img.name)
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
              <label className="block text-gray-700 mb-1">Main Image*</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="w-full p-2 border rounded"
                required
              />
              {previewImage && (
                <div className="mt-2">
                  <img src={previewImage} alt="Preview" className="h-32 object-contain"/>
                  <p className="text-sm text-gray-500 mt-1">{formData.image?.name}</p>
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
                <p className="text-xs truncate mt-1">{formData.images[index]?.name}</p>
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