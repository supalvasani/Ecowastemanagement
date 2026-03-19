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
import { Shield, FileCheck, BarChart3, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function BusinessPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        address: '',
        phone: '',
        serviceType: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Pre-fill the contact person field with the authenticated user's name
        if (user) {
            setFormData(prev => ({ ...prev, contactPerson: user || '' }));
        }
    }, [user]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Client-side validation for required fields
        if (!formData.companyName || !formData.contactPerson || !formData.address || !formData.phone || !formData.serviceType) {
            toast.error("Please fill all required fields.");
            setIsSubmitting(false);
            return;
        }

        const newRequest = {
            id: Date.now(),
            ...formData,
            type: 'Business',
            status: 'pending',
            createdDate: new Date().toISOString()
        };

        const existingRequests = JSON.parse(localStorage.getItem('ecowaste_requests') || '[]');
        localStorage.setItem('ecowaste_requests', JSON.stringify([...existingRequests, newRequest]));

        setIsSubmitting(false);
        toast.success("✅ Request Submitted Successfully! Our team will review your requirements and contact you within 24 hours.");

        setTimeout(() => {
            navigate(createPageUrl("Dashboard"));
        }, 2000);
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>GPCB Certified & Compliant</span>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Commercial & Industrial Services</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Reliable, compliant, and certified waste management solutions for hospitals, factories, and offices.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-2 border-blue-200 bg-blue-50">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">100% Compliant</h3>
                                <p className="text-sm text-gray-600">GPCB certified processes with full regulatory compliance</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-blue-200 bg-blue-50">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <FileCheck className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Full Documentation</h3>
                                <p className="text-sm text-gray-600">Certificates and reports for your CSR and audit needs</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-blue-200 bg-blue-50">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Sustainability Reports</h3>
                                <p className="text-sm text-gray-600">Detailed analytics for your environmental goals</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2">
                        <Card className="shadow-2xl border-2">
                            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-blue-100">
                                <CardTitle className="text-2xl">Request Business Service</CardTitle>
                                <p className="text-gray-600 text-sm">Tell us about your requirements and we'll create a custom solution</p>
                            </CardHeader>
                            <CardContent className="p-8">
                                <form onSubmit={handleFormSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="companyName" className="text-base font-semibold">Company Name</Label>
                                        <Input
                                            id="companyName"
                                            required
                                            value={formData.companyName}
                                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                                            className="mt-2 h-12"
                                            placeholder="Your company name"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="contactPerson" className="text-base font-semibold">Contact Person</Label>
                                        <Input
                                            id="contactPerson"
                                            required
                                            value={formData.contactPerson}
                                            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                                            className="mt-2 h-12"
                                            placeholder="Primary contact name"
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
                                        <Label htmlFor="address" className="text-base font-semibold">Business Address</Label>
                                        <Textarea
                                            id="address"
                                            required
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            className="mt-2"
                                            rows={3}
                                            placeholder="Complete business address"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="serviceType" className="text-base font-semibold">Type of Service Required</Label>
                                        <Select required onValueChange={(value) => handleInputChange('serviceType', value)} value={formData.serviceType}>
                                            <SelectTrigger className="mt-2 h-12">
                                                <SelectValue placeholder="Select service type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">General Waste Management</SelectItem>
                                                <SelectItem value="industrial">Industrial Waste Disposal</SelectItem>
                                                <SelectItem value="biomedical">Biomedical Waste Handling</SelectItem>
                                                <SelectItem value="consulting">Waste Management Consulting</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="description" className="text-base font-semibold">Additional Details</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            className="mt-2"
                                            rows={4}
                                            placeholder="Please describe your specific requirements, frequency, volume, etc."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-semibold shadow-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Submitting...
                      </span>
                                        ) : (
                                            'Submit Request'
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