import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactUsPage from './pages/ContactUsPage';
import PolicyPage from './pages/PolicyPage';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import ForgotPass from './pages/Auth/ForgotPass';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import AllProducts from './pages/Admin/AllProducts';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
import './App.css';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='cart/' element={<CartPage />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/search' element={<Search />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Orders />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/products' element={<AllProducts />} />
          <Route path='admin/orders' element={<AdminOrders />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPass />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactUsPage />} />
        <Route path='/policy' element={<PolicyPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
