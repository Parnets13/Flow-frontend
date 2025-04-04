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
        name:"Industrial",
        path:"/admin/Industrial",
        icon:<FiUsers className='mr-3'/>,
        submenu: [
            { name: "Industrial", path: "/admin/Industrial" },
            { name: "Industry", path: "/admin/Industry" },
            { name: "Specifications", path: "/admin/Specifications" }
          ]

    },
    {
        name:"Testimonial",
        path:"/admin/Testimonials",
        icon:<FiUsers className='mr-3'/>

    },
    {
        name:"About Us",
        path:"/admin/Our Story",
        icon:<FiUsers className='mr-3'/>,
        submenu: [
            { name: "Our Story", path: "/admin/Our Story" },
            { name: "Our Core ", path: "/admin/our core " },
            { name: "Our Facility", path: "/admin/our facility" },
            { name: "Our Team", path: "/admin/our team" }
          ]

    },
    
    {
      name: "Products",
      path: "/admin/products",
      icon: <FiBox className="mr-3" />,
      submenu: [
        { name: "All Products", path: "/admin/products" },
        { name: "Add New", path: "/admin/AddNewProduct" },
        { name: "Categories", path: "/admin/Productscategories" }
      ]
    },
    {
      name: "Services",
      path: "/admin/orders",
      icon: <FiShoppingCart className="mr-3" />,
      submenu: [
        { name: "All Orders", path: "/admin/orders" },
        { name: "Processing", path: "/admin/orders/processing" },
      ]
    },
  ];

  return (
    <div className="w-64 bg-[#4882c4] text-white transform md:translate-x-0 transition-transform duration-300 fixed inset-y-0 left-0 z-50">
      <div className="p-4 border-b border-[#4882c4]">
        <h1 className="text-2xl font-bold">Flow Air</h1>
        <p className="text-blue-200 text-sm">Admin Panel</p>
      </div>
      
      <nav className="mt-6">
        
        {menuItems.map((item) => (
          <div key={item.name}>
            <div 
              className={`flex items-center justify-between px-6 py-3 hover:bg-[#3face2] cursor-pointer ${openSubmenu === item.name ? 'bg-[#4882c4]' : ''}`}
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
              <div className="bg-[#4882c4] pl-14">
                {item.submenu.map((subItem) => (
                  <NavLink
                    key={subItem.name}
                    to={subItem.path}
                    className={({ isActive }) => 
                      `block px-4 py-2 text-sm hover:bg-[#3face2] ${isActive ? 'bg-[#4882c4] font-medium' : ''}`
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