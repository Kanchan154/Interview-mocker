import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Home from './Student/Pages/Home/Home'
import Signup from './Student//auth/Signup'
import Login from './Student/auth/Login'
import { useAuthStore } from './Student/store/authStore'
import LoadingState from './components/shared/LoadingState'
import Profile from './Student/Pages/Profile/Profile'
import Navbar from './components/shared/Navbar'
import AdminHome from './Admin/Pages/Home/AdminHome'
import { useAdminStore } from './Admin/adminStore/adminAuthStore'
import AdminLogin from './Admin/adminAuth/AdminLogin'
import QuestionsList from './Admin/Pages/Questions/questionsList'
import Interview from './Student/Pages/interview/[interviewId]/page'


// student Protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const { isAdminAuthenticated, admin } = useAdminStore();
  if (!isAuthenticated && !user) {
    if (isAdminAuthenticated && admin) {
      return <Navigate to={'/admin'} replace />
    }
    else {
      return <Navigate to={'/login'} replace />
    }
  }
  return children
}

const RedirectAuthenticatedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const { isAdminAuthenticated, admin } = useAdminStore();
  if (isAuthenticated && user) {
    return <Navigate to='/' replace />;
  }
  if (isAdminAuthenticated && admin) {
    return <Navigate to={'/admin'} replace />
  }

  return children;
}


// Admin Protected Routes
const AdminProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated, admin } = useAdminStore();
  const { isAuthenticated, user } = useAuthStore();

  if (!isAdminAuthenticated && !admin) {
    if (isAuthenticated && user) {
      return <Navigate to={'/'} replace />
    }
    return <Navigate to={'/adminLogin'} replace />
  }
  return children;
}

const AdminRedirectedRoute = ({ children }) => {
  const { isAdminAuthenticated, admin } = useAdminStore();
  const { isAuthenticated, user } = useAuthStore();
  if (isAdminAuthenticated && admin) {
    return <Navigate to={'/admin'} replace />
  }
  if (isAuthenticated && user) {
    return <Navigate to={'/'} replace />
  }
  return children;
}

const App = () => {

  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  const { isCheckingAdmin, checkAdminAuth } = useAdminStore();
  useEffect(() => {
    checkAdminAuth();
  }, [checkAdminAuth])

  if (isCheckingAuth || isCheckingAdmin) return <LoadingState />
  return (
    <div>
      <Navbar />
      {/* Student Routes */}
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedRoute>
              <Signup />
            </RedirectAuthenticatedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthenticatedRoute>
              <Login />
            </RedirectAuthenticatedRoute>
          }
        />
        <Route
          path='/interview/:InterviewId'
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path='/admin'
          element={
            <AdminProtectedRoute>
              <AdminHome />
            </AdminProtectedRoute>
          }
        />
        <Route
          path='/adminLogin'
          element={
            <AdminRedirectedRoute>
              <AdminLogin />
            </AdminRedirectedRoute>
          }
        />
        <Route path='/admin/questions'
          element={
            <AdminProtectedRoute>
              <QuestionsList />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App