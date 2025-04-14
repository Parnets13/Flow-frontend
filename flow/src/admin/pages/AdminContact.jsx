import { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://flow-backend-of96.onrender.com/api/contacts', {
          params: {
            status: statusFilter === 'all' ? undefined : statusFilter
          }
        });
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContacts();
  }, [statusFilter]);

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`https://flow-backend-of96.onrender.com/api/contacts/${id}/status`, {
        status: newStatus
      });
      
      setContacts(contacts.map(contact => 
        contact._id === id ? response.data : contact
      ));
      
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact(response.data);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`https://flow-backend-of96.onrender.com/api/contacts/${id}`);
        setContacts(contacts.filter(contact => contact._id !== id));
      } catch (err) {
        console.error('Error deleting contact:', err);
      }
    }
  };

  const openContactDetails = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="p-6">Loading contacts...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Contacts Table */}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Full Name</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Phone Number</th>
              <th scope="col" className="py-3 px-6">Subject</th>
              <th scope="col" className="py-3 px-6">Status</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <tr key={contact._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{contact.name}</td>
                  <td className="py-4 px-6">{contact.email}</td>
                  <td className="py-4 px-6">{contact.phone}</td>
                  <td className="py-4 px-6 max-w-xs truncate">{contact.subject}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 font-semibold rounded-md text-xs ${getStatusBadgeColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openContactDetails(contact)}
                        className="p-1 text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        <FaEye size={14} />
                      </button>
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5"
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="p-1 text-white bg-red-600 rounded-lg hover:bg-red-700"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td colSpan="6" className="text-center py-4">
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Contact Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="border-b px-6 py-3 flex justify-between items-center">
              <h3 className="text-lg font-medium">Contact Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              {selectedContact && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Full Name</h3>
                    <p>{selectedContact.name}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>{selectedContact.email}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone Number</h3>
                    <p>{selectedContact.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Subject</h3>
                    <p>{selectedContact.subject}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Message</h3>
                    <p className="whitespace-pre-line">{selectedContact.message}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Date</h3>
                    <p>{new Date(selectedContact.date).toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Status</h3>
                    <select
                      value={selectedContact.status}
                      onChange={(e) => {
                        handleStatusChange(selectedContact._id, e.target.value);
                        setSelectedContact({
                          ...selectedContact,
                          status: e.target.value
                        });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t px-6 py-3 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;