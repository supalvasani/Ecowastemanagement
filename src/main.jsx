import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ErrorBoundary from "@/components/common/ErrorBoundary.jsx";
import { AuthProvider } from "@/contexts/AuthContext.jsx";
import { Toaster } from "react-hot-toast"; // 👈 Import Toaster
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ErrorBoundary>
                    <App />
                    <Toaster position="top-right" />
                </ErrorBoundary>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);