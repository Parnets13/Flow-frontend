import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6 ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;