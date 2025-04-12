import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Verify token on initial load
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }
      try {
        await axios.get('/api/auth/verify', {
          headers: { 'x-auth-token': token }
        });
      } catch (err) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    };
    verifyAuth();
  }, [navigate]);
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('/api/auth/logout', null, {
        headers: { 'x-auth-token': token }
      });
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;