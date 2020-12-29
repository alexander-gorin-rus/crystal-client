import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//components
import Header from './pages/components/navigation/Header';
import SideDrawer from './pages/components/drawer/SideDrawer';
import History from './pages/user/History';
import Home from './pages/components/Home';
import AdminHomeUpade from './pages/components/AdminHomeUpade'
import HomePageUpdate from './pages/components/HomePageUpdate';
import HomePageCreate from './pages/admin/homePage/HomePageCreate';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ProductsPage from './pages/components/ProductsPage';
import GetSingleProduct from './pages/components/products/GetSIngleProduct';
import Category from './pages/category/Category';
import Sub from './pages/sub/Sub';
import SearchResult from './pages/components/products/SearchResult';
import Cart from './pages/components/cart/Cart';
import Checkout from './pages/components/cart/Checkout';


//user routers
import UserRoute from './pages/components/privateRoutes/UserRoute';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';

//admin routes
import AdminRoute from './pages/components/privateRoutes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import ManageProducts from './pages/admin/product/ManageProducts';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import CreateCouponPage from './pages/admin/coupon/CreateCouponPage';

import { auth } from './firebase';
import { currentUser } from './functions/auth';
import { useDispatch } from 'react-redux';


const App = () => {
  const dispatch = useDispatch();


  //check firebase authentication state
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: idTokenResult.token,
                _id: res.data._id
              }
            });
          })
          .catch(err => console.log(err));
      }
    });

    //cleanup
    return () => subscribe();
  }, [dispatch])
  return (
    <BrowserRouter>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route path="/login" exact component={Login} />
        <Route path="/category/:slug" exact component={Category} />
        <Route path="/sub/:slug" exact component={Sub} />
        <Route path="/products" exact component={ProductsPage} />
        <Route path="/product/:slug" exact component={GetSingleProduct} />
        <Route path="/result" exact component={SearchResult} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/forgot/password" exact component={ForgotPassword} />

        {/* USER ROUTES */}
        <UserRoute path="/user/history" exact component={History} />
        <UserRoute path="/user/password" exact component={Password} />
        <UserRoute path="/user/wishlist" exact component={Wishlist} />
        <UserRoute path="/checkout" exact component={Checkout} />

        {/* ADMIN ROUTES */}
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={CategoryCreate} />
        <AdminRoute path="/admin/category/:slug" exact component={CategoryUpdate} />
        <AdminRoute path="/admin/sub" exact component={SubCreate} />
        <AdminRoute path="/admin/sub/:slug" exact component={SubUpdate} />
        <AdminRoute path="/admin/product" exact component={ProductCreate} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/product/:slug" exact component={ProductUpdate} />
        <AdminRoute path="/admin/coupon" exact component={CreateCouponPage} />
        <AdminRoute path="/admin/home" exact component={HomePageCreate} />
        <AdminRoute path="/admin/home-manage" exact component={AdminHomeUpade} />
        <AdminRoute path="/admin/home/:slug" exact component={HomePageUpdate} />


      </Switch>
    </BrowserRouter>
  );
}

export default App;
