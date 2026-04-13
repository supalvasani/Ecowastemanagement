import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
    Recycle,
    Menu,
    X,
    LogOut,
    User,
} from "lucide-react";

export default function Layout({ children }) {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const navItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "For Homes", path: "/residential" },
        { name: "For Business", path: "/business" },
        { name: "About Us", path: "/about" },
        { name: "Orders", path: "/orders" },
        { name: "Pricing", path: "/pricing" },
    ];

    const visibleNavItems = user?.role === "admin"
        ? [...navItems, { name: "Admin", path: "/admin" }]
        : navItems;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar */}
            <header className="bg-white shadow-sm">
                <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                    <div className="flex items-center gap-2">
                        <Recycle className="text-green-600 w-8 h-8" />
                        <Link to="/" className="text-2xl font-bold text-green-700">
                            EcoWaste Pro
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center space-x-8 font-medium">
                        {visibleNavItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className="text-gray-700 hover:text-green-700 transition"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* User or Login */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <div className="flex items-center border border-green-600 px-3 py-1 rounded-full">
                                    <User className="w-4 h-4 text-green-600 mr-2" />
                                    <span className="text-green-700 font-medium">{user.fullName}</span>
                                </div>
                                <Button
                                    onClick={handleLogout}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <LogOut className="w-4 h-4 mr-1" /> Logout
                                </Button>
                            </>
                        ) : (
                            <Link to="/login">
                                <Button className="bg-green-600 hover:bg-green-700 text-white">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-green-700"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </nav>

                {/* Mobile Menu */}
                {menuOpen && (
                    <ul className="md:hidden bg-green-50 p-4 space-y-3 text-center font-medium">
                        {visibleNavItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-2 text-gray-700 hover:text-green-700 transition"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        {user ? (
                            <li>
                                <Button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }}
                                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                                >
                                    Logout
                                </Button>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login" onClick={() => setMenuOpen(false)}>
                                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                                        Login
                                    </Button>
                                </Link>
                            </li>
                        )}
                    </ul>
                )}
            </header>

            {/* Main Page */}
            <main className="grow">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 mt-10">
                <div className="container mx-auto grid md:grid-cols-3 gap-8 py-10 px-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-white">Company</h3>
                        <ul className="space-y-2">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-white">Services</h3>
                        <ul className="space-y-2">
                            <li>Residential</li>
                            <li>Business</li>
                            <li>Materials We Buy</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-white">Connect</h3>
                        <ul className="space-y-2">
                            <li>📞 +91 98765 43210</li>
                            <li>📧 info@ecowastepro.com</li>
                            <li>📍 Ahemdabad, Gujarat</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 py-4 text-center">
                    <p className="text-sm">
                        © 2025 EcoWaste Pro. All rights reserved. | Building a sustainable future together.
                    </p>
                </div>
            </footer>
        </div>
    );
}