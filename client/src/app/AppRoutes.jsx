import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Login, Register } from '@/features/index'

const AppRoutes = () => {
    return (
        <Routes>

            {/* Auth routes */}
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />

        </Routes>
    )
}

export default AppRoutes