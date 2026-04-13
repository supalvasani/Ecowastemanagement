import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Dashboard from "@/components/Dashboard";
import Residential from "@/components/residential";
import Business from "@/components/business";
import About from "@/components/about";
import Pricing from "@/components/Pricing";
import OrderHistory from "@/components/OrderHistory";
import AdminDashboard from "@/components/AdminDashboard";
import Landing from "@/components/Landing";
import LoginForm from "@/components/login-form";
import RegisterForm from "@/components/register-form";
import AdminSetup from "@/components/AdminSetup";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { AdminRoute } from "@/components/common/AdminRoute";

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/setup-admin" element={<AdminSetup />} />
                <Route path="/about" element={<About />} />

                {/* Protected Routes - require login */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/residential" element={<ProtectedRoute><Residential /></ProtectedRoute>} />
                <Route path="/business" element={<ProtectedRoute><Business /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Routes>
        </Layout>
    );
}