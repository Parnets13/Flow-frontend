import { 
    FiDollarSign, 
    FiShoppingBag, 
    FiUsers, 
    FiActivity,
    FiTrendingUp,
    FiPackage
  } from 'react-icons/fi';
  
  const Dashboard = () => {
    const stats = [
      { title: "Total Revenue", value: "$24,780", icon: <FiDollarSign />, color: "bg-blue-100 text-blue-600" },
      { title: "Total Orders", value: "1,245", icon: <FiShoppingBag />, color: "bg-green-100 text-green-600" },
      { title: "Total Customers", value: "856", icon: <FiUsers />, color: "bg-purple-100 text-purple-600" },
      { title: "Active Products", value: "78", icon: <FiPackage />, color: "bg-yellow-100 text-yellow-600" }
    ];
  
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Sales Overview</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View Report</button>
            </div>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-00{item}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Customer {item}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${item}2{item}0.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;