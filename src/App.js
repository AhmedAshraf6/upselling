import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {
  Register,
  Error,
  ProtectedRoute,
  ForgetPassword,
  ResetPassword,
} from './pages';
import {
  Stats,
  SharedLayout,
  Approvals,
  InputReuest,
  AllApps,
  Package,
  TagerInfo,
  AboutApp,
  Dashboard,
  StartScreen,
  PublicSettingView,
  CustomAppView,
  AppStore,
  PagesIntro,
} from './pages/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedAdmin from './pages/ProtectedAdmin';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='package' element={<Package />} />
          <Route path='tager-info' element={<TagerInfo />} />
          <Route path='about-app' element={<AboutApp />} />
          <Route path='dashboard' element={<Dashboard />} />

          <Route path='start-screen' element={<StartScreen />} />
          <Route path='public-setting-view' element={<PublicSettingView />} />
          <Route path='custom-app-view' element={<CustomAppView />} />

          <Route path='app-store' element={<AppStore />} />

          <Route path='pages-intro' element={<PagesIntro />} />

          {/* Prottected Admin */}
          {/* <Route element={<ProtectedAdmin />}>
            <Route path='allapps' element={<AllApps />} />
          </Route> */}
        </Route>

        <Route path='register' element={<Register />} />
        <Route path='forget-password' element={<ForgetPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer
        position='top-center'
        hideProgressBar={true}
        autoClose={4000}
        rtl={true}
      />
    </BrowserRouter>
  );
}
