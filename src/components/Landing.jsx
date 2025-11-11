import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
    Building2,
    Calendar,
    Truck,
    Award,
    DollarSign,
    Shield,
    BarChart3,
    Home,
    Users,
    Factory,
    CheckCircle,
    ArrowRight,
    Sparkles
} from "lucide-react";

export default function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('ecowaste_user');
        if (user) {
            navigate(createPageUrl("Dashboard"));
        }
    }, [navigate]);

    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>India's Most Trusted Waste Management Platform</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Smart Waste Management,
                            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"> Rewarding Results</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Turn your waste into wealth. Get instant payments for recyclables and ensure compliant, certified disposal for your business.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all">
                                <Link to={createPageUrl("Residential")}>
                                    {/* FIX: Wrap content in <span> to ensure <Button asChild> sees one child content block */}
                                    <span className="flex items-center">
                                        <Home className="w-5 h-5 mr-2" />
                                        Start as Household
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </span>
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-10 py-6 text-lg shadow-lg">
                                <Link to={createPageUrl("Business")}>
                                    {/* FIX: Wrap content in <span> to ensure <Button asChild> sees one child content block */}
                                    <span className="flex items-center">
                                        <Building2 className="w-5 h-5 mr-2" />
                                        Start as Business
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </span>
                                </Link>
                            </Button>
                        </div>
                        <p className="text-sm text-gray-500">✓ No credit card required  ✓ Free to join  ✓ Instant payouts</p>
                    </div>
                </div>

                <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
                            <div className="text-gray-600">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                            <div className="text-gray-600">Business Partners</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">₹5Cr+</div>
                            <div className="text-gray-600">Paid to Suppliers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                            <div className="text-gray-600">GPCB Compliant</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Get started in three simple steps
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center group relative">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                                    <Calendar className="w-12 h-12 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">1</div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule Pickup</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">Book your preferred time slot online in seconds</p>
                        </div>

                        <div className="text-center group relative">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                                    <Truck className="w-12 h-12 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">2</div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">We Collect</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">Our team arrives and handles everything professionally</p>
                        </div>

                        <div className="text-center group relative">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                                    <Award className="w-12 h-12 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">3</div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Rewarded</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">Instant payment for recyclables or compliance certificate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Our Services</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Tailored solutions for every need</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                        <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-200 overflow-hidden">
                            <CardContent className="p-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Users className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Residential Recycling</h3>
                                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                    Turn your household waste into cash! We buy paper, plastic, glass, and more with transparent pricing and instant digital payments.
                                </p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center text-gray-700">
                                        <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                                        Instant digital payments
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                                        Transparent weighing system
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                                        Doorstep pickup service
                                    </li>
                                </ul>
                                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
                                    <Link to={createPageUrl("Residential")}>Get Started</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-200 overflow-hidden">
                            <CardContent className="p-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Factory className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Commercial & Industrial</h3>
                                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                    GPCB-compliant disposal for hospitals, factories, and offices. Full documentation and certificates for your CSR reporting.
                                </p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center text-gray-700">
                                        <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                                        GPCB certified disposal
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                                        Complete documentation
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                                        Biomedical waste handling
                                    </li>
                                </ul>
                                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
                                    <Link to={createPageUrl("Business")}>Request Service</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gradient-to-br from-green-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Why Choose Us</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Industry-leading benefits</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <DollarSign className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Payment</h3>
                            <p className="text-gray-600">Direct bank transfer or UPI payment immediately after collection</p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">GPCB Compliant</h3>
                            <p className="text-gray-600">All certifications and compliance documentation provided</p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">100% Transparent</h3>
                            <p className="text-gray-600">Real-time tracking and transparent pricing at every step</p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <BarChart3 className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">CSR Reports</h3>
                            <p className="text-gray-600">Detailed sustainability reports for your business goals</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-green-600 to-green-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Ready to Make a Difference?
                    </h2>
                    <p className="text-xl text-green-50 mb-10">
                        Join thousands of households and businesses making waste management rewarding and responsible
                    </p>
                    <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-12 py-6 text-lg shadow-2xl">
                        <Link to={createPageUrl("Residential")}>
                            {/* FIX: Wrap content in <span> to ensure <Button asChild> sees one child content block */}
                            <span className="flex items-center">
                                Get Started Today
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </span>
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    );
}