import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiBox, 
  FiShoppingCart, 
  FiUsers, 
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
  FiMenu
} from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Sidebar = ({ onLogout, isSidebarOpen, toggleSidebar }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FiHome className="min-w-[20px]" />
    },
    {
      name: "Banner",
      path: "/admin/banner",
      icon: <FiUsers className="min-w-[20px]" />
    },
    {
      name: "Industrial",
      path: "/admin/Industrial",
      icon: <FiUsers className="min-w-[20px]" />,
      submenu: [
        { name: "Industrial", path: "/admin/Industrial" },
      ]
    },
    {
      name: "Testimonial",
      path: "/admin/Testimonials",
      icon: <FiUsers className="min-w-[20px]" />
    },
    {
      name: "About Us",
      path: "/admin/Our Story",
      icon: <FiUsers className="min-w-[20px]" />,
      submenu: [
        { name: "Our Story", path: "/admin/Our Story" },
        { name: "Our Facility", path: "/admin/our facility" },
        { name: "Our Team", path: "/admin/our team" }
      ]
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <FiBox className="min-w-[20px]" />,
      submenu: [
        { name: "All Products", path: "/admin/products" },
        { name: "Categories", path: "/admin/Productscategories" }
      ]
    },
    {
      name: "Services",
      path: "/admin/orders",
      icon: <FiShoppingCart className="min-w-[20px]" />,
      submenu: [
        { name: "All Orders", path: "/admin/orders" },
      ]
    },
    {
      name: "Contacts",
      path: "/admin/AdminContact",
      icon: <FiUsers className="min-w-[20px]" />
    },
  ];

  return (
    <>
      {/* Hamburger Menu Button (shown when sidebar is closed) */}
      <button 
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 bg-[#4882c4] text-white p-2 rounded-md hover:bg-[#3face2] transition-colors ${isSidebarOpen ? 'hidden' : 'block'}`}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div 
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-[#4882c4] text-white fixed inset-y-0 left-0 z-40 flex flex-col shadow-lg transition-transform duration-300`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#3a6ea5] flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Flow Air</h1>
            <p className="text-blue-200 text-sm">Admin Panel</p>
          </div>
          <button 
            onClick={toggleSidebar}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FiMenu size={20} />
          </button>
        </div>
        
        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
          <nav>
            {menuItems.map((item) => (
              <div key={item.name} className="px-6 py-3 hover:bg-[#3face2] transition-colors">
                {/* Regular Menu Item (no submenu) */}
                {!item.submenu ? (
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        `flex-1 truncate ${isActive ? 'font-semibold' : ''}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </div>
                ) : (
                  /* Menu Item with Submenu */
                  <div>
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <div 
                        className="flex-1 flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSubmenu(item.name)}
                      >
                        <span>{item.name}</span>
                        {openSubmenu === item.name ? (
                          <FiChevronUp className="ml-2" />
                        ) : (
                          <FiChevronDown className="ml-2" />
                        )}
                      </div>
                    </div>
                    
                    {/* Submenu Items */}
                    {openSubmenu === item.name && (
                      <div className="mt-2 ml-8 bg-[#3a6ea5] rounded">
                        {item.submenu.map((subItem) => (
                          <NavLink
                            key={subItem.name}
                            to={subItem.path}
                            className={({ isActive }) => 
                              `block px-4 py-2 text-sm hover:bg-[#4882c4] transition-colors truncate ${isActive ? 'bg-[#3face2] font-medium' : ''}`
                            }
                          >
                            {subItem.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#3a6ea5]">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 text-gray-200 hover:text-white hover:bg-[#3face2] rounded transition-colors"
          >
            <FiLogOut className="text-lg min-w-[20px]" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;