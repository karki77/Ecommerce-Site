import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter, createRoutesFromElements,Route} from 'react-router-dom'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import CartPage from './pages/CartPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import {Provider} from 'react-redux';
import {store} from './store.js';
import ShippingPage from './pages/ShippingPage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import PlaceOrderPage from './pages/PlaceOrderPage.jsx'
import OrderPage from './pages/OrderPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import OrderListPage from './pages/admin/OrderListPage.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import ProductListPage from './pages/admin/ProductListPage.jsx'
import ProductEditPage from './pages/admin/ProductEditPage.jsx'


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//     children: [
//       {
//         path: "",
//         element: <HomePage/>,
//       },
//       {
//         path: "product",
//         element:<Productpage/>,
//       },
//     ]
//   }

// ]);


const router = createBrowserRouter
(createRoutesFromElements (
  <Route path = "/" element = {<App/>}>
    <Route path ="" element = {<HomePage/>}/>
    <Route path = "product/:id" element={<ProductPage/>}/>
    <Route path = "cart" element ={<CartPage/>}/>
    <Route path = "signin" element ={<LoginPage/>}/>
    
   {/* <Route path='' element = {<PrivateRoute/>}>
     <Route path="shipping" element = {<ShippingPage/>}/>
     <Route path = "placeorder" element = {<PlaceOrderPage/>}/>
     <Route path = "order/:id" element = {<OrderPage/>}/>
     <Route path = "profile" element = {<ProfilePage/>}/>
  </Route>
  <Route path = '' element={<AdminRoute />}>
    <Route path = "admin/orders" element = {<OrderListPage/>}/>
  </Route>
 </Route>
  */}

<Route path="" element={<PrivateRoute />}>
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="order/:id" element={<OrderPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="admin/orders" element={<OrderListPage />} />
        <Route path= "admin/products" element={<ProductListPage/>}/>
        <Route path = "admin/product/:id/edit" element = {<ProductEditPage/>}/>
      </Route>
    </Route>

  ) 
);

{/* // const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="" element={<HomePage />} />
//       <Route path="product/:id" element={<ProductPage />} />
//       <Route path="cart" element={<CartPage />} />
//       <Route path="signin" element={<LoginPage />} />

//       <Route path="" element={<PrivateRoute />}>
//         <Route path="shipping" element={<ShippingPage />} />
//       </Route>
//     </Route>
//   )
// ); */}



ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
      <RouterProvider router={router}/>
  </Provider>
);
