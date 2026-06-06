import Home from './pages/Home';
// import './App.css';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Shop from './pages/Shop';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Category from './pages/Category';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './components/users/Dashboard';
import ThankYou from './pages/auth/ThankYou';
import Enquiry from './pages/enquiry/Enquiry';
import EnquirySuccess from './pages/enquiry/EnquirySuccess';

import ScrollToTop from './ScrollToTop';

function App() {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/thank-you' element={<ThankYou />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/enquiry/:productId" element={<Enquiry />} />
        <Route path="/enquiry-success" element={<EnquirySuccess />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:categoryId" element={<Product />} />
        <Route path='/product-details/:productId' element={<ProductDetails />} />
        <Route path="/category/:category_Id" element={<Category />} />
      </Routes>

    </>
  )
}

export default App
