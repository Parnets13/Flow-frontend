import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-[#2c4e7a] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="bg-[#4682c4] text-white p-2 rounded mr-3">FLOW</span>
              Air Compressors
            </div>
            <p className="text-blue-100 mb-6">
              Premium air compressor solutions for industrial applications. Delivering quality and reliability since 2005.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#3a6da3] flex items-center justify-center text-white hover:bg-[#4682c4] transition-colors">
                <FaFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#3a6da3] flex items-center justify-center text-white hover:bg-[#4682c4] transition-colors">
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#3a6da3] flex items-center justify-center text-white hover:bg-[#4682c4] transition-colors">
                <FaLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#3a6da3] flex items-center justify-center text-white hover:bg-[#4682c4] transition-colors">
                <FaYoutube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#6ba1d8] mb-6 pb-2 border-b border-[#3a6da3]">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-blue-100 hover:text-white transition-colors hover:underline flex items-center">
                  <span className="w-2 h-2 bg-[#4682c4] rounded-full mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-blue-100 hover:text-white transition-colors hover:underline flex items-center">
                  <span className="w-2 h-2 bg-[#4682c4] rounded-full mr-2"></span>
                  About
                </a>
              </li>
              <li>
                <a href="/products" className="text-blue-100 hover:text-white transition-colors hover:underline flex items-center">
                  <span className="w-2 h-2 bg-[#4682c4] rounded-full mr-2"></span>
                  Products
                </a>
              </li>
              <li>
                <a href="/services" className="text-blue-100 hover:text-white transition-colors hover:underline flex items-center">
                  <span className="w-2 h-2 bg-[#4682c4] rounded-full mr-2"></span>
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-blue-100 hover:text-white transition-colors hover:underline flex items-center">
                  <span className="w-2 h-2 bg-[#4682c4] rounded-full mr-2"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold text-[#6ba1d8] mb-6 pb-2 border-b border-[#3a6da3]">Products</h3>
            <ul className="space-y-4">
              <li>
                <a href="/products/screw-compressors" className="text-blue-100 hover:text-white transition-colors hover:underline flex items-center">
                  <span className="w-2 h-2 bg-[#4682c4] rounded-full mr-2"></span>
                  Screw Compressors
                </a>
              </li>
              <li>
                <a href="/products/2-stage-compressors" className="text-blue-100 hover:text-white transition-colors hover:underline flex items-center">
                  <span className="w-2 h-2 bg-[#4682c4] rounded-full mr-2"></span>
                  2-Stage Compressors
                </a>
              </li>
              <li>
                <a href="/products/vsd-models" className="text-blue-100 hover:text-white transition-colors hover:underline flex items-center">
                  <span className="w-2 h-2 bg-[#4682c4] rounded-full mr-2"></span>
                  VSD Models
                </a>
              </li>
              <li>
                <a href="/products/spare-parts" className="text-blue-100 hover:text-white transition-colors hover:underline flex items-center">
                  <span className="w-2 h-2 bg-[#4682c4] rounded-full mr-2"></span>
                  Spare Parts
                </a>
              </li>
              <li>
                <a href="/products/accessories" className="text-blue-100 hover:text-white transition-colors hover:underline flex items-center">
                  <span className="w-2 h-2 bg-[#4682c4] rounded-full mr-2"></span>
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#6ba1d8] mb-6 pb-2 border-b border-[#3a6da3]">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MdLocationOn className="text-[#6ba1d8] text-xl mt-1 mr-3 flex-shrink-0" />
                <span className="text-blue-100">
                  69-D/16, A.A. Road, 1st Floor,
                  <br />
                  Sarathas Complex, Near Old Bus Stand,
                  <br />
                  Salem-636 001, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center">
                <MdEmail className="text-[#6ba1d8] text-xl mr-3 flex-shrink-0" />
                <a href="mailto:flowaircompressor@gmail.com" className="text-blue-100 hover:text-white transition-colors">
                  flowaircompressor@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <MdPhone className="text-[#6ba1d8] text-xl mr-3 flex-shrink-0" />
                <a href="tel:04272262889" className="text-blue-100 hover:text-white transition-colors">
                  0427-2262889
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#3a6da3] pt-6 text-center text-blue-100">
          <p>© {new Date().getFullYear()} FLOW Air Compressors. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';
// import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white pt-16 pb-8">
//       <div className="container mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
//           {/* Company Info */}
//           <div>
//             <div className="text-2xl font-bold text-white mb-6 flex items-center">
//               <span className="bg-blue-600 text-white p-2 rounded mr-3">FLOW</span>
//               Air Compressors
//             </div>
//             <p className="text-gray-400 mb-6">
//               Premium air compressor solutions for industrial applications. Delivering quality and reliability since 2005.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors">
//                 <FaFacebook className="h-5 w-5" />
//                 <span className="sr-only">Facebook</span>
//               </a>
//               <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors">
//                 <FaTwitter className="h-5 w-5" />
//                 <span className="sr-only">Twitter</span>
//               </a>
//               <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors">
//                 <FaInstagram className="h-5 w-5" />
//                 <span className="sr-only">Instagram</span>
//               </a>
//               <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors">
//                 <FaLinkedin className="h-5 w-5" />
//                 <span className="sr-only">LinkedIn</span>
//               </a>
//               <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors">
//                 <FaYoutube className="h-5 w-5" />
//                 <span className="sr-only">YouTube</span>
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold text-blue-400 mb-6 pb-2 border-b border-gray-700">Quick Links</h3>
//             <ul className="space-y-4">
//               <li>
//                 <a href="/" className="text-gray-400 hover:text-white transition-colors hover:underline flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="/about" className="text-gray-400 hover:text-white transition-colors hover:underline flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a href="/products" className="text-gray-400 hover:text-white transition-colors hover:underline flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   Products
//                 </a>
//               </li>
//               <li>
//                 <a href="/services" className="text-gray-400 hover:text-white transition-colors hover:underline flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   Services
//                 </a>
//               </li>
//               <li>
//                 <a href="/contact" className="text-gray-400 hover:text-white transition-colors hover:underline flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Products */}
//           <div>
//             <h3 className="text-lg font-semibold text-blue-400 mb-6 pb-2 border-b border-gray-700">Products</h3>
//             <ul className="space-y-4">
//               <li>
//                 <a href="/products/screw-compressors" className="text-gray-400 hover:text-white transition-colors hover:underline flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   Screw Compressors
//                 </a>
//               </li>
//               <li>
//                 <a href="/products/2-stage-compressors" className="text-gray-400 hover:text-white transition-colors hover:underline flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   2-Stage Compressors
//                 </a>
//               </li>
//               <li>
//                 <a href="/products/vsd-models" className="text-gray-400 hover:text-white transition-colors hover:underline flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   VSD Models
//                 </a>
//               </li>
//               <li>
//                 <a href="/products/spare-parts" className="text-gray-400 hover:text-white transition-colors hover:underline flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   Spare Parts
//                 </a>
//               </li>
//               <li>
//                 <a href="/products/accessories" className="text-gray-400 hover:text-white transition-colors hover:underline flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   Accessories
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold text-blue-400 mb-6 pb-2 border-b border-gray-700">Contact</h3>
//             <ul className="space-y-4">
//               <li className="flex items-start">
//                 <MdLocationOn className="text-blue-400 text-xl mt-1 mr-3 flex-shrink-0" />
//                 <span className="text-gray-400">
//                   69-D/16, A.A. Road, 1st Floor,
//                   <br />
//                   Sarathas Complex, Near Old Bus Stand,
//                   <br />
//                   Salem-636 001, Tamil Nadu, India
//                 </span>
//               </li>
//               <li className="flex items-center">
//                 <MdEmail className="text-blue-400 text-xl mr-3 flex-shrink-0" />
//                 <a href="mailto:flowaircompressor@gmail.com" className="text-gray-400 hover:text-white transition-colors">
//                   flowaircompressor@gmail.com
//                 </a>
//               </li>
//               <li className="flex items-center">
//                 <MdPhone className="text-black text-xl mr-3 flex-shrink-0" />
//                 <a href="tel:04272262889" className="text-gray-400 hover:text-white transition-colors">
//                   0427-2262889
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;