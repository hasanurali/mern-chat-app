import React from 'react'
import AppRoutes from './AppRoutes'
import { ToastContainer } from 'react-toastify'

const App = () => {
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