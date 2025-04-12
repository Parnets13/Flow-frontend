import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
  const [auth, setAuth] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          setAuth(false);
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            'x-auth-token': token
          }
        };

        await axios.get('/api/auth/me', config);
        setAuth(true);
      } catch (err) {
        localStorage.removeItem('adminToken');
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return auth ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;