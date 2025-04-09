import React, { useState, useEffect } from "react";
import axios from "axios";

const Alert = ({ message, type, onClose }) => {
  const alertClasses = {
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
    info: "bg-blue-100 text-blue-800 border-blue-200"
  };
  return (
    <div className={`p-3 mb-4 rounded flex justify-between items-center shadow border ${alertClasses[type] || alertClasses.info}`}>
      <span>{message}</span>
      <button 
        onClick={onClose} 
        className="bg-transparent border-none cursor-pointer text-lg font-bold"
      >
        ×
      </button>
    </div>
  );
};

const Services = () => {
  const API_BASE_URL = "http://localhost:5001/api/service";
  
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);
  
  // Form states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  
  // Benefits states - updated to match features functionality
  const [benefitInput, setBenefitInput] = useState("");
  const [benefits, setBenefits] = useState([]);
  
  // Alert state
  const [alerts, setAlerts] = useState([]);
  
  const showAlert = (message, type = 'success') => {
    const newAlert = { id: Date.now(), message, type };
    setAlerts([...alerts, newAlert]);
    
    setTimeout(() => {
      setAlerts(alerts.filter(alert => alert.id !== newAlert.id));
    }, 3000);
  };
  
  // Fetch all services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      showAlert("Failed to fetch services", "error");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchServices();
  }, []);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setImageFile(file);
    const fileUrl = URL.createObjectURL(file);
    setImagePreview(fileUrl);
    e.target.value = null;
  };
  
  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };
  
  // Add benefit function - similar to addFeature in OurFacility
  const addBenefit = () => {
    if (benefitInput.trim() && !benefits.includes(benefitInput.trim())) {
      setBenefits([...benefits, benefitInput.trim()]);
      setBenefitInput("");
    }
  };
  
  // Remove benefit function - similar to removeFeature in OurFacility
  const removeBenefit = (index) => {
    const newBenefits = [...benefits];
    newBenefits.splice(index, 1);
    setBenefits(newBenefits);
  };
  
  const handleSubmit = async () => {
    if (!imagePreview && !isEditMode) {
      showAlert("Please upload an image", "warning");
      return;
    }
    
    if (!title || !description || !details) {
      showAlert("Please fill all required fields", "warning");
      return;
    }
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('details', details);
    formData.append('benefits', JSON.stringify(benefits));
    if (imageFile) {
      formData.append('mainImage', imageFile);
    }
    
    try {
      if (isEditMode) {
        await axios.put(`${API_BASE_URL}/${editServiceId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showAlert("Service updated successfully!");
      } else {
        await axios.post(API_BASE_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showAlert("Service added successfully!");
      }
      
      setShowModal(false);
      resetForm();
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      showAlert("Failed to save service", "error");
    }
  };
  
  const deleteService = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      showAlert("Service deleted successfully!");
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      showAlert("Failed to delete service", "error");
    }
  };
  
  const resetForm = () => {
    setImageFile(null);
    setImagePreview("");
    setTitle("");
    setDescription("");
    setDetails("");
    setBenefitInput("");
    setBenefits([]);
    setIsEditMode(false);
    setEditServiceId(null);
  };
  
  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };
  
  const editForm = (service) => {
    setEditServiceId(service._id);
    setImagePreview(service.image);
    setTitle(service.title || "");
    setDescription(service.description || "");
    setDetails(service.details || "");
    setBenefits(service.benefits?.length > 0 ? [...service.benefits] : []);
    setIsEditMode(true);
    setShowModal(true);
  };
  
  return (
    <div className="mt-4">
      {alerts.length > 0 && (
        <div className="fixed top-5 right-5 z-50 w-72">
          {alerts.map(alert => (
            <Alert 
              key={alert.id} 
              message={alert.message} 
              type={alert.type} 
              onClose={() => setAlerts(alerts.filter(a => a.id !== alert.id))} 
            />
          ))}
        </div>
      )}
      
      <div className="rounded shadow bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="m-0 font-bold text-2xl">Services Management</h2>
          <button 
            onClick={openAddModal} 
            className="cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white"
          >
            + Add Service
          </button>
        </div>
        
        <div className="p-4">
          {loading ? (
            <div className="text-center py-8">Loading services...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Image</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Title</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Description</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Details</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Benefits</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length > 0 ? (
                    services.map((item) => (
                      <tr key={item._id}>
                        <td className="p-3 border-t border-gray-200 text-center">
                          <img 
                            src={`http://localhost:5001/uploads/${item.image}`}
                            alt="Service" 
                            className="w-24 h-20 object-cover border border-gray-200 rounded" 
                          />
                        </td>
                        <td className="p-3 border-t border-gray-200">
                          <div className="max-w-xs overflow-hidden text-sm font-medium">
                            {item.title || <span className="text-gray-400 italic">No title</span>}
                          </div>
                        </td>
                        <td className="p-3 border-t border-gray-200">
                          <div className="max-w-xs overflow-hidden text-sm">
                            {item.description || <span className="text-gray-400 italic">No description</span>}
                          </div>
                        </td>
                        <td className="p-3 border-t border-gray-200 text-sm">
                          {item.details || <span className="text-gray-400 italic">No details</span>}
                        </td>
                        <td className="p-3 border-t border-gray-200">
                          <ul className="list-disc pl-5 text-sm">
                            {item.benefits && item.benefits.length > 0 ? (
                              item.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))
                            ) : (
                              <span className="text-gray-400 italic">No benefits</span>
                            )}
                          </ul>
                        </td>
                        <td className="p-3 border-t border-gray-200 text-center">
                          <div className="flex justify-center gap-2">
                            <button 
                              onClick={() => editForm(item)} 
                              className="cursor-pointer py-1 px-2 rounded border border-yellow-400 text-yellow-500 hover:bg-yellow-50"
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => deleteService(item._id)} 
                              className="cursor-pointer py-1 px-2 rounded border border-red-500 text-red-500 hover:bg-red-50"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-8 text-center border-t border-gray-200">
                        No services found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white rounded w-4/5 max-w-4xl max-h-90 overflow-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h4 className="m-0 font-medium">{isEditMode ? "Edit Service" : "Add Service"}</h4>
              <button 
                onClick={() => setShowModal(false)} 
                className="bg-transparent border-none text-2xl cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <form>
                <div className="mb-6">
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Image{!isEditMode && '*'}</h5>
                    <div className="flex flex-wrap gap-4 mb-2">
                      {imagePreview && (
                        <div className="w-40 relative border border-gray-200 rounded overflow-hidden">
                          <img 
                            src={imagePreview} 
                            alt="Preview"
                            className="w-full h-24 object-cover"
                          />
                          <button 
                            type="button"
                            onClick={removeImage}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-none cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      )}
                      
                      {!imagePreview && (
                        <div 
                          className="w-40 h-24 border border-dashed border-gray-200 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                          onClick={() => document.getElementById('serviceImageInput').click()}
                        >
                          <span className="text-2xl mb-1">+</span>
                          <span>Add Image</span>
                          <input 
                            type="file" 
                            id="serviceImageInput" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            className="hidden" 
                          />
                        </div>
                      )}
                    </div>
                    {isEditMode && (
                      <p className="text-sm text-gray-500">
                        Leave empty to keep current image
                      </p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Title*</h5>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter service title"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Description*</h5>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter short description"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Details*</h5>
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows="3"
                      placeholder="Enter detailed description"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Benefits</h5>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={benefitInput}
                        onChange={(e) => setBenefitInput(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded"
                        placeholder="Enter a benefit"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                      />
                      <button
                        type="button"
                        onClick={addBenefit}
                        className="cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white"
                      >
                        Add
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded">
                          <span>{benefit}</span>
                          <button
                            type="button"
                            onClick={() => removeBenefit(index)}
                            className="ml-2 text-red-500"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button 
                onClick={() => setShowModal(false)} 
                className="cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-gray-500 text-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={(!imagePreview && !isEditMode) || !title || !description || !details}
                className={`cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white ${
                  (!imagePreview && !isEditMode) || !title || !description || !details ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;