import React, { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { auth } from './firebase';
import { currentUser } from './functions/auth';
import { useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons'

//components
const Header = lazy(() => import('./pages/components/navigation/Header'));
const SideDrawer = lazy(() => import('./pages/components/drawer/SideDrawer'));
const Home = lazy(() => import('./pages/components/Home'));
const Register = lazy(() => import('./pages/auth/Register'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
const Login = lazy(() => import('./pages/auth/Login'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ProductsPage = lazy(() => import('./pages/components/ProductsPage'));
const GetSingleProduct = lazy(() => import('./pages/components/products/GetSIngleProduct'));
const Category = lazy(() => import('./pages/category/Category'));
const Sub = lazy(() => import('./pages/sub/Sub'));
const SearchResult = lazy(() => import('./pages/components/products/SearchResult'));
const Cart = lazy(() => import('./pages/components/cart/Cart'));



//user routers
const UserRoute = lazy(() => import('./pages/components/privateRoutes/UserRoute'));
const Password = lazy(() => import('./pages/user/Password'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const History = lazy(() => import('./pages/user/History'));
const Checkout = lazy(() => import('./pages/components/cart/Checkout'));

//admin routes
const AdminRoute = lazy(() => import('./pages/components/privateRoutes/AdminRoute'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'));
const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'));
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const ManageProducts = lazy(() => import('./pages/admin/product/ManageProducts'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const CreateCouponPage = lazy(() => import('./pages/admin/coupon/CreateCouponPage'));
const Slide = lazy(() => import('./pages/admin/slider/Slide'));
const HomePageUpdate = lazy(() => import('./pages/components/HomePageUpdate'));
const HomePageCreate = lazy(() => import('./pages/admin/homePage/HomePageCreate'));
const BackgroundPageCreate = lazy(() => import('./pages/admin/background/BackgroundPageCreate'));
const BackgroundPageUpdate = lazy(() => import('./pages/admin/background/BackgroundPageUpdate'));
const Slider = lazy(() => import('./pages/admin/slider/Slider'));


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
      <Suspense fallback={
        <div className="text-center mt-5"><LoadingOutlined />__ Производственная Компания "Crystal"__<LoadingOutlined /> </div>
      }>
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
          <AdminRoute path="/admin/background-create" exact component={BackgroundPageCreate} />
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
          <AdminRoute path="/admin/slide/:slug" exact component={Slide} />
          <AdminRoute path="/admin/home/:slug" exact component={HomePageUpdate} />
          <AdminRoute path="/admin/home-background/:slug" exact component={BackgroundPageUpdate} />
          <AdminRoute path="/admin/home-slider" exact component={Slider} />

        </Switch>
      </Suspense>
    </BrowserRouter>

  );
}

export default App;
