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

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editMemberId, setEditMemberId] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [alerts, setAlerts] = useState([]);
  
  const API_URL = "https://flow-backend-of96.onrender.com/api/our-team";

  const showAlert = (message, type = 'success') => {
    const newAlert = { id: Date.now(), message, type };
    setAlerts([...alerts, newAlert]);
    
    setTimeout(() => {
      setAlerts(alerts.filter(alert => alert.id !== newAlert.id));
    }, 3000);
  };

  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setTeamMembers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching team members:", error);
      showAlert("Failed to fetch team members", "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!imagePreview && !isEditMode) {
      showAlert("Please upload an image", "warning");
      return;
    }
    
    if (!name || !position) {
      showAlert("Please fill all required fields", "warning");
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("position", position);
      formData.append("description", description);
      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }
      
      let response;
      if (isEditMode) {
        response = await axios.put(`${API_URL}/${editMemberId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showAlert("Team member updated successfully!");
      } else {
        response = await axios.post(API_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showAlert("Team member added successfully!");
      }
      
      setShowModal(false);
      resetForm();
      fetchTeamMembers();
    } catch (error) {
      console.error("Error saving team member:", error);
      showAlert(error.response?.data?.error || "Failed to save team member", "error");
    }
  };

  const deleteMember = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      showAlert("Team member deleted successfully!");
      fetchTeamMembers();
    } catch (error) {
      console.error("Error deleting team member:", error);
      showAlert(error.response?.data?.error || "Failed to delete team member", "error");
    }
  };

  const resetForm = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setName("");
    setPosition("");
    setDescription("");
    setIsEditMode(false);
    setEditMemberId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const editForm = (member) => {
    setEditMemberId(member._id);
    setImagePreview(member.image ? `/uploads/${member.image}` : null);
    setName(member.name || "");
    setPosition(member.position || "");
    setDescription(member.description || "");
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
          <h2 className="m-0 font-bold text-2xl">Our Team Management</h2>
          <button 
            onClick={openAddModal} 
            className="cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white"
          >
            + Add Team Member
          </button>
        </div>
        
        <div className="p-4">
          {isLoading ? (
            <div className="text-center py-8">Loading team members...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Image</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Name</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Position</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Description</th>
                    <th className="p-3 border-b-2 border-gray-200 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.length > 0 ? (
                    teamMembers.map((item) => (
                      <tr key={item._id}>
                        <td className="p-3 border-t border-gray-200 text-center">
                          {item.image ? (
                            <img 
                            src={`https://flow-backend-of96.onrender.com/uploads/${item.image}`}
                              alt="Team Member" 
                              className="w-16 h-16 object-cover rounded-full border border-gray-200 mx-auto"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-user.jpg';
                              }}
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                              <span className="text-gray-500">No Image</span>
                            </div>
                          )}
                        </td>
                        <td className="p-3 border-t border-gray-200 text-center">
                          <div className="font-medium">
                            {item.name || <span className="text-gray-400 italic">No name</span>}
                          </div>
                        </td>
                        <td className="p-3 border-t border-gray-200 text-center">
                          <div className="text-sm">
                            {item.position || <span className="text-gray-400 italic">No position</span>}
                          </div>
                        </td>
                        <td className="p-3 border-t border-gray-200">
                          <div className="max-w-xs text-sm">
                            {item.description || <span className="text-gray-400 italic">No description</span>}
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
                              onClick={() => deleteMember(item._id)} 
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
                        No team members found
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
              <h4 className="m-0 font-medium">{isEditMode ? "Edit Team Member" : "Add Team Member"}</h4>
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
                      
                      <div 
                        className="w-40 h-24 border border-dashed border-gray-200 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                        onClick={() => document.getElementById('teamImageInput').click()}
                      >
                        <span className="text-2xl mb-1">+</span>
                        <span>Add Image</span>
                        <input 
                          type="file" 
                          id="teamImageInput" 
                          accept="image/*" 
                          onChange={handleFileChange} 
                          className="hidden" 
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Only one image can be uploaded per team member</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="text-lg font-medium mb-2">Name*</h5>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter team member's name"
                        required
                      />
                    </div>
                    
                    <div>
                      <h5 className="text-lg font-medium mb-2">Position*</h5>
                      <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter team member's position"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Description</h5>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows="3"
                      placeholder="Enter team member description"
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
                disabled={(!imagePreview && !isEditMode) || !name || !position}
                className={`cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white ${(!imagePreview && !isEditMode) || !name || !position ? 'opacity-60 cursor-not-allowed' : ''}`}
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

export default OurTeam;