import { Route, Routes } from "react-router-dom";
import {
  ActivationPage,
  LoginPage,
  SignupPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopAllProducts,
  ShopCreateEventPage,
  ShopAllEventsPage,
  ShopAllCouponsPage,
  ShopPreviewPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ShopAllOrders,
  ShopOrderDetails,
  OrderDetailPage,
  TrackOrderPage,
  ShopOrderRefund,
  ShopSettingPage,
  ShopWithdrawMoneyPage,
  ShopInboxPage,
  UserInbox,
  AdminDashboardPage,
  AdminDashboardUsersPage,
  AdminDashboardShop,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw,
} from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";
import store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import { loadShop } from "./redux/actions/shop";
import ShopProtectedRoute from "./protectedRoutes/ShopProtectedRoute";
import { getAllProductsForUser } from "./redux/actions/product";
import { getAllEventsForUser } from "./redux/actions/event";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminProtectedRoute from "./protectedRoutes/AdminProtectedRoute";

axios.defaults.withCredentials = true;
const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function gettStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadShop());
    store.dispatch(getAllProductsForUser());
    store.dispatch(getAllEventsForUser());
    gettStripeApiKey();
  }, []);
  const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              {stripePromise && (
                <Elements stripe={stripePromise}>
                  <PaymentPage />
                </Elements>
              )}
            </ProtectedRoute>
          }
        />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />

        {/* shop routes*/}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <ShopProtectedRoute>
              <ShopHomePage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ShopProtectedRoute>
              <ShopDashboardPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <ShopProtectedRoute>
              <ShopAllOrders />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ShopProtectedRoute>
              <ShopOrderDetails />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox/:id"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <ShopProtectedRoute>
              <ShopCreateProductPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <ShopProtectedRoute>
              <ShopAllProducts />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ShopProtectedRoute>
              <ShopSettingPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <ShopProtectedRoute>
              <ShopOrderRefund />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-withdraw-money"
          element={
            <ShopProtectedRoute>
              <ShopWithdrawMoneyPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <ShopProtectedRoute>
              <ShopInboxPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <ShopProtectedRoute>
              <ShopCreateEventPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <ShopProtectedRoute>
              <ShopAllEventsPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupons"
          element={
            <ShopProtectedRoute>
              <ShopAllCouponsPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-preview"
          element={
            <ShopProtectedRoute>
              <ShopPreviewPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <AdminProtectedRoute>
              <AdminDashboardUsersPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-shops"
          element={
            <AdminProtectedRoute>
              <AdminDashboardShop />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <AdminProtectedRoute>
              <AdminDashboardOrders />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <AdminProtectedRoute>
              <AdminDashboardProducts />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <AdminProtectedRoute>
              <AdminDashboardEvents />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-withdraw-request"
          element={
            <AdminProtectedRoute>
              <AdminDashboardWithdraw />
            </AdminProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
