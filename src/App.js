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
          <Route path='approvals' element={<Approvals />} />
          <Route path='inputrequests' element={<InputReuest />} />
          {/* Prottected Admin */}
          <Route element={<ProtectedAdmin />}>
            <Route path='allapps' element={<AllApps />} />
          </Route>
        </Route>

        <Route path='register' element={<Register />} />
        <Route path='forget-password' element={<ForgetPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  );
}
