import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { createPageUrl } from "@/lib/utils";
import { User, Lock } from "lucide-react";

export default function LoginForm() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter your name to continue");
            return;
        }

        login(name);
        toast.success(`Welcome, ${name}!`);
        // Ensures redirection to the correct path defined in App.jsx
        navigate(createPageUrl("Dashboard"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
            <Card className="w-full max-w-md shadow-xl border-2 border-green-100">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-green-700">
                        Login to EcoWaste Pro
                    </CardTitle>
                    <p className="text-gray-600 mt-2">Manage your recyclables with ease</p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <Label htmlFor="name" className="text-gray-700">
                                Name
                            </Label>
                            <div className="flex items-center border rounded-lg mt-2">
                                <User className="ml-3 text-gray-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    placeholder="Enter any password"
                                    className="border-none focus:ring-0"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                        >
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}