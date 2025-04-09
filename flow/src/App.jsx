import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import ProductCategory from "./components/ProductCategory";
import ProductDetail from "./components/ProductDetail";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ServiceDetail from "./components/ServiceDetail";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Customers from "./admin/pages/Customers";
import Orders from "./admin/pages/Orders";
import ProductsAdmin from "./admin/pages/Products";
import Settings from "./admin/pages/Settings";
import Banner from "./admin/pages/Banner";
import Industrial  from "./admin/pages/Industrial"
import Industry from "./admin/pages/Industry"
import Specifications from "./admin/pages/Specifications"
import Testimonials from "./admin/pages/Testimonials"
import OurStory from "./admin/pages/OurStory";
import Ourcore from "./admin/pages/ourcore";
import Ourfacility from "./admin/pages/ourfacility";
import Ourteam from "./admin/pages/ourteam";
import Productscategories from "./admin/pages/Productscategories"
import AddNewProduct from "./admin/pages/AddNewProduct"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:category" element={<ProductCategory />} />
                  <Route path="/products/:category/:productId" element={<ProductDetail />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:serviceId" element={<ServiceDetail />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="banner"element={<Banner/>}/>
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="settings" element={<Settings />} />
            <Route path="industrial" element={<Industrial/>}/>
            <Route path="industry" element={<Industry/>}/>
            <Route path="specifications" element={<Specifications/>}/>
            <Route path="testimonials" element={<Testimonials/>}/>
            <Route path="our Story" element={<OurStory/>}/>
            <Route path="our core" element={<Ourcore/>}/>
            <Route path="our facility" element={<Ourfacility/>}/>
            <Route path="our team" element={<Ourteam/>}/>
            <Route path="addNewProduct" element={<AddNewProduct/>}/>
            {/* <Route path="categorycontext" element={<CategoryContext/>}/> */}
            
            <Route path="productscategories" element={<Productscategories/>}/>
            
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;