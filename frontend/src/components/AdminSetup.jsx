import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { createPageUrl } from "@/lib/utils";
import { User, Mail, Phone, Lock, KeyRound } from "lucide-react";
import { api } from "@/lib/api";

export default function AdminSetup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSetup = async (event) => {
    event.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim() || !adminSecret.trim()) {
      toast.error("Name, email, password and admin secret are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await api.registerAdmin({
        fullName,
        email,
        phone,
        password,
        adminSecret,
      });

      login(result);
      toast.success("Admin created successfully");
      navigate(createPageUrl("Admin"));
    } catch (error) {
      toast.error(error.message || "Admin setup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white px-4">
      <Card className="w-full max-w-lg shadow-xl border-2 border-green-100">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-700">Setup Main Admin</CardTitle>
          <p className="text-gray-600 mt-2">
            This creates the only admin account. If one already exists, this form will be blocked by backend.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSetup} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-gray-700">Full Name</Label>
              <div className="flex items-center border rounded-lg mt-2">
                <User className="ml-3 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Admin full name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="border-none focus:ring-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="flex items-center border rounded-lg mt-2">
                <Mail className="ml-3 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="border-none focus:ring-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-700">Phone</Label>
              <div className="flex items-center border rounded-lg mt-2">
                <Phone className="ml-3 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="border-none focus:ring-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="flex items-center border rounded-lg mt-2">
                <Lock className="ml-3 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="border-none focus:ring-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secret" className="text-gray-700">Admin Secret</Label>
              <div className="flex items-center border rounded-lg mt-2">
                <KeyRound className="ml-3 text-gray-400" />
                <Input
                  id="secret"
                  type="password"
                  placeholder="Value from backend .env ADMIN_SECRET"
                  value={adminSecret}
                  onChange={(event) => setAdminSecret(event.target.value)}
                  className="border-none focus:ring-0"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Creating admin..." : "Create Main Admin"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have admin account? <Link to="/login" className="text-green-700 font-semibold hover:underline">Login</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
