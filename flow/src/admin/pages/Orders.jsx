import React, { useState } from 'react';

const PageAdmin = () => {
  const [page, setPage] = useState({
    title: "High-Efficiency Air Compressors",
    description: "Our industrial-grade compressors deliver superior performance with 30% less energy consumption",
    details: "FLOW AIR compressors are designed for continuous operation in demanding industrial environments...",
    benefits: [
      {
        id: "benefit-1",
        title: "Energy Savings",
        description: "Reduce your power consumption by up to 30% compared to conventional compressors",
        icon: "lightning-bolt"
      },
      {
        id: "benefit-2",
        title: "Quiet Operation",
        description: "Advanced noise reduction technology for workplace comfort",
        icon: "volume-off"
      }
    ],
    features: [
      {
        id: "feature-1",
        title: "Smart Controls",
        description: "Automated pressure adjustment based on demand"
      },
      {
        id: "feature-2",
        title: "Durable Construction",
        description: "Industrial-grade materials for long service life"
      }
    ]
  });

  const [newBenefit, setNewBenefit] = useState({ title: "", description: "", icon: "" });
  const [newFeature, setNewFeature] = useState({ title: "", description: "" });
  const [editingBenefitId, setEditingBenefitId] = useState(null);
  const [editingFeatureId, setEditingFeatureId] = useState(null);

  const handlePageChange = (e) => {
    const { name, value } = e.target;
    setPage({ ...page, [name]: value });
  };

  const handleBenefitChange = (e) => {
    const { name, value } = e.target;
    setNewBenefit({ ...newBenefit, [name]: value });
  };

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setNewFeature({ ...newFeature, [name]: value });
  };

  const addBenefit = () => {
    if (newBenefit.title && newBenefit.description) {
      setPage({
        ...page,
        benefits: [
          ...page.benefits,
          {
            ...newBenefit,
            id: Date.now().toString()
          }
        ]
      });
      setNewBenefit({ title: "", description: "", icon: "" });
    }
  };

  const updateBenefit = () => {
    setPage({
      ...page,
      benefits: page.benefits.map(benefit =>
        benefit.id === editingBenefitId ? { ...newBenefit, id: editingBenefitId } : benefit
      )
    });
    setEditingBenefitId(null);
    setNewBenefit({ title: "", description: "", icon: "" });
  };

  const editBenefit = (benefit) => {
    setNewBenefit(benefit);
    setEditingBenefitId(benefit.id);
  };

  const deleteBenefit = (id) => {
    setPage({
      ...page,
      benefits: page.benefits.filter(benefit => benefit.id !== id)
    });
  };

  const addFeature = () => {
    if (newFeature.title && newFeature.description) {
      setPage({
        ...page,
        features: [
          ...page.features,
          {
            ...newFeature,
            id: Date.now().toString()
          }
        ]
      });
      setNewFeature({ title: "", description: "" });
    }
  };

  const updateFeature = () => {
    setPage({
      ...page,
      features: page.features.map(feature =>
        feature.id === editingFeatureId ? { ...newFeature, id: editingFeatureId } : feature
      )
    });
    setEditingFeatureId(null);
    setNewFeature({ title: "", description: "" });
  };

  const editFeature = (feature) => {
    setNewFeature(feature);
    setEditingFeatureId(feature.id);
  };

  const deleteFeature = (id) => {
    setPage({
      ...page,
      features: page.features.filter(feature => feature.id !== id)
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Page Content Editor</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Title & Description */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Page Title</label>
              <input
                type="text"
                name="title"
                value={page.title}
                onChange={handlePageChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Short Description</label>
              <textarea
                name="description"
                value={page.description}
                onChange={handlePageChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Detailed Content</label>
              <textarea
                name="details"
                value={page.details}
                onChange={handlePageChange}
                className="w-full p-2 border rounded"
                rows="5"
              />
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingBenefitId ? "Edit Benefit" : "Add Benefits"}
            </h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Benefit Title</label>
              <input
                type="text"
                name="title"
                value={newBenefit.title}
                onChange={handleBenefitChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={newBenefit.description}
                onChange={handleBenefitChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Icon (optional)</label>
              <input
                type="text"
                name="icon"
                value={newBenefit.icon}
                onChange={handleBenefitChange}
                className="w-full p-2 border rounded"
                placeholder="Icon class or name"
              />
            </div>
            
            <div className="flex gap-2">
              {editingBenefitId ? (
                <>
                  <button
                    onClick={updateBenefit}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Update Benefit
                  </button>
                  <button
                    onClick={() => {
                      setEditingBenefitId(null);
                      setNewBenefit({ title: "", description: "", icon: "" });
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={addBenefit}
                  disabled={!newBenefit.title || !newBenefit.description}
                  className={`bg-blue-600 text-white px-4 py-2 rounded ${
                    !newBenefit.title || !newBenefit.description ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Add Benefit
                </button>
              )}
            </div>
            
            <div className="mt-6 space-y-3">
              <h3 className="font-medium">Current Benefits</h3>
              {page.benefits.map(benefit => (
                <div key={benefit.id} className="border p-3 rounded flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                    {benefit.icon && (
                      <span className="text-xs text-gray-500">Icon: {benefit.icon}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editBenefit(benefit)}
                      className="text-yellow-600 hover:text-yellow-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBenefit(benefit.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Features Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingFeatureId ? "Edit Feature" : "Add Features"}
            </h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Feature Title</label>
              <input
                type="text"
                name="title"
                value={newFeature.title}
                onChange={handleFeatureChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={newFeature.description}
                onChange={handleFeatureChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            
            <div className="flex gap-2">
              {editingFeatureId ? (
                <>
                  <button
                    onClick={updateFeature}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Update Feature
                  </button>
                  <button
                    onClick={() => {
                      setEditingFeatureId(null);
                      setNewFeature({ title: "", description: "" });
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={addFeature}
                  disabled={!newFeature.title || !newFeature.description}
                  className={`bg-blue-600 text-white px-4 py-2 rounded ${
                    !newFeature.title || !newFeature.description ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Add Feature
                </button>
              )}
            </div>
            
            <div className="mt-6 space-y-3">
              <h3 className="font-medium">Current Features</h3>
              {page.features.map(feature => (
                <div key={feature.id} className="border p-3 rounded flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editFeature(feature)}
                      className="text-yellow-600 hover:text-yellow-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFeature(feature.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Preview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Page Preview</h2>
          
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
              <p className="text-lg text-gray-600">{page.description}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
              <p className="text-gray-700 whitespace-pre-line">{page.details}</p>
            </div>
            
            {page.benefits.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {page.benefits.map(benefit => (
                    <div key={benefit.id} className="border p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {page.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <ul className="space-y-3">
                  {page.features.map(feature => (
                    <li key={feature.id} className="border-l-4 border-blue-500 pl-4 py-1">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAdmin;