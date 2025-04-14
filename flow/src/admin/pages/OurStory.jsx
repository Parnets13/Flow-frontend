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

const OurStory = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editStoryId, setEditStoryId] = useState(null);
  
  // Form states
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // Alert state
  const [alerts, setAlerts] = useState([]);
  
  const API_URL = "https://flow-backend-of96.onrender.com/api/story";
  
  useEffect(() => {
    fetchStories();
  }, []);
  
  const fetchStories = async () => {
    try {
      const response = await axios.get(API_URL);
      setStories(response.data);
      setLoading(false);
    } catch (error) {
      showAlert("Failed to fetch stories", "error");
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
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async () => {
    if (!title || !content) {
      showAlert("Title and content are required", "warning");
      return;
    }
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${editStoryId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showAlert("Story updated successfully!");
      } else {
        await axios.post(API_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showAlert("Story added successfully!");
      }
      
      fetchStories();
      setShowModal(false);
      resetForm();
    } catch (error) {
      showAlert(error.response?.data?.error || "Something went wrong", "error");
    }
  };
  
  const deleteStory = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      showAlert("Story deleted successfully!");
      fetchStories();
    } catch (error) {
      showAlert("Failed to delete story", "error");
    }
  };
  
  const resetForm = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setTitle("");
    setContent("");
    setIsEditMode(false);
    setEditStoryId(null);
  };
  
  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };
  
  const editForm = (item) => {
    setEditStoryId(item._id);
    setImagePreview(item.image);
    setTitle(item.title || "");
    setContent(item.content || "");
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
          <h2 className="m-0 font-bold text-2xl">Our Story Management</h2>
          <button 
            onClick={openAddModal} 
            className="cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white"
          >
            + Add Story Section
          </button>
        </div>
        
        <div className="p-4">
          {loading ? (
            <div className="text-center py-8">Loading stories...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Image</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Title</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Content</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stories.length > 0 ? (
                    stories.map((item) => (
                      <tr key={item._id}>
                        <td className="p-3 border-t border-gray-200 text-center">
                          <img 
                            src={`https://flow-backend-of96.onrender.com/uploads/${item.image}`} 
                            alt="Story" 
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
                            {item.content || <span className="text-gray-400 italic">No content</span>}
                          </div>
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
                              onClick={() => deleteStory(item._id)} 
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
                      <td colSpan="4" className="p-8 text-center border-t border-gray-200">
                        No story sections found
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
              <h4 className="m-0 font-medium">{isEditMode ? "Edit Story Section" : "Add Story Section"}</h4>
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
                    <h5 className="text-lg font-medium mb-2">Image</h5>
                    <div className="flex flex-wrap gap-4 mb-2">
                      {imagePreview && (
                        <div className="w-40 relative border border-gray-200 rounded overflow-hidden">
                          <img 
                            src={typeof imagePreview === 'string' && !imagePreview.startsWith('http') 
                              ? `https://flow-backend-of96.onrender.com/uploads/${imagePreview}` 
                              : imagePreview} 
                            alt="Preview"
                            className="w-full h-24 object-cover"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              setSelectedFile(null);
                              setImagePreview(null);
                            }}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-none cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      )}
                      
                      <div 
                        className="w-40 h-24 border border-dashed border-gray-200 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                        onClick={() => document.getElementById('storyImageInput').click()}
                      >
                        <span className="text-2xl mb-1">+</span>
                        <span>Add Image</span>
                        <input 
                          type="file" 
                          id="storyImageInput" 
                          accept="image/*" 
                          onChange={handleFileChange} 
                          className="hidden" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Title</h5>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter story title"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Content</h5>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows="5"
                      placeholder="Enter story content"
                    ></textarea>
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
                className="cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white"
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

export default OurStory;