import { FiBell, FiUser, FiLogOut, FiMenu } from 'react-icons/fi';
import { useState } from 'react';

const Header = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-600"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          <FiMenu className="w-6 h-6" />
        </button>

        <div className="flex-1 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-blue-600">
              <FiBell className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <button className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="text-blue-600" />
                </div>
                <span className="hidden md:inline text-sm font-medium">Admin</span>
              </button>
            </div>
            
            <button className="p-2 text-gray-500 hover:text-red-600">
              <FiLogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;