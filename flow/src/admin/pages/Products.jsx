import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const ProductsAdmin = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  
  const [categories, setCategories] = useState([
    { id: "1", name: "Screw Compressors" }
  ]);
  
  const [products, setProducts] = useState([
    {
      id: "1",
      categoryId: "1",
      name: "EcoVSD+ 75HP",
      description: "Premium VSD compressor",
      image: "/abot.png",
      specs: {
        "Flow Rate": "75-300 CFM",
        "Pressure": "100-175 PSIG"
      }
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);

  useEffect(() => {
    if (currentProduct) {
      const specEntries = Object.entries(currentProduct.specs || {});
      setSpecs(specEntries.length > 0 
        ? specEntries.map(([key, value]) => ({ key, value }))
        : [{ key: "", value: "" }]
      );
    } else {
      setSpecs([{ key: "", value: "" }]);
    }
  }, [currentProduct]);

  const showAlert = (message, type = 'success') => {
    const newAlert = { id: Date.now(), message, type };
    setAlerts([...alerts, newAlert]);
    setTimeout(() => {
      setAlerts(alerts.filter(alert => alert.id !== newAlert.id));
    }, 3000);
  };

  const handleSubmit = (formData) => {
    // Convert specs array to object
    const specsObj = {};
    formData.specs.forEach(spec => {
      if (spec.key && spec.value) {
        specsObj[spec.key] = spec.value;
      }
    });

    const productData = {
      ...formData,
      specs: specsObj
    };

    if (currentProduct) {
      setProducts(products.map(prod => 
        prod.id === currentProduct.id ? productData : prod
      ));
      showAlert("Product updated successfully!");
    } else {
      const newProduct = { 
        id: Date.now().toString(),
        ...productData,
        categoryId: categoryId || formData.categoryId
      };
      setProducts([...products, newProduct]);
      showAlert("Product added successfully!");
    }
    setShowModal(false);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showAlert("Product deleted successfully!");
  };

  const addSpecField = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const removeSpecField = (index) => {
    const newSpecs = [...specs];
    newSpecs.splice(index, 1);
    setSpecs(newSpecs);
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const filteredProducts = categoryId 
    ? products.filter(p => p.categoryId === categoryId)
    : products;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          {categoryId && (
            <p className="text-gray-600">
              Category: {categories.find(c => c.id === categoryId)?.name || 'N/A'}
            </p>
          )}
        </div>
        <button 
          onClick={() => {
            setCurrentProduct(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Description</th>
              {!categoryId && <th className="py-3 px-4 text-left">Category</th>}
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => {
              const category = categories.find(c => c.id === product.categoryId);
              return (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded"/>
                  </td>
                  <td className="py-3 px-4 font-medium">{product.name}</td>
                  <td className="py-3 px-4 text-gray-600">{product.description}</td>
                  {!categoryId && (
                    <td className="py-3 px-4">
                      {category?.name || 'N/A'}
                    </td>
                  )}
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setCurrentProduct(product);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/admin/product-details?product=${product.id}`}
                        className="text-green-600 hover:underline"
                      >
                        Details
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {currentProduct ? 'Edit Product' : 'Add Product'}
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
                  image: e.target.image.value,
                  categoryId: e.target.categoryId?.value || categoryId,
                  specs: specs
                };
                handleSubmit(formData);
              }}>
                {!categoryId && (
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                      name="categoryId"
                      defaultValue={currentProduct?.categoryId || ''}
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
                )}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentProduct?.name || ''}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    defaultValue={currentProduct?.description || ''}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    defaultValue={currentProduct?.image || ''}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Specifications</label>
                  {specs.map((spec, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
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
                        className="px-2 text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSpecField}
                    className="text-blue-600 text-sm mt-1"
                  >
                    + Add Specification
                  </button>
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

export default ProductsAdmin;