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

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTestimonialId, setEditTestimonialId] = useState(null);
  
  // Form states
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [star, setStar] = useState("");
  
  // Alert state
  const [alerts, setAlerts] = useState([]);
  
  const API_URL = "http://localhost:5001/api/Testimonial";
  
  useEffect(() => {
    fetchTestimonials();
  }, []);
  
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(API_URL);
      setTestimonials(response.data);
      setLoading(false);
    } catch (error) {
      showAlert("Failed to fetch testimonials", "error");
      setLoading(false);
    }
  };
  
  const showAlert = (message, type = 'success') => {
    const newAlert = { id: Date.now(), message, type };
    setAlerts([...alerts, newAlert]);
    
    setTimeout(() => {
      setAlerts(alerts.filter(alert => alert.id !== newAlert.id));
    }, 3000);
  };
  
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newUploadedImages = [...uploadedImages];
    const newImagePreviews = [...imagePreview];
    
    Array.from(files).forEach(file => {
      const fileUrl = URL.createObjectURL(file);
      newUploadedImages.push(file);
      newImagePreviews.push(fileUrl);
    });
    
    setUploadedImages(newUploadedImages);
    setImagePreview(newImagePreviews);
    e.target.value = null;
  };
  
  const removeImage = (index) => {
    const newImages = [...uploadedImages];
    const newPreviews = [...imagePreview];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setUploadedImages(newImages);
    setImagePreview(newPreviews);
  };
  
  const handleSubmit = async () => {
    if (imagePreview.length === 0) {
      showAlert("Please upload an image", "warning");
      return;
    }
    
    if (!name || !feedback || !star) {
      showAlert("Please fill all required fields", "warning");
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('designation', designation);
      formData.append('feedback', feedback);
      formData.append('star', star);
      
      // Append all uploaded images
      uploadedImages.forEach((file, index) => {
        formData.append('image', file);
      });
      
      if (editTestimonialId) {
        // Update existing testimonial
        await axios.put(`${API_URL}/${editTestimonialId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showAlert("Testimonial updated successfully!");
      } else {
        // Create new testimonial
        await axios.post(API_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showAlert("Testimonial added successfully!");
      }
      
      // Refresh the list
      await fetchTestimonials();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      showAlert(error.response?.data?.message || "Operation failed", "error");
    }
  };
  
  const deleteTestimonial = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        showAlert("Testimonial deleted successfully!");
        await fetchTestimonials();
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        showAlert("Failed to delete testimonial", "error");
      }
    }
  };
  
  const resetForm = () => {
    setUploadedImages([]);
    setImagePreview([]);
    setName("");
    setDesignation("");
    setFeedback("");
    setStar("");
    setIsEditMode(false);
    setEditTestimonialId(null);
  };
  
  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };
  
  const editForm = (item) => {
    setEditTestimonialId(item._id);
    setImagePreview([item.image]);
    setUploadedImages([]);
    setName(item.name || "");
    setDesignation(item.designation || "");
    setFeedback(item.feedback || "");
    setStar(item.star || "");
    setIsEditMode(true);
    setShowModal(true);
  };
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
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
          <h2 className="m-0 font-bold text-2xl">Testimonials Management</h2>
          <button 
            onClick={openAddModal} 
            className="cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Loading..." : "+ Add Testimonial"}
          </button>
        </div>
        
        <div className="p-4">
          {loading ? (
            <div className="text-center py-8">Loading testimonials...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Image</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Name</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Designation</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Feedback</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Rating</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.length > 0 ? (
                    testimonials.map((item) => (
                      <tr key={item._id}>
                        <td className="p-3 border-t border-gray-200 text-center">
  <img 
    src={item.image.startsWith('http') ? item.image : `${API_URL.replace('/api/Testimonial', '')}/${item.image}`}
    alt="Person" 
    className="w-16 h-16 object-cover rounded-full border border-gray-200 mx-auto" 
    onError={(e) => {
      e.target.onerror = null; 
      e.target.src = 'https://via.placeholder.com/100';
    }}
  />
</td>
                        <td className="p-3 border-t border-gray-200 text-center">
                          <div className="font-medium">
                            {item.name || <span className="text-gray-400 italic">No name</span>}
                          </div>
                        </td>
                        <td className="p-3 border-t border-gray-200 text-center">
                          <div className="text-sm">
                            {item.designation || <span className="text-gray-400 italic">No designation</span>}
                          </div>
                        </td>
                        <td className="p-3 border-t border-gray-200">
                          <div className="max-w-xs text-sm">
                            {item.feedback || <span className="text-gray-400 italic">No feedback</span>}
                          </div>
                        </td>
                        <td className="p-3 border-t border-gray-200 text-center">
                          <div className="flex justify-center">
                            {renderStars(parseInt(item.star))}
                          </div>
                        </td>
                        <td className="p-3 border-t border-gray-200 text-center">
                          <div className="flex justify-center gap-2">
                            <button 
                              onClick={() => editForm(item)} 
                              className="cursor-pointer py-1 px-2 rounded border border-yellow-400 text-yellow-500 hover:bg-yellow-50"
                              disabled={loading}
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => deleteTestimonial(item._id)} 
                              className="cursor-pointer py-1 px-2 rounded border border-red-500 text-red-500 hover:bg-red-50"
                              disabled={loading}
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
                        No testimonials found
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
              <h4 className="m-0 font-medium">{isEditMode ? "Edit Testimonial" : "Add Testimonial"}</h4>
              <button 
                onClick={() => setShowModal(false)} 
                className="bg-transparent border-none text-2xl cursor-pointer"
                disabled={loading}
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <form>
                <div className="mb-6">
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Image</h5>
                    <div className="flex flex-wrap gap-4 mb-2">
                      {imagePreview.map((preview, index) => (
                        <div key={index} className="w-40 relative border border-gray-200 rounded overflow-hidden">
                          <img 
                            src={preview.startsWith('blob:') ? preview : `http://localhost:5001/${preview}`}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover"
                          />
                          <button 
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-none cursor-pointer"
                            disabled={loading}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      
                      <div 
                        className="w-40 h-24 border border-dashed border-gray-200 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                        onClick={() => !loading && document.getElementById('testimonialImageInput').click()}
                      >
                        <span className="text-2xl mb-1">+</span>
                        <span>Add Image</span>
                        <input 
                          type="file" 
                          id="testimonialImageInput" 
                          accept="image/*" 
                          onChange={handleFileChange} 
                          className="hidden" 
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="text-lg font-medium mb-2">Name*</h5>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter person's name"
                        required
                        disabled={loading}
                      />
                    </div>
                    
                    <div>
                      <h5 className="text-lg font-medium mb-2">Designation</h5>
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter person's designation"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Feedback*</h5>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows="3"
                      placeholder="Enter testimonial feedback"
                      required
                      disabled={loading}
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Rating*</h5>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => !loading && setStar(rating.toString())}
                          className={`text-2xl ${rating <= star ? "text-yellow-400" : "text-gray-300"}`}
                          disabled={loading}
                        >
                          ★
                        </button>
                      ))}
                      <span className="ml-2 text-gray-600">{star}/5</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button 
                onClick={() => setShowModal(false)} 
                className="cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-gray-500 text-white"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading || imagePreview.length === 0 || !name || !feedback || !star}
                className={`cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white ${(loading || imagePreview.length === 0 || !name || !feedback || !star) ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? "Processing..." : (isEditMode ? "Update" : "Save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;