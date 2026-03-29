import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import { Home, DollarSign, Sparkles, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

export default function ResidentialPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        wasteType: '',
        pickupDate: '',
        estimatedWeight: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Pre-fill the name field with the authenticated user's name
        if (user) {
            setFormData(prev => ({ ...prev, name: user.fullName }));
        }
    }, [user]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Client-side validation for required fields
        if (!formData.name || !formData.address || !formData.phone || !formData.wasteType || !formData.pickupDate) {
            toast.error("Please fill all required fields.");
            setIsSubmitting(false);
            return;
        }

        try {
            await api.createResidential({
                address: formData.address,
                phone: formData.phone,
                wasteType: formData.wasteType,
                pickupDate: formData.pickupDate,
                estimatedWeight: formData.estimatedWeight,
            });

            toast.success("Pickup scheduled successfully");
            navigate(createPageUrl("Dashboard"));
        } catch (error) {
            toast.error(error.message || "Failed to schedule pickup");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (!user) {
        // Render a loading state or just rely on ProtectedRoute redirect
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 to-white py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>Earn While You Recycle</span>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Residential Recycling Services</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Turn your household waste into instant cash. Transparent pricing, doorstep pickup, and digital payments.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-2 border-green-200 bg-green-50">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                                    <DollarSign className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Instant Payment</h3>
                                <p className="text-sm text-gray-600">Get paid immediately via UPI or bank transfer after collection</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-green-200 bg-green-50">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                                    <Home className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Doorstep Service</h3>
                                <p className="text-sm text-gray-600">We come to your home at your preferred time</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-green-200 bg-green-50">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Fair Pricing</h3>
                                <p className="text-sm text-gray-600">Transparent weighing and competitive market rates</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2">
                        <Card className="shadow-2xl border-2">
                            <CardHeader className="border-b bg-linear-to-r from-green-50 to-green-100">
                                <CardTitle className="text-2xl">Schedule Your Pickup</CardTitle>
                                <p className="text-gray-600 text-sm">Fill in your details and we'll handle the rest</p>
                            </CardHeader>
                            <CardContent className="p-8">
                                <form onSubmit={handleFormSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="name" className="text-base font-semibold">Full Name</Label>
                                        <Input
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="mt-2 h-12"
                                            placeholder="Your full name"
                                            disabled={!!user} // Disable if already pre-filled
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="phone" className="text-base font-semibold">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="mt-2 h-12"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="address" className="text-base font-semibold">Pickup Address</Label>
                                        <Textarea
                                            id="address"
                                            required
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            className="mt-2"
                                            rows={3}
                                            placeholder="Enter your complete address with landmarks"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="wasteType" className="text-base font-semibold">Type of Waste</Label>
                                            <Select required onValueChange={(value) => handleInputChange('wasteType', value)} value={formData.wasteType}>
                                                <SelectTrigger className="mt-2 h-12">
                                                    <SelectValue placeholder="Select waste type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="paper">Paper & Cardboard</SelectItem>
                                                    <SelectItem value="plastic">Plastic Bottles & Containers</SelectItem>
                                                    <SelectItem value="glass">Glass Items</SelectItem>
                                                    <SelectItem value="mixed">Mixed Recyclables</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="estimatedWeight" className="text-base font-semibold">Estimated Weight (kg)</Label>
                                            <Input
                                                id="estimatedWeight"
                                                type="text"
                                                value={formData.estimatedWeight}
                                                onChange={(e) => handleInputChange('estimatedWeight', e.target.value)}
                                                className="mt-2 h-12"
                                                placeholder="e.g., 5-10 kg"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="pickupDate" className="text-base font-semibold">Preferred Pickup Date</Label>
                                        <Input
                                            id="pickupDate"
                                            type="date"
                                            required
                                            value={formData.pickupDate}
                                            onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                                            className="mt-2 h-12"
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-green-600 hover:bg-green-700 h-14 text-lg font-semibold shadow-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Scheduling...
                      </span>
                                        ) : (
                                            'Schedule Pickup'
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}