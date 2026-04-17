import React, { useEffect, useState } from 'react'
import AppRoutes from './AppRoutes'
import { ToastContainer } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import { getCurrentUser, initializeUser, clearUser } from "@/features/index"
import { useLocation } from 'react-router-dom'

const App = () => {

  const [checkAuth, setCheckAuth] = useState(false);

  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/auth/login") {
      setCheckAuth(true)
      return;
    };

    getCurrentUser()
      .then(res => dispatch(initializeUser(res.data.data)))
      .catch(() => dispatch(clearUser()))
      .finally(() => setCheckAuth(true));
  }, [])

  if (!checkAuth) return <div>Loding...</div>

  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        draggable
        draggablePercent={60}
        limit={3}
        theme="colored"
      />
    </>
  )
}

export default App