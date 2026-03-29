import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { createPageUrl } from "@/lib/utils";
import { Mail, Lock } from "lucide-react";
import { api } from "@/lib/api";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            toast.error("Email and password are required");
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await api.login({
                email,
                password,
            });

            login(result);
            toast.success(`Welcome back, ${result.user.fullName}!`);
            navigate(createPageUrl("Dashboard"));
        } catch (error) {
            toast.error(error.message || "Login failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white">
            <Card className="w-full max-w-md shadow-xl border-2 border-green-100">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-green-700">
                        Login to EcoWaste Pro
                    </CardTitle>
                    <p className="text-gray-600 mt-2">Welcome back. Sign in to continue.</p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <Label htmlFor="email" className="text-gray-700">
                                Email
                            </Label>
                            <div className="flex items-center border rounded-lg mt-2">
                                <Mail className="ml-3 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border-none focus:ring-0"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-gray-700">
                                Password
                            </Label>
                            <div className="flex items-center border rounded-lg mt-2">
                                <Lock className="ml-3 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border-none focus:ring-0"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Please wait..." : "Login"}
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                            New here?{" "}
                            <Link to="/register" className="text-green-700 font-semibold hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}