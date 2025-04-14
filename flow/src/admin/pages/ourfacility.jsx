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

const OurFacility = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFacilityId, setEditFacilityId] = useState(null);
  
  // Form states
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState([]);
  
  // Alert state
  const [alerts, setAlerts] = useState([]);
  
  const API_URL = "https://flow-backend-of96.onrender.com/api/facilities";
  
  // Fetch all facilities
  const fetchFacilities = async () => {
    try {
      const response = await axios.get(API_URL);
      setFacilities(response.data);
      setLoading(false);
    } catch (error) {
      showAlert("Failed to fetch facilities", "error");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFacilities();
  }, []);
  
  const showAlert = (message, type = 'success') => {
    const newAlert = { id: Date.now(), message, type };
    setAlerts([...alerts, newAlert]);
    
    setTimeout(() => {
      setAlerts(alerts.filter(alert => alert.id !== newAlert.id));
    }, 3000);
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };
  
  const removeFeature = (index) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };
  
  const handleSubmit = async () => {
    if (!selectedImage && !imagePreview) {
      showAlert("Please upload an image", "warning");
      return;
    }
    
    if (!title) {
      showAlert("Please enter a title", "warning");
      return;
    }
    
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
      formData.append('title', title);
      formData.append('description', description);
      formData.append('features', JSON.stringify(features));
      
      if (isEditMode) {
        // Update existing facility
        await axios.put(`${API_URL}/${editFacilityId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showAlert("Facility updated successfully!");
      } else {
        // Create new facility
        await axios.post(API_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showAlert("Facility added successfully!");
      }
      
      fetchFacilities(); // Refresh the list
      setShowModal(false);
      resetForm();
    } catch (error) {
      showAlert(error.response?.data?.error || "Something went wrong", "error");
    }
  };
  
  const deleteFacility = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      showAlert("Facility deleted successfully!");
      fetchFacilities(); // Refresh the list
    } catch (error) {
      showAlert(error.response?.data?.error || "Failed to delete facility", "error");
    }
  };
  
  const resetForm = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setTitle("");
    setDescription("");
    setFeatures([]);
    setFeatureInput("");
    setIsEditMode(false);
    setEditFacilityId(null);
  };
  
  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };
  
  const editForm = (facility) => {
    setEditFacilityId(facility._id);
    setImagePreview(facility.image);
    setSelectedImage(null);
    setTitle(facility.title || "");
    setDescription(facility.description || "");
    setFeatures(facility.features || []);
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
          <h2 className="m-0 font-bold text-2xl">Our Facilities Management</h2>
          <button 
            onClick={openAddModal} 
            className="cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white"
          >
            + Add Facility
          </button>
        </div>
        
        <div className="p-4">
          {loading ? (
            <div className="text-center py-8">Loading facilities...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Image</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Title</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Description</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Features</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {facilities.length > 0 ? (
                    facilities.map((item) => (
                      <tr key={item._id}>
                        <td className="p-3 border-t border-gray-200 text-center">
                          <img 
                            src={`https://flow-backend-of96.onrender.com/uploads/${item.image}`} 
                            alt="Facility" 
                            className="w-24 h-20 object-cover border border-gray-200 rounded" 
                          />
                        </td>
                        <td className="p-3 border-t border-gray-200">
                          <div className="font-medium">
                            {item.title || <span className="text-gray-400 italic">No title</span>}
                          </div>
                        </td>
                        <td className="p-3 border-t border-gray-200">
                          <div className="max-w-xs text-sm">
                            {item.description || <span className="text-gray-400 italic">No description</span>}
                          </div>
                        </td>
                        <td className="p-3 border-t border-gray-200">
                          <ul className="list-disc pl-5 text-sm">
                            {item.features && item.features.length > 0 ? (
                              item.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))
                            ) : (
                              <span className="text-gray-400 italic">No features</span>
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
                              onClick={() => deleteFacility(item._id)} 
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
                      <td colSpan="5" className="p-8 text-center border-t border-gray-200">
                        No facilities found
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
          <div className="bg-white rounded w-4/5 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h4 className="m-0 font-medium">{isEditMode ? "Edit Facility" : "Add Facility"}</h4>
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
                    <h5 className="text-lg font-medium mb-2">Image*</h5>
                    <div className="flex flex-wrap gap-4 mb-2">
                      {imagePreview && (
                        <div className="w-40 relative border border-gray-200 rounded overflow-hidden">
                          <img 
                            src={imagePreview.startsWith('data:') ? imagePreview : `https://flow-backend-of96.onrender.com/uploads/${imagePreview}`} 
                            alt="Preview"
                            className="w-full h-24 object-cover"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              setSelectedImage(null);
                              setImagePreview(null);
                            }}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-none cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      )}
                      
                      {!imagePreview && (
                        <div 
                          className="w-40 h-24 border border-dashed border-gray-200 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                          onClick={() => document.getElementById('facilityImageInput').click()}
                        >
                          <span className="text-2xl mb-1">+</span>
                          <span>Add Image</span>
                          <input 
                            type="file" 
                            id="facilityImageInput" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            className="hidden" 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Title*</h5>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter facility title"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Description</h5>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows="3"
                      placeholder="Enter facility description"
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Features</h5>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded"
                        placeholder="Enter a feature"
                        onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white"
                      >
                        Add
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded">
                          <span>{feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
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
                disabled={!imagePreview || !title}
                className={`cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white ${!imagePreview || !title ? 'opacity-60 cursor-not-allowed' : ''}`}
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

export default OurFacility;