import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "Screw Compressors",
      description: "High-efficiency rotary screw compressors",
      image: "/abot.png"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const showAlert = (message, type = 'success') => {
    const newAlert = { id: Date.now(), message, type };
    setAlerts([...alerts, newAlert]);
    setTimeout(() => {
      setAlerts(alerts.filter(alert => alert.id !== newAlert.id));
    }, 3000);
  };

  const handleSubmit = (formData) => {
    if (currentCategory) {
      setCategories(categories.map(cat => 
        cat.id === currentCategory.id ? { ...cat, ...formData } : cat
      ));
      showAlert("Category updated successfully!");
    } else {
      const newCategory = { id: Date.now().toString(), ...formData };
      setCategories([...categories, newCategory]);
      showAlert("Category added successfully!");
    }
    setShowModal(false);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
    showAlert("Category deleted successfully!");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <button 
          onClick={() => {
            setCurrentCategory(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <div key={category.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img src={category.image} alt={category.name} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="font-bold text-lg">{category.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{category.description}</p>
              <div className="flex justify-between mt-4">
                <Link 
                  to={`/admin/products?category=${category.id}`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Products
                </Link>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      setCurrentCategory(category);
                      setShowModal(true);
                    }}
                    className="text-yellow-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteCategory(category.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {currentCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  name: e.target.name.value,
                  description: e.target.description.value,
                  image: e.target.image.value
                };
                handleSubmit(formData);
              }}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentCategory?.name || ''}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    defaultValue={currentCategory?.description || ''}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    defaultValue={currentCategory?.image || ''}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesAdmin;