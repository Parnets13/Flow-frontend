import React, { useState } from "react";

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

const MainBanner = () => {
  const [banners, setBanners] = useState([
    {
      _id: "1",
      image: "banner1.jpg",
      title: "Banner 1 Title",
      description: "Description for banner 1"
    },
  ]);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editBannerId, setEditBannerId] = useState(null);
  
  // Form states
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // Alert state
  const [alerts, setAlerts] = useState([]);
  
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
  
  const handleSubmit = () => {
    if (imagePreview.length === 0) {
      showAlert("Please upload at least one image", "warning");
      return;
    }
    
    if (editBannerId) {
      setBanners(banners.map(banner => 
        banner._id === editBannerId ? {
          ...banner,
          image: imagePreview[0],
          title,
          description
        } : banner
      ));
      showAlert("Banner updated successfully!");
    } else {
      const newBanner = {
        _id: Date.now().toString(),
        image: imagePreview[0],
        title,
        description
      };
      setBanners([...banners, newBanner]);
      showAlert("Banner added successfully!");
    }
    
    setShowModal(false);
    resetForm();
  };
  
  const deleteBanner = (id) => {
    setBanners(banners.filter(banner => banner._id !== id));
    showAlert("Banner deleted successfully!");
  };
  
  const resetForm = () => {
    setUploadedImages([]);
    setImagePreview([]);
    setTitle("");
    setDescription("");
    setIsEditMode(false);
    setEditBannerId(null);
  };
  
  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };
  
  const editForm = (item) => {
    setEditBannerId(item._id);
    setImagePreview([item.image]);
    setUploadedImages([]);
    setTitle(item.title || "");
    setDescription(item.description || "");
    setIsEditMode(true);
    setShowModal(true);
  };
  
  return (
    <div className="mt-4 ">
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
          <h2 className="m-0 font-bold text-2xl">Banner Management</h2>
          <button 
            onClick={openAddModal} 
            className="cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white"
          >
            + Add Banner
          </button>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b-2 border-gray-200 text-center">Image</th>
                  <th className="p-3 border-b-2 border-gray-200 text-center">Title</th>
                  <th className="p-3 border-b-2 border-gray-200 text-center">Description</th>
                  <th className="p-3 border-b-2 border-gray-200 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.length > 0 ? (
                  banners.map((item) => (
                    <tr key={item._id}>
                      <td className="p-3 border-t border-gray-200 text-center">
                        <img 
                          src={item.image} 
                          alt="Banner" 
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
                      <td className="p-3 border-t border-gray-200 text-center">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => editForm(item)} 
                            className="cursor-pointer py-1 px-2 rounded border border-yellow-400 text-yellow-500 hover:bg-yellow-50"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => deleteBanner(item._id)} 
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
                      No banners found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white rounded w-4/5 max-w-4xl max-h-90 overflow-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h4 className="m-0 font-medium">{isEditMode ? "Edit Banner" : "Add Banner"}</h4>
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
                      {imagePreview.map((preview, index) => (
                        <div key={index} className="w-40 relative border border-gray-200 rounded overflow-hidden">
                          <img 
                            src={preview} 
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover"
                          />
                          <button 
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center border-none cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      
                      <div 
                        className="w-40 h-24 border border-dashed border-gray-200 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                        onClick={() => document.getElementById('bannerImageInput').click()}
                      >
                        <span className="text-2xl mb-1">+</span>
                        <span>Add Image</span>
                        <input 
                          type="file" 
                          id="bannerImageInput" 
                          accept="image/*" 
                          onChange={handleFileChange} 
                          multiple
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
                      placeholder="Enter banner title"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Description</h5>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows="3"
                      placeholder="Enter banner description"
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
                disabled={imagePreview.length === 0}
                className={`cursor-pointer py-2 px-3 rounded border-transparent inline-flex items-center gap-2 bg-blue-600 text-white ${imagePreview.length === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
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

export default MainBanner;