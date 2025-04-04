import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiBox, 
  FiShoppingCart, 
  FiUsers, 
  FiSettings,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { useState } from 'react';

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FiHome className="mr-3" />
    },
    {
        name:"Banner",
        path:"/admin/banner",
        icon:<FiUsers className='mr-3'/>

    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <FiBox className="mr-3" />,
      submenu: [
        { name: "All Products", path: "/admin/products" },
        { name: "Add New", path: "/admin/products/new" },
        { name: "Categories", path: "/admin/products/categories" }
      ]
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FiShoppingCart className="mr-3" />,
      submenu: [
        { name: "All Orders", path: "/admin/orders" },
        { name: "Processing", path: "/admin/orders/processing" },
        { name: "Completed", path: "/admin/orders/completed" }
      ]
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: <FiUsers className="mr-3" />
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FiSettings className="mr-3" />
    }
  ];

  return (
    <div className="w-64 bg-blue-800 text-white transform md:translate-x-0 transition-transform duration-300 fixed inset-y-0 left-0 z-50">
      <div className="p-4 border-b border-blue-700">
        <h1 className="text-2xl font-bold">Flow Air</h1>
        <p className="text-blue-200 text-sm">Admin Panel</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <div key={item.name}>
            <div 
              className={`flex items-center justify-between px-6 py-3 hover:bg-blue-700 cursor-pointer ${openSubmenu === item.name ? 'bg-blue-700' : ''}`}
              onClick={() => item.submenu && toggleSubmenu(item.name)}
            >
              <div className="flex items-center">
                {item.icon}
                {!item.submenu ? (
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => isActive ? 'font-semibold' : ''}
                  >
                    {item.name}
                  </NavLink>
                ) : (
                  <span>{item.name}</span>
                )}
              </div>
              {item.submenu && (
                openSubmenu === item.name ? <FiChevronUp /> : <FiChevronDown />
              )}
            </div>
            
            {item.submenu && openSubmenu === item.name && (
              <div className="bg-blue-900 pl-14">
                {item.submenu.map((subItem) => (
                  <NavLink
                    key={subItem.name}
                    to={subItem.path}
                    className={({ isActive }) => 
                      `block px-4 py-2 text-sm hover:bg-blue-800 ${isActive ? 'bg-blue-800 font-medium' : ''}`
                    }
                  >
                    {subItem.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;